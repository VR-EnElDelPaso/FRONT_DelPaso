import { motion, Variants } from 'framer-motion';
import { ReactNode } from "react";

interface FadeInOnScrollProps {
  children: ReactNode;
  className?: string;
  duration?: number;
  distance?: number;
  delay?: number
  from?: "left" | "right" | "top" | "bottom";
}

export function FadeInOnScroll({
  className,
  children,
  duration = 2,
  distance = 100,
  delay = 0,
  from = "bottom",
}: FadeInOnScrollProps) {
  const animationVariants: {[key: string]:  Variants} = {
    "left": {
      offscreen: {
        x: -distance,
        opacity: 0
      },
      onscreen: {
        x: 0,
        opacity: 1,
        transition: {
          duration,
          delay
        }
      }
    } as Variants,
    "right": {
      offscreen: {
        x: distance,
        opacity: 0
      },
      onscreen: {
        x: 0,
        opacity: 1,
        transition: {
          duration,
          delay
        }
      }
    } as Variants,
    "bottom": {
      offscreen: {
        y: distance,
        opacity: 0
      },
      onscreen: {
        y: 0,
        opacity: 1,
        transition: {
          duration,
          delay
        }
      }
    } as Variants,
    "top": {
      offscreen: {
        y: -distance,
        opacity: 0
      },
      onscreen: {
        y: 0,
        opacity: 1,
        transition: {
          duration,
          delay
        }
      }
    } as Variants,
  };

  return (
    <motion.div
      className={className}
      initial="offscreen"
      whileInView="onscreen"
      viewport={{ once: true, amount: .1 }}
    >
      <motion.div
        variants={animationVariants[from]}
      >
        {children}
      </motion.div>
    </motion.div>
  );
}