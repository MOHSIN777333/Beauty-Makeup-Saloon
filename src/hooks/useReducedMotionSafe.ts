import {useReducedMotion} from 'motion/react';

export function useReducedMotionSafe(): boolean {
  const prefersReduced = useReducedMotion();
  return Boolean(prefersReduced);
}
