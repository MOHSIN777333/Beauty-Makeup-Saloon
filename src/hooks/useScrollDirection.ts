import {useEffect, useRef, useState} from 'react';

export type ScrollDirection = 'up' | 'down';

export interface ScrollState {
  scrolled: boolean;
  direction: ScrollDirection;
  activeSection: string;
}

const SECTION_IDS = ['home', 'services', 'bridal', 'deals', 'gallery', 'contact'] as const;

export function useScrollDirection(threshold = 40): ScrollState {
  const [scrolled, setScrolled] = useState(false);
  const [direction, setDirection] = useState<ScrollDirection>('up');
  const [activeSection, setActiveSection] = useState<string>('home');
  const lastY = useRef(0);

  useEffect(() => {
    const onScroll = () => {
      const currentY = window.scrollY;
      setScrolled(currentY > threshold);

      const delta = currentY - lastY.current;
      if (currentY <= 80) {
        setDirection('up');
      } else if (delta > 8) {
        setDirection('down');
      } else if (delta < -6) {
        setDirection('up');
      }
      lastY.current = currentY;

      const probeY = currentY + window.innerHeight * 0.35;
      let currentActive = 'home';
      for (const id of SECTION_IDS) {
        const el = document.getElementById(id);
        if (el && el.offsetTop <= probeY) {
          currentActive = id;
        }
      }
      setActiveSection(currentActive);
    };

    onScroll();
    window.addEventListener('scroll', onScroll, {passive: true});
    return () => window.removeEventListener('scroll', onScroll);
  }, [threshold]);

  return {scrolled, direction, activeSection};
}
