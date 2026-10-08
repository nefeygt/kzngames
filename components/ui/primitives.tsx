"use client";

import { motion, useMotionTemplate, useMotionValue, useSpring, useTransform } from "framer-motion";
import type { ReactNode, MouseEvent } from "react";
import { cn } from "@/lib/utils";

/** 8-bit style micro-tag with hard pixel shadow. */
export function PixelTag({
  children,
  tone = "cyan",
  className,
}: {
  children: ReactNode;
  tone?: "cyan" | "violet" | "amber" | "zinc";
  className?: string;
}) {
  const tones = {
    cyan: "border-cyber/50 bg-cyber/10 text-cyber",
    violet: "border-violet-glow/50 bg-violet-neon/15 text-violet-glow",
    amber: "border-arcade/50 bg-arcade/10 text-arcade",
    zinc: "border-white/15 bg-white/5 text-zinc-300",
  } as const;
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 border px-2 py-1 font-pixel text-[8px] uppercase leading-none tracking-wider shadow-pixel",
        tones[tone],
        className,
      )}
    >
      {children}
    </span>
  );
}

export function PulseDot({ className }: { className?: string }) {
  return (
    <span className={cn("relative flex h-2 w-2", className)} aria-hidden>
      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-current opacity-60" />
      <span className="relative inline-flex h-2 w-2 rounded-full bg-current" />
    </span>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "center",
}: {
  eyebrow: string;
  title: ReactNode;
  description?: ReactNode;
  align?: "center" | "left";
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className={cn("mb-14 max-w-2xl", align === "center" ? "mx-auto text-center" : "text-left")}
    >
      <PixelTag tone="amber" className="mb-5">
        {eyebrow}
      </PixelTag>
      <h2 className="text-balance text-3xl font-semibold tracking-tight text-white sm:text-4xl lg:text-5xl">{title}</h2>
      {description && <p className="mt-4 text-pretty text-base leading-relaxed text-zinc-400 sm:text-lg">{description}</p>}
    </motion.div>
  );
}

/**
 * Card that tilts toward the cursor and renders a radial spotlight under it.
 * Tilt is disabled for coarse pointers via the hover media query on the glow layer.
 */
export function TiltCard({
  children,
  className,
  glow = "rgba(0,242,254,0.14)",
  maxTilt = 8,
}: {
  children: ReactNode;
  className?: string;
  glow?: string;
  maxTilt?: number;
}) {
  const px = useMotionValue(0.5);
  const py = useMotionValue(0.5);
  const spring = { stiffness: 220, damping: 22, mass: 0.6 };
  const rotateX = useSpring(useTransform(py, [0, 1], [maxTilt, -maxTilt]), spring);
  const rotateY = useSpring(useTransform(px, [0, 1], [-maxTilt, maxTilt]), spring);
  const gx = useTransform(px, (v) => `${v * 100}%`);
  const gy = useTransform(py, (v) => `${v * 100}%`);
  const background = useMotionTemplate`radial-gradient(420px circle at ${gx} ${gy}, ${glow}, transparent 65%)`;

  function onMove(e: MouseEvent<HTMLDivElement>) {
    const r = e.currentTarget.getBoundingClientRect();
    px.set((e.clientX - r.left) / r.width);
    py.set((e.clientY - r.top) / r.height);
  }

  function onLeave() {
    px.set(0.5);
    py.set(0.5);
  }

  return (
    <motion.div
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      style={{ rotateX, rotateY, transformPerspective: 1000 }}
      className={cn("group relative rounded-2xl", className)}
    >
      <motion.div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-0 rounded-[inherit] opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{ background }}
      />
      <div className="relative z-10 h-full">{children}</div>
    </motion.div>
  );
}
