"use client";

import { type ReactNode, type MouseEvent, useRef, useState } from "react";
import { motion } from "framer-motion";

interface GlowCardProps {
  children: ReactNode;
  className?: string;
  glowColor?: string;
  accent?: boolean;
}

export default function GlowCard({
  children,
  className = "",
  glowColor,
  accent = true,
}: GlowCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: MouseEvent) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  const effectiveGlowColor = glowColor || "var(--primary)";

  return (
    <motion.div
      ref={ref}
      className={`card-accent-top relative overflow-hidden rounded-2xl border border-border bg-elevated p-6 transition-all duration-300 hover:border-border-hover ${accent ? "card-accent-top" : ""} ${className}`}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      whileHover={{ y: -6 }}
      transition={{ duration: 0.25, ease: "easeOut" }}
    >
      {/* Glow effect */}
      <div
        className="pointer-events-none absolute inset-0 transition-opacity duration-300"
        style={{
          background: isHovered
            ? `radial-gradient(500px circle at ${mousePos.x}px ${mousePos.y}px, ${effectiveGlowColor}, transparent 60%)`
            : "none",
          opacity: isHovered ? 0.12 : 0,
        }}
      />
      {/* Top edge highlight on hover */}
      <div
        className="pointer-events-none absolute top-0 left-0 right-0 h-px transition-opacity duration-300"
        style={{
          background: `linear-gradient(90deg, transparent, ${effectiveGlowColor}, transparent)`,
          opacity: isHovered ? 0.5 : 0,
        }}
      />
      <div className="relative z-10">{children}</div>
    </motion.div>
  );
}
