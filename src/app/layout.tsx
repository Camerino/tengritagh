import type { Metadata } from 'next';
import { Playfair_Display, Inter } from 'next/font/google';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { Toaster } from '@/components/ui/sonner';
import { CartProvider } from '@/components/providers/cart-provider';
import { StickyCartBar } from '@/components/cart/sticky-cart-bar';
import './globals.css';

const playfairDisplay = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-heading',
  display: 'swap',
});

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-body',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Tengri Tagh Uyghur Cuisine | Near Times Square, NYC',
  description:
    'Authentic Uyghur cuisine near Times Square. Hand-pulled noodles, kebabs, samsa, and more. Order for pickup today.',
  keywords: [
    'Uyghur food',
    'Uyghur cuisine',
    'hand-pulled noodles',
    'laghman',
    'kebab',
    'Times Square',
    'NYC restaurant',
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${playfairDisplay.variable} ${inter.variable}`}>
      <body className="flex min-h-screen flex-col">
        <CartProvider>
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
          <StickyCartBar />
          <Toaster />
        </CartProvider>
      </body>
    </html>
  );
}
