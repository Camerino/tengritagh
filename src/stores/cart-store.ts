'use client';

import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { nanoid } from 'nanoid';
import { useState, useEffect } from 'react';

export interface CartItem {
  menuItemId: string;
  name: string;
  nameZh: string | null;
  priceCents: number;
  quantity: number;
  specialInstructions: string;
  imageUrl: string | null;
}

interface CartState {
  items: CartItem[];
  idempotencyKey: string;
  addItem: (
    item: Omit<CartItem, 'quantity' | 'specialInstructions'> & {
      quantity?: number;
      specialInstructions?: string;
    },
  ) => void;
  removeItem: (menuItemId: string) => void;
  updateQuantity: (menuItemId: string, quantity: number) => void;
  updateSpecialInstructions: (menuItemId: string, instructions: string) => void;
  clearCart: () => void;
  getSubtotalCents: () => number;
  getItemCount: () => number;
  getItems: () => CartItem[];
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      idempotencyKey: nanoid(),

      addItem: (item) => {
        set((state) => {
          const existing = state.items.find((i) => i.menuItemId === item.menuItemId);
          if (existing) {
            return {
              items: state.items.map((i) =>
                i.menuItemId === item.menuItemId
                  ? { ...i, quantity: Math.min(i.quantity + (item.quantity ?? 1), 20) }
                  : i,
              ),
              idempotencyKey: nanoid(),
            };
          }
          return {
            items: [
              ...state.items,
              {
                menuItemId: item.menuItemId,
                name: item.name,
                nameZh: item.nameZh,
                priceCents: item.priceCents,
                imageUrl: item.imageUrl,
                quantity: item.quantity ?? 1,
                specialInstructions: item.specialInstructions ?? '',
              },
            ],
            idempotencyKey: nanoid(),
          };
        });
      },

      removeItem: (menuItemId) => {
        set((state) => ({
          items: state.items.filter((i) => i.menuItemId !== menuItemId),
          idempotencyKey: nanoid(),
        }));
      },

      updateQuantity: (menuItemId, quantity) => {
        if (quantity < 1 || quantity > 20) return;
        set((state) => ({
          items: state.items.map((i) => (i.menuItemId === menuItemId ? { ...i, quantity } : i)),
          idempotencyKey: nanoid(),
        }));
      },

      updateSpecialInstructions: (menuItemId, instructions) => {
        set((state) => ({
          items: state.items.map((i) =>
            i.menuItemId === menuItemId
              ? { ...i, specialInstructions: instructions.slice(0, 200) }
              : i,
          ),
          idempotencyKey: nanoid(),
        }));
      },

      clearCart: () => {
        set({ items: [], idempotencyKey: nanoid() });
      },

      getSubtotalCents: () => {
        return get().items.reduce((sum, item) => sum + item.priceCents * item.quantity, 0);
      },

      getItemCount: () => {
        return get().items.reduce((sum, item) => sum + item.quantity, 0);
      },

      getItems: () => {
        return get().items;
      },
    }),
    {
      name: 'cart-store',
    },
  ),
);

/**
 * Hook that returns true once Zustand persist has rehydrated from localStorage.
 * Use this before checking cart contents to avoid false-empty reads.
 */
export function useCartStoreHydration() {
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    const unsub = useCartStore.persist.onFinishHydration(() => {
      setHydrated(true);
    });

    if (useCartStore.persist.hasHydrated()) {
      setHydrated(true);
    }

    return () => {
      unsub();
    };
  }, []);

  return hydrated;
}
