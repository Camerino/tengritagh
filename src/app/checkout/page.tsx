'use client';

import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Loader2, Store } from 'lucide-react';
import { useCartStore } from '@/stores/cart-store';
import { CheckoutForm } from '@/components/checkout/checkout-form';
import { PickupTimeSelector } from '@/components/checkout/pickup-time-selector';
import { OrderSummary } from '@/components/checkout/order-summary';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { placeOrder } from './actions';
import { getPickupSlotsAction } from './get-pickup-slots';

interface PickupSlot {
  label: string;
  value: string;
}

export default function CheckoutPage() {
  const router = useRouter();
  const items = useCartStore((s) => s.items);
  const getSubtotalCents = useCartStore((s) => s.getSubtotalCents);
  const idempotencyKey = useCartStore((s) => s.idempotencyKey);
  const clearCart = useCartStore((s) => s.clearCart);

  const [customerInfo, setCustomerInfo] = useState({
    name: '',
    phone: '',
    email: '',
  });
  const [pickupTime, setPickupTime] = useState('asap');
  const [kitchenNote, setKitchenNote] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [pickupSlots, setPickupSlots] = useState<PickupSlot[]>([]);
  const [storeOpen, setStoreOpen] = useState(true);
  const [loading, setLoading] = useState(true);

  const fetchSlots = useCallback(async () => {
    try {
      const result = await getPickupSlotsAction();
      setPickupSlots(result.slots);
      setStoreOpen(result.storeOpen);
    } catch {
      // Fallback: show ASAP only
      setPickupSlots([{ label: 'ASAP (~20 min)', value: 'asap' }]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchSlots();
  }, [fetchSlots]);

  // Redirect to cart if empty (after hydration)
  const [hydrated, setHydrated] = useState(false);
  useEffect(() => {
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (hydrated && items.length === 0) {
      router.replace('/cart');
    }
  }, [hydrated, items.length, router]);

  if (!hydrated || items.length === 0) {
    return (
      <div className="flex min-h-[50vh] items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-[#C75B39]" />
      </div>
    );
  }

  async function handleSubmit() {
    setError(null);
    setFieldErrors({});

    // Client-side validation
    const errors: Record<string, string> = {};
    if (!customerInfo.name.trim()) errors.name = 'Name is required';
    if (!/^\(\d{3}\) \d{3}-\d{4}$/.test(customerInfo.phone)) {
      errors.phone = 'Enter a valid phone number';
    }
    if (customerInfo.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(customerInfo.email)) {
      errors.email = 'Enter a valid email address';
    }

    if (Object.keys(errors).length > 0) {
      setFieldErrors(errors);
      return;
    }

    setSubmitting(true);

    try {
      const result = await placeOrder({
        customerName: customerInfo.name.trim(),
        customerPhone: customerInfo.phone,
        customerEmail: customerInfo.email || '',
        pickupTime,
        kitchenNote: kitchenNote || undefined,
        idempotencyKey,
        items: items.map((item) => ({
          menuItemId: item.menuItemId,
          name: item.name,
          priceCents: item.priceCents,
          quantity: item.quantity,
          specialInstructions: item.specialInstructions || undefined,
        })),
      });

      if (result.success && result.orderId) {
        clearCart();
        router.push(`/order/${result.orderId}`);
      } else {
        setError(result.error ?? 'Something went wrong');
        if (result.fieldErrors) {
          setFieldErrors(result.fieldErrors);
        }
      }
    } catch {
      setError('Something went wrong. Please try again.');
    } finally {
      setSubmitting(false);
    }
  }

  const subtotalCents = getSubtotalCents();

  return (
    <div className="mx-auto max-w-2xl px-4 py-8" data-testid="checkout-page">
      <h1 className="font-heading mb-6 text-3xl font-bold text-[#2D2926]">Checkout</h1>

      {!storeOpen && (
        <div className="mb-6 rounded-lg border border-red-200 bg-red-50 p-4 text-center">
          <Store className="mx-auto mb-2 h-8 w-8 text-red-500" />
          <p className="font-semibold text-red-700">The store is currently closed</p>
          <p className="mt-1 text-sm text-red-600">
            Please come back during business hours to place an order.
          </p>
          <Link href="/location" className="mt-2 inline-block text-sm text-[#C75B39] underline">
            View Hours
          </Link>
        </div>
      )}

      <div className="space-y-6">
        {/* Order Summary */}
        <OrderSummary items={items} subtotalCents={subtotalCents} />

        {/* Customer Info */}
        <div className="rounded-lg border border-[#e5ddd4] bg-white p-4">
          <CheckoutForm
            customerInfo={customerInfo}
            onChange={setCustomerInfo}
            errors={fieldErrors}
          />
        </div>

        {/* Pickup Time */}
        <div className="rounded-lg border border-[#e5ddd4] bg-white p-4">
          {loading ? (
            <div className="flex items-center justify-center py-4">
              <Loader2 className="h-6 w-6 animate-spin text-[#C75B39]" />
            </div>
          ) : (
            <PickupTimeSelector
              slots={pickupSlots}
              selectedValue={pickupTime}
              onSelect={setPickupTime}
            />
          )}
        </div>

        {/* Kitchen Note */}
        <div className="rounded-lg border border-[#e5ddd4] bg-white p-4">
          <h2 className="font-heading mb-2 text-xl font-bold text-[#2D2926]">Kitchen Note</h2>
          <Textarea
            placeholder="Any notes for the kitchen..."
            maxLength={500}
            value={kitchenNote}
            onChange={(e) => setKitchenNote(e.target.value)}
            className="resize-none"
            rows={2}
          />
          <p className="mt-1 text-right text-xs text-[#8B8178]">{kitchenNote.length}/500</p>
        </div>

        {/* Payment notice */}
        <div className="rounded-lg border border-[#D4A84B]/30 bg-[#D4A84B]/10 p-4 text-center">
          <p className="text-sm font-medium text-[#2D2926]">Payment will be collected at pickup</p>
        </div>

        {/* Error */}
        {error && (
          <div className="rounded-lg border border-red-200 bg-red-50 p-3 text-center text-sm text-red-700">
            {error}
          </div>
        )}

        {/* Place Order */}
        <Button
          onClick={handleSubmit}
          disabled={submitting || !storeOpen}
          className="w-full bg-[#D4A84B] text-[#2D2926] hover:bg-[#D4A84B]/90 disabled:opacity-50"
          size="lg"
          data-testid="place-order-button"
        >
          {submitting ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Placing Order...
            </>
          ) : (
            'Place Order'
          )}
        </Button>
      </div>
    </div>
  );
}
