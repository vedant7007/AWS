"use client";

import { useState, useEffect, useCallback } from "react";

interface TypewriterTextProps {
  phrases: string[];
  typingSpeed?: number;
  deletingSpeed?: number;
  holdDuration?: number;
}

export default function TypewriterText({
  phrases,
  typingSpeed = 40,
  deletingSpeed = 25,
  holdDuration = 2000,
}: TypewriterTextProps) {
  const [text, setText] = useState("");
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  const tick = useCallback(() => {
    const currentPhrase = phrases[phraseIndex];

    if (!isDeleting) {
      setText(currentPhrase.slice(0, text.length + 1));

      if (text.length === currentPhrase.length) {
        setTimeout(() => setIsDeleting(true), holdDuration);
        return;
      }
    } else {
      setText(currentPhrase.slice(0, text.length - 1));

      if (text.length === 0) {
        setIsDeleting(false);
        setPhraseIndex((prev) => (prev + 1) % phrases.length);
      }
    }
  }, [text, phraseIndex, isDeleting, phrases, holdDuration]);

  useEffect(() => {
    const speed = isDeleting ? deletingSpeed : typingSpeed;
    const timer = setTimeout(tick, speed);
    return () => clearTimeout(timer);
  }, [tick, isDeleting, deletingSpeed, typingSpeed]);

  return (
    <span className="text-text-secondary text-base md:text-lg">
      {text}
      <span className="ml-0.5 inline-block animate-pulse text-primary">|</span>
    </span>
  );
}
