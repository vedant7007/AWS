"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, Linkedin, Github, Twitter } from "lucide-react";
/** Local interface — the old TeamMember type was removed from lib/data.ts.
 *  This component is unused but kept for reference. */
interface TeamMember {
  name: string;
  role: string;
  year: string;
  branch: string;
  bio: string;
  skills: string[];
  social: {
    linkedin?: string;
    github?: string;
    twitter?: string;
  };
}

interface TeamMemberModalProps {
  member: TeamMember | null;
  onClose: () => void;
}

const roleColors: Record<string, string> = {
  "Club Captain": "#FF9900",
  "Tech Lead": "#4DA6FF",
  "Events Lead": "#A78BFA",
  "Content Lead": "#2DD4BF",
  "Community Lead": "#F472B6",
};

export default function TeamMemberModal({ member, onClose }: TeamMemberModalProps) {
  return (
    <AnimatePresence>
      {member && (
        <motion.div
          className="fixed inset-0 z-[70] flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="absolute inset-0 bg-black/70 backdrop-blur-sm"
            onClick={onClose}
          />
          <motion.div
            className="relative z-10 w-full max-w-lg overflow-hidden rounded-2xl border border-border bg-surface p-8"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
          >
            <button
              onClick={onClose}
              className="absolute right-4 top-4 rounded-lg p-1 text-text-muted hover:text-text-primary"
            >
              <X className="h-5 w-5" />
            </button>

            <div className="text-center">
              {/* Avatar */}
              <div
                className="mx-auto mb-4 flex h-24 w-24 items-center justify-center rounded-full text-4xl"
                style={{
                  background: `linear-gradient(135deg, ${roleColors[member.role] || "#FF9900"}30, ${roleColors[member.role] || "#FF9900"}10)`,
                  border: `2px solid ${roleColors[member.role] || "#FF9900"}40`,
                }}
              >
                {member.name[0]}
              </div>

              <h3 className="font-heading text-xl font-bold text-text-primary">
                {member.name}
              </h3>
              <p
                className="mt-1 text-sm font-semibold"
                style={{ color: roleColors[member.role] || "#FF9900" }}
              >
                {member.role}
              </p>
              <p className="text-xs text-text-muted">
                {member.year} • {member.branch}
              </p>

              <p className="mt-4 text-sm leading-relaxed text-text-secondary">
                {member.bio}
              </p>

              {/* Skills */}
              <div className="mt-4 flex flex-wrap justify-center gap-2">
                {member.skills.map((skill) => (
                  <span
                    key={skill}
                    className="rounded-full border border-border bg-background px-3 py-1 text-xs text-text-secondary"
                  >
                    {skill}
                  </span>
                ))}
              </div>

              {/* Social */}
              <div className="mt-6 flex justify-center gap-3">
                {member.social.linkedin && (
                  <a
                    href={member.social.linkedin}
                    className="flex h-10 w-10 items-center justify-center rounded-xl border border-border text-text-muted hover:text-[#0A66C2]"
                  >
                    <Linkedin className="h-4 w-4" />
                  </a>
                )}
                {member.social.github && (
                  <a
                    href={member.social.github}
                    className="flex h-10 w-10 items-center justify-center rounded-xl border border-border text-text-muted hover:text-text-primary"
                  >
                    <Github className="h-4 w-4" />
                  </a>
                )}
                {member.social.twitter && (
                  <a
                    href={member.social.twitter}
                    className="flex h-10 w-10 items-center justify-center rounded-xl border border-border text-text-muted hover:text-[#1DA1F2]"
                  >
                    <Twitter className="h-4 w-4" />
                  </a>
                )}
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
