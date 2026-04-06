"use client";

import dynamic from "next/dynamic";
import { teamData } from "@/lib/data";
import SectionHeader from "@/components/shared/SectionHeader";
import Reveal from "@/components/shared/Reveal";
import MagneticButton from "@/components/shared/MagneticButton";
import { Lock } from "lucide-react";
import { motion } from "framer-motion";

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

const GLOW_COLORS = [
  "rgba(255, 153, 0, 0.35)",
  "rgba(77, 166, 255, 0.35)",
  "rgba(45, 212, 191, 0.35)",
  "rgba(167, 139, 250, 0.35)",
  "rgba(244, 114, 182, 0.35)",
  "rgba(251, 191, 36, 0.35)",
];

const INNER_GRADIENTS = [
  "linear-gradient(145deg, #1a1100ee 0%, #FF990018 100%)",
  "linear-gradient(145deg, #000d1dee 0%, #4DA6FF18 100%)",
  "linear-gradient(145deg, #001210ee 0%, #2DD4BF18 100%)",
  "linear-gradient(145deg, #110d20ee 0%, #A78BFA18 100%)",
  "linear-gradient(145deg, #1a0a15ee 0%, #F472B618 100%)",
  "linear-gradient(145deg, #1a1400ee 0%, #FBBF2418 100%)",
];

function RecruitmentBanner() {
  const { recruitment } = teamData;

  if (recruitment.isOpen) {
    return (
      <Reveal variant="fadeUp">
        <div className="mt-16 overflow-hidden rounded-2xl border-2 border-primary/30 bg-gradient-to-br from-primary/10 to-primary-hover/5 p-8 text-center md:p-12">
          <motion.span
            className="mb-3 inline-block text-4xl"
            animate={{ scale: [1, 1.15, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            🚀
          </motion.span>
          <h3 className="mb-2 font-heading text-2xl font-bold text-text-primary">
            Recruitments Are OPEN!
          </h3>
          <p className="mx-auto mb-6 max-w-lg text-sm text-text-secondary">
            We&apos;re looking for passionate students to join our Tech, Events,
            Production, Design, and Marketing teams.
          </p>
          <MagneticButton
            as="a"
            href={recruitment.ctaLink}
            className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-primary to-primary-hover px-8 py-3 font-bold text-text-on-primary"
          >
            Apply Now →
          </MagneticButton>
        </div>
      </Reveal>
    );
  }

  return (
    <Reveal variant="fadeUp">
      <div className="mt-16 rounded-2xl border border-dashed border-border bg-surface/50 p-8 text-center md:p-12">
        <motion.div
          className="mb-3 inline-flex h-12 w-12 items-center justify-center rounded-full bg-primary/10"
          animate={{ scale: [1, 1.08, 1] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        >
          <Lock className="h-5 w-5 text-primary" />
        </motion.div>
        <h3 className="mb-2 font-heading text-xl font-bold text-text-primary">
          Recruitments Currently Closed
        </h3>
        <p className="mx-auto mb-6 max-w-lg text-sm leading-relaxed text-text-secondary">
          {recruitment.message}
        </p>
        <div className="flex flex-col items-center justify-center gap-3 sm:flex-row">
          <MagneticButton
            as="a"
            href={recruitment.ctaLink}
            className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-primary to-primary-hover px-6 py-2.5 text-sm font-bold text-text-on-primary"
          >
            {recruitment.ctaText}
          </MagneticButton>
          <MagneticButton
            as="a"
            href="#"
            className="inline-flex items-center gap-2 rounded-xl border border-border px-6 py-2.5 text-sm font-medium text-text-secondary transition-colors hover:border-primary/30 hover:text-primary"
          >
            Follow on LinkedIn
          </MagneticButton>
        </div>
      </div>
    </Reveal>
  );
}

export default function TeamPage() {
  const allMembers = [
    {
      name: teamData.captain.name,
      title: teamData.captain.role,
      handle: teamData.captain.name.split(" ")[0].toLowerCase(),
      color: teamData.captain.color,
      linkedin: teamData.captain.socials.linkedin,
    },
    ...teamData.leads.map((lead) => ({
      name: lead.name,
      title: lead.role,
      handle: lead.name.split(" ")[0].toLowerCase(),
      color: lead.color,
      linkedin: lead.socials.linkedin,
    })),
  ];

  return (
    <div className="min-h-screen pt-24">
      <div className="mx-auto max-w-[1200px] px-6 py-16">
        <SectionHeader
          label="Our Team"
          title="Meet the Team"
          subtitle="The builders behind AWS Cloud Club VJIT"
        />

        {/* Captain - Featured Large Card */}
        <Reveal variant="fadeUp">
          <div className="mb-16 flex justify-center">
            <ProfileCard
              name={allMembers[0].name}
              title={allMembers[0].title}
              handle={allMembers[0].handle}
              status="Club Captain"
              contactText="LinkedIn"
              avatarUrl={PLACEHOLDER_AVATARS[0]}
              showUserInfo={true}
              enableTilt={true}
              onContactClick={() =>
                window.open(allMembers[0].linkedin, "_blank")
              }
              behindGlowColor={GLOW_COLORS[0]}
              behindGlowEnabled
              innerGradient={INNER_GRADIENTS[0]}
            />
          </div>
        </Reveal>

        {/* Team Leads Label */}
        <Reveal variant="fadeUp">
          <h3 className="mb-8 text-center text-sm font-medium uppercase tracking-wider text-text-muted">
            Team Leads
          </h3>
        </Reveal>

        {/* Leads - Grid of Cards */}
        <div className="mb-6 grid place-items-center gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {allMembers.slice(1).map((member, i) => (
            <Reveal key={member.name} variant="fadeUp" delay={i * 0.1}>
              <ProfileCard
                name={member.name}
                title={member.title}
                handle={member.handle}
                status="Team Lead"
                contactText="LinkedIn"
                avatarUrl={PLACEHOLDER_AVATARS[(i + 1) % PLACEHOLDER_AVATARS.length]}
                showUserInfo={true}
                enableTilt={true}
                onContactClick={() =>
                  window.open(member.linkedin, "_blank")
                }
                behindGlowColor={GLOW_COLORS[(i + 1) % GLOW_COLORS.length]}
                behindGlowEnabled
                innerGradient={INNER_GRADIENTS[(i + 1) % INNER_GRADIENTS.length]}
              />
            </Reveal>
          ))}
        </div>

        <RecruitmentBanner />
      </div>
    </div>
  );
}
