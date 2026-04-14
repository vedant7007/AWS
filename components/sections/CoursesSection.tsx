"use client";

import { motion } from "framer-motion";
import { awsCourses } from "@/lib/data";
import { staggerContainer, fadeUp } from "@/lib/animations";
import SectionHeader from "@/components/shared/SectionHeader";
import TiltCard3D from "@/components/effects/TiltCard3D";
import Spotlight from "@/components/effects/Spotlight";

export default function CoursesSection() {
  return (
    <section id="courses" className="relative py-24 md:py-32 bg-background/50">
      <div className="mx-auto max-w-[1200px] px-6">
        <SectionHeader
          number="02"
          label="AWS Training"
          title="Official AWS Courses"
          subtitle="Explore digital training curated by AWS experts. Learn at your own pace and build your cloud skills."
        />

        <Spotlight intensity={0.15} size={800}>
          <motion.div
            className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
          >
            {awsCourses.map((course) => (
              <motion.div key={course.title} variants={fadeUp}>
                <a 
                  href={course.url} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="block h-full"
                >
                  <TiltCard3D maxTilt={8} glareOpacity={0.15}>
                    <div className="card-3d relative flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-elevated p-8 transition-all hover:border-primary/50">
                      {/* Background Icon */}
                      <div className="pointer-events-none absolute -right-6 -top-6 text-8xl opacity-[0.03] transition-opacity group-hover:opacity-[0.08]">
                        {course.icon}
                      </div>

                      <div className="relative z-10 flex h-full flex-col">
                        <div
                          className="mb-6 flex h-14 w-14 shrink-0 items-center justify-center rounded-xl text-3xl shadow-lg"
                          style={{
                            backgroundColor: `${course.color}15`,
                            boxShadow: `0 4px 14px ${course.color}20`,
                          }}
                        >
                          {course.icon}
                        </div>
                        
                        <h3 className="mb-3 text-xl font-bold text-text-primary">
                          {course.title}
                        </h3>
                        
                        <p className="mb-6 text-sm leading-relaxed text-text-secondary flex-grow">
                          {course.description}
                        </p>
                        
                        <div className="mt-auto flex items-center gap-2 font-mono text-xs font-semibold uppercase tracking-wider text-primary group-hover:text-primary">
                          Explore Course
                          <svg className="h-4 w-4 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                          </svg>
                        </div>
                      </div>
                    </div>
                  </TiltCard3D>
                </a>
              </motion.div>
            ))}
          </motion.div>
        </Spotlight>
      </div>
    </section>
  );
}
