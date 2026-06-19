import { motion, type Variants, AnimatePresence } from "framer-motion";
import {
  Zap,
  Activity,
  Database,
  Server,
  Radio,
  ShieldCheck,
  MapPin,
} from "lucide-react";
import React, { useState } from "react";
import ScrambleCounter from "../ScrambleCounter";
import { SectionBadge } from "../ui/section-badge";
import { Badge } from "../ui/badge";

// ── Types ─────────────────────────────────────────────────────────────────────

interface RingStat {
  display: string;
  subtitle: string;
  label: string;
  icon: React.ComponentType<{ size?: number; className?: string }>;
  scrambleTarget: number;
}

// ── Data ──────────────────────────────────────────────────────────────────────

const ringStats: RingStat[] = [
  {
    display: "2K+",
    subtitle: "Active Nodes",
    label: "Connected Assets",
    icon: Server,
    scrambleTarget: 2_000,
  },
  {
    display: "10M+",
    subtitle: "Processed",
    label: "Daily Data Points",
    icon: Database,
    scrambleTarget: 10,
  },
  {
    display: "10+",
    subtitle: "Global",
    label: "Industrial Deployments",
    icon: Radio,
    scrambleTarget: 10,
  },
  {
    display: "120+",
    subtitle: "Facilities",
    label: "Operational Sites",
    icon: MapPin,
    scrambleTarget: 120,
  },
  {
    display: "99.99%",
    subtitle: "SLA",
    label: "Platform Availability",
    icon: ShieldCheck,
    scrambleTarget: 100,
  },
  {
    display: "24×7",
    subtitle: "Continuous",
    label: "Operational Monitoring",
    icon: Activity,
    scrambleTarget: 24,
  },
];

const throughputData = [
  0.6, 0.8, 1.0, 0.75, 1.2, 0.9, 1.4, 1.1, 1.7, 1.3, 1.9, 1.5,
];
const months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];
const CHART_MAX = 2.1;

// ── Stat Card ─────────────────────────────────────────────────────────────────

function StatCard({ stat }: { stat: RingStat }) {
  const Icon = stat.icon;

  return (
    <div className="group relative flex items-center gap-5 rounded-2xl border border-border bg-card/40 p-6 transition-all duration-300 hover:bg-card/80 hover:-translate-y-1">
      <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-xl bg-secondary text-accent border border-accent">
        <Icon size={30} />
      </div>

      <div className="flex flex-col justify-between h-16 py-0.5">
        <span className="font-mono text-3xl font-bold leading-none tracking-tight text-foreground">
          <ScrambleCounter
            target={stat.scrambleTarget}
            finalText={stat.display}
          />
        </span>
        <h3 className="text-[13px] font-medium leading-none text-muted-foreground">
          {stat.label}
        </h3>
        {stat.subtitle && (
          <span className="text-[10px] text-muted-foreground font-mono uppercase tracking-widest leading-none">
            {stat.subtitle}
          </span>
        )}
      </div>
    </div>
  );
}

// ── Throughput bar chart ──────────────────────────────────────────────────────

function ThroughputChart() {
  const [hoverIndex, setHoverIndex] = useState<number | null>(null);
  const chartWidth = 1000;
  const chartHeight = 350;
  const paddingLeft = 60;
  const paddingRight = 40;
  const paddingBottom = 60;
  const paddingTop = 40;
  
  const innerW = chartWidth - paddingLeft - paddingRight;
  const innerH = chartHeight - paddingBottom - paddingTop;

  const barWidth = innerW / months.length;
  const barGap = barWidth * 0.25;
  const actualBarWidth = barWidth - barGap;

  const yPos = (val: number) => paddingTop + innerH - (val / CHART_MAX) * innerH;

  return (
    <div className="relative w-full overflow-visible" onMouseLeave={() => setHoverIndex(null)}>
      <svg
        viewBox={`0 0 ${chartWidth} ${chartHeight}`}
        width="100%"
        className="overflow-visible"
      >
        <defs>
          <linearGradient id="barGradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="var(--primary)" />
            <stop offset="100%" stopColor="var(--primary)" stopOpacity={0.7} />
          </linearGradient>
          
          <linearGradient id="barHoverGradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="var(--primary)" stopOpacity={0.8} />
            <stop offset="100%" stopColor="var(--primary)" />
          </linearGradient>

          <filter id="barGlow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="4" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {/* Y Axis Grid */}
        {[0, 0.5, 1.0, 1.5, 2.0].map((t) => {
          const y = yPos(t);
          return (
            <g key={t}>
              <line
                x1={paddingLeft}
                y1={y}
                x2={chartWidth - paddingRight}
                y2={y}
                stroke="currentColor"
                className="text-border/30"
                strokeWidth={1}
              />
              <text
                x={paddingLeft - 15}
                y={y + 4}
                textAnchor="end"
                fontSize={12}
                fill="currentColor"
                className="text-accent font-mono"
              >
                {t.toFixed(1)}
              </text>
            </g>
          );
        })}

        {/* Bars */}
        {throughputData.map((val, i) => {
          const x = paddingLeft + i * barWidth + barGap / 2;
          const barH = (val / CHART_MAX) * innerH;
          const y = paddingTop + innerH - barH;
          const isHovered = hoverIndex === i;

          return (
            <g 
              key={i} 
              onMouseEnter={() => setHoverIndex(i)}
              className="cursor-pointer"
            >
              {/* Invisible touch/hover area */}
              <rect
                x={x - barGap / 2}
                y={paddingTop}
                width={barWidth}
                height={innerH}
                fill="transparent"
              />
              
              {/* Hover Highlight Background */}
              <motion.rect
                initial={{ opacity: 0 }}
                animate={{ opacity: isHovered ? 0.05 : 0 }}
                x={x - barGap / 4}
                y={paddingTop - 10}
                width={actualBarWidth + barGap / 2}
                height={innerH + 20}
                rx={12}
                fill="currentColor"
                className="text-foreground"
              />

              {/* Actual Bar */}
              <motion.rect
                initial={{ height: 0, y: paddingTop + innerH }}
                whileInView={{ height: barH, y: y }}
                viewport={{ once: true }}
                transition={{ 
                  duration: 1, 
                  delay: i * 0.05, 
                  ease: [0.33, 1, 0.68, 1] 
                }}
                x={x}
                width={actualBarWidth}
                fill={isHovered ? "url(#barHoverGradient)" : "url(#barGradient)"}
                rx={6}
                filter={isHovered ? "url(#barGlow)" : "none"}
                className="transition-colors duration-300"
              />

              {/* Glass Top Highlight */}
              <motion.rect
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 0.3 }}
                viewport={{ once: true }}
                transition={{ delay: 1 + i * 0.05 }}
                x={x + 2}
                y={y + 2}
                width={actualBarWidth - 4}
                height={4}
                rx={2}
                fill="currentColor"
                className="text-background"
              />

              {/* Month Label */}
              <text
                x={x + actualBarWidth / 2}
                y={chartHeight - 15}
                textAnchor="middle"
                fontSize={12}
                fill="currentColor"
                className={`font-mono transition-colors duration-300 ${
                  isHovered ? "text-foreground font-bold" : "text-muted-foreground/60"
                }`}
              >
                {months[i]}
              </text>
            </g>
          );
        })}
      </svg>

      {/* Premium Tooltip */}
      <AnimatePresence>
        {hoverIndex !== null && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ 
              opacity: 1, 
              y: 0, 
              scale: 1,
              left: paddingLeft + hoverIndex * (innerW / months.length) + (innerW / months.length) / 2,
              top: yPos(throughputData[hoverIndex]) - 80
            }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            className="absolute pointer-events-none -translate-x-1/2 z-50"
          >
            <div className="bg-popover/90 backdrop-blur-xl border border-border rounded-xl p-3 shadow-2xl min-w-[120px]">
              <div className="text-[10px] text-muted-foreground uppercase tracking-widest font-mono mb-1">
                {months[hoverIndex]} 2024
              </div>
              <div className="flex items-center gap-2">
                <div className="h-2 w-2 rounded-full bg-primary shadow-[0_0_8px_var(--primary)]" />
                <div className="text-xl font-bold text-accent tracking-tight">
                  {throughputData[hoverIndex].toFixed(2)}
                  <span className="text-sm font-medium text-accent ml-1">M</span>
                </div>
              </div>
              <div className="text-[9px] text-muted-foreground mt-1">
                Events per second
              </div>
            </div>
            {/* Arrow */}
            <div className="w-3 h-3 bg-popover/90 border-r border-b border-border rotate-45 absolute -bottom-1.5 left-1/2 -translate-x-1/2" />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ── Variants ──────────────────────────────────────────────────────────────────

const containerVariants: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 32 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] },
  },
};

// ── StatisticsSection ─────────────────────────────────────────────────────────

const StatisticsSection = () => {
  return (
    <section className="relative overflow-hidden bg-transparent py-28">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
        className="mx-auto max-w-7xl px-6 lg:px-8"
      >
        {/* Header */}
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between mb-16">
          <div>
            <motion.div variants={fadeUp}>
              <SectionBadge
                title="STATISTICS AND METRICS"
                dot={true}
                dotColor="bg-emerald-500"
                className="mb-8"
              />
            </motion.div>

            <motion.h2
              variants={fadeUp}
              className="mt-6 max-w-2xl text-4xl font-bold tracking-tight text-foreground sm:text-5xl"
            >
              Unified Industrial Operations at Enterprise Scale
            </motion.h2>
          </div>

          {/* Live throughput badge */}
          <motion.div
            variants={fadeUp}
            whileHover={{ y: -3 }}
            transition={{ duration: 0.25 }}
            className="flex flex-shrink-0 items-center gap-4 rounded-2xl border border-border px-6 py-4 shadow-lg backdrop-blur-md"
          >
            <span className="relative flex h-3.5 w-3.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75" />
              <span className="relative inline-flex h-3.5 w-3.5 rounded-full bg-green-500 shadow-[0_0_10px_rgba(34,197,94,0.6)]" />
            </span>
            <div>
              <p className="text-3xl font-bold tracking-tight text-foreground">
                1.2M/s
              </p>
              <p className="text-sm text-muted-foreground font-medium">
                Live throughput
              </p>
            </div>
          </motion.div>
        </div>

        {/* Stats grid */}
        <motion.div
          variants={fadeUp}
          className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 mb-16"
        >
          {ringStats.map((stat, i) => (
            <StatCard key={i} stat={stat} />
          ))}
        </motion.div>

        {/* Divider */}
        <div className="h-px bg-[var(--text-muted)] opacity-10 mb-12" />

        {/* Throughput chart panel */}
        <motion.div
          variants={fadeUp}
          className="rounded-3xl border border-border bg-card/60 p-8"
        >
          {/* Chart header */}
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between mb-8">
            <h3 className="text-xl font-bold text-foreground tracking-tight">
              Throughput growth{" "}
              <span className="text-muted-foreground font-medium text-sm">
                — Jan to Dec 2024
              </span>
            </h3>
            <Badge variant="outline" className="p-3 space-x-1.5">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-green-500" />
              </span>
              <span className="text-green-600">Live Sync</span>
            </Badge>
          </div>

          {/* Legend */}
          <div className="flex flex-wrap items-center gap-6 mb-6">
            <div className="flex items-center gap-2">
              <span className="h-3 w-3 rounded bg-gradient-to-b from-orange-500 to-orange-600 shadow-sm" />
              <span className="font-mono text-xs text-muted-foreground uppercase tracking-wider font-semibold">
                Data throughput{" "}
                <span className="font-normal text-gray-400">(M events/s)</span>
              </span>
            </div>
            <Badge variant="outline" className="p-3 space-x-1 ml-auto flex items-center">
              <Zap size={16} className="text-green-600" />
              <span className="text-green-600">
                +128% this year
              </span>
            </Badge>
          </div>

          <ThroughputChart />
        </motion.div>
      </motion.div>
    </section>
  );
};

export default StatisticsSection;
