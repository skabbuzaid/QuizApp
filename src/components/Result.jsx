import React from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import {
  Crown,
  CheckCircle2,
  ShieldCheck,
  Zap,
  Sparkles,
  Star,
} from "lucide-react";

/**
 * Results Component
 * - Black, modern glass UI
 * - Right: Result card with animated ring and actions
 * - Left: Prime upsell with features and QR/pay box
 * - Animated gradient blobs & micro-interactions
 *
 * Props:
 *  - score: number
 *  - total: number
 *  - onRestart: () => void
 *  - onBuyPrime?: () => void   // optional callback when clicking "Get Prime"
 */
export default function Results({ score = 0, total = 1, onRestart, onBuyPrime }) {
  const navigator = useNavigate();
  const percent = Math.round(((score || 0) / (total || 1)) * 100);

  return (
    <div className="relative min-h-[100dvh] w-full overflow-hidden bg-[#0a0a0b] text-gray-100">
      {/* Ambient animated blobs */}
      <motion.div
        aria-hidden
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 0.4, scale: 1 }}
        transition={{ duration: 1.2, ease: "easeOut" }}
        className="pointer-events-none absolute -top-40 -left-40 h-96 w-96 rounded-full blur-3xl"
        style={{
          background:
            "radial-gradient(45% 45% at 50% 50%, rgba(99,102,241,0.35) 0%, rgba(168,85,247,0.25) 45%, transparent 70%)",
        }}
      />
      <motion.div
        aria-hidden
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 0.35, scale: 1 }}
        transition={{ duration: 1.4, delay: 0.2, ease: "easeOut" }}
        className="pointer-events-none absolute -bottom-40 -right-40 h-[28rem] w-[28rem] rounded-full blur-3xl"
        style={{
          background:
            "radial-gradient(40% 40% at 50% 50%, rgba(244,63,94,0.30) 0%, rgba(234,179,8,0.20) 45%, transparent 70%)",
        }}
      />

      {/* Subtle grid overlay */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.06] [background-image:linear-gradient(rgba(255,255,255,.5)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.5)_1px,transparent_1px)] [background-size:32px_32px]"
      />

      <div className="relative mx-auto max-w-6xl px-4 py-10 sm:py-14 lg:py-16">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8 text-center"
        >
          <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/70 backdrop-blur">
            <Sparkles className="h-3.5 w-3.5" />
            <span>Great job finishing the quiz!</span>
          </div>
          <h2 className="mt-4 text-3xl font-extrabold tracking-tight sm:text-4xl">
            Quiz Completed
          </h2>
        </motion.div>

        {/* Main content grid */}
        <div className="grid items-stretch gap-6 md:grid-cols-2">
          {/* Left: Prime Upsell */}
          <motion.div
            initial={{ opacity: 0, x: -16 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.55 }}
            className="group relative"
          >
            {/* Glow border */}
            <div className="absolute -inset-[1px] rounded-2xl bg-gradient-to-br from-yellow-400/40 via-fuchsia-500/40 to-blue-500/40 opacity-0 blur-md transition-opacity duration-500 group-hover:opacity-100" />

            <div className="relative h-full rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl shadow-[0_10px_40px_-15px_rgba(0,0,0,0.7)]">
              <div className="mb-5 flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-yellow-400 to-amber-600 text-black shadow-inner">
                  <Crown className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="text-xl font-bold">Go <span className="text-yellow-300">Prime</span></h3>
                  <p className="text-sm text-white/70">Unlock advanced features for power learners.</p>
                </div>
              </div>

              <ul className="mb-6 space-y-3 text-sm">
                {[
                  { icon: ShieldCheck, text: "Detailed explanations & answer keys" },
                  { icon: Zap, text: "Adaptive difficulty & AI hints" },
                  { icon: Star, text: "Premium question sets & streaks" },
                  { icon: CheckCircle2, text: "Export results & shareable certificates" },
                ].map(({ icon: Icon, text }, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <div className="mt-0.5 flex h-6 w-6 flex-none items-center justify-center rounded-full bg-white/10">
                      <Icon className="h-4 w-4" />
                    </div>
                    <span className="text-white/90">{text}</span>
                  </li>
                ))}
              </ul>

              {/* Payment / QR box mock */}
              <div className="mb-5 rounded-xl border border-white/10 bg-black/60 p-4">
                <div className="mb-3 flex items-center justify-between">
                  <span className="text-sm text-white/70">Quick Pay</span>
                  <span className="rounded-full bg-white/10 px-2 py-0.5 text-[10px] uppercase tracking-wide text-white/60">Secure</span>
                </div>
                <div className="grid grid-cols-3 gap-3">
                  <div className="col-span-2 rounded-lg border border-white/10 bg-[conic-gradient(at_30%_30%,rgba(255,255,255,0.1),transparent_30%)] p-3 text-center">
                    <div className="mx-auto h-24 w-24 rounded-lg bg-gradient-to-br from-white/10 to-white/5 p-2">
                      <div className="h-full w-full bg-[linear-gradient(90deg,transparent_46%,white_46%,white_54%,transparent_54%),linear-gradient(transparent_46%,white_46%,white_54%,transparent_54%)] bg-[length:8px_8px]" />
                    </div>
                    <p className="mt-2 text-xs text-white/60">Scan QR to pay</p>
                  </div>
                  <div className="flex flex-col gap-2">
                    <button
                       onClick={() => window.open("https://github.com/skabbuzaid", "_blank")}
                      className="rounded-lg bg-gradient-to-br from-yellow-400 to-amber-600 px-3 py-2 text-sm font-semibold text-black shadow hover:brightness-110 active:scale-[0.99]"
                    >
                      Go, GitHub To Help.
                    </button>
                    <button onClick={()=>navigator("/docs/Info/ForIAmZaid/Information's")} className="rounded-lg border border-white/15 bg-white/5 px-3 py-2 text-xs text-white/80 hover:bg-white/10">
                      More Informations
                    </button>
                  </div>
                </div>
                <p className="mt-3 text-[11px] text-white/50">UPI / Cards / NetBanking supported.</p>
              </div>

              {/* Trust bar */}
              <div className="flex items-center gap-3 text-[11px] text-white/50">
                <ShieldCheck className="h-4 w-4" />
                <span>Encrypted payments · Cancel anytime</span>
              </div>
            </div>
          </motion.div>

          {/* Right: Result Card */}
          <motion.div
            initial={{ opacity: 0, x: 16 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.55, delay: 0.05 }}
            className="relative"
          >
            <div className="absolute -inset-[1px] rounded-2xl bg-gradient-to-br from-blue-500/30 via-fuchsia-500/30 to-pink-500/30 opacity-0 blur-md transition-opacity duration-500 hover:opacity-100" />

            <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl shadow-[0_10px_40px_-15px_rgba(0,0,0,0.7)]">
              <div className="mb-6 flex items-center justify-between">
                <h3 className="text-xl font-bold">Your Result</h3>
                <div className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/70">
                  {score} / {total}
                </div>
              </div>

              {/* Circular progress ring */}
              <div className="mx-auto mb-6 grid max-w-xs grid-cols-1 place-items-center">
                <div className="relative h-40 w-40">
                  <div
                    className="absolute inset-0 rounded-full"
                    style={{
                      background:
                        `conic-gradient(rgba(99,102,241,0.95) ${percent}%, rgba(255,255,255,0.08) 0)`,
                    }}
                  />
                  <div className="absolute inset-2 rounded-full bg-black/80 backdrop-blur" />
                  <motion.div
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ type: "spring", stiffness: 120, damping: 12 }}
                    className="absolute inset-0 grid place-items-center"
                  >
                    <div className="text-center">
                      <div className="text-4xl font-extrabold tracking-tight">{percent}%</div>
                      <div className="text-xs text-white/60">Accuracy</div>
                    </div>
                  </motion.div>
                </div>
              </div>

              <div className="mb-6 grid gap-3 sm:grid-cols-2">
                <Stat label="Correct" value={score} />
                <Stat label="Total" value={total} />
              </div>

              <div className="flex flex-wrap items-center justify-center">
                <motion.button
                  whileTap={{ scale: 0.98 }}
                  onClick={()=>navigator("/")}
                  className="inline-flex items-center justify-center rounded-lg bg-gradient-to-r from-indigo-600 via-fuchsia-600 to-rose-600 px-5 py-2 w-1/2 text-lg font-semibold shadow transition hover:brightness-110 focus:outline-none"
                >
                  Try Again
                </motion.button>

              </div>

              {/* Decorative gradient line */}
              <div className="mt-6 h-px w-full bg-gradient-to-r from-transparent via-white/20 to-transparent" />

              <p className="mt-4 text-sm text-amber-400/90">
                Tip: Upgrade to <span className="text-yellow-300">Prime</span> to get detailed breakdowns, topic-wise weak areas, and smart next-step recommendations.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

function Stat({ label, value }) {
  return (
    <div className="rounded-xl border border-white/10 bg-black/60 p-4">
      <div className="text-xs uppercase tracking-wider text-white/60">{label}</div>
      <div className="mt-1 text-2xl font-bold">{value}</div>
    </div>
  );
}