"use client";

import { type ReactNode } from "react";
import { motion } from "framer-motion";

interface FloatingElementProps {
  children: ReactNode;
  className?: string;
  duration?: number;
  distance?: number;
  delay?: number;
  rotate?: number;
}

export default function FloatingElement({
  children,
  className = "",
  duration = 6,
  distance = 15,
  delay = 0,
  rotate = 5,
}: FloatingElementProps) {
  return (
    <motion.div
      className={className}
      animate={{
        y: [0, -distance, distance * 0.4, -distance * 0.7, 0],
        x: [0, distance * 0.5, -distance * 0.3, distance * 0.2, 0],
        rotate: [0, rotate, -rotate * 0.5, rotate * 0.3, 0],
      }}
      transition={{
        duration,
        repeat: Infinity,
        ease: "easeInOut",
        delay,
      }}
    >
      {children}
    </motion.div>
  );
}
