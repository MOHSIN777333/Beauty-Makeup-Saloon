import {useEffect, type ReactNode} from 'react';
import {AnimatePresence, motion, type PanInfo} from 'motion/react';
import {X} from 'lucide-react';
import {LUXURY_EASE} from '../../lib/motion';
import {useReducedMotionSafe} from '../../hooks/useReducedMotionSafe';

export interface BottomSheetProps {
  open: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
}

export function BottomSheet({open, onClose, title, children}: BottomSheetProps) {
  const reducedMotion = useReducedMotionSafe();

  useEffect(() => {
    if (!open) return;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKeyDown);
    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [open, onClose]);

  const handleDragEnd = (_: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    if (info.offset.y > 100 || info.velocity.y > 450) {
      onClose();
    }
  };

  return (
    <AnimatePresence>
      {open && (
        <div
          className="fixed inset-0 z-50 flex items-end justify-center"
          role="dialog"
          aria-modal="true"
          aria-label={title}
        >
          <motion.div
            initial={{opacity: 0}}
            animate={{opacity: 1}}
            exit={{opacity: 0}}
            transition={{duration: 0.22}}
            onClick={onClose}
            className="fixed inset-0 bg-ink/80 backdrop-blur-sm"
            aria-hidden="true"
          />

          <motion.div
            initial={reducedMotion ? {opacity: 0} : {y: '100%'}}
            animate={reducedMotion ? {opacity: 1} : {y: 0}}
            exit={reducedMotion ? {opacity: 0} : {y: '100%'}}
            transition={{duration: 0.35, ease: LUXURY_EASE}}
            drag={reducedMotion ? false : 'y'}
            dragConstraints={{top: 0, bottom: 320}}
            dragElastic={{top: 0.04, bottom: 0.4}}
            onDragEnd={handleDragEnd}
            className="relative z-10 max-h-[86svh] w-full overflow-y-auto rounded-t-3xl border-t border-gold-500/25 bg-charcoal px-5 pb-[calc(1.5rem+env(safe-area-inset-bottom))] pt-3 shadow-2xl"
          >
            <div className="mx-auto mb-3 h-1 w-10 rounded-full bg-gold-500/35" aria-hidden="true" />
            <div className="mb-4 flex items-center justify-between gap-4">
              <h3 className="font-display text-2xl font-semibold text-ivory">{title}</h3>
              <button
                type="button"
                onClick={onClose}
                aria-label={`Close ${title}`}
                className="flex min-h-[44px] min-w-[44px] items-center justify-center rounded-full border border-gold-500/20 bg-surface text-ivory transition-colors hover:border-gold-300 cursor-pointer"
              >
                <X className="h-4 w-4" aria-hidden="true" />
              </button>
            </div>
            {children}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
