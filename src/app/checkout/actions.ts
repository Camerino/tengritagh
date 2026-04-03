'use server';

import { z } from 'zod';
import { inArray } from 'drizzle-orm';
import { isStoreOpen, getEstimatedWaitMinutes } from '@/lib/store-hours';
import { isValidPickupTime } from '@/lib/pickup-times';
import { createOrder, getOrderByIdempotencyKey } from '@/db/queries/orders';
import { syncOrderToCloverBlocking } from '@/lib/clover-sync';
import { db } from '@/db';
import { menuItems } from '@/db/schema';

const placeOrderSchema = z.object({
  customerName: z.string().min(1, 'Name is required').max(100),
  customerPhone: z.string().regex(/^\(\d{3}\) \d{3}-\d{4}$/, 'Invalid phone number'),
  customerEmail: z.string().email('Invalid email').optional().or(z.literal('')),
  pickupTime: z.string().min(1, 'Pickup time is required'),
  kitchenNote: z.string().max(500).optional(),
  idempotencyKey: z.string().min(1),
  items: z
    .array(
      z.object({
        menuItemId: z.string(),
        name: z.string(),
        priceCents: z.number().int().min(0),
        quantity: z.number().int().min(1).max(20),
        specialInstructions: z.string().max(200).optional(),
      }),
    )
    .min(1, 'Cart cannot be empty'),
});

export type PlaceOrderInput = z.infer<typeof placeOrderSchema>;

interface PlaceOrderResult {
  success: boolean;
  orderId?: string;
  orderNumber?: number;
  error?: string;
  fieldErrors?: Record<string, string>;
  cloverSynced?: boolean;
  cloverError?: string;
}

export async function placeOrder(input: PlaceOrderInput): Promise<PlaceOrderResult> {
  // 1. Validate with zod
  const parsed = placeOrderSchema.safeParse(input);
  if (!parsed.success) {
    const fieldErrors: Record<string, string> = {};
    for (const issue of parsed.error.issues) {
      const field = issue.path[0];
      if (typeof field === 'string') {
        fieldErrors[field] = issue.message;
      }
    }
    return { success: false, error: 'Validation failed', fieldErrors };
  }

  const data = parsed.data;

  // 2. Check idempotency key — if order exists, retry Clover sync if needed
  const existingOrder = await getOrderByIdempotencyKey(data.idempotencyKey);
  if (existingOrder) {
    if (existingOrder.cloverSyncStatus === 'synced') {
      return {
        success: true,
        orderId: existingOrder.id,
        orderNumber: existingOrder.orderNumber,
        cloverSynced: true,
      };
    }
    // Order exists but Clover sync failed or is pending — retry
    const syncResult = await syncOrderToCloverBlocking(existingOrder.id);
    return {
      success: true,
      orderId: existingOrder.id,
      orderNumber: existingOrder.orderNumber,
      cloverSynced: syncResult.success,
      cloverError: syncResult.error,
    };
  }

  // 3. Check store is open
  const storeOpen = await isStoreOpen();
  if (!storeOpen) {
    return {
      success: false,
      error: 'Sorry, the store is currently closed. Please try again during business hours.',
    };
  }

  // 4. Validate pickup time
  const now = new Date();
  const estimatedWait = await getEstimatedWaitMinutes();
  if (!isValidPickupTime(data.pickupTime, now, estimatedWait)) {
    return {
      success: false,
      error: 'The selected pickup time is no longer available. Please choose a different time.',
    };
  }

  // 5. Verify prices against database (never trust client-submitted prices)
  const menuItemIds = data.items.map((item) => item.menuItemId);
  const dbItems = await db
    .select({
      id: menuItems.id,
      price: menuItems.price,
      name: menuItems.name,
      isAvailable: menuItems.isAvailable,
    })
    .from(menuItems)
    .where(inArray(menuItems.id, menuItemIds));

  const dbItemMap = new Map(dbItems.map((item) => [item.id, item]));

  const verifiedItems = [];
  for (const item of data.items) {
    const dbItem = dbItemMap.get(item.menuItemId);
    if (!dbItem) {
      return {
        success: false,
        error: `Menu item "${item.name}" is no longer available.`,
      };
    }
    if (dbItem.isAvailable === 0) {
      return {
        success: false,
        error: `"${dbItem.name}" is currently unavailable.`,
      };
    }
    // Use the database price, not the client-submitted price
    verifiedItems.push({
      menuItemId: item.menuItemId,
      name: dbItem.name,
      priceCents: dbItem.price,
      quantity: item.quantity,
      specialInstructions: item.specialInstructions,
    });
  }

  const subtotalCents = verifiedItems.reduce(
    (sum, item) => sum + item.priceCents * item.quantity,
    0,
  );

  // 6. Save order to SQLite
  try {
    const { orderId, orderNumber } = await createOrder({
      customerName: data.customerName,
      customerPhone: data.customerPhone,
      customerEmail: data.customerEmail || undefined,
      pickupTime: data.pickupTime,
      kitchenNote: data.kitchenNote,
      idempotencyKey: data.idempotencyKey,
      items: verifiedItems,
      subtotalCents,
    });

    // Blocking Clover sync — wait for result before returning to client
    const syncResult = await syncOrderToCloverBlocking(orderId);

    return {
      success: true,
      orderId,
      orderNumber,
      cloverSynced: syncResult.success,
      cloverError: syncResult.error,
    };
  } catch (error) {
    console.error('Failed to create order:', error);
    return {
      success: false,
      error: 'Something went wrong. Please try again.',
    };
  }
}
