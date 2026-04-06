"use client";

import { motion } from "framer-motion";
import MagneticButton from "@/components/shared/MagneticButton";
import Reveal from "@/components/shared/Reveal";
import Aurora from "@/components/effects/Aurora";
import FloatingElement from "@/components/effects/FloatingElement";

const floatingShapes = [
  { emoji: "☁️", x: "10%", y: "20%", size: 32, duration: 7, delay: 0 },
  { emoji: "⚡", x: "85%", y: "30%", size: 28, duration: 9, delay: 1 },
  { emoji: "🚀", x: "15%", y: "70%", size: 30, duration: 8, delay: 0.5 },
  { emoji: "💻", x: "80%", y: "75%", size: 26, duration: 10, delay: 1.5 },
  { emoji: "🔧", x: "50%", y: "15%", size: 24, duration: 6, delay: 2 },
  { emoji: "🌐", x: "70%", y: "50%", size: 28, duration: 8, delay: 0.8 },
];

export default function JoinCTA() {
  return (
    <section id="join" className="relative overflow-hidden py-24 md:py-32">
      {/* Aurora background */}
      <Aurora className="opacity-50" />

      {/* Dot grid */}
      <div className="dot-grid pointer-events-none absolute inset-0 opacity-10" />

      {/* Floating 3D elements */}
      {floatingShapes.map((shape, i) => (
        <FloatingElement
          key={i}
          className="pointer-events-none absolute"
          duration={shape.duration}
          delay={shape.delay}
          distance={25}
          rotate={10}
        >
          <div
            className="text-opacity-[0.08]"
            style={{
              position: "absolute",
              left: shape.x,
              top: shape.y,
              fontSize: shape.size,
              opacity: 0.08,
            }}
          >
            {shape.emoji}
          </div>
        </FloatingElement>
      ))}

      {/* Gradient border effect */}
      <div className="absolute inset-6 rounded-3xl border border-primary/10 md:inset-10" />

      <div className="relative z-10 mx-auto max-w-[1200px] px-6 text-center">
        <Reveal variant="scaleIn">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary-muted/50 px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-primary backdrop-blur-sm">
            <span className="relative flex h-2 w-2">
              <span className="pulse-dot absolute inline-flex h-full w-full rounded-full bg-accent-green opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-accent-green" />
            </span>
            Open to All VJIT Students
          </div>
        </Reveal>

        <Reveal variant="fadeUp">
          <h2 className="perspective-container font-heading text-4xl font-bold tracking-[-0.02em] text-text-primary md:text-5xl lg:text-6xl">
            Ready to Build
            <br />
            <span className="text-shimmer">on the Cloud?</span>
          </h2>
        </Reveal>
        <Reveal variant="fadeUp" delay={0.1}>
          <p className="mx-auto mt-5 max-w-lg text-base leading-relaxed text-text-secondary md:text-lg">
            Join 150+ students mastering AWS, earning certifications, and
            launching cloud careers. It&apos;s completely free.
          </p>
        </Reveal>
        <Reveal variant="fadeUp" delay={0.2}>
          <div className="mt-10">
            <MagneticButton
              as="a"
              href="#"
              className="shimmer-btn glow-ring inline-flex items-center gap-3 rounded-2xl bg-gradient-to-r from-primary to-primary-hover px-12 py-5 text-lg font-bold text-text-on-primary shadow-2xl shadow-primary/25"
            >
              Join AWS Cloud Club VJIT
              <span aria-hidden="true" className="text-xl">→</span>
            </MagneticButton>
          </div>
        </Reveal>
        <Reveal variant="fadeUp" delay={0.3}>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-6 text-sm text-text-muted">
            <span className="flex items-center gap-2">
              <span className="inline-block h-2 w-2 rounded-full bg-accent-green shadow-md shadow-accent-green/40" />
              No fees
            </span>
            <span className="flex items-center gap-2">
              <span className="inline-block h-2 w-2 rounded-full bg-accent-blue shadow-md shadow-accent-blue/40" />
              All branches welcome
            </span>
            <span className="flex items-center gap-2">
              <span className="inline-block h-2 w-2 rounded-full bg-accent-purple shadow-md shadow-accent-purple/40" />
              Beginner-friendly
            </span>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
