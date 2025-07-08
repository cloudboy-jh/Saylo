"use client";

import { motion } from "framer-motion";
import { cn } from '@/lib/utils';

// Animated audio lines icon for use as a voice visualizer
// Animates four vertical lines to simulate audio activity
interface AudioLinesAnimatedProps {
  // Whether the icon should animate (e.g., when voice is detected)
  active?: boolean;
  // Width and height of the SVG icon
  width?: number;
  height?: number;
  className?: string;
}

export function AudioLinesAnimated({ active = false, className, width = 48, height = 48 }: AudioLinesAnimatedProps) {
  return (
    <motion.svg
      className={cn(className)}
      width={width}
      height={height}
      viewBox="0 0 48 48"
      fill="none"
      stroke="currentColor"
      strokeWidth="4"
      strokeLinecap="round"
      strokeLinejoin="round"
      // Animate between 'normal' and 'animate' variants based on the active prop
      animate={active ? "animate" : "normal"}
    >
      {/* Each line animates its y2 property to create a bouncing effect */}
      <motion.line
        x1="10" y1="20" x2="10" y2="28"
        variants={{
          normal: { y2: 28 },
          animate: {
            y2: [28, 16, 28], // Moves up and down
            transition: { duration: 0.7, repeat: Infinity }
          }
        }}
      />
      <motion.line
        x1="20" y1="12" x2="20" y2="36"
        variants={{
          normal: { y2: 36 },
          animate: {
            y2: [36, 20, 36], // Moves up and down
            transition: { duration: 0.6, repeat: Infinity }
          }
        }}
      />
      <motion.line
        x1="30" y1="16" x2="30" y2="32"
        variants={{
          normal: { y2: 32 },
          animate: {
            y2: [32, 12, 32], // Moves up and down
            transition: { duration: 0.8, repeat: Infinity }
          }
        }}
      />
      <motion.line
        x1="40" y1="20" x2="40" y2="28"
        variants={{
          normal: { y2: 28 },
          animate: {
            y2: [28, 36, 28], // Moves up and down
            transition: { duration: 0.7, repeat: Infinity }
          }
        }}
      />
    </motion.svg>
  );
}
