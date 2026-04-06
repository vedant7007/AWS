"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useInView } from "framer-motion";
import { heroStats } from "@/lib/data";
import TiltCard3D from "@/components/effects/TiltCard3D";

function AnimatedNumber({ value, suffix }: { value: number; suffix: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });

  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const duration = 2000;
    const increment = value / (duration / 16);
    const timer = setInterval(() => {
      start += increment;
      if (start >= value) {
        setCount(value);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);
    return () => clearInterval(timer);
  }, [inView, value]);

  return (
    <span ref={ref} className="tabular-nums">
      {count}
      {suffix}
    </span>
  );
}

export default function StatsCounter() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 2.2, duration: 0.6 }}
    >
      <TiltCard3D maxTilt={6} glareOpacity={0.08} className="inline-block">
        <div className="glass-strong inline-flex flex-wrap items-center justify-center gap-6 rounded-2xl px-8 py-5 md:gap-10">
          {heroStats.map((stat, i) => (
            <div key={stat.label} className="flex items-center gap-6">
              <div className="text-center">
                <div className="stat-number font-heading text-2xl font-bold md:text-3xl">
                  <AnimatedNumber value={stat.value} suffix={stat.suffix} />
                </div>
                <div className="mt-1 text-xs font-medium text-text-muted">{stat.label}</div>
              </div>
              {i < heroStats.length - 1 && (
                <div className="h-8 w-px bg-border/50" />
              )}
            </div>
          ))}
        </div>
      </TiltCard3D>
    </motion.div>
  );
}
