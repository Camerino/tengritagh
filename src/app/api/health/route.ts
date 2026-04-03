import { NextResponse } from 'next/server';
import { countFailedCloverSyncs } from '@/db/queries/orders';

export async function GET() {
  const failedCloverSyncs = await countFailedCloverSyncs();

  return NextResponse.json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    failedCloverSyncs,
  });
}
