import {useState} from 'react';
import {MapPin, Navigation, Phone} from 'lucide-react';
import {site} from '../../data/site';
import {trackEvent} from '../../lib/analytics';
import {Button} from '../ui/Button';
import {Eyebrow} from '../ui/Eyebrow';
import {Section} from '../ui/Section';

export function VisitUs() {
  const [mapLoaded, setMapLoaded] = useState(false);

  const mapEmbedUrl = `https://www.google.com/maps?q=${encodeURIComponent(
    site.contact.googleMapsEmbedQuery
  )}&output=embed`;

  return (
    <Section id="contact" surface="ink">
      <div className="mb-10 space-y-3">
        <Eyebrow>Visit Our Sanctuary</Eyebrow>
        <h2 className="font-display text-3xl md:text-5xl font-medium text-ivory">
          Latifabad Unit 09, Hyderabad
        </h2>
      </div>

      <div className="grid items-stretch gap-6 lg:grid-cols-12">
        {/* Address & contact card */}
        <div className="flex flex-col justify-between gap-8 rounded-2xl border border-gold-500/25 bg-surface/80 p-6 md:p-8 lg:col-span-5">
          <div className="space-y-5">
            <div className="flex items-start gap-3">
              <MapPin className="mt-1 h-5 w-5 shrink-0 text-gold-300" aria-hidden="true" />
              <div className="space-y-1">
                <p className="font-display text-2xl font-medium text-ivory leading-snug">
                  {site.contact.shortAddress}
                </p>
                <p className="text-sm text-gold-300">{site.contact.landmark}</p>
                <p className="text-sm text-muted">{site.contact.cityRegion}</p>
              </div>
            </div>

            {site.contact.hoursSchedule.length > 0 && (
              <div className="border-t border-gold-500/15 pt-4">
                <p className="mb-2 text-xs font-medium tracking-[0.18em] text-gold-300 uppercase">
                  Opening Hours
                </p>
                <dl className="space-y-1.5 text-sm">
                  {site.contact.hoursSchedule.map((row) => (
                    <div key={row.day} className="flex justify-between gap-4">
                      <dt className="text-muted">{row.day}</dt>
                      <dd className="text-ivory tabular-nums">{row.hours}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            )}

            <div className="border-t border-gold-500/15 pt-4 text-sm text-muted">
              Languages spoken:{' '}
              <span className="text-ivory">{site.languages.join(' · ')}</span>
            </div>
          </div>

          <div className="flex flex-wrap gap-3">
            <Button
              href={site.contact.googleMapsLink}
              target="_blank"
              variant="primary"
              size="md"
              onClick={() => trackEvent('directions_click', {source: 'visit_us'})}
              className="flex-1"
            >
              <Navigation className="h-4 w-4" aria-hidden="true" />
              <span>Get Directions</span>
            </Button>

            <Button
              href={site.contact.phoneHref}
              variant="secondary"
              size="md"
              onClick={() => trackEvent('call_click', {source: 'visit_us'})}
              className="flex-1 tabular-nums"
            >
              <Phone className="h-4 w-4 text-gold-300" aria-hidden="true" />
              <span>Call {site.contact.phoneDisplay}</span>
            </Button>
          </div>
        </div>

        {/* Click-to-load Map container */}
        <div className="relative min-h-[320px] overflow-hidden rounded-2xl border border-gold-500/20 bg-charcoal lg:col-span-7">
          {mapLoaded ? (
            <iframe
              title="Maheen's Beauty & Makeup Saloon location map"
              src={mapEmbedUrl}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="h-full min-h-[340px] w-full border-0"
              allowFullScreen
            />
          ) : (
            <div className="flex h-full min-h-[320px] flex-col items-center justify-center gap-4 bg-[radial-gradient(circle_at_center,rgba(201,162,75,0.12),transparent_65%)] p-8 text-center">
              <div className="flex h-14 w-14 items-center justify-center rounded-full border border-gold-500/40 bg-surface">
                <MapPin className="h-6 w-6 text-gold-300" aria-hidden="true" />
              </div>
              <div className="max-w-md space-y-1.5">
                <p className="font-display text-2xl font-medium text-ivory">
                  Opposite Nasir Biryani, Latifabad Unit&nbsp;09
                </p>
                <p className="text-sm text-muted">
                  Interactive Google Map loads on demand to keep mobile data light.
                </p>
              </div>
              <Button variant="secondary" size="md" onClick={() => setMapLoaded(true)}>
                Load Interactive Map
              </Button>
            </div>
          )}
        </div>
      </div>
    </Section>
  );
}
