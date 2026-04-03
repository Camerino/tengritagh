'use client';

import { useState } from 'react';
import { Minus, Plus } from 'lucide-react';
import { toast } from 'sonner';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { formatPrice } from '@/lib/utils';
import { useCartStore } from '@/stores/cart-store';

interface MenuItemDetailProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  id: string;
  name: string;
  nameZh: string | null;
  description: string | null;
  price: number;
  imageUrl: string | null;
  categorySlug: string;
}

export function MenuItemDetail({
  open,
  onOpenChange,
  id,
  name,
  nameZh,
  description,
  price,
  imageUrl,
  categorySlug,
}: MenuItemDetailProps) {
  const addItem = useCartStore((s) => s.addItem);
  const [quantity, setQuantity] = useState(1);
  const [specialInstructions, setSpecialInstructions] = useState('');

  const gradientMap: Record<string, string> = {
    laghman: 'from-[#C75B39]/20 to-[#D4A84B]/15',
    polo: 'from-[#D4A84B]/20 to-[#6B1D2A]/15',
    kebabs: 'from-[#6B1D2A]/20 to-[#C75B39]/15',
    samsa: 'from-[#C75B39]/15 to-[#D4A84B]/20',
    nan: 'from-[#D4A84B]/15 to-[#FAF7EE]/30',
    soups: 'from-[#6B1D2A]/15 to-[#D4A84B]/15',
    drinks: 'from-[#D4A84B]/10 to-[#C75B39]/15',
  };

  const gradient = gradientMap[categorySlug] ?? 'from-[#C75B39]/15 to-[#D4A84B]/15';

  function handleAddToCart() {
    addItem({
      menuItemId: id,
      name,
      nameZh,
      priceCents: price,
      imageUrl,
      quantity,
      specialInstructions,
    });
    toast.success('Added to cart', {
      description: `${quantity}x ${name}`,
      duration: 2000,
    });
    setQuantity(1);
    setSpecialInstructions('');
    onOpenChange(false);
  }

  function handleOpenChange(nextOpen: boolean) {
    if (!nextOpen) {
      setQuantity(1);
      setSpecialInstructions('');
    }
    onOpenChange(nextOpen);
  }

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent
        className="max-h-[90vh] overflow-y-auto sm:max-w-md"
        data-testid="menu-item-detail"
      >
        {/* Image */}
        <div className={`-mx-6 -mt-6 h-48 bg-gradient-to-br ${gradient}`}>
          <div className="flex h-full items-center justify-center">
            <span className="text-6xl" role="img" aria-label={name}>
              🍽️
            </span>
          </div>
        </div>

        <DialogHeader className="mt-2">
          <DialogTitle className="font-heading text-2xl text-[#2D2926]">{name}</DialogTitle>
          {nameZh && (
            <DialogDescription className="text-base text-[#8B8178]">{nameZh}</DialogDescription>
          )}
        </DialogHeader>

        {description && <p className="text-sm text-[#8B8178]">{description}</p>}

        <p className="text-xl font-bold text-[#C75B39]">{formatPrice(price)}</p>

        {/* Quantity Stepper */}
        <div className="flex items-center gap-4">
          <span className="text-sm font-medium text-[#2D2926]">Quantity</span>
          <div className="flex items-center gap-2">
            <button
              type="button"
              aria-label="Decrease quantity"
              disabled={quantity <= 1}
              onClick={() => setQuantity((q) => Math.max(1, q - 1))}
              className="flex h-8 w-8 items-center justify-center rounded-full border border-[#e5ddd4] text-[#2D2926] transition-colors hover:bg-[#FAF7EE] disabled:opacity-50"
            >
              <Minus className="h-4 w-4" />
            </button>
            <span
              className="w-8 text-center text-lg font-semibold text-[#2D2926]"
              data-testid="quantity-display"
            >
              {quantity}
            </span>
            <button
              type="button"
              aria-label="Increase quantity"
              disabled={quantity >= 20}
              onClick={() => setQuantity((q) => Math.min(20, q + 1))}
              className="flex h-8 w-8 items-center justify-center rounded-full border border-[#e5ddd4] text-[#2D2926] transition-colors hover:bg-[#FAF7EE] disabled:opacity-50"
            >
              <Plus className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Special Instructions */}
        <div>
          <label
            htmlFor="special-instructions"
            className="mb-1 block text-sm font-medium text-[#2D2926]"
          >
            Special Instructions
          </label>
          <Textarea
            id="special-instructions"
            placeholder="Any allergies or preferences..."
            maxLength={200}
            value={specialInstructions}
            onChange={(e) => setSpecialInstructions(e.target.value)}
            className="resize-none"
            rows={2}
          />
          <p className="mt-1 text-right text-xs text-[#8B8178]">{specialInstructions.length}/200</p>
        </div>

        {/* Add to Cart Button */}
        <Button
          onClick={handleAddToCart}
          className="w-full bg-[#C75B39] text-white hover:bg-[#C75B39]/90"
          size="lg"
          data-testid="detail-add-to-cart"
        >
          Add to Cart - {formatPrice(price * quantity)}
        </Button>
      </DialogContent>
    </Dialog>
  );
}
