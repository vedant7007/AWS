"use client";

import { motion } from "framer-motion";
import { aboutCards, timelineMilestones } from "@/lib/data";
import { staggerContainer, fadeUp } from "@/lib/animations";
import SectionHeader from "@/components/shared/SectionHeader";
import TiltCard3D from "@/components/effects/TiltCard3D";
import Spotlight from "@/components/effects/Spotlight";
import Reveal from "@/components/shared/Reveal";

const cardColors = ["#FF9900", "#4DA6FF", "#2DD4BF", "#A78BFA"];

export default function AboutSection() {
  return (
    <section className="relative py-24 md:py-32">
      <div className="mx-auto max-w-[1200px] px-6">
        <SectionHeader
          number="01"
          label="About Us"
          title="Empowering VJIT's Next-Gen Cloud Builders"
          subtitle="We're a student-led community passionate about cloud computing, backed by Amazon Web Services. From workshops to hackathons, we build real skills."
        />

        {/* 4-Card Grid with 3D tilt and spotlight */}
        <Spotlight intensity={0.12} size={800}>
          <motion.div
            className="grid gap-5 sm:grid-cols-2"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
          >
            {aboutCards.map((card, i) => (
              <motion.div key={card.title} variants={fadeUp}>
                <TiltCard3D maxTilt={10} glareOpacity={0.1}>
                  <div className="card-3d relative overflow-hidden rounded-2xl border border-border bg-elevated p-7">
                    {/* Large faded icon in background */}
                    <div
                      className="pointer-events-none absolute -right-4 -top-4 text-7xl opacity-[0.04]"
                    >
                      {card.icon}
                    </div>

                    <div className="relative z-10 flex items-start gap-4">
                      <div
                        className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl text-xl shadow-lg"
                        style={{
                          backgroundColor: `${cardColors[i]}15`,
                          boxShadow: `0 4px 14px ${cardColors[i]}20`,
                        }}
                      >
                        {card.icon}
                      </div>
                      <div>
                        <h3 className="mb-1.5 text-lg font-semibold text-text-primary">
                          {card.title}
                        </h3>
                        <p className="text-sm leading-relaxed text-text-secondary">
                          {card.description}
                        </p>
                      </div>
                    </div>

                    {/* Bottom color accent */}
                    <div
                      className="mt-5 h-0.5 w-12 rounded-full"
                      style={{ backgroundColor: `${cardColors[i]}50` }}
                    />
                  </div>
                </TiltCard3D>
              </motion.div>
            ))}
          </motion.div>
        </Spotlight>

        {/* Timeline */}
        <Reveal variant="fadeUp" delay={0.3}>
          <div className="mt-20">
            <h3 className="mb-10 text-center text-xs font-bold uppercase tracking-[0.15em] text-text-muted">
              <span className="inline-flex items-center gap-2">
                <span className="h-px w-6 bg-gradient-to-r from-transparent to-border" />
                Our Journey
                <span className="h-px w-6 bg-gradient-to-l from-transparent to-border" />
              </span>
            </h3>
            <div className="relative overflow-x-auto pb-4">
              <div className="absolute left-0 right-0 top-[8px] h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
              <div className="flex min-w-max items-start gap-0">
                {timelineMilestones.map((milestone, i) => {
                  const isLast = i === timelineMilestones.length - 1;
                  return (
                    <div key={`${milestone.year}-${milestone.label}`} className="flex items-start">
                      <div className="group flex flex-col items-center">
                        <div
                          className={`relative z-10 flex h-4 w-4 items-center justify-center rounded-full border-2 transition-all duration-300 ${
                            isLast
                              ? "border-primary bg-primary shadow-lg shadow-primary/40"
                              : "border-border bg-elevated group-hover:border-primary/50 group-hover:shadow-sm group-hover:shadow-primary/20"
                          }`}
                        >
                          {isLast && (
                            <div className="h-1.5 w-1.5 rounded-full bg-text-on-primary" />
                          )}
                        </div>
                        <div className="mt-4 text-center">
                          <p className="font-mono text-[11px] font-bold text-primary">
                            {milestone.year}
                          </p>
                          <p className="mt-0.5 max-w-[90px] text-[11px] leading-tight text-text-muted">
                            {milestone.label}
                          </p>
                        </div>
                      </div>
                      {!isLast && (
                        <div className="mx-3 mt-[7px] h-px w-14 bg-border/50 md:w-20" />
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
