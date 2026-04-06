"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Sun, Moon, Monitor } from "lucide-react";
import { useTheme } from "@/components/providers/ThemeProvider";

const icons = {
  dark: Moon,
  light: Sun,
  system: Monitor,
};

const labels = {
  dark: "Dark mode",
  light: "Light mode",
  system: "System",
};

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  const Icon = icons[theme];

  return (
    <button
      onClick={toggleTheme}
      className="group relative flex h-9 w-9 items-center justify-center rounded-xl border border-border transition-colors hover:border-border-hover hover:bg-surface"
      aria-label={`Current: ${labels[theme]}. Click to switch.`}
      title={`Switch theme (${labels[theme]})`}
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={theme}
          initial={{ scale: 0, rotate: -180, opacity: 0 }}
          animate={{ scale: 1, rotate: 0, opacity: 1 }}
          exit={{ scale: 0, rotate: 180, opacity: 0 }}
          transition={{ duration: 0.3, type: "spring", stiffness: 200, damping: 15 }}
        >
          <Icon className="h-[18px] w-[18px] text-text-secondary group-hover:text-primary" />
        </motion.div>
      </AnimatePresence>

      {/* Mode indicator dot */}
      <span
        className="absolute -bottom-0.5 left-1/2 h-1 w-1 -translate-x-1/2 rounded-full bg-primary"
      />
    </button>
  );
}
