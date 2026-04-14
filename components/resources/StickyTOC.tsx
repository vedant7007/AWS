"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

interface Heading {
  id: string;
  text: string;
  level: number;
}

interface StickyTOCProps {
  htmlContent: string;
  monoFont?: string;
}

export default function StickyTOC({ htmlContent, monoFont }: StickyTOCProps) {
  const [headings, setHeadings] = useState<Heading[]>([]);
  const [activeId, setActiveId] = useState("");

  useEffect(() => {
    // Read headings from the rendered DOM (article-content class)
    const pageHeadings = Array.from(
      document.querySelectorAll(".article-content h2, .article-content h3")
    ) as HTMLElement[];

    const parsed: Heading[] = pageHeadings.map((el) => {
      if (!el.id) {
        el.id = el.innerText.toLowerCase().replace(/[^a-z0-9]+/g, "-");
      }
      return {
        id: el.id,
        text: el.innerText,
        level: Number(el.tagName.replace("H", "")),
      };
    });
    setHeadings(parsed);

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActiveId(entry.target.id);
        }
      },
      { rootMargin: "0% 0% -80% 0%" }
    );
    pageHeadings.forEach((h) => observer.observe(h));
    return () => observer.disconnect();
  }, [htmlContent]);

  if (headings.length === 0) return null;

  return (
    <div className="sticky top-24 pl-8 border-l border-white/10 hidden xl:block w-64 max-h-[calc(100vh-8rem)] overflow-y-auto">
      <h4
        className="mb-4 text-sm tracking-widest uppercase"
        style={{ color: "#FF9900", fontFamily: monoFont }}
      >
        On this page
      </h4>
      <ul className="space-y-3 text-sm">
        {headings.map((heading) => (
          <li key={heading.id} style={{ paddingLeft: `${(heading.level - 2) * 1}rem` }}>
            <a
              href={`#${heading.id}`}
              className={cn(
                "block transition-colors hover:text-[#FF9900]",
                activeId === heading.id ? "font-medium" : "text-white/60"
              )}
              style={{
                color: activeId === heading.id ? "#FF9900" : undefined,
                fontFamily: monoFont,
              }}
              onClick={(e) => {
                e.preventDefault();
                document.getElementById(heading.id)?.scrollIntoView({ behavior: "smooth" });
              }}
            >
              {heading.text}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
