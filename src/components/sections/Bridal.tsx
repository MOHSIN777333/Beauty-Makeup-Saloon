import {useState} from 'react';
import {Calendar, Check, MessageCircle} from 'lucide-react';
import {motion} from 'motion/react';
import {IMAGES, site} from '../../data/site';
import {trackEvent} from '../../lib/analytics';
import {cn} from '../../lib/cn';
import {defaultViewport, fadeUp, stagger} from '../../lib/motion';
import {waBridalMessage, waLink} from '../../lib/whatsapp';
import {useReducedMotionSafe} from '../../hooks/useReducedMotionSafe';
import {Button} from '../ui/Button';
import {Eyebrow} from '../ui/Eyebrow';
import {GoldDivider} from '../ui/GoldDivider';

export function Bridal() {
  const [eventDate, setEventDate] = useState('');
  const reducedMotion = useReducedMotionSafe();

  return (
    <section
      id="bridal"
      className="relative scroll-mt-16 overflow-hidden bg-charcoal"
    >
      {/* Full-bleed atmospheric backdrop */}
      <div className="relative h-[320px] md:h-[440px] w-full overflow-hidden">
        <img
          src={IMAGES.bridalSuite}
          alt="Luxury black and gold bridal makeup suite at Maheen's Beauty & Makeup Saloon"
          loading="lazy"
          referrerPolicy="no-referrer"
          className="h-full w-full object-cover object-center"
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-b from-ink/60 via-ink/55 to-charcoal"
        />

        <div className="absolute inset-x-0 bottom-0 mx-auto w-full max-w-[1200px] px-5 pb-8 md:px-8">
          <Eyebrow tone="blush">Dulhan ka din, hamari zimmedari</Eyebrow>
          <h2 className="mt-2 font-display text-4xl md:text-6xl font-medium text-ivory">
            Bridal Packages
          </h2>
          <p className="mt-2 max-w-xl text-sm md:text-base text-ivory/80">
            Calm studio preparation, skin-true luminescence, and timeless finishing from your Mehndi to Walima.
          </p>
        </div>
      </div>

      <div className="mx-auto w-full max-w-[1200px] px-5 pb-20 pt-6 md:px-8 md:pb-24">
        <GoldDivider className="mb-10" />

        {/* Optional wedding date bar */}
        <div className="mb-8 flex flex-col gap-3 rounded-2xl border border-gold-500/20 bg-surface/70 p-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-3">
            <Calendar className="h-4 w-4 shrink-0 text-gold-300" aria-hidden="true" />
            <label htmlFor="bridal-date" className="text-sm text-ivory">
              Planning a wedding date? Add it to check studio availability directly:
            </label>
          </div>
          <input
            id="bridal-date"
            type="date"
            value={eventDate}
            onChange={(e) => setEventDate(e.target.value)}
            className="min-h-[44px] rounded-full border border-gold-500/35 bg-ink px-4 text-sm text-ivory scheme-dark focus:border-gold-300"
          />
        </div>

        {/* 3 Bridal Tiers */}
        <motion.div
          variants={reducedMotion ? undefined : stagger}
          initial="hidden"
          whileInView="visible"
          viewport={defaultViewport}
          className="grid gap-6 md:grid-cols-3"
        >
          {site.bridalPackages.map((pkg) => (
            <motion.article
              key={pkg.id}
              variants={reducedMotion ? undefined : fadeUp}
              className={cn(
                'flex flex-col justify-between rounded-2xl border p-6 md:p-7 transition-colors',
                pkg.featured
                  ? 'border-gold-300/60 bg-ink'
                  : 'border-gold-500/20 bg-surface/65'
              )}
            >
              <div>
                <div className="flex items-center justify-between gap-2 text-xs text-gold-300">
                  <span className="tracking-[0.2em] uppercase">{pkg.tier}</span>
                  {pkg.featured && <span className="text-blush">Most Requested</span>}
                </div>

                <h3 className="mt-3 font-display text-2xl md:text-3xl font-medium text-ivory">
                  {pkg.title}
                </h3>
                <p className="mt-1.5 text-sm text-muted">{pkg.subtitle}</p>

                {pkg.priceLabel && (
                  <p className="mt-4 font-display text-2xl text-gold-300 tabular-nums">
                    {pkg.priceLabel}
                  </p>
                )}

                <ul className="mt-6 space-y-3 border-t border-gold-500/15 pt-5">
                  {pkg.inclusions.map((item) => (
                    <li key={item} className="flex items-start gap-2.5 text-sm text-ivory/90">
                      <Check
                        className="mt-0.5 h-4 w-4 shrink-0 text-gold-500"
                        aria-hidden="true"
                      />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-8">
                <Button
                  href={waLink(waBridalMessage(pkg.title, eventDate))}
                  target="_blank"
                  variant={pkg.featured ? 'primary' : 'secondary'}
                  size="md"
                  onClick={() => trackEvent('whatsapp_click', {source: `bridal_${pkg.id}`})}
                  className="w-full"
                >
                  <MessageCircle className="h-4 w-4" aria-hidden="true" />
                  <span>Check bridal date availability</span>
                </Button>
              </div>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
