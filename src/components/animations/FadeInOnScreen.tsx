import { motion, Variants } from 'framer-motion';
import { ReactNode } from "react";

interface FadeInLeftOnScreenProps {
  children: ReactNode;
  duration?: number;
  from?: "left" | "right" | "top" | "bottom";
  distance?: number;
  className?: string;
}

export function FadeInOnScreen({className, children, duration = 2, from = "bottom", distance = 100 }: FadeInLeftOnScreenProps) {
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
          duration: duration
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
          duration: duration
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
          duration: duration
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
          duration: duration
        }
      }
    } as Variants,
  };

  return (
    <motion.div
      className={className}
      initial="offscreen"
      whileInView="onscreen"
      // viewport={{ once: true, amount: 0.8 }}
    >
      <motion.div
        variants={animationVariants[from]}
      >
        {children}
      </motion.div>
    </motion.div>
  );
}