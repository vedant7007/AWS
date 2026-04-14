"use client";

import { motion } from "framer-motion";
import Image from "next/image";

interface FacultyCardProps {
  name: string;
  designation: string;
  department: string;
  photoUrl: string;
  delay?: number;
}

export default function FacultyCard({
  name,
  designation,
  department,
  photoUrl,
  delay = 0,
}: FacultyCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay, type: "spring", stiffness: 80 }}
      className="flex flex-col items-center text-center group"
    >
      {/* Avatar — scales from 48 on mobile to 64 on desktop */}
      <div className="relative mb-4 md:mb-6 h-36 w-36 sm:h-44 sm:w-44 md:h-56 md:w-56 lg:h-64 lg:w-64 overflow-hidden rounded-full p-1.5 sm:p-2 ring-1 ring-primary/20 transition-all duration-700 group-hover:ring-primary/50 group-hover:shadow-[0_0_60px_rgba(255,153,0,0.15)] mx-auto">
        {/* Rotating dashed ring */}
        <motion.div
          className="absolute inset-0 rounded-full border border-dashed border-primary/30"
          animate={{ rotate: 360 }}
          transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
        />

        <div className="relative h-full w-full overflow-hidden rounded-full bg-surface border-[6px] sm:border-[8px] border-background/40 backdrop-blur-md shadow-inner">
          <Image
            src={
              photoUrl ||
              "https://images.unsplash.com/photo-1544168190-79c17527004f?w=600&h=600&fit=crop&crop=face"
            }
            alt={name}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-110"
          />
        </div>
      </div>

      <div className="space-y-0.5 sm:space-y-1">
        <h3 className="font-heading text-base sm:text-xl md:text-2xl font-black text-text-primary uppercase tracking-tighter">
          {name}
        </h3>
        <p className="text-primary font-bold text-[10px] sm:text-xs uppercase tracking-[0.2em]">
          {designation}
        </p>
        <p className="text-text-muted text-[9px] sm:text-[10px] uppercase tracking-widest font-medium">
          {department}
        </p>
      </div>
    </motion.div>
  );
}
