import { motion, type Variants } from "framer-motion";
import { Zap, Activity, Database, Server, Radio, ShieldCheck, MapPin } from "lucide-react";
import ScrambleCounter from "../ScrambleCounter";
import { SectionBadge } from "../ui/section-badge";

// ── Types ─────────────────────────────────────────────────────────────────────

interface RingStat {
  display: string;
  subtitle: string;
  label: string;
  icon: any;
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

const throughputData = [0.6, 0.8, 1.0, 0.75, 1.2, 0.9, 1.4, 1.1, 1.7, 1.3, 1.9, 1.5];
const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
const CHART_MAX = 2.1;

// ── Stat Card ─────────────────────────────────────────────────────────────────

function StatCard({ stat }: { stat: RingStat }) {
  const Icon = stat.icon;

  return (
    <div className="group relative flex items-center gap-5 rounded-2xl border border-white/[0.08] bg-card/40 p-6 shadow-lg backdrop-blur-sm transition-all duration-300 hover:border-white/[0.15] hover:bg-card/80 hover:-translate-y-1">
      <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-xl bg-orange-500/10 text-orange-500 border border-orange-500/20 shadow-[0_0_15px_rgba(249,115,22,0.15)] group-hover:bg-orange-500/20 group-hover:scale-110 transition-all duration-300">
        <Icon size={30} />
      </div>

      <div className="flex flex-col justify-between h-16 py-0.5">
        <span className="font-mono text-3xl font-bold leading-none tracking-tight text-foreground">
          <ScrambleCounter target={stat.scrambleTarget} finalText={stat.display} />
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
  const chartWidth = 800;
  const chartHeight = 200;
  const paddingLeft = 40;
  const paddingBottom = 28;
  const paddingTop = 12;
  const innerW = chartWidth - paddingLeft - 12;
  const innerH = chartHeight - paddingBottom - paddingTop;

  const barWidth = innerW / months.length;
  const barPad = barWidth * 0.3;

  function yPos(val: number) {
    return paddingTop + innerH - (val / CHART_MAX) * innerH;
  }

  // Y axis ticks
  const ticks = [0, 0.5, 1.0, 1.5, 2.0];

  return (
    <svg
      viewBox={`0 0 ${chartWidth} ${chartHeight}`}
      width="100%"
      preserveAspectRatio="xMidYMid meet"
      role="img"
      aria-label="Bar chart showing monthly throughput from Jan to Dec 2024, rising from 0.6M to 1.9M events per second."
    >
      <defs>
        <linearGradient id="barGradient" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#f97316" />
          <stop offset="100%" stopColor="#ea580c" stopOpacity={0.6} />
        </linearGradient>
      </defs>

      {/* Y ticks + grid lines */}
      {ticks.map((t) => {
        const y = yPos(t);
        return (
          <g key={t}>
            <line
              x1={paddingLeft}
              y1={y}
              x2={chartWidth - 12}
              y2={y}
              stroke="currentColor"
              className="text-muted-foreground opacity-20"
              strokeWidth={0.5}
            />
            <text
              x={paddingLeft - 8}
              y={y + 3}
              textAnchor="end"
              fontSize={10}
              fill="currentColor"
              className="text-muted-foreground font-mono"
            >
              {t.toFixed(1)}
            </text>
          </g>
        );
      })}

      {/* Bars */}
      {throughputData.map((val, i) => {
        const x = paddingLeft + i * barWidth + barPad / 2;
        const barH = (val / CHART_MAX) * innerH;
        const y = paddingTop + innerH - barH;
        const bw = barWidth - barPad;

        return (
          <g key={i} className="group cursor-pointer">
            {/* Hover highlight background */}
            <rect
              x={x - barPad * 0.25}
              y={paddingTop}
              width={bw + barPad * 0.5}
              height={innerH}
              fill="currentColor"
              className="text-muted-foreground opacity-0 transition-opacity duration-300 group-hover:opacity-10"
              rx={6}
            />
            {/* Actual Bar */}
            <rect
              x={x}
              y={y}
              width={bw}
              height={barH}
              fill="url(#barGradient)"
              opacity={0.9}
              rx={4}
              className="transition-all duration-300 group-hover:opacity-100 group-hover:fill-[#f97316]"
            />
            {/* Top accent */}
            <rect
              x={x}
              y={y}
              width={bw}
              height={3}
              fill="#fff"
              opacity={0.3}
              rx={1.5}
            />
            {/* Month label */}
            <text
              x={x + bw / 2}
              y={chartHeight - 6}
              textAnchor="middle"
              fontSize={10}
              fill="currentColor"
              className="text-muted-foreground font-mono transition-colors duration-300 group-hover:text-foreground group-hover:font-bold"
            >
              {months[i]}
            </text>
            {/* Value tooltip-like text on hover */}
            <text
              x={x + bw / 2}
              y={y - 8}
              textAnchor="middle"
              fontSize={11}
              fill="currentColor"
              className="text-foreground font-mono opacity-0 transition-opacity duration-300 group-hover:opacity-100"
            >
              {val.toFixed(1)}M
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
            className="flex flex-shrink-0 items-center gap-4 rounded-2xl border border-orange-500/30 bg-orange-600/20 px-6 py-4 shadow-lg backdrop-blur-md"
          >
            <span className="relative flex h-3.5 w-3.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75" />
              <span className="relative inline-flex h-3.5 w-3.5 rounded-full bg-green-500 shadow-[0_0_10px_rgba(34,197,94,0.6)]" />
            </span>
            <div>
              <p className="text-3xl font-bold tracking-tight text-foreground">1.2M/s</p>
              <p className="text-sm text-muted-foreground font-medium">Live throughput</p>
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
          className="rounded-3xl border border-white/[0.08] bg-card/60 p-8 shadow-2xl backdrop-blur-sm"
        >
          {/* Chart header */}
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between mb-8">
            <h3 className="text-xl font-bold text-foreground tracking-tight">
              Throughput growth <span className="text-muted-foreground font-normal">— Jan to Dec 2024</span>
            </h3>
            <div className="flex items-center gap-2 rounded-full border border-green-500/30 bg-green-500/10 px-4 py-1.5 shadow-[inset_0_1px_4px_rgba(34,197,94,0.1)]">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-green-500" />
              </span>
              <span className="text-sm font-medium text-green-400">Live Sync</span>
            </div>
          </div>

          {/* Legend */}
          <div className="flex flex-wrap items-center gap-6 mb-6">
            <div className="flex items-center gap-2">
              <span className="h-3 w-3 rounded bg-gradient-to-b from-orange-500 to-orange-600 shadow-sm" />
              <span className="font-mono text-xs text-muted-foreground uppercase tracking-wider font-semibold">
                Data throughput <span className="font-normal opacity-70">(M events/s)</span>
              </span>
            </div>
            <div className="ml-auto flex items-center gap-2 rounded-lg bg-green-500/10 px-3 py-1.5 border border-green-500/20">
              <Zap size={14} className="text-green-400" />
              <span className="font-mono text-xs font-bold text-green-400">+128% this year</span>
            </div>
          </div>

          <ThroughputChart />
        </motion.div>
      </motion.div>
    </section>
  );
};

export default StatisticsSection;
