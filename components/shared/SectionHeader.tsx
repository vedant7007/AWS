"use client";

import Reveal from "./Reveal";

interface SectionHeaderProps {
  label: string;
  title: string;
  subtitle?: string;
  centered?: boolean;
  number?: string;
}

export default function SectionHeader({
  label,
  title,
  subtitle,
  centered = true,
  number,
}: SectionHeaderProps) {
  return (
    <div className={`mb-16 ${centered ? "text-center" : ""}`}>
      <Reveal variant="fadeUp">
        <div
          className={`mb-5 flex items-center gap-3 ${centered ? "justify-center" : ""}`}
        >
          {number && (
            <span className="font-mono text-xs font-semibold text-text-muted/40">
              {number}
            </span>
          )}
          <div className="flex items-center gap-2.5">
            <span className="h-px w-8 bg-gradient-to-r from-transparent to-primary" />
            <span className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.15em] text-primary">
              <span className="inline-block h-1.5 w-1.5 rounded-full bg-primary" />
              {label}
            </span>
            <span className="h-px w-8 bg-gradient-to-l from-transparent to-primary" />
          </div>
        </div>
      </Reveal>
      <Reveal variant="fadeUp" delay={0.1}>
        <h2 className="font-heading text-3xl font-bold tracking-[-0.02em] text-text-primary md:text-4xl lg:text-[44px] lg:leading-[1.15]">
          {title}
        </h2>
        {/* Gradient underline accent */}
        <div className={`mt-4 h-1 w-16 rounded-full bg-gradient-to-r from-primary to-accent-blue ${centered ? "mx-auto" : ""}`} />
      </Reveal>
      {subtitle && (
        <Reveal variant="fadeUp" delay={0.2}>
          <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-text-secondary md:text-lg">
            {subtitle}
          </p>
        </Reveal>
      )}
    </div>
  );
}
