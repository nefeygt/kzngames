import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import type { ReactNode } from "react";
import { Logo } from "@/components/ui/logo";

export function LegalPage({ title, updated, children }: { title: string; updated: string; children: ReactNode }) {
  return (
    <div className="min-h-screen bg-void-950">
      <header className="border-b border-white/[0.06]">
        <div className="container flex h-16 items-center justify-between">
          <Logo />
          <Link href="/" className="inline-flex items-center gap-2 text-sm text-zinc-400 transition-colors hover:text-white">
            <ArrowLeft className="h-4 w-4" />
            Back to home
          </Link>
        </div>
      </header>
      <main className="container max-w-3xl py-16 sm:py-24">
        <p className="font-pixel text-[9px] uppercase tracking-wider text-arcade">Legal</p>
        <h1 className="mt-4 text-4xl font-semibold tracking-tight text-white sm:text-5xl">{title}</h1>
        <p className="mt-3 font-mono text-xs text-zinc-500">Last updated: {updated}</p>
        <article className="prose prose-invert mt-12 max-w-none prose-headings:tracking-tight prose-a:text-cyber prose-a:no-underline hover:prose-a:underline">
          {children}
        </article>
      </main>
    </div>
  );
}
