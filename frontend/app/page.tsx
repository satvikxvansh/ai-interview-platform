"use client";

import { useEffect, useRef, useState } from "react";

// ─── Minimal icon components (no external dep needed) ───────────────────────
const IconSpark = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
    <path d="M8 1L9.5 6.5H15L10.5 10L12 15.5L8 12.5L4 15.5L5.5 10L1 6.5H6.5L8 1Z"
      stroke="currentColor" strokeWidth="1.2" strokeLinejoin="round" />
  </svg>
);
const IconArrow = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
    <path d="M3 8H13M9 4L13 8L9 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);
const IconCheck = () => (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
    <path d="M2.5 7L5.5 10L11.5 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);
const IconBrain = () => (
  <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
    <path d="M8 3C5.5 3 3 5 3 8C3 9.5 3.5 10.5 4.5 11.5C3.5 12 3 13 3 14C3 16.5 5 18 7.5 18H14.5C17 18 19 16.5 19 14C19 13 18.5 12 17.5 11.5C18.5 10.5 19 9.5 19 8C19 5 16.5 3 14 3C13 3 12 3.5 11 4.5C10 3.5 9 3 8 3Z"
      stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round" />
    <path d="M11 4.5V18M7 10H15M8 14H14" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
  </svg>
);
const IconCode = () => (
  <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
    <path d="M8 7L3 11L8 15M14 7L19 11L14 15" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M12.5 5L9.5 17" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
  </svg>
);
const IconMic = () => (
  <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
    <rect x="8" y="3" width="6" height="10" rx="3" stroke="currentColor" strokeWidth="1.3" />
    <path d="M5 11C5 14.3 7.7 17 11 17C14.3 17 17 14.3 17 11" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
    <path d="M11 17V20M8 20H14" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
  </svg>
);
const IconChart = () => (
  <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
    <path d="M3 18L8 12L12 15L19 6" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
    <circle cx="19" cy="6" r="2" stroke="currentColor" strokeWidth="1.2" />
  </svg>
);
const IconShield = () => (
  <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
    <path d="M11 3L4 6V11C4 15 7 18.5 11 19.5C15 18.5 18 15 18 11V6L11 3Z"
      stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round" />
    <path d="M8 11L10 13L14 9" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

// ─── Noise texture overlay via CSS ──────────────────────────────────────────
const NoiseOverlay = () => (
  <div
    className="pointer-events-none fixed inset-0 z-50 opacity-[0.025]"
    style={{
      backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
      backgroundRepeat: "repeat",
      backgroundSize: "128px 128px",
    }}
  />
);

// ─── Animated counter ────────────────────────────────────────────────────────
function AnimatedStat({ value, suffix = "", label }: { value: number; suffix?: string; label: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !started.current) {
        started.current = true;
        let start = 0;
        const step = Math.ceil(value / 60);
        const id = setInterval(() => {
          start = Math.min(start + step, value);
          setCount(start);
          if (start >= value) clearInterval(id);
        }, 18);
      }
    }, { threshold: 0.5 });
    obs.observe(el);
    return () => obs.disconnect();
  }, [value]);

  return (
    <div ref={ref} className="flex flex-col gap-1">
      <span className="font-display text-4xl font-bold tracking-tight text-white">
        {count.toLocaleString()}{suffix}
      </span>
      <span className="text-sm text-neutral-500 font-mono uppercase tracking-widest">{label}</span>
    </div>
  );
}

// ─── Feature card ────────────────────────────────────────────────────────────
function FeatureCard({ icon, title, desc, accent }: { icon: React.ReactNode; title: string; desc: string; accent: string }) {
  return (
    <div className="group relative rounded-2xl border border-white/[0.06] bg-white/[0.02] p-6 transition-all duration-500 hover:border-white/[0.12] hover:bg-white/[0.04]">
      <div className={`mb-4 inline-flex items-center justify-center rounded-xl border p-2.5 ${accent}`}>
        {icon}
      </div>
      <h3 className="mb-2 font-display text-lg font-semibold text-white">{title}</h3>
      <p className="text-sm leading-relaxed text-neutral-500">{desc}</p>
      <div className="absolute inset-x-0 bottom-0 h-px rounded-b-2xl bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
    </div>
  );
}

// ─── Pricing card ────────────────────────────────────────────────────────────
function PricingCard({
  plan, price, period, features, highlight, badge
}: {
  plan: string; price: string; period: string;
  features: string[]; highlight?: boolean; badge?: string;
}) {
  return (
    <div className={`relative flex flex-col rounded-2xl border p-7 transition-all duration-300 ${highlight
      ? "border-[#5EEAD4]/40 bg-[#5EEAD4]/[0.04] shadow-[0_0_60px_-15px_rgba(94,234,212,0.2)]"
      : "border-white/[0.07] bg-white/[0.02] hover:border-white/[0.12]"
      }`}>
      {badge && (
        <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full border border-[#5EEAD4]/30 bg-[#0d1a18] px-3 py-0.5 text-xs font-mono text-[#5EEAD4] tracking-wider">
          {badge}
        </span>
      )}
      <div className="mb-6">
        <p className="mb-1 font-mono text-xs uppercase tracking-[0.2em] text-neutral-500">{plan}</p>
        <div className="flex items-end gap-1">
          <span className="font-display text-4xl font-bold text-white">{price}</span>
          <span className="mb-1 text-sm text-neutral-500">{period}</span>
        </div>
      </div>
      <ul className="mb-8 flex flex-col gap-3">
        {features.map((f) => (
          <li key={f} className="flex items-center gap-2.5 text-sm text-neutral-400">
            <span className={`flex-shrink-0 rounded-full p-0.5 ${highlight ? "text-[#5EEAD4]" : "text-neutral-500"}`}>
              <IconCheck />
            </span>
            {f}
          </li>
        ))}
      </ul>
      <button className={`mt-auto rounded-xl py-3 text-sm font-medium transition-all duration-200 ${highlight
        ? "bg-[#5EEAD4] text-[#050e0d] hover:bg-[#7FF0DC] hover:shadow-[0_0_24px_rgba(94,234,212,0.4)]"
        : "border border-white/10 text-white hover:border-white/20 hover:bg-white/5"
        }`}>
        Get started
      </button>
    </div>
  );
}

// ─── Testimonial card ────────────────────────────────────────────────────────
function TestimonialCard({ quote, name, role, company }: { quote: string; name: string; role: string; company: string }) {
  return (
    <div className="flex flex-col rounded-2xl border border-white/[0.06] bg-white/[0.02] p-6">
      <p className="mb-5 text-sm leading-relaxed text-neutral-400">&ldquo;{quote}&rdquo;</p>
      <div className="mt-auto flex items-center gap-3">
        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-white/5 text-xs font-semibold text-neutral-300 border border-white/10">
          {name[0]}
        </div>
        <div>
          <p className="text-sm font-medium text-white">{name}</p>
          <p className="text-xs text-neutral-500">{role} · {company}</p>
        </div>
      </div>
    </div>
  );
}

// ════════════════════════════════════════════════════════════════════════════
// PAGE
// ════════════════════════════════════════════════════════════════════════════
export default function LandingPage() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      {/* ── Global styles injected via style tag ── */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;500;600;700;800&family=DM+Mono:wght@300;400;500&family=DM+Sans:ital,wght@0,300;0,400;0,500;1,300&display=swap');

        :root {
          --accent: #5EEAD4;
          --accent-dim: rgba(94,234,212,0.12);
          --bg: #070c0b;
        }

        * { box-sizing: border-box; }
        html { scroll-behavior: smooth; }
        body { background: var(--bg); color: #e5e5e5; }

        .font-display { font-family: 'Syne', sans-serif; }
        .font-mono { font-family: 'DM Mono', monospace; }
        .font-body { font-family: 'DM Sans', sans-serif; }

        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(24px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to   { opacity: 1; }
        }
        @keyframes gradientShift {
          0%, 100% { background-position: 0% 50%; }
          50%       { background-position: 100% 50%; }
        }
        @keyframes pulse-slow {
          0%, 100% { opacity: 0.4; }
          50%       { opacity: 0.7; }
        }

        .animate-fade-up   { animation: fadeUp 0.7s ease both; }
        .animate-fade-in   { animation: fadeIn 0.6s ease both; }
        .delay-100  { animation-delay: 0.1s; }
        .delay-200  { animation-delay: 0.2s; }
        .delay-300  { animation-delay: 0.3s; }
        .delay-400  { animation-delay: 0.4s; }
        .delay-500  { animation-delay: 0.5s; }
        .delay-600  { animation-delay: 0.6s; }

        .hero-glow {
          background: radial-gradient(ellipse 70% 50% at 50% -10%, rgba(94,234,212,0.13) 0%, transparent 70%);
        }
        .text-gradient {
          background: linear-gradient(135deg, #fff 0%, #5EEAD4 50%, #a78bfa 100%);
          background-size: 200% 200%;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          animation: gradientShift 6s ease infinite;
        }
        .grid-bg {
          background-image:
            linear-gradient(rgba(255,255,255,0.025) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.025) 1px, transparent 1px);
          background-size: 48px 48px;
        }
        .accent-line {
          background: linear-gradient(90deg, transparent, var(--accent), transparent);
        }
      `}</style>

      <NoiseOverlay />

      <div className="font-body relative min-h-screen overflow-x-hidden" style={{ background: "var(--bg)" }}>

        {/* ── Grid background ── */}
        <div className="grid-bg pointer-events-none fixed inset-0 opacity-100" />

        {/* ── Radial glow ── */}
        <div className="hero-glow pointer-events-none fixed inset-0" />

        {/* ══════════════════════════════════ NAV ══════════════════════════════ */}
        <header className={`fixed top-0 z-40 w-full transition-all duration-300 ${scrolled ? "border-b border-white/[0.06] backdrop-blur-xl bg-[#070c0b]/80" : ""}`}>
          <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
            {/* Logo */}
            <div className="flex items-center gap-2">
              <div className="flex h-7 w-7 items-center justify-center rounded-lg border border-[#5EEAD4]/30 bg-[#5EEAD4]/10 text-[#5EEAD4]">
                <IconSpark />
              </div>
              <span className="font-display text-[15px] font-700 tracking-tight text-white">Prept<span className="text-[#5EEAD4]">AI</span></span>
            </div>

            {/* Nav links */}
            <nav className="hidden items-center gap-8 md:flex">
              {["Features", "How it works", "Pricing", "Blog"].map((item) => (
                <a key={item} href={`#${item.toLowerCase().replace(/\s+/g, "-")}`}
                  className="text-sm text-neutral-400 transition-colors hover:text-white">
                  {item}
                </a>
              ))}
            </nav>

            {/* CTA */}
            <div className="flex items-center gap-3">
              <a href="#" className="hidden text-sm text-neutral-400 hover:text-white transition-colors md:block">Sign in</a>
              <a href="#" className="rounded-xl border border-[#5EEAD4]/30 bg-[#5EEAD4]/10 px-4 py-2 text-sm font-medium text-[#5EEAD4] transition-all hover:border-[#5EEAD4]/60 hover:bg-[#5EEAD4]/20">
                Start free
              </a>
            </div>
          </div>
        </header>

        {/* ══════════════════════════════════ HERO ═════════════════════════════ */}
        <section className="relative flex min-h-screen flex-col items-center justify-center px-6 pt-24 text-center">

          {/* Glow orbs */}
          <div className="pointer-events-none absolute left-1/2 top-1/3 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full"
            style={{ background: "radial-gradient(circle, rgba(94,234,212,0.07) 0%, transparent 65%)", animation: "pulse-slow 4s ease-in-out infinite" }} />
          <div className="pointer-events-none absolute right-0 top-1/4 h-[300px] w-[300px] rounded-full"
            style={{ background: "radial-gradient(circle, rgba(167,139,250,0.05) 0%, transparent 70%)" }} />

          {/* Badge */}
          <div className="animate-fade-up mb-8 inline-flex items-center gap-2 rounded-full border border-white/[0.08] bg-white/[0.03] px-4 py-1.5">
            <span className="h-1.5 w-1.5 rounded-full bg-[#5EEAD4]" style={{ boxShadow: "0 0 6px #5EEAD4" }} />
            <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-neutral-400">AI-Powered Interview Prep</span>
          </div>

          {/* Headline */}
          <h1 className="animate-fade-up delay-100 font-display max-w-4xl text-5xl font-800 leading-[1.05] tracking-tight text-white md:text-7xl">
            Ace every interview<br />
            <span className="text-gradient">with AI on your side.</span>
          </h1>

          {/* Sub */}
          <p className="animate-fade-up delay-200 mt-6 max-w-xl text-base leading-relaxed text-neutral-400 md:text-lg">
            Practice with a real-time AI interviewer, get deep feedback on your answers, and walk into your dream job with confidence.
          </p>

          {/* CTAs */}
          <div className="animate-fade-up delay-300 mt-10 flex flex-col items-center gap-3 sm:flex-row">
            <a href="#"
              className="group flex items-center gap-2 rounded-xl bg-[#5EEAD4] px-6 py-3 text-sm font-semibold text-[#050e0d] transition-all duration-200 hover:bg-[#7FF0DC] hover:shadow-[0_0_32px_rgba(94,234,212,0.35)]">
              Start practicing for free
              <span className="transition-transform duration-200 group-hover:translate-x-0.5"><IconArrow /></span>
            </a>
            <a href="#how-it-works"
              className="flex items-center gap-2 rounded-xl border border-white/10 px-6 py-3 text-sm text-neutral-300 transition-all hover:border-white/20 hover:bg-white/5">
              See how it works
            </a>
          </div>

          {/* Trust line */}
          <p className="animate-fade-up delay-400 mt-8 font-mono text-[11px] uppercase tracking-widest text-neutral-600">
            Trusted by 18,000+ engineers at top tech companies
          </p>

          {/* Hero mockup terminal */}
          <div className="animate-fade-up delay-500 relative mt-16 w-full max-w-3xl">
            <div className="overflow-hidden rounded-2xl border border-white/[0.07] bg-[#0d1412] shadow-[0_40px_100px_-30px_rgba(0,0,0,0.8)]">
              {/* Window bar */}
              <div className="flex items-center gap-2 border-b border-white/[0.06] px-4 py-3">
                <span className="h-3 w-3 rounded-full bg-red-500/70" />
                <span className="h-3 w-3 rounded-full bg-yellow-500/70" />
                <span className="h-3 w-3 rounded-full bg-green-500/70" />
                <div className="ml-3 flex-1 rounded-md border border-white/[0.05] bg-white/[0.02] px-3 py-1 text-center">
                  <span className="font-mono text-[11px] text-neutral-500">preptai.com / interview / frontend-engineer</span>
                </div>
              </div>

              {/* Content */}
              <div className="flex gap-0">
                {/* Sidebar */}
                <div className="hidden w-48 border-r border-white/[0.05] bg-white/[0.01] p-4 md:block">
                  <p className="mb-3 font-mono text-[10px] uppercase tracking-widest text-neutral-600">Session</p>
                  {["Introduction", "Technical Q&A", "System Design", "Behavioral"].map((item, i) => (
                    <div key={item} className={`mb-1 rounded-lg px-3 py-2 text-xs ${i === 1 ? "bg-[#5EEAD4]/10 text-[#5EEAD4] border border-[#5EEAD4]/20" : "text-neutral-500"}`}>
                      {item}
                    </div>
                  ))}
                  <div className="mt-6 rounded-xl border border-white/[0.05] bg-white/[0.02] p-3">
                    <p className="font-mono text-[10px] text-neutral-600 mb-2">Score</p>
                    <p className="font-display text-2xl font-bold text-white">87<span className="text-sm text-neutral-500">/100</span></p>
                    <div className="mt-2 h-1 rounded-full bg-white/10">
                      <div className="h-1 rounded-full bg-[#5EEAD4]" style={{ width: "87%" }} />
                    </div>
                  </div>
                </div>

                {/* Chat area */}
                <div className="flex-1 p-5">
                  <div className="mb-4 flex items-start gap-3">
                    <div className="mt-0.5 flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full bg-[#5EEAD4]/15 border border-[#5EEAD4]/25 text-[#5EEAD4]">
                      <IconSpark />
                    </div>
                    <div className="rounded-2xl rounded-tl-none border border-white/[0.06] bg-white/[0.03] px-4 py-3">
                      <p className="text-sm text-neutral-300">Explain the difference between <code className="rounded bg-white/[0.06] px-1.5 py-0.5 font-mono text-[11px] text-[#5EEAD4]">useCallback</code> and <code className="rounded bg-white/[0.06] px-1.5 py-0.5 font-mono text-[11px] text-[#5EEAD4]">useMemo</code> in React. When would you use each?</p>
                    </div>
                  </div>
                  <div className="mb-4 flex items-start justify-end gap-3">
                    <div className="max-w-sm rounded-2xl rounded-tr-none bg-white/[0.05] border border-white/[0.07] px-4 py-3">
                      <p className="text-sm text-neutral-300"><code className="text-[#5EEAD4] font-mono text-[11px]">useCallback</code> memoizes a function reference to avoid re-creation on every render, while <code className="text-[#5EEAD4] font-mono text-[11px]">useMemo</code> memoizes the return value of a computation...</p>
                    </div>
                    <div className="mt-0.5 flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full bg-white/5 border border-white/10 text-xs font-bold text-neutral-300">Y</div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="mt-0.5 flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full bg-[#5EEAD4]/15 border border-[#5EEAD4]/25 text-[#5EEAD4]">
                      <IconSpark />
                    </div>
                    <div className="rounded-2xl rounded-tl-none border border-white/[0.06] bg-white/[0.03] px-4 py-3">
                      <p className="mb-2 text-sm text-neutral-300">Good answer! A few things to strengthen it:</p>
                      <ul className="space-y-1 text-xs text-neutral-500">
                        <li className="flex gap-1.5"><span className="text-[#5EEAD4] mt-0.5"><IconCheck /></span>Mention dependency array comparison</li>
                        <li className="flex gap-1.5"><span className="text-[#5EEAD4] mt-0.5"><IconCheck /></span>Add a concrete real-world example</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Glow under card */}
            <div className="absolute inset-x-10 -bottom-8 h-16 rounded-full blur-2xl" style={{ background: "rgba(94,234,212,0.08)" }} />
          </div>
        </section>

        {/* ══════════════════════════════════ STATS ════════════════════════════ */}
        <section className="relative py-20 px-6">
          <div className="accent-line mx-auto mb-16 h-px max-w-6xl" />
          <div className="mx-auto grid max-w-6xl grid-cols-2 gap-8 md:grid-cols-4">
            <AnimatedStat value={18000} suffix="+" label="Users" />
            <AnimatedStat value={240000} suffix="+" label="Questions answered" />
            <AnimatedStat value={94} suffix="%" label="Success rate" />
            <AnimatedStat value={500} suffix="+" label="Companies covered" />
          </div>
        </section>

        {/* ══════════════════════════════════ FEATURES ═════════════════════════ */}
        <section id="features" className="px-6 py-24">
          <div className="mx-auto max-w-6xl">
            <div className="mb-14 max-w-xl">
              <p className="mb-3 font-mono text-[11px] uppercase tracking-[0.2em] text-[#5EEAD4]">Features</p>
              <h2 className="font-display text-4xl font-bold text-white">Everything you need to <br />land the offer.</h2>
            </div>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              <FeatureCard
                icon={<IconBrain />}
                title="AI Mock Interviews"
                desc="Practice with a conversational AI that adapts to your role, seniority, and company — just like the real thing."
                accent="border-[#5EEAD4]/20 bg-[#5EEAD4]/[0.06] text-[#5EEAD4]"
              />
              <FeatureCard
                icon={<IconCode />}
                title="Live Coding Rounds"
                desc="Solve DSA problems in an in-browser IDE while the AI observes, hints, and evaluates your approach in real time."
                accent="border-purple-400/20 bg-purple-400/[0.06] text-purple-400"
              />
              <FeatureCard
                icon={<IconMic />}
                title="Voice Interview Mode"
                desc="Speak your answers aloud. Our voice model transcribes, grades fluency, and flags filler words and pacing issues."
                accent="border-sky-400/20 bg-sky-400/[0.06] text-sky-400"
              />
              <FeatureCard
                icon={<IconChart />}
                title="Deep Performance Analytics"
                desc="Track answer quality, confidence score, vocabulary, and technical accuracy across every session over time."
                accent="border-orange-400/20 bg-orange-400/[0.06] text-orange-400"
              />
              <FeatureCard
                icon={<IconShield />}
                title="Company-Specific Prep"
                desc="500+ curated question banks for FAANG, startups, and finance firms — updated weekly from real interview reports."
                accent="border-rose-400/20 bg-rose-400/[0.06] text-rose-400"
              />
              <FeatureCard
                icon={<IconSpark />}
                title="Instant Answer Feedback"
                desc="Every answer is scored on clarity, correctness, depth, and structure with actionable suggestions to improve."
                accent="border-green-400/20 bg-green-400/[0.06] text-green-400"
              />
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════ HOW IT WORKS ═════════════════════ */}
        <section id="how-it-works" className="px-6 py-24">
          <div className="mx-auto max-w-6xl">
            <div className="mb-14">
              <p className="mb-3 font-mono text-[11px] uppercase tracking-[0.2em] text-[#5EEAD4]">How it works</p>
              <h2 className="font-display text-4xl font-bold text-white">Three steps to interview <br />confidence.</h2>
            </div>
            <div className="relative grid gap-8 md:grid-cols-3">
              {/* Connector line */}
              <div className="pointer-events-none absolute left-0 right-0 top-8 hidden h-px md:block" style={{ background: "linear-gradient(90deg, transparent 5%, rgba(255,255,255,0.06) 20%, rgba(255,255,255,0.06) 80%, transparent 95%)" }} />
              {[
                { n: "01", title: "Pick your role & company", desc: "Select from hundreds of job titles and companies. PreptAI tailors the entire session to match their interview style." },
                { n: "02", title: "Practice with your AI interviewer", desc: "Go through a full mock interview — behavioral, technical, and coding — with contextual follow-up questions." },
                { n: "03", title: "Review & improve", desc: "Get a detailed scorecard with per-answer breakdowns, improvement tips, and curated resources." },
              ].map(({ n, title, desc }) => (
                <div key={n} className="relative flex flex-col gap-4">
                  <div className="flex h-16 w-16 items-center justify-center rounded-2xl border border-white/[0.08] bg-white/[0.02]">
                    <span className="font-display text-2xl font-bold text-white">{n}</span>
                  </div>
                  <h3 className="font-display text-xl font-semibold text-white">{title}</h3>
                  <p className="text-sm leading-relaxed text-neutral-500">{desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════ TESTIMONIALS ═════════════════════ */}
        <section className="px-6 py-24">
          <div className="mx-auto max-w-6xl">
            <div className="mb-12">
              <p className="mb-3 font-mono text-[11px] uppercase tracking-[0.2em] text-[#5EEAD4]">Testimonials</p>
              <h2 className="font-display text-4xl font-bold text-white">From candidates who <br />made it.</h2>
            </div>
            <div className="grid gap-4 md:grid-cols-3">
              <TestimonialCard
                quote="PreptAI's feedback is insanely detailed. After two weeks of practice I went from bombing behavioral rounds to getting an offer at Stripe."
                name="Aisha R."
                role="Software Engineer"
                company="Stripe"
              />
              <TestimonialCard
                quote="The voice mode is what sets this apart. Practicing speaking answers out loud showed me how many filler words I use. Completely changed my delivery."
                name="Marcus T."
                role="Engineering Manager"
                company="Notion"
              />
              <TestimonialCard
                quote="I used every interview prep tool out there. Nothing comes close to the realism of PreptAI — the follow-up questions feel genuinely human."
                name="Priya S."
                role="Senior Frontend Engineer"
                company="Vercel"
              />
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════ PRICING ══════════════════════════ */}
        <section id="pricing" className="px-6 py-24">
          <div className="mx-auto max-w-6xl">
            <div className="mb-14 text-center">
              <p className="mb-3 font-mono text-[11px] uppercase tracking-[0.2em] text-[#5EEAD4]">Pricing</p>
              <h2 className="font-display text-4xl font-bold text-white">Simple, transparent pricing.</h2>
            </div>
            <div className="grid gap-6 md:grid-cols-3">
              <PricingCard
                plan="Free"
                price="$0"
                period="/ forever"
                features={["5 mock sessions / month", "Text interview mode", "Basic feedback", "10 company question banks"]}
              />
              <PricingCard
                plan="Pro"
                price="$19"
                period="/ month"
                badge="Most popular"
                highlight
                features={["Unlimited sessions", "Voice + coding modes", "Deep analytics dashboard", "500+ company question banks", "Priority AI model"]}
              />
              <PricingCard
                plan="Team"
                price="$49"
                period="/ seat / mo"
                features={["Everything in Pro", "Team performance insights", "Custom question sets", "Dedicated support", "SSO & admin panel"]}
              />
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════ CTA BANNER ═══════════════════════ */}
        <section className="px-6 py-24">
          <div className="mx-auto max-w-6xl">
            <div className="relative overflow-hidden rounded-3xl border border-[#5EEAD4]/20 bg-[#0d1a18] px-8 py-16 text-center md:px-16">
              {/* Glow */}
              <div className="pointer-events-none absolute inset-0"
                style={{ background: "radial-gradient(ellipse 60% 60% at 50% 100%, rgba(94,234,212,0.12) 0%, transparent 70%)" }} />
              <p className="mb-4 font-mono text-[11px] uppercase tracking-[0.2em] text-[#5EEAD4]">Get started today</p>
              <h2 className="mb-6 font-display text-4xl font-bold leading-tight text-white md:text-5xl">
                Your next offer is<br />
                <span className="text-gradient">one practice session away.</span>
              </h2>
              <p className="mb-10 text-neutral-400">Free to start. No credit card required.</p>
              <a href="#"
                className="group inline-flex items-center gap-2 rounded-xl bg-[#5EEAD4] px-8 py-3.5 text-sm font-semibold text-[#050e0d] transition-all hover:bg-[#7FF0DC] hover:shadow-[0_0_40px_rgba(94,234,212,0.4)]">
                Start your first interview
                <span className="transition-transform group-hover:translate-x-0.5"><IconArrow /></span>
              </a>
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════ FOOTER ═══════════════════════════ */}
        <footer className="border-t border-white/[0.06] px-6 py-10">
          <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-6 md:flex-row">
            <div className="flex items-center gap-2">
              <div className="flex h-6 w-6 items-center justify-center rounded-lg border border-[#5EEAD4]/30 bg-[#5EEAD4]/10 text-[#5EEAD4]">
                <IconSpark />
              </div>
              <span className="font-display text-sm font-semibold text-white">Prept<span className="text-[#5EEAD4]">AI</span></span>
            </div>
            <div className="flex gap-6 text-xs text-neutral-500">
              {["Privacy", "Terms", "Blog", "Contact"].map((link) => (
                <a key={link} href="#" className="hover:text-neutral-300 transition-colors">{link}</a>
              ))}
            </div>
            <p className="font-mono text-[11px] text-neutral-600">© 2025 PreptAI. All rights reserved.</p>
          </div>
        </footer>
      </div>
    </>
  );
}