"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import { getTeamMembers } from "@/lib/firebase";
import { teamData } from "@/lib/data";
import Reveal from "@/components/shared/Reveal";
import Antigravity from "@/components/effects/Antigravity";
import CaptainCard from "@/components/team/CaptainCard";
import CardDeck from "@/components/team/CardDeck";
import TeamTree from "@/components/team/TeamTree";
import FacultyCard from "@/components/team/FacultyCard";

export interface Socials {
  linkedin?: string;
  github?: string;
  twitter?: string;
  instagram?: string;
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  designation?: string;
  department?: string;
  photoUrl: string;
  team?: string;
  bio?: string;
  subRole?: string;
  socials?: Socials;
  linkedin?: string;
  github?: string;
  instagram?: string;
}

export default function TeamPage() {
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedTeamId, setSelectedTeamId] = useState<string | null>(null);
  const [activeSubTeamId, setActiveSubTeamId] = useState<string | null>(null);
  const [isSectionFlipped, setIsSectionFlipped] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  // Detect mobile
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 1024);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  // Scroll lock when modal is open (mobile only)
  useEffect(() => {
    if (isMobile && activeSubTeamId) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => { document.body.style.overflow = "unset"; };
  }, [activeSubTeamId, isMobile]);

  useEffect(() => {
    async function loadTeam() {
      try {
        const data = await getTeamMembers();
        setTeamMembers(data);
      } catch (error) {
        console.error("Error fetching team:", error);
      } finally {
        setLoading(false);
      }
    }
    loadTeam();
  }, []);

  const teamCategories = [
    { id: "tech", name: "Technical" },
    { id: "events", name: "Events" },
    { id: "design", name: "Design" },
    { id: "marketing", name: "Marketing" },
    { id: "production", name: "Production" },
  ];

  const isUsingFallback = teamMembers.length === 0;

  const getTeamData = (teamId: string) => {
    if (isUsingFallback) {
      const staticLead = teamData.leads.find((l) => l.id === teamId);
      if (!staticLead) return { lead: null, members: [] };
      return {
        lead: {
          id: staticLead.id,
          name: staticLead.name,
          role: staticLead.role,
          bio: staticLead.tagline,
          photoUrl: "",
          linkedin: staticLead.socials.linkedin,
          github: staticLead.socials.github,
          instagram: "#",
        },
        members: staticLead.teamMembers.map((m, idx) => ({
          id: `${teamId}-member-${idx}`,
          name: m.name,
          role: m.subRole || "Member",
          photoUrl: "",
        })),
      };
    }
    const leads = teamMembers.filter(
      (m) =>
        m.team?.toLowerCase() === teamId.toLowerCase() &&
        (m.role?.toLowerCase().includes("lead") ||
          m.subRole?.toLowerCase().includes("lead"))
    );
    const members = teamMembers.filter(
      (m) =>
        m.team?.toLowerCase() === teamId.toLowerCase() &&
        !m.role?.toLowerCase().includes("lead") &&
        !m.subRole?.toLowerCase().includes("lead")
    );
    return { lead: leads[0] || null, members };
  };

  const getCaptainData = () => {
    if (isUsingFallback) {
      return {
        name: teamData.captain.name,
        role: "Cloud Captain",
        bio: teamData.captain.tagline,
        photoUrl: "",
        socials: {
          linkedin: teamData.captain.socials.linkedin,
          github: teamData.captain.socials.github,
          instagram: "#",
        },
      };
    }
    const captain = teamMembers.find(
      (m) => m.role?.toLowerCase() === "captain"
    );
    if (!captain) return null;
    return {
      name: captain.name,
      role: "Cloud Captain",
      bio: captain.bio,
      photoUrl: captain.photoUrl,
      socials: {
        linkedin: captain.linkedin,
        github: captain.github,
        instagram: captain.instagram,
      },
    };
  };

  const facultyMembers = teamMembers.filter(
    (m) =>
      m.team?.toLowerCase() === "faculty" ||
      m.role?.toLowerCase().includes("advisor")
  );
  const captainData = getCaptainData();

  const handleToggleLead = (id: string) => {
    setSelectedTeamId((current) => (current === id ? null : id));
  };

  const handleOpenSubTeam = (id: string) => {
    setActiveSubTeamId(id);
    if (!isMobile) setIsSectionFlipped(true);
  };

  const handleCloseSubTeam = () => {
    setIsSectionFlipped(false);
    setActiveSubTeamId(null);
  };

  if (loading)
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="h-12 w-12 border-4 border-primary border-t-transparent rounded-full animate-spin" />
      </div>
    );

  const leftLeads = [teamCategories[0], teamCategories[1]];
  const centerLead = teamCategories[2];
  const rightLeads = [teamCategories[3], teamCategories[4]];

  return (
    <main className="min-h-screen bg-background relative overflow-x-hidden pt-[118px] pb-16 md:pb-32">
      <Antigravity />

      <style jsx global>{`
        @keyframes shimmer-violet {
          0% { background-position: -200% center; }
          100% { background-position: 200% center; }
        }
        .shimmer-text {
          background: linear-gradient(90deg, #fff 0%, #a78bfa 50%, #fff 100%);
          background-size: 200% auto;
          color: transparent;
          background-clip: text;
          -webkit-background-clip: text;
          animation: shimmer-violet 4s linear infinite;
        }
        /* hide scrollbar track on mobile carousel */
        .hide-scrollbar::-webkit-scrollbar { display: none; }
        .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 max-w-[1216px]">

        {/* ── HEADER ─────────────────────────────────────────── */}
        <div className="flex flex-col items-center text-center px-2 mb-4">
          <Reveal variant="fadeUp">
            <span className="text-primary font-black uppercase tracking-[0.4em] text-[10px] mb-1 block opacity-60">
              AWS Cloud Club VJIT
            </span>
          </Reveal>
          <h1 className="font-heading text-5xl sm:text-7xl md:text-8xl lg:text-[10rem] font-black text-text-primary uppercase mb-0 tracking-tighter leading-[0.85] shimmer-text">
            Our Team
          </h1>
        </div>

        {/* ── FACULTY ────────────────────────────────────────── */}
        {(facultyMembers.length > 0 || isUsingFallback) && (
          <section className="mb-14 md:mb-24 mt-0 pt-4">
            <Reveal delay={0.2}>
              <h2 className="font-heading text-xl sm:text-2xl md:text-3xl font-black text-center mb-8 md:mb-12 uppercase tracking-[0.3em] text-text-muted/20">
                Faculty & Advisors
              </h2>
            </Reveal>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 md:gap-8 max-w-5xl mx-auto px-2">
              {isUsingFallback ? (
                <>
                  <FacultyCard name="Dr. P. Venugopal Reddy" designation="Principal & Patron" department="VJIT" photoUrl="" delay={0.1} />
                  <FacultyCard name="Dr. A. Obulesu" designation="HOD - CSE" department="VJIT" photoUrl="" delay={0.2} />
                  <FacultyCard name="Mr. B. Rajesh" designation="Faculty Advisor" department="CSE" photoUrl="" delay={0.3} />
                </>
              ) : (
                facultyMembers.map((member, idx) => (
                  <FacultyCard
                    key={member.id}
                    name={member.name}
                    designation={member.designation || "Advisor"}
                    department={member.department || "VJIT"}
                    photoUrl={member.photoUrl}
                    delay={0.2 + idx * 0.1}
                  />
                ))
              )}
            </div>
          </section>
        )}

        {/* ── CAPTAIN ────────────────────────────────────────── */}
        {captainData && (
          <section className="mb-14 md:mb-40 flex flex-col items-center">
            <Reveal delay={0.2}>
              <h2 className="font-heading text-xl sm:text-2xl md:text-3xl font-black text-center mb-8 md:mb-12 uppercase tracking-[0.3em] text-text-muted/20">
                Cloud Captain
              </h2>
            </Reveal>
            <div className="w-full flex justify-center px-4 sm:px-8">
              <div className="w-full max-w-[260px] sm:max-w-xs">
                <CaptainCard
                  name={captainData.name || "Captain"}
                  role={captainData.role || "Cloud Captain"}
                  bio={captainData.bio || ""}
                  photoUrl={captainData.photoUrl || ""}
                  socials={captainData.socials || {}}
                />
              </div>
            </div>
          </section>
        )}

        {/* ── LEADS ──────────────────────────────────────────── */}
        <section className="relative pb-16 md:pb-40" ref={sectionRef}>
          <Reveal delay={0.2}>
            <h2 className="font-heading text-xl sm:text-2xl md:text-3xl font-black text-center mb-8 md:mb-16 uppercase tracking-[0.3em] text-text-muted/20">
              Leads of AWS Cloud Club of VJIT
            </h2>
          </Reveal>

          {/* ────────────────────────────────────────────────────
              MOBILE  (<lg): Plain vertical stack — no 3-D flip.
              "View Full Team" opens a fixed overlay modal.
          ──────────────────────────────────────────────────── */}
          <div className="lg:hidden flex flex-col gap-6 max-w-sm mx-auto">
            {teamCategories.map((cat) => (
              <CardDeck
                key={cat.id}
                teamName={cat.name}
                lead={getTeamData(cat.id).lead as any}
                isExpanded={selectedTeamId === cat.id}
                onToggle={() => handleToggleLead(cat.id)}
                onViewFullTeam={() => handleOpenSubTeam(cat.id)}
              />
            ))}
          </div>

          {/* ────────────────────────────────────────────────────
              DESKTOP (lg+): Cinematic 3-D section flip.
          ──────────────────────────────────────────────────── */}
          <div className="hidden lg:block" style={{ perspective: "2000px" }}>
            <motion.div
              animate={{ rotateY: isSectionFlipped ? 180 : 0 }}
              transition={{ type: "spring", stiffness: 100, damping: 20 }}
              style={{ transformStyle: "preserve-3d" }}
              className="w-full relative min-h-[850px]"
            >
              {/* FRONT: Dice-5 */}
              <div
                className="absolute inset-x-0 top-0"
                style={{ backfaceVisibility: "hidden" }}
              >
                <div className="flex justify-between items-center gap-8 xl:gap-12 max-w-6xl mx-auto px-4 py-8">
                  <div className="flex flex-col gap-12 xl:gap-16 w-72 xl:w-80">
                    {leftLeads.map((cat) => (
                      <CardDeck
                        key={cat.id}
                        teamName={cat.name}
                        lead={getTeamData(cat.id).lead as any}
                        isExpanded={selectedTeamId === cat.id}
                        onToggle={() => handleToggleLead(cat.id)}
                        onViewFullTeam={() => handleOpenSubTeam(cat.id)}
                      />
                    ))}
                  </div>
                  <div className="w-72 xl:w-80 translate-y-8">
                    <CardDeck
                      key={centerLead.id}
                      teamName={centerLead.name}
                      lead={getTeamData(centerLead.id).lead as any}
                      isExpanded={selectedTeamId === centerLead.id}
                      onToggle={() => handleToggleLead(centerLead.id)}
                      onViewFullTeam={() => handleOpenSubTeam(centerLead.id)}
                    />
                  </div>
                  <div className="flex flex-col gap-12 xl:gap-16 w-72 xl:w-80">
                    {rightLeads.map((cat) => (
                      <CardDeck
                        key={cat.id}
                        teamName={cat.name}
                        lead={getTeamData(cat.id).lead as any}
                        isExpanded={selectedTeamId === cat.id}
                        onToggle={() => handleToggleLead(cat.id)}
                        onViewFullTeam={() => handleOpenSubTeam(cat.id)}
                      />
                    ))}
                  </div>
                </div>
              </div>

              {/* BACK: TeamTree */}
              <div
                className="absolute inset-0 w-full h-full"
                style={{
                  backfaceVisibility: "hidden",
                  transform: "rotateY(180deg)",
                }}
              >
                {activeSubTeamId && !isMobile && (
                  <TeamTree
                    teamName={teamCategories.find((c) => c.id === activeSubTeamId)?.name || ""}
                    lead={getTeamData(activeSubTeamId).lead as any}
                    members={getTeamData(activeSubTeamId).members as any}
                    onClose={handleCloseSubTeam}
                  />
                )}
              </div>
            </motion.div>
          </div>
        </section>
      </div>

      {/* ── MOBILE TEAMTREE MODAL OVERLAY ──────────────────── */}
      <AnimatePresence>
        {isMobile && activeSubTeamId && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[200] flex items-end sm:items-center justify-center"
          >
            {/* backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={handleCloseSubTeam}
              className="absolute inset-0 bg-black/70 backdrop-blur-sm"
            />
            {/* sheet — slides up from bottom on mobile */}
            <motion.div
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="relative z-10 w-full h-[88vh] sm:h-[80vh] sm:max-w-lg sm:mx-4"
            >
              <TeamTree
                teamName={teamCategories.find((c) => c.id === activeSubTeamId)?.name || ""}
                lead={getTeamData(activeSubTeamId).lead as any}
                members={getTeamData(activeSubTeamId).members as any}
                onClose={handleCloseSubTeam}
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
