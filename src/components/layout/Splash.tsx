import {useEffect, useState} from 'react';
import {AnimatePresence, motion} from 'motion/react';
import {LUXURY_EASE} from '../../lib/motion';
import {useReducedMotionSafe} from '../../hooks/useReducedMotionSafe';

export function Splash() {
  const reducedMotion = useReducedMotionSafe();
  const [visible, setVisible] = useState<boolean>(() => {
    if (typeof window === 'undefined') return false;
    const params = new URLSearchParams(window.location.search);
    if (params.get('autostart') === '1') return false;
    try {
      return !sessionStorage.getItem('maheens_splash_seen');
    } catch {
      return false;
    }
  });

  useEffect(() => {
    if (!visible) return;
    try {
      sessionStorage.setItem('maheens_splash_seen', '1');
    } catch {
      // ignore storage failure
    }
    const timer = window.setTimeout(() => setVisible(false), 520);
    return () => window.clearTimeout(timer);
  }, [visible]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{opacity: 1}}
          exit={{opacity: 0}}
          transition={{duration: reducedMotion ? 0.15 : 0.3, ease: LUXURY_EASE}}
          className="fixed inset-0 z-[70] flex items-center justify-center bg-ink pointer-events-none"
          aria-hidden="true"
        >
          <motion.div
            initial={reducedMotion ? {opacity: 1} : {opacity: 0, scale: 0.92}}
            animate={{opacity: 1, scale: 1}}
            transition={{duration: 0.28, ease: LUXURY_EASE}}
            className="flex flex-col items-center gap-3"
          >
            <div className="flex h-16 w-16 items-center justify-center rounded-full border border-gold-500/50 bg-charcoal">
              <span className="gold-gradient-text font-display text-3xl font-semibold">M</span>
            </div>
            <span className="font-display text-sm tracking-[0.28em] text-gold-300 uppercase">
              Maheen&apos;s
            </span>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
