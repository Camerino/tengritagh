'use client';

import { useState, useMemo } from 'react';
import { CategoryTabs } from './category-tabs';
import { MenuItemCard } from './menu-item-card';

interface Category {
  id: string;
  name: string;
  slug: string;
  description: string | null;
}

interface MenuItem {
  id: string;
  categoryId: string;
  name: string;
  nameZh: string | null;
  slug: string;
  description: string | null;
  price: number;
  imageUrl: string | null;
  isFeatured: number;
  isAvailable: number;
}

interface MenuGridProps {
  categories: Category[];
  items: MenuItem[];
  categorySlugMap: Record<string, string>;
}

export function MenuGrid({ categories, items, categorySlugMap }: MenuGridProps) {
  const [activeSlug, setActiveSlug] = useState<string | null>(null);

  const activeCategory = useMemo(
    () => (activeSlug ? categories.find((c) => c.slug === activeSlug) : null),
    [categories, activeSlug],
  );

  const filteredItems = useMemo(() => {
    if (!activeSlug) return items;
    const cat = categories.find((c) => c.slug === activeSlug);
    if (!cat) return items;
    return items.filter((item) => item.categoryId === cat.id);
  }, [items, categories, activeSlug]);

  return (
    <div>
      <CategoryTabs categories={categories} activeSlug={activeSlug} onSelect={setActiveSlug} />

      {activeCategory?.description && (
        <p className="mt-4 text-[#8B8178]" data-testid="category-description">
          {activeCategory.description}
        </p>
      )}

      <div
        className="mt-6 grid grid-cols-2 gap-4 md:grid-cols-3"
        data-testid="menu-grid"
        role="tabpanel"
      >
        {filteredItems.map((item) => (
          <MenuItemCard
            key={item.id}
            name={item.name}
            nameZh={item.nameZh}
            description={item.description}
            price={item.price}
            imageUrl={item.imageUrl}
            isFeatured={item.isFeatured}
            isAvailable={item.isAvailable}
            categorySlug={categorySlugMap[item.categoryId] ?? 'default'}
          />
        ))}
      </div>

      {filteredItems.length === 0 && (
        <p className="mt-8 text-center text-[#8B8178]">No items found in this category.</p>
      )}
    </div>
  );
}
