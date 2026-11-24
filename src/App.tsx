import {lazy, Suspense, useState} from 'react';
import type {ServiceItem} from './data/site';
import {useScrollDirection} from './hooks/useScrollDirection';
import {Splash} from './components/layout/Splash';
import {Header} from './components/layout/Header';
import {BottomNav} from './components/layout/BottomNav';
import {FloatingWhatsApp} from './components/layout/FloatingWhatsApp';
import {OfflineBanner} from './components/layout/PWAInstallPrompt';
import {Hero} from './components/sections/Hero';
import {TrustStrip} from './components/sections/TrustStrip';
import {Services} from './components/sections/Services';
import {ServiceSheet} from './components/sections/ServiceSheet';

const Bridal = lazy(() =>
  import('./components/sections/Bridal').then((m) => ({default: m.Bridal}))
);
const Deals = lazy(() =>
  import('./components/sections/Deals').then((m) => ({default: m.Deals}))
);
const Gallery = lazy(() =>
  import('./components/sections/Gallery').then((m) => ({default: m.Gallery}))
);
const WhyUs = lazy(() =>
  import('./components/sections/WhyUs').then((m) => ({default: m.WhyUs}))
);
const Team = lazy(() =>
  import('./components/sections/Team').then((m) => ({default: m.Team}))
);
const Testimonials = lazy(() =>
  import('./components/sections/Testimonials').then((m) => ({default: m.Testimonials}))
);
const HowItWorks = lazy(() =>
  import('./components/sections/HowItWorks').then((m) => ({default: m.HowItWorks}))
);
const Faq = lazy(() =>
  import('./components/sections/Faq').then((m) => ({default: m.Faq}))
);
const VisitUs = lazy(() =>
  import('./components/sections/VisitUs').then((m) => ({default: m.VisitUs}))
);
const FinalCta = lazy(() =>
  import('./components/sections/FinalCta').then((m) => ({default: m.FinalCta}))
);
const Footer = lazy(() =>
  import('./components/layout/Footer').then((m) => ({default: m.Footer}))
);

function SectionSkeleton() {
  return (
    <div
      aria-hidden="true"
      className="mx-auto w-full max-w-[1200px] px-5 py-16 md:px-8"
    >
      <div className="h-44 w-full animate-pulse rounded-2xl border border-gold-500/10 bg-surface/50" />
    </div>
  );
}

export default function App() {
  const {scrolled, direction, activeSection} = useScrollDirection(40);
  const [selectedService, setSelectedService] = useState<ServiceItem | null>(null);

  return (
    <div className="min-h-screen bg-ink text-ivory">
      <Splash />
      <OfflineBanner />
      <Header scrolled={scrolled} activeSection={activeSection} />

      <main>
        <Hero />
        <TrustStrip />
        <Services onSelectService={setSelectedService} />

        <Suspense fallback={<SectionSkeleton />}>
          <Bridal />
          <Deals />
          <Gallery />
          <WhyUs />
          <Team />
          <Testimonials />
          <HowItWorks />
          <Faq />
          <VisitUs />
          <FinalCta />
        </Suspense>
      </main>

      <Suspense fallback={null}>
        <Footer />
      </Suspense>

      <ServiceSheet
        service={selectedService}
        onClose={() => setSelectedService(null)}
      />

      <BottomNav activeSection={activeSection} direction={direction} />
      <FloatingWhatsApp />
    </div>
  );
}
