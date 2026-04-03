import { NextResponse } from 'next/server';
import { getOrderById } from '@/db/queries/orders';

export async function GET(_request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const order = await getOrderById(id);

  if (!order) {
    return NextResponse.json({ error: 'Order not found' }, { status: 404 });
  }

  return NextResponse.json({
    id: order.id,
    orderNumber: order.orderNumber,
    status: order.status,
    cloverOrderId: order.cloverOrderId,
    cloverSyncStatus: order.cloverSyncStatus,
    statusEvents: order.statusEvents,
    createdAt: order.createdAt,
    updatedAt: order.updatedAt,
  });
}
