import { Plus } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { formatPrice } from '@/lib/utils';

interface MenuItemCardProps {
  name: string;
  nameZh: string | null;
  description: string | null;
  price: number;
  imageUrl: string | null;
  isFeatured: number;
  isAvailable: number;
  categorySlug: string;
}

export function MenuItemCard({
  name,
  nameZh,
  description,
  price,
  isFeatured,
  isAvailable,
  categorySlug,
}: MenuItemCardProps) {
  if (isAvailable === 0) {
    return (
      <Card className="opacity-50" data-testid="menu-item">
        <div className="relative h-36 w-full bg-gradient-to-br from-gray-200 to-gray-300">
          <div className="flex h-full items-center justify-center">
            <span className="text-sm font-medium text-gray-500">Unavailable</span>
          </div>
        </div>
        <CardContent className="p-4">
          <h3 className="font-heading text-base font-semibold text-[#2D2926]">{name}</h3>
          {nameZh && <p className="text-sm text-[#8B8178]">{nameZh}</p>}
          <p className="mt-1 text-sm text-red-500">Currently Unavailable</p>
        </CardContent>
      </Card>
    );
  }

  // Map category slugs to gradient colors
  const gradientMap: Record<string, string> = {
    laghman: 'from-[#C75B39]/20 to-[#D4A84B]/15',
    polo: 'from-[#D4A84B]/20 to-[#6B1D2A]/15',
    kebabs: 'from-[#6B1D2A]/20 to-[#C75B39]/15',
    samsa: 'from-[#C75B39]/15 to-[#D4A84B]/20',
    nan: 'from-[#D4A84B]/15 to-[#FAF7EE]/30',
    soups: 'from-[#6B1D2A]/15 to-[#D4A84B]/15',
    drinks: 'from-[#D4A84B]/10 to-[#C75B39]/15',
  };

  const gradient = gradientMap[categorySlug] ?? 'from-[#C75B39]/15 to-[#D4A84B]/15';

  return (
    <Card className="flex flex-col overflow-hidden" data-testid="menu-item">
      {/* Image placeholder */}
      <div className={`relative h-36 w-full bg-gradient-to-br ${gradient}`}>
        <div className="flex h-full items-center justify-center">
          <span className="text-4xl" role="img" aria-label={name}>
            🍽️
          </span>
        </div>
        {isFeatured === 1 && (
          <Badge
            className="absolute top-2 right-2 border-0 bg-[#D4A84B] text-[#2D2926]"
            aria-label="Popular dish"
          >
            POPULAR
          </Badge>
        )}
      </div>

      <CardContent className="flex flex-1 flex-col p-4">
        <h3 className="font-heading text-base font-semibold text-[#2D2926]">{name}</h3>
        {nameZh && <p className="text-sm text-[#8B8178]">{nameZh}</p>}
        {description && (
          <p className="mt-1 line-clamp-2 flex-1 text-sm text-[#8B8178]">{description}</p>
        )}

        <div className="mt-3 flex items-center justify-between">
          <p className="text-base font-bold text-[#C75B39]">{formatPrice(price)}</p>
          <button
            type="button"
            aria-label={`Add ${name} to cart`}
            className="flex h-8 w-8 items-center justify-center rounded-full bg-[#C75B39] text-white transition-colors hover:bg-[#C75B39]/90"
            data-testid="add-to-cart-button"
          >
            <Plus className="h-4 w-4" />
          </button>
        </div>
      </CardContent>
    </Card>
  );
}
