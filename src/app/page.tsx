import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Divider } from '@/components/decorative/divider';

export default function HomePage() {
  return (
    <div className="flex flex-col items-center">
      {/* Hero Section */}
      <section className="bg-warm-cream w-full py-16 sm:py-24">
        <div className="mx-auto max-w-4xl px-4 text-center">
          <h1 className="font-heading text-burgundy text-4xl font-bold sm:text-5xl lg:text-6xl">
            Tengri Tagh
          </h1>
          <p className="font-heading text-warm-gray mt-2 text-xl sm:text-2xl">Uyghur Cuisine</p>
          <p className="text-charcoal/80 mt-4 text-lg">
            Authentic hand-pulled noodles, kebabs, and more
          </p>
          <p className="text-warm-gray mt-1 text-sm">Near Times Square, NYC</p>
          <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <Button asChild size="lg" className="bg-terracotta hover:bg-terracotta/90 text-base">
              <Link href="/menu">Order for Pickup</Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="text-base">
              <Link href="/menu">View Menu</Link>
            </Button>
          </div>
        </div>
      </section>

      <Divider />

      {/* Placeholder sections */}
      <section className="w-full py-16">
        <div className="mx-auto max-w-4xl px-4 text-center">
          <h2 className="font-heading text-charcoal text-3xl font-bold">
            Freshly Made for Every Order
          </h2>
          <p className="text-warm-gray mt-4">
            Every dish is prepared fresh when you order. Our noodles are hand-pulled to order, our
            kebabs grilled over charcoal, and our samsa baked in a traditional tandoor oven.
          </p>
        </div>
      </section>
    </div>
  );
}
