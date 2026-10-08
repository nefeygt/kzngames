"use client";

import { motion } from "framer-motion";
import { Check, Copy, Mail } from "lucide-react";
import { useState } from "react";
import { PixelTag, SectionHeading, TiltCard } from "@/components/ui/primitives";

type Member = {
  name: string;
  role: string;
  email: string;
  bio: string;
  colors: [string, string];
  tag: string;
};

const TEAM: Member[] = [
  {
    name: "Efe Yigit",
    role: "Co-Founder & Technical Lead",
    email: "efe@kzngames.com",
    bio: "Specialized in systems engineering, gameplay infrastructure, and client-side architecture.",
    colors: ["#00f2fe", "#7928ca"],
    tag: "P1",
  },
  {
    name: "Kaan Demir",
    role: "Co-Founder & Head of Game Design",
    email: "kaan@kzngames.com",
    bio: "Focused on hybrid-casual game loops, neurochemical engagement triggers, and AR mechanics.",
    colors: ["#ffb547", "#ff3cac"],
    tag: "P2",
  },
  {
    name: "Zeynep Kaya",
    role: "Lead AI & Graphics Engineer",
    email: "zeynep@kzngames.com",
    bio: "Building procedural generation pipelines, shader optimization, and spatial mapping.",
    colors: ["#a855f7", "#00f2fe"],
    tag: "P3",
  },
  {
    name: "Nazim Arslan",
    role: "Head of Product & Growth",
    email: "nazim@kzngames.com",
    bio: "Driving user acquisition, live-ops frameworks, and community ecosystems.",
    colors: ["#34d399", "#00f2fe"],
    tag: "P4",
  },
];

function hash(str: string) {
  let h = 2166136261;
  for (let i = 0; i < str.length; i++) {
    h ^= str.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

/** Deterministic, symmetric 8-bit "space invader" style avatar with initials. */
function PixelAvatar({ name, colors }: { name: string; colors: [string, string] }) {
  const seed = hash(name);
  const size = 5;
  const cells: { x: number; y: number }[] = [];
  for (let y = 0; y < size; y++) {
    for (let x = 0; x < Math.ceil(size / 2); x++) {
      if ((seed >> (y * 3 + x)) & 1) {
        cells.push({ x, y });
        if (x !== size - 1 - x) cells.push({ x: size - 1 - x, y });
      }
    }
  }
  const initials = name
    .split(" ")
    .map((n) => n[0])
    .join("");
  const gid = `g-${seed}`;

  return (
    <svg viewBox="0 0 80 80" className="h-20 w-20" role="img" aria-label={`${name} avatar`}>
      <defs>
        <linearGradient id={gid} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor={colors[0]} />
          <stop offset="1" stopColor={colors[1]} />
        </linearGradient>
      </defs>
      <rect width="80" height="80" rx="18" fill="#181824" />
      <rect x="1" y="1" width="78" height="78" rx="17" fill="none" stroke={`url(#${gid})`} strokeOpacity="0.6" />
      <g opacity="0.22">
        {cells.map((c, i) => (
          <rect key={i} x={10 + c.x * 12} y={10 + c.y * 12} width="11" height="11" fill={`url(#${gid})`} />
        ))}
      </g>
      <text
        x="40"
        y="47"
        textAnchor="middle"
        fontSize="22"
        fontWeight="800"
        letterSpacing="1"
        fill={`url(#${gid})`}
        style={{ fontFamily: "var(--font-inter), sans-serif" }}
      >
        {initials}
      </text>
    </svg>
  );
}

function EmailButton({ email }: { email: string }) {
  const [copied, setCopied] = useState(false);

  async function copy() {
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
      setTimeout(() => setCopied(false), 1600);
    } catch {
      window.location.href = `mailto:${email}`;
    }
  }

  return (
    <div className="flex items-center gap-1.5">
      <a
        href={`mailto:${email}`}
        className="inline-flex min-w-0 flex-1 items-center gap-2 rounded-lg border border-white/[0.07] bg-white/[0.02] px-3 py-2 font-mono text-xs text-zinc-300 transition-colors hover:border-cyber/40 hover:text-cyber"
      >
        <Mail className="h-3.5 w-3.5 shrink-0" />
        <span className="truncate">{email}</span>
      </a>
      <button
        type="button"
        onClick={copy}
        className="grid h-[34px] w-[34px] shrink-0 place-items-center rounded-lg border border-white/[0.07] bg-white/[0.02] text-zinc-400 transition-colors hover:border-white/20 hover:text-white"
        aria-label={copied ? "Email copied" : `Copy ${email}`}
      >
        {copied ? <Check className="h-3.5 w-3.5 text-emerald-400" /> : <Copy className="h-3.5 w-3.5" />}
      </button>
    </div>
  );
}

export function Team() {
  return (
    <section id="team" className="relative py-24 sm:py-32">
      <div className="bg-grid absolute inset-0 -z-10 opacity-40 [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,black,transparent)]" />
      <div className="container">
        <SectionHeading
          eyebrow="Player Select"
          title="The Architects Behind KZN"
          description="A compact team of engineers and designers who grew up on arcades — and now build what comes next."
        />

        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {TEAM.map((m, i) => (
            <motion.div
              key={m.email}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.6, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
            >
              <TiltCard glow={`${m.colors[0]}22`} maxTilt={5} className="h-full">
                <article className="flex h-full flex-col rounded-2xl border border-white/[0.07] bg-void-900/80 p-6 transition-colors duration-300 group-hover:border-white/[0.14]">
                  <div className="flex items-start justify-between">
                    <div className="transition-transform duration-300 group-hover:-translate-y-1">
                      <PixelAvatar name={m.name} colors={m.colors} />
                    </div>
                    <PixelTag tone="zinc">{m.tag}</PixelTag>
                  </div>
                  <h3 className="mt-5 text-lg font-semibold tracking-tight text-white">{m.name}</h3>
                  <p className="mt-0.5 text-sm font-medium" style={{ color: m.colors[0] }}>
                    {m.role}
                  </p>
                  <p className="mt-3 text-sm leading-relaxed text-zinc-400">{m.bio}</p>
                  <div className="mt-auto pt-6">
                    <EmailButton email={m.email} />
                  </div>
                </article>
              </TiltCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
