import {Home, Sparkles, MessageCircle, Tag, Images} from 'lucide-react';
import {motion} from 'motion/react';
import {cn} from '../../lib/cn';
import {trackEvent} from '../../lib/analytics';
import {LUXURY_EASE} from '../../lib/motion';
import {waGeneralMessage, waLink} from '../../lib/whatsapp';
import {useReducedMotionSafe} from '../../hooks/useReducedMotionSafe';
import type {ScrollDirection} from '../../hooks/useScrollDirection';

export interface BottomNavProps {
  activeSection: string;
  direction: ScrollDirection;
}

export function BottomNav({activeSection, direction}: BottomNavProps) {
  const reducedMotion = useReducedMotionSafe();
  const isHidden = direction === 'down';

  const navItems = [
    {id: 'home', label: 'Home', href: '#home', icon: Home},
    {id: 'services', label: 'Services', href: '#services', icon: Sparkles},
    {id: 'deals', label: 'Deals', href: '#deals', icon: Tag},
    {id: 'gallery', label: 'Gallery', href: '#gallery', icon: Images},
  ] as const;

  const isActive = (id: string) => {
    if (id === 'services' && activeSection === 'bridal') return true;
    if (id === 'gallery' && activeSection === 'contact') return false;
    return activeSection === id;
  };

  return (
    <motion.nav
      aria-label="Mobile bottom navigation"
      initial={false}
      animate={
        isHidden
          ? {y: 96, opacity: 0}
          : {y: 0, opacity: 1}
      }
      transition={{duration: reducedMotion ? 0.1 : 0.28, ease: LUXURY_EASE}}
      className={cn(
        'fixed inset-x-0 bottom-0 z-40 px-4 pb-[max(0.65rem,env(safe-area-inset-bottom))] pointer-events-none lg:hidden'
      )}
    >
      <div className="pointer-events-auto mx-auto grid h-14 max-w-md grid-cols-5 items-center rounded-full border border-gold-500/25 bg-charcoal/95 px-2 shadow-2xl backdrop-blur-xl">
        {navItems.slice(0, 2).map((item) => {
          const Icon = item.icon;
          const active = isActive(item.id);
          return (
            <a
              key={item.id}
              href={item.href}
              aria-current={active ? 'location' : undefined}
              className={cn(
                'relative flex min-h-[44px] flex-col items-center justify-center gap-0.5 rounded-full text-[10px] font-medium transition-colors',
                active ? 'text-ivory' : 'text-muted hover:text-ivory'
              )}
            >
              {active && (
                <motion.span
                  layoutId={reducedMotion ? undefined : 'bottom-nav-active'}
                  transition={{duration: 0.25, ease: LUXURY_EASE}}
                  className="absolute inset-x-1.5 inset-y-1 rounded-full bg-gold-500/20 border border-gold-500/35"
                  aria-hidden="true"
                />
              )}
              <Icon className="relative z-10 h-4 w-4" aria-hidden="true" />
              <span className="relative z-10 whitespace-nowrap">{item.label}</span>
            </a>
          );
        })}

        {/* Raised centre Book button in gold */}
        <div className="flex items-center justify-center">
          <motion.a
            href={waLink(waGeneralMessage())}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => trackEvent('whatsapp_click', {source: 'bottom_nav'})}
            whileTap={reducedMotion ? undefined : {scale: 0.94}}
            aria-label="Book on WhatsApp"
            className="gold-gradient-bg -mt-4 flex h-12 min-w-[60px] items-center justify-center gap-1 rounded-full border-2 border-ink px-3 text-[11px] font-semibold text-ink shadow-lg"
          >
            <MessageCircle className="h-4 w-4 shrink-0" aria-hidden="true" />
            <span>Book</span>
          </motion.a>
        </div>

        {navItems.slice(2).map((item) => {
          const Icon = item.icon;
          const active = isActive(item.id);
          return (
            <a
              key={item.id}
              href={item.href}
              aria-current={active ? 'location' : undefined}
              className={cn(
                'relative flex min-h-[44px] flex-col items-center justify-center gap-0.5 rounded-full text-[10px] font-medium transition-colors',
                active ? 'text-ivory' : 'text-muted hover:text-ivory'
              )}
            >
              {active && (
                <motion.span
                  layoutId={reducedMotion ? undefined : 'bottom-nav-active'}
                  transition={{duration: 0.25, ease: LUXURY_EASE}}
                  className="absolute inset-x-1.5 inset-y-1 rounded-full bg-gold-500/20 border border-gold-500/35"
                  aria-hidden="true"
                />
              )}
              <Icon className="relative z-10 h-4 w-4" aria-hidden="true" />
              <span className="relative z-10 whitespace-nowrap">{item.label}</span>
            </a>
          );
        })}
      </div>
    </motion.nav>
  );
}
