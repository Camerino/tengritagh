import { cn } from '@/lib/utils';

interface EtlesPatternProps {
  className?: string;
}

export function EtlesPattern({ className }: EtlesPatternProps) {
  return (
    <div className={cn('w-full overflow-hidden', className)}>
      <svg
        viewBox="0 0 800 80"
        xmlns="http://www.w3.org/2000/svg"
        className="h-auto w-full"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <defs>
          <pattern id="etles-ikat" x="0" y="0" width="80" height="80" patternUnits="userSpaceOnUse">
            {/* Background */}
            <rect width="80" height="80" fill="#FFF8F0" />
            {/* Central diamond - terracotta */}
            <path d="M40 8 L56 40 L40 72 L24 40 Z" fill="#C75B39" opacity="0.9" />
            {/* Inner diamond - gold */}
            <path d="M40 20 L48 40 L40 60 L32 40 Z" fill="#D4A84B" opacity="0.8" />
            {/* Side arrows - burgundy */}
            <path d="M8 40 L20 32 L20 48 Z" fill="#6B1D2A" opacity="0.7" />
            <path d="M72 40 L60 32 L60 48 Z" fill="#6B1D2A" opacity="0.7" />
            {/* Top/bottom accents */}
            <path d="M32 4 L40 0 L48 4 L40 8 Z" fill="#6B1D2A" opacity="0.5" />
            <path d="M32 76 L40 80 L48 76 L40 72 Z" fill="#6B1D2A" opacity="0.5" />
            {/* Feathered edges - ikat effect */}
            <line x1="26" y1="24" x2="34" y2="16" stroke="#C75B39" strokeWidth="2" opacity="0.4" />
            <line x1="54" y1="24" x2="46" y2="16" stroke="#C75B39" strokeWidth="2" opacity="0.4" />
            <line x1="26" y1="56" x2="34" y2="64" stroke="#C75B39" strokeWidth="2" opacity="0.4" />
            <line x1="54" y1="56" x2="46" y2="64" stroke="#C75B39" strokeWidth="2" opacity="0.4" />
          </pattern>
        </defs>
        <rect width="800" height="80" fill="url(#etles-ikat)" />
      </svg>
    </div>
  );
}
