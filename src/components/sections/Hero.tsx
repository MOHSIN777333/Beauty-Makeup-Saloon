import {ArrowDownRight, MessageCircle, Phone, Star} from 'lucide-react';
import {motion} from 'motion/react';
import {IMAGES, site} from '../../data/site';
import {trackEvent} from '../../lib/analytics';
import {LUXURY_EASE, maskReveal, stagger} from '../../lib/motion';
import {waGeneralMessage, waLink} from '../../lib/whatsapp';
import {useReducedMotionSafe} from '../../hooks/useReducedMotionSafe';
import {Button} from '../ui/Button';
import {Eyebrow} from '../ui/Eyebrow';

export function Hero() {
  const reducedMotion = useReducedMotionSafe();

  return (
    <section
      id="home"
      className="relative flex min-h-[100svh] items-end lg:items-center overflow-hidden bg-ink pt-14 lg:pt-20"
    >
      {/* Mobile full-bleed background portrait */}
      <div className="absolute inset-0 lg:hidden" aria-hidden="true">
        <motion.img
          src={IMAGES.heroBridal}
          alt=""
          fetchPriority="high"
          decoding="sync"
          referrerPolicy="no-referrer"
          initial={reducedMotion ? {opacity: 1} : {scale: 1.08, opacity: 0.85}}
          animate={{scale: 1, opacity: 1}}
          transition={{duration: 0.7, ease: LUXURY_EASE}}
          className="h-full w-full object-cover object-top"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/75 to-ink/25" />
      </div>

      {/* Desktop subtle ambient corner depth (no heavy washes) */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 hidden lg:block bg-[radial-gradient(circle_at_78%_38%,rgba(201,162,75,0.08),transparent_48%)]"
      />

      <div className="relative z-10 mx-auto w-full max-w-[1200px] px-5 pb-24 pt-8 md:px-8 lg:py-16">
        <div className="grid items-center gap-10 lg:grid-cols-12 lg:gap-12">
          {/* Left editorial column */}
          <motion.div
            variants={reducedMotion ? undefined : stagger}
            initial="hidden"
            animate="visible"
            className="lg:col-span-6 space-y-5 md:space-y-6"
          >
            <motion.div variants={reducedMotion ? undefined : maskReveal}>
              <Eyebrow>{site.hero.eyebrow}</Eyebrow>
            </motion.div>

            <motion.h1
              variants={reducedMotion ? undefined : maskReveal}
              className="font-display text-[clamp(2.55rem,5.2vw,4.55rem)] font-medium leading-[1.03] tracking-tight text-ivory"
            >
              {site.brand.taglines.heroPrefix}{' '}
              <span className="font-script block text-[1.3em] font-normal leading-[0.95] text-gold-300 mt-1">
                {site.brand.taglines.heroScript}
              </span>
            </motion.h1>

            <motion.p
              variants={reducedMotion ? undefined : maskReveal}
              className="max-w-md text-base md:text-lg text-ivory/85 lg:text-muted leading-relaxed"
            >
              {site.hero.supportingLine}
            </motion.p>

            <motion.div
              variants={reducedMotion ? undefined : maskReveal}
              className="flex flex-wrap items-center gap-3 pt-1"
            >
              <Button
                href={waLink(waGeneralMessage())}
                target="_blank"
                size="lg"
                onClick={() => trackEvent('whatsapp_click', {source: 'hero'})}
              >
                <MessageCircle className="h-4 w-4" aria-hidden="true" />
                <span>{site.hero.primaryCta}</span>
              </Button>

              <Button href="#services" variant="secondary" size="lg">
                <span>{site.hero.secondaryCta}</span>
                <ArrowDownRight className="h-4 w-4 text-gold-300" aria-hidden="true" />
              </Button>
            </motion.div>

            {/* Tiny utility row under CTAs */}
            <motion.div
              variants={reducedMotion ? undefined : maskReveal}
              className="flex flex-wrap items-center gap-x-5 gap-y-2 pt-2 text-xs md:text-sm text-muted"
            >
              {site.contact.openingHoursToday && (
                <span>Open today until {site.contact.openingHoursToday}</span>
              )}

              <a
                href={site.contact.phoneHref}
                onClick={() => trackEvent('call_click', {source: 'hero'})}
                className="inline-flex min-h-[44px] items-center gap-2 text-ivory/90 transition-colors hover:text-gold-300 tabular-nums"
              >
                <Phone className="h-3.5 w-3.5 text-gold-500" aria-hidden="true" />
                <span>Call {site.contact.phoneDisplay}</span>
              </a>

              {site.contact.googleRating && (
                <span className="inline-flex items-center gap-1.5 text-ivory/90 tabular-nums">
                  <Star className="h-3.5 w-3.5 fill-gold-500 text-gold-500" aria-hidden="true" />
                  <span>{site.contact.googleRating} Google rating</span>
                </span>
              )}
            </motion.div>
          </motion.div>

          {/* Right desktop editorial portrait inside gold arch frame */}
          <div className="hidden lg:col-span-6 lg:flex lg:justify-end">
            <motion.div
              initial={reducedMotion ? {opacity: 1} : {opacity: 0, scale: 1.06}}
              animate={{opacity: 1, scale: 1}}
              transition={{duration: 0.7, ease: LUXURY_EASE}}
              className="relative w-full max-w-[460px]"
            >
              {/* Arch frame echoing circular/arch brand emblem */}
              <div className="relative overflow-hidden rounded-t-[240px] rounded-b-3xl border border-gold-500/35 bg-charcoal p-2.5">
                <div className="aspect-[3/4] overflow-hidden rounded-t-[230px] rounded-b-2xl bg-surface">
                  <img
                    src={IMAGES.heroBridal}
                    alt="Pakistani bride styled in obsidian velvet and gold kundan jewelry at Maheen's Beauty & Makeup Saloon"
                    width={900}
                    height={1200}
                    fetchPriority="high"
                    decoding="sync"
                    referrerPolicy="no-referrer"
                    className="h-full w-full object-cover object-top"
                  />
                </div>
              </div>

              {/* Subtle circular crest on arch corner */}
              <div
                aria-hidden="true"
                className="absolute -left-5 bottom-10 flex h-24 w-24 flex-col items-center justify-center rounded-full border border-gold-500/45 bg-ink/95 text-center backdrop-blur-md"
              >
                <span className="gold-gradient-text font-display text-2xl font-semibold leading-none">
                  M
                </span>
                <span className="mt-1 text-[9px] uppercase tracking-[0.2em] text-muted">
                  Saloon
                </span>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
