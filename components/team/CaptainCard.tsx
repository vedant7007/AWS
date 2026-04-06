"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import Image from "next/image";
import { Linkedin, Github, Instagram } from "lucide-react";
import MagneticButton from "@/components/shared/MagneticButton";

interface CaptainCardProps {
  name: string;
  role: string;
  bio: string;
  photoUrl: string;
  socials: {
    linkedin?: string;
    github?: string;
    twitter?: string;
    instagram?: string;
  };
}

export default function CaptainCard({
  name,
  role,
  bio,
  photoUrl,
  socials,
}: CaptainCardProps) {
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <div className="relative w-full group" style={{ perspective: "1000px" }}>
      <motion.div
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ type: "spring", stiffness: 260, damping: 20, mass: 1 }}
        style={{ transformStyle: "preserve-3d" }}
        onClick={() => setIsFlipped(!isFlipped)}
        /* tighter ratio on mobile, wider on desktop */
        className="relative w-full aspect-[4/4] sm:aspect-[4/4.5] cursor-pointer"
      >
        {/* ── FRONT ─────────────────────────────────── */}
        <div
          className="absolute inset-0 w-full h-full rounded-2xl sm:rounded-[2rem] overflow-hidden border-2 border-primary/20 shadow-2xl transition-colors duration-500 hover:border-primary/40"
          style={{ backfaceVisibility: "hidden" }}
        >
          <Image
            src={
              photoUrl ||
              "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=800&h=800&fit=crop&crop=face"
            }
            alt={name}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-110"
          />
          <div className="absolute inset-x-0 bottom-0 p-4 sm:p-6 md:p-8 bg-gradient-to-t from-black/90 via-black/40 to-transparent">
            <span className="text-primary text-[9px] font-black uppercase tracking-[0.4em] mb-1 block">
              {role}
            </span>
            <h2 className="text-white text-xl sm:text-2xl md:text-3xl font-black uppercase tracking-tighter leading-none">
              {name}
            </h2>
          </div>
        </div>

        {/* ── BACK ──────────────────────────────────── */}
        <div
          className="absolute inset-0 w-full h-full rounded-2xl sm:rounded-[2rem] overflow-hidden bg-surface-hover/95 backdrop-blur-3xl border-2 border-primary/40 shadow-2xl p-4 sm:p-6 md:p-8 flex flex-col items-center justify-center text-center"
          style={{
            backfaceVisibility: "hidden",
            transform: "rotateY(180deg)",
          }}
        >
          <div className="mb-4 p-3 sm:p-4 md:p-6 rounded-xl sm:rounded-2xl border border-primary/10 bg-primary/5">
            <p className="text-text-primary text-xs sm:text-sm md:text-base leading-relaxed italic">
              &quot;{bio}&quot;
            </p>
          </div>

          <div className="flex gap-3">
            {socials.linkedin && (
              <MagneticButton
                as="a"
                href={socials.linkedin}
                target="_blank"
                className="w-9 h-9 sm:w-10 sm:h-10 flex items-center justify-center rounded-full bg-surface border border-primary/20 hover:border-primary text-text-primary hover:text-primary transition-all shadow-sm"
              >
                <Linkedin className="h-4 w-4 sm:h-5 sm:w-5" />
              </MagneticButton>
            )}
            {socials.github && (
              <MagneticButton
                as="a"
                href={socials.github}
                target="_blank"
                className="w-9 h-9 sm:w-10 sm:h-10 flex items-center justify-center rounded-full bg-surface border border-primary/20 hover:border-primary text-text-primary hover:text-primary transition-all shadow-sm"
              >
                <Github className="h-4 w-4 sm:h-5 sm:w-5" />
              </MagneticButton>
            )}
            {socials.instagram && (
              <MagneticButton
                as="a"
                href={socials.instagram}
                target="_blank"
                className="w-9 h-9 sm:w-10 sm:h-10 flex items-center justify-center rounded-full bg-surface border border-primary/20 hover:border-primary text-text-primary hover:text-primary transition-all shadow-sm"
              >
                <Instagram className="h-4 w-4 sm:h-5 sm:w-5" />
              </MagneticButton>
            )}
          </div>
        </div>
      </motion.div>
    </div>
  );
}
