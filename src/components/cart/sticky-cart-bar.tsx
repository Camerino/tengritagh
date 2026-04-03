'use client';

import Link from 'next/link';
import { ShoppingCart } from 'lucide-react';
import { useCartStore } from '@/stores/cart-store';
import { formatPrice } from '@/lib/utils';

export function StickyCartBar() {
  const items = useCartStore((s) => s.items);
  const getItemCount = useCartStore((s) => s.getItemCount);
  const getSubtotalCents = useCartStore((s) => s.getSubtotalCents);

  if (items.length === 0) return null;

  const itemCount = getItemCount();
  const subtotal = getSubtotalCents();

  return (
    <div
      className="fixed right-0 bottom-0 left-0 z-50 border-t border-[#e5ddd4] bg-white p-3 shadow-lg md:hidden"
      data-testid="sticky-cart-bar"
      data-cart-hydration
    >
      <Link
        href="/cart"
        className="flex items-center justify-between rounded-lg bg-[#C75B39] px-4 py-3 text-white transition-colors hover:bg-[#C75B39]/90"
      >
        <div className="flex items-center gap-2">
          <ShoppingCart className="h-5 w-5" />
          <span className="text-sm font-medium">
            {itemCount} {itemCount === 1 ? 'item' : 'items'}
          </span>
        </div>
        <span className="text-sm font-bold">View Cart - {formatPrice(subtotal)}</span>
      </Link>
    </div>
  );
}
