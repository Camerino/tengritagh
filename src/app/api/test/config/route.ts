import { NextResponse } from 'next/server';
import { db } from '@/db';
import { siteConfig } from '@/db/schema';
import { eq } from 'drizzle-orm';

/**
 * Test-only endpoint for configuring siteConfig values.
 * Only available in development.
 */
export async function POST(request: Request) {
  if (process.env.NODE_ENV === 'production') {
    return NextResponse.json({ error: 'Not available in production' }, { status: 403 });
  }

  const body = (await request.json()) as { key: string; value: string };

  if (!body.key) {
    return NextResponse.json({ error: 'key is required' }, { status: 400 });
  }

  // Upsert
  const existing = await db.select().from(siteConfig).where(eq(siteConfig.key, body.key)).limit(1);

  if (existing.length > 0) {
    await db.update(siteConfig).set({ value: body.value }).where(eq(siteConfig.key, body.key));
  } else {
    await db.insert(siteConfig).values({ key: body.key, value: body.value });
  }

  return NextResponse.json({ ok: true, key: body.key, value: body.value });
}
