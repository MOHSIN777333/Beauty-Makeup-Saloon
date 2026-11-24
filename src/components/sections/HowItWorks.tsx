import {motion} from 'motion/react';
import {site} from '../../data/site';
import {defaultViewport, fadeUp, stagger} from '../../lib/motion';
import {useReducedMotionSafe} from '../../hooks/useReducedMotionSafe';
import {Eyebrow} from '../ui/Eyebrow';
import {Section} from '../ui/Section';

export function HowItWorks() {
  const reducedMotion = useReducedMotionSafe();

  return (
    <Section id="how-it-works" surface="ink">
      <div className="mb-12 space-y-3 md:text-center">
        <Eyebrow>Simple Booking</Eyebrow>
        <h2 className="font-display text-3xl md:text-5xl font-medium text-ivory">
          How booking works
        </h2>
      </div>

      <motion.div
        variants={reducedMotion ? undefined : stagger}
        initial="hidden"
        whileInView="visible"
        viewport={defaultViewport}
        className="relative grid gap-8 md:grid-cols-3 md:gap-10"
      >
        {/* Connecting horizontal hairline on desktop */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute left-[16%] right-[16%] top-6 hidden h-px bg-gradient-to-r from-gold-500/20 via-gold-500/50 to-gold-500/20 md:block"
        />

        {site.howItWorks.map((item) => (
          <motion.div
            key={item.step}
            variants={reducedMotion ? undefined : fadeUp}
            className="relative flex flex-row items-start gap-5 md:flex-col md:items-center md:text-center"
          >
            <div className="relative z-10 flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-gold-500/45 bg-charcoal font-display text-lg font-semibold text-gold-300 tabular-nums">
              {item.step}
            </div>

            <div className="space-y-1.5">
              <h3 className="font-display text-2xl font-medium text-ivory">
                {item.title}
              </h3>
              <p className="max-w-xs text-sm text-muted leading-relaxed">
                {item.detail}
              </p>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </Section>
  );
}
