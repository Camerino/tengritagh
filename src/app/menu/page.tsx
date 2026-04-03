import type { Metadata } from 'next';
import { getCategories } from '@/db/queries/categories';
import { getMenuItems } from '@/db/queries/menu-items';
import { MenuGrid } from '@/components/menu/menu-grid';
import { RESTAURANT } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'Menu | Tengri Tagh Uyghur Cuisine',
  description:
    'Browse our authentic Uyghur menu: hand-pulled laghman noodles (拌面), polo pilaf (手抓饭), lamb kebabs (烤羊肉串), samsa pastries (烤包子), and more. Order for pickup near Times Square, NYC.',
  openGraph: {
    title: 'Menu | Tengri Tagh Uyghur Cuisine',
    description:
      'Authentic Uyghur menu with hand-pulled noodles, kebabs, polo, samsa, and more. Order for pickup.',
    url: `${RESTAURANT.siteUrl}/menu`,
    siteName: RESTAURANT.name,
    type: 'website',
    images: [
      {
        url: `${RESTAURANT.siteUrl}/og-image.png`,
        width: 1200,
        height: 630,
        alt: 'Tengri Tagh Menu',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Menu | Tengri Tagh Uyghur Cuisine',
    description: 'Authentic Uyghur menu with hand-pulled noodles, kebabs, polo, samsa, and more.',
    images: [`${RESTAURANT.siteUrl}/og-image.png`],
  },
};

export default async function MenuPage() {
  const categories = await getCategories();
  const items = await getMenuItems();

  // Build a map of categoryId -> slug for the grid
  const categorySlugMap: Record<string, string> = {};
  for (const cat of categories) {
    categorySlugMap[cat.id] = cat.slug;
  }

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Menu',
    name: 'Tengri Tagh Menu',
    url: `${RESTAURANT.siteUrl}/menu`,
    hasMenuSection: categories.map((cat) => ({
      '@type': 'MenuSection',
      name: cat.name,
      description: cat.description,
      hasMenuItem: items
        .filter((item) => item.categoryId === cat.id)
        .map((item) => ({
          '@type': 'MenuItem',
          name: item.name,
          description: item.description,
          offers: {
            '@type': 'Offer',
            price: (item.price / 100).toFixed(2),
            priceCurrency: 'USD',
          },
        })),
    })),
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8" data-testid="menu-page">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="mb-8 text-center">
        <h1 className="font-heading text-4xl font-bold text-[#2D2926] sm:text-5xl">Our Menu</h1>
        <p className="mt-2 text-[#8B8178]">Authentic Uyghur dishes, freshly made for every order</p>
      </div>

      <MenuGrid categories={categories} items={items} categorySlugMap={categorySlugMap} />
    </div>
  );
}
