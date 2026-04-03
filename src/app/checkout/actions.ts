'use server';

import { z } from 'zod';
import { isStoreOpen, getEstimatedWaitMinutes } from '@/lib/store-hours';
import { isValidPickupTime } from '@/lib/pickup-times';
import { createOrder, getOrderByIdempotencyKey } from '@/db/queries/orders';

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
        priceCents: z.number().int(),
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

  // 2. Check idempotency key
  const existingOrder = await getOrderByIdempotencyKey(data.idempotencyKey);
  if (existingOrder) {
    return {
      success: true,
      orderId: existingOrder.id,
      orderNumber: existingOrder.orderNumber,
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

  // 5. Calculate subtotal
  const subtotalCents = data.items.reduce((sum, item) => sum + item.priceCents * item.quantity, 0);

  // 6. Save order to SQLite
  try {
    const { orderId, orderNumber } = await createOrder({
      customerName: data.customerName,
      customerPhone: data.customerPhone,
      customerEmail: data.customerEmail || undefined,
      pickupTime: data.pickupTime,
      kitchenNote: data.kitchenNote,
      idempotencyKey: data.idempotencyKey,
      items: data.items,
      subtotalCents,
    });

    return { success: true, orderId, orderNumber };
  } catch (error) {
    console.error('Failed to create order:', error);
    return {
      success: false,
      error: 'Something went wrong. Please try again.',
    };
  }
}
