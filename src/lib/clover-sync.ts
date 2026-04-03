/**
 * Order-to-Clover synchronisation with retry logic.
 *
 * `syncOrderToClover` is the single entry-point. It:
 *  1. Reads the order from SQLite (with items)
 *  2. Creates a Clover order shell
 *  3. Adds bulk line items
 *  4. Triggers a print event
 *  5. Records success / failure in SQLite
 */

import {
  getCloverConfig,
  createCloverOrder,
  addLineItems,
  triggerPrint,
  CloverApiError,
  type CloverConfig,
  type CloverLineItemInput,
} from './clover';
import { getOrderById, updateCloverSync, addOrderStatusEvent } from '@/db/queries/orders';

// ---------------------------------------------------------------------------
// Retry helpers
// ---------------------------------------------------------------------------

const MAX_RETRIES = 3;
const BASE_DELAY_MS = 1_000; // 1 s, 3 s, 9 s (exponential × 3)

function shouldRetry(error: unknown): boolean {
  if (error instanceof CloverApiError && error.isClientError) {
    return false; // 4xx (except 429) — don't retry
  }
  return true;
}

async function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function withRetry<T>(label: string, orderId: string, fn: () => Promise<T>): Promise<T> {
  let lastError: unknown;

  for (let attempt = 0; attempt <= MAX_RETRIES; attempt++) {
    try {
      return await fn();
    } catch (error) {
      lastError = error;

      if (!shouldRetry(error)) {
        console.error(
          `[CloverSync] ${label} failed for order ${orderId} with non-retryable error (attempt ${attempt + 1}):`,
          error instanceof Error ? error.message : error,
        );
        throw error;
      }

      if (attempt < MAX_RETRIES) {
        const delay = BASE_DELAY_MS * Math.pow(3, attempt);
        console.warn(
          `[CloverSync] ${label} attempt ${attempt + 1} failed for order ${orderId}, retrying in ${delay}ms:`,
          error instanceof Error ? error.message : error,
        );
        await sleep(delay);
      }
    }
  }

  console.error(
    `[CloverSync] ${label} exhausted ${MAX_RETRIES + 1} attempts for order ${orderId}:`,
    lastError instanceof Error ? lastError.message : lastError,
  );
  throw lastError;
}

// ---------------------------------------------------------------------------
// Main sync function
// ---------------------------------------------------------------------------

export async function syncOrderToClover(orderId: string): Promise<void> {
  let config: CloverConfig;
  try {
    config = getCloverConfig();
  } catch (err) {
    console.error('[CloverSync] Missing config, skipping sync:', err);
    await updateCloverSync(orderId, null, 'failed');
    await addOrderStatusEvent(orderId, 'sync_failed', 'clover');
    return;
  }

  // 1. Read order from DB
  const order = await getOrderById(orderId);
  if (!order) {
    console.error(`[CloverSync] Order ${orderId} not found in database`);
    return;
  }

  let cloverOrderId: string | null = null;

  try {
    // 2. Create Clover order
    const title = `Online Pickup #${order.orderNumber}`;
    const noteParts = [
      `Pickup: ${order.customerName}`,
      order.customerPhone,
      order.pickupTime === 'asap' ? 'ASAP' : order.pickupTime,
    ];
    if (order.kitchenNote) {
      noteParts.push(`Note: ${order.kitchenNote}`);
    }
    const note = noteParts.join(', ');

    const cloverOrder = await withRetry('createOrder', orderId, () =>
      createCloverOrder(config, { state: 'open', title, note }),
    );
    cloverOrderId = cloverOrder.id;

    // Save cloverOrderId right away so partial-failure is recorded
    await updateCloverSync(orderId, cloverOrderId, 'pending');

    // 3. Add line items
    const lineItems: CloverLineItemInput[] = order.items.map((item) => ({
      name: item.name,
      price: item.priceCents,
      unitQty: item.quantity,
      note: item.specialInstructions ?? undefined,
    }));

    await withRetry('addLineItems', orderId, () => addLineItems(config, cloverOrderId!, lineItems));

    // 4. Trigger print
    await withRetry('triggerPrint', orderId, () => triggerPrint(config, cloverOrderId!));

    // 5. Mark synced
    await updateCloverSync(orderId, cloverOrderId, 'synced');
    await addOrderStatusEvent(orderId, 'clover_synced', 'clover');

    console.log(`[CloverSync] Order ${orderId} (Clover ${cloverOrderId}) synced successfully`);
  } catch (error) {
    console.error(
      `[CloverSync] Failed to sync order ${orderId} (orderNumber: ${order.orderNumber}):`,
      error instanceof Error ? error.message : error,
    );

    await updateCloverSync(orderId, cloverOrderId, 'failed');
    await addOrderStatusEvent(orderId, 'sync_failed', 'clover');
  }
}
