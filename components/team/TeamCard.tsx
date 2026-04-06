"use client";

import { motion } from "framer-motion";
import { Linkedin, Github, Twitter } from "lucide-react";
/** Local interface — the old TeamMember type was removed from lib/data.ts.
 *  This component is unused but kept for reference. */
interface TeamMember {
  name: string;
  role: string;
  year: string;
  branch: string;
  tier: "captain" | "lead" | "core";
  bio: string;
  skills: string[];
  social: {
    linkedin?: string;
    github?: string;
    twitter?: string;
  };
}

const roleColors: Record<string, string> = {
  "Club Captain": "#FF9900",
  "Tech Lead": "#4DA6FF",
  "Events Lead": "#A78BFA",
  "Content Lead": "#2DD4BF",
  "Community Lead": "#F472B6",
};

interface TeamCardProps {
  member: TeamMember;
  onClick: () => void;
}

export default function TeamCard({ member, onClick }: TeamCardProps) {
  const color = roleColors[member.role] || "#FF9900";
  const sizes = {
    captain: { avatar: "h-28 w-28", text: "text-4xl" },
    lead: { avatar: "h-20 w-20", text: "text-3xl" },
    core: { avatar: "h-16 w-16", text: "text-2xl" },
  };
  const size = sizes[member.tier];

  return (
    <motion.div
      className="group relative cursor-pointer overflow-hidden rounded-2xl border border-border bg-surface p-6 text-center transition-all hover:border-border-hover"
      whileHover={{ scale: 1.03, y: -4 }}
      onClick={onClick}
      style={{
        boxShadow: "none",
      }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLElement).style.boxShadow = `0 0 30px ${color}20`;
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLElement).style.boxShadow = "none";
      }}
    >
      {/* Avatar */}
      <div className="mb-4 flex justify-center">
        <div
          className={`${size.avatar} flex items-center justify-center rounded-full grayscale transition-all duration-300 group-hover:grayscale-0`}
          style={{
            background: `linear-gradient(135deg, ${color}30, ${color}10)`,
            border: `2px solid ${color}40`,
          }}
        >
          <span className={size.text}>{member.name[0]}</span>
        </div>
      </div>

      {/* Info */}
      <h3 className="font-heading text-base font-semibold text-text-primary">
        {member.name}
      </h3>
      <p className="mt-1 text-sm font-medium" style={{ color }}>
        {member.role}
      </p>
      <p className="mt-0.5 text-xs text-text-muted">
        {member.year} • {member.branch}
      </p>

      {/* Socials */}
      <div className="mt-4 flex justify-center gap-2">
        {member.social.linkedin && (
          <a
            href={member.social.linkedin}
            onClick={(e) => e.stopPropagation()}
            className="flex h-8 w-8 items-center justify-center rounded-lg border border-border text-text-muted hover:text-[#0A66C2]"
          >
            <Linkedin className="h-3.5 w-3.5" />
          </a>
        )}
        {member.social.github && (
          <a
            href={member.social.github}
            onClick={(e) => e.stopPropagation()}
            className="flex h-8 w-8 items-center justify-center rounded-lg border border-border text-text-muted hover:text-text-primary"
          >
            <Github className="h-3.5 w-3.5" />
          </a>
        )}
        {member.social.twitter && (
          <a
            href={member.social.twitter}
            onClick={(e) => e.stopPropagation()}
            className="flex h-8 w-8 items-center justify-center rounded-lg border border-border text-text-muted hover:text-[#1DA1F2]"
          >
            <Twitter className="h-3.5 w-3.5" />
          </a>
        )}
      </div>
    </motion.div>
  );
}
