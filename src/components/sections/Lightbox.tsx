import {useEffect} from 'react';
import {AnimatePresence, motion, type PanInfo} from 'motion/react';
import {ChevronLeft, ChevronRight, MessageCircle, X} from 'lucide-react';
import type {GalleryItem} from '../../data/site';
import {trackEvent} from '../../lib/analytics';
import {wrapLightboxIndex} from '../../lib/gallery';
import {LUXURY_EASE} from '../../lib/motion';
import {waLink, waServiceMessage} from '../../lib/whatsapp';
import {useReducedMotionSafe} from '../../hooks/useReducedMotionSafe';
import {Button} from '../ui/Button';

export interface LightboxProps {
  items: readonly GalleryItem[];
  activeIndex: number | null;
  onClose: () => void;
  onChangeIndex: (index: number) => void;
}

export function Lightbox({
  items,
  activeIndex,
  onClose,
  onChangeIndex,
}: LightboxProps) {
  const reducedMotion = useReducedMotionSafe();
  const isOpen = activeIndex !== null && items.length > 0;
  const current = isOpen && activeIndex !== null ? items[activeIndex] : null;

  useEffect(() => {
    if (!isOpen || activeIndex === null) return;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight') {
        onChangeIndex(wrapLightboxIndex(activeIndex, 1, items.length));
      }
      if (e.key === 'ArrowLeft') {
        onChangeIndex(wrapLightboxIndex(activeIndex, -1, items.length));
      }
    };

    window.addEventListener('keydown', onKeyDown);
    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [isOpen, activeIndex, items.length, onClose, onChangeIndex]);

  const handleDragEnd = (_: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    if (activeIndex === null) return;
    if (info.offset.x < -60) {
      onChangeIndex(wrapLightboxIndex(activeIndex, 1, items.length));
    } else if (info.offset.x > 60) {
      onChangeIndex(wrapLightboxIndex(activeIndex, -1, items.length));
    }
  };

  return (
    <AnimatePresence>
      {isOpen && current && activeIndex !== null && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8"
          role="dialog"
          aria-modal="true"
          aria-label={current.title}
        >
          <motion.div
            initial={{opacity: 0}}
            animate={{opacity: 1}}
            exit={{opacity: 0}}
            onClick={onClose}
            className="fixed inset-0 bg-ink/95 backdrop-blur-md"
            aria-hidden="true"
          />

          <motion.div
            initial={reducedMotion ? {opacity: 0} : {opacity: 0, scale: 0.96}}
            animate={reducedMotion ? {opacity: 1} : {opacity: 1, scale: 1}}
            exit={reducedMotion ? {opacity: 0} : {opacity: 0, scale: 0.96}}
            transition={{duration: 0.28, ease: LUXURY_EASE}}
            className="relative z-10 flex w-full max-w-3xl flex-col gap-4"
          >
            {/* Top bar */}
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-xs tracking-[0.2em] text-gold-300 uppercase">
                  {current.category} · {activeIndex + 1} / {items.length}
                </p>
                <h3 className="font-display text-2xl font-medium text-ivory">
                  {current.title}
                </h3>
              </div>

              <button
                type="button"
                onClick={onClose}
                aria-label="Close lightbox"
                className="flex h-11 w-11 items-center justify-center rounded-full border border-gold-500/30 bg-charcoal text-ivory transition-colors hover:border-gold-300 cursor-pointer"
              >
                <X className="h-5 w-5" aria-hidden="true" />
              </button>
            </div>

            {/* Image stage with swipe */}
            <div className="relative overflow-hidden rounded-2xl border border-gold-500/25 bg-charcoal">
              <motion.img
                key={current.id}
                src={current.image}
                alt={current.alt}
                referrerPolicy="no-referrer"
                drag={reducedMotion ? false : 'x'}
                dragConstraints={{left: 0, right: 0}}
                dragElastic={0.25}
                onDragEnd={handleDragEnd}
                className="max-h-[65vh] w-full object-contain cursor-grab active:cursor-grabbing"
              />

              {items.length > 1 && (
                <>
                  <button
                    type="button"
                    onClick={() => onChangeIndex(wrapLightboxIndex(activeIndex, -1, items.length))}
                    aria-label="Previous image"
                    className="absolute left-3 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-gold-500/30 bg-ink/80 text-ivory transition-colors hover:border-gold-300 cursor-pointer"
                  >
                    <ChevronLeft className="h-5 w-5" aria-hidden="true" />
                  </button>
                  <button
                    type="button"
                    onClick={() => onChangeIndex(wrapLightboxIndex(activeIndex, 1, items.length))}
                    aria-label="Next image"
                    className="absolute right-3 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-gold-500/30 bg-ink/80 text-ivory transition-colors hover:border-gold-300 cursor-pointer"
                  >
                    <ChevronRight className="h-5 w-5" aria-hidden="true" />
                  </button>
                </>
              )}
            </div>

            <div className="flex items-center justify-end">
              <Button
                href={waLink(waServiceMessage(`${current.category} look (${current.title})`))}
                target="_blank"
                size="sm"
                onClick={() => trackEvent('whatsapp_click', {source: `gallery_${current.id}`})}
              >
                <MessageCircle className="h-4 w-4" aria-hidden="true" />
                <span>Book a look like this</span>
              </Button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
