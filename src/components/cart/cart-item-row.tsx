'use client';

import { Minus, Plus, Trash2 } from 'lucide-react';
import { useCartStore, type CartItem } from '@/stores/cart-store';
import { formatPrice } from '@/lib/utils';

interface CartItemRowProps {
  item: CartItem;
}

export function CartItemRow({ item }: CartItemRowProps) {
  const updateQuantity = useCartStore((s) => s.updateQuantity);
  const removeItem = useCartStore((s) => s.removeItem);

  const lineTotal = item.priceCents * item.quantity;

  return (
    <div
      className="flex gap-3 border-b border-[#e5ddd4] py-4 last:border-b-0"
      data-testid="cart-item"
    >
      {/* Thumbnail */}
      <div className="h-16 w-16 flex-shrink-0 rounded-lg bg-gradient-to-br from-[#C75B39]/15 to-[#D4A84B]/15">
        <div className="flex h-full items-center justify-center">
          <span className="text-2xl" role="img" aria-label={item.name}>
            🍽️
          </span>
        </div>
      </div>

      {/* Info */}
      <div className="flex flex-1 flex-col">
        <div className="flex items-start justify-between">
          <div>
            <h3 className="text-sm font-semibold text-[#2D2926]">{item.name}</h3>
            {item.nameZh && <p className="text-xs text-[#8B8178]">{item.nameZh}</p>}
          </div>
          <p className="text-sm font-bold text-[#2D2926]">{formatPrice(lineTotal)}</p>
        </div>

        {item.specialInstructions && (
          <p className="mt-1 text-xs text-[#8B8178] italic">{item.specialInstructions}</p>
        )}

        {/* Quantity stepper + remove */}
        <div className="mt-2 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <button
              type="button"
              aria-label="Decrease quantity"
              disabled={item.quantity <= 1}
              onClick={() => updateQuantity(item.menuItemId, item.quantity - 1)}
              className="flex h-7 w-7 items-center justify-center rounded-full border border-[#e5ddd4] text-[#2D2926] transition-colors hover:bg-[#FAF7EE] disabled:opacity-50"
            >
              <Minus className="h-3 w-3" />
            </button>
            <span className="w-6 text-center text-sm font-semibold text-[#2D2926]">
              {item.quantity}
            </span>
            <button
              type="button"
              aria-label="Increase quantity"
              disabled={item.quantity >= 20}
              onClick={() => updateQuantity(item.menuItemId, item.quantity + 1)}
              className="flex h-7 w-7 items-center justify-center rounded-full border border-[#e5ddd4] text-[#2D2926] transition-colors hover:bg-[#FAF7EE] disabled:opacity-50"
            >
              <Plus className="h-3 w-3" />
            </button>
          </div>

          <button
            type="button"
            aria-label={`Remove ${item.name} from cart`}
            onClick={() => removeItem(item.menuItemId)}
            className="text-[#8B8178] transition-colors hover:text-red-500"
            data-testid="remove-item"
          >
            <Trash2 className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
