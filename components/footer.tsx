import { ArrowUpRight, Mail } from "lucide-react";
import { Logo } from "@/components/ui/logo";

const LINKS = [
  {
    title: "Studio",
    items: [
      { label: "Games", href: "#games" },
      { label: "Technology", href: "#technology" },
      { label: "Team", href: "#team" },
      { label: "Careers", href: "mailto:contact@kzngames.com?subject=Careers%20at%20KZN%20Games" },
    ],
  },
  {
    title: "Resources",
    items: [
      { label: "Press Kit", href: "mailto:contact@kzngames.com?subject=Press%20Kit%20Request" },
      { label: "Privacy Policy", href: "/privacy" },
      { label: "Terms", href: "/terms" },
      { label: "Early Access", href: "#waitlist" },
    ],
  },
];

export function Footer() {
  return (
    <footer id="about" className="relative border-t border-white/[0.06] bg-void-950">
      <div className="container py-16">
        <div className="grid gap-12 md:grid-cols-[1.5fr_1fr_1fr]">
          <div className="max-w-sm">
            <Logo />
            <p className="mt-5 text-sm leading-relaxed text-zinc-400">
              KZN Games is an independent mobile game studio building hybrid-casual and AR experiences powered by
              real-time adaptive AI — with the soul of the games we grew up on.
            </p>
            <a
              href="mailto:contact@kzngames.com"
              className="mt-6 inline-flex items-center gap-2 rounded-lg border border-white/[0.08] bg-white/[0.02] px-3.5 py-2 font-mono text-xs text-zinc-300 transition-colors hover:border-cyber/40 hover:text-cyber"
            >
              <Mail className="h-3.5 w-3.5" />
              contact@kzngames.com
            </a>
          </div>

          {LINKS.map((col) => (
            <nav key={col.title} aria-label={col.title}>
              <h3 className="font-pixel text-[9px] uppercase tracking-wider text-zinc-500">{col.title}</h3>
              <ul className="mt-5 space-y-3">
                {col.items.map((item) => (
                  <li key={item.label}>
                    <a
                      href={item.href}
                      className="group inline-flex items-center gap-1 text-sm text-zinc-400 transition-colors hover:text-white"
                    >
                      {item.label}
                      <ArrowUpRight className="h-3 w-3 opacity-0 transition-all group-hover:translate-x-0.5 group-hover:opacity-100" />
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        <div className="mt-16 flex flex-col items-center justify-between gap-4 border-t border-white/[0.06] pt-8 text-xs text-zinc-500 sm:flex-row">
          <p>© 2026 KZN Games Inc. All rights reserved.</p>
          <p className="flex items-center gap-2 font-mono">
            <span className="h-1.5 w-1.5 animate-pulse-dot rounded-full bg-emerald-400" />
            kzngames.com · All systems nominal
          </p>
        </div>
      </div>

      {/* oversized wordmark */}
      <div className="pointer-events-none select-none overflow-hidden" aria-hidden>
        <p className="translate-y-[30%] text-center text-[28vw] font-black leading-none tracking-tighter text-white/[0.025] lg:text-[22vw]">
          KZN
        </p>
      </div>
    </footer>
  );
}
