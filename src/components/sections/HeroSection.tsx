import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  Play,
  Wifi,
  AlertTriangle,
  TrendingUp,
  MapPin,
  Truck,
  BarChart2,
  Activity,
  CheckCircle2,
  Clock,
  Plug,
} from "lucide-react";
import { motion, type Variants } from "framer-motion";
import { gsap } from "gsap";
import useMagneticButton from "@/hooks/useMagneticButton";
import { Button } from "../ui/button";
import CharReveal from "@/components/CharReveal";
import { SectionBadge } from "@/components/ui/section-badge";

const fadeUpVariants: Variants = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.65 } },
};

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, delay, ease: [0.16, 1, 0.3, 1] },
  }),
};

// ── Live metric row ───────────────────────────────────────────────────────────
function MetricPill({
  label,
  value,
  color,
  delay,
}: {
  label: string;
  value: string;
  color: string;
  delay: number;
}) {
  return (
    <motion.div
      custom={delay}
      variants={fadeUp}
      initial="hidden"
      animate="visible"
      className="flex items-center gap-2 rounded-lg border border-border bg-muted/60 px-3 py-2"
    >
      <span
        className="h-1.5 w-1.5 rounded-full animate-pulse shrink-0"
        style={{ background: color }}
      />
      <span className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
        {label}
      </span>
      <span className="ml-auto font-mono text-xs font-bold" style={{ color }}>
        {value}
      </span>
    </motion.div>
  );
}

// ── Alarm row ─────────────────────────────────────────────────────────────────
function AlarmRow({
  station,
  type,
  status,
  time,
  isWarning,
}: {
  station: string;
  type: string;
  status: string;
  time: string;
  isWarning: boolean;
}) {
  return (
    <div className="flex items-center gap-3 rounded-lg px-3 py-2 hover:bg-muted/40 transition-colors">
      <div
        className={`shrink-0 rounded-md p-1.5 ${isWarning ? "bg-amber-500/15" : "bg-emerald-500/15"
          }`}
      >
        {isWarning ? (
          <AlertTriangle size={11} className="text-amber-500" />
        ) : (
          <CheckCircle2 size={11} className="text-emerald-500" />
        )}
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-[11px] font-semibold text-foreground truncate">
          {station}
        </p>
        <p className="text-[10px] text-muted-foreground truncate">{type}</p>
      </div>
      <div className="text-right shrink-0">
        <p
          className={`text-[10px] font-bold ${isWarning ? "text-amber-500" : "text-emerald-500"
            }`}
        >
          {status}
        </p>
        <p className="text-[9px] font-mono text-muted-foreground">{time}</p>
      </div>
    </div>
  );
}

// ── Mini sparkline ─────────────────────────────────────────────────────────────
function Sparkline({
  data,
  color,
  height = 32,
}: {
  data: number[];
  color: string;
  height?: number;
}) {
  const max = Math.max(...data);
  const min = Math.min(...data);
  const range = max - min || 1;
  const w = 80;
  const h = height;
  const points = data
    .map(
      (v, i) => `${(i / (data.length - 1)) * w},${h - ((v - min) / range) * h}`,
    )
    .join(" ");

  return (
    <svg width={w} height={h} viewBox={`0 0 ${w} ${h}`}>
      <polyline
        points={points}
        fill="none"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        opacity="0.85"
      />
      <circle
        cx={((data.length - 1) / (data.length - 1)) * w}
        cy={h - ((data[data.length - 1] - min) / range) * h}
        r="2.5"
        fill={color}
      />
    </svg>
  );
}

// ── Dashboard Panel ───────────────────────────────────────────────────────────
function DashboardPreview() {
  return (
    <motion.div
      initial={{ opacity: 0, x: 40 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.9, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
      className="relative w-full max-w-[820px] select-none"
    >
      {/* Outer glow — brand accent */}
      <div className="absolute -inset-4 rounded-3xl bg-accent/5 blur-2xl pointer-events-none" />
      <div className="absolute -inset-1 rounded-2xl bg-gradient-to-br from-accent/10 via-transparent to-primary/10 blur-sm pointer-events-none" />

      {/* Main panel */}
      <div className="relative rounded-2xl border border-border bg-card/95 backdrop-blur-md overflow-hidden shadow-2xl">
        {/* Terminal bar */}
        <div className="flex items-center justify-between border-b border-border bg-background/60 px-4 py-2.5">
          <div className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-[#ff5f57]" />
            <span className="h-2 w-2 rounded-full bg-[#febc2e]" />
            <span className="h-2 w-2 rounded-full bg-[#28c840]" />
            <span className="ml-2 font-mono text-[10px] text-muted-foreground">
              altrex@platform:~${" "}
              <span className="text-accent">W! Platform Live</span>
            </span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
            <span className="font-mono text-[10px] text-emerald-500 uppercase tracking-wider">
              LIVE
            </span>
          </div>
        </div>

        <div className="p-4 space-y-3">
          {/* Top metrics strip */}
          <div className="grid grid-cols-3 gap-2">
            <MetricPill
              label="Devices Online"
              value="18,240"
              color="#10b981"
              delay={0.7}
            />
            <MetricPill
              label="Avg Latency"
              value="12ms"
              color="var(--accent)"
              delay={0.8}
            />
            <MetricPill
              label="Uptime"
              value="99.99%"
              color="var(--primary)"
              delay={0.9}
            />
          </div>

          {/* Two-column body */}
          <div className="grid grid-cols-2 gap-3">
            {/* Left: KPI cards */}
            <div className="space-y-2">
              {/* ERP sync card */}
              <div className="rounded-xl border border-border bg-muted/60 p-3">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-1.5">
                    <BarChart2 size={12} className="text-accent" />
                    <span className="font-mono text-[9px] uppercase tracking-widest text-muted-foreground">
                      ERP Sync
                    </span>
                  </div>
                  <span className="font-mono text-[9px] text-emerald-500">
                    ● ACTIVE
                  </span>
                </div>
                <p className="text-xl font-bold text-foreground">₹4.2Cr</p>
                <p className="text-[10px] text-muted-foreground">
                  Today's reconciled value
                </p>
                <div className="mt-2 flex justify-end">
                  <Sparkline
                    data={[38, 45, 42, 55, 48, 62, 58, 70, 65, 72]}
                    color="var(--accent)"
                  />
                </div>
              </div>

              {/* CRM card */}
              <div className="rounded-xl border border-border bg-muted/60 p-3">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-1.5">
                    <TrendingUp size={12} className="text-primary" />
                    <span className="font-mono text-[9px] uppercase tracking-widest text-muted-foreground">
                      CRM Pipeline
                    </span>
                  </div>
                  <span className="font-mono text-[9px] text-primary">
                    847 leads
                  </span>
                </div>
                <div className="space-y-1.5 mt-1">
                  {[
                    { label: "Qualified", pct: 68, color: "var(--primary)" },
                    { label: "In Progress", pct: 45, color: "var(--accent)" },
                    { label: "Closed", pct: 82, color: "#10b981" },
                  ].map((item) => (
                    <div key={item.label} className="flex items-center gap-2">
                      <span className="w-14 text-[9px] text-muted-foreground shrink-0">
                        {item.label}
                      </span>
                      <div className="flex-1 h-1 rounded-full bg-muted overflow-hidden">
                        <div
                          className="h-full rounded-full"
                          style={{
                            width: `${item.pct}%`,
                            background: item.color,
                          }}
                        />
                      </div>
                      <span
                        className="text-[9px] font-mono"
                        style={{ color: item.color }}
                      >
                        {item.pct}%
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Network card */}
              <div className="rounded-xl border border-border bg-muted/60 p-3">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-1.5">
                    <Wifi size={12} className="text-blue-500" />
                    <span className="font-mono text-[9px] uppercase tracking-widest text-muted-foreground">
                      Network I/O
                    </span>
                  </div>
                  <span className="font-mono text-[9px] text-blue-500">
                    1.2 TB/s
                  </span>
                </div>
                <div className="space-y-1.5 mt-1">
                  {[
                    { label: "Inbound", pct: 75, color: "#60a5fa" },
                    { label: "Outbound", pct: 42, color: "#22d3ee" },
                    { label: "Latency", pct: 89, color: "#ef4444" },
                    { label: "Spike", pct: 45, color: "#f59e0b" },
                    { label: "Packets", pct: 70, color: "#10b981" },
                  ].map((item) => (
                    <div key={item.label} className="flex items-center gap-2">
                      <span className="w-14 text-[9px] text-muted-foreground shrink-0">
                        {item.label}
                      </span>
                      <div className="flex-1 h-1 rounded-full bg-muted overflow-hidden">
                        <div
                          className="h-full rounded-full"
                          style={{
                            width: `${item.pct}%`,
                            background: item.color,
                          }}
                        />
                      </div>
                      <span
                        className="text-[9px] font-mono"
                        style={{ color: item.color }}
                      >
                        {item.pct}%
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right: VTS + Alarm */}
            <div className="space-y-2">
              {/* VTS / Fleet card */}
              <div className="rounded-xl border border-border bg-muted/60 p-3">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-1.5">
                    <Truck size={12} className="text-cyan-500" />
                    <span className="font-mono text-[9px] uppercase tracking-widest text-muted-foreground">
                      VTS Fleet
                    </span>
                  </div>
                  <span className="font-mono text-[9px] text-cyan-500">
                    214 active
                  </span>
                </div>
                {/* Mini map placeholder */}
                <div className="relative rounded-lg bg-background/60 border border-border h-[110px] overflow-hidden mb-2">
                  <svg className="absolute inset-0 w-full h-full opacity-20">
                    <defs>
                      <pattern
                        id="map-grid"
                        width="16"
                        height="16"
                        patternUnits="userSpaceOnUse"
                      >
                        <path
                          d="M 16 0 L 0 0 0 16"
                          fill="none"
                          stroke="currentColor"
                          className="text-muted-foreground"
                          strokeWidth="0.5"
                        />
                      </pattern>
                    </defs>
                    <rect width="100%" height="100%" fill="url(#map-grid)" />
                  </svg>
                  {[
                    { x: "22%", y: "30%", color: "#06b6d4" },
                    { x: "45%", y: "55%", color: "#06b6d4" },
                    { x: "65%", y: "25%", color: "#10b981" },
                    { x: "75%", y: "65%", color: "var(--accent)" },
                    { x: "35%", y: "70%", color: "#06b6d4" },
                  ].map((dot, i) => (
                    <div
                      key={i}
                      className="absolute flex items-center justify-center"
                      style={{
                        left: dot.x,
                        top: dot.y,
                        transform: "translate(-50%,-50%)",
                      }}
                    >
                      <span
                        className="absolute h-4 w-4 rounded-full animate-ping opacity-40"
                        style={{ background: dot.color }}
                      />
                      <MapPin
                        size={10}
                        style={{ color: dot.color }}
                        className="relative z-10"
                      />
                    </div>
                  ))}
                </div>
                <div className="flex justify-between text-[9px] font-mono">
                  <span className="text-emerald-500">● 198 On-Route</span>
                  <span className="text-amber-500">● 16 Idle</span>
                </div>
              </div>

              {/* Alarm feed */}
              <div className="rounded-xl border border-border bg-muted/60 p-3">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-1.5">
                    <Activity size={12} className="text-amber-500" />
                    <span className="font-mono text-[9px] uppercase tracking-widest text-muted-foreground">
                      Alarm Feed
                    </span>
                  </div>
                  <span className="font-mono text-[9px] text-amber-500">
                    3 active
                  </span>
                </div>
                <div className="space-y-0.5">
                  <AlarmRow
                    station="CGS-Mumbai-04"
                    type="High Pressure"
                    status="WARN"
                    time="0:12s"
                    isWarning={true}
                  />
                  <AlarmRow
                    station="DRS-Pune-11"
                    type="Flow anomaly"
                    status="OK"
                    time="1:40s"
                    isWarning={false}
                  />
                  <AlarmRow
                    station="CNG-Surat-07"
                    type="Valve offline"
                    status="WARN"
                    time="3:05s"
                    isWarning={true}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Bottom connectivity status strip */}
          <div className="flex items-center gap-3 rounded-lg border border-border bg-background/40 px-3 py-2">
            <Wifi size={11} className="text-emerald-500 shrink-0" />
            <div className="flex flex-1 gap-2 overflow-hidden">
              {["MQTT", "OPC-UA", "MODBUS", "REST API", "MQTT-SB"].map(
                (proto) => (
                  <span
                    key={proto}
                    className="rounded border border-emerald-500/20 bg-emerald-500/5 px-2 py-0.5 font-mono text-[9px] text-emerald-500 whitespace-nowrap"
                  >
                    ● {proto}
                  </span>
                ),
              )}
            </div>
            <span className="font-mono text-[9px] text-muted-foreground shrink-0">
              [STREAM: ACTIVE]
            </span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

// ── HeroSection ───────────────────────────────────────────────────────────────
const HeroSection = () => {
  const metadataRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!metadataRef.current) return;
    gsap.fromTo(
      metadataRef.current,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.8, delay: 1, ease: "power2.out" },
    );
  }, []);

  return (
    <section
      id="chapter-01"
      className="relative overflow-hidden scroll-mt-28 min-h-screen w-full flex items-center"
    >

      <div className="mx-auto w-full max-w-screen-2xl px-6 lg:px-8 pt-24 pb-16">
        <div className="grid grid-cols-1 items-center gap-16 lg:gap-12 lg:grid-cols-[1fr_1.35fr]">
          {/* ── LEFT: text content ── */}
          <div className="flex flex-col items-start">
            {/* Badge */}
            <motion.div variants={fadeUpVariants} initial="hidden" animate="visible">
              <SectionBadge
                title="altrex digital platform"
                dot={true}
                dotColor="bg-emerald-500"
                className="mb-8"
              />
            </motion.div>

            {/* Eyebrow */}
            <motion.span
              custom={0.1}
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              className="mb-3 font-mono text-xs uppercase tracking-[0.1em] text-accent font-bold"
            >
              Industrial IoT &amp; SCADA, Unified
            </motion.span>

            {/* Heading */}
            <CharReveal
              as="h1"
              lines={["DIGITAL PLATFORMS FOR", "CONNECTED OPERATIONS"]}
              className="text-4xl font-bold tracking-[-0.03em] text-foreground sm:text-5xl leading-[1.02] uppercase text-left"
              immediate
              delay={0}
              stagger={0.028}
              lineGap="mt-1.5"
            />

            {/* Description */}
            <motion.p
              custom={1.0}
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              className="mt-7 max-w-lg text-base font-semibold leading-7 text-muted-foreground sm:text-lg text-left"
            >
              Transform field data into real-time intelligence with Industrial IoT, SCADA, GIS, Asset Management, Fleet Tracking, and Analytics.
            </motion.p>

            {/* Buttons */}
            <motion.div
              custom={1.3}
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              className="mt-10 flex flex-col items-start gap-4 sm:flex-row sm:items-center"
            >
              <Link to="/contact">
                <Button
                  size="lg"
                  className="gap-2 bg-primary px-8 py-6 text-base text-primary-foreground hover:bg-accent  shadow-primary/20"
                >
                  Request Demo
                  <ArrowRight />
                </Button>
              </Link>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="gap-2 px-8 py-6 text-base"
              >
                <Link to="/solutions">
                  <Play className="h-4 w-4" />
                  Explore Solutions
                </Link>
              </Button>
            </motion.div>

            {/* Bottom stat strip */}
            <motion.div
              ref={metadataRef}
              className="mt-14 grid w-full grid-cols-2 gap-x-6 gap-y-8 opacity-0 sm:flex sm:flex-wrap sm:gap-8"
            >
              {[
                {
                  label: "Data Points / Minute",
                  value: "500K+",
                  icon: Activity,
                },
                {
                  label: "Platform Availability",
                  value: "99.9%",
                  icon: CheckCircle2,
                },
                { label: "Integrations", value: "50+", icon: Plug },
                { label: "Monitoring", value: "24×7", icon: Clock },
              ].map((stat) => (
                <div key={stat.label} className="flex flex-col gap-3">
                  <stat.icon className="h-5 w-5 text-primary" />
                  <div className="flex flex-col font-bold items-start gap-0.5">
                    <span className="text-xl text-foreground">
                      {stat.value}
                    </span>
                    <span className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
                      {stat.label}
                    </span>
                  </div>
                </div>
              ))}
            </motion.div>
          </div>

          {/* ── RIGHT: dashboard preview ── */}
          <div className="flex justify-center lg:justify-end w-full">
            <DashboardPreview />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
