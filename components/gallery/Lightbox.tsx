"use client";

import { useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
interface LightboxItem {
  title: string;
  category: string;
  date: string;
  color: string;
}

interface LightboxProps {
  items: LightboxItem[];
  currentIndex: number;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
}

export default function Lightbox({
  items,
  currentIndex,
  onClose,
  onPrev,
  onNext,
}: LightboxProps) {
  const item = items[currentIndex];

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") onPrev();
      if (e.key === "ArrowRight") onNext();
    },
    [onClose, onPrev, onNext]
  );

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [handleKeyDown]);

  if (!item) return null;

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-[80] flex items-center justify-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        {/* Backdrop */}
        <div className="absolute inset-0 bg-black/90" onClick={onClose} />

        {/* Close */}
        <button
          onClick={onClose}
          className="absolute right-6 top-6 z-10 rounded-full bg-white/10 p-2 backdrop-blur-sm"
        >
          <X className="h-6 w-6 text-white" />
        </button>

        {/* Prev */}
        <button
          onClick={onPrev}
          className="absolute left-4 z-10 rounded-full bg-white/10 p-3 backdrop-blur-sm md:left-8"
        >
          <ChevronLeft className="h-6 w-6 text-white" />
        </button>

        {/* Next */}
        <button
          onClick={onNext}
          className="absolute right-4 z-10 rounded-full bg-white/10 p-3 backdrop-blur-sm md:right-8"
        >
          <ChevronRight className="h-6 w-6 text-white" />
        </button>

        {/* Image placeholder */}
        <motion.div
          key={currentIndex}
          className="relative z-10 flex h-[60vh] w-[80vw] max-w-3xl flex-col items-center justify-center rounded-2xl"
          style={{ backgroundColor: item.color + "30" }}
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.8, opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          <span className="text-lg font-semibold text-text-primary">
            {item.title}
          </span>
          <span className="mt-2 text-sm text-text-muted">
            {item.category} • {item.date}
          </span>
          <span className="mt-1 text-xs text-text-muted">
            {currentIndex + 1} / {items.length}
          </span>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
