"use client";

import { motion } from "framer-motion";
import { Check, Copy, Mail } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { PixelTag, SectionHeading, TiltCard } from "@/components/ui/primitives";

type Member = {
  name: string;
  role: string;
  email: string;
  bio: string;
  photo: string;
  accent: string;
  tag: string;
};

const TEAM: Member[] = [
  {
    name: "Tuğba Cebeci",
    role: "Co-Founder & Product Owner",
    email: "tugba@kzngames.com",
    bio: "Owns the product vision and roadmap, turning player insight into clear priorities for every KZN title.",
    photo: "/team/tugba-cebeci.jpg",
    accent: "#00f2fe",
    tag: "P1",
  },
  {
    name: "Nazım Yiğit",
    role: "Co-Founder & Business Development",
    email: "nazim@kzngames.com",
    bio: "Leads partnerships, publishing relationships, and the business strategy behind the studio's growth.",
    photo: "/team/nazim-yigit.jpg",
    accent: "#ffb547",
    tag: "P2",
  },
  {
    name: "Savaş Balta",
    role: "Game Developer & DevOps",
    email: "savas@kzngames.com",
    bio: "Builds gameplay systems and keeps the build, test, and release pipelines fast and reliable.",
    photo: "/team/savas-balta.jpg",
    accent: "#a855f7",
    tag: "P3",
  },
  {
    name: "İlhan Demirel",
    role: "Game Architect",
    email: "ilhan@kzngames.com",
    bio: "Designs the technical architecture of our games, from core loops and AI systems to AR runtime structure.",
    photo: "/team/ilhan-demirel.jpg",
    accent: "#34d399",
    tag: "P4",
  },
];

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
              <TiltCard glow={`${m.accent}22`} maxTilt={5} className="h-full">
                <article className="flex h-full flex-col overflow-hidden rounded-2xl border border-white/[0.07] bg-void-900/80 transition-colors duration-300 group-hover:border-white/[0.14]">
                  <div className="relative aspect-square overflow-hidden bg-void-800">
                    <Image
                      src={m.photo}
                      alt={`${m.name}, ${m.role}`}
                      fill
                      sizes="(min-width: 1280px) 300px, (min-width: 640px) 45vw, 90vw"
                      className="object-cover grayscale-[35%] transition-all duration-500 group-hover:scale-[1.03] group-hover:grayscale-0"
                    />
                    <div className="crt-lines pointer-events-none absolute inset-0 opacity-60" />
                    <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-void-900 to-transparent" />
                    <PixelTag tone="zinc" className="absolute right-4 top-4 bg-void-950/70 backdrop-blur">
                      {m.tag}
                    </PixelTag>
                    <span className="absolute bottom-0 left-0 h-[2px] w-full" style={{ background: m.accent }} />
                  </div>
                  <div className="flex flex-1 flex-col p-6">
                    <h3 className="text-lg font-semibold tracking-tight text-white">{m.name}</h3>
                    <p className="mt-0.5 text-sm font-medium" style={{ color: m.accent }}>
                      {m.role}
                    </p>
                    <p className="mt-3 text-sm leading-relaxed text-zinc-400">{m.bio}</p>
                    <div className="mt-auto pt-6">
                      <EmailButton email={m.email} />
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
