"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { Search, Linkedin, Github, X, Award, BookOpen, GraduationCap, Sparkles, AlertCircle } from "lucide-react";
import { getMembers } from "@/lib/firebase";
import { Member } from "@/lib/data";
import Reveal from "@/components/shared/Reveal";
import Antigravity from "@/components/effects/Antigravity";
import GlowCard from "@/components/shared/GlowCard";

export default function MembersPage() {
  const [members, setMembers] = useState<Member[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCert, setSelectedCert] = useState("All");
  const [selectedYear, setSelectedYear] = useState("All");
  const [selectedBranch, setSelectedBranch] = useState("All");
  const [selectedMember, setSelectedMember] = useState<Member | null>(null);

  useEffect(() => {
    async function loadMembers() {
      try {
        const data = await getMembers();
        setMembers(data);
      } catch (error) {
        console.error("Error loading members:", error);
      } finally {
        setLoading(false);
      }
    }
    loadMembers();
  }, []);

  // Filter Categories
  const certOptions = [
    { label: "All Certifications", value: "All" },
    { label: "Cloud Practitioner (CCP)", value: "Practitioner" },
    { label: "Solutions Architect (SAA)", value: "Solutions Architect" },
    { label: "Developer Associate (DVA)", value: "Developer" },
    { label: "Cloud Enthusiasts (None)", value: "None" },
  ];

  const yearOptions = ["All", "1st Year", "2nd Year", "3rd Year", "4th Year"];
  const branchOptions = ["All", "CSE", "IT", "ECE", "AI&DS"];

  // Filter Logic
  const filteredMembers = members.filter((member) => {
    // Search filter
    const matchesSearch =
      member.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      member.role.toLowerCase().includes(searchQuery.toLowerCase()) ||
      member.skills.some((skill) => skill.toLowerCase().includes(searchQuery.toLowerCase()));

    // Certification filter
    let matchesCert = true;
    if (selectedCert !== "All") {
      if (selectedCert === "None") {
        matchesCert = member.certifications.length === 0;
      } else {
        matchesCert = member.certifications.some((cert) =>
          cert.toLowerCase().includes(selectedCert.toLowerCase())
        );
      }
    }

    // Year filter
    const matchesYear = selectedYear === "All" || member.year === selectedYear;

    // Branch filter
    const matchesBranch = selectedBranch === "All" || member.branch === selectedBranch;

    return matchesSearch && matchesCert && matchesYear && matchesBranch;
  });

  // Calculate dynamic stats from filtered/total members
  const totalCount = members.length;
  const certifiedCount = members.filter(m => m.certifications.length > 0).length;
  const ccpCount = members.filter(m => m.certifications.some(c => c.includes("Cloud Practitioner"))).length;
  const associateCount = members.filter(m => m.certifications.some(c => c.includes("Architect") || c.includes("Developer"))).length;

  // Function to determine certificate color theme
  const getCertColor = (cert: string) => {
    if (cert.includes("Solutions Architect")) {
      return {
        bg: "bg-accent-blue/10 border-accent-blue/20 text-accent-blue",
        badge: "bg-accent-blue text-white",
        glow: "rgba(77, 166, 255, 0.4)",
      };
    }
    if (cert.includes("Developer")) {
      return {
        bg: "bg-accent-purple/10 border-accent-purple/20 text-accent-purple",
        badge: "bg-accent-purple text-white",
        glow: "rgba(167, 139, 250, 0.4)",
      };
    }
    return {
      bg: "bg-accent-orange/10 border-accent-orange/20 text-accent-orange",
      badge: "bg-accent-orange text-white",
      glow: "rgba(232, 133, 12, 0.4)",
    };
  };

  const getTierColor = (role: string) => {
    const lowercaseRole = role.toLowerCase();
    if (lowercaseRole.includes("captain")) return "#FF9900"; // AWS Gold
    if (lowercaseRole.includes("lead")) return "#4DA6FF"; // Cloud Blue
    if (lowercaseRole.includes("core")) return "#A78BFA"; // Electric Purple
    if (lowercaseRole.includes("coordinator")) return "#2DD4BF"; // Teal
    return "#8892A4"; // Slate Muted
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { type: "spring" as const, stiffness: 100, damping: 15 } },
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="h-12 w-12 border-4 border-primary border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-background relative overflow-x-hidden pt-[118px] pb-16 md:pb-32">
      <Antigravity />

      <style jsx global>{`
        @keyframes shimmer-gold {
          0% { background-position: -200% center; }
          100% { background-position: 200% center; }
        }
        .shimmer-text {
          background: linear-gradient(90deg, #fff 0%, #FF9900 50%, #fff 100%);
          background-size: 200% auto;
          color: transparent;
          background-clip: text;
          -webkit-background-clip: text;
          animation: shimmer-gold 4s linear infinite;
        }
        .custom-scrollbar::-webkit-scrollbar {
          height: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: var(--border-default);
          border-radius: 99px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: var(--border-hover);
        }
      `}</style>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 max-w-[1216px]">
        {/* ── HEADER ─────────────────────────────────────────── */}
        <div className="flex flex-col items-center text-center px-2 mb-10">
          <Reveal variant="fadeUp">
            <span className="text-primary font-black uppercase tracking-[0.4em] text-[10px] mb-1 block opacity-60">
              AWS Cloud Club VJIT
            </span>
          </Reveal>
          <h1 className="font-heading text-5xl sm:text-7xl md:text-8xl font-black text-text-primary uppercase mb-2 tracking-tighter leading-[0.85] shimmer-text">
            MEMBERS DIRECTORY
          </h1>
          <p className="mt-4 text-text-secondary text-sm sm:text-base max-w-2xl">
            Meet the innovators, builders, and cloud pioneers of our student community. Filter by year, branch, or certifications.
          </p>
        </div>

        {/* ── STATS OVERVIEW ────────────────────────────────── */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10 max-w-4xl mx-auto">
          {[
            { label: "Total Members", val: totalCount, icon: GraduationCap, color: "text-primary" },
            { label: "Certified", val: certifiedCount, icon: Award, color: "text-accent-orange" },
            { label: "CCP Certified", val: ccpCount, icon: Sparkles, color: "text-accent-teal" },
            { label: "Associate Certified", val: associateCount, icon: BookOpen, color: "text-accent-blue" },
          ].map((stat, idx) => (
            <div
              key={idx}
              className="rounded-xl border border-border/60 bg-elevated/40 p-4 backdrop-blur-md flex flex-col items-center justify-center text-center transition-all hover:border-border"
            >
              <stat.icon className={`h-5 w-5 mb-2 ${stat.color}`} />
              <span className="text-2xl sm:text-3xl font-bold font-heading text-text-primary">
                {stat.val}
              </span>
              <span className="text-xs text-text-secondary mt-0.5">{stat.label}</span>
            </div>
          ))}
        </div>

        {/* ── SEARCH & FILTER CONTROLS ──────────────────────── */}
        <div className="space-y-4 mb-10 bg-elevated/20 border border-border/40 rounded-2xl p-6 backdrop-blur-md">
          {/* Search bar */}
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-text-muted" />
            <input
              type="text"
              placeholder="Search members by name, role, skills..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-elevated/40 border border-border/80 rounded-xl py-3 pl-12 pr-4 text-text-primary placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all text-sm backdrop-blur-sm"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Certifications filter */}
            <div className="flex flex-col">
              <label className="text-xs font-semibold text-text-secondary mb-1.5 uppercase tracking-wider">
                AWS Certification
              </label>
              <select
                value={selectedCert}
                onChange={(e) => setSelectedCert(e.target.value)}
                className="w-full bg-elevated/40 border border-border/80 rounded-xl py-2 px-3 text-text-primary text-sm focus:outline-none focus:ring-1 focus:ring-primary"
              >
                {certOptions.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Year filter */}
            <div className="flex flex-col">
              <label className="text-xs font-semibold text-text-secondary mb-1.5 uppercase tracking-wider">
                Year of Study
              </label>
              <select
                value={selectedYear}
                onChange={(e) => setSelectedYear(e.target.value)}
                className="w-full bg-elevated/40 border border-border/80 rounded-xl py-2 px-3 text-text-primary text-sm focus:outline-none focus:ring-1 focus:ring-primary"
              >
                {yearOptions.map((y) => (
                  <option key={y} value={y}>
                    {y === "All" ? "All Years" : y}
                  </option>
                ))}
              </select>
            </div>

            {/* Branch filter */}
            <div className="flex flex-col">
              <label className="text-xs font-semibold text-text-secondary mb-1.5 uppercase tracking-wider">
                Department
              </label>
              <select
                value={selectedBranch}
                onChange={(e) => setSelectedBranch(e.target.value)}
                className="w-full bg-elevated/40 border border-border/80 rounded-xl py-2 px-3 text-text-primary text-sm focus:outline-none focus:ring-1 focus:ring-primary"
              >
                {branchOptions.map((b) => (
                  <option key={b} value={b}>
                    {b === "All" ? "All Departments" : b}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* ── MEMBERS GRID ───────────────────────────────────── */}
        <AnimatePresence mode="wait">
          {filteredMembers.length > 0 ? (
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="show"
              className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
            >
              {filteredMembers.map((member) => {
                const tierColor = getTierColor(member.role);
                const hasCerts = member.certifications.length > 0;
                const primaryCert = hasCerts ? member.certifications[0] : null;
                const certTheme = primaryCert ? getCertColor(primaryCert) : null;

                return (
                  <motion.div
                    key={member.id}
                    variants={cardVariants}
                    onClick={() => setSelectedMember(member)}
                    className="cursor-pointer h-full"
                  >
                    <GlowCard
                      glowColor={tierColor}
                      accent={false}
                      className="h-full border border-border/60 bg-elevated/30 hover:bg-elevated/50 flex flex-col justify-between"
                    >
                      <div>
                        {/* Avatar & Certification Badge */}
                        <div className="flex items-start justify-between mb-4">
                          <div
                            className="h-12 w-12 rounded-full flex items-center justify-center text-lg font-bold text-text-primary font-heading relative overflow-hidden"
                            style={{
                              background: `linear-gradient(135deg, ${tierColor}30, ${tierColor}10)`,
                              border: `2px solid ${tierColor}40`,
                            }}
                          >
                            {member.photoUrl ? (
                              <img
                                src={member.photoUrl}
                                alt={member.name}
                                className="h-full w-full object-cover"
                              />
                            ) : (
                              <span>{member.name[0]}</span>
                            )}
                          </div>

                          {/* Certification Badge */}
                          {primaryCert && certTheme && (
                            <span
                              className={`text-[9px] font-bold px-2 py-0.5 rounded-full border ${certTheme.bg}`}
                            >
                              {primaryCert.includes("Architect")
                                ? "SAA"
                                : primaryCert.includes("Developer")
                                ? "DVA"
                                : "CCP"}
                            </span>
                          )}
                        </div>

                        {/* Name & Role */}
                        <h3 className="font-heading text-lg font-bold text-text-primary leading-tight hover:text-primary transition-colors">
                          {member.name}
                        </h3>
                        <p
                          className="text-xs font-semibold mt-1"
                          style={{ color: tierColor }}
                        >
                          {member.role}
                        </p>
                        <p className="text-[11px] text-text-secondary mt-0.5">
                          {member.year} • {member.branch}
                        </p>

                        {/* Bio snippet */}
                        <p className="text-xs text-text-secondary mt-3 line-clamp-2 leading-relaxed">
                          {member.bio}
                        </p>
                      </div>

                      {/* Skills & Footer */}
                      <div className="mt-5 pt-4 border-t border-border/30">
                        <div className="flex flex-wrap gap-1 mb-4 h-[22px] overflow-hidden">
                          {member.skills.slice(0, 3).map((skill) => (
                            <span
                              key={skill}
                              className="text-[9px] bg-background border border-border/40 rounded px-1.5 py-0.5 text-text-secondary"
                            >
                              {skill}
                            </span>
                          ))}
                          {member.skills.length > 3 && (
                            <span className="text-[9px] text-text-muted px-1 py-0.5">
                              +{member.skills.length - 3} more
                            </span>
                          )}
                        </div>

                        <div className="flex items-center justify-between">
                          <span className="text-[10px] text-primary font-bold hover:underline">
                            View Profile →
                          </span>

                          <div className="flex items-center gap-2">
                            {member.social.github && (
                              <a
                                href={member.social.github}
                                onClick={(e) => e.stopPropagation()}
                                target="_blank"
                                rel="noreferrer"
                                className="p-1 rounded text-text-muted hover:text-text-primary hover:bg-elevated transition-all"
                                aria-label="GitHub"
                              >
                                <Github className="h-3.5 w-3.5" />
                              </a>
                            )}
                            {member.social.linkedin && (
                              <a
                                href={member.social.linkedin}
                                onClick={(e) => e.stopPropagation()}
                                target="_blank"
                                rel="noreferrer"
                                className="p-1 rounded text-text-muted hover:text-[#0A66C2] hover:bg-elevated transition-all"
                                aria-label="LinkedIn"
                              >
                                <Linkedin className="h-3.5 w-3.5" />
                              </a>
                            )}
                          </div>
                        </div>
                      </div>
                    </GlowCard>
                  </motion.div>
                );
              })}
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="flex flex-col items-center justify-center text-center p-12 border border-border/60 bg-elevated/20 rounded-2xl backdrop-blur-md max-w-md mx-auto"
            >
              <AlertCircle className="h-10 w-10 text-text-muted mb-4" />
              <h3 className="font-heading text-lg font-bold text-text-primary">
                No Members Found
              </h3>
              <p className="text-xs text-text-secondary mt-1">
                We couldn't find any members matching your current filters. Try resetting them!
              </p>
              <button
                onClick={() => {
                  setSearchQuery("");
                  setSelectedCert("All");
                  setSelectedYear("All");
                  setSelectedBranch("All");
                }}
                className="mt-5 rounded-lg bg-primary px-4 py-2 text-xs font-bold text-text-on-primary hover:bg-primary-hover shadow shadow-primary/20 transition-all cursor-pointer"
              >
                Reset Filters
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* ── DETAILED MEMBER MODAL ──────────────────────────── */}
      <AnimatePresence>
        {selectedMember && (
          <motion.div
            className="fixed inset-0 z-[70] flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="absolute inset-0 bg-black/80 backdrop-blur-md"
              onClick={() => setSelectedMember(null)}
            />
            <motion.div
              className="relative z-10 w-full max-w-lg overflow-hidden rounded-2xl border border-border/80 bg-elevated p-6 sm:p-8 shadow-2xl"
              initial={{ scale: 0.92, y: 15, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.92, y: 15, opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 280 }}
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedMember(null)}
                className="absolute right-4 top-4 rounded-lg p-1 text-text-muted hover:text-text-primary hover:bg-surface transition-all cursor-pointer"
              >
                <X className="h-5 w-5" />
              </button>

              {/* Header section with avatar, name, and major roles */}
              <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 mb-6">
                <div
                  className="h-20 w-20 rounded-full flex items-center justify-center text-3xl font-bold text-text-primary font-heading relative overflow-hidden"
                  style={{
                    background: `linear-gradient(135deg, ${getTierColor(selectedMember.role)}30, ${getTierColor(selectedMember.role)}10)`,
                    border: `3px solid ${getTierColor(selectedMember.role)}40`,
                  }}
                >
                  {selectedMember.photoUrl ? (
                    <img
                      src={selectedMember.photoUrl}
                      alt={selectedMember.name}
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <span>{selectedMember.name[0]}</span>
                  )}
                </div>

                <div className="text-center sm:text-left pt-1">
                  <h3 className="font-heading text-2xl font-black text-text-primary uppercase leading-none">
                    {selectedMember.name}
                  </h3>
                  <p
                    className="text-sm font-bold mt-1.5"
                    style={{ color: getTierColor(selectedMember.role) }}
                  >
                    {selectedMember.role}
                  </p>
                  <p className="text-xs text-text-secondary mt-0.5">
                    {selectedMember.year} • {selectedMember.branch} • VJIT
                  </p>
                </div>
              </div>

              {/* Bio block */}
              <div className="space-y-4 mb-6">
                <div className="bg-surface/50 border border-border/40 rounded-xl p-4">
                  <h4 className="text-xs font-bold text-text-secondary uppercase tracking-wider mb-1.5">
                    Biography
                  </h4>
                  <p className="text-xs sm:text-sm leading-relaxed text-text-secondary">
                    {selectedMember.bio}
                  </p>
                </div>

                {/* Certifications (if any) */}
                {selectedMember.certifications.length > 0 && (
                  <div className="bg-surface/50 border border-border/40 rounded-xl p-4">
                    <h4 className="text-xs font-bold text-text-secondary uppercase tracking-wider mb-2">
                      AWS Credentials
                    </h4>
                    <div className="space-y-2">
                      {selectedMember.certifications.map((cert) => {
                        const styleTheme = getCertColor(cert);
                        return (
                          <div
                            key={cert}
                            className={`flex items-center gap-2 px-3 py-1.5 rounded-lg border text-xs font-semibold ${styleTheme.bg}`}
                          >
                            <Award className="h-4 w-4 shrink-0" />
                            <span>{cert}</span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* Skills cloud */}
                <div>
                  <h4 className="text-xs font-bold text-text-secondary uppercase tracking-wider mb-2">
                    Core Skills
                  </h4>
                  <div className="flex flex-wrap gap-1.5">
                    {selectedMember.skills.map((skill) => (
                      <span
                        key={skill}
                        className="rounded-lg border border-border bg-surface/30 px-2.5 py-1 text-xs text-text-secondary transition-all hover:border-primary/50 hover:bg-surface"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Footer and socials */}
              <div className="flex items-center justify-between pt-4 border-t border-border/60">
                <span className="text-[10px] text-text-muted font-mono uppercase">
                  AWS Cloud Club VJIT Member
                </span>

                <div className="flex items-center gap-3">
                  {selectedMember.social.github && (
                    <a
                      href={selectedMember.social.github}
                      target="_blank"
                      rel="noreferrer"
                      className="flex h-9 w-9 items-center justify-center rounded-xl border border-border text-text-muted hover:text-text-primary hover:bg-surface transition-all"
                      aria-label="GitHub Profile"
                    >
                      <Github className="h-4.5 w-4.5" />
                    </a>
                  )}
                  {selectedMember.social.linkedin && (
                    <a
                      href={selectedMember.social.linkedin}
                      target="_blank"
                      rel="noreferrer"
                      className="flex h-9 w-9 items-center justify-center rounded-xl border border-border text-text-muted hover:text-[#0A66C2] hover:bg-surface transition-all"
                      aria-label="LinkedIn Profile"
                    >
                      <Linkedin className="h-4.5 w-4.5" />
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
