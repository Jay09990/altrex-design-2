import { useRef } from "react";

import {
  Building2,
  MapPin,
  Globe,
  Rocket,
  Cpu,
  TrendingUp,
  Globe2,
  ShieldCheck,
  Sparkles,
  Users,
} from "lucide-react";
import { FaLinkedinIn } from "react-icons/fa6";

import { motion, useInView, type Variants } from "framer-motion";

import { Button } from "@/components/ui/button";
import { SectionBadge } from "@/components/ui/section-badge";
import CharReveal from "@/components/CharReveal";
import DecryptedText from "@/components/DecryptedText";
import ScrambleCounter from "@/components/ScrambleCounter";
import { useMagneticTilt } from "@/hooks/useMagneticTilt";
import { useState, useEffect, useCallback } from "react";
import { useTheme } from "@/hooks/useTheme";
import CTASection from "@/components/CTASection";
import { Card } from "@/components/ui/card";
import CaseStudies from "@/components/sections/CaseStudies";
import HowWeWork from "@/components/sections/HowWeWork";

// ─── Milestone data — matches reference image exactly ──────────────────────
const MILESTONES = [
  {
    year: "2021",
    icon: Rocket,
    title: "Founded",
    body: "Born in Ahmedabad to solve industrial data complexity.",
    color: "#e8651a", // brand orange
    yearColor: "#e8651a",
  },
  {
    year: "2022",
    icon: Cpu,
    title: "Platform v1",
    body: "First realtime SCADA platform deployed at scale.",
    color: "#3b82f6", // blue
    yearColor: "#3b82f6",
  },
  {
    year: "2023",
    icon: TrendingUp,
    title: "200+ Sites",
    body: "Expanded across oil & gas, power, and manufacturing.",
    color: "#10b981", // green
    yearColor: "#10b981",
  },
  {
    year: "2024",
    icon: Globe2,
    title: "Global Reach",
    body: "AI layer launched. 9 industries. Global footprint.",
    color: "#8b5cf6", // violet
    yearColor: "#8b5cf6",
  },
] as const;

/* ─── Shared Variants ────────────────────────────────────────────────────── */

const fadeUpVariants: Variants = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.65 } },
};

const containerVariants: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

/* ─── Data ───────────────────────────────────────────────────────────────── */

const values = [
  {
    icon: ShieldCheck,
    title: "Reliability",
    description:
      "Mission-critical infrastructure built for nonstop operations.",
  },
  {
    icon: Sparkles,
    title: "Innovation",
    description: "Continuous R&D driving next-generation industrial platforms.",
  },
  {
    icon: Users,
    title: "Customer Success",
    description:
      "Long-term partnerships focused on measurable business impact.",
  },
];

const stats = [
  { value: 200, suffix: "+", label: "Global Deployments" },
  { value: 50, suffix: "+", label: "Team Members" },
  { value: 99.99, suffix: "%", label: "Uptime SLA" },
  { value: 15, suffix: "ms", label: "Avg Latency" },
];

const timeline = [
  {
    level: "Level 1",
    timeLabel: "μs / ms to generate",
    title: "Data Source",
    description:
      "Field devices — PLCs, Sensors, RTUs, Flow Computers, Rectifiers, Panels, VFDs, and Smart Meters — generate raw operational data at microsecond to millisecond resolution.",
    tags: ["PLCs", "Sensors", "RTUs", "Flow Computers", "VFDs", "Smart Meters"],
    status: "completed",
  },
  {
    level: "Level 2",
    timeLabel: "Seconds to acquire",
    title: "Data Acquisition",
    description:
      "Industrial acquisition layer — SCADA, DCS, HMI, GPRS/GSM, Gateways, Historian, Data Logger, and W! Controller — captures and consolidates field data within seconds.",
    tags: ["SCADA", "DCS", "HMI", "Gateways", "Historian", "Data Logger"],
    status: "completed",
  },
  {
    level: "Level 3",
    timeLabel: "Minutes to process",
    title: "IoT Platform",
    description:
      "Cloud-connected IoT backbone handling OT-IT Integration, Connectivity, Web-Server, Database, Cloud (Azure / GCP / AWS), Cyber-Security, DMZ, and Authentication.",
    tags: [
      "OT-IT Integration",
      "Cloud",
      "Cyber-Security",
      "DMZ",
      "Authentication",
    ],
    status: "completed",
  },
  {
    level: "Level 4",
    timeLabel: "Days / Months to analyze",
    title: "Enterprise Application",
    description:
      "Full enterprise layer delivering Dashboards, Authentication Levels, Assets Mapping / GIS, Insights & Analytics, Notifications & Alerts, Customized Reports, ERP & SAP Connectivity, and Billing Center.",
    tags: ["Dashboards", "GIS", "Analytics", "ERP / SAP", "Billing Center"],
    status: "current", // ← we are here
  },
  {
    level: "Level 5",
    timeLabel: "Quarters / Years to learn",
    title: "AI / ML Intelligence",
    description:
      "The final frontier — Predictive Analytics, Predictive Insights, Digital Twins, Artificial Intelligence, Machine Learning, and Deep Learning transforming industrial operations.",
    tags: [
      "Predictive Analytics",
      "Digital Twins",
      "AI",
      "ML",
      "Deep Learning",
    ],
    status: "upcoming",
  },
];
const team = [
  {
    initials: "RD",
    name: "Ravi Dondeti",
    role: "Founder / CEO",
    bio: "Leading Altrex's vision for industrial intelligence platforms.",
  },
  {
    initials: "DK",
    name: "Daniel Kim",
    role: "CTO",
    bio: "Architecting scalable realtime industrial infrastructure.",
  },
  {
    initials: "EC",
    name: "Emily Carter",
    role: "Head of Product",
    bio: "Designing powerful industrial workflows and experiences.",
  },
  {
    initials: "SP",
    name: "Sarah Patel",
    role: "Head of Customer Success",
    bio: "Helping industries modernise operations with confidence.",
  },
];

const principles = [
  {
    number: "01",
    title: "Transparency",
    description: "Open, honest communication with every client at every stage.",
  },
  {
    number: "02",
    title: "Reliability",
    description: "99.99% uptime backed by redundant global infrastructure.",
  },
  {
    number: "03",
    title: "Innovation",
    description: "Continuous R&D investment in AI, ML, and edge computing.",
  },
  {
    number: "04",
    title: "Security",
    description: "Enterprise-grade encryption and SOC 2 compliant practices.",
  },
  {
    number: "05",
    title: "Speed",
    description: "Sub-15ms response times across all platform services.",
  },
  {
    number: "06",
    title: "Partnership",
    description: "Long-term relationships, not one-time transactions.",
  },
];

/* ─── Section: Hero ──────────────────────────────────────────────────────── */

function MilestoneCard({
  milestone,
  index,
  inView,
  isActive,
  onHover,
}: {
  milestone: (typeof MILESTONES)[number];
  index: number;
  inView: boolean;
  isActive: boolean;
  onHover: (i: number | null) => void;
}) {
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const tilt = useMagneticTilt({ maxRotate: 6, perspective: 900 });
  const Icon = milestone.icon;

  return (
    <motion.div
      className="relative flex cursor-default items-center gap-4 rounded-[18px] px-4 py-3.5 transition-shadow duration-300"
      style={{
        background: isDark
          ? isActive
            ? `rgba(255,255,255,0.04)`
            : `rgba(255,255,255,0.025)`
          : isActive
            ? `rgba(255,255,255,0.95)`
            : `rgba(255,255,255,0.8)`,
        border: `1px solid ${isActive ? milestone.color + "40" : isDark ? "rgba(255,255,255,0.07)" : "rgba(0,0,0,0.06)"}`,
        boxShadow: isActive
          ? `0 8px 32px -6px ${milestone.color}28, 0 0 0 1px ${milestone.color}14`
          : isDark
            ? `0 2px 12px rgba(0,0,0,0.25)`
            : `0 2px 12px rgba(0,0,0,0.05)`,
        transformStyle: "preserve-3d",
      }}
      initial={{ opacity: 0, x: 32 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{
        delay: 0.35 + index * 0.13,
        duration: 0.55,
        ease: [0.22, 1, 0.36, 1],
      }}
      whileHover={{ y: -2 }}
      onMouseMove={tilt.onMouseMove}
      onMouseLeave={(e) => {
        tilt.onMouseLeave(e);
        onHover(null);
      }}
      onMouseEnter={() => onHover(index)}
    >
      {/* Icon box — matches reference image rounded square */}
      <div
        className="flex h-11 w-11 shrink-0 items-center justify-center rounded-[13px] transition-all duration-300"
        style={{
          background: isActive
            ? `${milestone.color}20`
            : isDark
              ? `${milestone.color}14`
              : `${milestone.color}12`,
          border: `1.5px solid ${milestone.color}${isActive ? "45" : "28"}`,
          boxShadow: isActive ? `0 4px 14px ${milestone.color}28` : "none",
        }}
      >
        <Icon
          size={19}
          color={milestone.color}
          strokeWidth={isActive ? 2.2 : 1.9}
          style={{ transition: "stroke-width 0.2s" }}
        />
      </div>

      {/* Text */}
      <div className="flex-1 min-w-0">
        <p
          className="font-bold leading-none tracking-tight text-[var(--text-primary)] transition-colors duration-200"
          style={{
            fontSize: 14,
            color: isActive ? milestone.color : undefined,
          }}
        >
          {milestone.title}
        </p>
        <p
          className="mt-1 leading-snug text-muted-foreground font-medium text-xs"
        >
          {milestone.body}
        </p>
      </div>

      {/* Right-edge accent bar — matches reference image */}
      <motion.div
        className="absolute right-0 top-[16%] h-[64%] w-[3.5px] rounded-l-full"
        style={{
          background: `linear-gradient(to bottom, ${milestone.color}, ${milestone.color}50)`,
        }}
        initial={{ scaleY: 0, opacity: 0 }}
        animate={inView ? { scaleY: 1, opacity: 1 } : {}}
        transition={{
          delay: 0.5 + index * 0.13,
          duration: 0.4,
          ease: [0.22, 1, 0.36, 1],
        }}
      />
    </motion.div>
  );
}

// ─── SVG spine with animated traveling dot ────────────────────────────────
function TimelineSpine({
  inView,
  activeIdx,
}: {
  inView: boolean;
  activeIdx: number | null;
}) {
  const N = MILESTONES.length;
  const CARD = 72; // approx card height px
  const GAP = 12; // gap between cards px
  const TOTAL = N * CARD + (N - 1) * GAP;
  const Y1 = 10;
  const Y2 = TOTAL - 10;

  return (
    <svg
      className="absolute left-[-20px] top-0 hidden xl:block pointer-events-none"
      width={2}
      height={TOTAL}
      viewBox={`0 0 2 ${TOTAL}`}
      fill="none"
    >
      {/* Ghost track */}
      <line
        x1={1}
        y1={Y1}
        x2={1}
        y2={Y2}
        stroke="var(--border-border)"
        strokeWidth={1.5}
        strokeDasharray="4 7"
      />
      {/* Revealed foreground */}
      <motion.line
        x1={1}
        y1={Y1}
        x2={1}
        y2={Y2}
        stroke="var(--accent-violet)"
        strokeWidth={1.5}
        strokeOpacity={0.5}
        initial={{ pathLength: 0 }}
        animate={inView ? { pathLength: 1 } : {}}
        transition={{ delay: 0.4, duration: 1.5, ease: "easeInOut" }}
      />
      {/* Looping travel dot */}
      {inView && (
        <motion.circle
          cx={1}
          cy={0}
          r={3}
          fill="var(--accent-violet)"
          animate={{ cy: [Y1, Y2] }}
          transition={{
            delay: 0.8,
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      )}
      {/* Node dots at each card */}
      {Array.from({ length: N }).map((_, i) => {
        const cy = Y1 + i * (CARD + GAP) + CARD / 2 - Y1;
        const isAct = activeIdx === i;
        return (
          <motion.circle
            key={i}
            cx={1}
            cy={cy}
            r={isAct ? 4.5 : 3.5}
            fill={isAct ? MILESTONES[i].color : "var(--bg-surface)"}
            stroke={isAct ? MILESTONES[i].color : "var(--accent-violet)"}
            strokeWidth={1.5}
            initial={{ opacity: 0, scale: 0 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{
              delay: 0.4 + i * 0.13,
              type: "spring",
              stiffness: 280,
            }}
            style={{ transition: "r 0.2s, fill 0.2s" }}
          />
        );
      })}
    </svg>
  );
}

// ─── Company Journey right-side panel ─────────────────────────────────────
function CompanyJourneyPanel({ inView }: { inView: boolean }) {
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const [activeIdx, setActiveIdx] = useState<number | null>(null);

  // Auto-cycle highlight when nothing is hovered
  const [autoPaused, setAutoPaused] = useState(false);
  const cycleRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const startCycle = useCallback(() => {
    if (cycleRef.current) clearInterval(cycleRef.current);
    cycleRef.current = setInterval(() => {
      setActiveIdx((p) => (p === null ? 0 : (p + 1) % MILESTONES.length));
    }, 2200);
  }, []);

  useEffect(() => {
    if (inView && !autoPaused) startCycle();
    return () => {
      if (cycleRef.current) clearInterval(cycleRef.current);
    };
  }, [inView, autoPaused, startCycle]);

  const handleHover = useCallback((i: number | null) => {
    setAutoPaused(i !== null);
    if (i !== null) {
      if (cycleRef.current) clearInterval(cycleRef.current);
      setActiveIdx(i);
    } else {
      // Resume after short delay
      setTimeout(() => setAutoPaused(false), 1200);
    }
  }, []);

  return (
    <motion.div
      className="relative hidden lg:flex lg:flex-col"
      initial={{ opacity: 0, x: 40 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ delay: 0.25, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
    >
      {/* Ambient glow behind the panel — shifts with active card color */}
      <motion.div
        className="pointer-events-none absolute -inset-8 -z-10 rounded-3xl blur-2xl"
        animate={{
          background:
            activeIdx !== null
              ? `radial-gradient(ellipse at 60% 40%, ${MILESTONES[activeIdx].color}14, transparent 70%)`
              : isDark
                ? `radial-gradient(ellipse at 60% 40%, rgba(232,101,26,0.08), transparent 70%)`
                : `radial-gradient(ellipse at 60% 40%, rgba(232,101,26,0.06), transparent 70%)`,
        }}
        transition={{ duration: 0.6 }}
      />

      {/* ── Top: pulse dot + COMPANY JOURNEY label ── */}
      <motion.div
        className="mb-5 flex flex-col items-start gap-2"
        initial={{ opacity: 0, y: -10 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ delay: 0.3, duration: 0.45 }}
      >
        {/* Label */}
        <p
          className="font-mono text-xs text-muted-foreground font-semibold uppercase tracking-[0.1em]"
        >
          Company Journey
        </p>
      </motion.div>

      {/* ── Cards + spine ── */}
      <div className="relative xl:pl-8">
        <TimelineSpine inView={inView} activeIdx={activeIdx} />

        <div className="flex flex-col gap-3">
          {/* Year labels sit in the XL-only column to the left */}
          {MILESTONES.map((m, i) => (
            <div key={m.year} className="relative flex items-center gap-0">
              {/* Year — hidden below xl, shown as inline pill on smaller lg */}
              <motion.span
                className="absolute -left-[52px] hidden w-[44px] text-right font-mono text-[11px] font-bold xl:block"
                style={{
                  color: activeIdx === i ? m.yearColor : `${m.yearColor}70`,
                  top: "50%",
                  transform: "translateY(-50%)",
                  transition: "color 0.25s",
                }}
                initial={{ opacity: 0 }}
                animate={inView ? { opacity: 1 } : {}}
                transition={{ delay: 0.4 + i * 0.13 }}
              >
                {m.year}
              </motion.span>

              <div className="flex-1">
                <MilestoneCard
                  milestone={m}
                  index={i}
                  inView={inView}
                  isActive={activeIdx === i}
                  onHover={handleHover}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── "AND BEYOND →" footer — matches reference image ── */}
      <motion.div
        className="mt-5 flex items-center gap-3 xl:pl-8"
        initial={{ opacity: 0, y: 10 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ delay: 1.0, duration: 0.45 }}
      >
        <div
          className="h-px w-8"
          style={{
            background:
              "linear-gradient(to right, var(--accent-violet), transparent)",
          }}
        />
        <span
          className="font-mono text-xs font-semibold uppercase tracking-[0.1em] text-muted-foreground"
        >
          And Beyond →
        </span>
      </motion.div>
    </motion.div>
  );
}

// ─── HeroSection — complete replacement ───────────────────────────────────
function HeroSection() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      ref={ref}
      className="relative flex min-h-[60vh] items-center overflow-hidden bg-transparent pt-20 pb-16 sm:min-h-[90vh] sm:pt-32 sm:pb-24"
    >
      {/* ── Existing background (unchanged) ── */}
      <div className="bg-grid absolute inset-0 -z-20 opacity-[0.35]" />
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -left-24 top-24 h-[520px] w-[520px] rounded-full bg-violet-500/10 blur-3xl" />
        <div className="absolute -right-24 bottom-0 h-[520px] w-[520px] rounded-full bg-fuchsia-500/10 blur-3xl" />
      </div>

      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 items-center gap-16 lg:grid-cols-[1.1fr_1fr] lg:gap-10 xl:grid-cols-[1.15fr_1fr] xl:gap-20">
          {/* ══════════════ LEFT — existing content (100% unchanged) ══════════════ */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            className="text-center lg:text-left"
          >
            {/* Badge */}
            <motion.div
              variants={fadeUpVariants}
              initial="hidden"
              animate="visible"
            >
              <SectionBadge
                title="our story"
                dot={true}
                dotColor="bg-emerald-500"
              />
            </motion.div>

            {/* H1 */}
            <CharReveal
              as="h1"
              lines={["WE ARE BUILDING THE", "FUTURE OF INDUSTRIAL", "INTELLIGENCE"]}
              className="mx-auto max-w-5xl text-2xl font-bold tracking-[-0.04em] text-foreground sm:text-3xl lg:mx-0 lg:text-4xl xl:text-5xl mt-8 sm:mt-16 leading-tight sm:leading-[0.95]"
              className="mx-auto max-w-5xl text-2xl font-bold tracking-[-0.04em] text-foreground sm:text-3xl lg:mx-0 lg:text-4xl xl:text-5xl mt-8 sm:mt-16 leading-tight sm:leading-[0.95]"
              immediate
              delay={0}
              stagger={0.028}
              lineGap="mt-2 sm:mt-2"
            />

            {/* Subtitle */}
            <motion.p
              variants={fadeUpVariants}
              className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-muted-foreground sm:mt-8 sm:text-lg font-semibold sm:leading-8 lg:mx-0"
            >
              Altrex builds scalable industrial IoT infrastructure powering
              realtime SCADA systems, AI-driven analytics, asset intelligence,
              and industrial automation platforms globally.
            </motion.p>

            {/* Stat chips */}
            <motion.div
              variants={fadeUpVariants}
              className="mt-10 flex flex-wrap items-center justify-center gap-2.5 sm:mt-12 sm:gap-4 lg:justify-start"
            >
              {[
                { icon: Building2, label: "Founded 2021" },
                { icon: MapPin, label: "Ahmedabad, India" },
                { icon: Globe, label: "200+ Global Deployments" },
              ].map(({ icon: Icon, label }) => (
                <div
                  key={label}
                  className="inline-flex items-center gap-1.5 rounded-full border border-border px-3 py-1.5 sm:gap-2 sm:px-5 sm:py-2.5"
                >
                  <Icon className="h-3.5 w-3.5 text-accent sm:h-4 sm:w-4" />
                  <span className="text-[11px] font-medium text-primary sm:text-sm">
                    {label}
                  </span>
                </div>
              ))}
            </motion.div>

          </motion.div>
          
          <CompanyJourneyPanel inView={inView} />
        </div>

        {/* Mobile fallback — Journey panel shown below content on small screens */}
        <motion.div
          className="mt-14 block lg:hidden"
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.6, duration: 0.5 }}
        >
          {/* Compact mobile version — simple card list, no spine */}
          <p className="mb-4 text-center font-mono text-[10px] font-semibold uppercase tracking-[0.28em] text-[var(--text-muted)]">
            Company Journey
          </p>
          <div className="flex flex-col gap-2.5">
            {MILESTONES.map((m, i) => {
              const Icon = m.icon;
              return (
                <motion.div
                  key={m.year}
                  className="flex items-center gap-3 rounded-2xl border px-4 py-3"
                  style={{
                    background: "var(--bg-surface)",
                    borderColor: `${m.color}25`,
                    boxShadow: `0 2px 12px ${m.color}10`,
                  }}
                  initial={{ opacity: 0, x: 16 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 0.65 + i * 0.1, duration: 0.4 }}
                >
                  {/* Year pill */}
                  <span
                    className="w-[36px] shrink-0 text-right font-mono text-[11px] font-bold"
                    style={{ color: `${m.yearColor}90` }}
                  >
                    {m.year}
                  </span>
                  <div
                    className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl"
                    style={{
                      background: `${m.color}14`,
                      border: `1px solid ${m.color}30`,
                    }}
                  >
                    <Icon size={16} color={m.color} strokeWidth={2} />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p
                      className="font-bold text-[var(--text-primary)]"
                      style={{ fontSize: 13 }}
                    >
                      {m.title}
                    </p>
                    <p
                      className="truncate text-[var(--text-muted)]"
                      style={{ fontSize: 11 }}
                    >
                      {m.body}
                    </p>
                  </div>
                  {/* Accent bar */}
                  <div
                    className="h-[60%] w-[3px] shrink-0 rounded-full"
                    style={{ background: m.color }}
                  />
                </motion.div>
              );
            })}
          </div>
          <div className="mt-4 flex items-center justify-center gap-2">
            <div
              className="h-px w-6"
              style={{
                background:
                  "linear-gradient(to right, var(--accent-violet), transparent)",
              }}
            />
            <span
              className="font-mono text-[10px] font-semibold uppercase tracking-[0.28em]"
              style={{ color: "var(--accent-violet)" }}
            >
              And Beyond →
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

/* ─── Section: Mission ───────────────────────────────────────────────────── */

function MissionSection() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      ref={ref}
      className="relative overflow-hidden bg-transparent py-24"
    >
      <div className="pointer-events-none absolute inset-0 -z-10 opacity-40">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "radial-gradient(circle, rgba(139,92,246,0.14) 1px, transparent 1px)",
            backgroundSize: "34px 34px",
          }}
        />
      </div>

      <div className="mx-auto grid max-w-7xl gap-16 px-6 lg:grid-cols-2 lg:px-8">
        {/* LEFT — pull quote with GradientText on the accent word */}
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
        >
          <SectionBadge
            title="MISSION"
            dot={true}
            dotColor="bg-emerald-500"
            className="mb-8"
          />

          <h2 className="mt-6 text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
            Empowering industries through realtime intelligence
          </h2>

          <p className="mt-8 text-lg font-semibold leading-8 text-muted-foreground">
            We believe industrial operations should be intelligent, connected,
            secure, and data-driven. Our mission is to simplify industrial
            digital transformation through scalable realtime infrastructure and
            modern industrial software.
          </p>
        </motion.div>

        {/* RIGHT — staggered value cards */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="grid gap-6"
        >
          {values.map((item, i) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={i}
                variants={cardVariants}
                className="rounded-3xl border border-border bg-card p-8"
              >
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl text-accent border border-border">
                  <Icon className="h-6 w-6" />
                </div>
                <h3 className="mt-6 text-xl font-semibold text-foreground">
                  {item.title}
                </h3>
                <p className="mt-3 text-muted-foreground font-medium">{item.description}</p>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}

/* ─── Section: Stats Bar ─────────────────────────────────────────────────── */

function StatsSection() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <section ref={ref} className="relative bg-transparent py-16">

      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="grid grid-cols-2 divide-x divide-y divide-border rounded-3xl border border-border bg-card shadow-sm md:grid-cols-4 md:divide-y-0"
        >
          {stats.map((stat, i) => (
            <div
              key={i}
              className="flex flex-col items-center justify-center px-8 py-12"
            >
              <div className="text-4xl font-bold text-foreground">
                <ScrambleCounter
                  target={Math.max(1, Math.floor(stat.value))}
                  finalText={`${stat.value}${stat.suffix}`}
                  intervalMs={30}
                  totalFrames={40}
                />
              </div>
              <p className="mt-2 text-center text-sm font-medium text-muted-foreground">
                {stat.label}
              </p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

/* ─── Section: Team ──────────────────────────────────────────────────────── */

function TeamSection() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const tilt = useMagneticTilt({ maxRotate: 10, perspective: 900 });

  return (
    <section
      ref={ref}
      className="relative overflow-hidden bg-transparent py-24"
    >

      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="text-center">
          <SectionBadge
            title="THE TEAM"
            dot={true}
            dotColor="bg-emerald-500"
            className="mb-6"
          />
          <h2 className="mt-6 text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
            People behind the platform
          </h2>
        </div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="mt-16 grid gap-6 md:grid-cols-2 lg:grid-cols-4"
        >
          {team.map((member, i) => (
            <motion.div
              key={i}
              variants={cardVariants}
              onMouseMove={tilt.onMouseMove}
              onMouseLeave={tilt.onMouseLeave}
              whileHover={{ y: -4 }}
              transition={{ duration: 0.25 }}
              style={{ transformStyle: "preserve-3d" }}
              className="rounded-3xl border border-border bg-card p-8"
            >
              {/* Gradient avatar with initials */}
              <div className="flex h-20 w-20 items-center justify-center rounded-full bg-primary text-2xl font-bold text-white shadow-lg">
                {member.initials}
              </div>

              <h3 className="mt-6 text-xl font-semibold text-foreground">
                {member.name}
              </h3>
              <p className="mt-1 text-sm font-medium text-accent">
                {member.role}
              </p>
              <p className="mt-4 font-medium leading-7 text-sm text-muted-foreground">
                {member.bio}
              </p>

              <Button
                size="icon"
                variant="outline"
                aria-label={`LinkedIn ${member.name}`}
                className="mt-4"
              >
                <FaLinkedinIn className="h-4 w-4" />
              </Button>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

/* ─── Section: Values ────────────────────────────────────────────────────── */

// StarBorder renders a dark card by default — we override the inner content
// with our own white card and pass `as="div"` so it doesn't render as a button.
function ValuesSection() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section ref={ref} className="relative bg-transparent py-24">

      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="text-center">
          <SectionBadge
            title="WHAT DRIVES US"
            dot={true}
            dotColor="bg-emerald-500"
            className="mb-8"
          />
          <h2 className="mt-6 text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
            Built on principles that matter
          </h2>
        </div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="mt-16 grid gap-6 md:grid-cols-2 xl:grid-cols-3"
        >
          {principles.map((item, i) => (
            <motion.div key={i} variants={cardVariants}>
              {/*
                StarBorder wraps the card with an animated glowing star that
                sweeps around the border. `as="div"` prevents it rendering a <button>.
                `color` matches our violet accent. `speed` slows it for elegance.
                We override the inner div styling via className on StarBorder,
                then put our actual card content inside.
              */}
              <Card
                className="h-full p-6"
              >
                <div className="">
                  <div className="bg-accent bg-clip-text text-6xl font-bold text-transparent">
                    {item.number}
                  </div>
                  <h3 className="mt-4 text-xl font-semibold text-foreground">
                    {item.title}
                  </h3>
                  <p className="mt-3 leading-7 text-muted-foreground font-medium">
                    {item.description}
                  </p>
                </div>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

/* ─── Page ───────────────────────────────────────────────────────────────── */

const About = () => {
  return (
    <div className="overflow-hidden bg-background">
      <HeroSection />
      <CaseStudies />
      <HowWeWork />
      <MissionSection />
      <StatsSection />
      {/* <TimelineSection /> */}
      <TeamSection />
      <ValuesSection />
      <CTASection
            title="Ready to transform your operations"
            description="Build smarter industrial systems with realtime intelligence, AI-driven analytics, and scalable infrastructure."
            primaryButton={{ label: "Explore Solutions", href: "#" }}
            secondaryButton={{ label: "Schedule a Demo", href: "#" }}
          />
    </div>
  );
};

export default About;
