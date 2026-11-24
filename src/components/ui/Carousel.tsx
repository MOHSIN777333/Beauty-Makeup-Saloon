import {useRef, useState, type ReactNode} from 'react';
import {cn} from '../../lib/cn';

export interface CarouselProps {
  itemCount: number;
  ariaLabel: string;
  children: ReactNode;
}

export function Carousel({itemCount, ariaLabel, children}: CarouselProps) {
  const scrollRef = useRef<HTMLDivElement | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const handleScroll = () => {
    const el = scrollRef.current;
    if (!el || itemCount <= 1) return;
    const maxScroll = el.scrollWidth - el.clientWidth;
    if (maxScroll <= 0) return;
    const ratio = el.scrollLeft / maxScroll;
    const index = Math.round(ratio * (itemCount - 1));
    setActiveIndex(Math.max(0, Math.min(itemCount - 1, index)));
  };

  const scrollToSlide = (index: number) => {
    const el = scrollRef.current;
    if (!el) return;
    const targetChild = el.children[index] as HTMLElement | undefined;
    if (targetChild) {
      el.scrollTo({left: targetChild.offsetLeft - 20, behavior: 'smooth'});
      setActiveIndex(index);
    }
  };

  return (
    <div>
      <div
        ref={scrollRef}
        onScroll={handleScroll}
        role="region"
        aria-label={ariaLabel}
        className="no-scrollbar -mx-5 flex snap-x snap-mandatory gap-4 overflow-x-auto px-5 md:mx-0 md:grid md:grid-cols-2 md:gap-6 md:overflow-visible md:px-0"
      >
        {children}
      </div>

      {itemCount > 1 && (
        <div className="mt-5 flex items-center justify-center gap-2 md:hidden" aria-label="Slide pagination">
          {Array.from({length: itemCount}).map((_, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => scrollToSlide(idx)}
              aria-label={`Go to slide ${idx + 1}`}
              aria-current={activeIndex === idx ? 'true' : undefined}
              className="flex min-h-[44px] min-w-[28px] items-center justify-center cursor-pointer"
            >
              <span
                className={cn(
                  'h-1.5 rounded-full transition-all duration-200',
                  activeIndex === idx ? 'w-6 bg-gold-500' : 'w-2 bg-gold-500/30'
                )}
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
