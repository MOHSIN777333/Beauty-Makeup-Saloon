import {MessageCircle} from 'lucide-react';
import {motion} from 'motion/react';
import {site} from '../../data/site';
import {trackEvent} from '../../lib/analytics';
import {defaultViewport, fadeUp} from '../../lib/motion';
import {waGeneralMessage, waLink} from '../../lib/whatsapp';
import {useReducedMotionSafe} from '../../hooks/useReducedMotionSafe';
import {Button} from '../ui/Button';
import {GoldDivider} from '../ui/GoldDivider';
import {Section} from '../ui/Section';

export function FinalCta() {
  const reducedMotion = useReducedMotionSafe();

  return (
    <Section surface="charcoal" innerClassName="py-20 md:py-28">
      <motion.div
        variants={reducedMotion ? undefined : fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={defaultViewport}
        className="mx-auto max-w-2xl space-y-6 text-center"
      >
        <p className="text-xs font-medium tracking-[0.22em] text-gold-300 uppercase">
          {site.brand.taglines.primary}
        </p>

        <h2 className="font-display text-4xl md:text-6xl font-medium leading-tight text-ivory">
          {site.brand.taglines.heroPrefix}{' '}
          <span className="font-script block text-[1.25em] font-normal text-gold-300 mt-1">
            {site.brand.taglines.heroScript}
          </span>
        </h2>

        <GoldDivider className="mx-auto max-w-xs" />

        <p className="text-sm md:text-base text-muted">
          Reserve your bridal consultation, seasonal deal, or self-care session in two taps.
        </p>

        <div className="pt-2">
          <Button
            href={waLink(waGeneralMessage())}
            target="_blank"
            size="lg"
            onClick={() => trackEvent('whatsapp_click', {source: 'final_cta'})}
          >
            <MessageCircle className="h-4 w-4" aria-hidden="true" />
            <span>Book on WhatsApp</span>
          </Button>
        </div>
      </motion.div>
    </Section>
  );
}
