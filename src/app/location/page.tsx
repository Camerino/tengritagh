import type { Metadata } from 'next';
import { MapPin, Phone, Mail, Clock } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { RESTAURANT, STORE_HOURS } from '@/lib/constants';
import { getSiteConfig } from '@/db/queries/site-config';

export const metadata: Metadata = {
  title: 'Location & Hours | Tengri Tagh Uyghur Cuisine',
  description:
    'Find Tengri Tagh Uyghur Cuisine near Times Square, NYC. View our hours, address, phone number, and get directions. Open Monday through Sunday.',
  openGraph: {
    title: 'Location & Hours | Tengri Tagh Uyghur Cuisine',
    description: 'Find us near Times Square, NYC. View hours, address, and get directions.',
    url: `${RESTAURANT.siteUrl}/location`,
    siteName: RESTAURANT.name,
    type: 'website',
    images: [
      {
        url: `${RESTAURANT.siteUrl}/og-image.png`,
        width: 1200,
        height: 630,
        alt: 'Tengri Tagh Location',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Location & Hours | Tengri Tagh Uyghur Cuisine',
    description: 'Find us near Times Square, NYC. View hours and get directions.',
    images: [`${RESTAURANT.siteUrl}/og-image.png`],
  },
};

function getCurrentDay(): string {
  const formatter = new Intl.DateTimeFormat('en-US', {
    timeZone: 'America/New_York',
    weekday: 'long',
  });
  return formatter.format(new Date());
}

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

export default async function LocationPage() {
  const estimatedWait = await getSiteConfig('estimatedWaitMinutes');
  const currentDay = getCurrentDay();
  const isOpen = getIsOpen();

  return (
    <div
      className="mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8"
      data-testid="location-page"
    >
      <div className="mb-8 text-center">
        <h1 className="font-heading text-4xl font-bold text-[#2D2926] sm:text-5xl">
          Location & Hours
        </h1>
        <p className="mt-2 text-[#8B8178]">Come visit us near Times Square</p>
      </div>

      {/* Estimated Wait Banner */}
      {estimatedWait && (
        <div className="mb-8 rounded-lg bg-[#D4A84B]/10 p-4 text-center" data-testid="wait-banner">
          <p className="text-lg font-medium text-[#2D2926]">
            <Clock className="mr-2 inline-block h-5 w-5 text-[#D4A84B]" />
            Estimated wait: ~{estimatedWait} minutes
          </p>
        </div>
      )}

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
        {/* Google Maps placeholder */}
        <div
          className="flex h-80 items-center justify-center rounded-xl bg-[#E8E2DA] lg:h-full lg:min-h-[400px]"
          data-testid="map-placeholder"
        >
          <div className="text-center">
            <MapPin className="mx-auto h-12 w-12 text-[#C75B39]" />
            <p className="mt-2 text-sm text-[#8B8178]">Google Maps</p>
            <p className="text-xs text-[#8B8178]">(Will be added with API key)</p>
          </div>
        </div>

        {/* Contact + Hours */}
        <div className="space-y-6">
          {/* Contact Card */}
          <Card data-testid="contact-card">
            <CardContent className="p-6">
              <h2 className="font-heading mb-4 text-xl font-semibold text-[#2D2926]">
                Contact Information
              </h2>

              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <MapPin className="mt-1 h-5 w-5 flex-shrink-0 text-[#C75B39]" />
                  <div>
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
                </div>

                <div className="flex items-center gap-3">
                  <Phone className="h-5 w-5 flex-shrink-0 text-[#C75B39]" />
                  <a
                    href={RESTAURANT.phoneHref}
                    className="font-medium text-[#2D2926] transition-colors hover:text-[#C75B39]"
                  >
                    {RESTAURANT.phone}
                  </a>
                </div>

                <div className="flex items-center gap-3">
                  <Mail className="h-5 w-5 flex-shrink-0 text-[#C75B39]" />
                  <a
                    href={`mailto:${RESTAURANT.email}`}
                    className="font-medium text-[#2D2926] transition-colors hover:text-[#C75B39]"
                  >
                    {RESTAURANT.email}
                  </a>
                </div>
              </div>

              <div className="mt-4">
                <Badge
                  className={`border-0 ${isOpen ? 'bg-green-600 text-white' : 'bg-red-600 text-white'}`}
                  data-testid="open-closed-badge"
                  role="status"
                  aria-label={isOpen ? 'Currently open' : 'Currently closed'}
                >
                  {isOpen ? 'Open Now' : 'Closed'}
                </Badge>
              </div>
            </CardContent>
          </Card>

          {/* Hours Table */}
          <Card data-testid="hours-card">
            <CardContent className="p-6">
              <h2 className="font-heading mb-4 text-xl font-semibold text-[#2D2926]">Hours</h2>
              <table className="w-full">
                <thead className="sr-only">
                  <tr>
                    <th>Day</th>
                    <th>Hours</th>
                  </tr>
                </thead>
                <tbody>
                  {STORE_HOURS.map((entry) => (
                    <tr
                      key={entry.day}
                      className={`border-b border-[#E8E2DA] last:border-0 ${
                        entry.day === currentDay ? 'font-semibold text-[#C75B39]' : 'text-[#2D2926]'
                      }`}
                    >
                      <td className="py-2.5 text-sm">{entry.day}</td>
                      <td className="py-2.5 text-right text-sm">
                        {entry.open} - {entry.close}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
