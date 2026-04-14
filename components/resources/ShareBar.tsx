"use client";

import { useState, useEffect } from "react";
import { Link as LinkIcon, Check } from "lucide-react";

// Twitter/X and LinkedIn share icons via SVG (avoids lucide version issues)
function TwitterIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.733-8.835L1.254 2.25H8.08l4.253 5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

function LinkedInIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}

interface ShareBarProps {
  title: string;
}

export default function ShareBar({ title }: ShareBarProps) {
  const [copied, setCopied] = useState(false);
  const [url, setUrl] = useState("");

  useEffect(() => {
    setUrl(window.location.href);
  }, []);

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (e) {
      console.error(e);
    }
  };

  const shareTwitter = () => {
    window.open(
      `https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}`,
      "_blank"
    );
  };

  const shareLinkedIn = () => {
    window.open(
      `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`,
      "_blank"
    );
  };

  return (
    <div className="flex items-center gap-3 py-6 border-b border-white/10 mb-8">
      <span className="text-sm text-white/50 uppercase tracking-widest mr-2 font-mono">
        Share
      </span>
      <button
        onClick={shareTwitter}
        className="p-2.5 rounded-full transition-all text-white/70 hover:text-white"
        style={{ background: "rgba(255,255,255,0.05)" }}
        aria-label="Share on X (Twitter)"
      >
        <TwitterIcon />
      </button>
      <button
        onClick={shareLinkedIn}
        className="p-2.5 rounded-full transition-all text-white/70 hover:text-white"
        style={{ background: "rgba(255,255,255,0.05)" }}
        aria-label="Share on LinkedIn"
      >
        <LinkedInIcon />
      </button>
      <button
        onClick={copyLink}
        className="p-2.5 rounded-full transition-all text-white/70 hover:text-white"
        style={{ background: "rgba(255,255,255,0.05)" }}
        aria-label="Copy link"
      >
        {copied ? <Check size={18} style={{ color: "#3FB950" }} /> : <LinkIcon size={18} />}
      </button>
    </div>
  );
}
