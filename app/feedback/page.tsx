"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle } from "lucide-react";
import { feedbackEmojis, feedbackCategories } from "@/lib/data";
import SectionHeader from "@/components/shared/SectionHeader";
import Reveal from "@/components/shared/Reveal";

export default function FeedbackPage() {
  const [rating, setRating] = useState<number | null>(null);
  const [categories, setCategories] = useState<string[]>([]);
  const [comment, setComment] = useState("");
  const [recommend, setRecommend] = useState<boolean | null>(null);
  const [anonymous, setAnonymous] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const toggleCategory = (cat: string) => {
    setCategories((prev) =>
      prev.includes(cat) ? prev.filter((c) => c !== cat) : [...prev, cat]
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Feedback:", { rating, categories, comment, recommend, anonymous });
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen pt-24">
      <div className="mx-auto max-w-[640px] px-6 py-16">
        <SectionHeader
          label="Feedback"
          title="Share Your Experience"
          subtitle="Help us improve by sharing your honest feedback"
        />

        <AnimatePresence mode="wait">
          {submitted ? (
            <motion.div
              key="thanks"
              className="rounded-2xl border border-accent-green/20 bg-elevated p-12 text-center"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
            >
              <motion.div
                className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-accent-green/10"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", delay: 0.2 }}
              >
                <CheckCircle className="h-8 w-8 text-accent-green" />
              </motion.div>
              <h3 className="mb-2 font-heading text-2xl font-bold text-text-primary">
                Thank you for your feedback!
              </h3>
              <p className="text-text-secondary">
                Your input helps us make the club even better.
              </p>
              <button
                onClick={() => {
                  setSubmitted(false);
                  setRating(null);
                  setCategories([]);
                  setComment("");
                  setRecommend(null);
                  setAnonymous(false);
                }}
                className="mt-8 rounded-xl border border-border bg-elevated px-6 py-2.5 text-sm font-semibold text-text-primary transition-colors hover:border-primary/30 hover:text-primary"
              >
                Submit Another
              </button>
            </motion.div>
          ) : (
            <motion.form
              key="form"
              onSubmit={handleSubmit}
              className="space-y-8 rounded-2xl border border-border bg-elevated p-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              {/* Emoji Rating */}
              <Reveal variant="fadeUp">
                <div>
                  <h3 className="mb-2 text-sm font-semibold text-text-primary">
                    How was your experience?
                  </h3>
                  <p className="mb-5 text-xs text-text-muted">
                    Select the emoji that best describes your experience
                  </p>
                  <div className="flex justify-center gap-3">
                    {feedbackEmojis.map((item) => (
                      <motion.button
                        key={item.value}
                        type="button"
                        onClick={() => setRating(item.value)}
                        className={`flex flex-col items-center gap-2 rounded-2xl border px-4 py-4 transition-all ${
                          rating === item.value
                            ? "border-primary bg-primary/10 shadow-md shadow-primary/10"
                            : "border-border hover:border-border-hover hover:bg-surface"
                        }`}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <span className="text-3xl">{item.emoji}</span>
                        <span className={`text-[11px] font-medium ${
                          rating === item.value ? "text-primary" : "text-text-muted"
                        }`}>
                          {item.label}
                        </span>
                      </motion.button>
                    ))}
                  </div>
                </div>
              </Reveal>

              {/* Categories */}
              <Reveal variant="fadeUp" delay={0.1}>
                <div>
                  <h3 className="mb-2 text-sm font-semibold text-text-primary">
                    What did you enjoy most?
                  </h3>
                  <p className="mb-4 text-xs text-text-muted">
                    Select all that apply
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {feedbackCategories.map((cat) => (
                      <button
                        key={cat}
                        type="button"
                        onClick={() => toggleCategory(cat)}
                        className={`rounded-full border px-4 py-2 text-sm font-medium transition-all ${
                          categories.includes(cat)
                            ? "border-primary bg-primary/10 text-primary"
                            : "border-border text-text-secondary hover:border-border-hover hover:text-text-primary"
                        }`}
                      >
                        {cat}
                      </button>
                    ))}
                  </div>
                </div>
              </Reveal>

              {/* Comment */}
              <Reveal variant="fadeUp" delay={0.2}>
                <div>
                  <h3 className="mb-2 text-sm font-semibold text-text-primary">
                    Suggestions or Comments
                  </h3>
                  <textarea
                    rows={4}
                    placeholder="Share your thoughts..."
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    className="input-focus w-full resize-none rounded-xl border border-border bg-background px-4 py-3 text-sm text-text-primary placeholder:text-text-muted/60"
                  />
                </div>
              </Reveal>

              {/* Recommend */}
              <Reveal variant="fadeUp" delay={0.3}>
                <div>
                  <h3 className="mb-4 text-sm font-semibold text-text-primary">
                    Would you recommend us?
                  </h3>
                  <div className="flex gap-3">
                    {[
                      { val: true, label: "Yes, definitely!", color: "accent-green" },
                      { val: false, label: "Not yet", color: "accent-red" },
                    ].map(({ val, label, color }) => (
                      <button
                        key={String(val)}
                        type="button"
                        onClick={() => setRecommend(val)}
                        className={`flex-1 rounded-xl border py-3 text-sm font-medium transition-all ${
                          recommend === val
                            ? val
                              ? "border-accent-green/30 bg-accent-green/10 text-accent-green"
                              : "border-accent-red/30 bg-accent-red/10 text-accent-red"
                            : "border-border text-text-secondary hover:border-border-hover"
                        }`}
                      >
                        {label}
                      </button>
                    ))}
                  </div>
                </div>
              </Reveal>

              {/* Anonymous */}
              <Reveal variant="fadeUp" delay={0.4}>
                <label className="flex cursor-pointer items-center gap-3 rounded-xl border border-border bg-background p-4 transition-colors hover:border-border-hover">
                  <input
                    type="checkbox"
                    checked={anonymous}
                    onChange={(e) => setAnonymous(e.target.checked)}
                    className="h-4 w-4 rounded border-border accent-primary"
                  />
                  <div>
                    <span className="text-sm font-medium text-text-primary">
                      Submit anonymously
                    </span>
                    <p className="text-xs text-text-muted">
                      Your identity won&apos;t be linked to this feedback
                    </p>
                  </div>
                </label>
              </Reveal>

              {/* Submit */}
              <motion.button
                type="submit"
                className="shimmer-btn w-full rounded-xl bg-gradient-to-r from-primary to-primary-hover py-4 font-bold text-text-on-primary shadow-md shadow-primary/20"
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
              >
                Submit Feedback
              </motion.button>
            </motion.form>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
