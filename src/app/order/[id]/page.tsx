import { notFound } from 'next/navigation';
import Link from 'next/link';
import { CheckCircle, MapPin, Phone } from 'lucide-react';
import { getOrderById } from '@/db/queries/orders';
import { OrderStatusTracker } from '@/components/order/order-status-tracker';
import { formatPrice } from '@/lib/utils';
import { RESTAURANT } from '@/lib/constants';

const TAX_RATE = 0.08875;

interface OrderPageProps {
  params: Promise<{ id: string }>;
}

export default async function OrderPage({ params }: OrderPageProps) {
  const { id } = await params;
  const order = await getOrderById(id);

  if (!order) {
    notFound();
  }

  const taxCents = Math.round(order.subtotalCents * TAX_RATE);
  const totalCents = order.subtotalCents + taxCents;

  const pickupTimeDisplay =
    order.pickupTime === 'asap'
      ? 'ASAP'
      : new Date(order.pickupTime).toLocaleTimeString('en-US', {
          hour: 'numeric',
          minute: '2-digit',
          hour12: true,
        });

  return (
    <div className="mx-auto max-w-2xl px-4 py-8" data-testid="order-confirmation-page">
      {/* Success Hero */}
      <div className="mb-8 rounded-lg bg-green-50 p-6 text-center">
        <CheckCircle className="mx-auto mb-3 h-16 w-16 text-green-500" />
        <h1 className="font-heading text-3xl font-bold text-[#2D2926]">Order Confirmed!</h1>
        <p className="mt-2 text-lg text-[#8B8178]">Order #{order.orderNumber}</p>
        <p className="mt-1 text-sm text-[#8B8178]">Pickup: {pickupTimeDisplay}</p>
      </div>

      {/* Status Tracker */}
      <div className="mb-8 rounded-lg border border-[#e5ddd4] bg-white p-6">
        <h2 className="font-heading mb-4 text-center text-lg font-bold text-[#2D2926]">
          Order Status
        </h2>
        <OrderStatusTracker
          orderId={order.id}
          initialStatus={order.status}
          initialEvents={order.statusEvents}
        />
        <p className="mt-4 text-center text-xs text-[#8B8178]">
          This page will update automatically
        </p>
      </div>

      {/* Order Summary */}
      <div className="mb-8 rounded-lg border border-[#e5ddd4] bg-white p-4">
        <h2 className="font-heading mb-3 text-lg font-bold text-[#2D2926]">Order Summary</h2>
        {order.items.map((item) => (
          <div
            key={item.id}
            className="flex justify-between border-b border-[#e5ddd4] py-2 last:border-b-0"
          >
            <span className="text-sm text-[#2D2926]">
              {item.quantity}x {item.name}
            </span>
            <span className="text-sm text-[#2D2926]">
              {formatPrice(item.priceCents * item.quantity)}
            </span>
          </div>
        ))}
        <div className="mt-3 border-t border-[#e5ddd4] pt-3">
          <div className="flex justify-between text-sm">
            <span>Subtotal</span>
            <span>{formatPrice(order.subtotalCents)}</span>
          </div>
          <div className="flex justify-between text-sm text-[#8B8178]">
            <span>Tax</span>
            <span>{formatPrice(taxCents)}</span>
          </div>
          <div className="mt-2 flex justify-between border-t border-[#e5ddd4] pt-2 font-bold">
            <span>Total</span>
            <span>{formatPrice(totalCents)}</span>
          </div>
        </div>
      </div>

      {/* Pickup Info */}
      <div className="mb-8 rounded-lg border border-[#e5ddd4] bg-white p-4">
        <h2 className="font-heading mb-3 text-lg font-bold text-[#2D2926]">Pickup Location</h2>
        <div className="flex items-start gap-2 text-sm text-[#2D2926]">
          <MapPin className="mt-0.5 h-4 w-4 flex-shrink-0 text-[#C75B39]" />
          <span>{RESTAURANT.address}</span>
        </div>
        <div className="mt-2 flex items-center gap-2 text-sm text-[#2D2926]">
          <Phone className="h-4 w-4 flex-shrink-0 text-[#C75B39]" />
          <a href={RESTAURANT.phoneHref} className="hover:underline">
            {RESTAURANT.phone}
          </a>
        </div>
      </div>

      {/* Back to menu */}
      <div className="text-center">
        <Link href="/menu" className="text-sm text-[#C75B39] underline-offset-4 hover:underline">
          Order More
        </Link>
      </div>
    </div>
  );
}
