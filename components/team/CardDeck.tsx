"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Linkedin, Github, Users, Instagram } from "lucide-react";

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  photoUrl: string;
  linkedin?: string;
  github?: string;
  instagram?: string;
  bio?: string;
}

interface CardDeckProps {
  lead: TeamMember;
  teamName: string;
  isExpanded?: boolean;
  onToggle?: () => void;
  onViewFullTeam?: () => void;
}

export default function CardDeck({
  lead,
  teamName,
  isExpanded = false,
  onToggle,
  onViewFullTeam,
}: CardDeckProps) {
  if (!lead) return null;

  return (
    <div className="relative w-full" style={{ perspective: "2000px" }}>
      <motion.div
        animate={{ rotateY: isExpanded ? 180 : 0 }}
        transition={{ type: "spring", stiffness: 400, damping: 30, mass: 0.8 }}
        style={{ transformStyle: "preserve-3d" }}
        /* Mobile: 4/5.5 ratio (taller portrait). Desktop keeps same */
        className="relative w-full aspect-[4/5] sm:aspect-[4/5.5] cursor-pointer"
        onClick={onToggle}
      >
        {/* ── FRONT ─────────────────────────────────── */}
        <div
          className="absolute inset-0 w-full h-full rounded-2xl sm:rounded-[2.5rem] overflow-hidden border border-primary/20 bg-surface shadow-2xl"
          style={{ backfaceVisibility: "hidden" }}
        >
          <Image
            src={
              lead.photoUrl ||
              "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face"
            }
            alt={lead.name}
            fill
            className="object-cover"
          />
          <div className="absolute inset-x-0 bottom-0 p-4 sm:p-6 md:p-8 bg-gradient-to-t from-black/90 via-black/20 to-transparent">
            <span className="text-primary text-[9px] font-black uppercase tracking-[0.4em] mb-1 block">
              {teamName}
            </span>
            <h3 className="text-white text-xl sm:text-2xl md:text-3xl font-black uppercase tracking-tighter leading-none">
              {lead.name}
            </h3>
          </div>
        </div>

        {/* ── BACK ──────────────────────────────────── */}
        <div
          className="absolute inset-0 w-full h-full rounded-2xl sm:rounded-[2.5rem] overflow-hidden bg-background border-2 border-primary/40 shadow-2xl p-4 sm:p-6 md:p-8 flex flex-col justify-center items-center text-center"
          style={{
            backfaceVisibility: "hidden",
            transform: "rotateY(180deg)",
          }}
        >
          <div className="mb-4 p-3 sm:p-4 rounded-xl sm:rounded-2xl border border-primary/10 bg-primary/5 w-full">
            <p className="text-text-primary text-xs sm:text-sm font-medium leading-relaxed italic">
              &quot;{lead.bio || "Leading the way in cloud innovation."}&quot;
            </p>
          </div>

          <div className="flex gap-3 mb-6">
            {lead.linkedin && (
              <a
                href={lead.linkedin}
                target="_blank"
                onClick={(e) => e.stopPropagation()}
                className="w-9 h-9 sm:w-10 sm:h-10 flex items-center justify-center rounded-full bg-surface border border-primary/20 hover:border-primary text-text-primary hover:text-primary transition-all"
              >
                <Linkedin className="h-4 w-4 sm:h-5 sm:w-5" />
              </a>
            )}
            {lead.github && (
              <a
                href={lead.github}
                target="_blank"
                onClick={(e) => e.stopPropagation()}
                className="w-9 h-9 sm:w-10 sm:h-10 flex items-center justify-center rounded-full bg-surface border border-primary/20 hover:border-primary text-text-primary hover:text-primary transition-all"
              >
                <Github className="h-4 w-4 sm:h-5 sm:w-5" />
              </a>
            )}
            {lead.instagram && (
              <a
                href={lead.instagram}
                target="_blank"
                onClick={(e) => e.stopPropagation()}
                className="w-9 h-9 sm:w-10 sm:h-10 flex items-center justify-center rounded-full bg-surface border border-primary/20 hover:border-primary text-text-primary hover:text-primary transition-all"
              >
                <Instagram className="h-4 w-4 sm:h-5 sm:w-5" />
              </a>
            )}
          </div>

          <button
            suppressHydrationWarning
            onClick={(e) => {
              e.stopPropagation();
              onViewFullTeam?.();
            }}
            className="group flex flex-col items-center gap-1.5"
          >
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full border border-primary/20 flex items-center justify-center group-hover:bg-primary group-hover:border-primary transition-all duration-300">
              <Users className="h-4 w-4 sm:h-5 sm:w-5 text-primary group-hover:text-white transition-colors" />
            </div>
            <span className="text-[9px] sm:text-[10px] font-black uppercase tracking-[0.2em] text-primary">
              View Full Team
            </span>
          </button>
        </div>
      </motion.div>
    </div>
  );
}
