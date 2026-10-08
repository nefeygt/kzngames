"use client";

import { motion } from "framer-motion";
import { Castle, Music, Sparkles, type LucideIcon } from "lucide-react";
import { PixelTag, SectionHeading, TiltCard } from "@/components/ui/primitives";
import { cn } from "@/lib/utils";

type Game = {
  code: string;
  title: string;
  genre: string;
  status: string;
  statusTone: string;
  progress: number;
  description: string;
  icon: LucideIcon;
  cover: string;
  accent: string;
  glow: string;
  art: "chrono" | "pulse" | "realms";
};

const GAMES: Game[] = [
  {
    code: "KZN-001",
    title: "Project Chrono Clash",
    genre: "AR Tactical Tabletop",
    status: "Closed Beta",
    statusTone: "text-emerald-400 border-emerald-400/30 bg-emerald-400/10",
    progress: 78,
    description: "Augmented reality strategy bringing tabletop battlefields directly into your living room.",
    icon: Castle,
    cover: "from-violet-neon/50 via-void-800 to-void-900",
    accent: "text-violet-glow",
    glow: "rgba(168,85,247,0.18)",
    art: "chrono",
  },
  {
    code: "KZN-002",
    title: "RetroPulse: Overdrive",
    genre: "AI-Adaptive Hybrid Arcade",
    status: "In Development",
    statusTone: "text-cyber border-cyber/30 bg-cyber/10",
    progress: 52,
    description: "Synthwave endless runner featuring dynamically synthesized retro soundtracks and difficulty scaling.",
    icon: Music,
    cover: "from-[#ff3cac]/40 via-void-800 to-void-900",
    accent: "text-cyber",
    glow: "rgba(0,242,254,0.16)",
    art: "pulse",
  },
  {
    code: "KZN-003",
    title: "Pocket Realms",
    genre: "Casual Social Sim",
    status: "Concept Prototype",
    statusTone: "text-arcade border-arcade/30 bg-arcade/10",
    progress: 21,
    description: "Nostalgic pixel-art micro-worlds enriched with conversational on-device companions.",
    icon: Sparkles,
    cover: "from-arcade/40 via-void-800 to-void-900",
    accent: "text-arcade",
    glow: "rgba(255,181,71,0.16)",
    art: "realms",
  },
];

function CoverArt({ art }: { art: Game["art"] }) {
  if (art === "chrono") {
    return (
      <div className="absolute inset-0" aria-hidden>
        <div className="absolute inset-x-[-25%] bottom-[-30%] h-[120%] origin-bottom [transform:perspective(420px)_rotateX(58deg)]">
          <div className="grid h-full w-full grid-cols-8 grid-rows-8">
            {Array.from({ length: 64 }, (_, i) => (
              <span
                key={i}
                className={(Math.floor(i / 8) + i) % 2 === 0 ? "bg-white/[0.06]" : "bg-transparent"}
              />
            ))}
          </div>
        </div>
        {[
          { l: "28%", t: "48%", c: "bg-violet-glow", d: 0 },
          { l: "62%", t: "38%", c: "bg-cyber", d: 0.6 },
          { l: "46%", t: "62%", c: "bg-arcade", d: 1.2 },
        ].map((u) => (
          <motion.span
            key={u.l}
            className={cn("absolute h-4 w-4 rounded-sm shadow-[0_0_14px_currentColor]", u.c)}
            style={{ left: u.l, top: u.t }}
            animate={{ y: [0, -6, 0] }}
            transition={{ duration: 2.4, repeat: Infinity, delay: u.d, ease: "easeInOut" }}
          />
        ))}
      </div>
    );
  }
  if (art === "pulse") {
    return (
      <div className="absolute inset-0" aria-hidden>
        <div className="absolute left-1/2 top-[22%] h-20 w-20 -translate-x-1/2 rounded-full bg-gradient-to-b from-arcade to-[#ff3cac] [mask-image:repeating-linear-gradient(to_bottom,black_0_6px,transparent_6px_9px)]" />
        <div className="absolute inset-x-[-30%] bottom-[-20%] h-[70%] origin-bottom [transform:perspective(300px)_rotateX(65deg)]">
          <div className="bg-grid h-full w-full animate-[shimmer_3s_linear_infinite] [background-image:linear-gradient(to_right,rgba(255,60,172,0.5)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,60,172,0.5)_1px,transparent_1px)] [background-size:28px_28px]" />
        </div>
        <div className="absolute bottom-5 left-5 flex h-6 items-end gap-[3px]">
          {Array.from({ length: 14 }, (_, i) => (
            <motion.span
              key={i}
              className="w-[3px] rounded-full bg-cyber"
              animate={{ height: [4, 8 + ((i * 7) % 16), 4] }}
              transition={{ duration: 0.9, repeat: Infinity, delay: i * 0.07, ease: "easeInOut" }}
            />
          ))}
        </div>
      </div>
    );
  }
  return (
    <div className="absolute inset-0 grid place-items-center" aria-hidden>
      <motion.div
        className="relative"
        animate={{ y: [0, -8, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      >
        <div className="grid grid-cols-6 gap-[3px] [transform:rotateX(55deg)_rotateZ(45deg)]">
          {Array.from({ length: 36 }, (_, i) => {
            const water = [0, 1, 6, 30, 35, 29].includes(i);
            const tree = [8, 15, 21, 26].includes(i);
            return (
              <span
                key={i}
                className={cn(
                  "h-5 w-5",
                  water ? "bg-cyber/50" : tree ? "bg-emerald-500" : "bg-emerald-400/60",
                )}
              />
            );
          })}
        </div>
        <span className="absolute -right-8 -top-6 rounded-md border border-white/15 bg-void-800/90 px-2 py-1 font-mono text-[9px] text-zinc-200">
          hi friend! ✦
        </span>
      </motion.div>
    </div>
  );
}

export function Games() {
  return (
    <section id="games" className="relative py-24 sm:py-32">
      <div className="absolute right-0 top-1/4 -z-10 h-96 w-96 rounded-full bg-violet-neon/15 blur-[140px]" />
      <div className="container">
        <SectionHeading
          eyebrow="Game Pipeline"
          title={
            <>
              Three worlds. <span className="text-zinc-500">Currently loading.</span>
            </>
          }
          description="A first look at the titles in active production at KZN — from living-room battlefields to pocket-sized universes."
        />

        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {GAMES.map((g, i) => (
            <motion.div
              key={g.code}
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.7, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
              className={i === 2 ? "md:col-span-2 lg:col-span-1" : ""}
            >
              <TiltCard glow={g.glow} className="h-full">
                <article className="flex h-full flex-col overflow-hidden rounded-2xl border border-white/[0.07] bg-void-900 transition-all duration-300 group-hover:border-white/[0.15] group-hover:shadow-[0_30px_80px_-30px_rgba(0,0,0,0.9)]">
                  <div className={cn("relative h-52 overflow-hidden bg-gradient-to-b", g.cover)}>
                    <CoverArt art={g.art} />
                    <div className="crt-lines pointer-events-none absolute inset-0" />
                    <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-void-900 to-transparent" />
                    <div className="absolute left-4 top-4 flex items-center gap-2">
                      <PixelTag tone="zinc">{g.code}</PixelTag>
                    </div>
                    <span
                      className={cn(
                        "absolute right-4 top-4 inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 font-mono text-[10px] font-medium uppercase tracking-wider backdrop-blur",
                        g.statusTone,
                      )}
                    >
                      <span className="h-1.5 w-1.5 animate-pulse-dot rounded-full bg-current" />
                      {g.status}
                    </span>
                  </div>

                  <div className="flex flex-1 flex-col p-6">
                    <div className={cn("flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.16em]", g.accent)}>
                      <g.icon className="h-3.5 w-3.5" />
                      {g.genre}
                    </div>
                    <h3 className="mt-3 text-2xl font-semibold tracking-tight text-white">{g.title}</h3>
                    <p className="mt-2.5 text-sm leading-relaxed text-zinc-400">{g.description}</p>

                    <div className="mt-auto pt-6">
                      <div className="flex items-center justify-between font-mono text-[10px] uppercase tracking-wider text-zinc-500">
                        <span>Build progress</span>
                        <span className="text-zinc-300 tabular-nums">{g.progress}%</span>
                      </div>
                      <div className="mt-2 flex gap-[3px]" role="progressbar" aria-valuenow={g.progress} aria-valuemin={0} aria-valuemax={100} aria-label={`${g.title} build progress`}>
                        {Array.from({ length: 20 }, (_, s) => (
                          <span
                            key={s}
                            className={cn(
                              "h-2 flex-1",
                              s < Math.round(g.progress / 5) ? "bg-current " + g.accent : "bg-white/[0.06]",
                            )}
                          />
                        ))}
                      </div>
                    </div>
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
