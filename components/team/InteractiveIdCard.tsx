"use client";

import { useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { Linkedin, Github, Twitter } from "lucide-react";

interface InteractiveIdCardProps {
  name: string;
  role: string;
  tagline?: string;
  avatarUrl: string;
  socials?: { linkedin?: string; github?: string; twitter?: string };
}

export default function InteractiveIdCard({
  name,
  role,
  tagline,
  avatarUrl,
  socials,
}: InteractiveIdCardProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  // Drag position — springy
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Rotation follows x with delay for lanyard sway
  const rotate = useSpring(useTransform(x, [-200, 200], [-18, 18]), {
    stiffness: 120,
    damping: 15,
  });

  // Lanyard strap tilt — slight lag
  const strapRotate = useSpring(useTransform(x, [-200, 200], [-6, 6]), {
    stiffness: 80,
    damping: 12,
  });

  return (
    <div
      ref={containerRef}
      className="relative flex h-[560px] w-full items-start justify-center overflow-visible"
    >
      {/* Lanyard anchor point at top */}
      <div className="absolute left-1/2 top-0 -translate-x-1/2">
        {/* Anchor knot */}
        <div className="mx-auto h-3 w-6 rounded-b-full bg-gradient-to-b from-[#FF9900] to-[#b35c00] shadow-[0_2px_4px_rgba(0,0,0,0.4)]" />

        {/* Lanyard strap */}
        <motion.div
          className="relative mx-auto origin-top"
          style={{ rotate: strapRotate }}
        >
          <div className="mx-auto h-[120px] w-[14px] bg-gradient-to-b from-[#FF9900] via-[#e68a00] to-[#FF9900] shadow-[inset_0_0_8px_rgba(0,0,0,0.4)]">
            {/* Strap texture — repeating stripes */}
            <div
              className="h-full w-full opacity-30"
              style={{
                background:
                  "repeating-linear-gradient(0deg, transparent 0, transparent 6px, rgba(0,0,0,0.3) 6px, rgba(0,0,0,0.3) 8px)",
              }}
            />
          </div>

          {/* Metal clip */}
          <div className="mx-auto -mt-[2px] h-4 w-8 rounded-sm bg-gradient-to-b from-[#d4d4d8] via-[#a1a1aa] to-[#52525b] shadow-[0_2px_4px_rgba(0,0,0,0.5)]">
            <div className="mx-auto mt-[5px] h-[6px] w-5 rounded-full border border-[#3f3f46] bg-[#18181b]" />
          </div>

          {/* Draggable ID card */}
          <motion.div
            drag
            dragConstraints={containerRef}
            dragElastic={0.35}
            dragTransition={{ bounceStiffness: 200, bounceDamping: 14 }}
            whileDrag={{ cursor: "grabbing" }}
            style={{ x, y, rotate }}
            className="relative mx-auto mt-1 w-[280px] cursor-grab touch-none"
          >
            {/* The ID card */}
            <div className="relative overflow-hidden rounded-2xl border-2 border-[#FF9900]/40 bg-gradient-to-br from-[#0a0f1c] via-[#0f1729] to-[#1a0f00] shadow-[0_20px_50px_rgba(0,0,0,0.6),0_0_40px_rgba(255,153,0,0.15)]">
              {/* Holographic overlay */}
              <div className="pointer-events-none absolute inset-0 opacity-60 mix-blend-overlay">
                <div
                  className="absolute inset-0"
                  style={{
                    background:
                      "linear-gradient(135deg, transparent 30%, rgba(255,153,0,0.3) 50%, transparent 70%)",
                    backgroundSize: "200% 200%",
                    animation: "holo-shift 4s ease-in-out infinite",
                  }}
                />
              </div>

              {/* Club header */}
              <div className="relative border-b border-[#FF9900]/20 bg-black/40 px-5 py-3 backdrop-blur-sm">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="h-6 w-6 rounded bg-gradient-to-br from-[#FF9900] to-[#cc7a00] text-center text-[10px] font-bold leading-6 text-black">
                      AWS
                    </div>
                    <div>
                      <p className="text-[9px] font-semibold uppercase tracking-wider text-[#FF9900]">
                        Cloud Club
                      </p>
                      <p className="text-[8px] uppercase tracking-wider text-text-muted">
                        VJIT
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-[8px] uppercase tracking-wider text-text-muted">
                      ID
                    </p>
                    <p className="font-mono text-[10px] text-[#FF9900]">
                      #001
                    </p>
                  </div>
                </div>
              </div>

              {/* Photo */}
              <div className="relative mx-auto mt-5 h-28 w-28 overflow-hidden rounded-xl border-2 border-[#FF9900]/40 shadow-lg">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={avatarUrl}
                  alt={name}
                  className="h-full w-full object-cover"
                  draggable={false}
                />
              </div>

              {/* Info */}
              <div className="relative px-5 pb-4 pt-3 text-center">
                <p className="font-heading text-base font-bold text-text-primary">
                  {name}
                </p>
                <p className="mt-0.5 text-xs font-semibold uppercase tracking-wider text-[#FF9900]">
                  {role}
                </p>
                {tagline && (
                  <p className="mt-2 line-clamp-2 text-[10px] leading-snug text-text-muted">
                    {tagline}
                  </p>
                )}

                {/* Socials */}
                {socials && (
                  <div className="mt-3 flex justify-center gap-2">
                    {socials.linkedin && (
                      <a
                        href={socials.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        onPointerDown={(e) => e.stopPropagation()}
                        className="flex h-7 w-7 items-center justify-center rounded-md border border-[#FF9900]/30 text-text-muted transition-colors hover:border-[#FF9900] hover:text-[#FF9900]"
                      >
                        <Linkedin className="h-3 w-3" />
                      </a>
                    )}
                    {socials.github && (
                      <a
                        href={socials.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        onPointerDown={(e) => e.stopPropagation()}
                        className="flex h-7 w-7 items-center justify-center rounded-md border border-[#FF9900]/30 text-text-muted transition-colors hover:border-[#FF9900] hover:text-[#FF9900]"
                      >
                        <Github className="h-3 w-3" />
                      </a>
                    )}
                    {socials.twitter && (
                      <a
                        href={socials.twitter}
                        target="_blank"
                        rel="noopener noreferrer"
                        onPointerDown={(e) => e.stopPropagation()}
                        className="flex h-7 w-7 items-center justify-center rounded-md border border-[#FF9900]/30 text-text-muted transition-colors hover:border-[#FF9900] hover:text-[#FF9900]"
                      >
                        <Twitter className="h-3 w-3" />
                      </a>
                    )}
                  </div>
                )}

                {/* Barcode strip */}
                <div className="mt-3 flex h-5 items-center justify-center gap-[2px] rounded border border-[#FF9900]/20 bg-white/5 px-2">
                  {Array.from({ length: 24 }).map((_, i) => (
                    <div
                      key={i}
                      className="h-3 bg-[#FF9900]/70"
                      style={{ width: i % 3 === 0 ? "2px" : "1px" }}
                    />
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Drag hint */}
      <p className="absolute bottom-2 left-1/2 -translate-x-1/2 text-[10px] uppercase tracking-wider text-text-muted">
        ← Drag the card →
      </p>

      <style jsx>{`
        @keyframes holo-shift {
          0%,
          100% {
            background-position: 0% 0%;
          }
          50% {
            background-position: 100% 100%;
          }
        }
      `}</style>
    </div>
  );
}
