"use client";

import { motion } from "framer-motion";
import dynamic from "next/dynamic";
import TypewriterText from "./TypewriterText";
import StatsCounter from "./StatsCounter";
import ScrollIndicator from "./ScrollIndicator";
import MagneticButton from "@/components/shared/MagneticButton";
import Aurora from "@/components/effects/Aurora";
import FloatingElement from "@/components/effects/FloatingElement";
import { typewriterPhrases, trustLogos } from "@/lib/data";
import { Cloud, Zap, Database, Globe, Server, Lock } from "lucide-react";

const Shuffle = dynamic(() => import("@/components/ui/Shuffle"), {
  ssr: false,
});

const heroWords = [
  { text: "Build.", delay: 0.5 },
  { text: "Learn.", delay: 0.65 },
  { text: "Deploy.", delay: 0.8 },
];

const floatingIcons = [
  { Icon: Cloud, x: "8%", y: "20%", size: 32, duration: 8, delay: 0, opacity: 0.08 },
  { Icon: Zap, x: "85%", y: "15%", size: 26, duration: 10, delay: 1, opacity: 0.06 },
  { Icon: Database, x: "15%", y: "70%", size: 28, duration: 9, delay: 0.5, opacity: 0.07 },
  { Icon: Globe, x: "80%", y: "65%", size: 30, duration: 7, delay: 1.5, opacity: 0.05 },
  { Icon: Server, x: "50%", y: "85%", size: 24, duration: 11, delay: 2, opacity: 0.06 },
  { Icon: Lock, x: "90%", y: "40%", size: 22, duration: 8, delay: 0.8, opacity: 0.05 },
];

export default function HeroSection() {
  return (
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden bg-background">
      {/* Aurora mesh gradient background */}
      <Aurora />

      {/* Dot grid pattern overlay */}
      <div className="dot-grid pointer-events-none absolute inset-0 opacity-20" />

      {/* 3D Floating icons */}
      {floatingIcons.map(({ Icon, x, y, size, duration, delay, opacity }, i) => (
        <FloatingElement
          key={i}
          className="pointer-events-none absolute text-text-muted"
          duration={duration}
          delay={delay}
          distance={20}
          rotate={8}
        >
          <div style={{ position: "absolute", left: x, top: y, opacity }}>
            <Icon style={{ width: size, height: size }} />
          </div>
        </FloatingElement>
      ))}

      {/* AWS CLOUD CLUB - Shuffle Text (absolute centered background) */}
      <motion.div
        className="pointer-events-none absolute inset-0 z-[5] flex items-center justify-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.1, duration: 0.4 }}
      >
        <Shuffle
          text="AWS CLOUD CLUB"
          className="shuffle-hero-title font-mono text-5xl font-bold tracking-[0.15em] md:text-7xl lg:text-8xl xl:text-9xl"
          shuffleDirection="right"
          duration={0.35}
          animationMode="evenodd"
          shuffleTimes={1}
          ease="power3.out"
          stagger={0.03}
          threshold={0.1}
          triggerOnce={true}
          triggerOnHover={false}
          respectReducedMotion={true}
          loop={false}
          tag="h1"
          style={{ textAlign: "center" }}
        />
      </motion.div>

      {/* Content */}
      <div className="relative z-10 mx-auto max-w-[1200px] px-6 text-center mt-24">
        {/* Badge with live pulse */}
        <motion.div
          className="mb-10 inline-flex items-center gap-2.5 rounded-full border border-primary/20 bg-primary-muted/50 px-5 py-2 text-sm font-medium backdrop-blur-md"
          initial={{ opacity: 0, y: 30, scale: 0.8 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ delay: 0.3, duration: 0.6, type: "spring" }}
        >
          <span className="relative flex h-2 w-2">
            <span className="pulse-dot absolute inline-flex h-full w-full rounded-full bg-accent-green opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-accent-green" />
          </span>
          <span className="text-text-secondary">Official AWS Cloud Club</span>
          <span className="h-3 w-px bg-border" />
          <span className="text-primary">VJIT, Hyderabad</span>
        </motion.div>

        {/* Main Headline with 3D perspective reveal */}
        <div className="perspective-container mb-5">
          <div className="flex flex-wrap items-center justify-center gap-x-4 md:gap-x-6">
            {heroWords.map((word, i) => (
              <motion.span
                key={word.text}
                className="font-heading text-5xl font-bold tracking-[-0.03em] text-text-primary md:text-6xl lg:text-7xl xl:text-8xl"
                initial={{ opacity: 0, y: 60, rotateX: 40, filter: "blur(10px)" }}
                animate={{ opacity: 1, y: 0, rotateX: 0, filter: "blur(0px)" }}
                transition={{
                  delay: word.delay,
                  duration: 0.8,
                  ease: [0.16, 1, 0.3, 1],
                }}
              >
                {word.text}
              </motion.span>
            ))}
          </div>
          <motion.div
            className="mt-3"
            initial={{ opacity: 0, y: 60, rotateX: 40, filter: "blur(10px)" }}
            animate={{ opacity: 1, y: 0, rotateX: 0, filter: "blur(0px)" }}
            transition={{ delay: 1.0, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <span className="gradient-text-animated font-heading text-5xl font-bold tracking-[-0.03em] md:text-6xl lg:text-7xl xl:text-8xl">
              On the Cloud.
            </span>
          </motion.div>
        </div>

        {/* Typewriter */}
        <motion.div
          className="mb-10 min-h-[28px]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.4, duration: 0.5 }}
        >
          <TypewriterText phrases={typewriterPhrases} />
        </motion.div>

        {/* Dual CTA */}
        <motion.div
          className="mb-8 flex flex-col items-center justify-center gap-4 sm:flex-row"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.8, duration: 0.6 }}
        >
          <MagneticButton
            as="a"
            href="#join"
            className="shimmer-btn glow-ring inline-flex items-center gap-2 rounded-2xl bg-gradient-to-r from-primary to-primary-hover px-10 py-4 font-heading text-base font-bold text-text-on-primary shadow-lg shadow-primary/25"
          >
            Join the Club
            <span aria-hidden="true" className="text-lg">→</span>
          </MagneticButton>
          <MagneticButton
            as="a"
            href="/events"
            className="hover-lift inline-flex items-center gap-2 rounded-2xl border border-border bg-elevated/50 px-10 py-4 font-heading text-base font-semibold text-text-primary backdrop-blur-md transition-all hover:border-primary/40 hover:bg-primary-muted"
          >
            Explore Events
          </MagneticButton>
        </motion.div>

        {/* Stats */}
        <StatsCounter />

        {/* Trust bar */}
        <motion.div
          className="mt-14"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.5, duration: 0.6 }}
        >
          <p className="mb-5 text-[11px] font-semibold uppercase tracking-[0.15em] text-text-muted">
            Affiliated with
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3">
            {trustLogos.map((logo) => (
              <div
                key={logo.name}
                className="hover-lift rounded-lg border border-border/50 bg-surface/30 px-5 py-2 font-mono text-xs font-medium text-text-muted/50 backdrop-blur-sm transition-all duration-300 hover:border-primary/30 hover:text-text-secondary"
              >
                {logo.short}
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <ScrollIndicator />

      {/* Bottom gradient fade */}
      <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-background to-transparent" />
    </section>
  );
}
