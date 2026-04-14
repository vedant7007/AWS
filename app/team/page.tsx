"use client";

import { teamData, facultyMentors } from "@/lib/data";
import SectionHeader from "@/components/shared/SectionHeader";
import Reveal from "@/components/shared/Reveal";
import MagneticButton from "@/components/shared/MagneticButton";
import FacultySection from "@/components/team/FacultySection";
import TeamExpandSection from "@/components/team/TeamExpandSection";
import InteractiveIdCard from "@/components/team/InteractiveIdCard";
import { Lock } from "lucide-react";
import { motion } from "framer-motion";

const CAPTAIN_AVATAR =
  "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=600&fit=crop&crop=face";

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
  const captain = teamData.captain;

  return (
    <div className="min-h-screen pt-24">
      <div className="mx-auto max-w-[1200px] px-6 py-16">
        <SectionHeader
          label="Our Team"
          title="Meet the Team"
          subtitle="The builders behind AWS Cloud Club VJIT"
        />

        {/* ---- Faculty Mentors ---- */}
        <FacultySection mentors={facultyMentors} />

        {/* ---- Cloud Captain — Draggable ID Card ---- */}
        <section className="mb-20">
          <Reveal variant="fadeUp">
            <h3 className="mb-4 text-center text-sm font-medium uppercase tracking-[0.2em] text-text-muted">
              Cloud Captain
            </h3>
          </Reveal>

          <Reveal variant="scaleIn">
            <InteractiveIdCard
              name={captain.name}
              role={captain.role}
              tagline={captain.tagline}
              avatarUrl={CAPTAIN_AVATAR}
              socials={captain.socials}
            />
          </Reveal>
        </section>

        {/* ---- Team Leads + Expandable Members ---- */}
        <TeamExpandSection leads={teamData.leads} />

        {/* ---- Recruitment Banner ---- */}
        <RecruitmentBanner />
      </div>
    </div>
  );
}
