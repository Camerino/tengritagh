'use client';

import { cn } from '@/lib/utils';

interface Category {
  id: string;
  name: string;
  slug: string;
}

interface CategoryTabsProps {
  categories: Category[];
  activeSlug: string | null;
  onSelect: (slug: string | null) => void;
}

export function CategoryTabs({ categories, activeSlug, onSelect }: CategoryTabsProps) {
  return (
    <div
      role="tablist"
      aria-label="Menu categories"
      className="flex gap-2 overflow-x-auto pb-2"
      data-testid="category-tabs"
    >
      <button
        role="tab"
        aria-selected={activeSlug === null}
        onClick={() => onSelect(null)}
        className={cn(
          'rounded-full px-4 py-2 text-sm font-medium whitespace-nowrap transition-colors',
          activeSlug === null
            ? 'bg-[#6B1D2A] text-white'
            : 'bg-[#FAF7EE] text-[#2D2926] hover:bg-[#E8E2DA]',
        )}
      >
        All
      </button>
      {categories.map((cat) => (
        <button
          key={cat.id}
          role="tab"
          aria-selected={activeSlug === cat.slug}
          onClick={() => onSelect(cat.slug)}
          className={cn(
            'rounded-full px-4 py-2 text-sm font-medium whitespace-nowrap transition-colors',
            activeSlug === cat.slug
              ? 'bg-[#6B1D2A] text-white'
              : 'bg-[#FAF7EE] text-[#2D2926] hover:bg-[#E8E2DA]',
          )}
        >
          {cat.name}
        </button>
      ))}
    </div>
  );
}
