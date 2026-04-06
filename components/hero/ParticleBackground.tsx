"use client";

import { useEffect, useMemo, useState } from "react";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";
import type { ISourceOptions } from "@tsparticles/engine";
import { useTheme } from "@/components/providers/ThemeProvider";

const lightColors = {
  particles: ["rgba(108,63,197,0.5)", "rgba(232,133,12,0.35)", "rgba(108,63,197,0.15)"],
  links: "rgba(108,63,197,0.12)",
};

const darkColors = {
  particles: ["#9B6DFF", "#4DA6FF", "rgba(255,255,255,0.2)"],
  links: "rgba(155,109,255,0.12)",
};

export default function ParticleBackground() {
  const [init, setInit] = useState(false);
  const { resolvedTheme } = useTheme();

  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadSlim(engine);
    }).then(() => setInit(true));
  }, []);

  const colors = resolvedTheme === "dark" ? darkColors : lightColors;

  const options: ISourceOptions = useMemo(
    () => ({
      fullScreen: false,
      background: { color: { value: "transparent" } },
      fpsLimit: 60,
      particles: {
        color: {
          value: colors.particles,
        },
        links: {
          enable: true,
          color: colors.links,
          distance: 150,
          opacity: 0.2,
          width: 1,
        },
        move: {
          enable: true,
          speed: 0.5,
          direction: "none" as const,
          outModes: { default: "bounce" as const },
        },
        number: {
          value: 80,
          density: { enable: true },
        },
        opacity: {
          value: { min: 0.1, max: 0.5 },
        },
        size: {
          value: { min: 1, max: 3 },
        },
      },
      interactivity: {
        events: {
          onHover: {
            enable: true,
            mode: "grab",
          },
        },
        modes: {
          grab: {
            distance: 140,
            links: { opacity: 0.4 },
          },
        },
      },
      detectRetina: true,
    }),
    [colors]
  );

  if (!init) return null;

  return (
    <Particles
      id={`hero-particles-${resolvedTheme}`}
      key={resolvedTheme}
      className="absolute inset-0"
      options={options}
    />
  );
}
