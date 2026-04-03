import { eq, asc } from 'drizzle-orm';
import { db } from '@/db';
import { categories } from '@/db/schema';

export async function getCategories() {
  return db.select().from(categories).orderBy(asc(categories.sortOrder));
}

export async function getCategoryBySlug(slug: string) {
  const results = await db.select().from(categories).where(eq(categories.slug, slug)).limit(1);
  return results[0] ?? null;
}
