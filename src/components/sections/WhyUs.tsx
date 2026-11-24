import {motion} from 'motion/react';
import {IMAGES, site} from '../../data/site';
import {defaultViewport, fadeUp, stagger} from '../../lib/motion';
import {useReducedMotionSafe} from '../../hooks/useReducedMotionSafe';
import {Eyebrow} from '../ui/Eyebrow';
import {GoldDivider} from '../ui/GoldDivider';
import {ImageWithBlur} from '../ui/ImageWithBlur';
import {Section} from '../ui/Section';

export function WhyUs() {
  const reducedMotion = useReducedMotionSafe();

  return (
    <Section id="why-us" surface="ink">
      <div className="grid items-stretch gap-10 lg:grid-cols-12 lg:gap-12">
        <motion.div
          variants={reducedMotion ? undefined : fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={defaultViewport}
          className="lg:col-span-5"
        >
          <div className="h-full min-h-[300px] overflow-hidden rounded-2xl border border-gold-500/20 bg-surface">
            <ImageWithBlur
              src={IMAGES.skinRitual}
              alt="Clean amber skincare serums and warm towels prepared at Maheen's Beauty & Makeup Saloon"
              width={800}
              height={600}
              className="h-full w-full"
            />
          </div>
        </motion.div>

        <motion.div
          variants={reducedMotion ? undefined : stagger}
          initial="hidden"
          whileInView="visible"
          viewport={defaultViewport}
          className="flex flex-col justify-between gap-8 lg:col-span-7"
        >
          <motion.div variants={reducedMotion ? undefined : fadeUp} className="space-y-3">
            <Eyebrow>{site.whyUs.eyebrow}</Eyebrow>
            <h2 className="font-display text-3xl md:text-5xl font-medium text-ivory">
              {site.whyUs.title}
            </h2>
          </motion.div>

          <motion.div
            variants={reducedMotion ? undefined : fadeUp}
            className="divide-y divide-gold-500/15 border-y border-gold-500/20"
          >
            {site.whyUs.points.map((pt, i) => (
              <div key={pt.title} className="grid gap-1.5 py-5 sm:grid-cols-12 sm:gap-4">
                <span className="font-display text-sm text-gold-300 tabular-nums sm:col-span-1">
                  0{i + 1}.
                </span>
                <h3 className="font-display text-xl font-medium text-ivory sm:col-span-4">
                  {pt.title}
                </h3>
                <p className="text-sm text-muted leading-relaxed sm:col-span-7">
                  {pt.detail}
                </p>
              </div>
            ))}
          </motion.div>

          <motion.div variants={reducedMotion ? undefined : fadeUp} className="space-y-3">
            <GoldDivider />
            <blockquote className="pt-2 font-script text-3xl md:text-4xl text-gold-300">
              “{site.brand.taglines.pullQuote}”
            </blockquote>
          </motion.div>
        </motion.div>
      </div>
    </Section>
  );
}
