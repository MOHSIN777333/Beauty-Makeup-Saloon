import {MessageCircle} from 'lucide-react';
import {motion} from 'motion/react';
import {trackEvent} from '../../lib/analytics';
import {waGeneralMessage, waLink} from '../../lib/whatsapp';
import {useReducedMotionSafe} from '../../hooks/useReducedMotionSafe';

export function FloatingWhatsApp() {
  const reducedMotion = useReducedMotionSafe();

  return (
    <motion.a
      href={waLink(waGeneralMessage())}
      target="_blank"
      rel="noopener noreferrer"
      onClick={() => trackEvent('whatsapp_click', {source: 'floating_desktop'})}
      whileTap={reducedMotion ? undefined : {scale: 0.94}}
      aria-label="Chat on WhatsApp to book"
      className="gold-gradient-bg fixed bottom-6 right-6 z-40 hidden h-12 w-12 items-center justify-center rounded-full text-ink shadow-xl transition-transform hover:scale-105 lg:flex"
    >
      <MessageCircle className="h-5 w-5" aria-hidden="true" />
    </motion.a>
  );
}
