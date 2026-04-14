"use client";

import { useEffect, useState, useCallback } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { useDrag } from "@use-gesture/react";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

interface LightboxImage {
  src: string;
  alt?: string;
  caption?: string;
  event?: string;
  date?: string;
}

interface LightboxProps {
  images: LightboxImage[];
  initialIndex?: number;
  onClose: () => void;
}

export default function Lightbox({ images, initialIndex = 0, onClose }: LightboxProps) {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);
  const [direction, setDirection] = useState(0);

  const current = images[currentIndex];

  const handleNext = useCallback(() => {
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % images.length);
  }, [images.length]);

  const handlePrev = useCallback(() => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  }, [images.length]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") handleNext();
      if (e.key === "ArrowLeft") handlePrev();
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [onClose, handleNext, handlePrev]);

  const bind = useDrag(
    ({ active, movement: [mx], direction: [dx], cancel }) => {
      if (active && Math.abs(mx) > 50) {
        if (dx > 0) handlePrev();
        else handleNext();
        cancel();
      }
    },
    { axis: "x", filterTaps: true }
  );

  const variants = {
    enter: (dir: number) => ({ x: dir > 0 ? 300 : -300, opacity: 0, scale: 0.95 }),
    center: { zIndex: 1, x: 0, opacity: 1, scale: 1 },
    exit: (dir: number) => ({ zIndex: 0, x: dir < 0 ? 300 : -300, opacity: 0, scale: 0.95 }),
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 backdrop-blur-md"
    >
      {/* Close */}
      <button
        onClick={onClose}
        className="absolute top-6 right-6 z-[110] p-2 text-white/70 hover:text-white hover:bg-white/10 rounded-full transition-all"
        aria-label="Close"
      >
        <X size={32} />
      </button>

      {/* Prev / Next */}
      {images.length > 1 && (
        <>
          <button
            onClick={(e) => { e.stopPropagation(); handlePrev(); }}
            className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 z-[110] p-3 text-white/50 hover:text-white hover:bg-white/10 rounded-full transition-all"
            aria-label="Previous"
          >
            <ChevronLeft size={36} />
          </button>
          <button
            onClick={(e) => { e.stopPropagation(); handleNext(); }}
            className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 z-[110] p-3 text-white/50 hover:text-white hover:bg-white/10 rounded-full transition-all"
            aria-label="Next"
          >
            <ChevronRight size={36} />
          </button>
        </>
      )}

      {/* Image container */}
      <div
        {...bind()}
        className="relative w-full max-w-5xl h-[70vh] md:h-[80vh] flex items-center justify-center touch-pan-y"
      >
        <AnimatePresence initial={false} custom={direction}>
          <motion.div
            key={currentIndex}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              x: { type: "spring", stiffness: 300, damping: 30 },
              opacity: { duration: 0.2 },
            }}
            className="absolute inset-0 w-full h-full p-4 flex flex-col items-center justify-center"
          >
            <div className="relative w-full h-full rounded-2xl overflow-hidden shadow-[0_0_40px_rgba(168,85,247,0.3)] bg-black/50 border border-purple-500/20">
              <Image
                src={current?.src || ""}
                alt={current?.alt || "Gallery image"}
                fill
                className="object-contain"
                sizes="100vw"
                priority
              />
            </div>

            {/* Caption bar */}
            <div className="absolute bottom-4 left-4 right-4 md:bottom-8 md:left-8 md:right-8 bg-black/60 backdrop-blur-xl border border-white/10 rounded-xl p-4 md:p-6 z-[120]">
              <div className="flex flex-col md:flex-row md:justify-between md:items-end gap-3">
                <div>
                  <h3 className="text-lg md:text-xl font-semibold text-white">
                    {current?.alt || "Untitled"}
                  </h3>
                  {current?.caption && current.caption !== current.alt && (
                    <p className="text-sm text-gray-300 mt-1">{current.caption}</p>
                  )}
                </div>
                <div className="flex items-center gap-3 font-mono text-xs text-purple-300 whitespace-nowrap">
                  {current?.event && (
                    <span className="px-3 py-1 bg-purple-900/40 rounded-full border border-purple-500/30">
                      {current.event}
                    </span>
                  )}
                  {current?.date && (
                    <span className="px-3 py-1 bg-white/5 rounded-full border border-white/10">
                      {current.date}
                    </span>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Counter */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 font-mono text-purple-400 bg-black/50 px-4 py-1 rounded-full backdrop-blur-md border border-purple-500/20 text-sm">
        {currentIndex + 1} / {images.length}
      </div>
    </motion.div>
  );
}
