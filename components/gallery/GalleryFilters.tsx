"use client";

import { motion } from "framer-motion";
import { galleryCategories } from "@/lib/data";

interface GalleryFiltersProps {
  activeFilter: string;
  onFilterChange: (filter: string) => void;
}

export default function GalleryFilters({ activeFilter, onFilterChange }: GalleryFiltersProps) {
  return (
    <div className="mb-10 flex flex-wrap justify-center gap-2">
      {galleryCategories.map((cat) => (
        <button
          key={cat}
          onClick={() => onFilterChange(cat)}
          className="relative rounded-full px-5 py-2 text-sm font-medium transition-colors"
          style={{
            color: activeFilter === cat ? "#000" : "#8892A4",
          }}
        >
          {activeFilter === cat && (
            <motion.div
              layoutId="galleryFilter"
              className="absolute inset-0 rounded-full bg-primary"
              transition={{ type: "spring", stiffness: 350, damping: 30 }}
            />
          )}
          <span className="relative z-10">{cat}</span>
        </button>
      ))}
    </div>
  );
}
