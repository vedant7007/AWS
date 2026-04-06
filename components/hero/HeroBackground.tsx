"use client";

import { useEffect, useRef } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import {
  Cloud,
  Zap,
  Database,
  Lock,
  Globe,
  Server,
  FolderOpen,
  Eye,
} from "lucide-react";

/* Defined positions — no randomness, each icon has unique speed */
const ICONS = [
  { Icon: Cloud, x: 12, y: 15, size: 36, speed: 18 },
  { Icon: Zap, x: 78, y: 22, size: 28, speed: 22 },
  { Icon: Database, x: 45, y: 68, size: 26, speed: 15 },
  { Icon: Lock, x: 88, y: 55, size: 22, speed: 25 },
  { Icon: Globe, x: 25, y: 80, size: 32, speed: 20 },
  { Icon: Server, x: 65, y: 12, size: 28, speed: 17 },
  { Icon: FolderOpen, x: 8, y: 48, size: 24, speed: 23 },
  { Icon: Eye, x: 55, y: 42, size: 22, speed: 19 },
] as const;

const BLOBS = [
  { x: 20, y: 25, size: 280, drift: 30 },
  { x: 70, y: 15, size: 220, drift: 25 },
  { x: 40, y: 60, size: 320, drift: 35 },
  { x: 85, y: 70, size: 200, drift: 20 },
  { x: 10, y: 80, size: 260, drift: 28 },
];

export default function HeroBackground() {
  const containerRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, { stiffness: 40, damping: 30 });
  const springY = useSpring(mouseY, { stiffness: 40, damping: 30 });

  useEffect(() => {
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReduced) return;

    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      mouseX.set((e.clientX - rect.left - rect.width / 2) * 0.03);
      mouseY.set((e.clientY - rect.top - rect.height / 2) * 0.03);
    };

    const el = containerRef.current;
    el?.addEventListener("mousemove", handleMouseMove, { passive: true });
    return () => el?.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 overflow-hidden pointer-events-none"
    >
      {/* Cloud blobs — use CSS custom property for theme-aware color */}
      {BLOBS.map((blob, i) => (
        <motion.div
          key={`blob-${i}`}
          className="absolute pointer-events-none"
          style={{
            width: blob.size,
            height: blob.size * 0.6,
            left: `${blob.x}%`,
            top: `${blob.y}%`,
            borderRadius: "50% 50% 50% 50% / 60% 60% 40% 40%",
            background:
              "radial-gradient(ellipse, var(--hero-blob-color) 0%, transparent 70%)",
            filter: "blur(40px)",
            willChange: "transform",
          }}
          animate={{
            x: [0, blob.drift, -blob.drift * 0.6, blob.drift * 0.3, 0],
            y: [
              0,
              -blob.drift * 0.7,
              blob.drift * 0.5,
              -blob.drift * 0.3,
              0,
            ],
          }}
          transition={{
            duration: 20 + i * 3,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}

      {/* Gradient orbs */}
      {[0, 1, 2].map((i) => (
        <motion.div
          key={`orb-${i}`}
          className="absolute rounded-full pointer-events-none"
          style={{
            width: 300 + i * 80,
            height: 300 + i * 80,
            left: `${20 + i * 25}%`,
            top: `${25 + i * 15}%`,
            background:
              "radial-gradient(circle, var(--hero-glow-color) 0%, transparent 70%)",
            filter: "blur(60px)",
            willChange: "transform",
          }}
          animate={{ scale: [0.9, 1.1, 0.9] }}
          transition={{
            duration: 8 + i * 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}

      {/* Floating AWS icons — mouse parallax applied to wrapper */}
      <motion.div
        className="absolute inset-0"
        style={{ x: springX, y: springY }}
      >
        {ICONS.map((icon, i) => {
          const { Icon, x, y, size, speed } = icon;
          return (
            <motion.div
              key={`icon-${i}`}
              className="absolute pointer-events-none text-text-muted"
              style={{
                left: `${x}%`,
                top: `${y}%`,
                opacity: 0.1,
                willChange: "transform",
              }}
              animate={{
                y: [0, -15, 10, -8, 0],
                x: [0, 12, -8, 5, 0],
                rotate: [0, 3, -2, 1, 0],
              }}
              transition={{
                duration: speed,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              <Icon style={{ width: size, height: size }} />
            </motion.div>
          );
        })}
      </motion.div>
    </div>
  );
}
