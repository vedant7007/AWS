"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useInView } from "framer-motion";
import { achievements, marqueeItems } from "@/lib/data";
import { staggerContainer, fadeUp } from "@/lib/animations";
import SectionHeader from "@/components/shared/SectionHeader";
import TiltCard3D from "@/components/effects/TiltCard3D";
import AnimatedBorder from "@/components/effects/AnimatedBorder";

function AnimatedStat({ value, suffix }: { value: number; suffix: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
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
      {count.toLocaleString()}
      {suffix}
    </span>
  );
}

const statGradients = [
  { from: "#FF9900", to: "#FF6600" },
  { from: "#4DA6FF", to: "#2563EB" },
  { from: "#2DD4BF", to: "#0D9488" },
];

export default function AchievementsSection() {
  return (
    <section className="relative py-24 md:py-32">
      <div className="mx-auto max-w-[1200px] px-6">
        <SectionHeader
          number="03"
          label="Achievements"
          title="What We've Accomplished"
        />

        <motion.div
          className="grid gap-5 md:grid-cols-3"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {achievements.map((stat, i) => (
            <motion.div key={stat.label} variants={fadeUp}>
              <TiltCard3D maxTilt={12} glareOpacity={0.12}>
                <AnimatedBorder
                  speed={6 + i * 2}
                  gradientColors={[statGradients[i].from, "var(--accent-blue)", statGradients[i].to, statGradients[i].from]}
                >
                  <div className="relative overflow-hidden p-8 text-center md:p-10">
                    {/* Large background icon */}
                    <div className="pointer-events-none absolute right-4 top-4 text-6xl opacity-[0.05]">
                      {stat.icon}
                    </div>

                    <div className="relative z-10">
                      <div className="mb-4 inline-flex h-14 w-14 items-center justify-center rounded-2xl text-3xl"
                        style={{ backgroundColor: `${statGradients[i].from}12` }}
                      >
                        {stat.icon}
                      </div>
                      <div className="stat-number font-heading text-5xl font-bold md:text-6xl">
                        <AnimatedStat value={stat.value} suffix={stat.suffix} />
                      </div>
                      <p className="mt-3 text-sm font-medium text-text-secondary">{stat.label}</p>
                    </div>
                  </div>
                </AnimatedBorder>
              </TiltCard3D>
            </motion.div>
          ))}
        </motion.div>

        {/* Marquee */}
        <div className="relative mt-16 overflow-hidden">
          <div className="pointer-events-none absolute left-0 top-0 z-10 h-full w-32 bg-gradient-to-r from-background to-transparent" />
          <div className="pointer-events-none absolute right-0 top-0 z-10 h-full w-32 bg-gradient-to-l from-background to-transparent" />
          <div className="flex animate-[marquee_30s_linear_infinite] gap-4">
            {[...marqueeItems, ...marqueeItems].map((item, i) => (
              <div
                key={`${item}-${i}`}
                className="flex shrink-0 items-center gap-2 rounded-full border border-border/40 bg-surface/30 px-5 py-2.5 text-sm font-medium text-text-secondary backdrop-blur-sm transition-colors hover:border-primary/30 hover:text-primary"
              >
                <span className="text-xs text-primary">&#10022;</span>
                {item}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
