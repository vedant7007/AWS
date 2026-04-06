"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Star, Quote } from "lucide-react";
import { testimonials } from "@/lib/data";
import SectionHeader from "@/components/shared/SectionHeader";
import TiltCard3D from "@/components/effects/TiltCard3D";

const avatarColors = ["#FF9900", "#4DA6FF", "#2DD4BF", "#A78BFA", "#F472B6"];

export default function TestimonialsSection() {
  const [current, setCurrent] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const next = useCallback(() => {
    setCurrent((prev) => (prev + 1) % testimonials.length);
  }, []);

  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(next, 5000);
    return () => clearInterval(timer);
  }, [isPaused, next]);

  const getVisibleTestimonials = () => {
    const items = [];
    for (let i = 0; i < 3; i++) {
      items.push(testimonials[(current + i) % testimonials.length]);
    }
    return items;
  };

  return (
    <section className="relative py-24 md:py-32">
      <div className="mx-auto max-w-[1200px] px-6">
        <SectionHeader
          number="04"
          label="Testimonials"
          title="What Our Members Say"
        />

        <div
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          {/* Desktop: 3 cards with 3D tilt */}
          <div className="hidden gap-5 md:grid md:grid-cols-3">
            <AnimatePresence mode="popLayout">
              {getVisibleTestimonials().map((t, i) => (
                <motion.div
                  key={`${t.name}-${current}-${i}`}
                  initial={{ opacity: 0, y: 30, rotateX: 15 }}
                  animate={{ opacity: 1, y: 0, rotateX: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.5, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
                >
                  <TiltCard3D maxTilt={8} glareOpacity={0.08}>
                    <div className="glow-ring relative overflow-hidden rounded-2xl border border-border bg-elevated p-7">
                      {/* Quote icon */}
                      <div className="mb-4 flex items-center justify-between">
                        <div className="flex gap-0.5">
                          {[...Array(5)].map((_, j) => (
                            <Star key={j} className="h-3.5 w-3.5 fill-accent-yellow text-accent-yellow" />
                          ))}
                        </div>
                        <Quote className="h-5 w-5 text-primary/15" />
                      </div>

                      <p className="mb-6 text-sm leading-relaxed text-text-secondary">
                        &ldquo;{t.quote}&rdquo;
                      </p>

                      <div className="flex items-center gap-3">
                        <div
                          className="flex h-11 w-11 items-center justify-center rounded-xl text-sm font-bold text-white shadow-lg"
                          style={{
                            background: `linear-gradient(135deg, ${avatarColors[(current + i) % avatarColors.length]}, ${avatarColors[(current + i + 1) % avatarColors.length]})`,
                            boxShadow: `0 4px 12px ${avatarColors[(current + i) % avatarColors.length]}30`,
                          }}
                        >
                          {t.name[0]}
                        </div>
                        <div>
                          <p className="text-sm font-semibold text-text-primary">{t.name}</p>
                          <p className="text-xs text-text-muted">{t.role}</p>
                        </div>
                      </div>
                    </div>
                  </TiltCard3D>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {/* Mobile: 1 card */}
          <div className="md:hidden">
            <AnimatePresence mode="wait">
              <motion.div
                key={current}
                initial={{ opacity: 0, x: 60 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -60 }}
                transition={{ duration: 0.4 }}
                className="rounded-2xl border border-border bg-elevated p-7"
              >
                <div className="mb-4 flex items-center justify-between">
                  <div className="flex gap-0.5">
                    {[...Array(5)].map((_, j) => (
                      <Star key={j} className="h-3.5 w-3.5 fill-accent-yellow text-accent-yellow" />
                    ))}
                  </div>
                  <Quote className="h-5 w-5 text-primary/15" />
                </div>
                <p className="mb-6 text-sm leading-relaxed text-text-secondary">
                  &ldquo;{testimonials[current].quote}&rdquo;
                </p>
                <div className="flex items-center gap-3">
                  <div
                    className="flex h-11 w-11 items-center justify-center rounded-xl text-sm font-bold text-white"
                    style={{
                      background: `linear-gradient(135deg, ${avatarColors[current % avatarColors.length]}, ${avatarColors[(current + 1) % avatarColors.length]})`,
                    }}
                  >
                    {testimonials[current].name[0]}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-text-primary">{testimonials[current].name}</p>
                    <p className="text-xs text-text-muted">{testimonials[current].role}</p>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Dots */}
          <div className="mt-10 flex justify-center gap-2">
            {testimonials.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrent(i)}
                className={`h-2 rounded-full transition-all duration-300 ${
                  i === current ? "w-8 bg-primary shadow-md shadow-primary/30" : "w-2 bg-border hover:bg-text-muted"
                }`}
                aria-label={`Go to testimonial ${i + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
