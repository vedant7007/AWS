"use client";

import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";

export default function CloudTransition() {
  const pathname = usePathname();
  const [isTransitioning, setIsTransitioning] = useState(false);
  const previousPathname = useRef(pathname);
  const isFirstRender = useRef(true);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      previousPathname.current = pathname;
      return;
    }

    if (pathname !== previousPathname.current) {
      const prefersReduced = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;
      if (prefersReduced) {
        previousPathname.current = pathname;
        return;
      }

      setIsTransitioning(true);

      const exitTimer = setTimeout(() => {
        setIsTransitioning(false);
        previousPathname.current = pathname;
      }, 1400);

      return () => clearTimeout(exitTimer);
    }
  }, [pathname]);

  return (
    <AnimatePresence>
      {isTransitioning && (
        <div className="fixed inset-0 z-[60] pointer-events-none">
          {/* Center overlay — ensures full coverage */}
          <motion.div
            className="absolute inset-0 bg-background/95 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
          />

          {/* Top cloud shape */}
          <motion.div
            className="absolute -top-1/4 left-1/2 h-[60vh] w-[140vw] -translate-x-1/2 rounded-[50%] bg-surface"
            initial={{ y: "-100%" }}
            animate={{ y: "0%" }}
            exit={{ y: "-100%" }}
            transition={{
              duration: 0.6,
              ease: [0.4, 0, 0.2, 1] as [number, number, number, number],
            }}
          />

          {/* Bottom cloud shape */}
          <motion.div
            className="absolute -bottom-1/4 left-1/2 h-[60vh] w-[140vw] -translate-x-1/2 rounded-[50%] bg-surface"
            initial={{ y: "100%" }}
            animate={{ y: "0%" }}
            exit={{ y: "100%" }}
            transition={{
              duration: 0.6,
              delay: 0.05,
              ease: [0.4, 0, 0.2, 1] as [number, number, number, number],
            }}
          />
        </div>
      )}
    </AnimatePresence>
  );
}
