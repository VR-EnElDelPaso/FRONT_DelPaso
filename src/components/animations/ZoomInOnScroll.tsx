import { motion, Variants } from 'framer-motion';
import { ReactNode } from "react";

interface ZoomInOnScrollProps {
  children: ReactNode;
  className?: string;
  duration?: number;
  delay?: number;
  initialScale?: number;
}

export function ZoomInOnScroll({
  className,
  children,
  duration = 2,
  delay = 0,
  initialScale = .5,
}: ZoomInOnScrollProps) {
  const animationVariants: Variants = {
    offscreen: {
      scale: initialScale,
      opacity: 0
    },
    onscreen: {
      scale: 1,
      opacity: 1,
      transition: {
        duration,
        delay
      }
    }
  }

  return (
    <motion.div
      className={className}
      initial="offscreen"
      whileInView="onscreen"
      // viewport={{ once: true, amount: 0.8 }}
    >
      <motion.div
        variants={animationVariants}
      >
        {children}
      </motion.div>
    </motion.div>
  );
}