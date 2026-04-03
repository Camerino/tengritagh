'use client';

import { useCartStore } from '@/stores/cart-store';

export function HeaderCartBadge() {
  const items = useCartStore((s) => s.items);
  const count = items.reduce((sum, item) => sum + item.quantity, 0);

  if (count === 0) return null;

  return (
    <span
      className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-[#C75B39] text-[10px] font-bold text-white"
      data-testid="cart-badge"
    >
      {count > 99 ? '99+' : count}
    </span>
  );
}
