import { cn } from '@/lib/utils';

interface DividerProps {
  className?: string;
}

export function Divider({ className }: DividerProps) {
  return (
    <div
      className={cn('flex w-full items-center justify-center py-4', className)}
      aria-hidden="true"
    >
      <div className="bg-border h-px flex-1" />
      <svg viewBox="0 0 24 24" className="text-gold mx-4 h-4 w-4" fill="currentColor">
        <path d="M12 2 L15 9 L22 12 L15 15 L12 22 L9 15 L2 12 L9 9 Z" />
      </svg>
      <div className="bg-border h-px flex-1" />
    </div>
  );
}
