import type {ReactNode} from 'react';
import {cn} from '../../lib/cn';

export interface EyebrowProps {
  tone?: 'gold' | 'blush' | 'muted';
  className?: string;
  children: ReactNode;
}

export function Eyebrow({tone = 'gold', className, children}: EyebrowProps) {
  return (
    <p
      className={cn(
        'text-xs font-medium tracking-[0.2em]',
        tone === 'gold' && 'text-gold-300',
        tone === 'blush' && 'text-blush',
        tone === 'muted' && 'text-muted',
        className
      )}
    >
      {children}
    </p>
  );
}
