import { getHoursForDay } from './store-hours';

export interface PickupSlot {
  label: string;
  value: string; // ISO datetime or "asap"
}

function formatTimeLabel(date: Date): string {
  return date.toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  });
}

function roundUpTo15Min(date: Date): Date {
  const result = new Date(date);
  const minutes = result.getMinutes();
  const remainder = minutes % 15;
  if (remainder !== 0) {
    result.setMinutes(minutes + (15 - remainder), 0, 0);
  } else {
    result.setSeconds(0, 0);
  }
  return result;
}

export function getAvailablePickupSlots(now: Date, estimatedWaitMinutes: number): PickupSlot[] {
  const slots: PickupSlot[] = [];

  // ASAP is always first
  slots.push({
    label: `ASAP (~${estimatedWaitMinutes} min)`,
    value: 'asap',
  });

  const dayOfWeek = now.getDay();
  const hours = getHoursForDay(dayOfWeek);
  if (!hours) return slots;

  // Kitchen cutoff: 30 minutes before close
  const kitchenCutoffMinutes = hours.close - 30;
  const closingTime = new Date(now);
  closingTime.setHours(Math.floor(kitchenCutoffMinutes / 60), kitchenCutoffMinutes % 60, 0, 0);

  // First slot: now + estimated wait, rounded up to next 15-min mark
  const earliestPickup = new Date(now.getTime() + estimatedWaitMinutes * 60 * 1000);
  let slotTime = roundUpTo15Min(earliestPickup);

  while (slotTime <= closingTime) {
    slots.push({
      label: formatTimeLabel(slotTime),
      value: slotTime.toISOString(),
    });
    slotTime = new Date(slotTime.getTime() + 15 * 60 * 1000);
  }

  return slots;
}

export function isValidPickupTime(
  pickupTimeStr: string,
  now: Date,
  estimatedWaitMinutes: number,
): boolean {
  if (pickupTimeStr === 'asap') return true;

  const pickupTime = new Date(pickupTimeStr);
  if (isNaN(pickupTime.getTime())) return false;

  // Must be in the future (with some tolerance for request time)
  const earliestPickup = new Date(now.getTime() + (estimatedWaitMinutes - 5) * 60 * 1000);
  if (pickupTime < earliestPickup) return false;

  // Must be before kitchen cutoff
  const dayOfWeek = pickupTime.getDay();
  const hours = getHoursForDay(dayOfWeek);
  if (!hours) return false;

  const pickupMinutes = pickupTime.getHours() * 60 + pickupTime.getMinutes();
  const kitchenCutoff = hours.close - 30;

  return pickupMinutes <= kitchenCutoff;
}
