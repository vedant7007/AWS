"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  MapPin,
  Mail,
  Linkedin,
  Twitter,
  Instagram,
  Github,
  Send,
  CheckCircle,
  ExternalLink,
} from "lucide-react";
import { contactSubjects } from "@/lib/data";
import SectionHeader from "@/components/shared/SectionHeader";
import Reveal from "@/components/shared/Reveal";
import TiltCard3D from "@/components/effects/TiltCard3D";
import Spotlight from "@/components/effects/Spotlight";

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setForm({ name: "", email: "", subject: "", message: "" });
    setTimeout(() => setSubmitted(false), 3000);
  };

  const inputClass =
    "input-focus w-full rounded-xl border border-border bg-background px-4 py-3.5 text-sm text-text-primary placeholder:text-text-muted/60 transition-all";

  return (
    <div className="min-h-screen pt-24">
      <div className="mx-auto max-w-[1200px] px-6 py-16">
        <SectionHeader
          label="Contact"
          title="Get in Touch"
          subtitle="Have a question or want to collaborate? We'd love to hear from you."
        />

        <Spotlight intensity={0.1} size={800}>
          <div className="grid gap-8 lg:grid-cols-5">
            {/* Form */}
            <Reveal variant="fadeUp" className="lg:col-span-3">
              <TiltCard3D maxTilt={4} glareOpacity={0.06}>
                <div className="rounded-2xl border border-border bg-elevated p-8">
                  <h3 className="mb-1 font-heading text-lg font-semibold text-text-primary">Send us a message</h3>
                  <p className="mb-6 text-sm text-text-muted">Fill out the form below and we&apos;ll get back to you shortly.</p>

                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid gap-4 sm:grid-cols-2">
                      <input type="text" placeholder="Your Name" required value={form.name}
                        onChange={(e) => setForm({ ...form, name: e.target.value })} className={inputClass} />
                      <input type="email" placeholder="Email Address" required value={form.email}
                        onChange={(e) => setForm({ ...form, email: e.target.value })} className={inputClass} />
                    </div>
                    <select required value={form.subject}
                      onChange={(e) => setForm({ ...form, subject: e.target.value })} className={inputClass}>
                      <option value="">Select Subject</option>
                      {contactSubjects.map((s) => (<option key={s} value={s}>{s}</option>))}
                    </select>
                    <textarea placeholder="Your Message" required rows={5} value={form.message}
                      onChange={(e) => setForm({ ...form, message: e.target.value })} className={`${inputClass} resize-none`} />
                    <motion.button type="submit"
                      className="shimmer-btn glow-ring flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-primary to-primary-hover py-3.5 font-bold text-text-on-primary shadow-lg shadow-primary/20"
                      whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.99 }}>
                      <Send className="h-4 w-4" />Send Message
                    </motion.button>
                  </form>

                  {submitted && (
                    <motion.div className="mt-4 flex items-center gap-2 rounded-xl bg-accent-green/10 p-4 text-sm text-accent-green"
                      initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
                      <CheckCircle className="h-4 w-4 shrink-0" />
                      Message sent successfully! We&apos;ll get back to you soon.
                    </motion.div>
                  )}
                </div>
              </TiltCard3D>
            </Reveal>

            {/* Info */}
            <Reveal variant="fadeUp" delay={0.1} className="lg:col-span-2">
              <div className="space-y-4">
                {[
                  { icon: MapPin, color: "var(--primary)", label: "Location", value: "VJIT, Aziz Nagar, Hyderabad, Telangana 500075" },
                  { icon: Mail, color: "var(--accent-blue)", label: "Email", value: "awscloudclub.vjit@gmail.com", isLink: true },
                ].map(({ icon: Icon, color, label, value, isLink }) => (
                  <TiltCard3D key={label} maxTilt={10} glareOpacity={0.08}>
                    <div className="rounded-2xl border border-border bg-elevated p-5">
                      <div className="flex items-start gap-4">
                        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl shadow-lg"
                          style={{ backgroundColor: `${color}15`, boxShadow: `0 4px 14px ${color}15` }}>
                          <Icon className="h-5 w-5" style={{ color }} />
                        </div>
                        <div>
                          <h4 className="text-sm font-semibold text-text-primary">{label}</h4>
                          {isLink ? (
                            <a href={`mailto:${value}`} className="mt-0.5 flex items-center gap-1 text-sm text-text-secondary transition-colors hover:text-primary">
                              {value}<ExternalLink className="h-3 w-3" />
                            </a>
                          ) : (
                            <p className="mt-0.5 text-sm leading-relaxed text-text-secondary">{value}</p>
                          )}
                        </div>
                      </div>
                    </div>
                  </TiltCard3D>
                ))}

                <TiltCard3D maxTilt={10} glareOpacity={0.08}>
                  <div className="rounded-2xl border border-border bg-elevated p-5">
                    <h4 className="mb-4 text-sm font-semibold text-text-primary">Follow Us</h4>
                    <div className="grid grid-cols-4 gap-2">
                      {[
                        { icon: Linkedin, label: "LinkedIn", color: "#0A66C2" },
                        { icon: Twitter, label: "Twitter", color: "#1DA1F2" },
                        { icon: Instagram, label: "Instagram", color: "#E4405F" },
                        { icon: Github, label: "GitHub", color: "var(--text-primary)" },
                      ].map(({ icon: Icon, label }) => (
                        <a key={label} href="#" aria-label={label}
                          className="hover-lift flex flex-col items-center gap-1.5 rounded-xl border border-border bg-background p-3 text-text-muted transition-all duration-200 hover:border-primary/30 hover:text-primary">
                          <Icon className="h-5 w-5" />
                          <span className="text-[10px] font-medium">{label}</span>
                        </a>
                      ))}
                    </div>
                  </div>
                </TiltCard3D>

                <div className="overflow-hidden rounded-2xl border border-border bg-gradient-to-br from-surface to-elevated">
                  <div className="flex h-40 items-center justify-center">
                    <div className="text-center">
                      <MapPin className="mx-auto mb-2 h-6 w-6 text-primary/30 animate-float" />
                      <p className="text-xs font-medium text-text-muted">VJIT Campus, Hyderabad</p>
                    </div>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </Spotlight>
      </div>
    </div>
  );
}
