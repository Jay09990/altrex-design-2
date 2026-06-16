import { useEffect, useRef } from "react";
import { motion, type Variants } from "framer-motion";
import { Zap } from "lucide-react";
import ScrambleCounter from "../ScrambleCounter";
import InViewDecryptedText from "../InViewDecryptedText";
import { Badge } from "../ui/badge";

// ── Types ─────────────────────────────────────────────────────────────────────

interface RingStat {
  display: string;
  unit: string;
  label: string;
  color: string;
  // value / max determines how far the arc fills (0–1)
  value: number;
  max: number;
  scrambleTarget: number;
}

// ── Data ──────────────────────────────────────────────────────────────────────

const ringStats: RingStat[] = [
  {
    display: "2K+",
    unit: "/ 20K",
    label: "Connected Assets",
    color: "#f97316",
    value: 2_000,
    max: 20_000,
    scrambleTarget: 2_000,
  },
  {
    display: "10M+",
    unit: "/ 50M",
    label: "Daily Data Points",
    color: "#8b5cf6",
    value: 10,
    max: 50,
    scrambleTarget: 10,
  },
  {
    display: "10+",
    unit: "/ 50",
    label: "Industrial Deployments",
    color: "#06b6d4",
    value: 10,
    max: 50,
    scrambleTarget: 10,
  },
  {
    display: "120+",
    unit: "/ 500",
    label: "Operational Sites",
    color: "#10b981",
    value: 120,
    max: 500,
    scrambleTarget: 120,
  },
  {
    display: "99.99%",
    unit: "/ 100%",
    label: "Platform Availability",
    color: "#f97316",
    value: 99.99,
    max: 100,
    scrambleTarget: 100,
  },
  {
    display: "24×7",
    unit: "always",
    label: "Operational Monitoring",
    color: "#8b5cf6",
    value: 100,
    max: 100,
    scrambleTarget: 24,
  },
];

const throughputData = [0.6, 0.8, 1.0, 0.75, 1.2, 0.9, 1.4, 1.1, 1.7, 1.3, 1.9, 1.5];
const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
const BASELINE = 1.0;
const CHART_MAX = 2.1;

// ── Arc ring ──────────────────────────────────────────────────────────────────

const RADIUS = 64;
const CX = 75;
const CY = 75;
const STROKE = 9;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

function ArcRing({ stat, animate }: { stat: RingStat; animate: boolean }) {
  const pct = Math.min(stat.value / stat.max, 1);
  const dash = CIRCUMFERENCE * pct;

  return (
    <div className="flex flex-col items-center gap-3">
      <div className="relative" style={{ width: 150, height: 150 }}>
        <svg
          width={150}
          height={150}
          viewBox="0 0 150 150"
          style={{ transform: "rotate(-90deg)" }}
          aria-hidden="true"
        >
          {/* Track */}
          <circle
            cx={CX}
            cy={CY}
            r={RADIUS}
            fill="none"
            stroke="rgba(255,255,255,0.07)"
            strokeWidth={STROKE}
          />
          {/* Fill arc */}
          <circle
            cx={CX}
            cy={CY}
            r={RADIUS}
            fill="none"
            stroke={stat.color}
            strokeWidth={STROKE}
            strokeLinecap="round"
            strokeDasharray={animate ? `${dash} ${CIRCUMFERENCE}` : `0 ${CIRCUMFERENCE}`}
            style={{
              transition: animate
                ? "stroke-dasharray 1.3s cubic-bezier(0.16, 1, 0.3, 1)"
                : "none",
            }}
          />
        </svg>

        {/* Center label */}
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="font-mono text-[18px] font-bold text-[var(--text-primary)] leading-none">
            <ScrambleCounter target={stat.scrambleTarget} finalText={stat.display} />
          </span>
          <span className="font-mono text-[9px] text-[var(--text-muted)] mt-0.5">
            {stat.unit}
          </span>
        </div>
      </div>

      <span className="text-center text-[11px] leading-snug text-[var(--text-secondary)] max-w-[130px]">
        {stat.label}
      </span>
    </div>
  );
}

// ── Throughput bar chart (custom SVG, no lib dependency) ──────────────────────

function ThroughputChart() {
  const chartWidth = 600;
  const chartHeight = 160;
  const paddingLeft = 36;
  const paddingBottom = 24;
  const paddingTop = 8;
  const innerW = chartWidth - paddingLeft - 8;
  const innerH = chartHeight - paddingBottom - paddingTop;

  const barWidth = innerW / months.length;
  const barPad = barWidth * 0.25;

  function yPos(val: number) {
    return paddingTop + innerH - (val / CHART_MAX) * innerH;
  }

  const baselineY = yPos(BASELINE);

  // Y axis ticks
  const ticks = [0, 0.5, 1.0, 1.5, 2.0];

  return (
    <svg
      viewBox={`0 0 ${chartWidth} ${chartHeight}`}
      width="100%"
      preserveAspectRatio="xMidYMid meet"
      role="img"
      aria-label="Bar chart showing monthly throughput from Jan to Dec 2024, rising from 0.6M to 1.9M events per second with a 1.0M baseline."
    >
      {/* Y ticks + grid lines */}
      {ticks.map((t) => {
        const y = yPos(t);
        return (
          <g key={t}>
            <line
              x1={paddingLeft}
              y1={y}
              x2={chartWidth - 8}
              y2={y}
              stroke="rgba(255,255,255,0.06)"
              strokeWidth={0.5}
            />
            <text
              x={paddingLeft - 6}
              y={y + 4}
              textAnchor="end"
              fontSize={9}
              fill="rgba(255,255,255,0.35)"
              fontFamily="monospace"
            >
              {t.toFixed(1)}
            </text>
          </g>
        );
      })}

      {/* Baseline dashed line */}
      <line
        x1={paddingLeft}
        y1={baselineY}
        x2={chartWidth - 8}
        y2={baselineY}
        stroke="#8b5cf6"
        strokeWidth={1}
        strokeDasharray="4 4"
        opacity={0.7}
      />

      {/* Bars */}
      {throughputData.map((val, i) => {
        const x = paddingLeft + i * barWidth + barPad / 2;
        const barH = (val / CHART_MAX) * innerH;
        const y = paddingTop + innerH - barH;
        const bw = barWidth - barPad;

        return (
          <g key={i}>
            <rect
              x={x}
              y={y}
              width={bw}
              height={barH}
              fill="#f97316"
              opacity={0.85}
              rx={2}
            />
            {/* Month label */}
            <text
              x={x + bw / 2}
              y={chartHeight - 6}
              textAnchor="middle"
              fontSize={9}
              fill="rgba(255,255,255,0.35)"
              fontFamily="monospace"
            >
              {months[i]}
            </text>
          </g>
        );
      })}
    </svg>
  );
}

// ── Variants ──────────────────────────────────────────────────────────────────

const containerVariants: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 32 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] } },
};

// ── StatisticsSection ─────────────────────────────────────────────────────────

const StatisticsSection = () => {
  // Trigger arc animation when section enters viewport
  const sectionRef = useRef<HTMLElement>(null);
  const hasAnimated = useRef(false);
  const arcRefs = useRef<(SVGCircleElement | null)[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true;
          // Re-trigger by forcing a reflow — arcs already handle this via state
        }
      },
      { threshold: 0.2 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden bg-transparent py-28"
    >
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.15 }}
        className="mx-auto max-w-7xl px-6 lg:px-8"
      >
        {/* Header */}
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between mb-16">
          <div>
            <motion.div variants={fadeUp}>
              <Badge
                variant="secondary"
                className="border border-orange-500/30 bg-orange-500/10 p-4 text-sm font-medium text-orange-400"
              >
                <InViewDecryptedText
                  text="STATISTICS & METRICS"
                  speed={60}
                  maxIterations={12}
                  className="text-violet-300"
                  encryptedClassName="text-[var(--text-muted)]"
                />
              </Badge>
            </motion.div>

            <motion.h2
              variants={fadeUp}
              className="mt-6 max-w-xl text-4xl font-bold tracking-tight text-[var(--text-primary)] sm:text-5xl"
            >
              Unified Industrial Operations{" "}
              <span className="bg-orange-500 bg-clip-text text-transparent">
                at Enterprise Scale
              </span>
            </motion.h2>
          </div>

          {/* Live throughput badge */}
          <motion.div
            variants={fadeUp}
            whileHover={{ y: -3 }}
            transition={{ duration: 0.25 }}
            className="flex flex-shrink-0 items-center gap-3 rounded-2xl border border-orange-500/30 bg-orange-600/20 px-6 py-4"
          >
            <span className="relative flex h-3 w-3">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75" />
              <span className="relative inline-flex h-3 w-3 rounded-full bg-green-500" />
            </span>
            <div>
              <p className="text-2xl font-bold text-[var(--text-primary)]">1.2M/s</p>
              <p className="text-xs text-[var(--text-muted)]">Live throughput</p>
            </div>
          </motion.div>
        </div>

        {/* Arc rings grid */}
        <motion.div
          variants={fadeUp}
          className="grid grid-cols-3 gap-8 sm:grid-cols-6 mb-16"
        >
          {ringStats.map((stat, i) => (
            <ArcRing key={i} stat={stat} animate={true} />
          ))}
        </motion.div>

        {/* Divider */}
        <div className="h-px bg-white/[0.06] mb-12" />

        {/* Throughput chart panel */}
        <motion.div
          variants={fadeUp}
          className="rounded-2xl border border-white/[0.07] bg-[var(--bg-surface)]/60 p-6"
        >
          {/* Chart header */}
          <div className="flex items-center justify-between mb-4">
            <p className="text-sm font-semibold text-[var(--text-primary)]">
              Throughput growth — Jan to Dec 2024
            </p>
            <div className="flex items-center gap-1.5 rounded-full border border-green-500/30 bg-green-500/10 px-3 py-1">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-green-500" />
              </span>
              <span className="text-xs text-green-400">Live</span>
            </div>
          </div>

          {/* Legend */}
          <div className="flex items-center gap-5 mb-5">
            <div className="flex items-center gap-2">
              <span className="h-2.5 w-2.5 rounded-sm bg-orange-500 opacity-85" />
              <span className="font-mono text-[10px] text-[var(--text-muted)] uppercase tracking-wider">
                Data throughput (M events/s)
              </span>
            </div>
            <div className="flex items-center gap-2">
              <svg width={18} height={2} aria-hidden="true">
                <line
                  x1={0} y1={1} x2={18} y2={1}
                  stroke="#8b5cf6"
                  strokeWidth={1.5}
                  strokeDasharray="4 3"
                />
              </svg>
              <span className="font-mono text-[10px] text-[var(--text-muted)] uppercase tracking-wider">
                Target baseline (1.0M)
              </span>
            </div>
            <div className="ml-auto flex items-center gap-1.5">
              <Zap size={11} className="text-green-400" />
              <span className="font-mono text-[10px] text-green-400">+128% this year</span>
            </div>
          </div>

          <ThroughputChart />
        </motion.div>
      </motion.div>
    </section>
  );
};

export default StatisticsSection;