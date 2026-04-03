'use client';

import Link from 'next/link';
import { ShoppingBag } from 'lucide-react';
import { useCartStore } from '@/stores/cart-store';
import { CartItemRow } from '@/components/cart/cart-item-row';
import { Button } from '@/components/ui/button';
import { formatPrice } from '@/lib/utils';

const TAX_RATE = 0.08875; // NYC tax rate

export default function CartPage() {
  const items = useCartStore((s) => s.items);
  const getSubtotalCents = useCartStore((s) => s.getSubtotalCents);

  const subtotalCents = getSubtotalCents();
  const taxCents = Math.round(subtotalCents * TAX_RATE);
  const totalCents = subtotalCents + taxCents;

  if (items.length === 0) {
    return (
      <div
        className="mx-auto flex max-w-2xl flex-col items-center px-4 py-16 text-center"
        data-testid="cart-page"
      >
        <ShoppingBag className="mb-4 h-16 w-16 text-[#8B8178]" />
        <h1 className="font-heading text-2xl font-bold text-[#2D2926]">Your cart is empty</h1>
        <p className="mt-2 text-[#8B8178]">Add some delicious Uyghur dishes to get started</p>
        <Button asChild className="mt-6 bg-[#C75B39] text-white hover:bg-[#C75B39]/90">
          <Link href="/menu">Browse Menu</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-2xl px-4 py-8" data-testid="cart-page">
      <h1 className="font-heading mb-6 text-3xl font-bold text-[#2D2926]">Your Cart</h1>

      {/* Cart Items */}
      <div className="rounded-lg border border-[#e5ddd4] bg-white p-4">
        {items.map((item) => (
          <CartItemRow key={item.menuItemId} item={item} />
        ))}
      </div>

      {/* Totals */}
      <div className="mt-6 rounded-lg border border-[#e5ddd4] bg-white p-4">
        <div className="flex justify-between text-sm text-[#2D2926]">
          <span>Subtotal</span>
          <span>{formatPrice(subtotalCents)}</span>
        </div>
        <div className="mt-2 flex justify-between text-sm text-[#8B8178]">
          <span>Estimated Tax (8.875%)</span>
          <span>{formatPrice(taxCents)}</span>
        </div>
        <div className="mt-3 flex justify-between border-t border-[#e5ddd4] pt-3 text-lg font-bold text-[#2D2926]">
          <span>Total</span>
          <span>{formatPrice(totalCents)}</span>
        </div>
      </div>

      {/* Actions */}
      <div className="mt-6 flex flex-col gap-3">
        <Button
          asChild
          className="w-full bg-[#D4A84B] text-[#2D2926] hover:bg-[#D4A84B]/90"
          size="lg"
        >
          <Link href="/checkout">Proceed to Checkout</Link>
        </Button>
        <Link
          href="/menu"
          className="text-center text-sm text-[#C75B39] underline-offset-4 hover:underline"
        >
          Continue Browsing
        </Link>
      </div>
    </div>
  );
}
