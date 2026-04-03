import Link from 'next/link';
import { Phone, ShoppingCart } from 'lucide-react';
import { MobileNav } from './mobile-nav';
import { HeaderCartBadge } from './header-cart-badge';

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/menu', label: 'Menu' },
  { href: '/about', label: 'About' },
  { href: '/location', label: 'Location' },
];

export function Header() {
  return (
    <header className="border-border bg-cream/95 supports-[backdrop-filter]:bg-cream/80 sticky top-0 z-40 w-full border-b backdrop-blur">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link href="/" className="flex flex-col">
          <span className="font-heading text-burgundy text-xl leading-tight font-bold">
            Tengri Tagh
          </span>
          <span className="text-warm-gray text-xs leading-tight">Uyghur Cuisine</span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden items-center gap-6 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-charcoal hover:text-terracotta text-sm font-medium transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Right side: phone, cart, hamburger */}
        <div className="flex items-center gap-3">
          <a
            href="tel:+15551234567"
            className="text-warm-gray hover:text-terracotta hidden items-center gap-1.5 text-sm transition-colors sm:flex"
          >
            <Phone className="h-4 w-4" />
            <span>(555) 123-4567</span>
          </a>

          <Link
            href="/cart"
            className="hover:bg-secondary relative flex h-9 w-9 items-center justify-center rounded-full transition-colors"
            aria-label="Shopping cart"
          >
            <ShoppingCart className="text-charcoal h-5 w-5" />
            <HeaderCartBadge />
          </Link>

          {/* Mobile hamburger */}
          <div className="md:hidden">
            <MobileNav />
          </div>
        </div>
      </div>
    </header>
  );
}
