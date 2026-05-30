import { useState, useRef, useEffect } from "react";
import { motion, useInView, type Variants, AnimatePresence } from "framer-motion";
import {
  ArrowRight,
  BarChart3,
  Bell,
  Braces,
  CheckCircle2,
  ChevronRight,
  Cpu,
  Database,
  Globe,
  Layers3,
  Lock,
  Network,
  Play,
  Radio,
  Rocket,
  Shield,
  Terminal,
  Wifi,
  Zap,
} from "lucide-react";

/* ─────────────────────────────────────────────────────────────────
   Shared animation variants
───────────────────────────────────────────────────────────────── */
const fadeUp: Variants = {
  hidden: { opacity: 0, y: 36 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
};
const stagger: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

/* ─────────────────────────────────────────────────────────────────
   Section wrapper with in-view trigger
───────────────────────────────────────────────────────────────── */
function Section({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <motion.section
      variants={stagger}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.12 }}
      className={`relative py-24 lg:py-32 ${className}`}
    >
      {children}
    </motion.section>
  );
}

/* ─────────────────────────────────────────────────────────────────
   SectionLabel (badge strip)
───────────────────────────────────────────────────────────────── */
function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <motion.div variants={fadeUp} className="mb-5 flex justify-center">
      <span className="inline-flex items-center gap-2 rounded-full border border-[var(--border-subtle)] bg-[var(--bg-surface)]/60 px-4 py-1.5 font-mono text-xs font-semibold uppercase tracking-widest text-[var(--accent-violet)] backdrop-blur">
        <span className="h-1.5 w-1.5 rounded-full bg-[var(--accent-violet)] animate-pulse" />
        {children}
      </span>
    </motion.div>
  );
}

/* ─────────────────────────────────────────────────────────────────
   1. HERO
───────────────────────────────────────────────────────────────── */
function ProductHero() {
  return (
    <section className="relative overflow-hidden pb-0 pt-28 lg:pt-36">
      {/* Background grid */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `
            linear-gradient(to right,var(--text-primary) 1px,transparent 1px),
            linear-gradient(to bottom,var(--text-primary) 1px,transparent 1px)`,
          backgroundSize: "80px 80px",
        }}
      />
      {/* Glow blob */}
      <div
        className="pointer-events-none absolute -top-40 left-1/2 h-[600px] w-[800px] -translate-x-1/2 rounded-full opacity-20 blur-[140px]"
        style={{ background: "radial-gradient(circle,#ff6b00 0%,transparent 70%)" }}
      />

      <motion.div
        variants={stagger}
        initial="hidden"
        animate="visible"
        className="relative z-10 mx-auto max-w-7xl px-6 lg:px-8"
      >
        {/* Badge */}
        <motion.div variants={fadeUp} className="flex justify-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-[var(--border-subtle)] bg-[var(--bg-surface)]/80 px-4 py-2 font-mono text-xs font-semibold tracking-widest text-[var(--text-secondary)] shadow-sm backdrop-blur">
            <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[var(--accent-violet)]">
              <Zap size={10} className="text-white" />
            </span>
            ALTREX REALTIME PLATFORM — PRODUCT OVERVIEW
          </span>
        </motion.div>

        {/* Headline */}
        <motion.h1
          variants={fadeUp}
          className="mx-auto mt-8 max-w-5xl text-center text-4xl font-black leading-[0.95] tracking-[-0.04em] text-[var(--text-primary)] sm:text-5xl lg:text-7xl"
        >
          The Infrastructure
          <br />
          <span
            className="inline-block"
            style={{
              background: "linear-gradient(135deg,#ff6b00 0%,#ff9a3c 50%,#ffba70 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            Behind Realtime.
          </span>
        </motion.h1>

        <motion.p
          variants={fadeUp}
          className="mx-auto mt-6 max-w-2xl text-center text-lg leading-relaxed text-[var(--text-secondary)]"
        >
          Altrex gives engineers a unified platform for messaging, monitoring, and orchestration
          at any scale — from a single IoT sensor to millions of concurrent connections.
        </motion.p>

        {/* CTAs */}
        <motion.div variants={fadeUp} className="mt-10 flex flex-wrap justify-center gap-4">
          <button
            className="group flex items-center gap-2 rounded-xl px-7 py-3.5 text-sm font-semibold text-white shadow-lg transition-all duration-300 hover:shadow-xl active:scale-95"
            style={{ background: "linear-gradient(135deg,#ff6b00,#e05600)" }}
          >
            Start Building
            <ArrowRight size={16} className="transition-transform duration-200 group-hover:translate-x-1" />
          </button>
          <button className="flex items-center gap-2 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-surface)]/80 px-7 py-3.5 text-sm font-semibold text-[var(--text-primary)] backdrop-blur transition-all duration-200 hover:border-[var(--accent-violet)]/40 hover:shadow-md">
            <Play size={14} />
            Watch Demo
          </button>
        </motion.div>

        {/* Hero dashboard mockup */}
        <motion.div
          variants={fadeUp}
          className="relative mx-auto mt-20 max-w-5xl"
          style={{ perspective: 1200 }}
        >
          <motion.div
            initial={{ rotateX: 12, y: 20, opacity: 0 }}
            animate={{ rotateX: 4, y: 0, opacity: 1 }}
            transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1], delay: 0.3 }}
            style={{ transformStyle: "preserve-3d" }}
            className="overflow-hidden rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-surface)] shadow-[0_40px_120px_rgba(0,0,0,0.12)]"
          >
            <DashboardMockup />
          </motion.div>
          {/* gradient fade at bottom */}
          <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[var(--bg-void)] to-transparent" />
        </motion.div>
      </motion.div>
    </section>
  );
}

/* Mini dashboard inside hero */
function DashboardMockup() {
  const bars = [38, 52, 70, 48, 82, 60, 110, 88, 130, 100, 150, 120];
  const max = Math.max(...bars);

  return (
    <div className="select-none font-mono text-xs">
      {/* Topbar */}
      <div className="flex h-10 items-center gap-2 border-b border-[var(--border-subtle)] bg-[var(--bg-raised)] px-4">
        <span className="h-3 w-3 rounded-full bg-red-400/70" />
        <span className="h-3 w-3 rounded-full bg-yellow-400/70" />
        <span className="h-3 w-3 rounded-full bg-green-400/70" />
        <span className="ml-4 text-[10px] text-[var(--text-muted)]">altrex — realtime dashboard</span>
      </div>

      <div className="grid grid-cols-4 divide-x divide-[var(--border-subtle)]">
        {/* Sidebar */}
        <div className="col-span-1 hidden p-4 sm:block">
          {["Overview", "Messages", "Devices", "Analytics", "Security", "Settings"].map((item, i) => (
            <div
              key={item}
              className={`mb-1 flex items-center gap-2 rounded-lg px-3 py-2 text-[10px] ${i === 0 ? "bg-[var(--accent-violet)]/10 font-semibold text-[var(--accent-violet)]" : "text-[var(--text-muted)]"}`}
            >
              <span className="h-1 w-1 rounded-full bg-current" />
              {item}
            </div>
          ))}
        </div>

        {/* Main area */}
        <div className="col-span-4 p-4 sm:col-span-3">
          {/* Stats row */}
          <div className="mb-4 grid grid-cols-3 gap-3">
            {[
              { label: "MSG/SEC", value: "124K", delta: "+12%", color: "#ff6b00" },
              { label: "DEVICES", value: "82.4K", delta: "+8.3%", color: "#06b6d4" },
              { label: "LATENCY", value: "0.8ms", delta: "−22%", color: "#16a34a" },
            ].map((s) => (
              <div key={s.label} className="rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-raised)] p-3">
                <div className="text-[9px] font-semibold tracking-widest text-[var(--text-muted)]">{s.label}</div>
                <div className="mt-1 text-base font-black text-[var(--text-primary)]">{s.value}</div>
                <div className="text-[9px] font-medium" style={{ color: s.color }}>{s.delta}</div>
              </div>
            ))}
          </div>

          {/* Chart */}
          <div className="rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-raised)] p-4">
            <div className="mb-3 flex items-center justify-between">
              <span className="text-[10px] font-semibold tracking-widest text-[var(--text-muted)]">THROUGHPUT (MSG/SEC)</span>
              <span className="rounded-md bg-[var(--accent-violet)]/10 px-2 py-0.5 text-[9px] font-bold text-[var(--accent-violet)]">LIVE</span>
            </div>
            <svg viewBox={`0 0 ${bars.length * 24} 80`} className="h-16 w-full">
              {bars.map((h, i) => (
                <rect
                  key={i}
                  x={i * 24 + 2}
                  y={80 - (h / max) * 70}
                  width={18}
                  height={(h / max) * 70}
                  rx={3}
                  fill={i === bars.length - 1 ? "#ff6b00" : "rgba(255,107,0,0.25)"}
                />
              ))}
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────────
   2. CAPABILITIES (tabbed)
───────────────────────────────────────────────────────────────── */
const capabilities = [
  {
    id: "messaging",
    label: "Messaging",
    icon: Radio,
    tagline: "Ultra-low latency at any scale",
    description:
      "Publish-subscribe, point-to-point, and broadcast messaging. Handles millions of messages per second with sub-millisecond delivery guarantees across distributed clusters.",
    points: [
      "MQTT 3.1.1 & 5.0 compliant broker",
      "WebSocket real-time streaming",
      "Persistent message queues",
      "At-least-once & exactly-once delivery",
      "Topic-based routing & wildcards",
    ],
    stat: { label: "Messages/sec", value: "2M+" },
    color: "#ff6b00",
  },
  {
    id: "security",
    label: "Security",
    icon: Shield,
    tagline: "Enterprise-grade protection built-in",
    description:
      "End-to-end encryption, role-based access control, and audit logging. Security isn't an add-on — it's woven into every layer of the Altrex architecture.",
    points: [
      "TLS 1.3 encryption in transit",
      "JWT & OAuth 2.0 authentication",
      "Per-topic ACL policies",
      "Audit log & compliance export",
      "SOC 2 Type II ready",
    ],
    stat: { label: "Uptime SLA", value: "99.99%" },
    color: "#06b6d4",
  },
  {
    id: "analytics",
    label: "Analytics",
    icon: BarChart3,
    tagline: "Insights as they happen",
    description:
      "Live dashboards, custom event streams, and intelligent anomaly detection. Turn raw telemetry into business intelligence without moving data to a separate warehouse.",
    points: [
      "Sub-second dashboard refresh",
      "Custom metric aggregations",
      "Anomaly detection alerts",
      "Time-series export (InfluxDB, TimescaleDB)",
      "Webhook & Slack integrations",
    ],
    stat: { label: "Query latency", value: "<50ms" },
    color: "#8b5cf6",
  },
  {
    id: "scale",
    label: "Scale",
    icon: Layers3,
    tagline: "Grow without re-architecting",
    description:
      "Horizontal sharding, multi-region replication, and automatic failover. Altrex scales transparently — you never need to change application code to handle 10× the load.",
    points: [
      "Automatic horizontal sharding",
      "Multi-region active-active clusters",
      "Zero-downtime rolling upgrades",
      "Connection pooling & load balancing",
      "Kubernetes-native operators",
    ],
    stat: { label: "Concurrent connections", value: "10M+" },
    color: "#16a34a",
  },
];

function Capabilities() {
  const [active, setActive] = useState(0);
  const cap = capabilities[active];

  return (
    <Section>
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <SectionLabel>Capabilities</SectionLabel>
        <motion.h2
          variants={fadeUp}
          className="mx-auto max-w-3xl text-center text-3xl font-black tracking-tight text-[var(--text-primary)] sm:text-5xl"
        >
          Everything your realtime stack needs,{" "}
          <span style={{ color: "var(--accent-violet)" }}>in one platform</span>
        </motion.h2>

        {/* Tab bar */}
        <motion.div variants={fadeUp} className="mt-12 flex flex-wrap justify-center gap-2">
          {capabilities.map((c, i) => {
            const Icon = c.icon;
            const isActive = i === active;
            return (
              <button
                key={c.id}
                onClick={() => setActive(i)}
                className="flex items-center gap-2 rounded-xl border px-5 py-2.5 text-sm font-semibold transition-all duration-200"
                style={{
                  borderColor: isActive ? c.color : "var(--border-subtle)",
                  color: isActive ? c.color : "var(--text-muted)",
                  background: isActive ? `${c.color}12` : "transparent",
                }}
              >
                <Icon size={15} />
                {c.label}
              </button>
            );
          })}
        </motion.div>

        {/* Content panel */}
        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
            className="mt-10 grid grid-cols-1 gap-8 lg:grid-cols-2"
          >
            {/* Left: text */}
            <div className="flex flex-col justify-center">
              <div
                className="mb-4 inline-flex w-fit items-center gap-2 rounded-lg px-3 py-1.5 text-xs font-bold uppercase tracking-widest"
                style={{ background: `${cap.color}15`, color: cap.color }}
              >
                {cap.tagline}
              </div>
              <h3 className="text-2xl font-black tracking-tight text-[var(--text-primary)] sm:text-3xl">
                {cap.label}
              </h3>
              <p className="mt-4 text-base leading-relaxed text-[var(--text-secondary)]">
                {cap.description}
              </p>
              <ul className="mt-6 space-y-3">
                {cap.points.map((p) => (
                  <li key={p} className="flex items-start gap-3 text-sm text-[var(--text-secondary)]">
                    <CheckCircle2 size={16} className="mt-0.5 shrink-0" style={{ color: cap.color }} />
                    {p}
                  </li>
                ))}
              </ul>
            </div>

            {/* Right: stat + visual */}
            <div className="flex flex-col items-center justify-center gap-6">
              {/* Big stat */}
              <div
                className="flex flex-col items-center justify-center rounded-2xl border p-10 text-center"
                style={{ borderColor: `${cap.color}30`, background: `${cap.color}08` }}
              >
                <span className="text-6xl font-black tracking-tighter" style={{ color: cap.color }}>
                  {cap.stat.value}
                </span>
                <span className="mt-2 font-mono text-xs font-semibold uppercase tracking-widest text-[var(--text-muted)]">
                  {cap.stat.label}
                </span>
              </div>

              {/* Mini feature chips */}
              <div className="flex flex-wrap justify-center gap-2">
                {cap.points.slice(0, 3).map((p) => (
                  <span
                    key={p}
                    className="rounded-full border px-3 py-1 text-[11px] font-medium"
                    style={{ borderColor: `${cap.color}25`, color: "var(--text-secondary)" }}
                  >
                    {p}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </Section>
  );
}

/* ─────────────────────────────────────────────────────────────────
   3. ARCHITECTURE DIAGRAM (pure SVG)
───────────────────────────────────────────────────────────────── */
function Architecture() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  const nodes = {
    devices: [
      { id: "plc", label: "PLCs / RTUs", icon: Cpu, x: 60, y: 120 },
      { id: "sensor", label: "Sensors", icon: Wifi, x: 60, y: 220 },
      { id: "mobile", label: "Mobile Apps", icon: Cpu, x: 60, y: 320 },
    ],
    broker: { id: "broker", label: "Altrex Broker", x: 320, y: 220 },
    services: [
      { id: "analytics", label: "Analytics", icon: BarChart3, x: 560, y: 120 },
      { id: "storage", label: "Data Store", icon: Database, x: 560, y: 220 },
      { id: "alerts", label: "Alerting", icon: Bell, x: 560, y: 320 },
    ],
  };

  const edges = [
    ...nodes.devices.map((d) => ({ from: [d.x + 80, d.y + 20], to: [nodes.broker.x, nodes.broker.y + 20] })),
    ...nodes.services.map((s) => ({ from: [nodes.broker.x + 100, nodes.broker.y + 20], to: [s.x, s.y + 20] })),
  ];

  return (
    <Section>
      <div ref={ref} className="mx-auto max-w-7xl px-6 lg:px-8">
        <SectionLabel>Architecture</SectionLabel>
        <motion.h2 variants={fadeUp} className="mx-auto max-w-3xl text-center text-3xl font-black tracking-tight text-[var(--text-primary)] sm:text-5xl">
          Designed for{" "}
          <span style={{ color: "var(--accent-violet)" }}>industrial-grade</span> workloads
        </motion.h2>
        <motion.p variants={fadeUp} className="mx-auto mt-5 max-w-2xl text-center text-base text-[var(--text-secondary)]">
          From edge devices to cloud services, Altrex sits at the centre of your data flow — routing, transforming, and delivering with zero message loss.
        </motion.p>

        {/* SVG diagram */}
        <motion.div
          variants={fadeUp}
          className="relative mx-auto mt-16 overflow-x-auto rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-surface)] p-8 shadow-sm"
        >
          <svg viewBox="0 0 700 440" className="mx-auto w-full max-w-3xl" style={{ minWidth: 400 }}>
            {/* Grid lines */}
            {[100, 200, 300, 400].map((y) => (
              <line key={y} x1="0" y1={y} x2="700" y2={y} stroke="var(--border-subtle)" strokeWidth="1" />
            ))}

            {/* Edges */}
            {inView && edges.map((e, i) => (
              <motion.line
                key={i}
                x1={e.from[0]} y1={e.from[1]} x2={e.to[0]} y2={e.to[1]}
                stroke="#ff6b00"
                strokeWidth="1.5"
                strokeDasharray="6 4"
                opacity={0.4}
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 0.4 }}
                transition={{ duration: 0.8, delay: 0.3 + i * 0.08 }}
              />
            ))}

            {/* Animated pulses on edges */}
            {inView && edges.map((e, i) => (
              <motion.circle
                key={`pulse-${i}`}
                r={4}
                fill="#ff6b00"
                initial={{ opacity: 0 }}
                animate={{
                  opacity: [0, 1, 0],
                  offsetDistance: ["0%", "100%"],
                }}
                style={{
                  offsetPath: `path("M ${e.from[0]} ${e.from[1]} L ${e.to[0]} ${e.to[1]}")`,
                }}
                transition={{ duration: 2, delay: i * 0.3, repeat: Infinity, ease: "linear" }}
              />
            ))}

            {/* Device nodes */}
            {nodes.devices.map((node, i) => {
              const Icon = node.icon;
              return (
                <motion.g
                  key={node.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.1 + i * 0.1 }}
                >
                  <rect x={node.x} y={node.y} width={80} height={40} rx={10} fill="var(--bg-raised)" stroke="var(--border-subtle)" strokeWidth={1.5} />
                  <text x={node.x + 40} y={node.y + 24} textAnchor="middle" fill="var(--text-secondary)" fontSize={10} fontWeight={600}>{node.label}</text>
                </motion.g>
              );
            })}

            {/* Broker node */}
            <motion.g
              initial={{ opacity: 0, scale: 0.8 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.6, delay: 0.5 }}
            >
              <rect x={nodes.broker.x} y={nodes.broker.y - 40} width={100} height={120} rx={14} fill="#ff6b00" opacity={0.1} stroke="#ff6b00" strokeWidth={2} />
              <rect x={nodes.broker.x + 5} y={nodes.broker.y - 35} width={90} height={110} rx={10} fill="none" stroke="#ff6b00" strokeWidth={1} opacity={0.3} />
              <text x={nodes.broker.x + 50} y={nodes.broker.y + 16} textAnchor="middle" fill="#ff6b00" fontSize={11} fontWeight={800}>ALTREX</text>
              <text x={nodes.broker.x + 50} y={nodes.broker.y + 30} textAnchor="middle" fill="#ff6b00" fontSize={9} opacity={0.7}>BROKER</text>
              <circle cx={nodes.broker.x + 50} cy={nodes.broker.y - 15} r={12} fill="#ff6b00" opacity={0.15} />
              <circle cx={nodes.broker.x + 50} cy={nodes.broker.y - 15} r={6} fill="#ff6b00" opacity={0.8} />
              {/* Ripple */}
              {inView && (
                <motion.circle
                  cx={nodes.broker.x + 50} cy={nodes.broker.y - 15} r={6}
                  fill="none" stroke="#ff6b00" strokeWidth={2}
                  initial={{ r: 6, opacity: 0.8 }}
                  animate={{ r: 20, opacity: 0 }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                />
              )}
            </motion.g>

            {/* Service nodes */}
            {nodes.services.map((node, i) => (
              <motion.g
                key={node.id}
                initial={{ opacity: 0, x: 20 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.6 + i * 0.1 }}
              >
                <rect x={node.x} y={node.y} width={100} height={40} rx={10} fill="var(--bg-raised)" stroke="var(--border-subtle)" strokeWidth={1.5} />
                <text x={node.x + 50} y={node.y + 24} textAnchor="middle" fill="var(--text-secondary)" fontSize={10} fontWeight={600}>{node.label}</text>
              </motion.g>
            ))}

            {/* Column labels */}
            {[
              { x: 100, label: "DEVICES" },
              { x: 370, label: "ALTREX CORE" },
              { x: 610, label: "SERVICES" },
            ].map((col) => (
              <text key={col.label} x={col.x} y={400} textAnchor="middle" fill="var(--text-muted)" fontSize={9} fontWeight={700} letterSpacing={2}>
                {col.label}
              </text>
            ))}
          </svg>
        </motion.div>
      </div>
    </Section>
  );
}

/* ─────────────────────────────────────────────────────────────────
   4. LIVE METRICS (animated counters)
───────────────────────────────────────────────────────────────── */
function useCount(target: number, duration = 2000, trigger = true) {
  const [value, setValue] = useState(0);
  useEffect(() => {
    if (!trigger) return;
    const start = performance.now();
    const raf = (now: number) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setValue(Math.round(eased * target));
      if (progress < 1) requestAnimationFrame(raf);
    };
    requestAnimationFrame(raf);
  }, [target, duration, trigger]);
  return value;
}

const metrics = [
  { label: "Messages Delivered Today", value: 9_400_000_000, suffix: "B+", display: (v: number) => `${(v / 1e9).toFixed(1)}`, color: "#ff6b00" },
  { label: "Connected Devices", value: 12_700_000, suffix: "M+", display: (v: number) => `${(v / 1e6).toFixed(1)}`, color: "#06b6d4" },
  { label: "Global Edge Nodes", value: 84, suffix: "", display: (v: number) => `${v}`, color: "#16a34a" },
  { label: "Avg Delivery Latency", value: 0.8, suffix: "ms", display: () => "0.8", color: "#8b5cf6" },
  { label: "Uptime (rolling 90d)", value: 99.99, suffix: "%", display: () => "99.99", color: "#f59e0b" },
  { label: "Peak Throughput", value: 2_000_000, suffix: "/s", display: (v: number) => `${(v / 1e6).toFixed(0)}M`, color: "#ec4899" },
];

function LiveMetrics() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <Section>
      <div ref={ref} className="mx-auto max-w-7xl px-6 lg:px-8">
        <SectionLabel>Platform Scale</SectionLabel>
        <motion.h2 variants={fadeUp} className="mx-auto max-w-3xl text-center text-3xl font-black tracking-tight text-[var(--text-primary)] sm:text-5xl">
          Numbers that prove{" "}
          <span style={{ color: "var(--accent-violet)" }}>production readiness</span>
        </motion.h2>

        <div className="mt-14 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
          {metrics.map((m, i) => {
            const val = useCount(m.value, 2200, inView);
            return (
              <motion.div
                key={m.label}
                variants={fadeUp}
                className="group flex flex-col items-center justify-center rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-surface)] p-6 text-center transition-all duration-300 hover:border-transparent hover:shadow-lg"
                style={{ "--hover-color": m.color } as React.CSSProperties}
              >
                <div
                  className="mb-1 text-3xl font-black tracking-tighter transition-colors duration-300"
                  style={{ color: inView ? m.color : "var(--text-muted)" }}
                >
                  {m.display(val)}{m.suffix}
                </div>
                <div className="text-[10px] font-semibold uppercase leading-tight tracking-wider text-[var(--text-muted)]">
                  {m.label}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </Section>
  );
}

/* ─────────────────────────────────────────────────────────────────
   5. PROTOCOLS comparison grid
───────────────────────────────────────────────────────────────── */
const protocols = [
  {
    name: "MQTT",
    icon: Radio,
    color: "#ff6b00",
    badge: "IoT Native",
    features: ["QoS 0 / 1 / 2", "Persistent Sessions", "Will Messages", "5.0 Properties", "Shared Subscriptions"],
    best: "Constrained devices & IoT",
  },
  {
    name: "WebSocket",
    icon: Globe,
    color: "#06b6d4",
    badge: "Browser Ready",
    features: ["Full-duplex", "Sub-10ms latency", "Binary frames", "Auto-reconnect", "Compression"],
    best: "Web & mobile apps",
  },
  {
    name: "REST / HTTP",
    icon: Network,
    color: "#8b5cf6",
    badge: "Universal",
    features: ["Stateless requests", "Webhook push", "OpenAPI spec", "Rate limiting", "OAuth 2.0"],
    best: "Server-to-server integrations",
  },
];

function Protocols() {
  return (
    <Section>
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <SectionLabel>Protocols</SectionLabel>
        <motion.h2 variants={fadeUp} className="mx-auto max-w-3xl text-center text-3xl font-black tracking-tight text-[var(--text-primary)] sm:text-5xl">
          Connect anything with{" "}
          <span style={{ color: "var(--accent-violet)" }}>any protocol</span>
        </motion.h2>
        <motion.p variants={fadeUp} className="mx-auto mt-5 max-w-2xl text-center text-base text-[var(--text-secondary)]">
          Altrex speaks your language — whether you're building for constrained IoT hardware, real-time web apps, or backend microservices.
        </motion.p>

        <div className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-3">
          {protocols.map((p) => {
            const Icon = p.icon;
            return (
              <motion.div
                key={p.name}
                variants={fadeUp}
                className="group relative overflow-hidden rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-surface)] p-7 transition-all duration-300 hover:shadow-xl"
                style={{ "--p-color": p.color } as React.CSSProperties}
                whileHover={{ y: -4 }}
              >
                {/* Corner glow */}
                <div
                  className="pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full opacity-0 blur-2xl transition-opacity duration-300 group-hover:opacity-30"
                  style={{ background: p.color }}
                />
                <div className="mb-5 flex items-center justify-between">
                  <div
                    className="flex h-12 w-12 items-center justify-center rounded-xl"
                    style={{ background: `${p.color}18` }}
                  >
                    <Icon size={22} style={{ color: p.color }} />
                  </div>
                  <span
                    className="rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-widest"
                    style={{ background: `${p.color}15`, color: p.color }}
                  >
                    {p.badge}
                  </span>
                </div>
                <h3 className="text-xl font-black text-[var(--text-primary)]">{p.name}</h3>
                <p className="mt-1 text-xs text-[var(--text-muted)]">Best for: {p.best}</p>
                <ul className="mt-5 space-y-2.5">
                  {p.features.map((f) => (
                    <li key={f} className="flex items-center gap-2 text-sm text-[var(--text-secondary)]">
                      <span className="h-1.5 w-1.5 rounded-full" style={{ background: p.color }} />
                      {f}
                    </li>
                  ))}
                </ul>
              </motion.div>
            );
          })}
        </div>
      </div>
    </Section>
  );
}

/* ─────────────────────────────────────────────────────────────────
   6. SDKs / Code snippets
───────────────────────────────────────────────────────────────── */
const codeSnippets: Record<string, string> = {
  JavaScript: `import { AltrexClient } from '@altrex/sdk';

const client = new AltrexClient({
  endpoint: 'wss://broker.altrex.io',
  apiKey: process.env.ALTREX_API_KEY,
});

// Subscribe to a topic
client.subscribe('sensors/+/temperature', (msg) => {
  console.log('Received:', msg.payload);
});

// Publish a message
await client.publish('sensors/room-01/temperature', {
  value: 23.5,
  unit: 'celsius',
  timestamp: Date.now(),
});`,

  Python: `from altrex import AltrexClient

client = AltrexClient(
    endpoint="wss://broker.altrex.io",
    api_key=os.environ["ALTREX_API_KEY"],
)

@client.on_message("sensors/+/temperature")
def handle_temp(msg):
    print(f"Received: {msg.payload}")

# Publish a message
client.publish("sensors/room-01/temperature", {
    "value": 23.5,
    "unit": "celsius",
    "timestamp": time.time(),
})`,

  Go: `import "github.com/altrex/sdk-go"

client, _ := altrex.NewClient(altrex.Config{
    Endpoint: "wss://broker.altrex.io",
    APIKey:   os.Getenv("ALTREX_API_KEY"),
})

// Subscribe
client.Subscribe("sensors/+/temperature", func(msg altrex.Message) {
    fmt.Printf("Received: %v\\n", msg.Payload)
})

// Publish
client.Publish("sensors/room-01/temperature", map[string]any{
    "value":     23.5,
    "unit":      "celsius",
    "timestamp": time.Now().Unix(),
})`,
};

function SDKs() {
  const [active, setActive] = useState("JavaScript");
  const langs = Object.keys(codeSnippets);

  return (
    <Section>
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <SectionLabel>Developer Experience</SectionLabel>
        <motion.h2 variants={fadeUp} className="mx-auto max-w-3xl text-center text-3xl font-black tracking-tight text-[var(--text-primary)] sm:text-5xl">
          Ship in minutes,{" "}
          <span style={{ color: "var(--accent-violet)" }}>not weeks</span>
        </motion.h2>
        <motion.p variants={fadeUp} className="mx-auto mt-5 max-w-2xl text-center text-base text-[var(--text-secondary)]">
          Idiomatic SDKs for every major language. Full TypeScript types, auto-complete, and production-ready examples included.
        </motion.p>

        <motion.div variants={fadeUp} className="mx-auto mt-12 max-w-3xl">
          {/* Lang tabs */}
          <div className="mb-0 flex gap-1 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-raised)] p-1">
            {langs.map((l) => (
              <button
                key={l}
                onClick={() => setActive(l)}
                className="flex-1 rounded-lg py-2.5 text-sm font-semibold transition-all duration-200"
                style={{
                  background: l === active ? "#ff6b00" : "transparent",
                  color: l === active ? "#fff" : "var(--text-muted)",
                }}
              >
                {l}
              </button>
            ))}
          </div>

          {/* Code block */}
          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="overflow-hidden rounded-b-xl border border-t-0 border-[var(--border-subtle)] bg-[#0f0e1a]"
            >
              {/* Dots bar */}
              <div className="flex items-center gap-2 border-b border-white/[0.06] px-4 py-2.5">
                <span className="h-2.5 w-2.5 rounded-full bg-red-400/60" />
                <span className="h-2.5 w-2.5 rounded-full bg-yellow-400/60" />
                <span className="h-2.5 w-2.5 rounded-full bg-green-400/60" />
                <span className="ml-2 font-mono text-[10px] text-white/30">index.{active === "JavaScript" ? "ts" : active === "Python" ? "py" : "go"}</span>
              </div>
              <pre className="overflow-x-auto p-6 font-mono text-sm leading-relaxed text-white/80">
                <code>{codeSnippets[active]}</code>
              </pre>
            </motion.div>
          </AnimatePresence>
        </motion.div>

        {/* DX features */}
        <div className="mt-12 grid grid-cols-2 gap-4 sm:grid-cols-4">
          {[
            { icon: Braces, label: "Type-Safe APIs", sub: "Full TypeScript" },
            { icon: Rocket, label: "Ship Faster", sub: "Starter templates" },
            { icon: Terminal, label: "CLI Tooling", sub: "Deploy & debug" },
            { icon: Lock, label: "Auth Built-in", sub: "JWT · OAuth" },
          ].map((f) => {
            const Icon = f.icon;
            return (
              <motion.div
                key={f.label}
                variants={fadeUp}
                className="flex flex-col items-center rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-surface)] p-5 text-center"
              >
                <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-[var(--accent-violet)]/10">
                  <Icon size={18} style={{ color: "var(--accent-violet)" }} />
                </div>
                <div className="text-sm font-bold text-[var(--text-primary)]">{f.label}</div>
                <div className="mt-0.5 text-xs text-[var(--text-muted)]">{f.sub}</div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </Section>
  );
}

/* ─────────────────────────────────────────────────────────────────
   7. CTA BANNER
───────────────────────────────────────────────────────────────── */
function CTABanner() {
  return (
    <Section>
      <div className="mx-auto max-w-5xl px-6 lg:px-8">
        <motion.div
          variants={fadeUp}
          className="relative overflow-hidden rounded-3xl px-8 py-16 text-center sm:px-16 sm:py-20"
          style={{ background: "linear-gradient(135deg,#ff6b00 0%,#b84100 100%)" }}
        >
          {/* Decorative circles */}
          <div className="pointer-events-none absolute -right-24 -top-24 h-64 w-64 rounded-full bg-white/10" />
          <div className="pointer-events-none absolute -bottom-16 -left-16 h-48 w-48 rounded-full bg-white/10" />

          <div className="relative z-10">
            <span className="inline-flex items-center gap-2 rounded-full bg-white/20 px-4 py-1.5 font-mono text-xs font-semibold uppercase tracking-widest text-white/90">
              <Zap size={10} />
              Get started today
            </span>
            <h2 className="mt-6 text-3xl font-black tracking-tight text-white sm:text-5xl">
              Build your realtime platform
              <br />
              in under an hour.
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-base text-white/70">
              Free tier available. No credit card required. Connect your first device in minutes with our guided onboarding.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <button className="flex items-center gap-2 rounded-xl bg-white px-7 py-3.5 text-sm font-bold text-[#ff6b00] transition-all duration-200 hover:shadow-lg active:scale-95">
                Start for Free
                <ArrowRight size={15} />
              </button>
              <button className="flex items-center gap-2 rounded-xl border border-white/30 bg-white/10 px-7 py-3.5 text-sm font-semibold text-white backdrop-blur transition-all duration-200 hover:bg-white/20">
                Talk to Sales
                <ChevronRight size={15} />
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </Section>
  );
}

/* ─────────────────────────────────────────────────────────────────
   PAGE ROOT
───────────────────────────────────────────────────────────────── */
const Product = () => {
  return (
    <div className="overflow-x-hidden bg-[var(--bg-void)]">
      <ProductHero />
      <Capabilities />
      <Architecture />
      <LiveMetrics />
      <Protocols />
      <SDKs />
      <CTABanner />
    </div>  
  );
};

export default Product;