import Link from 'next/link';
import { SilkRoadBorder } from '@/components/decorative/silk-road-border';

export function Footer() {
  return (
    <footer className="bg-charcoal text-cream">
      <SilkRoadBorder />
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-3">
          {/* Hours */}
          <div>
            <h3 className="font-heading text-gold mb-4 text-lg font-semibold">Hours</h3>
            <div className="text-cream/80 space-y-2 text-sm">
              <p>Monday - Thursday: 11am - 10pm</p>
              <p>Friday - Saturday: 11am - 11pm</p>
              <p>Sunday: 12pm - 9pm</p>
            </div>
          </div>

          {/* Links */}
          <div>
            <h3 className="font-heading text-gold mb-4 text-lg font-semibold">Links</h3>
            <nav className="flex flex-col gap-2 text-sm">
              <Link href="/menu" className="text-cream/80 hover:text-terracotta transition-colors">
                Menu
              </Link>
              <Link href="/about" className="text-cream/80 hover:text-terracotta transition-colors">
                About Us
              </Link>
              <Link
                href="/location"
                className="text-cream/80 hover:text-terracotta transition-colors"
              >
                Location & Hours
              </Link>
              <Link href="/menu" className="text-cream/80 hover:text-terracotta transition-colors">
                Order for Pickup
              </Link>
            </nav>
          </div>

          {/* Social */}
          <div>
            <h3 className="font-heading text-gold mb-4 text-lg font-semibold">Connect</h3>
            <div className="flex flex-col gap-2 text-sm">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-cream/80 hover:text-terracotta transition-colors"
              >
                Instagram
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-cream/80 hover:text-terracotta transition-colors"
              >
                Facebook
              </a>
              <a
                href="https://tiktok.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-cream/80 hover:text-terracotta transition-colors"
              >
                TikTok
              </a>
              <a
                href="https://yelp.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-cream/80 hover:text-terracotta transition-colors"
              >
                Yelp
              </a>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-cream/20 text-cream/60 mt-10 border-t pt-6 text-center text-xs">
          <p>&copy; {new Date().getFullYear()} Tengri Tagh Uyghur Cuisine. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
