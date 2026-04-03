import { eq, desc, sql } from 'drizzle-orm';
import { db } from '@/db';
import { orders, orderItems, orderStatusEvents } from '@/db/schema';
import { nanoid } from 'nanoid';

interface CreateOrderItem {
  menuItemId: string;
  name: string;
  priceCents: number;
  quantity: number;
  specialInstructions?: string;
}

interface CreateOrderData {
  customerName: string;
  customerPhone: string;
  customerEmail?: string;
  pickupTime: string;
  kitchenNote?: string;
  idempotencyKey: string;
  items: CreateOrderItem[];
  subtotalCents: number;
}

export async function getOrderByIdempotencyKey(key: string) {
  const results = await db.select().from(orders).where(eq(orders.idempotencyKey, key)).limit(1);
  return results[0] ?? null;
}

export async function getNextOrderNumber(): Promise<number> {
  const result = await db
    .select({ maxNum: sql<number>`COALESCE(MAX(${orders.orderNumber}), 1000)` })
    .from(orders);
  return (result[0]?.maxNum ?? 1000) + 1;
}

export async function createOrder(data: CreateOrderData) {
  const orderId = nanoid();
  const orderNumber = await getNextOrderNumber();
  const now = new Date().toISOString();

  // Use a transaction to insert order + items + status event
  await db.transaction(async (tx) => {
    await tx.insert(orders).values({
      id: orderId,
      orderNumber,
      customerName: data.customerName,
      customerPhone: data.customerPhone,
      customerEmail: data.customerEmail ?? null,
      pickupTime: data.pickupTime,
      kitchenNote: data.kitchenNote ?? null,
      status: 'received',
      subtotalCents: data.subtotalCents,
      idempotencyKey: data.idempotencyKey,
      cloverSyncStatus: 'pending',
      createdAt: now,
      updatedAt: now,
    });

    for (const item of data.items) {
      await tx.insert(orderItems).values({
        id: nanoid(),
        orderId,
        menuItemId: item.menuItemId,
        name: item.name,
        priceCents: item.priceCents,
        quantity: item.quantity,
        specialInstructions: item.specialInstructions ?? null,
        createdAt: now,
      });
    }

    await tx.insert(orderStatusEvents).values({
      id: nanoid(),
      orderId,
      status: 'received',
      source: 'web',
      createdAt: now,
    });
  });

  return { orderId, orderNumber };
}

export async function getOrderById(id: string) {
  const orderResult = await db.select().from(orders).where(eq(orders.id, id)).limit(1);

  const order = orderResult[0];
  if (!order) return null;

  const items = await db.select().from(orderItems).where(eq(orderItems.orderId, id));

  const statusEvents = await db
    .select()
    .from(orderStatusEvents)
    .where(eq(orderStatusEvents.orderId, id))
    .orderBy(desc(orderStatusEvents.createdAt));

  return { ...order, items, statusEvents };
}
