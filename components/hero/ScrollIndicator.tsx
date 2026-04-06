"use client";

import { motion, useScroll, useTransform } from "framer-motion";

export default function ScrollIndicator() {
  const { scrollY } = useScroll();
  const opacity = useTransform(scrollY, [0, 200], [1, 0]);

  return (
    <motion.div
      className="absolute bottom-8 left-1/2 flex -translate-x-1/2 flex-col items-center gap-2"
      style={{ opacity }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 3, duration: 0.6 }}
    >
      <span className="text-xs text-text-muted">Scroll to explore</span>
      <motion.div
        className="flex h-8 w-5 items-start justify-center rounded-full border border-text-muted/30 p-1"
        animate={{ y: [0, 4, 0] }}
        transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
      >
        <div className="h-1.5 w-1 rounded-full bg-primary" />
      </motion.div>
    </motion.div>
  );
}
