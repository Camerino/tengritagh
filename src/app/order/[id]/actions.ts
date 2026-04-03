'use server';

import { getOrderById } from '@/db/queries/orders';

export async function getOrderStatus(orderId: string) {
  const order = await getOrderById(orderId);
  if (!order) return null;

  return {
    id: order.id,
    orderNumber: order.orderNumber,
    status: order.status,
    customerName: order.customerName,
    pickupTime: order.pickupTime,
    subtotalCents: order.subtotalCents,
    items: order.items,
    createdAt: order.createdAt,
  };
}
