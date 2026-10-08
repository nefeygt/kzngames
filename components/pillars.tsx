"use client";

import { motion } from "framer-motion";
import { BrainCircuit, Joystick, Layers, ScanLine } from "lucide-react";
import { PixelTag, SectionHeading, TiltCard } from "@/components/ui/primitives";
import { cn } from "@/lib/utils";

function NostalgiaVisual() {
  return (
    <div className="relative mt-8 flex h-36 items-end justify-center gap-3" aria-hidden>
      {["bg-arcade", "bg-cyber", "bg-violet-glow", "bg-[#ff3cac]"].map((c, i) => (
        <motion.span
          key={c}
          className={cn("h-10 w-10 rounded-full border-b-4 border-black/40 shadow-pixel sm:h-12 sm:w-12", c)}
          animate={{ y: [0, -14, 0] }}
          transition={{ duration: 1.6, repeat: Infinity, delay: i * 0.18, ease: "easeInOut" }}
        />
      ))}
      <span className="absolute bottom-[-6px] h-2 w-56 rounded-full bg-black/50 blur-md" />
    </div>
  );
}

function AIVisual() {
  const bars = [32, 48, 40, 64, 56, 78, 70, 88, 82, 94];
  return (
    <div className="mt-8 flex h-24 items-end gap-1.5" aria-hidden>
      {bars.map((h, i) => (
        <motion.span
          key={i}
          className="flex-1 rounded-sm bg-gradient-to-t from-cyber/20 to-cyber"
          initial={{ height: 6 }}
          whileInView={{ height: `${h}%` }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: i * 0.05, ease: [0.22, 1, 0.36, 1] }}
        />
      ))}
    </div>
  );
}

function ARVisual() {
  return (
    <div className="relative mt-8 h-24 overflow-hidden rounded-xl" aria-hidden>
      <div className="absolute inset-x-[-20%] bottom-[-40%] h-[180%] origin-bottom [transform:perspective(300px)_rotateX(60deg)]">
        <div className="bg-grid h-full w-full [background-size:22px_22px] [mask-image:linear-gradient(to_top,black,transparent)]" />
      </div>
      <motion.span
        className="absolute left-1/2 top-1/2 h-10 w-10 -translate-x-1/2 -translate-y-1/2 rounded-md border border-violet-glow bg-violet-neon/30 shadow-glow-violet"
        animate={{ rotate: [0, 90, 180, 270, 360] }}
        transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
      />
    </div>
  );
}

function HybridVisual() {
  return (
    <div className="mt-8 space-y-2.5 font-mono text-[11px]" aria-hidden>
      {[
        { label: "Tap to play", w: "w-[30%]", c: "from-arcade/40 to-arcade" },
        { label: "Meta progression", w: "w-[65%]", c: "from-violet-neon/40 to-violet-glow" },
        { label: "Long-term mastery", w: "w-[92%]", c: "from-cyber/40 to-cyber" },
      ].map((r) => (
        <div key={r.label}>
          <div className="mb-1 text-zinc-500">{r.label}</div>
          <div className="h-1.5 rounded-full bg-white/[0.05]">
            <div className={cn("h-full rounded-full bg-gradient-to-r", r.w, r.c)} />
          </div>
        </div>
      ))}
    </div>
  );
}

const PILLARS = [
  {
    icon: Joystick,
    tag: "P1 · CORE",
    tone: "amber" as const,
    title: "Nostalgic Core",
    body: "Rekindling pure arcade joy and childhood memories with modern tactile mechanics.",
    visual: NostalgiaVisual,
    span: "lg:col-span-2",
    glow: "rgba(255,181,71,0.14)",
    iconTone: "text-arcade",
  },
  {
    icon: BrainCircuit,
    tag: "P2 · AI",
    tone: "cyan" as const,
    title: "Real-Time Generative AI",
    body: "Procedural level pacing and responsive NPC behaviors tailored to player skill.",
    visual: AIVisual,
    span: "",
    glow: "rgba(0,242,254,0.14)",
    iconTone: "text-cyber",
  },
  {
    icon: ScanLine,
    tag: "P3 · AR",
    tone: "violet" as const,
    title: "Spatial AR Immersion",
    body: "Turning physical tabletops and real-world spaces into interactive multiplayer arenas.",
    visual: ARVisual,
    span: "",
    glow: "rgba(168,85,247,0.16)",
    iconTone: "text-violet-glow",
  },
  {
    icon: Layers,
    tag: "P4 · LOOP",
    tone: "zinc" as const,
    title: "Frictionless Hybrid-Casual",
    body: "Ultra-intuitive hyper-casual onboarding coupled with deep mid-core retention mechanics.",
    visual: HybridVisual,
    span: "lg:col-span-2",
    glow: "rgba(255,255,255,0.08)",
    iconTone: "text-zinc-200",
  },
];

export function Pillars() {
  return (
    <section id="technology" className="relative py-24 sm:py-32">
      <div className="absolute left-0 top-1/3 -z-10 h-96 w-96 rounded-full bg-cyber/10 blur-[120px]" />
      <div className="container">
        <SectionHeading
          eyebrow="Our DNA"
          title={
            <>
              Four pillars. <span className="text-zinc-500">One obsession with play.</span>
            </>
          }
          description="Every KZN title is built on the same foundation — technology that disappears behind the feeling of a great game."
        />

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {PILLARS.map((p, i) => (
            <motion.div
              key={p.title}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.6, delay: (i % 2) * 0.08, ease: [0.22, 1, 0.36, 1] }}
              className={cn("sm:col-span-1", p.span, p.span && "sm:col-span-2")}
            >
              <TiltCard glow={p.glow} maxTilt={4} className="h-full">
                <article className="flex h-full flex-col overflow-hidden rounded-2xl border border-white/[0.07] bg-void-900/80 p-6 transition-colors duration-300 group-hover:border-white/[0.14] sm:p-7">
                  <div className="flex items-start justify-between">
                    <span className="grid h-11 w-11 place-items-center rounded-xl border border-white/10 bg-void-800">
                      <p.icon className={cn("h-5 w-5", p.iconTone)} />
                    </span>
                    <PixelTag tone={p.tone}>{p.tag}</PixelTag>
                  </div>
                  <h3 className="mt-6 text-xl font-semibold tracking-tight text-white">{p.title}</h3>
                  <p className="mt-2 max-w-md text-sm leading-relaxed text-zinc-400">{p.body}</p>
                  <div className="mt-auto">
                    <p.visual />
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
