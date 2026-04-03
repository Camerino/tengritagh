import { getFeaturedItems } from '@/db/queries/menu-items';
import { DishCard } from './dish-card';

export async function FeaturedDishes() {
  const items = await getFeaturedItems();

  if (items.length === 0) return null;

  return (
    <section
      aria-labelledby="featured-heading"
      data-testid="featured-dishes"
      className="w-full py-12 sm:py-16"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-8 text-center">
          <h2
            id="featured-heading"
            className="font-heading text-3xl font-bold text-[#2D2926] sm:text-4xl"
          >
            Featured Dishes
          </h2>
          <p className="mt-2 text-[#8B8178]">Our most popular dishes, handcrafted with love</p>
        </div>

        {/* Mobile: horizontal scroll / Desktop: 3-col grid */}
        <div className="flex gap-4 overflow-x-auto pb-4 sm:grid sm:grid-cols-3 sm:overflow-visible sm:pb-0">
          {items.map((item) => (
            <DishCard
              key={item.id}
              name={item.name}
              nameZh={item.nameZh}
              description={item.description}
              price={item.price}
              imageUrl={item.imageUrl}
              isFeatured={item.isFeatured}
              slug={item.slug}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
