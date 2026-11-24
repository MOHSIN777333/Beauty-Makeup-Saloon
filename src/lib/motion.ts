import type {Transition, Variants} from 'motion/react';

export const LUXURY_EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

export const defaultViewport = {
  once: true,
  margin: '-80px',
} as const;

export const luxuryTransition = (duration = 0.65, delay = 0): Transition => ({
  duration,
  delay,
  ease: LUXURY_EASE,
});

export const fadeUp: Variants = {
  hidden: {opacity: 0, y: 20},
  visible: {
    opacity: 1,
    y: 0,
    transition: luxuryTransition(0.65),
  },
};

export const maskReveal: Variants = {
  hidden: {opacity: 0, y: 24},
  visible: {
    opacity: 1,
    y: 0,
    transition: luxuryTransition(0.6),
  },
};

export const stagger: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.08,
    },
  },
};

export const scaleIn: Variants = {
  hidden: {opacity: 0, scale: 1.08},
  visible: {
    opacity: 1,
    scale: 1,
    transition: luxuryTransition(0.75),
  },
};
