"use client";

import { useState } from "react";
import Link from "next/link";
import { Cloud, Linkedin, Twitter, Instagram, Github, Youtube, MessageCircle, ArrowRight } from "lucide-react";
import { footerLinks, socialLinks } from "@/lib/data";
import Reveal from "@/components/shared/Reveal";

type IconComponent = React.FC<{ className?: string }>;

const iconMap: Record<string, IconComponent> = {
  Linkedin,
  Twitter,
  Instagram,
  MessageCircle,
  Github,
  Youtube,
};

export default function Footer() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleNewsletter = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail("");
      setTimeout(() => setSubscribed(false), 3000);
    }
  };

  return (
    <footer className="relative border-t border-border bg-surface">
      {/* Top gradient accent line */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent" />

      <div className="mx-auto max-w-[1216px] px-8 pt-16 pb-8">
        {/* Newsletter Section */}
        <Reveal variant="fadeUp">
          <div className="mb-14 flex flex-col items-center gap-8 rounded-2xl border border-border bg-elevated p-8 text-center md:flex-row md:text-left">
            <div className="flex-1">
              <h3 className="mb-1 font-heading text-lg font-bold text-text-primary">
                Stay in the loop
              </h3>
              <p className="text-sm text-text-secondary">
                Get notified about upcoming events, workshops, and opportunities.
              </p>
            </div>
            <form onSubmit={handleNewsletter} className="flex w-full gap-2 md:w-auto">
              <input
                type="email"
                placeholder="your@email.com"
                value={email}
                suppressHydrationWarning
                onChange={(e) => setEmail(e.target.value)}
                className="input-focus w-full rounded-xl border border-border bg-background px-4 py-3 text-sm text-text-primary placeholder:text-text-muted md:w-64"
              />
              <button
                type="submit"
                suppressHydrationWarning
                className="shimmer-btn flex shrink-0 items-center gap-1 rounded-xl bg-gradient-to-r from-primary to-primary-hover px-5 py-3 text-sm font-bold text-text-on-primary"
              >
                {subscribed ? "Subscribed!" : "Subscribe"}
                {!subscribed && <ArrowRight className="h-3.5 w-3.5" />}
              </button>
            </form>
          </div>
        </Reveal>

        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <Reveal variant="fadeUp">
            <div>
              <div className="mb-4 flex items-center gap-2.5">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-primary-hover shadow-lg shadow-primary/20">
                  <Cloud className="h-5 w-5 text-text-on-primary" />
                </div>
                <div className="flex flex-col">
                  <span className="font-heading text-sm font-bold leading-tight text-text-primary">
                    Cloud Club
                  </span>
                  <span className="text-[10px] font-semibold uppercase tracking-widest text-primary">
                    VJIT
                  </span>
                </div>
              </div>
              <p className="mb-6 text-sm leading-relaxed text-text-secondary">
                Empowering students to build, learn, and deploy on the cloud.
              </p>
              <div className="flex gap-2">
                {socialLinks.map((social) => {
                  const IconComp = iconMap[social.icon];
                  return (
                    <a
                      key={social.name}
                      href={social.href}
                      aria-label={social.name}
                      className="flex h-9 w-9 items-center justify-center rounded-lg border border-border bg-background text-text-muted transition-all duration-200 hover:border-primary/30 hover:text-primary hover:shadow-md hover:shadow-primary/10"
                    >
                      {IconComp ? <IconComp className="h-4 w-4" /> : null}
                    </a>
                  );
                })}
              </div>
            </div>
          </Reveal>

          {/* Quick Links */}
          <Reveal variant="fadeUp" delay={0.1}>
            <div>
              <h4 className="mb-5 text-xs font-bold uppercase tracking-wider text-text-primary">
                Quick Links
              </h4>
              <ul className="space-y-3">
                {footerLinks.quickLinks.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-text-secondary transition-colors hover:text-primary"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>

          {/* Resources */}
          <Reveal variant="fadeUp" delay={0.2}>
            <div>
              <h4 className="mb-5 text-xs font-bold uppercase tracking-wider text-text-primary">
                Resources
              </h4>
              <ul className="space-y-3">
                {footerLinks.resources.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-sm text-text-secondary transition-colors hover:text-primary"
                      target={link.href.startsWith("http") ? "_blank" : undefined}
                      rel={link.href.startsWith("http") ? "noopener noreferrer" : undefined}
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>

          {/* Connect */}
          <Reveal variant="fadeUp" delay={0.3}>
            <div>
              <h4 className="mb-5 text-xs font-bold uppercase tracking-wider text-text-primary">
                Connect
              </h4>
              <ul className="space-y-3">
                {footerLinks.connect.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-text-secondary transition-colors hover:text-primary"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>

        {/* Divider */}
        <div className="my-8 h-px bg-gradient-to-r from-transparent via-border to-transparent" />

        {/* Bottom bar */}
        <div className="flex flex-col items-center justify-between gap-3 text-center text-xs text-text-muted md:flex-row">
          <p>
            &copy; 2026 AWS Cloud Club VJIT. Built with care by Vedant &amp; Tech
            Team.
          </p>
          <p className="flex items-center gap-1.5">
            <span className="inline-block h-1.5 w-1.5 rounded-full bg-text-muted/40" />
            Not officially affiliated with Amazon.
          </p>
        </div>
      </div>
    </footer>
  );
}
