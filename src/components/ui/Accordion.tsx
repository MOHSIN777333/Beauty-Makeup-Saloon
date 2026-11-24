import {useState} from 'react';
import {AnimatePresence, motion} from 'motion/react';
import {ChevronDown} from 'lucide-react';
import {cn} from '../../lib/cn';
import {LUXURY_EASE} from '../../lib/motion';
import {useReducedMotionSafe} from '../../hooks/useReducedMotionSafe';

export interface AccordionEntry {
  id: string;
  question: string;
  answer: string;
}

export interface AccordionProps {
  items: readonly AccordionEntry[];
}

export function Accordion({items}: AccordionProps) {
  const [openId, setOpenId] = useState<string | null>(items[0]?.id ?? null);
  const reducedMotion = useReducedMotionSafe();

  return (
    <div className="divide-y divide-gold-500/15 border-y border-gold-500/20">
      {items.map((item) => {
        const isOpen = openId === item.id;
        const panelId = `accordion-panel-${item.id}`;
        const buttonId = `accordion-btn-${item.id}`;

        return (
          <div key={item.id}>
            <button
              id={buttonId}
              type="button"
              aria-expanded={isOpen}
              aria-controls={panelId}
              onClick={() => setOpenId(isOpen ? null : item.id)}
              className="flex min-h-[56px] w-full items-center justify-between gap-4 py-5 text-left transition-colors hover:text-gold-300 cursor-pointer"
            >
              <span className="font-display text-xl md:text-2xl font-medium text-ivory">
                {item.question}
              </span>
              <ChevronDown
                className={cn(
                  'h-5 w-5 shrink-0 text-gold-300 transition-transform duration-200',
                  isOpen && 'rotate-180'
                )}
                aria-hidden="true"
              />
            </button>

            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  id={panelId}
                  role="region"
                  aria-labelledby={buttonId}
                  initial={reducedMotion ? {opacity: 0} : {opacity: 0, height: 0}}
                  animate={reducedMotion ? {opacity: 1} : {opacity: 1, height: 'auto'}}
                  exit={reducedMotion ? {opacity: 0} : {opacity: 0, height: 0}}
                  transition={{duration: 0.28, ease: LUXURY_EASE}}
                  className="overflow-hidden"
                >
                  <p className="pb-6 pr-8 text-sm md:text-base text-muted leading-relaxed">
                    {item.answer}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}
