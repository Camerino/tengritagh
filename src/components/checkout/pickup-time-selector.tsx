'use client';

import { cn } from '@/lib/utils';

interface PickupSlot {
  label: string;
  value: string;
}

interface PickupTimeSelectorProps {
  slots: PickupSlot[];
  selectedValue: string;
  onSelect: (value: string) => void;
}

export function PickupTimeSelector({ slots, selectedValue, onSelect }: PickupTimeSelectorProps) {
  if (slots.length === 0) {
    return (
      <div>
        <h2 className="font-heading text-xl font-bold text-[#2D2926]">Pickup Time</h2>
        <p className="mt-2 text-sm text-[#8B8178]">
          No pickup slots available right now. The store may be closed.
        </p>
      </div>
    );
  }

  return (
    <div>
      <h2 className="font-heading mb-3 text-xl font-bold text-[#2D2926]">Pickup Time</h2>
      <div className="grid grid-cols-3 gap-2 sm:grid-cols-4" data-testid="pickup-time-grid">
        {slots.map((slot) => (
          <button
            key={slot.value}
            type="button"
            onClick={() => onSelect(slot.value)}
            className={cn(
              'rounded-lg border px-3 py-2 text-sm font-medium transition-colors',
              selectedValue === slot.value
                ? 'border-[#C75B39] bg-[#C75B39] text-white'
                : 'border-[#e5ddd4] bg-white text-[#2D2926] hover:border-[#C75B39] hover:bg-[#C75B39]/5',
            )}
            data-testid="pickup-time-slot"
          >
            {slot.label}
          </button>
        ))}
      </div>
    </div>
  );
}
