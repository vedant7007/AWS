"use client";

import { motion } from "framer-motion";
import { eventCategories } from "@/lib/data";

interface EventFiltersProps {
  activeFilter: string;
  onFilterChange: (filter: string) => void;
}

export default function EventFilters({ activeFilter, onFilterChange }: EventFiltersProps) {
  return (
    <div className="mb-10 flex flex-wrap justify-center gap-2">
      {eventCategories.map((cat) => {
        const isActive = activeFilter === cat;
        return (
          <button
            key={cat}
            onClick={() => onFilterChange(cat)}
            className={`relative rounded-full px-5 py-2 text-sm font-medium transition-colors ${
              isActive ? "text-text-on-primary" : "text-text-muted hover:text-text-primary"
            }`}
          >
            {isActive && (
              <motion.div
                layoutId="eventFilter"
                className="absolute inset-0 rounded-full bg-primary shadow-md shadow-primary/20"
                transition={{ type: "spring", stiffness: 350, damping: 30 }}
              />
            )}
            <span className="relative z-10">{cat}</span>
          </button>
        );
      })}
    </div>
  );
}
