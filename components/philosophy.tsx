"use client";

import { motion } from "framer-motion";
import { PixelTag } from "@/components/ui/primitives";

const PRINCIPLES = [
  { k: "01", title: "Feel first", body: "If a mechanic isn't fun in the first ten seconds, no amount of tech can save it." },
  { k: "02", title: "Tech serves play", body: "AI and AR are tools for wonder — never gimmicks bolted onto a loop." },
  { k: "03", title: "Respect the player", body: "Fair progression, honest monetization, and worlds worth coming back to." },
];

export function Philosophy() {
  return (
    <section id="philosophy" className="relative border-y border-white/[0.06] bg-void-900/60 py-20 sm:py-24">
      <div className="container grid gap-12 lg:grid-cols-[1.2fr_1fr] lg:items-center lg:gap-20">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <PixelTag tone="violet" className="mb-6">
            Philosophy
          </PixelTag>
          <p className="text-balance text-2xl font-medium leading-snug tracking-tight text-zinc-200 sm:text-3xl lg:text-4xl">
            We grew up blowing dust out of cartridges. Now we build games with{" "}
            <span className="text-white">adaptive AI</span> and <span className="text-white">spatial computing</span> —
            but the goal hasn&apos;t changed: <span className="text-gradient-arcade">that pure, one-more-try joy.</span>
          </p>
          <p className="mt-6 font-mono text-xs uppercase tracking-[0.25em] text-zinc-500">
            Retro soul <span className="text-cyber">×</span> Next-gen tech
          </p>
        </motion.div>

        <ol className="grid gap-3">
          {PRINCIPLES.map((p, i) => (
            <motion.li
              key={p.k}
              initial={{ opacity: 0, x: 24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.6, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
              className="flex gap-4 rounded-2xl border border-white/[0.06] bg-white/[0.02] p-5 transition-colors hover:border-white/[0.12]"
            >
              <span className="font-pixel text-[10px] leading-6 text-arcade">{p.k}</span>
              <div>
                <h3 className="font-semibold text-white">{p.title}</h3>
                <p className="mt-1 text-sm leading-relaxed text-zinc-400">{p.body}</p>
              </div>
            </motion.li>
          ))}
        </ol>
      </div>
    </section>
  );
}
