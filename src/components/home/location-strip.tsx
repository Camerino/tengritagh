import { MapPin, Phone, Clock } from 'lucide-react';
import { RESTAURANT, STORE_HOURS } from '@/lib/constants';
import { Badge } from '@/components/ui/badge';

function getIsOpen(): boolean {
  const now = new Date();
  const estFormatter = new Intl.DateTimeFormat('en-US', {
    timeZone: 'America/New_York',
    hour: 'numeric',
    minute: 'numeric',
    hour12: false,
    weekday: 'long',
  });
  const parts = estFormatter.formatToParts(now);
  const dayPart = parts.find((p) => p.type === 'weekday');
  const hourPart = parts.find((p) => p.type === 'hour');
  const minutePart = parts.find((p) => p.type === 'minute');

  if (!dayPart || !hourPart || !minutePart) return false;

  const dayName = dayPart.value;
  const currentMinutes = parseInt(hourPart.value) * 60 + parseInt(minutePart.value);

  const todayHours = STORE_HOURS.find((h) => h.day === dayName);
  if (!todayHours) return false;

  const openMinutes = parseTimeToMinutes(todayHours.open);
  const closeMinutes = parseTimeToMinutes(todayHours.close);

  return currentMinutes >= openMinutes && currentMinutes < closeMinutes;
}

function parseTimeToMinutes(time: string): number {
  const match = time.match(/(\d+):(\d+)\s*(AM|PM)/i);
  if (!match) return 0;
  const [, hourStr, minuteStr, period] = match;
  let hour = parseInt(hourStr ?? '0');
  const minute = parseInt(minuteStr ?? '0');
  if (period?.toUpperCase() === 'PM' && hour !== 12) hour += 12;
  if (period?.toUpperCase() === 'AM' && hour === 12) hour = 0;
  return hour * 60 + minute;
}

export function LocationStrip() {
  const isOpen = getIsOpen();

  return (
    <section
      aria-labelledby="location-strip-heading"
      data-testid="location-strip"
      className="w-full border-t border-[#E5DDD4] bg-white py-8 sm:py-12"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h2 id="location-strip-heading" className="sr-only">
          Location Information
        </h2>
        <div className="flex flex-col items-center gap-6 sm:flex-row sm:justify-between">
          {/* Map thumbnail placeholder */}
          <div className="flex h-24 w-24 flex-shrink-0 items-center justify-center rounded-lg bg-[#E8E2DA]">
            <MapPin className="h-8 w-8 text-[#C75B39]" />
          </div>

          {/* Address */}
          <div className="text-center sm:text-left">
            <a
              href={RESTAURANT.googleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-[#2D2926] transition-colors hover:text-[#C75B39]"
            >
              {RESTAURANT.address}
            </a>
            <p className="text-sm text-[#8B8178]">{RESTAURANT.addressShort}</p>
          </div>

          {/* Phone */}
          <div className="flex items-center gap-2">
            <Phone className="h-4 w-4 text-[#C75B39]" />
            <a
              href={RESTAURANT.phoneHref}
              className="text-[#2D2926] transition-colors hover:text-[#C75B39]"
            >
              {RESTAURANT.phone}
            </a>
          </div>

          {/* Hours summary */}
          <div className="flex items-center gap-2">
            <Clock className="h-4 w-4 text-[#C75B39]" />
            <span className="text-sm text-[#2D2926]">Mon-Thu 11-10 | Fri-Sat 11-11 | Sun 12-9</span>
          </div>

          {/* Open/Closed badge */}
          <Badge
            className={`border-0 ${isOpen ? 'bg-green-600 text-white' : 'bg-red-600 text-white'}`}
            data-testid="open-closed-badge"
          >
            {isOpen ? 'Open Now' : 'Closed'}
          </Badge>
        </div>
      </div>
    </section>
  );
}
