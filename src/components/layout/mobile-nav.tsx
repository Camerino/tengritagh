'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Menu, Phone, MapPin } from 'lucide-react';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/menu', label: 'Menu' },
  { href: '/about', label: 'About' },
  { href: '/location', label: 'Location & Hours' },
  { href: '/cart', label: 'Cart' },
];

export function MobileNav() {
  const [open, setOpen] = useState(false);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" aria-label="Open menu">
          <Menu className="h-5 w-5" />
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="bg-cream w-72">
        <SheetHeader>
          <SheetTitle className="font-heading text-burgundy">Tengri Tagh</SheetTitle>
        </SheetHeader>
        <nav className="mt-8 flex flex-col gap-4">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className="text-charcoal hover:text-terracotta border-border border-b py-2 text-lg font-medium transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </nav>
        <div className="text-warm-gray mt-8 flex flex-col gap-3 text-sm">
          <a
            href="tel:+15551234567"
            className="hover:text-terracotta flex items-center gap-2 transition-colors"
          >
            <Phone className="h-4 w-4" />
            (555) 123-4567
          </a>
          <div className="flex items-center gap-2">
            <MapPin className="h-4 w-4" />
            Near Times Square, NYC
          </div>
        </div>
        <div className="mt-6">
          <Button asChild className="bg-terracotta hover:bg-terracotta/90 w-full">
            <Link href="/menu" onClick={() => setOpen(false)}>
              Order for Pickup
            </Link>
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  );
}
