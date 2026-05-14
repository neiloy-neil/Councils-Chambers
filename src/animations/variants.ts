import { Variants } from 'framer-motion';

export const pageVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 20,
    scale: 0.985,
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.38,
      ease: [0.22, 1, 0.36, 1],
    },
  },
  exit: {
    opacity: 0,
    y: -20,
    scale: 0.985,
    transition: {
      duration: 0.28,
      ease: 'easeInOut',
    },
  },
};

export const cardVariants: Variants = {
  hidden: {
    opacity: 0,
    scale: 0.95,
    y: 24,
  },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      duration: 0.44,
      ease: [0.2, 0.9, 0.2, 1],
    },
  },
};

export const buttonVariants: Variants = {
  hover: {
    y: -3,
    scale: 1.01,
    transition: { duration: 0.18 },
  },
  tap: {
    scale: 0.98,
    transition: { duration: 0.1 },
  },
};

export const resultBarVariants: Variants = {
  hidden: {
    width: 0,
  },
  visible: (custom: number) => ({
    width: `${custom}%`,
    transition: {
      duration: 0.75,
      ease: [0.2, 0.9, 0.2, 1],
    },
  }),
};

export const staggerContainer: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.07,
    },
  },
};
