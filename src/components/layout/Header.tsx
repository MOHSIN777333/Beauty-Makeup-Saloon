import {MessageCircle} from 'lucide-react';
import {site} from '../../data/site';
import {cn} from '../../lib/cn';
import {trackEvent} from '../../lib/analytics';
import {waGeneralMessage, waLink} from '../../lib/whatsapp';
import {Button} from '../ui/Button';

export interface HeaderProps {
  scrolled: boolean;
  activeSection: string;
}

const DESKTOP_LINKS = [
  {id: 'services', label: 'Services', href: '#services'},
  {id: 'bridal', label: 'Bridal', href: '#bridal'},
  {id: 'deals', label: 'Deals', href: '#deals'},
  {id: 'gallery', label: 'Gallery', href: '#gallery'},
  {id: 'contact', label: 'Contact', href: '#contact'},
] as const;

export function Header({scrolled, activeSection}: HeaderProps) {
  const handleWhatsApp = () => {
    trackEvent('whatsapp_click', {source: 'header'});
  };

  return (
    <header
      className={cn(
        'fixed inset-x-0 top-0 z-40 transition-colors duration-300',
        scrolled
          ? 'border-b border-gold-500/15 bg-ink/90 backdrop-blur-md'
          : 'border-b border-transparent bg-transparent'
      )}
    >
      <div className="mx-auto flex h-14 lg:h-[72px] w-full max-w-[1200px] items-center justify-between gap-8 px-5 md:px-8">
        {/* Zone 1: Brand wordmark + monogram */}
        <a
          href="#home"
          className="flex items-center gap-2.5 whitespace-nowrap shrink-0 group"
          aria-label={site.brand.name}
        >
          <span className="flex h-8 w-8 items-center justify-center rounded-full border border-gold-500/50 bg-charcoal/80">
            <span className="gold-gradient-text font-display text-lg font-semibold leading-none">
              {site.brand.monogram}
            </span>
          </span>
          <span className="font-display text-xl lg:text-2xl font-semibold tracking-tight text-ivory transition-colors group-hover:text-gold-300">
            {site.brand.shortName}
          </span>
        </a>

        {/* Zone 2: Desktop centered navigation links */}
        <nav className="hidden lg:flex items-center gap-7" aria-label="Primary navigation">
          {DESKTOP_LINKS.map((link) => {
            const isActive = activeSection === link.id;
            return (
              <a
                key={link.id}
                href={link.href}
                className={cn(
                  'relative py-1 text-sm font-medium whitespace-nowrap shrink-0 transition-colors',
                  isActive ? 'text-gold-300' : 'text-ivory/80 hover:text-ivory'
                )}
              >
                {link.label}
                <span
                  aria-hidden="true"
                  className={cn(
                    'absolute inset-x-0 -bottom-0.5 h-px bg-gold-500 transition-transform duration-200 origin-left',
                    isActive ? 'scale-x-100' : 'scale-x-0'
                  )}
                />
              </a>
            );
          })}
        </nav>

        {/* Zone 3: Single primary action */}
        <div className="flex items-center shrink-0">
          <Button
            href={waLink(waGeneralMessage())}
            target="_blank"
            onClick={handleWhatsApp}
            size="sm"
            className="hidden lg:inline-flex"
          >
            <MessageCircle className="h-4 w-4" aria-hidden="true" />
            <span>Book on WhatsApp</span>
          </Button>

          <a
            href={waLink(waGeneralMessage())}
            target="_blank"
            rel="noopener noreferrer"
            onClick={handleWhatsApp}
            aria-label="Book on WhatsApp"
            className="gold-gradient-bg flex h-11 w-11 items-center justify-center rounded-full text-ink shadow-md transition-transform active:scale-95 lg:hidden"
          >
            <MessageCircle className="h-5 w-5" aria-hidden="true" />
          </a>
        </div>
      </div>
    </header>
  );
}
