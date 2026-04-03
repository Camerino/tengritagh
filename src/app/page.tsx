import type { Metadata } from 'next';
import { HeroSection } from '@/components/home/hero-section';
import { FeaturedDishes } from '@/components/home/featured-dishes';
import { FreshlyMadeSection } from '@/components/home/freshly-made-section';
import { GoogleReviews } from '@/components/home/google-reviews';
import { OrderPlatforms } from '@/components/home/order-platforms';
import { AboutTeaser } from '@/components/home/about-teaser';
import { LocationStrip } from '@/components/home/location-strip';
import { Divider } from '@/components/decorative/divider';
import { RESTAURANT } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'Tengri Tagh Uyghur Cuisine | Authentic Uyghur Food Near Times Square, NYC',
  description:
    'Authentic Uyghur cuisine near Times Square, NYC. Hand-pulled noodles (拌面), kebabs (烤肉串), samsa (烤包子), polo (手抓饭), and more. Order for pickup today.',
  openGraph: {
    title: 'Tengri Tagh Uyghur Cuisine | Authentic Uyghur Food Near Times Square, NYC',
    description:
      'Authentic Uyghur cuisine near Times Square. Hand-pulled noodles, kebabs, samsa, and more. Order for pickup today.',
    url: RESTAURANT.siteUrl,
    siteName: RESTAURANT.name,
    type: 'website',
    images: [
      {
        url: `${RESTAURANT.siteUrl}/og-image.png`,
        width: 1200,
        height: 630,
        alt: RESTAURANT.name,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Tengri Tagh Uyghur Cuisine | Authentic Uyghur Food Near Times Square, NYC',
    description:
      'Authentic Uyghur cuisine near Times Square. Hand-pulled noodles, kebabs, samsa, and more.',
    images: [`${RESTAURANT.siteUrl}/og-image.png`],
  },
};

export default function HomePage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Restaurant',
    name: RESTAURANT.name,
    image: `${RESTAURANT.siteUrl}/og-image.png`,
    url: RESTAURANT.siteUrl,
    telephone: RESTAURANT.phone,
    address: {
      '@type': 'PostalAddress',
      streetAddress: '123 W 46th St',
      addressLocality: 'New York',
      addressRegion: 'NY',
      postalCode: '10036',
      addressCountry: 'US',
    },
    servesCuisine: RESTAURANT.cuisineTypes,
    priceRange: RESTAURANT.priceRange,
    menu: `${RESTAURANT.siteUrl}/menu`,
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday'],
        opens: '11:00',
        closes: '22:00',
      },
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Friday', 'Saturday'],
        opens: '11:00',
        closes: '23:00',
      },
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: 'Sunday',
        opens: '12:00',
        closes: '21:00',
      },
    ],
  };

  return (
    <div className="flex flex-col" data-testid="homepage">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <HeroSection />
      <Divider />
      <FeaturedDishes />
      <FreshlyMadeSection />
      <GoogleReviews />
      <OrderPlatforms />
      <Divider />
      <AboutTeaser />
      <LocationStrip />
    </div>
  );
}
