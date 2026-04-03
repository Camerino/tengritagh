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
  const [syncing, setSyncing] = useState(false);
  const [cloverFailed, setCloverFailed] = useState(false);
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

  // Redirect to cart if empty — but wait for Zustand to hydrate first.
  // We check both the store AND localStorage directly to avoid race conditions.
  const [ready, setReady] = useState(false);
  useEffect(() => {
    // Check localStorage directly for cart data
    try {
      const stored = localStorage.getItem('cart-store');
      if (stored) {
        const parsed = JSON.parse(stored);
        if (parsed?.state?.items?.length > 0) {
          setReady(true);
          return;
        }
      }
    } catch {
      // Ignore parse errors
    }
    // No items in localStorage — cart is truly empty
    router.replace('/cart');
  }, [router]);

  if (!ready) {
    return (
      <div className="flex min-h-[50vh] items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-[#C75B39]" />
      </div>
    );
  }

  async function handleSubmit() {
    setError(null);
    setFieldErrors({});
    setCloverFailed(false);

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
    setSyncing(true);

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
        if (result.cloverSynced) {
          clearCart();
          router.push(`/order/${result.orderId}`);
        } else {
          // Order saved locally but Clover sync failed
          setCloverFailed(true);
          setSyncing(false);
          setSubmitting(false);
        }
      } else {
        setError(result.error ?? 'Something went wrong');
        if (result.fieldErrors) {
          setFieldErrors(result.fieldErrors);
        }
        setSyncing(false);
        setSubmitting(false);
      }
    } catch {
      setError('Something went wrong. Please try again.');
      setSyncing(false);
      setSubmitting(false);
    }
  }

  function handleRetry() {
    setCloverFailed(false);
    handleSubmit();
  }

  const subtotalCents = getSubtotalCents();

  // Clover failed state — show error with retry and call options
  if (cloverFailed) {
    return (
      <div
        className="flex min-h-[50vh] flex-col items-center justify-center gap-6 px-6 text-center"
        data-testid="error-message"
      >
        <div className="text-5xl">&#x1F614;</div>
        <h2 className="font-heading text-xl text-[#4A0E0E]">Oops... something happened</h2>
        <p className="max-w-md text-sm text-[#8B8178]">
          We&apos;ll fix it shortly. Please try again or call the restaurant at{' '}
          {process.env.NEXT_PUBLIC_RESTAURANT_PHONE ?? '(555) 123-4567'} to place your order while
          we work on the fix.
        </p>
        <div className="flex w-full max-w-xs flex-col gap-3">
          <Button
            onClick={handleRetry}
            className="bg-[#D4A84B] font-bold text-[#2D2926]"
            data-testid="retry-button"
          >
            Try Again
          </Button>
          <a
            href={`tel:${(process.env.NEXT_PUBLIC_RESTAURANT_PHONE ?? '(555) 123-4567').replace(/[^+\d]/g, '')}`}
            className="flex min-h-[44px] items-center justify-center py-3 text-center font-semibold text-[#C75B39]"
            data-testid="call-restaurant-link"
          >
            &#x1F4DE; Call Restaurant:{' '}
            {process.env.NEXT_PUBLIC_RESTAURANT_PHONE ?? '(555) 123-4567'}
          </a>
        </div>
      </div>
    );
  }

  // Syncing state — shown while waiting for Clover sync
  if (syncing && submitting) {
    return (
      <div
        className="flex min-h-[50vh] flex-col items-center justify-center gap-4"
        data-testid="syncing-message"
      >
        <Loader2 className="h-12 w-12 animate-spin text-[#D4A84B]" data-testid="loading-spinner" />
        <p className="font-heading text-xl text-[#4A0E0E]">
          Getting your order through...{' '}
          <span className="text-sm font-normal text-[#8B8178]">hang tight!</span>
        </p>
      </div>
    );
  }

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
