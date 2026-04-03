'use server';

import { getOrderById } from '@/db/queries/orders';

export async function getOrderStatus(orderId: string) {
  const order = await getOrderById(orderId);
  if (!order) return null;

  return {
    id: order.id,
    orderNumber: order.orderNumber,
    status: order.status,
    cloverOrderId: order.cloverOrderId,
    cloverSyncStatus: order.cloverSyncStatus,
    customerName: order.customerName,
    pickupTime: order.pickupTime,
    subtotalCents: order.subtotalCents,
    items: order.items,
    statusEvents: order.statusEvents,
    createdAt: order.createdAt,
  };
}

// NOTE: updateOrderStatus has been removed from client-facing server actions
// for security reasons. Order status should only be updated via:
// - The Clover sync process (server-side)
// - An authenticated admin API (to be built in V2)
// Use the db query directly from server-side code when needed.
