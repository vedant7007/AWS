"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { faqItems } from "@/lib/data";
import SectionHeader from "@/components/shared/SectionHeader";
import Reveal from "@/components/shared/Reveal";

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = (i: number) => {
    setOpenIndex(openIndex === i ? null : i);
  };

  return (
    <section className="relative py-24 md:py-32">
      <div className="mx-auto max-w-[800px] px-6">
        <SectionHeader
          number="06"
          label="FAQ"
          title="Frequently Asked Questions"
          subtitle="Got questions? We've got answers."
        />

        <div className="space-y-3">
          {faqItems.map((item, i) => {
            const isOpen = openIndex === i;
            return (
              <Reveal key={item.question} variant="fadeUp" delay={i * 0.05}>
                <div
                  className={`overflow-hidden rounded-xl border transition-colors duration-200 ${
                    isOpen
                      ? "border-primary/20 bg-primary-muted/30"
                      : "border-border bg-elevated hover:border-border-hover"
                  }`}
                >
                  <button
                    onClick={() => toggle(i)}
                    className="flex w-full items-center gap-4 px-6 py-5 text-left"
                    aria-expanded={isOpen}
                  >
                    {/* Number */}
                    <span
                      className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-lg font-mono text-xs font-bold transition-colors ${
                        isOpen
                          ? "bg-primary text-text-on-primary"
                          : "bg-surface text-text-muted"
                      }`}
                    >
                      {String(i + 1).padStart(2, "0")}
                    </span>

                    <span
                      className={`flex-1 text-sm font-medium transition-colors ${
                        isOpen ? "text-primary" : "text-text-primary"
                      }`}
                    >
                      {item.question}
                    </span>

                    <motion.div
                      animate={{ rotate: isOpen ? 180 : 0 }}
                      transition={{ duration: 0.25, ease: "easeInOut" }}
                      className="shrink-0"
                    >
                      <ChevronDown
                        className={`h-4 w-4 transition-colors ${
                          isOpen ? "text-primary" : "text-text-muted"
                        }`}
                      />
                    </motion.div>
                  </button>
                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
                      >
                        <div className="px-6 pb-5 pl-[4.25rem]">
                          <p className="text-sm leading-relaxed text-text-secondary">
                            {item.answer}
                          </p>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
