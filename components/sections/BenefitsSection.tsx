"use client";

import { motion } from "framer-motion";
import { benefits } from "@/lib/data";
import { staggerContainer, fadeUp } from "@/lib/animations";
import SectionHeader from "@/components/shared/SectionHeader";
import TiltCard3D from "@/components/effects/TiltCard3D";
import Spotlight from "@/components/effects/Spotlight";

export default function BenefitsSection() {
  return (
    <section className="relative py-24 md:py-32">
      <div className="dot-grid pointer-events-none absolute inset-0 opacity-15" />

      <div className="relative mx-auto max-w-[1200px] px-6">
        <SectionHeader
          number="02"
          label="Benefits"
          title="Why Join AWS Cloud Club?"
          subtitle="Everything you need to kickstart your cloud career"
        />

        <Spotlight intensity={0.1} size={700}>
          <motion.div
            className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
          >
            {benefits.map((benefit, i) => {
              const isLarge = i < 2;
              return (
                <motion.div
                  key={benefit.title}
                  variants={fadeUp}
                  className={isLarge ? "sm:col-span-2 lg:col-span-2" : ""}
                >
                  <TiltCard3D maxTilt={isLarge ? 6 : 10} glareOpacity={0.08}>
                    <div
                      className={`glow-ring relative overflow-hidden rounded-2xl border border-border bg-elevated transition-colors hover:border-border-hover ${isLarge ? "p-8" : "p-6"}`}
                    >
                      {/* Background accent glow */}
                      <div
                        className="pointer-events-none absolute -right-8 -top-8 h-32 w-32 rounded-full opacity-[0.06]"
                        style={{
                          background: `radial-gradient(circle, ${benefit.color}, transparent 70%)`,
                        }}
                      />

                      <div className={`relative z-10 flex ${isLarge ? "flex-row items-start gap-5" : "flex-col"}`}>
                        <div
                          className={`flex items-center justify-center rounded-xl shadow-lg ${isLarge ? "h-14 w-14 shrink-0 text-2xl" : "mb-4 h-12 w-12 text-xl"}`}
                          style={{
                            backgroundColor: `${benefit.color}12`,
                            boxShadow: `0 4px 14px ${benefit.color}15`,
                          }}
                        >
                          {benefit.icon}
                        </div>
                        <div className="flex-1">
                          <h3 className={`font-semibold text-text-primary ${isLarge ? "mb-2 text-lg" : "mb-1.5 text-base"}`}>
                            {benefit.title}
                          </h3>
                          <p className={`leading-relaxed text-text-secondary ${isLarge ? "text-sm" : "text-[13px]"}`}>
                            {benefit.description}
                          </p>
                        </div>
                      </div>

                      <div
                        className={`rounded-full transition-all ${isLarge ? "mt-5 h-1 w-16" : "mt-4 h-0.5 w-10"}`}
                        style={{ backgroundColor: `${benefit.color}35` }}
                      />
                    </div>
                  </TiltCard3D>
                </motion.div>
              );
            })}
          </motion.div>
        </Spotlight>
      </div>
    </section>
  );
}
