import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import {
  Brain, Sparkles, Stars, ShieldCheck, Rocket, ArrowRight, Play,
  Lock, Crown, BookOpen, Info, LogIn, UserPlus
} from "lucide-react";

const fadeInUp = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
};

const cardVariants = {
  hidden: { opacity: 0, scale: 0.96 },
  show: { opacity: 1, scale: 1, transition: { duration: 0.5 } },
};

const glow = "before:absolute before:inset-0 before:rounded-2xl before:bg-gradient-to-br before:from-white/10 before:to-white/0 before:blur-2xl before:content-['']";

export default function Home() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-black/80 text-white selection:bg-white selection:text-black">
      {/* Top nav */}
      <header className="sticky top-0 z-40 bg-black/50 backdrop-blur supports-[backdrop-filter]:bg-black/40 border-b border-white/10">
        <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <button
            onClick={() => navigate("/")}
            className="flex items-center gap-3 group"
          >
            <div className="relative h-9 w-9 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center overflow-hidden">
              <Brain className="h-5 w-5 text-white/90" />
              <div className="absolute -inset-6 bg-gradient-to-tr from-white/10 to-transparent rotate-12" />
            </div>
            <span className="text-lg font-semibold tracking-tight">
              QuizForge<span className="text-white/50">.ai</span>
            </span>
          </button>

          <div className="flex items-center gap-2 max-md:gap-0">
            <button
              onClick={() => window.open("https://github.com/skabbuzaid", "_blank")}
              className="inline-flex items-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-4 py-2 text-sm hover:bg-white/10 transition-all active:scale-[.98]"
            >
              <LogIn className="h-4 w-4" /> GO To GitHub! <span className="max-md:hidden">, See My Idea's</span>
            </button>

          </div>
        </nav>
      </header>

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute -top-24 left-1/2 -translate-x-1/2 h-[32rem] w-[32rem] bg-gradient-to-b from-white/10 to-transparent rounded-full blur-3xl opacity-40" />
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20">
          <motion.div
            variants={fadeInUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="text-center"
          >
            <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs sm:text-sm mb-6">
              <Sparkles className="h-4 w-4" /> AI-integrated • Unlimited topics • Smooth UX
            </div>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight leading-tight">
              Level-up with quizzes that{" "}
              <span className="bg-gradient-to-r from-white to-white/40 bg-clip-text text-transparent">learn from you</span>
            </h1>
            <p className="mt-4 text-base sm:text-lg text-white/70 max-w-5xl mx-auto">
              Create quizzes on <em>any</em> topic. No limits. Clean UI, buttery animations, and results you can trust. They have a AI Integrated with it is GROQ_AI If you want other as ChatGPT or Cursor and Claude Buy the Prime At Only ₹140/month or <span className="text-blue-500">AT The Great Offer of the year 2025 the Year pack at Only ₹1000/year</span> <span className="text-xl text-amber-50">Prime Contains: Videos Solutions, Your Pdf's Quiz , 25 to 30 Questions , See your Learning with Score's</span>
            </p>

          </motion.div>
        </div>
        <div className="mt-8 flex items-center justify-center gap-3">
          <button
            onClick={() => navigate("/quiz")}
            className="inline-flex items-center w-50 justify-center gap-4 max-md:gap-0 rounded-2xl bg-white text-black px-5 py-3 text-sm font-semibold hover:bg-white/90 transition-all shadow-[0_10px_30px_-10px_rgba(255,255,255,.4)]"
          >
            <Play className="h-4 w-5" /> Start free
          </button>
          <button
            onClick={() => navigate("/docs/Info/ForIAmZaid/Information's")}
            className="inline-flex items-center w-50 justify-center gap-4 max-md:gap-0 rounded-2xl border border-white/10 bg-white/5 px-5 py-3 text-sm hover:bg-white/10 transition-all"
          >
            <Info className="h-5 w-6" /> More Info!
          </button>
        </div>
      </section>

      {/* Feature grid */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
          <FeatureCard icon={Stars} title="Unlimited Topics" desc="Ask anything. From MERN stack to Medieval history." />
          <FeatureCard icon={Rocket} title="Fast & Smooth" desc="Framer Motion animations, instant feedback." />
          <FeatureCard icon={ShieldCheck} title="Honest Results" desc="Explanations and confidence hints." />
          <FeatureCard icon={Sparkles} title="AI Powered" desc="Groq/OpenAI compatible back-end ready." />
        </div>
      </section>

      {/* Portfolio */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pb-6">
        <motion.h2 variants={fadeInUp} initial="hidden" whileInView="show" viewport={{ once: true }} className="text-2xl sm:text-3xl font-semibold tracking-tight">Built by Zaid</motion.h2>
        <p className="text-white/60 mt-2">A few things I shipped while learning full-stack and AI.</p>
        <div className="mt-6 grid md:grid-cols-3 gap-4 sm:gap-6">
          <ProjectCard
            title="Netflix Clone"
            tag="React + Vite"
            onClick={() => window.open("https://github.com/skabbuzaid/NetflixClone.jsx", "_blank")}
          />

          <ProjectCard
            title="Password Saver"
            tag="Next.js"
            onClick={() => window.open("https://github.com/skabbuzaid/NetflixClone.jsx", "_blank")}
          />

          <ProjectCard
            title="AI Quiz App"
            tag="React + Tailwind"
            onClick={() => window.open("https://github.com/skabbuzaid/NetflixClone.jsx", "_blank")}
          />

        </div>
      </section>

      {/* Learning hub */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pb-20">
        <motion.h3 variants={fadeInUp} initial="hidden" whileInView="show" viewport={{ once: true }} className="text-xl sm:text-2xl font-semibold tracking-tight flex items-center gap-2">
          <BookOpen className="h-5 w-5" /> Learn & Docs
        </motion.h3>
      <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
  <a
    href="https://groq.com/"
    target="_blank"
    rel="noopener noreferrer"
    className="text-amber-50"
  >
    <LinkTile
      title="AI API Keys"
      desc="Where to create and how to keep them safe."
    />
  </a>

  <a
    href="https://groq.com/"
    target="_blank"
    rel="noopener noreferrer"
    className="text-amber-50"
  >
    <LinkTile
      title="Groq API Key"
      desc="Setup guide and usage in the app."
    />
  </a>

  <a
    href="https://groq.com/"
    target="_blank"
    rel="noopener noreferrer"
    className="text-amber-50"
  >
    <LinkTile
      title="What AI adds to apps"
      desc="Use-cases, patterns, cost control."
    />
  </a>

  <LinkTile
    title="App Functionality"
    desc="How login, premium, and quizzes work."
    onClick={() =>
      navigate("/docs/Info/ForIAmZaid/Information's")
    }
  />
</div>

      </section>

      {/* Footer */}
      <footer className="border-t border-white/10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10 flex flex-col md:flex-row items-center justify-between gap-6">
          <p className="text-white/90 text-sm">© {new Date().getFullYear()} QuizForge.ai — Crafted by IAmZaid.</p>
          <div className="flex items-center gap-3">
            <button className="text-sm text-white/70 hover:text-white">Privacy</button>
            <button className="text-sm text-white/70 hover:text-white">Terms</button>
            <button className="text-sm text-white/70 hover:text-white flex items-center gap-2"><Info className="h-4 w-4" /> Support</button>
          </div>
        </div>
      </footer>
    </div>
  );
}

function FeatureCard({ icon: Icon, title, desc }) {
  return (
    <motion.div variants={cardVariants} initial="hidden" whileInView="show" viewport={{ once: true }}
      className={`relative rounded-2xl border border-white/10 bg-white/5 p-5 sm:p-6 ${glow}`}
    >
      <div className="flex items-start gap-4">
        <div className="h-11 w-11 rounded-xl bg-white/10 flex items-center justify-center">
          <Icon className="h-5 w-5" />
        </div>
        <div>
          <h4 className="font-semibold tracking-tight">{title}</h4>
          <p className="text-sm text-white/70 mt-1">{desc}</p>
        </div>
      </div>
    </motion.div>
  );
}

function ProjectCard({ title, tag, onClick }) {
  return (
    <button onClick={onClick} className={`group relative rounded-2xl border border-white/10 bg-white/5 p-5 sm:p-6 overflow-hidden ${glow}`}>
      <div className="absolute -inset-24 bg-gradient-to-tr from-white/0 via-white/5 to-white/0 opacity-0 group-hover:opacity-100 transition-opacity rotate-12" />
      <div className="flex items-center justify-between">
        <div>
          <h4 className="font-semibold tracking-tight">{title}</h4>
          <p className="text-xs text-white/60 mt-1">{tag}</p>
        </div>
        <ArrowRight className="h-4 w-4 text-white/60 group-hover:translate-x-1 transition-transform" />
      </div>
    </button>
  );
}

function LinkTile({ title, desc, onClick }) {
  return (
    <button onClick={onClick} className={`relative max-md:w-full rounded-2xl border border-white/10 bg-white/5 p-5 sm:p-6 hover:bg-white/10 transition ${glow}`}>
      <div className="flex items-start gap-3">
        <div className="h-9 w-9 rounded-xl bg-white/10 flex items-center justify-center">
          <BookOpen className="h-4 w-4" />
        </div>
        <div>
          <h5 className="font-medium tracking-tight">{title}</h5>
          <p className="text-sm text-white/70 mt-1">{desc}</p>
        </div>
      </div>
    </button>
  );
}
