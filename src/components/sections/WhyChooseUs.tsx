import { useState, useEffect, useRef } from "react";
import {
  Globe,
  Layers3,
  ShieldCheck,
  Sparkles,
  TimerReset,
  Zap,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

import {
  motion,
  useScroll,
  useTransform,
  useMotionValueEvent
} from "framer-motion";

import { Button } from "../ui/button";

// ─── Scramble Uptime ──────────────────────────────────────────────────────────

function ScrambleUptime({ inView }: { inView: boolean }) {
  const [display, setDisplay] = useState("99.90%");
  const target = "99.99%";

  useEffect(() => {
    if (!inView) { setDisplay("99.90%"); return; }
    const digits = target.split("");
    let step = 0;
    const id = setInterval(() => {
      const s = digits.map((d, i) => {
        if (i < step || d === "." || d === "%") return d;
        return String(Math.floor(Math.random() * 10));
      }).join("");
      setDisplay(s);
      step++;
      if (step > digits.length) { setDisplay(target); clearInterval(id); }
    }, 75);
    return () => clearInterval(id);
  }, [inView]);

  return <>{display}</>;
}

// ─── Reusable icon badge with glow ring ───────────────────────────────────────

function IconBadge({
  children,
  color,
  delay = 0,
}: {
  children: React.ReactNode;
  color: string;
  delay?: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.7 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: false }}
      transition={{ type: "spring", stiffness: 200, damping: 18, delay }}
      className="group/icon relative flex items-center justify-center"
    >
      <div
        className={`absolute inset-0 rounded-full bg-${color}/20 blur-2xl scale-90 opacity-60 transition-all duration-500 group-hover/icon:scale-125 group-hover/icon:opacity-90`}
      />
      <div
        className={`relative flex h-24 w-24 items-center justify-center rounded-full border border-${color}/20 bg-gradient-to-b from-${color}/10 to-transparent backdrop-blur-sm shadow-[0_0_0_1px_rgba(255,255,255,0.02)_inset] transition-transform duration-500 ease-out group-hover/icon:scale-105`}
      >
        {children}
      </div>
    </motion.div>
  );
}

// ─── Reusable interactive chip ────────────────────────────────────────────────

function Chip({
  label,
  color,
  delay = 0,
}: {
  label: string;
  color: string;
  delay?: number;
}) {
  return (
    <motion.span
      initial={{ opacity: 0, scale: 0.8 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: false }}
      transition={{ type: "spring", stiffness: 260, damping: 20, delay }}
      whileHover={{ scale: 1.06, y: -2 }}
      className={`cursor-default rounded-full border border-${color}/20 bg-${color}/5 text-${color} text-xs px-3 py-1 font-medium transition-colors duration-200 hover:border-${color}/40 hover:bg-${color}/10 hover:shadow-[0_0_16px_-4px] hover:shadow-${color}/40`}
    >
      {label}
    </motion.span>
  );
}

// ─── Reusable feature card (icon + label + blurb) ─────────────────────────────

function FeatureCard({
  icon: Icon,
  label,
  blurb,
  color,
  delay = 0,
}: {
  icon: React.ElementType;
  label: string;
  blurb: string;
  color: string;
  delay?: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: false }}
      transition={{ duration: 0.5, delay }}
      whileHover={{ y: -5 }}
      className={`group relative flex flex-col items-start gap-3 overflow-hidden rounded-xl border border-border bg-card/60 backdrop-blur-sm p-5 text-left`}
    >
      <div className={`pointer-events-none absolute -right-10 -top-10 h-28 w-28 rounded-full bg-${color}/10 blur-2xl opacity-0 transition-opacity duration-500 group-hover:opacity-100`} />
      <div className={`relative flex h-10 w-10 items-center justify-center rounded-lg bg-${color}/10 text-${color} ring-1 ring-${color}/20 transition-transform duration-300 group-hover:scale-110`}>
        <Icon className="h-5 w-5" strokeWidth={2} />
      </div>
      <div className="relative">
        <p className="text-sm font-semibold text-foreground">{label}</p>
        <p className="mt-1 text-xs leading-relaxed text-muted-foreground">{blurb}</p>
      </div>
    </motion.div>
  );
}

// ─── Slide 1 — The Problem ────────────────────────────────────────────────────

function Slide1({ mobile }: { mobile: boolean }) {
  const painPoints = [
    "Manual meter reading & data entry",
    "Delayed fault detection",
    "No unified asset visibility",
  ];
  return (
    <div className={`relative flex flex-col items-center justify-center text-center px-8 overflow-hidden ${mobile
        ? "min-h-[70vh] py-16 border-b border-border"
        : "w-[100vw] h-full flex-shrink-0"
      }`}>
      <div className="absolute inset-0 flex items-center justify-center select-none pointer-events-none overflow-hidden">
        <motion.span
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: false }}
          transition={{ duration: 1.2 }}
          className="text-[30vw] font-black text-muted-foreground/[0.04] leading-none"
        >
          ?
        </motion.span>
      </div>

      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(60%_50%_at_50%_40%,rgba(248,113,113,0.05)_0%,transparent_70%)]" />

      <div className="relative z-10 max-w-xl">
        <motion.h3
          initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false }} transition={{ duration: 0.7 }}
          className="text-4xl font-bold text-foreground"
        >
          Operations Without Visibility
        </motion.h3>
        <motion.p
          initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false }} transition={{ duration: 0.6, delay: 0.15 }}
          className="text-muted-foreground text-lg max-w-lg mx-auto mt-4"
        >
          Manual processes. Disconnected systems. Blind spots everywhere.
        </motion.p>

        <div className="mt-8 flex flex-col gap-3 items-start w-fit mx-auto">
          {painPoints.map((p, i) => (
            <motion.div
              key={p}
              initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: false }}
              transition={{ duration: 0.5, delay: 0.3 + i * 0.12 }}
              whileHover={{ x: 4 }}
              className="group flex items-center gap-3 rounded-lg px-3 py-1.5 transition-colors duration-200 hover:bg-red-400/[0.04]"
            >
              <span className="flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-red-400/10 text-red-400 font-bold text-xs transition-transform duration-200 group-hover:scale-110 group-hover:rotate-90">
                ✗
              </span>
              <span className="text-sm text-muted-foreground/70 line-through decoration-red-400/40 transition-colors duration-200 group-hover:text-muted-foreground">
                {p}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── Slide 2 — Enterprise Security ───────────────────────────────────────────

function Slide2({ mobile }: { mobile: boolean }) {
  const chips = ["IEC-62443 Aligned", "Multi-Factor Auth", "Role-Based Access"];
  return (
    <div className={`relative flex flex-col items-center justify-center px-8 overflow-hidden bg-gradient-to-r from-background to-blue-950/10 ${mobile ? "min-h-[70vh] py-16 border-b border-border" : "w-[100vw] h-full flex-shrink-0"
      }`}>
      <div className="pointer-events-none absolute -top-24 right-1/4 h-72 w-72 rounded-full bg-blue-500/10 blur-3xl" />

      <div className="relative max-w-xl text-center">
        <div className="flex justify-center mb-8">
          <IconBadge color="blue-400">
            <svg viewBox="0 0 24 24" className="h-11 w-11 text-blue-400" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <motion.path
                d="M12 3L4 7v5c0 5.25 3.75 10.15 8 11.45C16.25 22.15 20 17.25 20 12V7L12 3z"
                initial={{ pathLength: 0, opacity: 0 }} whileInView={{ pathLength: 1, opacity: 1 }}
                viewport={{ once: false }} transition={{ duration: 1.2, ease: "easeOut" }}
              />
              <motion.path
                d="m9 12 2 2 4-4"
                initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }}
                viewport={{ once: false }} transition={{ duration: 0.6, delay: 1.0, ease: "easeOut" }}
              />
            </svg>
          </IconBadge>
        </div>

        <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: false }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="font-mono text-xs tracking-[0.2em] uppercase text-blue-400/70 mb-3">
          01 / Security
        </motion.p>
        <motion.h3 initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: false }}
          transition={{ duration: 0.6, delay: 0.3 }} className="text-3xl font-bold text-foreground">
          Enterprise Security
        </motion.h3>
        <motion.p initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: false }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-base text-muted-foreground max-w-md mx-auto mt-4 leading-7">
          IEC-62443 aligned architecture with multi-factor authentication, role-based access control,
          and comprehensive audit trails for mission-critical industrial systems.
        </motion.p>

        <div className="mt-6 flex flex-wrap gap-2 justify-center">
          {chips.map((c, idx) => (
            <Chip key={c} label={c} color="blue-400" delay={0.5 + idx * 0.1} />
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── Slide 3 — Infinite Scalability ──────────────────────────────────────────

function Slide3({ mobile }: { mobile: boolean }) {
  const chips = ["1 Site → 10,000 Sites", "Millions of Tag Points", "Zero Reconfiguration"];
  const bars = [20, 35, 50, 62, 78, 95];
  const chartH = 120;
  const barW = 32;
  const gap = 12;
  const totalW = bars.length * barW + (bars.length - 1) * gap;
  const startX = (300 - totalW) / 2;
  const [hoveredBar, setHoveredBar] = useState<number | null>(null);

  return (
    <div className={`relative flex flex-col items-center justify-center px-8 overflow-hidden bg-gradient-to-r from-background to-accent/10 ${mobile ? "min-h-[70vh] py-16 border-b border-border" : "w-[100vw] h-full flex-shrink-0"
      }`}>
      <div className="pointer-events-none absolute -bottom-24 left-1/4 h-72 w-72 rounded-full bg-accent/10 blur-3xl" />

      <div className="relative max-w-xl text-center">
        <div className="flex justify-center mb-8">
          <IconBadge color="accent">
            <svg viewBox="0 0 24 24" className="h-11 w-11 text-accent" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <motion.path d="M12 2L2 7l10 5 10-5-10-5"
                initial={{ pathLength: 0, opacity: 0 }} whileInView={{ pathLength: 1, opacity: 1 }}
                viewport={{ once: false }} transition={{ duration: 0.8, ease: "easeOut" }} />
              <motion.path d="M2 17l10 5 10-5"
                initial={{ pathLength: 0, opacity: 0 }} whileInView={{ pathLength: 1, opacity: 1 }}
                viewport={{ once: false }} transition={{ duration: 0.6, delay: 0.6, ease: "easeOut" }} />
              <motion.path d="M2 12l10 5 10-5"
                initial={{ pathLength: 0, opacity: 0 }} whileInView={{ pathLength: 1, opacity: 1 }}
                viewport={{ once: false }} transition={{ duration: 0.6, delay: 0.9, ease: "easeOut" }} />
            </svg>
          </IconBadge>
        </div>

        <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: false }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="font-mono text-xs tracking-[0.2em] uppercase text-accent/70 mb-3">
          02 / Scale
        </motion.p>
        <motion.h3 initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: false }}
          transition={{ duration: 0.6, delay: 0.3 }} className="text-3xl font-bold text-foreground">
          Infinite Scalability
        </motion.h3>
        <motion.p initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: false }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-base text-muted-foreground max-w-md mx-auto mt-4 leading-7">
          Scale from a single site to thousands of assets and millions of telemetry points
          with zero infrastructure reconfiguration.
        </motion.p>

        <div className="flex justify-center mt-6">
          <svg width="300" height="140" viewBox="0 0 300 140" overflow="visible">
            <defs>
              <filter id="bar-glow" x="-50%" y="-50%" width="200%" height="200%">
                <feGaussianBlur stdDeviation="4" result="blur" />
                <feComposite in="SourceGraphic" in2="blur" operator="over" />
              </filter>
            </defs>
            <line x1="0" y1={chartH} x2="300" y2={chartH} stroke="rgba(249,115,22,0.2)" strokeWidth="1" />
            {bars.map((pct, i) => {
              const x = startX + i * (barW + gap);
              const bH = (pct / 100) * chartH;
              const isHovered = hoveredBar === i;
              return (
                <g key={i}>
                  <motion.rect
                    x={x} width={barW} rx={3}
                    initial={{ height: 0, y: chartH }}
                    whileInView={{ height: bH, y: chartH - bH }}
                    viewport={{ once: false }}
                    transition={{ duration: 0.7, delay: 0.5 + i * 0.1, ease: "easeOut" }}
                    animate={{ opacity: isHovered ? 1 : 0.7, scaleY: isHovered ? 1.02 : 1 }}
                    fill="#f97316"
                    style={{ cursor: "pointer", transformOrigin: `${x + barW / 2}px ${chartH}px` }}
                    onMouseEnter={() => setHoveredBar(i)}
                    onMouseLeave={() => setHoveredBar(null)}
                    filter={i === bars.length - 1 || isHovered ? "url(#bar-glow)" : undefined}
                  />
                  {isHovered && (
                    <motion.text
                      initial={{ opacity: 0, y: 4 }}
                      animate={{ opacity: 1, y: 0 }}
                      x={x + barW / 2}
                      y={chartH - bH - 10}
                      textAnchor="middle"
                      fontSize="11"
                      fontWeight="600"
                      fill="#f97316"
                    >
                      {pct}%
                    </motion.text>
                  )}
                </g>
              );
            })}
          </svg>
        </div>

        <div className="mt-4 flex flex-wrap gap-2 justify-center">
          {chips.map((c, idx) => (
            <Chip key={c} label={c} color="accent" delay={1.0 + idx * 0.1} />
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── Slide 4 — Hybrid Infrastructure (dedicated) ──────────────────────────────

function Slide4Hybrid({ mobile }: { mobile: boolean }) {
  const features = [
    { icon: Layers3, label: "On-Premise", blurb: "Full control within your own facility footprint.", color: "teal-400" },
    { icon: Globe, label: "Cloud", blurb: "Elastic infrastructure managed and scaled for you.", color: "teal-400" },
    { icon: Zap, label: "Edge-Ready", blurb: "Local processing where latency matters most.", color: "teal-400" },
  ];

  return (
    <div className={`relative flex flex-col items-center justify-center px-8 overflow-hidden bg-gradient-to-br from-background via-teal-950/10 to-background ${mobile ? "min-h-[70vh] py-16 border-b border-border" : "w-[100vw] h-full flex-shrink-0"
      }`}>
      {/* light-tinted ambient wash, unique to this slide */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(55%_45%_at_30%_25%,rgba(45,212,191,0.08)_0%,transparent_70%)]" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(45%_40%_at_80%_75%,rgba(45,212,191,0.05)_0%,transparent_70%)]" />

      <div className="relative max-w-2xl text-center">
        <div className="flex justify-center mb-8">
          <IconBadge color="teal-400">
            <svg viewBox="0 0 24 24" className="h-11 w-11 text-teal-400" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <motion.circle cx="12" cy="12" r="10"
                initial={{ pathLength: 0, opacity: 0 }} whileInView={{ pathLength: 1, opacity: 1 }}
                viewport={{ once: false }} transition={{ duration: 1.0, ease: "easeOut" }} />
              <motion.line x1="2" y1="12" x2="22" y2="12"
                initial={{ pathLength: 0, opacity: 0 }} whileInView={{ pathLength: 1, opacity: 1 }}
                viewport={{ once: false }} transition={{ duration: 0.5, delay: 0.8 }} />
              <motion.path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"
                initial={{ pathLength: 0, opacity: 0 }} whileInView={{ pathLength: 1, opacity: 1 }}
                viewport={{ once: false }} transition={{ duration: 1.0, delay: 0.4 }} />
            </svg>
          </IconBadge>
        </div>

        <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: false }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="font-mono text-xs tracking-[0.2em] uppercase text-teal-400/70 mb-3">
          03 / Deploy
        </motion.p>
        <motion.h3 initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: false }}
          transition={{ duration: 0.6, delay: 0.3 }} className="text-3xl font-bold text-foreground sm:text-4xl">
          Hybrid Infrastructure
        </motion.h3>
        <motion.p initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: false }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-base text-muted-foreground max-w-lg mx-auto mt-4 leading-7">
          Deploy on-premise, cloud, or hybrid environments with edge-ready architecture
          that adapts to your operational constraints.
        </motion.p>

        <div className="mt-9 grid grid-cols-1 gap-4 sm:grid-cols-3">
          {features.map((f, idx) => (
            <FeatureCard key={f.label} {...f} delay={0.5 + idx * 0.12} />
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── Slide 5 — 99.99% Reliability (dedicated) ─────────────────────────────────

function Slide5Reliability({ mobile }: { mobile: boolean }) {
  const reliabilityRef = useRef<HTMLDivElement | null>(null);
  const [uptimeInView, setUptimeInView] = useState(false);

  useEffect(() => {
    const el = reliabilityRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => setUptimeInView(e.isIntersecting),
      { threshold: 0.3 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const features = [
    { icon: TimerReset, label: "Zero Planned Downtime", blurb: "Maintenance and upgrades roll out without interruption.", color: "emerald-400" },
    { icon: ShieldCheck, label: "Auto-Failover", blurb: "Traffic reroutes instantly the moment an issue is detected.", color: "emerald-400" },
    { icon: Sparkles, label: "Hot Standby", blurb: "Redundant systems stay warm and ready at all times.", color: "emerald-400" },
  ];

  return (
    <div
      ref={reliabilityRef}
      className={`relative flex flex-col items-center justify-center px-8 overflow-hidden bg-gradient-to-br from-background via-emerald-950/10 to-background ${mobile ? "min-h-[70vh] py-16 border-b border-border" : "w-[100vw] h-full flex-shrink-0"
        }`}
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(55%_45%_at_70%_25%,rgba(52,211,153,0.08)_0%,transparent_70%)]" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(45%_40%_at_20%_75%,rgba(52,211,153,0.05)_0%,transparent_70%)]" />

      <div className="relative max-w-2xl text-center">
        <div className="flex justify-center mb-8">
          <IconBadge color="emerald-400">
            <svg viewBox="0 0 24 24" className="h-11 w-11 text-emerald-400" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <motion.path d="M22 12h-4l-3 9L9 3l-3 9H2"
                initial={{ pathLength: 0, opacity: 0 }} whileInView={{ pathLength: 1, opacity: 1 }}
                viewport={{ once: false }} transition={{ duration: 1.2, ease: "easeOut" }} />
            </svg>
          </IconBadge>
        </div>

        <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: false }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="font-mono text-xs tracking-[0.2em] uppercase text-emerald-400/70 mb-3">
          04 / Uptime
        </motion.p>
        <motion.h3 initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: false }}
          transition={{ duration: 0.6, delay: 0.3 }} className="text-3xl font-bold text-foreground sm:text-4xl">
          99.99% Reliability
        </motion.h3>
        <motion.p initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: false }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-base text-muted-foreground max-w-lg mx-auto mt-4 leading-7">
          Mission-critical uptime for industrial operations with redundant
          infrastructure and intelligent failover.
        </motion.p>

        <div className="mt-8">
          <p className="text-6xl font-black font-mono text-emerald-400 drop-shadow-[0_0_24px_rgba(52,211,153,0.35)] sm:text-7xl">
            <ScrambleUptime inView={uptimeInView} />
          </p>
          <p className="text-xs text-muted-foreground mt-2 font-mono tracking-widest">platform availability</p>
        </div>

        <div className="mt-9 grid grid-cols-1 gap-4 sm:grid-cols-3">
          {features.map((f, idx) => (
            <FeatureCard key={f.label} {...f} delay={0.6 + idx * 0.12} />
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── Slide 6 — The Result ─────────────────────────────────────────────────────

function Slide6({ mobile }: { mobile: boolean }) {
  const metrics = [
    { label: "Connected Devices", value: "2K+", color: "orange-400", bar: "bg-orange-500", pct: "72%" },
    { label: "Events / Day", value: "10M+", color: "violet-400", bar: "bg-violet-500", pct: "99%" },
    { label: "Availability", value: "99.9%", color: "cyan-400", bar: "bg-cyan-500", pct: "95%" },
    { label: "Facilities", value: "10+", color: "teal-400", bar: "bg-teal-500", pct: "40%" },
  ];

  return (
    <div className={`relative flex flex-col items-center justify-center px-8 overflow-hidden ${mobile ? "min-h-[70vh] py-16" : "w-[100vw] h-full flex-shrink-0"
      }`}>
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(60%_50%_at_50%_30%,rgba(249,115,22,0.05)_0%,transparent_70%)]" />

      <div className="relative w-full max-w-lg mx-auto">
        <motion.p
          initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false }} transition={{ duration: 0.5 }}
          className="font-mono text-xs tracking-[0.3em] uppercase text-accent/70 mb-6 text-center flex items-center justify-center gap-2">
          <span className="h-1.5 w-1.5 rounded-full bg-accent animate-pulse" />
          [ SYSTEM ONLINE ]
        </motion.p>
        <motion.h3
          initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false }} transition={{ duration: 0.7, delay: 0.1 }}
          className="text-4xl font-bold text-foreground text-center mb-8">
          Your Operations, Unified.
        </motion.h3>

        <div className="grid grid-cols-2 gap-3">
          {metrics.map((m, i) => (
            <motion.div
              key={m.label}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false }}
              transition={{ duration: 0.5, delay: 0.3 + i * 0.15 }}
              whileHover={{ y: -4 }}
              className={`group relative overflow-hidden rounded-xl border border-border bg-card/60 backdrop-blur-sm p-5`}
            >
              <div className={`pointer-events-none absolute -right-8 -top-8 h-24 w-24 rounded-full bg-${m.color}/10 blur-2xl opacity-0 transition-opacity duration-500 group-hover:opacity-100`} />

              <motion.p
                initial={{ opacity: 0, x: -12 }} whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: false }} transition={{ duration: 0.5, delay: 0.4 + i * 0.15 }}
                className={`relative text-3xl font-bold font-mono text-${m.color}`}>
                {m.value}
              </motion.p>
              <span className="relative mt-1 block text-xs text-muted-foreground">{m.label}</span>

              <div className="relative mt-3 h-[3px] w-full bg-muted/30 rounded-full overflow-hidden">
                <motion.div
                  className={`h-full rounded-full ${m.bar}`}
                  initial={{ width: 0 }}
                  whileInView={{ width: m.pct }}
                  viewport={{ once: false }}
                  transition={{ duration: 1.2, delay: 0.5 + i * 0.15 }}
                />
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false }} transition={{ duration: 0.6, delay: 1.2 }}
          className="mt-8 flex flex-col gap-4 sm:flex-row justify-center">
          <Button className="gap-2 bg-accent text-white border-none transition-transform duration-200 hover:scale-[1.03] hover:shadow-[0_8px_24px_-8px] hover:shadow-accent/50">
            Request Demo
          </Button>
          <Button variant="outline" className="gap-2 transition-all duration-200 hover:scale-[1.03] hover:border-foreground/30">
            Contact Sales
          </Button>
        </motion.div>
      </div>
    </div>
  );
}

// ─── Desktop Horizontal Story ─────────────────────────────────────────────────

function HorizontalStory() {
  const TOTAL_SLIDES = 6;
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: containerRef });
  const x = useTransform(scrollYProgress, [0, 1], ["0vw", `-${(TOTAL_SLIDES - 1) * 100}vw`]);
  const scaleX = useTransform(scrollYProgress, [0, 1], [0, 1]);
  const [slide, setSlide] = useState(1);

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    setSlide(Math.max(1, Math.min(TOTAL_SLIDES, Math.ceil(v * TOTAL_SLIDES) || 1)));
  });

  const scrollSlide = (dir: 1 | -1) => {
    window.scrollBy({ top: dir * window.innerHeight, behavior: "smooth" });
  };

  return (
    <div ref={containerRef} className={`relative h-[${TOTAL_SLIDES * 100}vh]`} style={{ height: `${TOTAL_SLIDES * 100}vh` }}>
      <div className="sticky top-0 h-screen overflow-hidden">

        {/* Progress bar */}
        <div className="absolute top-0 left-0 right-0 z-20 h-[3px] bg-muted/30">
          <motion.div
            className="h-full bg-accent shadow-[0_0_12px_rgba(249,115,22,0.6)]"
            style={{ scaleX, transformOrigin: "left" }}
          />
        </div>

        {/* Slide counter */}
        <div className="absolute bottom-6 right-6 z-20 rounded-full border border-border bg-card/70 backdrop-blur-sm px-3 py-1.5 font-mono text-xs text-muted-foreground select-none">
          <span className="text-accent font-semibold">{String(slide).padStart(2, "0")}</span> / {String(TOTAL_SLIDES).padStart(2, "0")}
        </div>

        {/* Left arrow */}
        {slide > 1 && (
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.94 }}
            onClick={() => scrollSlide(-1)}
            className="absolute left-6 top-1/2 -translate-y-1/2 z-20 rounded-full border border-border bg-card/80 backdrop-blur-sm h-11 w-11 flex items-center justify-center transition-all duration-300 hover:border-accent/50 hover:bg-card hover:shadow-[0_0_20px_-6px] hover:shadow-accent/40"
          >
            <ChevronLeft className="h-4 w-4 text-foreground" />
          </motion.button>
        )}

        {/* Right arrow */}
        {slide < TOTAL_SLIDES && (
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.94 }}
            onClick={() => scrollSlide(1)}
            className="absolute right-6 top-1/2 -translate-y-1/2 z-20 rounded-full border border-border bg-card/80 backdrop-blur-sm h-11 w-11 flex items-center justify-center transition-all duration-300 hover:border-accent/50 hover:bg-card hover:shadow-[0_0_20px_-6px] hover:shadow-accent/40"
          >
            <ChevronRight className="h-4 w-4 text-foreground" />
          </motion.button>
        )}

        {/* Slide track */}
        <motion.div className={`flex h-full w-[${TOTAL_SLIDES * 100}vw]`} style={{ x, width: `${TOTAL_SLIDES * 100}vw` }}>
          <Slide1 mobile={false} />
          <Slide2 mobile={false} />
          <Slide3 mobile={false} />
          <Slide4Hybrid mobile={false} />
          <Slide5Reliability mobile={false} />
          <Slide6 mobile={false} />
        </motion.div>
      </div>
    </div>
  );
}

// ─── Mobile Stacked ───────────────────────────────────────────────────────────

function MobileStory() {
  return (
    <div className="mt-10">
      <Slide1 mobile />
      <Slide2 mobile />
      <Slide3 mobile />
      <Slide4Hybrid mobile />
      <Slide5Reliability mobile />
      <Slide6 mobile />
    </div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────

const WhyChooseUs = () => {
  return (
    <section className="relative bg-transparent py-28">
      <style>{`
        @keyframes count-up {
          from { opacity: 0; transform: translateY(12px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .stat-animate { animation: count-up 0.7s ease both; }
        .stat-animate:nth-child(2) { animation-delay: 0.15s; }
        .stat-animate:nth-child(3) { animation-delay: 0.3s; }
        .stat-animate:nth-child(4) { animation-delay: 0.45s; }
        .dot-grid {
          background-image: radial-gradient(circle, rgba(255,107,0,0.15) 1px, transparent 1px);
          background-size: 28px 28px;
        }
      `}</style>

      <div className="dot-grid absolute inset-0 -z-10" />

      <div className="mt-16 hidden lg:block">
        <HorizontalStory />
      </div>

      <div className="lg:hidden mx-auto max-w-7xl px-6">
        <MobileStory />
      </div>
    </section>
  );
};

export default WhyChooseUs;