import { eq } from 'drizzle-orm';
import { db } from '@/db';
import { siteConfig } from '@/db/schema';

export async function getSiteConfig(key: string): Promise<string | null> {
  const results = await db.select().from(siteConfig).where(eq(siteConfig.key, key)).limit(1);
  return results[0]?.value ?? null;
}

export async function getAllSiteConfig(): Promise<Record<string, string>> {
  const rows = await db.select().from(siteConfig);
  const config: Record<string, string> = {};
  for (const row of rows) {
    if (row.value !== null) {
      config[row.key] = row.value;
    }
  }
  return config;
}
