'use server';

import { getAvailablePickupSlots } from '@/lib/pickup-times';
import { getEstimatedWaitMinutes, isStoreOpen } from '@/lib/store-hours';

export async function getPickupSlotsAction() {
  const now = new Date();
  const storeOpen = await isStoreOpen(now);
  const estimatedWait = await getEstimatedWaitMinutes();

  if (!storeOpen) {
    return { slots: [], storeOpen: false, estimatedWaitMinutes: estimatedWait };
  }

  const slots = getAvailablePickupSlots(now, estimatedWait);
  return { slots, storeOpen: true, estimatedWaitMinutes: estimatedWait };
}
