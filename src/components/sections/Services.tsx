import {ArrowUpRight} from 'lucide-react';
import {motion} from 'motion/react';
import {site, type ServiceItem} from '../../data/site';
import {cn} from '../../lib/cn';
import {defaultViewport, fadeUp, stagger} from '../../lib/motion';
import {useReducedMotionSafe} from '../../hooks/useReducedMotionSafe';
import {Eyebrow} from '../ui/Eyebrow';
import {ImageWithBlur} from '../ui/ImageWithBlur';
import {Section} from '../ui/Section';

export interface ServicesProps {
  onSelectService: (service: ServiceItem) => void;
}

const DESKTOP_BENTO_CLASSES: Record<number, string> = {
  0: 'md:col-span-7 md:row-span-2 min-h-[380px] lg:min-h-[450px]',
  1: 'md:col-span-5 min-h-[215px]',
  2: 'md:col-span-5 min-h-[215px]',
  3: 'md:col-span-4 min-h-[250px]',
  4: 'md:col-span-4 min-h-[250px]',
  5: 'md:col-span-4 min-h-[250px]',
};

export function Services({onSelectService}: ServicesProps) {
  const reducedMotion = useReducedMotionSafe();

  return (
    <Section id="services" surface="ink">
      <div className="mb-10 flex flex-col gap-4 md:mb-14 md:flex-row md:items-end md:justify-between">
        <div className="space-y-3">
          <Eyebrow>Our Craft</Eyebrow>
          <h2 className="font-display text-3xl md:text-5xl font-medium text-ivory">
            Six pillars of beauty &amp; calm care
          </h2>
        </div>
        <p className="max-w-md text-sm md:text-base text-muted">
          Tap any service to view tailored treatments and book your slot directly on WhatsApp.
        </p>
      </div>

      {/* Mobile: horizontally snapping cards */}
      <div
        className="no-scrollbar -mx-5 flex snap-x snap-mandatory gap-4 overflow-x-auto px-5 md:hidden"
        role="region"
        aria-label="Saloon services"
      >
        {site.services.map((service) => (
          <button
            key={service.id}
            type="button"
            onClick={() => onSelectService(service)}
            className="group relative flex w-[78vw] max-w-[310px] shrink-0 snap-start flex-col overflow-hidden rounded-2xl border border-gold-500/20 bg-surface text-left transition-colors hover:border-gold-500/45 cursor-pointer"
          >
            <div className="aspect-[4/3] w-full overflow-hidden">
              <ImageWithBlur
                src={service.image}
                alt=""
                width={640}
                height={480}
                className="h-full w-full"
                imgClassName="object-top transition-transform duration-500 group-hover:scale-105"
              />
            </div>

            <div className="flex flex-1 flex-col justify-between gap-4 p-5">
              <div>
                <h3 className="font-display text-2xl font-medium text-ivory">
                  {service.name}
                </h3>
                <p className="mt-1.5 text-sm text-muted line-clamp-2">
                  {service.shortLine}
                </p>
              </div>

              <div className="flex items-center justify-between border-t border-gold-500/15 pt-3 text-xs font-medium text-gold-300">
                <span>{service.priceFrom ? `From ${service.priceFrom}` : 'Explore treatments'}</span>
                <span className="inline-flex items-center gap-1">
                  Book <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
                </span>
              </div>
            </div>
          </button>
        ))}
      </div>

      {/* Desktop: Asymmetric editorial Bento Grid */}
      <motion.div
        variants={reducedMotion ? undefined : stagger}
        initial="hidden"
        whileInView="visible"
        viewport={defaultViewport}
        className="hidden md:grid md:grid-cols-12 md:gap-5"
      >
        {site.services.map((service, index) => (
          <motion.button
            key={service.id}
            type="button"
            variants={reducedMotion ? undefined : fadeUp}
            onClick={() => onSelectService(service)}
            className={cn(
              'group relative flex flex-col justify-end overflow-hidden rounded-2xl border border-gold-500/20 bg-surface p-6 text-left transition-colors duration-300 hover:border-gold-300/50 cursor-pointer',
              DESKTOP_BENTO_CLASSES[index] ?? 'md:col-span-4 min-h-[250px]'
            )}
          >
            <ImageWithBlur
              src={service.image}
              alt=""
              width={800}
              height={600}
              className="absolute inset-0 h-full w-full"
              imgClassName={cn(
                'transition-transform duration-700 group-hover:scale-105',
                index === 0 ? 'object-top' : 'object-center'
              )}
            />
            <div
              aria-hidden="true"
              className="absolute inset-0 bg-gradient-to-t from-ink via-ink/65 to-ink/15 transition-opacity duration-300 group-hover:via-ink/55"
            />

            <div className="relative z-10 flex items-end justify-between gap-4">
              <div className="space-y-1.5">
                {service.priceFrom && (
                  <p className="text-xs font-medium text-gold-300 tabular-nums">
                    From {service.priceFrom}
                  </p>
                )}
                <h3
                  className={cn(
                    'font-display font-medium text-ivory',
                    index === 0 ? 'text-3xl lg:text-4xl' : 'text-2xl'
                  )}
                >
                  {service.name}
                </h3>
                <p className="max-w-sm text-sm text-ivory/80 line-clamp-2">
                  {service.shortLine}
                </p>
              </div>

              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-gold-500/40 bg-ink/75 text-gold-300 transition-colors group-hover:border-gold-300 group-hover:bg-gold-500 group-hover:text-ink">
                <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
              </span>
            </div>
          </motion.button>
        ))}
      </motion.div>
    </Section>
  );
}
