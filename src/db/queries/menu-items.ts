import { eq, asc } from 'drizzle-orm';
import { db } from '@/db';
import { menuItems } from '@/db/schema';

export async function getMenuItems(categoryId?: string) {
  if (categoryId) {
    return db
      .select()
      .from(menuItems)
      .where(eq(menuItems.categoryId, categoryId))
      .orderBy(asc(menuItems.sortOrder));
  }
  return db.select().from(menuItems).orderBy(asc(menuItems.sortOrder));
}

export async function getFeaturedItems() {
  return db
    .select()
    .from(menuItems)
    .where(eq(menuItems.isFeatured, 1))
    .orderBy(asc(menuItems.sortOrder));
}

export async function getMenuItemBySlug(slug: string) {
  const results = await db.select().from(menuItems).where(eq(menuItems.slug, slug)).limit(1);
  return results[0] ?? null;
}
