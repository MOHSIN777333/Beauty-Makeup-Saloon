import {motion} from 'motion/react';
import {cn} from '../../lib/cn';
import {useReducedMotionSafe} from '../../hooks/useReducedMotionSafe';

export interface ChipProps {
  label: string;
  active: boolean;
  layoutId?: string;
  onClick: () => void;
}

export function Chip({label, active, layoutId = 'filter-pill', onClick}: ChipProps) {
  const reducedMotion = useReducedMotionSafe();

  return (
    <motion.button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      whileTap={reducedMotion ? undefined : {scale: 0.96}}
      className={cn(
        'relative min-h-[44px] rounded-full px-5 py-2 text-xs md:text-sm font-medium whitespace-nowrap shrink-0 transition-colors cursor-pointer',
        active ? 'text-ink' : 'text-muted hover:text-ivory border border-gold-500/20 bg-surface/40'
      )}
    >
      {active && (
        <motion.span
          layoutId={reducedMotion ? undefined : layoutId}
          transition={{duration: 0.28, ease: [0.22, 1, 0.36, 1]}}
          className="gold-gradient-bg absolute inset-0 rounded-full"
          aria-hidden="true"
        />
      )}
      <span className="relative z-10">{label}</span>
    </motion.button>
  );
}
