'use client';

import { useEffect, useState, type ReactNode } from 'react';

export function CartProvider({ children }: { children: ReactNode }) {
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setHydrated(true);
  }, []);

  return (
    <>
      {children}
      {!hydrated && (
        <style>{`
          [data-cart-hydration] { visibility: hidden; }
        `}</style>
      )}
    </>
  );
}
