"use client";

import { useState, useCallback, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import dynamic from "next/dynamic";
import { type TeamLead, type TeamSubMember } from "@/lib/data";
import Reveal from "@/components/shared/Reveal";
import { ChevronDown, ChevronUp, Users, X } from "lucide-react";

const ProfileCard = dynamic(() => import("@/components/ui/ProfileCard"), {
  ssr: false,
});

const PLACEHOLDER_AVATARS = [
  "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=600&fit=crop&crop=face",
  "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&h=600&fit=crop&crop=face",
  "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400&h=600&fit=crop&crop=face",
  "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=600&fit=crop&crop=face",
  "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=600&fit=crop&crop=face",
  "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&h=600&fit=crop&crop=face",
];

const LEAD_AVATARS = [
  "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=600&fit=crop&crop=face",
  "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&h=600&fit=crop&crop=face",
  "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400&h=600&fit=crop&crop=face",
  "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&h=600&fit=crop&crop=face",
  "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=600&fit=crop&crop=face",
];

const GLOW_COLORS: Record<string, string> = {
  tech: "rgba(77, 166, 255, 0.35)",
  events: "rgba(45, 212, 191, 0.35)",
  production: "rgba(167, 139, 250, 0.35)",
  design: "rgba(244, 114, 182, 0.35)",
  marketing: "rgba(251, 191, 36, 0.35)",
};

const INNER_GRADIENTS: Record<string, string> = {
  tech: "linear-gradient(145deg, #000d1dee 0%, #4DA6FF18 100%)",
  events: "linear-gradient(145deg, #001210ee 0%, #2DD4BF18 100%)",
  production: "linear-gradient(145deg, #110d20ee 0%, #A78BFA18 100%)",
  design: "linear-gradient(145deg, #1a0a15ee 0%, #F472B618 100%)",
  marketing: "linear-gradient(145deg, #1a1400ee 0%, #FBBF2418 100%)",
};

interface TeamExpandSectionProps {
  leads: TeamLead[];
}

export default function TeamExpandSection({ leads }: TeamExpandSectionProps) {
  const [expandedTeamId, setExpandedTeamId] = useState<string | null>(null);
  const expandRef = useRef<HTMLDivElement>(null);

  const toggleTeam = useCallback((id: string) => {
    setExpandedTeamId((prev) => (prev === id ? null : id));
  }, []);

  useEffect(() => {
    if (expandedTeamId && expandRef.current) {
      setTimeout(() => {
        expandRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 350);
    }
  }, [expandedTeamId]);

  // Split leads into rows: [0,1,2] and [3,4]
  const topRow = leads.slice(0, 3);
  const bottomRow = leads.slice(3);

  // Which row is the expanded lead in?
  const expandedLead = leads.find((l) => l.id === expandedTeamId);
  const expandedInTopRow = topRow.some((l) => l.id === expandedTeamId);
  const expandedInBottomRow = bottomRow.some((l) => l.id === expandedTeamId);

  return (
    <section>
      <Reveal variant="fadeUp">
        <h3 className="mb-10 text-center text-sm font-medium uppercase tracking-[0.2em] text-text-muted">
          Team Leads
        </h3>
      </Reveal>

      {/* Top row — 3 leads */}
      <div className="mb-8 grid grid-cols-1 place-items-center gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {topRow.map((lead, i) => (
          <LeadCard
            key={lead.id}
            lead={lead}
            index={i}
            avatarUrl={LEAD_AVATARS[i]}
            isExpanded={expandedTeamId === lead.id}
            onToggle={toggleTeam}
          />
        ))}
      </div>

      {/* Expanded area for top row leads */}
      <div ref={expandedInTopRow ? expandRef : undefined}>
        <AnimatePresence mode="wait">
          {expandedInTopRow && expandedLead && (
            <ExpandedTeamPanel
              key={expandedLead.id}
              lead={expandedLead}
              onClose={() => setExpandedTeamId(null)}
            />
          )}
        </AnimatePresence>
      </div>

      {/* Bottom row — 2 leads, centered */}
      <div className="mb-8 mx-auto grid max-w-[700px] grid-cols-1 place-items-center gap-8 sm:grid-cols-2">
        {bottomRow.map((lead, i) => (
          <LeadCard
            key={lead.id}
            lead={lead}
            index={i + 3}
            avatarUrl={LEAD_AVATARS[i + 3]}
            isExpanded={expandedTeamId === lead.id}
            onToggle={toggleTeam}
          />
        ))}
      </div>

      {/* Expanded area for bottom row leads */}
      <div ref={expandedInBottomRow ? expandRef : undefined}>
        <AnimatePresence mode="wait">
          {expandedInBottomRow && expandedLead && (
            <ExpandedTeamPanel
              key={expandedLead.id}
              lead={expandedLead}
              onClose={() => setExpandedTeamId(null)}
            />
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}

/* ---------- Expanded Team Panel — appears directly below the lead's row ---------- */

interface ExpandedTeamPanelProps {
  lead: TeamLead;
  onClose: () => void;
}

function ExpandedTeamPanel({ lead, onClose }: ExpandedTeamPanelProps) {
  if (lead.teamMembers.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0, height: 0 }}
        animate={{ opacity: 1, height: "auto" }}
        exit={{ opacity: 0, height: 0 }}
        className="mb-8 overflow-hidden"
      >
        <div className="rounded-2xl border border-dashed border-border py-10 text-center">
          <p className="text-sm text-text-muted">Team members coming soon!</p>
          <button onClick={onClose} className="mt-3 text-sm text-primary underline">
            Close
          </button>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      key={lead.id}
      initial={{ opacity: 0, height: 0, marginBottom: 0 }}
      animate={{ opacity: 1, height: "auto", marginBottom: 40 }}
      exit={{ opacity: 0, height: 0, marginBottom: 0 }}
      transition={{ duration: 0.45, ease: [0.25, 0.46, 0.45, 0.94] }}
      className="relative overflow-hidden rounded-3xl border border-border/50 bg-surface/30 backdrop-blur-sm"
    >
      {/* Team background glow */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background: `radial-gradient(ellipse at center top, ${lead.color}12 0%, transparent 60%)`,
        }}
      />

      {/* Close button */}
      <button
        onClick={onClose}
        className="absolute right-4 top-4 z-10 rounded-full border border-border p-2 text-text-muted transition-all hover:border-border-hover hover:text-text-primary"
      >
        <X className="h-4 w-4" />
      </button>

      <div className="relative px-6 py-10 md:px-10">
        {/* Team label with lead's color */}
        <motion.div
          className="mb-8 text-center"
          initial={{ opacity: 0, y: -15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15, duration: 0.4 }}
        >
          <h4 className="text-xl font-bold" style={{ color: lead.color }}>
            {lead.name}&apos;s Team
          </h4>
          <p className="mt-1 text-sm text-text-muted">{lead.tagline}</p>
        </motion.div>

        {/* Dealt member cards */}
        <div className="flex flex-wrap items-start justify-center gap-8 md:gap-10">
          {lead.teamMembers.map((member, i) => (
            <MemberCardDealt
              key={member.name}
              member={member}
              index={i}
              total={lead.teamMembers.length}
              lead={lead}
            />
          ))}
        </div>

        {/* Collapse */}
        <motion.div
          className="mt-10 flex justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 + lead.teamMembers.length * 0.08 }}
        >
          <button
            onClick={onClose}
            className="flex items-center gap-2 rounded-full border border-border px-6 py-2.5 text-sm text-text-secondary transition-all hover:border-border-hover hover:text-text-primary"
          >
            <ChevronUp className="h-4 w-4" />
            Collapse
          </button>
        </motion.div>
      </div>
    </motion.div>
  );
}

/* ---------- Lead Card ---------- */

interface LeadCardProps {
  lead: TeamLead;
  index: number;
  avatarUrl: string;
  isExpanded: boolean;
  onToggle: (id: string) => void;
}

function LeadCard({ lead, index, avatarUrl, isExpanded, onToggle }: LeadCardProps) {
  return (
    <Reveal variant="fadeUp" delay={index * 0.1}>
      <div className="relative">
        <ProfileCard
          name={lead.name}
          title={lead.role}
          handle={lead.name.split(" ")[0].toLowerCase()}
          status="Team Lead"
          contactText="LinkedIn"
          avatarUrl={avatarUrl}
          showUserInfo={true}
          enableTilt={true}
          onContactClick={() => window.open(lead.socials.linkedin, "_blank")}
          behindGlowColor={GLOW_COLORS[lead.id] || "rgba(125, 190, 255, 0.35)"}
          behindGlowEnabled
          innerGradient={INNER_GRADIENTS[lead.id]}
          iconUrl={lead.iconUrl}
          className="pc-card-wrapper--lead"
        />
        {/* View Team button */}
        {lead.teamMembers.length > 0 && (
          <motion.button
            onClick={() => onToggle(lead.id)}
            className="mx-auto mt-4 flex items-center gap-2 rounded-full border px-5 py-2 text-xs font-medium transition-all"
            style={{
              borderColor: isExpanded ? lead.color : "var(--border)",
              color: isExpanded ? lead.color : "var(--text-secondary)",
              background: isExpanded ? `${lead.color}10` : "transparent",
            }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Users className="h-3.5 w-3.5" />
            {isExpanded ? "Hide Team" : "View Team"}
            {isExpanded ? (
              <ChevronUp className="h-3.5 w-3.5" />
            ) : (
              <ChevronDown className="h-3.5 w-3.5" />
            )}
          </motion.button>
        )}
      </div>
    </Reveal>
  );
}

/* ---------- Member Card with Dealing Animation ---------- */

interface MemberCardDealtProps {
  member: TeamSubMember;
  index: number;
  total: number;
  lead: TeamLead;
}

function MemberCardDealt({ member, index, total, lead }: MemberCardDealtProps) {
  // Slight fan rotation for a "dealt from deck" feel
  const maxAngle = 6;
  const angle = total <= 1 ? 0 : -maxAngle + ((2 * maxAngle) / (total - 1)) * index;

  return (
    <motion.div
      initial={{
        opacity: 0,
        scale: 0.3,
        y: -80,
        rotate: -20 + Math.random() * 40,
      }}
      animate={{
        opacity: 1,
        scale: 1,
        y: 0,
        rotate: angle,
      }}
      exit={{
        opacity: 0,
        scale: 0.3,
        y: -80,
        rotate: 0,
      }}
      transition={{
        type: "spring",
        stiffness: 260,
        damping: 20,
        delay: index * 0.1,
      }}
      style={{ transformOrigin: "top center" }}
    >
      <ProfileCard
        name={member.name}
        title={member.subRole || "Team Member"}
        handle={member.name.split(" ")[0].toLowerCase()}
        status={lead.role}
        contactText="Profile"
        avatarUrl={PLACEHOLDER_AVATARS[index % PLACEHOLDER_AVATARS.length]}
        showUserInfo={false}
        enableTilt={true}
        onContactClick={
          member.social ? () => window.open(member.social, "_blank") : undefined
        }
        behindGlowColor={GLOW_COLORS[lead.id] || "rgba(125, 190, 255, 0.35)"}
        behindGlowEnabled
        innerGradient={INNER_GRADIENTS[lead.id]}
        iconUrl={lead.iconUrl}
        className="pc-card-wrapper--member"
      />
    </motion.div>
  );
}
