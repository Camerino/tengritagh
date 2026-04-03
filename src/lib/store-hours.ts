import { getSiteConfig } from '@/db/queries/site-config';

interface DayHours {
  open: number; // minutes from midnight, e.g. 660 = 11:00 AM
  close: number;
}

// Default hours: Mon-Thu 11am-9pm, Fri-Sat 11am-10pm, Sun 12pm-8pm
// dayOfWeek: 0=Sunday, 1=Monday, ..., 6=Saturday
const DEFAULT_HOURS: Record<number, DayHours> = {
  0: { open: 720, close: 1200 }, // Sunday 12pm-8pm
  1: { open: 660, close: 1260 }, // Monday 11am-9pm
  2: { open: 660, close: 1260 }, // Tuesday 11am-9pm
  3: { open: 660, close: 1260 }, // Wednesday 11am-9pm
  4: { open: 660, close: 1260 }, // Thursday 11am-9pm
  5: { open: 660, close: 1320 }, // Friday 11am-10pm
  6: { open: 660, close: 1320 }, // Saturday 11am-10pm
};

export function getHoursForDay(dayOfWeek: number): DayHours | undefined {
  return DEFAULT_HOURS[dayOfWeek];
}

function minutesFromMidnight(date: Date): number {
  return date.getHours() * 60 + date.getMinutes();
}

export function isStoreOpenAt(date: Date): boolean {
  const dayOfWeek = date.getDay();
  const hours = DEFAULT_HOURS[dayOfWeek];
  if (!hours) return false;
  const mins = minutesFromMidnight(date);
  return mins >= hours.open && mins < hours.close;
}

export async function isStoreOpen(now?: Date): Promise<boolean> {
  const currentTime = now ?? new Date();

  // Check siteConfig override
  const storeOpenConfig = await getSiteConfig('storeOpen');
  if (storeOpenConfig === 'true') return true;
  if (storeOpenConfig === 'false') return false;

  // Default: "auto" — use schedule
  return isStoreOpenAt(currentTime);
}

export function getClosingTimeToday(now?: Date): Date | null {
  const currentTime = now ?? new Date();
  const dayOfWeek = currentTime.getDay();
  const hours = DEFAULT_HOURS[dayOfWeek];
  if (!hours) return null;

  const closeDate = new Date(currentTime);
  closeDate.setHours(Math.floor(hours.close / 60), hours.close % 60, 0, 0);
  return closeDate;
}

export async function getEstimatedWaitMinutes(): Promise<number> {
  const config = await getSiteConfig('estimatedWaitMinutes');
  if (config) {
    const parsed = parseInt(config, 10);
    if (!isNaN(parsed) && parsed > 0) return parsed;
  }
  return 20; // default
}
