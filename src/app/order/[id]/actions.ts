'use server';

import { getOrderById, updateOrderStatus as dbUpdateOrderStatus } from '@/db/queries/orders';

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

export async function updateOrderStatus(orderId: string, status: string, source: string) {
  await dbUpdateOrderStatus(orderId, status, source);
}
