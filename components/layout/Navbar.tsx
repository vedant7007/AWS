"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Cloud } from "lucide-react";
import { navLinks } from "@/lib/data";
import MagneticButton from "@/components/shared/MagneticButton";
import ThemeToggle from "./ThemeToggle";
import MobileMenu from "./MobileMenu";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? "border-b border-border/50"
            : "border-b border-transparent"
        }`}
        style={{
          backgroundColor: scrolled ? "var(--bg-navbar)" : "transparent",
          backdropFilter: scrolled ? `blur(20px)` : "blur(0px)",
          WebkitBackdropFilter: scrolled ? `blur(20px)` : "blur(0px)",
        }}
      >
        <nav className="mx-auto flex h-16 max-w-[1216px] items-center justify-between px-8">
          {/* Logo */}
          <Link href="/" className="group flex items-center gap-2.5">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-primary-hover shadow-lg shadow-primary/20 transition-shadow group-hover:shadow-primary/40">
              <Cloud className="h-5 w-5 text-text-on-primary" />
            </div>
            <div className="flex flex-col">
              <span className="font-heading text-sm font-bold leading-tight text-text-primary">
                Cloud Club
              </span>
              <span className="text-[10px] font-semibold uppercase tracking-widest text-primary">
                VJIT
              </span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden items-center gap-1 rounded-full border border-border/40 bg-surface/30 px-2 py-1 backdrop-blur-sm lg:flex">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`relative rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                    isActive
                      ? "text-text-primary"
                      : "text-text-muted hover:text-text-secondary"
                  }`}
                >
                  {isActive && (
                    <motion.span
                      layoutId="navPill"
                      className="absolute inset-0 rounded-full bg-elevated border border-border/60 shadow-sm"
                      transition={{ type: "spring", stiffness: 400, damping: 30 }}
                    />
                  )}
                  <span className="relative z-10">{link.label}</span>
                </Link>
              );
            })}
          </div>

          {/* Right side */}
          <div className="flex items-center gap-3">
            <ThemeToggle />
            <MagneticButton
              as="a"
              href="#join"
              className="shimmer-btn hidden rounded-xl bg-gradient-to-r from-primary to-primary-hover px-5 py-2 text-sm font-bold text-text-on-primary shadow-md shadow-primary/20 lg:block"
            >
              Join Us
            </MagneticButton>

            {/* Mobile hamburger */}
            <button
              className="relative z-50 flex h-10 w-10 items-center justify-center rounded-xl border border-border/60 bg-surface/50 backdrop-blur-sm lg:hidden"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
            >
              <AnimatePresence mode="wait">
                {mobileOpen ? (
                  <motion.div
                    key="close"
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <X className="h-5 w-5 text-text-primary" />
                  </motion.div>
                ) : (
                  <motion.div
                    key="menu"
                    initial={{ rotate: 90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Menu className="h-5 w-5 text-text-primary" />
                  </motion.div>
                )}
              </AnimatePresence>
            </button>
          </div>
        </nav>
      </header>

      <MobileMenu isOpen={mobileOpen} onClose={() => setMobileOpen(false)} />
    </>
  );
}
