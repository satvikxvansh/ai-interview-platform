"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Mail,
  Lock,
  Eye,
  EyeOff,
  ArrowRight,
  Sparkles,
  BrainCircuit,
  UserCheck,
  ChevronRight,
} from "lucide-react";

// Brand-accurate SVG logos (not in lucide)
const GoogleLogo = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none">
    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05" />
    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
  </svg>
);

const GithubLogo = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
  </svg>
);

// ─── Types ───────────────────────────────────────────────────────────────────
type Role = "interviewee" | "interviewer";

// ─── Decorative ambient orbs ─────────────────────────────────────────────────
function AmbientOrbs({ role }: { role: Role }) {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {/* Primary glow — shifts color per role */}
      <motion.div
        key={role}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.2 }}
        className="absolute"
        style={{
          top: "-15%",
          right: "-10%",
          width: 560,
          height: 560,
          borderRadius: "50%",
          background:
            role === "interviewee"
              ? "radial-gradient(circle, rgba(94,234,212,0.10) 0%, transparent 65%)"
              : "radial-gradient(circle, rgba(167,139,250,0.10) 0%, transparent 65%)",
        }}
      />
      {/* Secondary soft glow bottom-left */}
      <div
        className="absolute"
        style={{
          bottom: "-5%",
          left: "-5%",
          width: 360,
          height: 360,
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(30,41,59,0.8) 0%, transparent 70%)",
        }}
      />
    </div>
  );
}

// ─── Left panel — decorative brand side ──────────────────────────────────────
function BrandPanel({ role }: { role: Role }) {
  const isInterviewee = role === "interviewee";

  const accentColor = isInterviewee ? "#5EEAD4" : "#a78bfa";
  const accentDim = isInterviewee ? "rgba(94,234,212,0.12)" : "rgba(167,139,250,0.12)";
  const accentBorder = isInterviewee ? "rgba(94,234,212,0.2)" : "rgba(167,139,250,0.2)";

  const floatingCards = isInterviewee
    ? [
      { label: "Answer quality", value: "92/100", sub: "Excellent clarity" },
      { label: "Next session", value: "System Design", sub: "30 min · Google format" },
      { label: "Sessions completed", value: "14", sub: "+3 this week" },
    ]
    : [
      { label: "Candidates today", value: "6", sub: "3 pending review" },
      { label: "Avg. score", value: "78/100", sub: "Across 41 interviews" },
      { label: "Top skill gap", value: "System Design", sub: "Flagged in 5 sessions" },
    ];

  return (
    <motion.div
      key={role + "-panel"}
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className="relative hidden h-full flex-col justify-between overflow-hidden p-10 lg:flex"
      style={{ background: "#0b1412" }}
    >
      <AmbientOrbs role={role} />

      {/* Logo */}
      <div className="relative z-10 flex items-center gap-2">
        <div
          className="flex h-7 w-7 items-center justify-center rounded-lg"
          style={{ background: accentDim, border: `1px solid ${accentBorder}` }}
        >
          <Sparkles size={14} style={{ color: accentColor }} />
        </div>
        <span className="font-display text-[15px] font-semibold tracking-tight text-white">
          Prep<span style={{ color: accentColor }}>AI</span>
        </span>
      </div>

      {/* Center copy */}
      <div className="relative z-10 flex flex-col gap-6">
        <div
          className="inline-flex w-fit items-center gap-2 rounded-full px-4 py-1.5"
          style={{ background: accentDim, border: `1px solid ${accentBorder}` }}
        >
          {isInterviewee ? (
            <BrainCircuit size={13} style={{ color: accentColor }} />
          ) : (
            <UserCheck size={13} style={{ color: accentColor }} />
          )}
          <span className="font-mono text-[10px] uppercase tracking-[0.18em]" style={{ color: accentColor }}>
            {isInterviewee ? "Candidate Portal" : "Interviewer Portal"}
          </span>
        </div>

        <h2 className="font-display text-4xl font-bold leading-[1.1] tracking-tight text-white">
          {isInterviewee ? (
            <>
              Practice smarter.<br />
              <span style={{ color: accentColor }}>Land faster.</span>
            </>
          ) : (
            <>
              Evaluate better.<br />
              <span style={{ color: accentColor }}>Hire sharper.</span>
            </>
          )}
        </h2>

        <p className="max-w-xs text-sm leading-relaxed text-neutral-500">
          {isInterviewee
            ? "Run AI mock interviews, get deep feedback, and track your improvement over time."
            : "Conduct structured AI-assisted interviews, score candidates, and build repeatable hiring pipelines."}
        </p>

        {/* Floating stat cards */}
        <div className="mt-4 flex flex-col gap-3">
          {floatingCards.map((card, i) => (
            <motion.div
              key={card.label}
              initial={{ opacity: 0, x: -16 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 + i * 0.1, duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
              className="flex items-center justify-between rounded-xl px-4 py-3"
              style={{
                background: "rgba(255,255,255,0.025)",
                border: "1px solid rgba(255,255,255,0.06)",
              }}
            >
              <div>
                <p className="font-mono text-[10px] uppercase tracking-widest text-neutral-600">{card.label}</p>
                <p className="mt-0.5 font-display text-base font-semibold text-white">{card.value}</p>
              </div>
              <span className="font-mono text-[10px] text-neutral-600">{card.sub}</span>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Bottom quote */}
      <div className="relative z-10">
        <p className="text-xs italic text-neutral-600">
          &ldquo;The best preparation is not guessing what might be asked — it&apos;s being ready for everything.&rdquo;
        </p>
      </div>
    </motion.div>
  );
}

// ─── Input field component ────────────────────────────────────────────────────
function InputField({
  label,
  type,
  placeholder,
  icon: Icon,
  accentColor,
  value,
  onChange,
  rightElement,
}: {
  label: string;
  type: string;
  placeholder: string;
  icon: React.ElementType;
  accentColor: string;
  value: string;
  onChange: (v: string) => void;
  rightElement?: React.ReactNode;
}) {
  const [focused, setFocused] = useState(false);

  return (
    <div className="flex flex-col gap-1.5">
      <label className="font-mono text-[10px] uppercase tracking-[0.18em] text-neutral-500">{label}</label>
      <div
        className="relative flex items-center rounded-xl transition-all duration-200"
        style={{
          background: "rgba(255,255,255,0.03)",
          border: focused
            ? `1px solid ${accentColor}55`
            : "1px solid rgba(255,255,255,0.07)",
          boxShadow: focused ? `0 0 0 3px ${accentColor}10` : "none",
        }}
      >
        <span className="absolute left-3.5 text-neutral-600">
          <Icon size={15} />
        </span>
        <input
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          className="w-full rounded-xl bg-transparent py-3 pl-10 pr-4 text-sm text-white placeholder-neutral-600 outline-none"
        />
        {rightElement && (
          <span className="absolute right-3.5 cursor-pointer text-neutral-600 hover:text-neutral-400">
            {rightElement}
          </span>
        )}
      </div>
    </div>
  );
}

// ─── Social login button ──────────────────────────────────────────────────────
function SocialButton({ icon: Icon, label }: { icon: React.ElementType; label: string }) {
  return (
    <button
      className="flex items-center justify-center gap-2 rounded-xl py-2.5 text-sm text-neutral-400 transition-all duration-200 hover:bg-white/5 hover:text-white"
      style={{ border: "1px solid rgba(255,255,255,0.07)" }}
    >
      <Icon size={15} />
      {label}
    </button>
  );
}

// ─── Role toggle ──────────────────────────────────────────────────────────────
function RoleToggle({ role, onChange }: { role: Role; onChange: (r: Role) => void }) {
  return (
    <div
      className="relative flex w-full rounded-xl p-1"
      style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)" }}
    >
      {/* Sliding pill */}
      <motion.div
        layout
        transition={{ type: "spring", stiffness: 380, damping: 36 }}
        className="absolute top-1 bottom-1 w-[calc(50%-4px)] rounded-lg"
        style={{
          left: role === "interviewee" ? 4 : "calc(50%)",
          background: role === "interviewee"
            ? "rgba(94,234,212,0.10)"
            : "rgba(167,139,250,0.10)",
          border: role === "interviewee"
            ? "1px solid rgba(94,234,212,0.22)"
            : "1px solid rgba(167,139,250,0.22)",
        }}
      />

      {(["interviewee", "interviewer"] as Role[]).map((r) => {
        const active = role === r;
        const Icon = r === "interviewee" ? BrainCircuit : UserCheck;
        const color = r === "interviewee" ? "#5EEAD4" : "#a78bfa";
        return (
          <button
            key={r}
            onClick={() => onChange(r)}
            className="flex flex-1 items-center justify-center gap-2 rounded-lg py-2.5 text-xs font-medium transition-colors duration-200"
            style={{ color: active ? color : "#6b7280" }}
          >
            <Icon size={13} />
            {r === "interviewee" ? "Candidate" : "Interviewer"}
          </button>
        );
      })}
    </div>
  );
}

// ─── Main login form ──────────────────────────────────────────────────────────
function LoginForm({ role }: { role: Role }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);

  const isInterviewee = role === "interviewee";
  const accentColor = isInterviewee ? "#5EEAD4" : "#a78bfa";
  const accentDim = isInterviewee ? "rgba(94,234,212,0.10)" : "rgba(167,139,250,0.10)";
  const accentBorder = isInterviewee ? "rgba(94,234,212,0.22)" : "rgba(167,139,250,0.22)";
  const accentHover = isInterviewee ? "#7FF0DC" : "#c4b5fd";
  const accentText = isInterviewee ? "#050e0d" : "#1e1b4b";

  const handleSubmit = () => {
    setLoading(true);
    setTimeout(() => setLoading(false), 2000);
  };

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={role}
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        className="flex flex-col gap-5"
      >
        {/* Heading */}
        <div className="flex flex-col gap-1">
          <h1 className="font-display text-2xl font-bold text-white">
            {isInterviewee ? "Welcome back, candidate." : "Welcome back, interviewer."}
          </h1>
          <p className="text-sm text-neutral-500">
            {isInterviewee
              ? "Continue your prep journey."
              : "Access your candidate pipeline."}
          </p>
        </div>

        {/* Social logins */}
        <div className="grid grid-cols-2 gap-3">
          <SocialButton icon={GoogleLogo} label="Google" />
          <SocialButton icon={GithubLogo} label="GitHub" />
        </div>

        {/* Divider */}
        <div className="flex items-center gap-3">
          <div className="h-px flex-1" style={{ background: "rgba(255,255,255,0.06)" }} />
          <span className="font-mono text-[10px] uppercase tracking-widest text-neutral-700">or continue with email</span>
          <div className="h-px flex-1" style={{ background: "rgba(255,255,255,0.06)" }} />
        </div>

        {/* Fields */}
        <div className="flex flex-col gap-4">
          <InputField
            label="Email address"
            type="email"
            placeholder={isInterviewee ? "you@example.com" : "recruiter@company.com"}
            icon={Mail}
            accentColor={accentColor}
            value={email}
            onChange={setEmail}
          />
          <InputField
            label="Password"
            type={showPass ? "text" : "password"}
            placeholder="••••••••••••"
            icon={Lock}
            accentColor={accentColor}
            value={password}
            onChange={setPassword}
            rightElement={
              <span onClick={() => setShowPass(!showPass)}>
                {showPass ? <EyeOff size={14} /> : <Eye size={14} />}
              </span>
            }
          />
        </div>

        {/* Forgot */}
        <div className="flex justify-end">
          <a
            href="#"
            className="font-mono text-[11px] transition-colors hover:text-white"
            style={{ color: accentColor }}
          >
            Forgot password?
          </a>
        </div>

        {/* Submit */}
        <motion.button
          whileTap={{ scale: 0.98 }}
          onClick={handleSubmit}
          className="relative flex w-full items-center justify-center gap-2 overflow-hidden rounded-xl py-3.5 text-sm font-semibold transition-all duration-200"
          style={{
            background: accentColor,
            color: accentText,
            boxShadow: loading ? "none" : `0 0 28px -4px ${accentColor}60`,
          }}
        >
          <AnimatePresence mode="wait">
            {loading ? (
              <motion.span
                key="loading"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex items-center gap-2"
              >
                <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24" fill="none">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4l3-3-3-3v4a8 8 0 100 16v-4l-3 3 3 3v-4a8 8 0 01-8-8z" />
                </svg>
                Signing in…
              </motion.span>
            ) : (
              <motion.span
                key="cta"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex items-center gap-2"
              >
                {isInterviewee ? "Continue to dashboard" : "Access interviewer panel"}
                <ArrowRight size={15} />
              </motion.span>
            )}
          </AnimatePresence>
        </motion.button>

        {/* Sign up link */}
        <p className="text-center font-mono text-[11px] text-neutral-600">
          No account yet?{" "}
          <a
            href="#"
            className="transition-colors hover:text-white"
            style={{ color: accentColor }}
          >
            Create one free
          </a>
        </p>

        {/* Extra for interviewer — request access note */}
        {!isInterviewee && (
          <motion.div
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mt-1 flex items-start gap-3 rounded-xl p-4"
            style={{ background: "rgba(167,139,250,0.05)", border: "1px solid rgba(167,139,250,0.12)" }}
          >
            <ChevronRight size={14} className="mt-0.5 flex-shrink-0" style={{ color: "#a78bfa" }} />
            <p className="text-xs leading-relaxed text-neutral-500">
              Interviewer accounts require <span className="text-neutral-300">company verification.</span>{" "}
              <a href="#" className="underline underline-offset-2 hover:text-neutral-300" style={{ color: "#a78bfa" }}>Request access →</a>
            </p>
          </motion.div>
        )}
      </motion.div>
    </AnimatePresence>
  );
}

// ════════════════════════════════════════════════════════════════════════════
// PAGE
// ════════════════════════════════════════════════════════════════════════════
export default function LoginPage() {
  const [role, setRole] = useState<Role>("interviewee");

  return (
    <>
      <div
        className="relative flex min-h-screen items-stretch"
        style={{ background: "#070c0b" }}
      >
        {/* ── Left brand panel (desktop only) ── */}
        <div className="relative hidden w-[52%] lg:block">
          <BrandPanel role={role} />
        </div>

        {/* ── Vertical divider ── */}
        <div
          className="hidden w-px self-stretch lg:block"
          style={{ background: "rgba(255,255,255,0.055)" }}
        />

        {/* ── Right: form panel ── */}
        <div className="relative flex flex-1 flex-col items-center justify-center px-6 py-16 lg:px-14">

          {/* Ambient glow behind form (mobile visible too) */}
          <div
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                role === "interviewee"
                  ? "radial-gradient(ellipse 60% 50% at 80% 20%, rgba(94,234,212,0.05) 0%, transparent 60%)"
                  : "radial-gradient(ellipse 60% 50% at 80% 20%, rgba(167,139,250,0.05) 0%, transparent 60%)",
              transition: "background 0.8s ease",
            }}
          />

          {/* Mobile logo */}
          <div className="mb-10 flex items-center gap-2 lg:hidden">
            <div
              className="flex h-7 w-7 items-center justify-center rounded-lg"
              style={{
                background: role === "interviewee" ? "rgba(94,234,212,0.12)" : "rgba(167,139,250,0.12)",
                border: role === "interviewee" ? "1px solid rgba(94,234,212,0.2)" : "1px solid rgba(167,139,250,0.2)",
              }}
            >
              <Sparkles size={14} style={{ color: role === "interviewee" ? "#5EEAD4" : "#a78bfa" }} />
            </div>
            <span className="font-display text-[15px] font-semibold tracking-tight text-white">
              Prep<span style={{ color: role === "interviewee" ? "#5EEAD4" : "#a78bfa" }}>AI</span>
            </span>
          </div>

          {/* Form container */}
          <div className="relative z-10 w-full max-w-sm">

            {/* Role toggle */}
            <div className="mb-8">
              <RoleToggle role={role} onChange={setRole} />
            </div>

            {/* The form */}
            <LoginForm role={role} />
          </div>

          {/* Bottom legal */}
          <p className="absolute bottom-6 font-mono text-[10px] text-neutral-700">
            © 2025 PreptAI · <a href="#" className="hover:text-neutral-500">Privacy</a> · <a href="#" className="hover:text-neutral-500">Terms</a>
          </p>
        </div>
      </div>
    </>
  );
}