// animations.ts
export const variants = {
  enter: {
    opacity: 0,
    x: 50,
    transition: { duration: 0.5, ease: 'easeInOut' }
  },
  center: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.5, ease: 'easeInOut' }
  },
  exit: {
    opacity: 0,
    x: -50,
    transition: { duration: 0.5, ease: 'easeInOut' }
  }
};

export const swipeConfidenceThreshold = 10000;

export const swipePower = (offset: number, velocity: number) => {
  return Math.abs(offset) * velocity;
};
