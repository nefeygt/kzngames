import { Gamepad2 } from "lucide-react";
import { cn } from "@/lib/utils";

export function Logo({ className }: { className?: string }) {
  return (
    <a href="#top" className={cn("group inline-flex items-center gap-2.5", className)} aria-label="KZN Games home">
      <span className="relative grid h-9 w-9 place-items-center rounded-xl border border-white/10 bg-void-800">
        <span className="absolute inset-0 rounded-xl bg-brand-gradient opacity-20 blur-md transition-opacity duration-300 group-hover:opacity-60" />
        <Gamepad2 className="relative h-[18px] w-[18px] text-cyber" strokeWidth={2.2} />
        <span className="absolute -right-0.5 -top-0.5 h-1.5 w-1.5 bg-arcade" />
      </span>
      <span className="flex items-baseline gap-1.5">
        <span className="text-lg font-black tracking-[0.18em] text-white">KZN</span>
        <span className="font-mono text-[11px] uppercase tracking-[0.25em] text-zinc-500">Games</span>
      </span>
    </a>
  );
}
