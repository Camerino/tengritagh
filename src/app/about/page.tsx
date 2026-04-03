import type { Metadata } from 'next';
import { Shield, Users, Landmark } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Divider } from '@/components/decorative/divider';
import { RESTAURANT } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'Our Story | Tengri Tagh Uyghur Cuisine',
  description:
    'Discover the story behind Tengri Tagh Uyghur Cuisine. Rooted in Silk Road traditions, we bring authentic hand-pulled noodles, kebabs, and more to Times Square, NYC.',
  openGraph: {
    title: 'Our Story | Tengri Tagh Uyghur Cuisine',
    description:
      'Discover the story behind Tengri Tagh. Rooted in Silk Road traditions, authentic Uyghur cuisine in NYC.',
    url: `${RESTAURANT.siteUrl}/about`,
    siteName: RESTAURANT.name,
    type: 'website',
    images: [
      {
        url: `${RESTAURANT.siteUrl}/og-image.png`,
        width: 1200,
        height: 630,
        alt: 'About Tengri Tagh',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Our Story | Tengri Tagh Uyghur Cuisine',
    description: 'Discover the story behind Tengri Tagh. Authentic Uyghur cuisine in NYC.',
    images: [`${RESTAURANT.siteUrl}/og-image.png`],
  },
};

const VALUES = [
  {
    icon: Shield,
    title: 'Authenticity',
    description:
      'We stay true to traditional Uyghur recipes passed down through generations. Every dish reflects the genuine flavors of Central Asia, using authentic spices and time-honored techniques.',
  },
  {
    icon: Users,
    title: 'Community',
    description:
      'Food brings people together. We are proud to serve our diverse New York City community, sharing the warmth and hospitality that is central to Uyghur culture.',
  },
  {
    icon: Landmark,
    title: 'Tradition',
    description:
      'From hand-pulling noodles to baking samsa in a tandoor oven, we preserve centuries-old culinary traditions. Every meal is a bridge to the ancient Silk Road.',
  },
];

export default function AboutPage() {
  return (
    <article data-testid="about-page">
      {/* Hero banner */}
      <section
        aria-labelledby="about-hero-heading"
        className="relative h-64 w-full bg-gradient-to-r from-[#6B1D2A] to-[#C75B39] sm:h-80"
      >
        <div className="absolute inset-0 flex items-center justify-center">
          <h1
            id="about-hero-heading"
            className="font-heading text-4xl font-bold text-white sm:text-5xl lg:text-6xl"
          >
            Our Story
          </h1>
        </div>
      </section>

      {/* Cuisine narrative */}
      <section
        aria-labelledby="story-heading"
        className="mx-auto max-w-4xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8"
      >
        <h2
          id="story-heading"
          className="font-heading text-3xl font-bold text-[#2D2926] sm:text-4xl"
        >
          A Culinary Journey Along the Silk Road
        </h2>
        <div className="mt-6 space-y-4 leading-relaxed text-[#2D2926]/80">
          <p>
            Uyghur cuisine is one of the world&apos;s great undiscovered culinary traditions. Born
            at the crossroads of the ancient Silk Road, it blends the flavors of Central Asia, the
            Middle East, and China into something entirely unique. For centuries, Uyghur cooks have
            perfected the art of hand-pulled noodles, charcoal-grilled meats, and aromatic pilaf
            rice, creating dishes that tell the story of cultural exchange and culinary innovation.
          </p>
          <p>
            At the heart of Uyghur cuisine is laghman, the iconic hand-pulled noodle. Crafted from a
            single piece of dough, stretched and folded dozens of times until the noodles achieve
            the perfect chewy texture, this is an art form that takes years to master. At Tengri
            Tagh, every bowl of laghman is pulled to order, ensuring freshness and the authentic
            texture that defines this dish.
          </p>
          <p>
            Our spice palette draws from the Silk Road itself: cumin from the western trade routes,
            chili flakes that add warmth without overwhelming heat, Sichuan peppercorns for a unique
            numbing tingle, and fragrant star anise. These spices, combined with fresh lamb,
            seasonal vegetables, and hand-made dough, create the bold, comforting flavors that
            Uyghur cuisine is known for.
          </p>
        </div>
      </section>

      <Divider />

      {/* Values section */}
      <section aria-labelledby="values-heading" className="bg-[#FAF7EE] py-12 sm:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2
            id="values-heading"
            className="font-heading mb-10 text-center text-3xl font-bold text-[#2D2926] sm:text-4xl"
          >
            What We Stand For
          </h2>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
            {VALUES.map((value) => (
              <Card key={value.title} className="text-center" data-testid="value-card">
                <CardContent className="p-8">
                  <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-[#C75B39]/10">
                    <value.icon className="h-7 w-7 text-[#C75B39]" />
                  </div>
                  <h3 className="font-heading text-xl font-semibold text-[#2D2926]">
                    {value.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-[#8B8178]">{value.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <Divider />

      {/* Chef/owner section */}
      <section
        aria-labelledby="chef-heading"
        className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8"
      >
        <div className="flex flex-col items-center gap-8 lg:flex-row lg:gap-12">
          {/* Placeholder image */}
          <div className="h-72 w-full rounded-xl bg-gradient-to-br from-[#6B1D2A]/20 to-[#D4A84B]/20 lg:w-1/3">
            <div className="flex h-full items-center justify-center">
              <span className="text-6xl" role="img" aria-label="Chef portrait placeholder">
                👨‍🍳
              </span>
            </div>
          </div>

          <div className="flex-1 text-center lg:text-left">
            <h2
              id="chef-heading"
              className="font-heading text-3xl font-bold text-[#2D2926] sm:text-4xl"
            >
              Meet the Chef
            </h2>
            <p className="mt-4 leading-relaxed text-[#2D2926]/80">
              Our chef grew up in a family where food was the centerpiece of every gathering.
              Learning the art of hand-pulled noodles from a young age, they spent years perfecting
              traditional Uyghur recipes before bringing these flavors to New York City. With a deep
              passion for preserving culinary traditions while making them accessible to a global
              audience, every dish at Tengri Tagh is crafted with the same care and love that has
              defined Uyghur cooking for generations.
            </p>
            <p className="mt-4 leading-relaxed text-[#2D2926]/80">
              Named after the Uyghur word for the Tian Shan (Heavenly Mountains), Tengri Tagh
              represents the majesty and richness of Uyghur culture. Our mission is simple: to share
              the authentic flavors of our homeland, one hand-pulled noodle at a time.
            </p>
          </div>
        </div>
      </section>
    </article>
  );
}
