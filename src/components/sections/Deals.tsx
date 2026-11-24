import {MessageCircle} from 'lucide-react';
import {motion} from 'motion/react';
import {site} from '../../data/site';
import {trackEvent} from '../../lib/analytics';
import {defaultViewport, fadeUp, stagger} from '../../lib/motion';
import {waDealMessage, waLink} from '../../lib/whatsapp';
import {useReducedMotionSafe} from '../../hooks/useReducedMotionSafe';
import {Button} from '../ui/Button';
import {Eyebrow} from '../ui/Eyebrow';
import {Section} from '../ui/Section';

export function Deals() {
  const reducedMotion = useReducedMotionSafe();

  return (
    <Section id="deals" surface="ink">
      <div className="mb-10 flex flex-col gap-4 md:mb-14 md:flex-row md:items-end md:justify-between">
        <div className="space-y-3">
          <Eyebrow>Curated Offers</Eyebrow>
          <h2 className="font-display text-3xl md:text-5xl font-medium text-ivory">
            Saloon Deals &amp; Pamper Tickets
          </h2>
        </div>
        <p className="max-w-md text-sm md:text-base text-muted">
          Show or send any boutique ticket on WhatsApp to reserve your visit at Latifabad Unit 09.
        </p>
      </div>

      <motion.div
        variants={reducedMotion ? undefined : stagger}
        initial="hidden"
        whileInView="visible"
        viewport={defaultViewport}
        className="grid gap-6 md:grid-cols-2"
      >
        {site.deals.map((deal) => (
          <motion.article
            key={deal.id}
            variants={reducedMotion ? undefined : fadeUp}
            className="relative flex flex-col justify-between overflow-hidden rounded-2xl border border-gold-500/25 bg-surface/85"
          >
            {/* Top ticket face */}
            <div className="p-6 md:p-7">
              <div className="flex items-center justify-between gap-2 text-xs text-gold-300">
                <span className="tracking-[0.2em] uppercase">{deal.code}</span>
                {deal.validTill && (
                  <span className="text-muted">Valid till {deal.validTill}</span>
                )}
              </div>

              <h3 className="mt-2 font-display text-2xl md:text-3xl font-medium text-ivory">
                {deal.title}
              </h3>
              <p className="mt-1.5 text-sm text-muted">{deal.description}</p>

              <p className="mt-4 text-sm text-ivory/90">
                {deal.items.join(' · ')}
              </p>
            </div>

            {/* Ticket perforation line with subtle side notches */}
            <div className="relative flex items-center px-4" aria-hidden="true">
              <span className="-ml-6 h-5 w-5 rounded-full border border-gold-500/25 bg-ink" />
              <div className="mx-2 h-px flex-1 border-t border-dashed border-gold-500/35" />
              <span className="-mr-6 h-5 w-5 rounded-full border border-gold-500/25 bg-ink" />
            </div>

            {/* Ticket claim stub */}
            <div className="flex flex-wrap items-center justify-between gap-4 px-6 py-5 md:px-7">
              <div>
                {deal.price ? (
                  <p className="font-display text-3xl font-semibold text-gold-300 tabular-nums">
                    {deal.price}
                  </p>
                ) : (
                  <p className="text-sm font-medium text-muted">
                    Ask for seasonal rate
                  </p>
                )}
              </div>

              <Button
                href={waLink(waDealMessage(`${deal.code} - ${deal.title}`))}
                target="_blank"
                variant={deal.price ? 'primary' : 'secondary'}
                size="md"
                onClick={() => trackEvent('whatsapp_click', {source: `deal_${deal.id}`})}
              >
                <MessageCircle className="h-4 w-4" aria-hidden="true" />
                <span>Claim on WhatsApp</span>
              </Button>
            </div>
          </motion.article>
        ))}
      </motion.div>
    </Section>
  );
}
