import {useState} from 'react';
import {Download, Share, WifiOff} from 'lucide-react';
import {usePWAInstall} from '../../hooks/usePWAInstall';
import {useOnlineStatus} from '../../hooks/useOnlineStatus';
import {Modal} from '../ui/Modal';
import {Button} from '../ui/Button';

export function PWAInstallPrompt() {
  const {isInstallable, isInstalled, isIOS, install} = usePWAInstall();
  const [showIOSModal, setShowIOSModal] = useState(false);

  if (isInstalled) return null;

  if (isInstallable) {
    return (
      <Button variant="secondary" size="sm" onClick={() => void install()}>
        <Download className="h-4 w-4 text-gold-300" aria-hidden="true" />
        <span>Add to Home Screen</span>
      </Button>
    );
  }

  if (isIOS) {
    return (
      <>
        <Button variant="secondary" size="sm" onClick={() => setShowIOSModal(true)}>
          <Share className="h-4 w-4 text-gold-300" aria-hidden="true" />
          <span>Add to Home Screen</span>
        </Button>

        <Modal
          open={showIOSModal}
          onClose={() => setShowIOSModal(false)}
          title="Add Maheen's to Home Screen"
          maxWidthClass="max-w-sm"
        >
          <ol className="space-y-3 text-sm text-muted leading-relaxed">
            <li>1. Tap the Share button in Safari&apos;s toolbar.</li>
            <li>2. Scroll down and select Add to Home Screen.</li>
            <li>3. Tap Add to launch Maheen&apos;s like an app anytime.</li>
          </ol>
          <div className="mt-6">
            <Button variant="primary" size="sm" onClick={() => setShowIOSModal(false)} className="w-full">
              Got it
            </Button>
          </div>
        </Modal>
      </>
    );
  }

  return null;
}

export function OfflineBanner() {
  const isOnline = useOnlineStatus();

  if (isOnline) return null;

  return (
    <div
      role="status"
      className="fixed left-5 top-16 z-50 flex items-center gap-2 rounded-full border border-gold-500/35 bg-charcoal/95 px-4 py-2 text-xs text-ivory shadow-lg backdrop-blur-md"
    >
      <WifiOff className="h-3.5 w-3.5 text-gold-300" aria-hidden="true" />
      <span>Offline mode — viewing cached saloon menu</span>
    </div>
  );
}
