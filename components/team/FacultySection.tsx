"use client";

import { motion } from "framer-motion";
import Reveal from "@/components/shared/Reveal";
import { type FacultyMentor } from "@/lib/data";

interface FacultySectionProps {
  mentors: FacultyMentor[];
}

export default function FacultySection({ mentors }: FacultySectionProps) {
  return (
    <section className="mb-20">
      <Reveal variant="fadeUp">
        <h3 className="mb-10 text-center text-sm font-medium uppercase tracking-[0.2em] text-text-muted">
          Faculty Mentors
        </h3>
      </Reveal>

      <div className="flex flex-wrap justify-center gap-6 md:gap-8">
        {mentors.map((mentor, i) => (
          <Reveal key={mentor.name} variant="fadeUp" delay={i * 0.1}>
            <motion.div
              className="group relative w-[260px] overflow-hidden rounded-2xl border border-[#FF9900]/20 bg-surface/80 p-6 text-center backdrop-blur-sm transition-all hover:border-[#FF9900]/40"
              whileHover={{ y: -4 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
            >
              {/* Accent top line */}
              <div className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-transparent via-[#FF9900]/60 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />

              {/* Avatar circle with initials */}
              <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full border-2 border-[#FF9900]/30 bg-gradient-to-br from-[#FF9900]/15 to-[#FF9900]/5 text-2xl font-bold text-[#FF9900]/80 transition-all group-hover:border-[#FF9900]/50 group-hover:text-[#FF9900]">
                {mentor.initials}
              </div>

              {/* Info */}
              <h4 className="font-heading text-base font-semibold text-text-primary">
                {mentor.name}
              </h4>
              <p className="mt-1 text-sm font-medium text-[#FF9900]/80">
                {mentor.designation}
              </p>
              <p className="mt-0.5 text-xs text-text-muted">
                {mentor.department}
              </p>
            </motion.div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
