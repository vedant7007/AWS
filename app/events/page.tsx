"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Calendar } from "lucide-react";
import { events } from "@/lib/data";
import { fadeUp } from "@/lib/animations";
import SectionHeader from "@/components/shared/SectionHeader";
import EventFilters from "@/components/events/EventFilters";
import FeaturedEvent from "@/components/events/FeaturedEvent";
import EventCard from "@/components/events/EventCard";
import RSVPModal from "@/components/events/RSVPModal";
import type { Event } from "@/lib/data";

export default function EventsPage() {
  const [filter, setFilter] = useState("All");
  const [rsvpEvent, setRsvpEvent] = useState<Event | null>(null);
  const [view, setView] = useState<"upcoming" | "past">("upcoming");

  const featured = events.find((e) => e.isFeatured);
  const filtered = events.filter((e) => {
    if (filter !== "All" && e.type !== filter) return false;
    if (view === "past") return e.isPast;
    return !e.isPast;
  });

  return (
    <div className="min-h-screen pt-24">
      <div className="mx-auto max-w-[1200px] px-6 py-16">
        <SectionHeader
          label="Events"
          title="Upcoming Events & Workshops"
          subtitle="Learn, build, and grow with our hands-on sessions"
        />

        {/* Featured Event */}
        {featured && !featured.isPast && (
          <FeaturedEvent event={featured} onRSVP={setRsvpEvent} />
        )}

        {/* Toggle */}
        <div className="mb-8 flex justify-center">
          <div className="inline-flex gap-1 rounded-xl border border-border bg-surface p-1">
            {(["upcoming", "past"] as const).map((v) => (
              <button
                key={v}
                onClick={() => setView(v)}
                className={`rounded-lg px-5 py-2 text-sm font-medium capitalize transition-all ${
                  view === v
                    ? "bg-primary text-text-on-primary shadow-sm"
                    : "text-text-muted hover:text-text-primary"
                }`}
              >
                {v}
              </button>
            ))}
          </div>
        </div>

        {/* Filters */}
        <EventFilters activeFilter={filter} onFilterChange={setFilter} />

        {/* Event Grid */}
        <motion.div
          className="grid gap-5 md:grid-cols-2 lg:grid-cols-3"
          layout
        >
          <AnimatePresence mode="popLayout">
            {filtered.map((event) => (
              <motion.div
                key={event.id}
                variants={fadeUp}
                initial="hidden"
                animate="visible"
                exit={{ opacity: 0, scale: 0.9 }}
                layout
              >
                <EventCard event={event} onRSVP={setRsvpEvent} />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {filtered.length === 0 && (
          <div className="flex flex-col items-center py-20 text-center">
            <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-surface">
              <Calendar className="h-8 w-8 text-text-muted" />
            </div>
            <p className="text-base font-medium text-text-secondary">
              No events found for this filter
            </p>
            <p className="mt-1 text-sm text-text-muted">
              Try selecting a different category or view
            </p>
          </div>
        )}
      </div>

      {/* RSVP Modal */}
      <RSVPModal event={rsvpEvent} onClose={() => setRsvpEvent(null)} />
    </div>
  );
}
