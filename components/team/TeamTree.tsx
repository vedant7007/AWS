"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { X } from "lucide-react";

interface TeamTreeProps {
  teamName: string;
  lead: {
    name: string;
    role: string;
    photoUrl: string;
  };
  members: Array<{
    id: string;
    name: string;
    subRole?: string;
    role?: string;
    photoUrl?: string;
  }>;
  onClose: () => void;
}

const TeamTree = ({ teamName, lead, members, onClose }: TeamTreeProps) => {
  return (
    /*
      Root: h-full + flex-col + overflow-hidden for border-radius clipping.
      The ONLY scroll container is the inner body div.
    */
    <div
      className="w-full h-full flex flex-col bg-surface/95 backdrop-blur-3xl
                  border border-primary/20
                  rounded-t-[1.5rem] sm:rounded-[2rem] md:rounded-[3rem]"
      style={{ overflow: "hidden" }}
    >
      {/* Drag handle — mobile only */}
      <div className="flex-shrink-0 flex justify-center pt-2 pb-0 sm:hidden pointer-events-none">
        <div className="w-8 h-1 rounded-full bg-primary/30" />
      </div>

      {/* Close button */}
      <div className="flex-shrink-0 flex justify-end px-4 pt-2 sm:px-6 sm:pt-3">
        <button
          onClick={onClose}
          className="p-2 rounded-full bg-surface border border-primary/20
                     hover:border-primary text-text-primary hover:text-primary transition-all"
        >
          <X className="h-4 w-4 sm:h-5 sm:w-5" />
        </button>
      </div>

      {/*
        SCROLLABLE BODY
        ───────────────
        Key CSS rules for reliable iOS + Android scroll:
          flex-1 min-h-0        → lets this div shrink inside a flex column
          overflow-y: scroll    → 'scroll' not 'auto' — more reliable on iOS Safari
          -webkit-overflow-scrolling: touch  → momentum scroll on iOS
          overscroll-behavior: contain       → prevents scroll chain to parent
          touch-action: pan-y               → tells browser to allow vertical swipe
      */}
      <div
        className="flex-1 min-h-0 px-4 sm:px-6 md:px-8 pb-6"
        style={{
          overflowY: "scroll",
          WebkitOverflowScrolling: "touch" as any,
          overscrollBehavior: "contain",
          touchAction: "pan-y",
        }}
      >
        {/* Title */}
        <div className="text-center mb-4 sm:mb-6">
          <span className="text-primary text-[9px] sm:text-[10px] font-black uppercase tracking-[0.4em] block mb-0.5">
            Team Expansion
          </span>
          <h3 className="text-xl sm:text-2xl md:text-3xl font-black uppercase tracking-tighter shimmer-text">
            {teamName} CORE
          </h3>
        </div>

        {/* Lead — centered */}
        {lead && (
          <div className="flex flex-col items-center mb-5 sm:mb-6">
            <div className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24
                            rounded-full overflow-hidden border-2 border-primary
                            ring-4 ring-primary/10 mb-2">
              <Image
                src={lead.photoUrl || "https://i.pravatar.cc/150?u=lead"}
                alt={lead.name}
                width={96}
                height={96}
                className="object-cover w-full h-full"
              />
            </div>
            <h4 className="text-sm sm:text-base md:text-lg font-black uppercase tracking-tight">
              {lead.name}
            </h4>
            <p className="text-primary text-[10px] sm:text-xs font-black uppercase tracking-widest">
              {lead.role}
            </p>
          </div>
        )}

        {/* Connector */}
        <div className="flex justify-center mb-3">
          <div className="w-px h-4 sm:h-6 bg-primary/30" />
        </div>

        {/* Members grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2 sm:gap-3">
          {members.map((member, idx) => (
            <motion.div
              key={member.id}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.04 }}
              className="p-2 sm:p-3 rounded-xl bg-surface border border-primary/5
                         hover:border-primary/20 transition-all"
            >
              <div className="flex flex-col items-center text-center gap-1">
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg overflow-hidden border border-primary/10">
                  <Image
                    src={member.photoUrl || `https://i.pravatar.cc/150?u=${member.name}`}
                    alt={member.name}
                    width={48}
                    height={48}
                    className="object-cover w-full h-full"
                  />
                </div>
                <h5 className="text-[9px] sm:text-[10px] font-bold uppercase tracking-tight leading-tight line-clamp-2 w-full">
                  {member.name}
                </h5>
                <p className="text-[8px] text-text-muted/50 uppercase tracking-wider font-medium leading-none">
                  {member.subRole || member.role || `#${idx + 1}`}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom spacer so last row isn't flush */}
        <div className="h-4" />
      </div>
    </div>
  );
};

export default TeamTree;
