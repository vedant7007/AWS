"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useInView, Variants } from "framer-motion";

interface BlurTextProps {
  text: string;
  delay?: number;
  className?: string;
  animateBy?: "words" | "letters";
  direction?: "top" | "bottom";
  threshold?: number;
  rootMargin?: string;
  onAnimationComplete?: () => void;
}

export default function BlurText({
  text,
  delay = 0,
  className = "",
  animateBy = "words",
  direction = "top",
  threshold = 0.1,
  rootMargin = "0px",
  onAnimationComplete,
}: BlurTextProps) {
  const elements = animateBy === "words" ? text.split(" ") : text.split("");
  const [animatedCount, setAnimatedCount] = useState(0);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: threshold, margin: rootMargin as any });

  useEffect(() => {
    if (inView && animatedCount === elements.length && onAnimationComplete) {
      onAnimationComplete();
    }
  }, [inView, animatedCount, elements.length, onAnimationComplete]);

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: animateBy === "words" ? 0.1 : 0.03,
        delayChildren: delay,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { 
      filter: "blur(10px)", 
      opacity: 0, 
      y: direction === "top" ? -20 : 20 
    },
    visible: { 
      filter: "blur(0px)", 
      opacity: 1, 
      y: 0,
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 100,
      }
    },
  };

  return (
    <motion.p
      ref={ref}
      variants={containerVariants}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      className={`inline-block ${className}`}
    >
      {elements.map((el, i) => (
        <motion.span
          key={i}
          variants={itemVariants}
          onAnimationComplete={() => setAnimatedCount((prev) => prev + 1)}
          className="inline-block"
        >
          {el === " " ? "\u00A0" : el}
          {animateBy === "words" && i < elements.length - 1 && "\u00A0"}
        </motion.span>
      ))}
    </motion.p>
  );
}
