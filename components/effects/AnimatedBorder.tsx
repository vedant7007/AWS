"use client";

import { type ReactNode } from "react";

interface AnimatedBorderProps {
  children: ReactNode;
  className?: string;
  borderRadius?: string;
  gradientColors?: string[];
  speed?: number;
  borderWidth?: number;
}

export default function AnimatedBorder({
  children,
  className = "",
  borderRadius = "1rem",
  gradientColors = ["var(--primary)", "var(--accent-blue)", "var(--accent-teal)", "var(--primary)"],
  speed = 4,
  borderWidth = 1,
}: AnimatedBorderProps) {
  const gradient = gradientColors.join(", ");

  return (
    <div
      className={`animated-border-wrapper relative ${className}`}
      style={{
        borderRadius,
        padding: `${borderWidth}px`,
      }}
    >
      {/* Rotating gradient border */}
      <div
        className="absolute inset-0 rounded-[inherit] opacity-60"
        style={{
          background: `conic-gradient(from var(--border-angle, 0deg), ${gradient})`,
          animation: `border-rotate ${speed}s linear infinite`,
        }}
      />
      {/* Inner content */}
      <div
        className="relative rounded-[inherit] bg-elevated"
        style={{ borderRadius: `calc(${borderRadius} - ${borderWidth}px)` }}
      >
        {children}
      </div>
    </div>
  );
}
