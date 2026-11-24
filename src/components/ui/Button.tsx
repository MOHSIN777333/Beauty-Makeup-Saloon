import type {ReactNode} from 'react';
import {motion} from 'motion/react';
import {cn} from '../../lib/cn';
import {useReducedMotionSafe} from '../../hooks/useReducedMotionSafe';

export interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  href?: string;
  target?: string;
  rel?: string;
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
  className?: string;
  ariaLabel?: string;
  children: ReactNode;
}

export function Button({
  variant = 'primary',
  size = 'md',
  href,
  target,
  rel,
  onClick,
  type = 'button',
  className,
  ariaLabel,
  children,
}: ButtonProps) {
  const reducedMotion = useReducedMotionSafe();

  const baseStyles = cn(
    'inline-flex items-center justify-center gap-2.5 rounded-full font-medium tracking-wide whitespace-nowrap shrink-0 transition-colors duration-200 cursor-pointer select-none',
    size === 'sm' && 'min-h-[44px] px-5 py-2 text-xs',
    size === 'md' && 'min-h-[46px] px-6 py-2.5 text-sm',
    size === 'lg' && 'min-h-[50px] px-7 py-3 text-sm md:text-base',
    variant === 'primary' &&
      'gold-gradient-bg text-ink font-semibold shadow-sm hover:brightness-110',
    variant === 'secondary' &&
      'border border-gold-500/40 bg-surface/60 text-ivory hover:border-gold-300 hover:bg-surface',
    variant === 'ghost' &&
      'text-gold-300 hover:text-ivory hover:bg-surface/50',
    className
  );

  const tapMotion = reducedMotion ? undefined : {scale: 0.96};

  if (href) {
    return (
      <motion.a
        href={href}
        target={target}
        rel={rel ?? (target === '_blank' ? 'noopener noreferrer' : undefined)}
        onClick={onClick}
        aria-label={ariaLabel}
        whileTap={tapMotion}
        className={baseStyles}
      >
        {children}
      </motion.a>
    );
  }

  return (
    <motion.button
      type={type}
      onClick={onClick}
      aria-label={ariaLabel}
      whileTap={tapMotion}
      className={baseStyles}
    >
      {children}
    </motion.button>
  );
}
