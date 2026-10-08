"use client";

import { AnimatePresence, motion } from "framer-motion";
import { AlertCircle, ArrowRight, ChevronDown, Loader2, Mail, X } from "lucide-react";
import { useEffect, useState, type FormEvent } from "react";
import { PixelTag } from "@/components/ui/primitives";
import { EMAIL_REGEX, cn } from "@/lib/utils";
import { PLATFORM_OPTIONS, type Platform } from "@/lib/waitlist";

type Status = "idle" | "loading" | "success" | "error";

export function Waitlist() {
  const [email, setEmail] = useState("");
  const [platform, setPlatform] = useState<Platform | "">("");
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState<string | null>(null);
  const [toast, setToast] = useState(false);

  useEffect(() => {
    if (!toast) return;
    const id = setTimeout(() => setToast(false), 5000);
    return () => clearTimeout(id);
  }, [toast]);

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);

    if (!EMAIL_REGEX.test(email.trim())) {
      setError("Please enter a valid email address.");
      setStatus("error");
      return;
    }
    if (!platform) {
      setError("Please choose a platform of interest.");
      setStatus("error");
      return;
    }

    setStatus("loading");
    try {
      const res = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email.trim(), platform }),
      });
      const data = (await res.json().catch(() => ({}))) as { error?: string };
      if (!res.ok) throw new Error(data.error ?? "Something went wrong. Please try again.");

      setStatus("success");
      setToast(true);
      setEmail("");
      setPlatform("");
    } catch (err) {
      setStatus("error");
      setError(err instanceof Error ? err.message : "Something went wrong. Please try again.");
    }
  }

  const loading = status === "loading";

  return (
    <section id="waitlist" className="relative py-24 sm:py-32">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="gradient-border relative overflow-hidden rounded-[28px] bg-void-900 px-5 py-14 sm:px-12 sm:py-20"
        >
          <div className="bg-grid absolute inset-0 opacity-60 [mask-image:radial-gradient(ellipse_60%_70%_at_50%_0%,black,transparent)]" />
          <div className="absolute -top-40 left-1/2 h-80 w-[40rem] -translate-x-1/2 rounded-full bg-cyber/20 blur-[120px]" />
          <div className="absolute -bottom-40 right-0 h-72 w-72 rounded-full bg-violet-neon/30 blur-[120px]" />

          <div className="relative mx-auto max-w-2xl text-center">
            <PixelTag tone="cyan" className="mb-6">
              <span className="h-1 w-1 animate-blink bg-cyber" />
              Insert coin to continue
            </PixelTag>
            <h2 className="text-balance text-3xl font-semibold tracking-tight text-white sm:text-5xl">
              Get early access to the <span className="text-gradient">next level.</span>
            </h2>
            <p className="mx-auto mt-4 max-w-lg text-pretty text-zinc-400 sm:text-lg">
              Join the whitelist for TestFlight and Android builds, or reach out about publishing and investment.
            </p>

            <form onSubmit={onSubmit} noValidate className="mx-auto mt-10 max-w-xl text-left">
              <div className="grid gap-3 sm:grid-cols-[1fr_auto]">
                <label className="group relative block">
                  <span className="sr-only">Email address</span>
                  <Mail className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-500 transition-colors group-focus-within:text-cyber" />
                  <input
                    type="email"
                    inputMode="email"
                    autoComplete="email"
                    placeholder="you@studio.com"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      if (status === "error") setStatus("idle");
                    }}
                    disabled={loading}
                    aria-invalid={status === "error" && !EMAIL_REGEX.test(email.trim())}
                    aria-describedby={error ? "waitlist-error" : undefined}
                    className="h-12 w-full rounded-xl border border-white/10 bg-void-950/80 pl-11 pr-4 text-sm text-white placeholder:text-zinc-600 outline-none transition-all focus:border-cyber/60 focus:bg-void-950 focus:shadow-[0_0_0_4px_rgba(0,242,254,0.12)] disabled:opacity-60"
                  />
                </label>

                <label className="relative block">
                  <span className="sr-only">Platform of interest</span>
                  <select
                    value={platform}
                    onChange={(e) => {
                      setPlatform(e.target.value as Platform | "");
                      if (status === "error") setStatus("idle");
                    }}
                    disabled={loading}
                    className={cn(
                      "h-12 w-full cursor-pointer appearance-none rounded-xl border border-white/10 bg-void-950/80 pl-4 pr-10 text-sm outline-none transition-all focus:border-cyber/60 focus:shadow-[0_0_0_4px_rgba(0,242,254,0.12)] disabled:opacity-60 sm:w-60",
                      platform ? "text-white" : "text-zinc-500",
                    )}
                  >
                    <option value="" disabled>
                      Platform of interest
                    </option>
                    {PLATFORM_OPTIONS.map((o) => (
                      <option key={o.value} value={o.value} className="bg-void-900 text-white">
                        {o.label}
                      </option>
                    ))}
                  </select>
                  <ChevronDown className="pointer-events-none absolute right-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-500" />
                </label>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="group relative mt-3 inline-flex h-12 w-full items-center justify-center gap-2 overflow-hidden rounded-xl bg-cyber text-sm font-semibold text-void-950 shadow-glow-cyan transition-all hover:-translate-y-0.5 active:translate-y-0 disabled:cursor-wait disabled:opacity-80 disabled:hover:translate-y-0"
              >
                <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/60 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
                {loading ? (
                  <>
                    <Loader2 className="relative h-4 w-4 animate-spin" />
                    <span className="relative">Joining…</span>
                  </>
                ) : (
                  <>
                    <span className="relative">Join Early Access</span>
                    <ArrowRight className="relative h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                  </>
                )}
              </button>

              <div className="min-h-[28px] pt-3" aria-live="polite">
                <AnimatePresence mode="wait">
                  {status === "error" && error && (
                    <motion.p
                      id="waitlist-error"
                      key={error}
                      initial={{ opacity: 0, y: -4 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      className="flex items-center gap-2 text-sm text-rose-400"
                    >
                      <AlertCircle className="h-4 w-4" />
                      {error}
                    </motion.p>
                  )}
                </AnimatePresence>
              </div>

              <p className="text-center font-mono text-[11px] text-zinc-600">
                No spam. Only build drops and studio news. Unsubscribe anytime.
              </p>
            </form>
          </div>
        </motion.div>
      </div>

      <AnimatePresence>
        {toast && (
          <motion.div
            role="status"
            initial={{ opacity: 0, y: 40, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.98 }}
            transition={{ type: "spring", stiffness: 380, damping: 28 }}
            className="fixed inset-x-4 bottom-6 z-[60] mx-auto max-w-md"
          >
            <div className="relative flex items-center gap-4 border-2 border-arcade bg-void-950 px-5 py-4 shadow-[6px_6px_0_0_#ff8a00,0_20px_60px_-10px_rgba(255,181,71,0.5)]">
              <span className="text-2xl" aria-hidden>
                🎮
              </span>
              <div className="min-w-0 flex-1">
                <p className="font-pixel text-[10px] uppercase leading-relaxed text-arcade">Player 1 ready</p>
                <p className="mt-1 text-sm text-white">You&apos;re on the whitelist! Check your inbox soon.</p>
              </div>
              <button
                type="button"
                onClick={() => setToast(false)}
                className="grid h-8 w-8 shrink-0 place-items-center text-zinc-500 hover:text-white"
                aria-label="Dismiss notification"
              >
                <X className="h-4 w-4" />
              </button>
              <motion.span
                className="absolute bottom-0 left-0 h-[3px] bg-arcade"
                initial={{ width: "100%" }}
                animate={{ width: "0%" }}
                transition={{ duration: 5, ease: "linear" }}
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
