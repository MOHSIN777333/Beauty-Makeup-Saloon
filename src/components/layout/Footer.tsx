import {Facebook, Instagram, Mail, MapPin, Phone} from 'lucide-react';
import {site} from '../../data/site';
import {trackEvent} from '../../lib/analytics';
import {GoldDivider} from '../ui/GoldDivider';
import {PWAInstallPrompt} from './PWAInstallPrompt';

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-ink pb-24 lg:pb-8">
      <GoldDivider />
      <div className="mx-auto w-full max-w-[1200px] px-5 py-14 md:px-8">
        <div className="grid gap-10 md:grid-cols-12">
          {/* Brand summary */}
          <div className="md:col-span-5 space-y-4">
            <div className="flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-full border border-gold-500/45 bg-charcoal">
                <span className="gold-gradient-text font-display text-xl font-semibold">
                  {site.brand.monogram}
                </span>
              </span>
              <div>
                <p className="font-display text-xl font-semibold text-ivory">
                  {site.brand.name}
                </p>
                <p className="text-xs text-muted">{site.brand.taglines.primary}</p>
              </div>
            </div>

            <p className="max-w-sm text-sm text-muted leading-relaxed">
              Private women-only bridal, makeup, skin, and hair artistry sanctuary in Latifabad Unit 09, Hyderabad.
            </p>

            <div className="pt-1">
              <PWAInstallPrompt />
            </div>
          </div>

          {/* Quick links */}
          <div className="md:col-span-3 space-y-3">
            <p className="text-xs font-medium tracking-[0.2em] text-gold-300 uppercase">
              Explore
            </p>
            <ul className="space-y-2.5 text-sm text-muted">
              <li>
                <a href="#services" className="hover:text-ivory transition-colors">
                  Services
                </a>
              </li>
              <li>
                <a href="#bridal" className="hover:text-ivory transition-colors">
                  Bridal Packages
                </a>
              </li>
              <li>
                <a href="#deals" className="hover:text-ivory transition-colors">
                  Deals &amp; Offers
                </a>
              </li>
              <li>
                <a href="#gallery" className="hover:text-ivory transition-colors">
                  Our Work
                </a>
              </li>
              <li>
                <a href="#faq" className="hover:text-ivory transition-colors">
                  FAQ
                </a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div className="md:col-span-4 space-y-3">
            <p className="text-xs font-medium tracking-[0.2em] text-gold-300 uppercase">
              Contact &amp; Visit
            </p>
            <ul className="space-y-3 text-sm text-muted">
              <li className="flex items-start gap-2.5">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-gold-500" aria-hidden="true" />
                <span>{site.contact.address}</span>
              </li>
              <li>
                <a
                  href={site.contact.phoneHref}
                  onClick={() => trackEvent('call_click', {source: 'footer'})}
                  className="inline-flex items-center gap-2.5 hover:text-ivory transition-colors tabular-nums"
                >
                  <Phone className="h-4 w-4 shrink-0 text-gold-500" aria-hidden="true" />
                  <span>{site.contact.phoneDisplay}</span>
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${site.contact.email}`}
                  className="inline-flex items-center gap-2.5 break-all hover:text-ivory transition-colors"
                >
                  <Mail className="h-4 w-4 shrink-0 text-gold-500" aria-hidden="true" />
                  <span>{site.contact.email}</span>
                </a>
              </li>
            </ul>

            <div className="flex items-center gap-3 pt-2">
              <a
                href={site.social.facebookUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Maheen's Beauty & Makeup Saloon on Facebook"
                className="flex h-11 w-11 items-center justify-center rounded-full border border-gold-500/25 bg-surface/60 text-ivory transition-colors hover:border-gold-300 hover:text-gold-300"
              >
                <Facebook className="h-4 w-4" aria-hidden="true" />
              </a>
              {site.social.instagramUrl && (
                <a
                  href={site.social.instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Maheen's Beauty & Makeup Saloon on Instagram"
                  className="flex h-11 w-11 items-center justify-center rounded-full border border-gold-500/25 bg-surface/60 text-ivory transition-colors hover:border-gold-300 hover:text-gold-300"
                >
                  <Instagram className="h-4 w-4" aria-hidden="true" />
                </a>
              )}
            </div>
          </div>
        </div>

        <GoldDivider className="my-8" />

        <div className="flex flex-col gap-2 text-xs text-muted sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} {site.brand.name}. All rights reserved.
          </p>
          <p>{site.brand.credit}</p>
        </div>
      </div>
    </footer>
  );
}
