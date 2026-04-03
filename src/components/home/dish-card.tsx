import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { formatPrice } from '@/lib/utils';

interface DishCardProps {
  name: string;
  nameZh: string | null;
  description: string | null;
  price: number;
  imageUrl: string | null;
  isFeatured: number;
  slug: string;
}

export function DishCard({ name, nameZh, description, price, isFeatured }: DishCardProps) {
  return (
    <Card
      className="flex min-w-[220px] flex-shrink-0 flex-col overflow-hidden sm:min-w-0"
      data-testid="dish-card"
    >
      {/* Image placeholder */}
      <div className="relative h-40 w-full bg-gradient-to-br from-[#C75B39]/20 to-[#D4A84B]/20">
        <div className="flex h-full items-center justify-center">
          <span className="text-4xl" role="img" aria-label={name}>
            🍜
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
        <p className="mt-2 text-base font-bold text-[#C75B39]">{formatPrice(price)}</p>
      </CardContent>
    </Card>
  );
}
