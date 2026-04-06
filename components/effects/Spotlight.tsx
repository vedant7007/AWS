"use client";

import { useRef, useState, type ReactNode, type MouseEvent } from "react";

interface SpotlightProps {
  children: ReactNode;
  className?: string;
  size?: number;
  color?: string;
  intensity?: number;
}

export default function Spotlight({
  children,
  className = "",
  size = 600,
  color = "var(--primary)",
  intensity = 0.07,
}: SpotlightProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: MouseEvent) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    setPos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  return (
    <div
      ref={ref}
      className={`relative overflow-hidden ${className}`}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Spotlight glow */}
      <div
        className="pointer-events-none absolute inset-0 z-[1] transition-opacity duration-500"
        style={{
          opacity: isHovered ? 1 : 0,
          background: `radial-gradient(${size}px circle at ${pos.x}px ${pos.y}px, ${color}, transparent 70%)`,
          mixBlendMode: "soft-light",
          filter: `opacity(${intensity * 100}%)`,
        }}
      />
      <div className="relative z-[2]">{children}</div>
    </div>
  );
}
