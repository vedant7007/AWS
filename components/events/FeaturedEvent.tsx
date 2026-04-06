"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Calendar, Clock, MapPin, Users, Sparkles } from "lucide-react";
import type { Event } from "@/lib/data";
import MagneticButton from "@/components/shared/MagneticButton";

function useCountdown(targetDate: string) {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const target = new Date(targetDate).getTime();
    const tick = () => {
      const now = Date.now();
      const diff = Math.max(0, target - now);
      setTimeLeft({
        days: Math.floor(diff / (1000 * 60 * 60 * 24)),
        hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((diff / (1000 * 60)) % 60),
        seconds: Math.floor((diff / 1000) % 60),
      });
    };
    tick();
    const timer = setInterval(tick, 1000);
    return () => clearInterval(timer);
  }, [targetDate]);

  return timeLeft;
}

export default function FeaturedEvent({
  event,
  onRSVP,
}: {
  event: Event;
  onRSVP: (event: Event) => void;
}) {
  const countdown = useCountdown(event.date);
  const seatPercent = (event.registeredSeats / event.totalSeats) * 100;

  return (
    <motion.div
      className="gradient-border-card mb-12 overflow-hidden rounded-2xl bg-elevated p-8 md:p-10"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <div className="flex flex-col gap-8 md:flex-row md:items-start md:justify-between">
        <div className="flex-1">
          <span className="mb-3 inline-flex items-center gap-1.5 rounded-lg bg-primary/10 px-3 py-1 text-xs font-bold text-primary">
            <Sparkles className="h-3 w-3" />
            Featured Event
          </span>
          <h2 className="mb-3 font-heading text-2xl font-bold text-text-primary md:text-3xl">
            {event.title}
          </h2>
          <p className="mb-5 text-sm leading-relaxed text-text-secondary">{event.description}</p>
          <div className="mb-5 flex flex-wrap gap-4 text-sm text-text-muted">
            <span className="flex items-center gap-1.5">
              <Calendar className="h-4 w-4 text-primary/60" />
              {new Date(event.date).toLocaleDateString("en-US", {
                month: "long",
                day: "numeric",
                year: "numeric",
              })}
            </span>
            <span className="flex items-center gap-1.5">
              <Clock className="h-4 w-4 text-primary/60" />
              {event.time}
            </span>
            <span className="flex items-center gap-1.5">
              <MapPin className="h-4 w-4 text-primary/60" />
              {event.venue}
            </span>
          </div>

          {/* Seat counter */}
          <div className="mb-6">
            <div className="mb-2 flex items-center justify-between text-xs">
              <span className="flex items-center gap-1 text-text-muted">
                <Users className="h-3.5 w-3.5" />
                {event.registeredSeats}/{event.totalSeats} seats
              </span>
              <span className="font-bold text-primary">{Math.round(seatPercent)}% filled</span>
            </div>
            <div className="h-2 w-full overflow-hidden rounded-full bg-surface">
              <div
                className="h-full rounded-full bg-gradient-to-r from-primary to-primary-hover"
                style={{ width: `${seatPercent}%` }}
              />
            </div>
          </div>

          <MagneticButton
            onClick={() => onRSVP(event)}
            className="shimmer-btn rounded-xl bg-gradient-to-r from-primary to-primary-hover px-8 py-3 font-bold text-text-on-primary shadow-lg shadow-primary/20"
          >
            Register Now →
          </MagneticButton>
        </div>

        {/* Countdown */}
        <div className="flex gap-3 md:flex-col lg:flex-row">
          {Object.entries(countdown).map(([label, value]) => (
            <div
              key={label}
              className="flex flex-col items-center rounded-xl border border-border bg-surface/50 px-4 py-3 backdrop-blur-sm md:px-5 md:py-4"
            >
              <span className="font-mono text-2xl font-bold text-primary md:text-3xl">
                {String(value).padStart(2, "0")}
              </span>
              <span className="mt-0.5 text-[10px] font-semibold uppercase tracking-wider text-text-muted">
                {label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
