import {useEffect, type ReactNode} from 'react';
import {AnimatePresence, motion} from 'motion/react';
import {X} from 'lucide-react';
import {LUXURY_EASE} from '../../lib/motion';
import {useReducedMotionSafe} from '../../hooks/useReducedMotionSafe';
import {cn} from '../../lib/cn';

export interface ModalProps {
  open: boolean;
  onClose: () => void;
  title: string;
  maxWidthClass?: string;
  children: ReactNode;
}

export function Modal({
  open,
  onClose,
  title,
  maxWidthClass = 'max-w-xl',
  children,
}: ModalProps) {
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

  return (
    <AnimatePresence>
      {open && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-5"
          role="dialog"
          aria-modal="true"
          aria-label={title}
        >
          <motion.div
            initial={{opacity: 0}}
            animate={{opacity: 1}}
            exit={{opacity: 0}}
            transition={{duration: 0.2}}
            onClick={onClose}
            className="fixed inset-0 bg-ink/85 backdrop-blur-sm"
            aria-hidden="true"
          />

          <motion.div
            initial={reducedMotion ? {opacity: 0} : {opacity: 0, scale: 0.96, y: 12}}
            animate={reducedMotion ? {opacity: 1} : {opacity: 1, scale: 1, y: 0}}
            exit={reducedMotion ? {opacity: 0} : {opacity: 0, scale: 0.96, y: 12}}
            transition={{duration: 0.3, ease: LUXURY_EASE}}
            className={cn(
              'relative z-10 max-h-[88vh] w-full overflow-y-auto rounded-2xl border border-gold-500/25 bg-charcoal p-6 md:p-8 shadow-2xl',
              maxWidthClass
            )}
          >
            <div className="mb-5 flex items-start justify-between gap-4">
              <h3 className="font-display text-2xl md:text-3xl font-semibold text-ivory">
                {title}
              </h3>
              <button
                type="button"
                onClick={onClose}
                aria-label={`Close ${title}`}
                className="flex min-h-[44px] min-w-[44px] shrink-0 items-center justify-center rounded-full border border-gold-500/25 bg-surface text-ivory transition-colors hover:border-gold-300 cursor-pointer"
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
