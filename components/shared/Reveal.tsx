"use client";

import { useRef, type ReactNode } from "react";
import { motion, useInView, type Variants } from "framer-motion";

const ease = [0.25, 0.46, 0.45, 0.94] as [number, number, number, number];

function makeVariants(
  variant: string,
  delay: number
): Variants {
  const base: Record<string, Variants> = {
    fadeUp: {
      hidden: { opacity: 0, y: 40 },
      visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease, delay } },
    },
    fadeDown: {
      hidden: { opacity: 0, y: -40 },
      visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease, delay } },
    },
    fadeLeft: {
      hidden: { opacity: 0, x: -40 },
      visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease, delay } },
    },
    fadeRight: {
      hidden: { opacity: 0, x: 40 },
      visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease, delay } },
    },
    scaleIn: {
      hidden: { opacity: 0, scale: 0.8 },
      visible: { opacity: 1, scale: 1, transition: { duration: 0.5, ease, delay } },
    },
    blurIn: {
      hidden: { opacity: 0, filter: "blur(10px)" },
      visible: { opacity: 1, filter: "blur(0px)", transition: { duration: 0.6, ease, delay } },
    },
  };
  return base[variant] || base.fadeUp;
}

interface RevealProps {
  children: ReactNode;
  variant?: "fadeUp" | "fadeDown" | "fadeLeft" | "fadeRight" | "scaleIn" | "blurIn";
  delay?: number;
  className?: string;
  once?: boolean;
}

export default function Reveal({
  children,
  variant = "fadeUp",
  delay = 0,
  className,
  once = true,
}: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once, margin: "-100px" });

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      variants={makeVariants(variant, delay)}
      className={className}
    >
      {children}
    </motion.div>
  );
}
