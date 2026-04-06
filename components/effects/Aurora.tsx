"use client";

import { motion } from "framer-motion";

interface AuroraProps {
  className?: string;
}

export default function Aurora({ className = "" }: AuroraProps) {
  return (
    <div className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}>
      {/* Primary blob */}
      <motion.div
        className="absolute -left-1/4 -top-1/4 h-[600px] w-[600px] rounded-full opacity-30"
        style={{
          background: "radial-gradient(circle, var(--primary) 0%, transparent 70%)",
          filter: "blur(100px)",
        }}
        animate={{
          x: [0, 100, 50, -50, 0],
          y: [0, 50, 100, 30, 0],
          scale: [1, 1.2, 0.9, 1.1, 1],
        }}
        transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Blue accent blob */}
      <motion.div
        className="absolute -right-1/4 top-1/4 h-[500px] w-[500px] rounded-full opacity-20"
        style={{
          background: "radial-gradient(circle, var(--accent-blue) 0%, transparent 70%)",
          filter: "blur(100px)",
        }}
        animate={{
          x: [0, -80, 40, -20, 0],
          y: [0, -60, 80, -40, 0],
          scale: [1.1, 0.9, 1.2, 1, 1.1],
        }}
        transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Teal accent blob */}
      <motion.div
        className="absolute -bottom-1/4 left-1/3 h-[400px] w-[400px] rounded-full opacity-15"
        style={{
          background: "radial-gradient(circle, var(--accent-teal) 0%, transparent 70%)",
          filter: "blur(80px)",
        }}
        animate={{
          x: [0, 60, -40, 80, 0],
          y: [0, -40, 60, -20, 0],
          scale: [0.9, 1.1, 1, 1.2, 0.9],
        }}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Small pink accent */}
      <motion.div
        className="absolute right-1/4 bottom-1/3 h-[300px] w-[300px] rounded-full opacity-10"
        style={{
          background: "radial-gradient(circle, var(--accent-pink) 0%, transparent 70%)",
          filter: "blur(80px)",
        }}
        animate={{
          x: [0, -50, 30, -70, 0],
          y: [0, 70, -30, 50, 0],
        }}
        transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
      />
    </div>
  );
}
