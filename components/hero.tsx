"use client";

import { motion } from "framer-motion";
import { ArrowRight, Gamepad2 } from "lucide-react";
import { HeroShowcase } from "@/components/hero-showcase";
import { PulseDot } from "@/components/ui/primitives";

const ease = [0.22, 1, 0.36, 1] as const;

function scrollToId(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
}

export function Hero() {
  return (
    <section id="top" className="relative isolate overflow-hidden pb-20 pt-32 sm:pt-36 lg:pb-32 lg:pt-44">
      {/* backdrop */}
      <div className="bg-grid absolute inset-0 -z-10 [mask-image:radial-gradient(ellipse_70%_60%_at_50%_0%,black,transparent)]" />
      <div className="absolute left-1/2 top-[-12rem] -z-10 h-[36rem] w-[56rem] -translate-x-1/2 rounded-full bg-violet-neon/25 blur-[140px]" />
      <div className="absolute right-[-10rem] top-40 -z-10 h-[24rem] w-[24rem] rounded-full bg-cyber/15 blur-[120px]" />

      <div className="container grid items-center gap-16 lg:grid-cols-[1.05fr_1fr] lg:gap-10">
        <div className="text-center lg:text-left">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease }}
            className="glass mx-auto inline-flex max-w-full items-center gap-2.5 rounded-full py-1.5 pl-2.5 pr-4 text-xs text-zinc-300 lg:mx-0"
          >
            <PulseDot className="text-cyber" />
            <span className="truncate">
              The Next Era of Mobile Gaming <span className="text-zinc-600">•</span>{" "}
              <span className="text-white">Powered by AI &amp; AR</span>
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.08, ease }}
            className="mt-7 text-balance text-[2.6rem] font-semibold leading-[1.04] tracking-[-0.035em] text-white sm:text-6xl xl:text-7xl"
          >
            Where Childhood <span className="text-gradient-arcade">Nostalgia</span> Meets{" "}
            <span className="text-gradient animate-shimmer">Next-Gen</span> Mobile Play.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.16, ease }}
            className="mx-auto mt-6 max-w-xl text-pretty text-base leading-relaxed text-zinc-400 sm:text-lg lg:mx-0"
          >
            KZN Games crafts deeply engaging hybrid-casual experiences and immersive AR worlds, powered by real-time
            adaptive AI systems to bring back the magic of classic gaming.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.24, ease }}
            className="mt-9 flex flex-col items-center gap-3 sm:flex-row sm:justify-center lg:justify-start"
          >
            <button
              type="button"
              onClick={() => scrollToId("waitlist")}
              className="group relative inline-flex w-full items-center justify-center gap-2 overflow-hidden rounded-xl bg-cyber px-6 py-3.5 text-sm font-semibold text-void-950 shadow-glow-cyan transition-transform duration-200 hover:-translate-y-0.5 active:translate-y-0 sm:w-auto"
            >
              <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/60 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
              <span className="relative">Join Early Access</span>
              <ArrowRight className="relative h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </button>
            <button
              type="button"
              onClick={() => scrollToId("games")}
              className="inline-flex w-full items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/[0.03] px-6 py-3.5 text-sm font-semibold text-white transition-colors hover:border-white/20 hover:bg-white/[0.06] sm:w-auto"
            >
              <Gamepad2 className="h-4 w-4 text-arcade" />
              Explore Games
            </button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="mt-10 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 font-mono text-[11px] uppercase tracking-[0.18em] text-zinc-500 lg:justify-start"
          >
            <span>iOS</span>
            <span className="h-1 w-1 bg-zinc-700" />
            <span>Android</span>
            <span className="h-1 w-1 bg-zinc-700" />
            <span>ARKit · ARCore</span>
            <span className="h-1 w-1 bg-zinc-700" />
            <span>On-device AI</span>
          </motion.div>
        </div>

        <HeroShowcase />
      </div>
    </section>
  );
}
