import type {ReactNode} from 'react';
import {cn} from '../../lib/cn';

export interface SectionProps {
  id?: string;
  surface?: 'ink' | 'charcoal';
  className?: string;
  innerClassName?: string;
  children: ReactNode;
}

export function Section({
  id,
  surface = 'ink',
  className,
  innerClassName,
  children,
}: SectionProps) {
  return (
    <section
      id={id}
      className={cn(
        'relative scroll-mt-16 overflow-x-clip',
        surface === 'ink' ? 'bg-ink' : 'bg-charcoal',
        className
      )}
    >
      <div className={cn('mx-auto w-full max-w-[1200px] px-5 py-16 md:px-8 md:py-24', innerClassName)}>
        {children}
      </div>
    </section>
  );
}
