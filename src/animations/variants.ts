import { Variants } from 'framer-motion';

export const pageTransition: Variants = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
};

export const cardEntrance: Variants = {
  initial: { scale: 0.9, opacity: 0 },
  animate: { scale: 1, opacity: 1 },
};

export const buttonHover: Variants = {
  hover: { scale: 1.05 },
  tap: { scale: 0.95 },
};

export const reactionReveal: Variants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
};

export const scoreBarReveal: Variants = {
  initial: { width: 0 },
  animate: { width: '100%' },
};
