'use client';

import { useCartStore } from '@/stores/cart-store';

export function HeaderCartBadge() {
  const getItemCount = useCartStore((s) => s.getItemCount);
  const count = getItemCount();

  if (count === 0) return null;

  return (
    <span
      className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-[#C75B39] text-[10px] font-bold text-white"
      data-cart-hydration
      data-testid="cart-badge"
    >
      {count > 99 ? '99+' : count}
    </span>
  );
}
