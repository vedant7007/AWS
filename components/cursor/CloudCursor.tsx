"use client";

import { useEffect, useRef } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";

const HOVER_SELECTORS =
  "a, button, [role='button'], input[type='submit'], [data-cursor='hover']";

function CloudSVG({
  size = 32,
  opacity = 0.8,
}: {
  size?: number;
  opacity?: number;
}) {
  const h = size * 0.625;
  return (
    <svg
      width={size}
      height={h}
      viewBox="0 0 32 20"
      fill="none"
      style={{ opacity }}
    >
      <path
        d="M8 18C4 18 1 15.5 1 12.5C1 9.8 3.2 7.5 6 7.1C6 3.2 9.1 0 13 0C16.2 0 18.8 2.1 19.7 5C20.3 4.7 21 4.5 21.8 4.5C24.6 4.5 26.8 6.7 26.8 9.5C26.8 9.7 26.8 9.9 26.7 10.1C29.1 10.5 31 12.5 31 15C31 17.8 28.8 20 26 20H8Z"
        fill="currentColor"
      />
    </svg>
  );
}

export default function CloudCursor() {
  const isHovering = useRef(false);

  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  // Main cursor — responsive spring
  const smoothX = useSpring(cursorX, { damping: 28, stiffness: 500, mass: 0.5 });
  const smoothY = useSpring(cursorY, { damping: 28, stiffness: 500, mass: 0.5 });

  // Ghost trail — heavier, laggier spring
  const ghostX = useSpring(cursorX, { damping: 40, stiffness: 100, mass: 1.5 });
  const ghostY = useSpring(cursorY, { damping: 40, stiffness: 100, mass: 1.5 });

  // Hover scale driven by motion value + useTransform
  const hoverProgress = useMotionValue(0);
  const smoothHover = useSpring(hoverProgress, { damping: 20, stiffness: 300 });
  const mainScale = useTransform(smoothHover, [0, 1], [1, 1.4]);
  const glowOpacity = useTransform(smoothHover, [0, 1], [0, 0.6]);

  useEffect(() => {
    const isTouch = window.matchMedia("(pointer: coarse)").matches;
    if (isTouch) return;

    const handleMouseMove = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest(HOVER_SELECTORS)) {
        if (!isHovering.current) {
          isHovering.current = true;
          hoverProgress.set(1);
        }
      }
    };

    const handleMouseOut = (e: MouseEvent) => {
      const target = e.relatedTarget as HTMLElement | null;
      if (!target || !target.closest?.(HOVER_SELECTORS)) {
        if (isHovering.current) {
          isHovering.current = false;
          hoverProgress.set(0);
        }
      }
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    document.addEventListener("mouseover", handleMouseOver, { passive: true });
    document.addEventListener("mouseout", handleMouseOut, { passive: true });

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseover", handleMouseOver);
      document.removeEventListener("mouseout", handleMouseOut);
    };
  }, [cursorX, cursorY, hoverProgress]);

  return (
    <>
      {/* Ghost trail */}
      <motion.div
        className="pointer-events-none fixed left-0 top-0 z-[9996] hidden text-primary md:block"
        style={{
          x: ghostX,
          y: ghostY,
          translateX: "-50%",
          translateY: "-50%",
          opacity: 0.12,
          willChange: "transform",
        }}
      >
        <CloudSVG size={22} opacity={1} />
      </motion.div>

      {/* Main cloud */}
      <motion.div
        className="pointer-events-none fixed left-0 top-0 z-[9999] hidden md:block"
        style={{
          x: smoothX,
          y: smoothY,
          translateX: "-50%",
          translateY: "-50%",
          scale: mainScale,
          willChange: "transform",
        }}
      >
        <motion.div
          className="relative text-primary"
          animate={{ y: [0, -2, 0, 2, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        >
          <CloudSVG size={32} opacity={0.7} />
          {/* Glow on hover */}
          <motion.div
            className="absolute inset-0 text-primary blur-sm"
            style={{ opacity: glowOpacity }}
          >
            <CloudSVG size={32} opacity={1} />
          </motion.div>
        </motion.div>
      </motion.div>
    </>
  );
}
