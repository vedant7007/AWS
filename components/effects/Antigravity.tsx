"use client";

import { useEffect, useMemo, useState } from "react";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";
import type { ISourceOptions } from "@tsparticles/engine";
import { useTheme } from "@/components/providers/ThemeProvider";

export default function Antigravity() {
  const [init, setInit] = useState(false);
  const { resolvedTheme } = useTheme();

  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadSlim(engine);
    }).then(() => setInit(true));
  }, []);

  const options: ISourceOptions = useMemo(
    () => ({
      fullScreen: false,
      background: { color: { value: "transparent" } },
      fpsLimit: 60,
      particles: {
        number: {
          value: 40,
          density: { enable: true },
        },
        color: {
          value: resolvedTheme === "dark" ? ["#FF9900", "#4DA6FF", "#FFFFFF"] : ["#FF9900", "#6C3FC5", "#232F3E"],
        },
        shape: { type: "circle" },
        opacity: {
          value: { min: 0.1, max: 0.4 },
          animation: {
            enable: true,
            speed: 1,
            sync: false,
          },
        },
        size: {
          value: { min: 1, max: 4 },
          animation: {
            enable: true,
            speed: 2,
            sync: false,
          },
        },
        move: {
          enable: true,
          speed: { min: 0.5, max: 1.5 },
          direction: "top", // Upward movement for "Antigravity"
          random: true,
          straight: false,
          outModes: { default: "out" },
        },
        links: {
          enable: true,
          distance: 150,
          color: resolvedTheme === "dark" ? "#ffffff" : "#232F3E",
          opacity: 0.05,
          width: 1,
        },
      },
      interactivity: {
        events: {
          onHover: {
            enable: true,
            mode: "bubble",
          },
          onClick: {
            enable: true,
            mode: "repulse",
          },
        },
        modes: {
          bubble: {
            distance: 200,
            size: 6,
            duration: 2,
            opacity: 0.8,
          },
          repulse: {
            distance: 200,
            duration: 0.4,
          },
        },
      },
      detectRetina: true,
    }),
    [resolvedTheme]
  );

  if (!init) return null;

  return (
    <Particles
      id={`antigravity-particles-${resolvedTheme}`}
      key={resolvedTheme}
      className="absolute inset-0 z-0 pointer-events-none"
      options={options}
    />
  );
}
