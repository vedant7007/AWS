"use client";

import { useEffect, useRef, useMemo } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import {
  Cloud,
  Zap,
  Database,
  Lock,
  Globe,
  Server,
  FolderOpen,
  Eye,
  Network,
  Shield,
} from "lucide-react";

const awsIcons = [
  { Icon: Cloud, label: "Cloud", size: 36, depth: 3 },
  { Icon: Zap, label: "Lambda", size: 28, depth: 1 },
  { Icon: Database, label: "DynamoDB", size: 26, depth: 2 },
  { Icon: Lock, label: "IAM", size: 22, depth: 1 },
  { Icon: Globe, label: "CloudFront", size: 32, depth: 3 },
  { Icon: Server, label: "EC2", size: 28, depth: 2 },
  { Icon: FolderOpen, label: "S3", size: 24, depth: 1 },
  { Icon: Eye, label: "CloudWatch", size: 22, depth: 2 },
  { Icon: Network, label: "VPC", size: 26, depth: 3 },
  { Icon: Shield, label: "Security", size: 24, depth: 1 },
];

function seededRandom(seed: number) {
  const x = Math.sin(seed) * 10000;
  return x - Math.floor(x);
}

function CloudBlob({ index, total }: { index: number; total: number }) {
  const seed = index * 137;
  const size = 120 + seededRandom(seed) * 200;
  const x = seededRandom(seed + 1) * 80 + 5;
  const y = seededRandom(seed + 2) * 70 + 10;
  const driftDuration = 20 + seededRandom(seed + 3) * 20;
  const driftX = 30 + seededRandom(seed + 4) * 40;
  const driftY = 20 + seededRandom(seed + 5) * 30;
  const delay = index * -(driftDuration / total);

  return (
    <motion.div
      className="absolute pointer-events-none"
      style={{
        width: size,
        height: size * 0.6,
        left: `${x}%`,
        top: `${y}%`,
        borderRadius: "50% 50% 50% 50% / 60% 60% 40% 40%",
        background:
          "radial-gradient(ellipse, var(--primary) 0%, transparent 70%)",
        opacity: 0.05 + seededRandom(seed + 6) * 0.06,
        filter: "blur(40px)",
        willChange: "transform",
      }}
      animate={{
        x: [0, driftX, -driftX * 0.6, driftX * 0.3, 0],
        y: [0, -driftY, driftY * 0.7, -driftY * 0.4, 0],
      }}
      transition={{
        duration: driftDuration,
        repeat: Infinity,
        ease: "easeInOut",
        delay,
      }}
    />
  );
}

function FloatingIcon({
  icon,
  index,
  springX,
  springY,
}: {
  icon: (typeof awsIcons)[number];
  index: number;
  springX: ReturnType<typeof useSpring>;
  springY: ReturnType<typeof useSpring>;
}) {
  const { Icon, size, depth } = icon;
  const seed = (index + 50) * 97;
  const x = seededRandom(seed) * 80 + 5;
  const y = seededRandom(seed + 1) * 70 + 10;
  const driftDuration = 15 + depth * 5 + seededRandom(seed + 2) * 10;

  return (
    <motion.div
      className="absolute pointer-events-none text-text-muted"
      style={{
        left: `${x}%`,
        top: `${y}%`,
        opacity: 0.08 + (3 - depth) * 0.04,
        willChange: "transform",
      }}
      animate={{
        x: [0, 20 * seededRandom(seed + 3), -15 * seededRandom(seed + 4), 0],
        y: [
          0,
          -25 * seededRandom(seed + 5),
          15 * seededRandom(seed + 6),
          0,
        ],
        rotate: [0, 5, -3, 0],
      }}
      transition={{
        duration: driftDuration,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    >
      <Icon style={{ width: size, height: size }} />
    </motion.div>
  );
}

function GradientOrb({ index }: { index: number }) {
  const seed = (index + 200) * 53;
  const size = 300 + seededRandom(seed) * 200;
  const x = seededRandom(seed + 1) * 60 + 15;
  const y = seededRandom(seed + 2) * 50 + 20;

  return (
    <motion.div
      className="absolute rounded-full pointer-events-none"
      style={{
        width: size,
        height: size,
        left: `${x}%`,
        top: `${y}%`,
        background:
          "radial-gradient(circle, var(--primary) 0%, transparent 70%)",
        opacity: 0.04,
        filter: "blur(60px)",
        willChange: "transform",
      }}
      animate={{ scale: [0.9, 1.1, 0.9] }}
      transition={{
        duration: 8 + index * 2,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    />
  );
}

export default function FloatingCloudBackground() {
  const containerRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, { stiffness: 50, damping: 30 });
  const springY = useSpring(mouseY, { stiffness: 50, damping: 30 });

  useEffect(() => {
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReduced) return;

    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      mouseX.set(e.clientX - rect.left - rect.width / 2);
      mouseY.set(e.clientY - rect.top - rect.height / 2);
    };

    const el = containerRef.current;
    el?.addEventListener("mousemove", handleMouseMove);
    return () => el?.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  const blobCount = 7;
  const iconSubset = useMemo(() => awsIcons.slice(0, 8), []);

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 overflow-hidden pointer-events-none"
    >
      {Array.from({ length: blobCount }).map((_, i) => (
        <CloudBlob key={`blob-${i}`} index={i} total={blobCount} />
      ))}

      {Array.from({ length: 3 }).map((_, i) => (
        <GradientOrb key={`orb-${i}`} index={i} />
      ))}

      {iconSubset.map((icon, i) => (
        <FloatingIcon
          key={`icon-${icon.label}`}
          icon={icon}
          index={i}
          springX={springX}
          springY={springY}
        />
      ))}
    </div>
  );
}
