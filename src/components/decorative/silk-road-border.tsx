import { cn } from '@/lib/utils';

interface SilkRoadBorderProps {
  className?: string;
}

export function SilkRoadBorder({ className }: SilkRoadBorderProps) {
  return (
    <div className={cn('w-full', className)}>
      <svg
        viewBox="0 0 1200 24"
        xmlns="http://www.w3.org/2000/svg"
        className="h-6 w-full"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <defs>
          <pattern
            id="silk-road-geo"
            x="0"
            y="0"
            width="48"
            height="24"
            patternUnits="userSpaceOnUse"
          >
            {/* Interlocking geometric pattern */}
            <rect width="48" height="24" fill="#2D2926" />
            {/* Diamond chain */}
            <path d="M24 2 L34 12 L24 22 L14 12 Z" fill="none" stroke="#D4A84B" strokeWidth="1.5" />
            {/* Corner squares */}
            <rect x="0" y="0" width="6" height="6" fill="#C75B39" opacity="0.6" />
            <rect x="42" y="0" width="6" height="6" fill="#C75B39" opacity="0.6" />
            <rect x="0" y="18" width="6" height="6" fill="#C75B39" opacity="0.6" />
            <rect x="42" y="18" width="6" height="6" fill="#C75B39" opacity="0.6" />
            {/* Center dot */}
            <circle cx="24" cy="12" r="2" fill="#D4A84B" />
          </pattern>
        </defs>
        <rect width="1200" height="24" fill="url(#silk-road-geo)" />
      </svg>
    </div>
  );
}
