import {cn} from '../../lib/cn';

export interface GoldDividerProps {
  className?: string;
}

export function GoldDivider({className}: GoldDividerProps) {
  return (
    <div
      aria-hidden="true"
      className={cn(
        'h-px w-full bg-gradient-to-r from-transparent via-gold-500/45 to-transparent',
        className
      )}
    />
  );
}
