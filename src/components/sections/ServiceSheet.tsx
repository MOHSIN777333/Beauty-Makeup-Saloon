import {useEffect, useState} from 'react';
import {Check, MessageCircle} from 'lucide-react';
import type {ServiceItem} from '../../data/site';
import {trackEvent} from '../../lib/analytics';
import {waLink, waServiceMessage} from '../../lib/whatsapp';
import {BottomSheet} from '../ui/BottomSheet';
import {Button} from '../ui/Button';
import {Modal} from '../ui/Modal';

export interface ServiceSheetProps {
  service: ServiceItem | null;
  onClose: () => void;
}

export function ServiceSheet({service, onClose}: ServiceSheetProps) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia('(max-width: 767px)');
    const update = () => setIsMobile(mq.matches);
    update();
    mq.addEventListener('change', update);
    return () => mq.removeEventListener('change', update);
  }, []);

  const content = service ? (
    <div className="space-y-5">
      <div className="aspect-[16/9] overflow-hidden rounded-xl border border-gold-500/20 bg-surface">
        <img
          src={service.image}
          alt={service.name}
          referrerPolicy="no-referrer"
          className="h-full w-full object-cover object-top"
        />
      </div>

      <p className="text-sm md:text-base text-muted leading-relaxed">
        {service.description}
      </p>

      <div className="space-y-2.5 border-t border-gold-500/15 pt-4">
        <p className="text-xs font-medium tracking-[0.18em] text-gold-300 uppercase">
          Included Rituals &amp; Options
        </p>
        <ul className="divide-y divide-gold-500/10">
          {service.subServices.map((sub) => (
            <li key={sub} className="flex items-center gap-3 py-2.5 text-sm text-ivory">
              <Check className="h-4 w-4 shrink-0 text-gold-500" aria-hidden="true" />
              <span>{sub}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="pt-2">
        <Button
          href={waLink(waServiceMessage(service.name))}
          target="_blank"
          size="lg"
          onClick={() => trackEvent('whatsapp_click', {source: `service_${service.id}`})}
          className="w-full"
        >
          <MessageCircle className="h-4 w-4" aria-hidden="true" />
          <span>Book this on WhatsApp</span>
        </Button>
      </div>
    </div>
  ) : null;

  if (isMobile) {
    return (
      <BottomSheet
        open={Boolean(service)}
        onClose={onClose}
        title={service?.name ?? 'Service details'}
      >
        {content}
      </BottomSheet>
    );
  }

  return (
    <Modal
      open={Boolean(service)}
      onClose={onClose}
      title={service?.name ?? 'Service details'}
    >
      {content}
    </Modal>
  );
}
