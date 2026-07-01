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
  useMotionValueEvent,
  type Variants,
} from "framer-motion";

import { SectionBadge } from "../ui/section-badge";
import { Button } from "../ui/button";

// ─── Preserved variants ────────────────────────────────────────────────────────

const containerVariants: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};

const fadeUpVariants: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7 } },
};

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

// ─── Slide 1 — The Problem ────────────────────────────────────────────────────

function Slide1({ mobile }: { mobile: boolean }) {
  const painPoints = [
    "Manual meter reading & data entry",
    "Delayed fault detection",
    "No unified asset visibility",
  ];
  return (
    <div className={`relative flex flex-col items-center justify-center text-center px-8 ${mobile
        ? "min-h-[70vh] py-16 border-b border-[var(--border-subtle)]"
        : "w-[100vw] h-full flex-shrink-0"
      }`}>
      {/* Background glyph */}
      <div className="absolute inset-0 flex items-center justify-center select-none pointer-events-none overflow-hidden">
        <span className="text-[30vw] font-black text-muted-foreground/[0.04] leading-none">?</span>
      </div>

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
              className="flex items-center gap-3"
            >
              <span className="text-red-400 font-bold shrink-0">✗</span>
              <span className="text-sm text-muted-foreground/70 line-through decoration-red-400/40">{p}</span>
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
    <div className={`relative flex flex-col items-center justify-center px-8 bg-gradient-to-r from-background to-blue-950/10 ${mobile ? "min-h-[70vh] py-16 border-b border-[var(--border-subtle)]" : "w-[100vw] h-full flex-shrink-0"
      }`}>
      <div className="max-w-xl text-center">
        <div className="flex justify-center mb-8">
          <svg viewBox="0 0 24 24" className="h-24 w-24 text-blue-400" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
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
            <motion.span key={c}
              initial={{ opacity: 0, scale: 0.8 }} whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: false }}
              transition={{ type: "spring", stiffness: 260, damping: 20, delay: 0.5 + idx * 0.1 }}
              className="rounded-full border border-blue-400/20 bg-blue-400/5 text-blue-400 text-xs px-3 py-1">
              {c}
            </motion.span>
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

  return (
    <div className={`relative flex flex-col items-center justify-center px-8 bg-gradient-to-r from-background to-orange-950/10 ${mobile ? "min-h-[70vh] py-16 border-b border-[var(--border-subtle)]" : "w-[100vw] h-full flex-shrink-0"
      }`}>
      <div className="max-w-xl text-center">
        <div className="flex justify-center mb-8">
          <svg viewBox="0 0 24 24" className="h-24 w-24 text-orange-400" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
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
        </div>

        <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: false }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="font-mono text-xs tracking-[0.2em] uppercase text-orange-400/70 mb-3">
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

        {/* SVG Bar Chart */}
        <div className="flex justify-center mt-6">
          <svg width="300" height="120" viewBox="0 0 300 120" overflow="visible">
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
              return (
                <motion.rect
                  key={i}
                  x={x} width={barW} rx={3}
                  initial={{ height: 0, y: chartH }}
                  whileInView={{ height: bH, y: chartH - bH }}
                  viewport={{ once: false }}
                  transition={{ duration: 0.7, delay: 0.5 + i * 0.1, ease: "easeOut" }}
                  fill="#f97316" opacity={0.7}
                  filter={i === bars.length - 1 ? "url(#bar-glow)" : undefined}
                />
              );
            })}
          </svg>
        </div>

        <div className="mt-4 flex flex-wrap gap-2 justify-center">
          {chips.map((c, idx) => (
            <motion.span key={c}
              initial={{ opacity: 0, scale: 0.8 }} whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: false }}
              transition={{ type: "spring", stiffness: 260, damping: 20, delay: 1.0 + idx * 0.1 }}
              className="rounded-full border border-orange-400/20 bg-orange-400/5 text-orange-400 text-xs px-3 py-1">
              {c}
            </motion.span>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── Slide 4 — Hybrid + Reliability (split) ───────────────────────────────────

function HybridPanel() {
  const chips = ["On-Premise", "Cloud", "Edge-Ready"];
  return (
    <div className="flex-1 flex flex-col items-center justify-center text-center px-8 py-12 bg-gradient-to-r from-background to-teal-950/10">
      <div className="max-w-sm">
        <div className="flex justify-center mb-8">
          <svg viewBox="0 0 24 24" className="h-20 w-20 text-teal-400" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
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
        </div>
        <p className="font-mono text-xs tracking-[0.2em] uppercase text-teal-400/70 mb-3">03 / Deploy</p>
        <h3 className="text-3xl font-bold text-foreground">Hybrid Infrastructure</h3>
        <p className="text-base text-muted-foreground max-w-sm mx-auto mt-4 leading-7">
          Deploy on-premise, cloud, or hybrid environments with edge-ready architecture that adapts to your operational constraints.
        </p>
        <div className="mt-6 flex flex-wrap gap-2 justify-center">
          {chips.map((c, idx) => (
            <motion.span key={c}
              initial={{ opacity: 0, scale: 0.8 }} whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: false }}
              transition={{ type: "spring", stiffness: 260, damping: 20, delay: 0.6 + idx * 0.1 }}
              className="rounded-full border border-teal-400/20 bg-teal-400/5 text-teal-400 text-xs px-3 py-1">
              {c}
            </motion.span>
          ))}
        </div>
      </div>
    </div>
  );
}

function ReliabilityPanel({ inView, refEl }: { inView: boolean; refEl: React.RefObject<HTMLDivElement | null> }) {
  const chips = ["Zero Planned Downtime", "Auto-Failover", "Hot Standby"];
  return (
    <div ref={refEl} className="flex-1 flex flex-col items-center justify-center text-center px-8 py-12 bg-gradient-to-l from-background to-emerald-950/10">
      <div className="max-w-sm">
        <div className="flex justify-center mb-8">
          <svg viewBox="0 0 24 24" className="h-20 w-20 text-emerald-400" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <motion.path d="M22 12h-4l-3 9L9 3l-3 9H2"
              initial={{ pathLength: 0, opacity: 0 }} whileInView={{ pathLength: 1, opacity: 1 }}
              viewport={{ once: false }} transition={{ duration: 1.2, ease: "easeOut" }} />
          </svg>
        </div>
        <p className="font-mono text-xs tracking-[0.2em] uppercase text-emerald-400/70 mb-3">04 / Uptime</p>
        <h3 className="text-3xl font-bold text-foreground">99.99% Reliability</h3>
        <p className="text-base text-muted-foreground max-w-sm mx-auto mt-4 leading-7">
          Mission-critical uptime for industrial operations with redundant infrastructure and intelligent failover.
        </p>
        <div className="mt-6">
          <p className="text-6xl font-black font-mono text-emerald-400">
            <ScrambleUptime inView={inView} />
          </p>
          <p className="text-xs text-muted-foreground mt-1 font-mono tracking-widest">platform availability</p>
        </div>
        <div className="mt-5 flex flex-wrap gap-2 justify-center">
          {chips.map((c, idx) => (
            <motion.span key={c}
              initial={{ opacity: 0, scale: 0.8 }} whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: false }}
              transition={{ type: "spring", stiffness: 260, damping: 20, delay: 0.6 + idx * 0.1 }}
              className="rounded-full border border-emerald-400/20 bg-emerald-400/5 text-emerald-400 text-xs px-3 py-1">
              {c}
            </motion.span>
          ))}
        </div>
      </div>
    </div>
  );
}

function Slide4({ mobile }: { mobile: boolean }) {
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

  if (mobile) {
    return (
      <div className="border-b border-[var(--border-subtle)] flex flex-col">
        <HybridPanel />
        <div className="border-t border-[var(--border-subtle)]" />
        <ReliabilityPanel inView={uptimeInView} refEl={reliabilityRef} />
      </div>
    );
  }

  return (
    <div className="relative w-[100vw] h-full flex-shrink-0 flex">
      <HybridPanel />

      {/* Dividing line with traveling spark */}
      <div className="relative w-px bg-[var(--border-subtle)] flex-shrink-0 self-stretch overflow-hidden">
        <motion.div
          className="absolute left-0 w-[2px] h-16 bg-gradient-to-b from-transparent via-orange-500 to-transparent"
          animate={{ top: ["-15%", "115%"] }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
        />
      </div>

      <ReliabilityPanel inView={uptimeInView} refEl={reliabilityRef} />
    </div>
  );
}

// ─── Slide 5 — The Result ─────────────────────────────────────────────────────

function Slide5({ mobile }: { mobile: boolean }) {
  const metrics = [
    { label: "Connected Devices", value: "2K+", color: "text-orange-400", bar: "bg-orange-500", pct: "72%" },
    { label: "Events / Day", value: "10M+", color: "text-violet-400", bar: "bg-violet-500", pct: "99%" },
    { label: "Availability", value: "99.9%", color: "text-cyan-400", bar: "bg-cyan-500", pct: "95%" },
    { label: "Facilities", value: "10+", color: "text-teal-400", bar: "bg-teal-500", pct: "40%" },
  ];

  return (
    <div className={`relative flex flex-col items-center justify-center px-8 ${mobile ? "min-h-[70vh] py-16" : "w-[100vw] h-full flex-shrink-0"
      }`}>
      <div className="w-full max-w-lg mx-auto">
        <motion.p
          initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false }} transition={{ duration: 0.5 }}
          className="font-mono text-xs tracking-[0.3em] uppercase text-orange-400/70 mb-6 text-center">
          [ SYSTEM ONLINE ]
        </motion.p>
        <motion.h3
          initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false }} transition={{ duration: 0.7, delay: 0.1 }}
          className="text-4xl font-bold text-foreground text-center mb-8">
          Your Operations, Unified.
        </motion.h3>

        <div className="rounded-2xl border border-[var(--border-subtle)] bg-card/60 backdrop-blur-sm p-6 space-y-5">
          {metrics.map((m, i) => (
            <div key={m.label} className="border-b border-[var(--border-subtle)] pb-4 last:border-0 last:pb-0">
              <div className="flex items-baseline justify-between mb-2">
                <motion.p
                  initial={{ opacity: 0, x: -12 }} whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: false }} transition={{ duration: 0.5, delay: 0.3 + i * 0.2 }}
                  className={`text-3xl font-bold font-mono ${m.color}`}>
                  {m.value}
                </motion.p>
                <span className="text-xs text-muted-foreground">{m.label}</span>
              </div>
              <div className="h-[3px] w-full bg-muted/30 rounded-full overflow-hidden">
                <motion.div
                  className={`h-full rounded-full ${m.bar}`}
                  initial={{ width: 0 }}
                  whileInView={{ width: m.pct }}
                  viewport={{ once: false }}
                  transition={{ duration: 1.2, delay: 0.5 + i * 0.2 }}
                />
              </div>
            </div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false }} transition={{ duration: 0.6, delay: 1.2 }}
          className="mt-8 flex flex-col gap-4 sm:flex-row justify-center">
          <Button className="gap-2 bg-accent text-white border-none">Schedule Demo</Button>
          <Button variant="outline" className="gap-2">Contact Sales</Button>
        </motion.div>
      </div>
    </div>
  );
}

// ─── Desktop Horizontal Story ─────────────────────────────────────────────────

function HorizontalStory() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: containerRef });
  const x = useTransform(scrollYProgress, [0, 1], ["0vw", "-400vw"]);
  const scaleX = useTransform(scrollYProgress, [0, 1], [0, 1]);
  const [slide, setSlide] = useState(1);

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    setSlide(Math.max(1, Math.min(5, Math.ceil(v * 5) || 1)));
  });

  const scrollSlide = (dir: 1 | -1) => {
    window.scrollBy({ top: dir * window.innerHeight, behavior: "smooth" });
  };

  return (
    <div ref={containerRef} className="relative h-[500vh]">
      <div className="sticky top-0 h-screen overflow-hidden">

        {/* Progress bar */}
        <div className="absolute top-0 left-0 right-0 z-20 h-[2px] bg-muted/30">
          <motion.div className="h-full bg-orange-500" style={{ scaleX, transformOrigin: "left" }} />
        </div>

        {/* Slide counter */}
        <div className="absolute bottom-6 right-6 z-20 font-mono text-xs text-muted-foreground select-none">
          {String(slide).padStart(2, "0")} / 05
        </div>

        {/* Left arrow */}
        {slide > 1 && (
          <button
            onClick={() => scrollSlide(-1)}
            className="absolute left-6 top-1/2 -translate-y-1/2 z-20 rounded-full border border-[var(--border-subtle)] bg-card/80 backdrop-blur-sm h-10 w-10 flex items-center justify-center hover:border-orange-500/40 hover:bg-card transition-all"
          >
            <ChevronLeft className="h-4 w-4 text-foreground" />
          </button>
        )}

        {/* Right arrow */}
        {slide < 5 && (
          <button
            onClick={() => scrollSlide(1)}
            className="absolute right-6 top-1/2 -translate-y-1/2 z-20 rounded-full border border-[var(--border-subtle)] bg-card/80 backdrop-blur-sm h-10 w-10 flex items-center justify-center hover:border-orange-500/40 hover:bg-card transition-all"
          >
            <ChevronRight className="h-4 w-4 text-foreground" />
          </button>
        )}

        {/* Slide track */}
        <motion.div className="flex h-full w-[500vw]" style={{ x }}>
          <Slide1 mobile={false} />
          <Slide2 mobile={false} />
          <Slide3 mobile={false} />
          <Slide4 mobile={false} />
          <Slide5 mobile={false} />
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
      <Slide4 mobile />
      <Slide5 mobile />
    </div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────

// Suppress unused import warnings (kept for potential future use)
const _unused = { Sparkles, TimerReset, Zap, Globe, Layers3, ShieldCheck };
void _unused;

const WhyChooseUs = () => {
  return (
    // NOTE: overflow-hidden removed — would break position:sticky inside HorizontalStory.
    // The sticky inner div handles its own overflow-hidden to clip the slides.
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

      {/* Dot grid */}
      <div className="dot-grid absolute inset-0 -z-10" />

      {/* ── Section header (unchanged) ── */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.15 }}
        className="mx-auto max-w-7xl px-6 lg:px-8"
      >
        <motion.div variants={fadeUpVariants}>
          <SectionBadge title="WHY CHOOSE US" dot={true} dotColor="bg-emerald-500" className="mb-6" />
        </motion.div>

        <div className="mt-6 max-w-2xl">
          <motion.h2
            variants={fadeUpVariants}
            className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl"
          >
            Ready to Modernize Your{" "}
            <span className="bg-foreground bg-clip-text text-transparent">Operations?</span>
          </motion.h2>

          <motion.p variants={fadeUpVariants} className="mt-4 text-lg text-muted-foreground">
            See how Altrex can help you connect assets, visualize operations, and make smarter decisions.
          </motion.p>

          <motion.div variants={fadeUpVariants} className="mt-8 flex flex-col gap-4 sm:flex-row">
            <Button className="gap-2 bg-accent text-white border-none">Schedule Demo</Button>
            <Button variant="outline" className="gap-2">Contact Sales</Button>
          </motion.div>
        </div>
      </motion.div>

      {/* ── Desktop: Horizontal scroll story ── */}
      <div className="mt-16 hidden lg:block">
        <HorizontalStory />
      </div>

      {/* ── Mobile: Stacked fallback ── */}
      <div className="lg:hidden mx-auto max-w-7xl px-6">
        <MobileStory />
      </div>
    </section>
  );
};

export default WhyChooseUs;
