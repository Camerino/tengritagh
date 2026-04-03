'use client';

import { useEffect, useState, useCallback } from 'react';
import { Check } from 'lucide-react';
import { cn } from '@/lib/utils';
import { getOrderStatus } from '@/app/order/[id]/actions';

const STEPS = [
  { key: 'received', label: 'Received' },
  { key: 'preparing', label: 'Preparing' },
  { key: 'ready', label: 'Ready' },
] as const;

type OrderStatus = (typeof STEPS)[number]['key'] | 'picked_up' | 'cancelled';

function getStepIndex(status: string): number {
  const idx = STEPS.findIndex((s) => s.key === status);
  if (status === 'picked_up') return STEPS.length;
  if (status === 'cancelled') return -1;
  return idx;
}

interface OrderStatusTrackerProps {
  orderId: string;
  initialStatus: string;
}

export function OrderStatusTracker({ orderId, initialStatus }: OrderStatusTrackerProps) {
  const [status, setStatus] = useState<OrderStatus>(initialStatus as OrderStatus);

  const pollStatus = useCallback(async () => {
    try {
      const result = await getOrderStatus(orderId);
      if (result) {
        setStatus(result.status as OrderStatus);
      }
    } catch {
      // Silently fail, will retry next poll
    }
  }, [orderId]);

  useEffect(() => {
    const interval = setInterval(pollStatus, 30000);
    return () => clearInterval(interval);
  }, [pollStatus]);

  const currentStepIndex = getStepIndex(status);

  if (status === 'cancelled') {
    return (
      <div className="rounded-lg border border-red-200 bg-red-50 p-4 text-center">
        <p className="font-semibold text-red-700">Order Cancelled</p>
      </div>
    );
  }

  return (
    <div data-testid="order-status-tracker">
      <div className="flex items-center justify-between">
        {STEPS.map((step, index) => {
          const isCompleted = index < currentStepIndex;
          const isActive = index === currentStepIndex;

          return (
            <div key={step.key} className="flex flex-1 items-center">
              {/* Step dot */}
              <div className="flex flex-col items-center">
                <div
                  className={cn(
                    'flex h-10 w-10 items-center justify-center rounded-full border-2 text-sm font-bold transition-colors',
                    isCompleted
                      ? 'border-green-500 bg-green-500 text-white'
                      : isActive
                        ? 'border-[#C75B39] bg-[#C75B39] text-white'
                        : 'border-[#e5ddd4] bg-white text-[#8B8178]',
                  )}
                >
                  {isCompleted ? <Check className="h-5 w-5" /> : index + 1}
                </div>
                <span
                  className={cn(
                    'mt-2 text-xs font-medium',
                    isCompleted || isActive ? 'text-[#2D2926]' : 'text-[#8B8178]',
                  )}
                >
                  {step.label}
                </span>
              </div>

              {/* Connecting line */}
              {index < STEPS.length - 1 && (
                <div
                  className={cn(
                    'mx-2 h-0.5 flex-1',
                    index < currentStepIndex ? 'bg-green-500' : 'bg-[#e5ddd4]',
                  )}
                />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
