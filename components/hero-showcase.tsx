"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { Activity, BrainCircuit, Cpu, Radar, Scan, Wifi } from "lucide-react";
import { useEffect, useState, type MouseEvent } from "react";
import { PixelTag } from "@/components/ui/primitives";

const SYSTEMS = [
  { icon: BrainCircuit, label: "AI Dynamic Generation", value: "Active", tone: "text-cyber" },
  { icon: Scan, label: "AR Spatial Mapping", value: "Online", tone: "text-violet-glow" },
  { icon: Activity, label: "Adaptive Loops", value: "60 FPS", tone: "text-arcade" },
];

// Deterministic pixel "terrain" so server and client render identically.
const TERRAIN = Array.from({ length: 12 * 7 }, (_, i) => {
  const x = i % 12;
  const y = Math.floor(i / 12);
  const h = Math.sin(x * 0.9) * 1.4 + Math.cos(x * 0.35) * 1.2 + 4;
  return y >= Math.round(h) ? (y === Math.round(h) ? 2 : 1) : 0;
});

function useLiveTelemetry() {
  const [t, setT] = useState({ fps: 60, latency: 12, difficulty: 0.62, anchors: 24 });
  useEffect(() => {
    const id = setInterval(() => {
      setT((p) => ({
        fps: Math.random() > 0.85 ? 59 : 60,
        latency: Math.max(8, Math.min(18, p.latency + Math.round((Math.random() - 0.5) * 4))),
        difficulty: Math.max(0.35, Math.min(0.92, p.difficulty + (Math.random() - 0.5) * 0.08)),
        anchors: Math.max(18, Math.min(32, p.anchors + Math.round((Math.random() - 0.5) * 3))),
      }));
    }, 1200);
    return () => clearInterval(id);
  }, []);
  return t;
}

export function HeroShowcase() {
  const t = useLiveTelemetry();
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const rotateY = useSpring(useTransform(mx, [-0.5, 0.5], [-10, 10]), { stiffness: 120, damping: 18 });
  const rotateX = useSpring(useTransform(my, [-0.5, 0.5], [8, -8]), { stiffness: 120, damping: 18 });

  function onMove(e: MouseEvent<HTMLDivElement>) {
    const r = e.currentTarget.getBoundingClientRect();
    mx.set((e.clientX - r.left) / r.width - 0.5);
    my.set((e.clientY - r.top) / r.height - 0.5);
  }

  return (
    <div
      className="relative mx-auto w-full max-w-[560px] [perspective:1400px]"
      onMouseMove={onMove}
      onMouseLeave={() => {
        mx.set(0);
        my.set(0);
      }}
    >
      {/* ambient glow */}
      <div className="absolute -inset-10 -z-10 rounded-full bg-[radial-gradient(closest-side,rgba(0,242,254,0.25),rgba(121,40,202,0.18)_55%,transparent)] blur-2xl" />

      <motion.div
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
        initial={{ opacity: 0, y: 40, rotateX: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
        className="gradient-border relative rounded-[28px] bg-void-900/80 p-3 shadow-[0_40px_120px_-30px_rgba(0,0,0,0.9)] backdrop-blur-xl"
      >
        {/* window chrome */}
        <div className="flex items-center justify-between px-2 pb-3 pt-1">
          <div className="flex gap-1.5">
            <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]/80" />
            <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]/80" />
            <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]/80" />
          </div>
          <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-zinc-500">kzn://runtime/live</span>
          <Wifi className="h-3.5 w-3.5 text-zinc-500" />
        </div>

        {/* viewport */}
        <div className="relative overflow-hidden rounded-[20px] border border-white/[0.07] bg-void-950">
          <div className="crt-lines pointer-events-none absolute inset-0 z-20" />
          <div className="pointer-events-none absolute inset-x-0 top-0 z-20 h-1/3 animate-scan bg-gradient-to-b from-transparent via-cyber/[0.06] to-transparent" />

          {/* top HUD */}
          <div className="relative z-10 flex items-center justify-between border-b border-white/[0.06] px-4 py-2.5">
            <PixelTag tone="cyan">
              <span className="h-1 w-1 animate-blink bg-cyber" /> LIVE
            </PixelTag>
            <div className="flex items-center gap-4 font-mono text-[10px] text-zinc-400">
              <span>
                FPS <span className="text-white tabular-nums">{t.fps}</span>
              </span>
              <span>
                LAT <span className="text-white tabular-nums">{t.latency}ms</span>
              </span>
              <span className="hidden sm:inline">
                SCORE <span className="text-arcade tabular-nums">048,210</span>
              </span>
            </div>
          </div>

          {/* game scene */}
          <div className="relative h-56 overflow-hidden sm:h-64">
            {/* AR perspective floor */}
            <div className="absolute inset-x-[-30%] bottom-[-10%] h-[85%] origin-bottom [transform:perspective(500px)_rotateX(62deg)]">
              <div className="bg-grid h-full w-full opacity-70 [background-size:32px_32px] [mask-image:linear-gradient(to_top,black,transparent)]" />
            </div>

            {/* pixel terrain */}
            <div className="absolute bottom-6 left-1/2 grid -translate-x-1/2 grid-cols-12 gap-[2px]" aria-hidden>
              {TERRAIN.map((v, i) => (
                <span
                  key={i}
                  className={
                    v === 2
                      ? "h-3.5 w-3.5 bg-cyber/80 shadow-[0_0_8px_rgba(0,242,254,0.7)] sm:h-4 sm:w-4"
                      : v === 1
                        ? "h-3.5 w-3.5 bg-violet-neon/40 sm:h-4 sm:w-4"
                        : "h-3.5 w-3.5 sm:h-4 sm:w-4"
                  }
                />
              ))}
            </div>

            {/* player sprite */}
            <motion.div
              className="absolute bottom-[118px] left-[30%] sm:bottom-[132px]"
              animate={{ x: [0, 120, 40, 0], y: [0, -26, 0, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              aria-hidden
            >
              <div className="grid grid-cols-3 gap-[2px]">
                {[0, 1, 0, 1, 1, 1, 1, 0, 1].map((on, i) => (
                  <span key={i} className={on ? "h-2 w-2 bg-arcade shadow-[0_0_6px_rgba(255,181,71,0.9)]" : "h-2 w-2"} />
                ))}
              </div>
            </motion.div>

            {/* AR anchor reticle */}
            <motion.div
              className="absolute right-[18%] top-[22%] grid h-14 w-14 place-items-center"
              animate={{ scale: [1, 1.08, 1], rotate: [0, 90, 90, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
              aria-hidden
            >
              <span className="absolute left-0 top-0 h-3 w-3 border-l-2 border-t-2 border-violet-glow" />
              <span className="absolute right-0 top-0 h-3 w-3 border-r-2 border-t-2 border-violet-glow" />
              <span className="absolute bottom-0 left-0 h-3 w-3 border-b-2 border-l-2 border-violet-glow" />
              <span className="absolute bottom-0 right-0 h-3 w-3 border-b-2 border-r-2 border-violet-glow" />
              <span className="absolute inset-1.5 rounded-sm border border-violet-glow/25" />
              <span className="h-1.5 w-1.5 rounded-full bg-violet-glow shadow-[0_0_10px_#a855f7]" />
            </motion.div>

            {/* floating NPC dialogue */}
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: [0, 1, 1, 0], y: [8, 0, 0, -4] }}
              transition={{ duration: 5, repeat: Infinity, repeatDelay: 1.5 }}
              className="absolute left-4 top-4 max-w-[180px] rounded-lg border border-white/10 bg-void-800/90 px-3 py-2 font-mono text-[10px] leading-snug text-zinc-300"
            >
              <span className="text-cyber">NPC_07 ›</span> You&apos;re getting faster. Let&apos;s raise the stakes.
            </motion.div>
          </div>

          {/* bottom telemetry */}
          <div className="relative z-10 grid grid-cols-3 border-t border-white/[0.06] font-mono text-[10px]">
            <div className="border-r border-white/[0.06] px-3 py-2.5">
              <div className="text-zinc-500">DIFFICULTY</div>
              <div className="mt-1.5 h-1 overflow-hidden rounded-full bg-white/[0.06]">
                <motion.div
                  className="h-full rounded-full bg-gradient-to-r from-cyber to-violet-glow"
                  animate={{ width: `${Math.round(t.difficulty * 100)}%` }}
                  transition={{ duration: 0.8 }}
                />
              </div>
            </div>
            <div className="border-r border-white/[0.06] px-3 py-2.5">
              <div className="text-zinc-500">AR ANCHORS</div>
              <div className="mt-0.5 text-white tabular-nums">{t.anchors} mapped</div>
            </div>
            <div className="px-3 py-2.5">
              <div className="text-zinc-500">AI MODEL</div>
              <div className="mt-0.5 text-white">on-device</div>
            </div>
          </div>
        </div>

        {/* system status list */}
        <ul className="mt-3 grid gap-2 sm:grid-cols-3">
          {SYSTEMS.map(({ icon: Icon, label, value, tone }) => (
            <li key={label} className="flex items-center gap-2.5 rounded-xl border border-white/[0.06] bg-white/[0.02] px-3 py-2.5">
              <Icon className={`h-4 w-4 shrink-0 ${tone}`} />
              <div className="min-w-0">
                <div className="truncate text-[11px] text-zinc-500">{label}</div>
                <div className={`flex items-center gap-1.5 font-mono text-xs font-medium ${tone}`}>
                  <span className="h-1.5 w-1.5 animate-pulse-dot rounded-full bg-current" />
                  {value}
                </div>
              </div>
            </li>
          ))}
        </ul>
      </motion.div>

      {/* floating chips */}
      <motion.div
        className="glass absolute -left-4 top-24 hidden items-center gap-2 rounded-xl px-3 py-2 shadow-glow-violet md:flex xl:-left-12"
        animate={{ y: [0, -10, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
      >
        <Radar className="h-4 w-4 text-violet-glow" />
        <span className="font-mono text-[11px] text-zinc-300">Plane detected · 2.4m²</span>
      </motion.div>
      <motion.div
        className="glass absolute -right-4 bottom-28 hidden items-center gap-2 rounded-xl px-3 py-2 shadow-glow-cyan md:flex xl:-right-10"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 1 }}
      >
        <Cpu className="h-4 w-4 text-cyber" />
        <span className="font-mono text-[11px] text-zinc-300">Level seed regenerated</span>
      </motion.div>
    </div>
  );
}
