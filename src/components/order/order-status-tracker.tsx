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

interface StatusEvent {
  id: string;
  status: string;
  source: string;
  createdAt: string;
}

function getStepIndex(status: string): number {
  const idx = STEPS.findIndex((s) => s.key === status);
  if (status === 'picked_up') return STEPS.length;
  if (status === 'cancelled') return -1;
  return idx;
}

function isTerminal(status: string): boolean {
  return status === 'ready' || status === 'picked_up' || status === 'cancelled';
}

function formatTimestamp(iso: string): string {
  try {
    return new Date(iso).toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true,
    });
  } catch {
    return '';
  }
}

interface OrderStatusTrackerProps {
  orderId: string;
  initialStatus: string;
  initialEvents?: StatusEvent[];
}

export function OrderStatusTracker({
  orderId,
  initialStatus,
  initialEvents = [],
}: OrderStatusTrackerProps) {
  const [status, setStatus] = useState<OrderStatus>(initialStatus as OrderStatus);
  const [events, setEvents] = useState<StatusEvent[]>(initialEvents);

  const pollStatus = useCallback(async () => {
    try {
      const result = await getOrderStatus(orderId);
      if (result) {
        setStatus(result.status as OrderStatus);
        setEvents(result.statusEvents ?? []);
      }
    } catch {
      // Silently fail, will retry next poll
    }
  }, [orderId]);

  useEffect(() => {
    if (isTerminal(status)) return;
    const interval = setInterval(pollStatus, 30000);
    return () => clearInterval(interval);
  }, [pollStatus, status]);

  const currentStepIndex = getStepIndex(status);

  // Build a map: step key -> earliest timestamp from events
  const stepTimestamps = new Map<string, string>();
  for (const evt of events) {
    if (!stepTimestamps.has(evt.status)) {
      stepTimestamps.set(evt.status, evt.createdAt);
    }
  }

  if (status === 'cancelled') {
    return (
      <div className="rounded-lg border border-red-200 bg-red-50 p-4 text-center">
        <p className="font-semibold text-red-700">Order Cancelled</p>
        <p className="mt-1 text-sm text-red-600">Please call the restaurant for assistance.</p>
      </div>
    );
  }

  return (
    <div data-testid="order-status-tracker">
      {status === 'ready' && (
        <div
          className="mb-4 rounded-lg bg-green-50 p-3 text-center font-semibold text-green-700"
          data-testid="ready-banner"
        >
          Ready for Pickup!
        </div>
      )}
      <div className="flex items-center justify-between">
        {STEPS.map((step, index) => {
          const isCompleted = index < currentStepIndex;
          const isActive = index === currentStepIndex;
          const timestamp = stepTimestamps.get(step.key);

          return (
            <div
              key={step.key}
              className="flex flex-1 items-center"
              data-testid={`status-step-${step.key}`}
              data-status={isCompleted ? 'completed' : isActive ? 'active' : 'pending'}
            >
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
                  {isCompleted ? <Check className="h-5 w-5" data-testid="checkmark" /> : index + 1}
                </div>
                <span
                  className={cn(
                    'mt-2 text-xs font-medium',
                    isCompleted || isActive ? 'text-[#2D2926]' : 'text-[#8B8178]',
                  )}
                >
                  {step.label}
                </span>
                {timestamp && (isCompleted || isActive) && (
                  <span
                    className="mt-0.5 text-[10px] text-[#8B8178]"
                    data-testid={`status-time-${step.key}`}
                  >
                    {formatTimestamp(timestamp)}
                  </span>
                )}
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
