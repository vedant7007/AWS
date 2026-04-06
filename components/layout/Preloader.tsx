"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Preloader() {
  const [isLoading, setIsLoading] = useState(true);
  const [progress, setProgress] = useState(0);
  const [showPreloader, setShowPreloader] = useState(true);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const hasVisited = sessionStorage.getItem("aws-vjit-visited");
      if (hasVisited) {
        setIsLoading(false);
        setShowPreloader(false);
        return;
      }
    }

    const duration = 2500;
    const interval = 30;
    const steps = duration / interval;
    let step = 0;

    const timer = setInterval(() => {
      step++;
      const p = Math.min((step / steps) * 100, 100);
      setProgress(p);

      if (p >= 100) {
        clearInterval(timer);
        setTimeout(() => {
          setIsLoading(false);
          sessionStorage.setItem("aws-vjit-visited", "true");
        }, 300);
      }
    }, interval);

    return () => clearInterval(timer);
  }, []);

  if (!showPreloader) return null;

  return (
    <AnimatePresence onExitComplete={() => setShowPreloader(false)}>
      {isLoading && (
        <motion.div
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-background"
          exit={{
            opacity: 0,
            scale: 1.1,
            filter: "blur(10px)",
            transition: { duration: 0.6, ease: [0.76, 0, 0.24, 1] },
          }}
        >
          {/* Aurora glow behind logo */}
          <motion.div
            className="absolute h-64 w-64 rounded-full"
            style={{
              background: "radial-gradient(circle, var(--primary-muted) 0%, transparent 70%)",
              filter: "blur(60px)",
            }}
            animate={{ scale: [1, 1.3, 1], opacity: [0.3, 0.6, 0.3] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          />

          {/* Logo */}
          <motion.div
            className="relative mb-8 flex items-center gap-3"
            initial={{ scale: 0, opacity: 0, rotateY: -90 }}
            animate={{ scale: 1, opacity: 1, rotateY: 0 }}
            transition={{ type: "spring", stiffness: 200, damping: 15, delay: 0.2 }}
          >
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-primary to-primary-hover shadow-2xl shadow-primary/30">
              <span className="text-3xl font-bold text-text-on-primary">☁</span>
            </div>
          </motion.div>

          {/* Typewriter text */}
          <motion.div
            className="mb-8 overflow-hidden font-heading text-xl font-semibold text-text-primary"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            <TypewriterPreloader text="AWS Cloud Club VJIT" />
          </motion.div>

          {/* Progress bar */}
          <div className="h-1 w-48 overflow-hidden rounded-full bg-surface">
            <motion.div
              className="h-full rounded-full bg-gradient-to-r from-primary via-accent-blue to-primary-hover"
              initial={{ width: "0%" }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.05 }}
            />
          </div>

          {/* Percentage */}
          <motion.span
            className="mt-3 font-mono text-sm text-text-muted tabular-nums"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
          >
            {Math.round(progress)}%
          </motion.span>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function TypewriterPreloader({ text }: { text: string }) {
  const [displayText, setDisplayText] = useState("");

  useEffect(() => {
    let i = 0;
    const timer = setInterval(() => {
      if (i <= text.length) {
        setDisplayText(text.slice(0, i));
        i++;
      } else {
        clearInterval(timer);
      }
    }, 60);
    return () => clearInterval(timer);
  }, [text]);

  return (
    <span>
      {displayText}
      <span className="animate-pulse text-primary">|</span>
    </span>
  );
}
