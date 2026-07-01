import { useState, useRef } from "react";
import { motion, useInView, type Variants } from "framer-motion";
import {
  Building2,
  Car,
  Factory,
  MapPinned,
  Shield,
  PlugZap,
} from "lucide-react";
import { SectionBadge } from "../ui/section-badge";
import { useTheme } from "@/hooks/useTheme";
import darklogo from "@/assets/W!Platform-Logo-dark.png";
import lightlogo from "@/assets/W!Platform Logo.png";

// ─────────────────────────────────────────────────────────────────────────────
// Data
// ─────────────────────────────────────────────────────────────────────────────

const CAPABILITIES = [
  {
    icon: Building2,
    label: "Web SCADA",
    blurb: "Real-time monitoring and control.",
    color: "#3b82f6",
    stat: "< 50ms latency",
  },
  {
    icon: Factory,
    label: "Industrial IoT",
    blurb: "Connect devices and field assets.",
    color: "#10b981",
    stat: "500+ protocols",
  },
  {
    icon: MapPinned,
    label: "GIS & Asset Management",
    blurb: "Location intelligence and asset visibility.",
    color: "#6366f1",
    stat: "Live geofencing",
  },
  {
    icon: Car,
    label: "Fleet Management",
    blurb: "Track vehicles and optimize operations.",
    color: "#f59e0b",
    stat: "GPS + telemetry",
  },
  {
    icon: Shield,
    label: "Video Analytics",
    blurb: "AI-powered surveillance and monitoring.",
    color: "#d946ef",
    stat: "Edge AI inference",
  },
  {
    icon: PlugZap,
    label: "Energy Management",
    blurb: "Monitor and optimize energy consumption.",
    color: "#06b6d4",
    stat: "ISO 50001 ready",
  },
] as const;

const STATS = [
  { value: "9+", label: "Industries" },
  { value: "99.9%", label: "Uptime SLA" },
  { value: "500+", label: "Protocol Support" },
];

const fadeUpVariants: Variants = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.65 } },
};

const headerVariants: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55 } },
};

const listVariants: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.07, delayChildren: 0.15 } },
};

const rowVariants: Variants = {
  hidden: { opacity: 0, x: -18 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] },
  },
};

// ─────────────────────────────────────────────────────────────────────────────
// Orbit diagram — right side, slightly smaller than original
// ─────────────────────────────────────────────────────────────────────────────

function OrbitDiagram({
  activeIdx,
  setActiveIdx,
}: {
  activeIdx: number | null;
  setActiveIdx: (i: number | null) => void;
}) {
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const logo = theme === "dark" ? darklogo : lightlogo;

  const SIZE = 520; // down from 620
  const center = SIZE / 2;
  const RADIUS = 208; // down from 248

  return (
    <div className="relative mx-auto" style={{ width: SIZE, height: SIZE }}>
      {/* Ambient dashed ring */}
      <div
        className="absolute rounded-full pointer-events-none"
        style={{
          width: RADIUS * 2 + 56,
          height: RADIUS * 2 + 56,
          top: center - RADIUS - 28,
          left: center - RADIUS - 28,
          border: "1px dashed var(--border-border)",
          opacity: 0.5,
        }}
      />

      {/* SVG connector lines */}
      <svg
        className="absolute inset-0 pointer-events-none"
        width={SIZE}
        height={SIZE}
      >
        {CAPABILITIES.map((cap, i) => {
          const angle = (i / CAPABILITIES.length) * Math.PI * 2 - Math.PI / 2;
          const x2 = center + Math.cos(angle) * (RADIUS - 38);
          const y2 = center + Math.sin(angle) * (RADIUS - 38);
          const x1 = center + Math.cos(angle) * 72;
          const y1 = center + Math.sin(angle) * 72;
          const isActive = activeIdx === i;

          // Sequential Pipeline Animation:
          // We want a "stream" effect where pulses follow each other.
          // With 6 nodes and a 0.4s stagger, the 6th node starts at 2.0s.
          // By setting duration to 2.0s, the 1st pulse arrives exactly as the 6th starts.
          const STAGGER = 0.4;
          const DURATION = 2.0;
          const TOTAL_CYCLE = CAPABILITIES.length * STAGGER; // 2.4s

          return (
            <g key={cap.label}>
              <line
                x1={x1}
                y1={y1}
                x2={x2}
                y2={y2}
                stroke={cap.color}
                strokeWidth={isActive ? 2 : 1.5}
                strokeOpacity={isActive ? 0.6 : 0.14}
                style={{
                  transition: "stroke-opacity 0.25s, stroke-width 0.25s",
                }}
              />
              <motion.circle
                r={3}
                fill={cap.color}
                initial={{ opacity: 0 }}
                animate={{ cx: [x2, x1], cy: [y2, y1], opacity: [0, 1, 1, 0] }}
                transition={{
                  duration: DURATION,
                  repeat: Infinity,
                  repeatDelay: TOTAL_CYCLE - DURATION,
                  delay: i * STAGGER,
                  ease: "linear",
                }}
              />
            </g>
          );
        })}
      </svg>

      {/* Center hub */}
      <div
        className="absolute z-10 flex flex-col items-center justify-center gap-1.5 rounded-full"
        style={{
          width: 130,
          height: 130,
          left: center - 65,
          top: center - 65,
          background: isDark
            ? "radial-gradient(circle at 38% 32%, #1a1a1a, #0d0d0d)"
            : "radial-gradient(circle at 38% 32%, #ffffff, #f3f3f3)",
          border: "1.5px solid var(--accent-violet)",
          boxShadow:
            "0 0 0 6px color-mix(in srgb, var(--accent-violet) 8%, transparent), 0 8px 28px color-mix(in srgb, var(--accent-violet) 22%, transparent)",
        }}
      >
        <motion.img
          src={logo}
          alt="Altrex"
          className="w-22"
          animate={{ y: [0, -5, 0] }}
          transition={{ duration: 3.4, repeat: Infinity, ease: "easeInOut" }}
        />
        <span className="font-mono text-[8px] tracking-[0.1em] uppercase text-muted-foreground font-semibold">
          One Platform
        </span>
      </div>

      {/* Orbiting nodes */}
      {CAPABILITIES.map((cap, i) => {
        const angle = (i / CAPABILITIES.length) * Math.PI * 2 - Math.PI / 2;
        const x = center + Math.cos(angle) * RADIUS;
        const y = center + Math.sin(angle) * RADIUS;
        const Icon = cap.icon;
        const isActive = activeIdx === i;

        return (
          <motion.div
            key={cap.label}
            className="absolute z-20 flex flex-col items-center"
            style={{ left: x, top: y, transform: "translate(-50%, -50%)" }}
            onMouseEnter={() => setActiveIdx(i)}
            onMouseLeave={() => setActiveIdx(null)}
          >
            <motion.div
              className="flex h-[54px] w-[54px] cursor-pointer items-center justify-center rounded-2xl"
              style={{
                background: isDark
                  ? `linear-gradient(135deg, ${cap.color}22, ${cap.color}0a)`
                  : `linear-gradient(135deg, ${cap.color}18, ${cap.color}06)`,
                border: `1.5px solid ${cap.color}${isActive ? "75" : "35"}`,
                boxShadow: isActive
                  ? `0 8px 28px ${cap.color}45, 0 0 0 4px ${cap.color}12`
                  : `0 4px 16px ${cap.color}12`,
              }}
              animate={{ scale: isActive ? 1.1 : 1 }}
              transition={{ duration: 0.22 }}
            >
              <Icon size={22} color={cap.color} strokeWidth={1.8} />
            </motion.div>

            <motion.span
              className="mt-2 max-w-[100px] text-center text-[11px] font-semibold leading-tight text-primary"
              animate={{ opacity: isActive ? 1 : 0.75 }}
              transition={{ duration: 0.2 }}
            >
              {cap.label}
            </motion.span>
          </motion.div>
        );
      })}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Left content panel
// ─────────────────────────────────────────────────────────────────────────────

function ContentPanel({
  activeIdx,
  setActiveIdx,
  isInView,
}: {
  activeIdx: number | null;
  setActiveIdx: (i: number | null) => void;
  isInView: boolean;
}) {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  return (
    <div className="flex flex-col justify-center gap-8">
      {/* ── Header ── */}
      <motion.div
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        variants={headerVariants}
      >
        <motion.div
          variants={fadeUpVariants}
          initial="hidden"
          animate="visible"
        >
          <SectionBadge
            title="What We Do"
            dot={true}
            className="mb-6"
          />
        </motion.div>

        <h2 className="mt-5 text-4xl font-bold uppercase text-foreground sm:text-5xl">
          One Platform. Endless Possibilities.
        </h2>

        <p className="mt-3 text-lg leading-relaxed text-muted-foreground font-semibold">
          Every capability — one unified stack. No vendor sprawl. No integration
          tax.
        </p>
      </motion.div>

      {/* ── Capability rows ── */}
      <motion.div
        className="flex flex-col gap-2"
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        variants={listVariants}
      >
        {CAPABILITIES.map((cap, i) => {
          const Icon = cap.icon;
          const isActive = activeIdx === i;

          return (
            <motion.div
              key={cap.label}
              variants={rowVariants}
              className="group relative flex cursor-pointer items-center gap-4 rounded-xl px-4 py-3 transition-all duration-200"
              style={{
                background: isActive
                  ? isDark
                    ? `${cap.color}10`
                    : `${cap.color}08`
                  : "transparent",
                border: `1px solid ${isActive ? `${cap.color}30` : "transparent"}`,
              }}
              onMouseEnter={() => setActiveIdx(i)}
              onMouseLeave={() => setActiveIdx(null)}
            >
              {/* Active indicator bar */}
              <div
                className="absolute left-0 top-12 h-8 w-[3px] -translate-y-1/2 rounded-r-full transition-all duration-200"
                style={{
                  background: cap.color,
                  opacity: isActive ? 1 : 0,
                  transform: `translateY(-50%) scaleY(${isActive ? 1 : 0.3})`,
                }}
              />

              {/* Icon */}
              <div
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl transition-all duration-200"
                style={{
                  background: isActive
                    ? isDark
                      ? `${cap.color}18`
                      : `${cap.color}12`
                    : isDark
                      ? "rgba(255,255,255,0.04)"
                      : "rgba(0,0,0,0.03)",
                  border: `1px solid ${cap.color}35`,
                  boxShadow: isActive ? `0 2px 12px ${cap.color}20` : "none",
                }}
              >
                <Icon
                  size={18}
                  color={cap.color}
                  strokeWidth={1.9}
                  style={{ transition: "color 0.2s" }}
                />
              </div>

              {/* Text */}
              <div className="flex-1 min-w-0">
                <p
                  className="text-sm font-bold tracking-tight transition-colors duration-200"
                  style={{
                    color: isActive ? cap.color : "var(--text-primary)",
                  }}
                >
                  {cap.label}
                </p>
                <p className="text-xs font-medium leading-snug text-muted-foreground">
                  {cap.blurb}
                </p>
              </div>

              {/* Stat badge — slides in on hover */}
              <motion.div
                className="shrink-0 rounded-full px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide"
                style={{
                  background: isDark ? `${cap.color}15` : `${cap.color}10`,
                  color: cap.color,
                  border: `1px solid ${cap.color}25`,
                }}
                initial={{ opacity: 0, x: 8 }}
                animate={{ opacity: isActive ? 1 : 0, x: isActive ? 0 : 8 }}
                transition={{ duration: 0.18 }}
              >
                {cap.stat}
              </motion.div>
            </motion.div>
          );
        })}
      </motion.div>

      {/* ── Stats strip ── */}
      <motion.div
        className="grid grid-cols-3 gap-3"
        initial={{ opacity: 0, y: 16 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5, delay: 0.55 }}
      >
        {STATS.map((s) => (
          <div
            key={s.label}
            className="flex flex-col items-center gap-1 rounded-xl border border-border py-4"
          >
            <span className="text-2xl font-black tracking-tight text-accent">
              {s.value}
            </span>
            <span className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">
              {s.label}
            </span>
          </div>
        ))}
      </motion.div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Mobile spine — kept for narrow viewports
// ─────────────────────────────────────────────────────────────────────────────

function SpineDiagram() {
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const logo = theme === "dark" ? darklogo : lightlogo;

  return (
    <div className="flex flex-col items-center md:hidden mt-10">
      {/* Hub */}
      <div
        className="relative z-10 flex flex-col items-center justify-center gap-1 rounded-full"
        style={{
          width: 110,
          height: 110,
          background: isDark
            ? "radial-gradient(circle at 38% 32%, #1a1a1a, #0d0d0d)"
            : "radial-gradient(circle at 38% 32%, #ffffff, #f3f3f3)",
          border: "1.5px solid var(--accent-violet)",
          boxShadow:
            "0 0 0 5px color-mix(in srgb, var(--accent-violet) 8%, transparent), 0 8px 24px color-mix(in srgb, var(--accent-violet) 20%, transparent)",
        }}
      >
        <img src={logo} alt="Altrex" className="w-20" />
        <span className="font-mono text-[8px] tracking-[0.1em] uppercase text-muted-foreground font-semibold">
          One Platform
        </span>
      </div>

      <div
        className="w-px h-6"
        style={{
          background:
            "linear-gradient(to bottom, var(--accent-violet), var(--border-border))",
        }}
      />

      <div className="flex w-full max-w-sm flex-col gap-3">
        {CAPABILITIES.map((cap, i) => {
          const Icon = cap.icon;
          return (
            <div key={cap.label} className="flex items-center gap-3">
              <div className="relative flex flex-col items-center self-stretch">
                <div
                  className="h-2.5 w-2.5 rounded-full"
                  style={{ background: cap.color }}
                />
                {i < CAPABILITIES.length - 1 && (
                  <div
                    className="w-px flex-1"
                    style={{ background: `${cap.color}28` }}
                  />
                )}
              </div>
              <motion.div
                className="flex flex-1 items-center gap-3 rounded-xl px-4 py-3"
                style={{
                  background: isDark ? `${cap.color}0d` : `${cap.color}08`,
                  border: `1px solid ${cap.color}28`,
                }}
                whileTap={{ scale: 0.98 }}
              >
                <div
                  className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg"
                  style={{
                    background: `${cap.color}18`,
                    border: `1px solid ${cap.color}35`,
                  }}
                >
                  <Icon size={18} color={cap.color} strokeWidth={1.8} />
                </div>
                <div>
                  <p className="text-sm font-semibold text-[var(--text-primary)]">
                    {cap.label}
                  </p>
                  <p className="text-xs leading-snug text-[var(--text-muted)]">
                    {cap.blurb}
                  </p>
                </div>
              </motion.div>
            </div>
          );
        })}
      </div>

      {/* Mobile stats */}
      <div className="mt-8 grid grid-cols-3 gap-3 w-full max-w-sm">
        {STATS.map((s) => (
          <div
            key={s.label}
            className="flex flex-col items-center gap-1 rounded-xl border py-4"
          >
            <span className="text-xl font-black tracking-tight text-secondary-foreground">
              {s.value}
            </span>
            <span className="text-[9px] font-semibold uppercase tracking-widest text-muted-foreground">
              {s.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Section wrapper
// ─────────────────────────────────────────────────────────────────────────────

const WhatWeDo = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  // Shared hover state — both panels read and write it
  const [activeIdx, setActiveIdx] = useState<number | null>(null);

  return (
    <section ref={sectionRef} className="relative overflow-hidden py-28">
      {/* Subtle radial background glow */}
      <div
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          background:
            "radial-gradient(ellipse 70% 60% at 70% 50%, color-mix(in srgb, var(--accent-violet) 5%, transparent), transparent)",
        }}
      />

      <div className="mx-auto max-w-[1400px] px-6">
        {/* ── Desktop / tablet: two-column ── */}
        <div className="hidden md:grid md:grid-cols-[1fr_auto] md:items-center md:gap-12 lg:gap-20">
          <ContentPanel
            activeIdx={activeIdx}
            setActiveIdx={setActiveIdx}
            isInView={isInView}
          />
          <OrbitDiagram activeIdx={activeIdx} setActiveIdx={setActiveIdx} />
        </div>

        {/* ── Mobile: header + spine ── */}
        <div className="md:hidden">
          <motion.div
            className="text-center"
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            variants={headerVariants}
          >
            <motion.div
              variants={fadeUpVariants}
              initial="hidden"
              animate="visible"
            >
              <SectionBadge
                title="What We Do"
                dot={true}
                className="mb-8"
              />
            </motion.div>
            <h2 className="mt-4 text-3xl font-bold uppercase tracking-tighter text-primary">
              One Platform. Endless Possibilities.
            </h2>
          </motion.div>
          <SpineDiagram />
        </div>
      </div>
    </section>
  );
};

export default WhatWeDo;
