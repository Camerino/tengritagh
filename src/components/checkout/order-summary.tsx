'use client';

import { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { type CartItem } from '@/stores/cart-store';
import { formatPrice } from '@/lib/utils';

const TAX_RATE = 0.08875;

interface OrderSummaryProps {
  items: CartItem[];
  subtotalCents: number;
}

export function OrderSummary({ items, subtotalCents }: OrderSummaryProps) {
  const [expanded, setExpanded] = useState(false);
  const taxCents = Math.round(subtotalCents * TAX_RATE);
  const totalCents = subtotalCents + taxCents;

  return (
    <div className="rounded-lg border border-[#e5ddd4] bg-white" data-testid="order-summary">
      {/* Toggle header */}
      <button
        type="button"
        onClick={() => setExpanded(!expanded)}
        className="flex w-full items-center justify-between p-4"
      >
        <h2 className="font-heading text-xl font-bold text-[#2D2926]">
          Order Summary ({items.length} {items.length === 1 ? 'item' : 'items'})
        </h2>
        {expanded ? (
          <ChevronUp className="h-5 w-5 text-[#8B8178]" />
        ) : (
          <ChevronDown className="h-5 w-5 text-[#8B8178]" />
        )}
      </button>

      {/* Collapsible items */}
      {expanded && (
        <div className="border-t border-[#e5ddd4] px-4 py-2">
          {items.map((item) => (
            <div key={item.menuItemId} className="flex justify-between py-2 text-sm">
              <div>
                <span className="text-[#2D2926]">
                  {item.quantity}x {item.name}
                </span>
                {item.specialInstructions && (
                  <p className="text-xs text-[#8B8178] italic">{item.specialInstructions}</p>
                )}
              </div>
              <span className="text-[#2D2926]">{formatPrice(item.priceCents * item.quantity)}</span>
            </div>
          ))}
        </div>
      )}

      {/* Totals - always visible */}
      <div className="border-t border-[#e5ddd4] p-4">
        <div className="flex justify-between text-sm text-[#2D2926]">
          <span>Subtotal</span>
          <span>{formatPrice(subtotalCents)}</span>
        </div>
        <div className="mt-1 flex justify-between text-sm text-[#8B8178]">
          <span>Tax (8.875%)</span>
          <span>{formatPrice(taxCents)}</span>
        </div>
        <div className="mt-2 flex justify-between border-t border-[#e5ddd4] pt-2 text-lg font-bold text-[#2D2926]">
          <span>Total</span>
          <span>{formatPrice(totalCents)}</span>
        </div>
      </div>
    </div>
  );
}
