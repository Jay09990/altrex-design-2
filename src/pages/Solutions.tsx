import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Activity,
  Network,
  ShieldCheck,
  Layers,
  ChevronRight,
  Flame,
  Wind,
  Factory,
  Truck,
  Sun,
  Leaf,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import CharReveal from "@/components/CharReveal";
import InViewDecryptedText from "@/components/InViewDecryptedText";
import SystemDataTicker from "@/components/SystemDataTicker";
import StarBorder from "@/components/StarBorder";
import { useMagneticTilt } from "@/hooks/useMagneticTilt";

// ─────────────────────────────────────────────
// Types
// ─────────────────────────────────────────────
type SolutionItem = {
  number: string;
  title: string;
  bullets: string[];
};

type IndustrySolution = {
  id: string;
  label: string;
  tagline: string;
  description: string;
  icon: React.ReactNode;
  color: string;           // tailwind text color
  accentHex: string;       // raw hex for glow / SVG
  items: SolutionItem[];
};

// ─────────────────────────────────────────────
// Data
// ─────────────────────────────────────────────
const INDUSTRY_SOLUTIONS: IndustrySolution[] = [
  {
    id: "cgd",
    label: "CGD",
    tagline: "City Gas Distribution",
    description: "Complete Digital Gas Distribution Network Platform",
    icon: <Flame className="h-5 w-5" />,
    color: "text-orange-500",
    accentHex: "#f97316",
    items: [
      {
        number: "01",
        title: "Region / GA (Geographical Area)",
        bullets: ["Regionwise Stations", "Sales per Region", "Gas Demand", "Downtime Monitoring", "Reconciliation"],
      },
      {
        number: "02",
        title: "CGS (City Gate Station)",
        bullets: ["City Sales", "Gas Losses (LUAG)", "Availability", "CNG Demand", "PNG Demand", "Gas Parameters Monitoring", "Reconciliation"],
      },
      {
        number: "03",
        title: "Distribution Level",
        bullets: ["CNG – Online, Mother, Daughter Stations", "PNG – Industrial, Commercial, Domestic", "LCNG", "DRS", "AMR", "Reconciliation"],
      },
      {
        number: "04",
        title: "CNG Station Level",
        bullets: ["Equipments – Compressors, Boosters, Dispensers", "Cascade Monitoring", "Analytics", "Sales", "PAS", "Reconciliation"],
      },
      {
        number: "05",
        title: "GIS & VTS",
        bullets: ["Asset Management", "Cascade Tracking", "Route Optimization", "Automatic Allocation", "Pipeline Network"],
      },
    ],
  },
  {
    id: "omc",
    label: "OMC",
    tagline: "Oil Marketing Companies",
    description: "Complete Digital Fuel Network Platform",
    icon: <Truck className="h-5 w-5" />,
    color: "text-blue-400",
    accentHex: "#60a5fa",
    items: [
      {
        number: "01",
        title: "Terminal / Refinery Monitoring",
        bullets: ["Terminal Automation", "Tank Levels", "Fuel Availability", "Dispatch Planning", "Pumps Status", "Loading Operations"],
      },
      {
        number: "02",
        title: "Depot Monitoring",
        bullets: ["Tank Levels", "Inward/Outward Fuel", "Pumps Status", "Fuel Quality", "Stock Reconciliation"],
      },
      {
        number: "03",
        title: "Tank Truck / Logistics Monitoring",
        bullets: ["Truck GPS Tracking", "Fuel Quantity", "Delivery Status", "ETA", "Route Optimization"],
      },
      {
        number: "04",
        title: "Fuel Station Monitoring",
        bullets: ["Tank Levels", "Sales", "Availability", "Station Performance", "Sales Tracking"],
      },
      {
        number: "05",
        title: "Fuel Dispenser Monitoring",
        bullets: ["Nozzle Sales", "Dispenser Health", "Remote Diagnostics", "Vehicle Counts", "Vehicle Density"],
      },
    ],
  },
  {
    id: "steel",
    label: "Steel",
    tagline: "Steel & Metals",
    description: "Integrated Steel Plant Operations Platform",
    icon: <Factory className="h-5 w-5" />,
    color: "text-slate-300",
    accentHex: "#94a3b8",
    items: [
      {
        number: "01",
        title: "Blast Furnace Monitoring",
        bullets: ["Hot Metal Temperature", "Pressure Profiles", "Tapping Schedules", "Burden Distribution", "Energy Efficiency"],
      },
      {
        number: "02",
        title: "Steel Melt Shop",
        bullets: ["Heat Tracking", "Alloy Additions", "Ladle Temperature", "Casting Speed", "Quality Grading"],
      },
      {
        number: "03",
        title: "Rolling Mill Automation",
        bullets: ["Roll Gap Control", "Strip Thickness", "Cooling Water Flow", "Speed Synchronization", "Coil Tracking"],
      },
      {
        number: "04",
        title: "Utilities & Energy",
        bullets: ["Power Distribution", "Compressed Air", "Water Treatment", "Gas Recovery", "Steam Balancing"],
      },
      {
        number: "05",
        title: "Quality & Compliance",
        bullets: ["Lab Integration", "Mechanical Testing", "SPC Charts", "Traceability", "Regulatory Reporting"],
      },
    ],
  },
  {
    id: "manufacturing",
    label: "Manufacturing",
    tagline: "Discrete & Process Industries",
    description: "Smart Factory Intelligence Platform",
    icon: <Activity className="h-5 w-5" />,
    color: "text-purple-400",
    accentHex: "#c084fc",
    items: [
      {
        number: "01",
        title: "OEE & Production Tracking",
        bullets: ["Machine Availability", "Performance Rate", "Quality Rate", "Shift Reports", "Downtime Classification"],
      },
      {
        number: "02",
        title: "Predictive Maintenance",
        bullets: ["Vibration Analysis", "Bearing Wear Detection", "Oil Condition", "Thermal Imaging Integration", "Work Order Triggers"],
      },
      {
        number: "03",
        title: "Quality Management",
        bullets: ["SPC / SQC Charts", "Defect Tracking", "Root Cause Analysis", "First Pass Yield", "Customer Returns"],
      },
      {
        number: "04",
        title: "Supply Chain Visibility",
        bullets: ["Inventory Levels", "Material Flow", "WIP Tracking", "Supplier Performance", "Batch Traceability"],
      },
      {
        number: "05",
        title: "Energy Management",
        bullets: ["Per-machine Consumption", "Peak Demand Control", "Carbon Footprint", "ISO 50001 Reports", "Cost Allocation"],
      },
    ],
  },
  {
    id: "wind",
    label: "Wind",
    tagline: "Wind Energy",
    description: "Wind Farm SCADA & Performance Platform",
    icon: <Wind className="h-5 w-5" />,
    color: "text-cyan-400",
    accentHex: "#22d3ee",
    items: [
      {
        number: "01",
        title: "Turbine Performance Monitoring",
        bullets: ["Power Curve Analysis", "Rotor Speed", "Pitch Angle Control", "Nacelle Direction", "Availability Factor"],
      },
      {
        number: "02",
        title: "Condition Monitoring",
        bullets: ["Gearbox Vibration", "Generator Temperature", "Blade Structural Health", "Tower Oscillation", "Bearing Diagnostics"],
      },
      {
        number: "03",
        title: "SCADA & Control",
        bullets: ["Remote Start/Stop", "Fault Management", "Curtailment Control", "Park Controller", "Grid Compliance"],
      },
      {
        number: "04",
        title: "Generation & Revenue",
        bullets: ["Energy Production (MWh)", "Capacity Utilization Factor", "PLF Tracking", "Revenue Forecasting", "PPA Compliance"],
      },
      {
        number: "05",
        title: "Maintenance Planning",
        bullets: ["Scheduled Maintenance", "Crane Scheduling", "Spare Parts Inventory", "Technician Dispatch", "Safety Compliance"],
      },
    ],
  },
  {
    id: "solar",
    label: "Solar",
    tagline: "Solar Energy",
    description: "Solar Asset Management & Analytics Platform",
    icon: <Sun className="h-5 w-5" />,
    color: "text-yellow-400",
    accentHex: "#facc15",
    items: [
      {
        number: "01",
        title: "Plant Performance Monitoring",
        bullets: ["Irradiance vs Generation", "PR Ratio", "CUF Tracking", "Inverter Efficiency", "String-level Analysis"],
      },
      {
        number: "02",
        title: "Inverter & Combiner Box",
        bullets: ["Real-time Fault Alerts", "MPPT Performance", "String Current Imbalance", "Temperature Monitoring", "Remote Reset"],
      },
      {
        number: "03",
        title: "Weather & Forecasting",
        bullets: ["GHI / DNI / DHI Sensors", "Soiling Loss Estimation", "Weather Forecasting Integration", "Shadow Analysis", "Cleaning Schedule"],
      },
      {
        number: "04",
        title: "Grid Integration",
        bullets: ["Export / Import Monitoring", "Power Quality", "Reactive Power Control", "Grid Fault Events", "SLDC Reporting"],
      },
      {
        number: "05",
        title: "O&M & Revenue",
        bullets: ["Ticket Management", "Preventive Maintenance", "Energy Generation Reports", "Revenue Tracking", "Carbon Credits"],
      },
    ],
  },
  {
    id: "renewable",
    label: "Renewable",
    tagline: "Hybrid & Multi-Source",
    description: "Unified Renewable Energy Command Platform",
    icon: <Leaf className="h-5 w-5" />,
    color: "text-green-400",
    accentHex: "#4ade80",
    items: [
      {
        number: "01",
        title: "Hybrid Plant Management",
        bullets: ["Solar + Wind + Storage", "Source Switching Logic", "Combined Generation View", "Grid-Tied / Off-Grid Modes", "Dispatch Optimization"],
      },
      {
        number: "02",
        title: "Battery Energy Storage",
        bullets: ["State of Charge (SoC)", "Cycle Count Tracking", "Charge / Discharge Curves", "Thermal Management", "BMS Integration"],
      },
      {
        number: "03",
        title: "Power Forecasting & Trading",
        bullets: ["Day-Ahead Forecast", "Intra-day Balancing", "Market Price Integration", "Curtailment Scheduling", "Penalty Avoidance"],
      },
      {
        number: "04",
        title: "Multi-site Portfolio",
        bullets: ["Consolidated Dashboard", "Cross-site Benchmarking", "Normalized KPIs", "Executive Reports", "Investor Portals"],
      },
      {
        number: "05",
        title: "Sustainability & ESG",
        bullets: ["Carbon Emission Tracking", "Green Certificates", "ESG Reporting", "Scope 2 Reduction", "Net Zero Roadmap"],
      },
    ],
  },
];

// capability cards (retained from original section 2)
const CAPABILITIES = [
  {
    id: "predictive-maintenance",
    title: "Predictive Maintenance",
    desc: "Ingest high-frequency vibration and acoustic data. Run local ML inference at the edge to detect mechanical anomalies before critical failures occur.",
    icon: <Activity className="h-6 w-6" />,
    color: "text-orange-500",
    glow: "rgba(255, 126, 26, 0.5)",
  },
  {
    id: "digital-twins",
    title: "Real-time Digital Twins",
    desc: "Synchronize physical asset states with virtual 3D models in sub-10ms. Enable remote operators to monitor and control factories from anywhere.",
    icon: <Layers className="h-6 w-6" />,
    color: "text-blue-400",
    glow: "rgba(96, 165, 250, 0.5)",
  },
  {
    id: "unified-namespace",
    title: "Unified OT/IT Namespace",
    desc: "Bridge operational technology (Modbus, OPC-UA) with enterprise IT (Kafka, Cloud) using a centralized, event-driven MQTT broker architecture.",
    icon: <Network className="h-6 w-6" />,
    color: "text-[var(--data-green)]",
    glow: "rgba(74, 222, 128, 0.5)",
  },
  {
    id: "automated-compliance",
    title: "Immutable Historian",
    desc: "Guarantee zero data loss with edge buffering. Automatically log environmental and safety telemetry to immutable storage for strict regulatory audits.",
    icon: <ShieldCheck className="h-6 w-6" />,
    color: "text-purple-400",
    glow: "rgba(192, 132, 252, 0.5)",
  },
];

// ─────────────────────────────────────────────
// Sub-components
// ─────────────────────────────────────────────

/** Single numbered solution row — mirrors the reference image layout */
function SolutionRow({ item, accent, index }: { item: SolutionItem; accent: string; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 24 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.45, delay: index * 0.07 }}
      className="flex items-start gap-5 group"
    >
      {/* Icon circle — uses accent color */}
      <div
        className="shrink-0 w-12 h-12 rounded-full flex items-center justify-center border"
        style={{
          borderColor: `${accent}40`,
          backgroundColor: `${accent}15`,
          boxShadow: `0 0 18px ${accent}20`,
        }}
      >
        <span className="font-mono text-xs font-bold" style={{ color: accent }}>
          {item.number}
        </span>
      </div>

      {/* Content */}
      <div className="flex-1 pb-6 border-b border-white/5 group-last:border-0">
        <h4 className="text-[var(--text-primary)] font-semibold text-base mb-2 leading-tight">
          {item.title}
        </h4>
        <p className="text-[var(--text-muted)] text-sm leading-relaxed">
          {item.bullets.join(" • ")}
        </p>
      </div>
    </motion.div>
  );
}

/** Left panel — big circle with title */
function IndustryHeroPanel({ solution }: { solution: IndustrySolution }) {
  return (
    <motion.div
      key={solution.id + "-panel"}
      initial={{ opacity: 0, scale: 0.93 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.93 }}
      transition={{ duration: 0.4 }}
      className="flex flex-col items-center justify-center text-center h-full min-h-[320px]"
    >
      {/* big decorative circle */}
      <div
        className="relative flex items-center justify-center rounded-full mb-8"
        style={{
          width: 260,
          height: 260,
          background: `radial-gradient(circle at 40% 40%, ${solution.accentHex}18, transparent 70%)`,
          border: `1.5px solid ${solution.accentHex}30`,
          boxShadow: `0 0 60px ${solution.accentHex}18, inset 0 0 40px ${solution.accentHex}08`,
        }}
      >
        {/* inner ring */}
        <div
          className="absolute inset-[24px] rounded-full"
          style={{ border: `1px solid ${solution.accentHex}18` }}
        />
        <div className="z-10 flex flex-col items-center gap-2 px-8">
          <span className="font-bold text-3xl text-[var(--text-primary)] leading-none">
            Solution for
          </span>
          <span
            className="font-bold text-3xl leading-none"
            style={{ color: solution.accentHex }}
          >
            {solution.label} Business
          </span>
          <div
            className="mt-4 w-10 h-px"
            style={{ backgroundColor: solution.accentHex }}
          />
          <p className="text-[var(--text-secondary)] text-sm mt-3 leading-snug max-w-[180px]">
            {solution.description}
          </p>
        </div>
      </div>
    </motion.div>
  );
}

// ─────────────────────────────────────────────
// Industry selector tab
// ─────────────────────────────────────────────
function IndustryTab({
  solution,
  active,
  onClick,
}: {
  solution: IndustrySolution;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={`
        flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium
        border transition-all duration-200 whitespace-nowrap
        ${active
          ? "border-transparent text-white"
          : "border-white/10 text-[var(--text-muted)] hover:text-[var(--text-primary)] hover:border-white/20 bg-transparent"
        }
      `}
      style={
        active
          ? {
              backgroundColor: solution.accentHex,
              boxShadow: `0 0 20px ${solution.accentHex}50`,
            }
          : {}
      }
    >
      <span className={active ? "text-white" : solution.color}>{solution.icon}</span>
      {solution.label}
    </button>
  );
}

// ─────────────────────────────────────────────
// Main page
// ─────────────────────────────────────────────
const Solutions = () => {
  const cardTilt = useMagneticTilt({ maxRotate: 5, perspective: 1000 });
  const [activeId, setActiveId] = useState<string>("cgd");

  const active = INDUSTRY_SOLUTIONS.find((s) => s.id === activeId)!;

  return (
    <div className="min-h-screen bg-[var(--bg-void)] pt-24 pb-20 text-[var(--text-primary)] overflow-hidden">

      {/* ── Decorative glows ── */}
      <div className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-screen overflow-hidden">
        <div className="absolute right-[-10%] top-[10%] h-[500px] w-[500px] rounded-full bg-orange-500/10 blur-[150px]" />
        <div className="absolute left-[-10%] top-[30%] h-[400px] w-[400px] rounded-full bg-blue-500/10 blur-[150px]" />
      </div>

      <div className="mx-auto max-w-7xl px-6 lg:px-8">

        {/* ══════════════════════════════════════
            SECTION 1 — HERO
        ══════════════════════════════════════ */}
        <div className="text-center mb-20 mt-10">
          <Badge
            variant="secondary"
            className="border-black/[0.08] bg-[var(--bg-surface)] shadow-sm mb-8"
          >
            <div className="flex h-4 w-4 items-center justify-center rounded-full bg-[var(--data-green)]">
              <span className="h-1.5 w-1.5 rounded-full bg-white animate-pulse" />
            </div>
            <span className="font-mono text-sm text-[var(--text-primary)]">
              <InViewDecryptedText
                text="ENTERPRISE USE CASES"
                speed={40}
                className="text-[var(--text-primary)]"
                encryptedClassName="text-[var(--text-muted)]"
              />
            </span>
          </Badge>

          <CharReveal
            as="h1"
            lines={["THE REALTIME IMPERATIVE"]}
            className="text-4xl font-bold tracking-tight sm:text-6xl uppercase"
            immediate
            delay={0}
            stagger={0.03}
            lineGap="mt-2"
          />

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="mx-auto mt-8 max-w-3xl text-lg text-[var(--text-secondary)] leading-relaxed"
          >
            From smart factories to national energy grids, Altrex provides the unyielding
            infrastructure required to capture, route, and analyze industrial events instantly.
          </motion.p>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="mx-auto mt-12 max-w-4xl"
          >
            <SystemDataTicker
              items={[
                "SYS_ROUTING: DISTRIBUTED",
                "THROUGHPUT: 18.2 GB/S",
                "AVG_LATENCY: 4.2ms",
                "PACKET_LOSS: 0.0000001%",
                "ENCRYPTION: mTLS ACTIVE",
              ]}
            />
          </motion.div>
        </div>

        {/* ══════════════════════════════════════
            SECTION 2 — INDUSTRY SOLUTIONS
            Reference-image layout:
            Left: big circle with title
            Right: numbered rows with bullets
        ══════════════════════════════════════ */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7 }}
          className="mb-32"
        >
          {/* section header */}
          <div className="text-center mb-12">
            <span className="font-mono text-xs text-[var(--text-muted)] uppercase tracking-widest">
              [ INDUSTRY SOLUTIONS ]
            </span>
            <h2 className="text-3xl font-bold uppercase tracking-tight text-[var(--text-primary)] mt-2">
              Built for Your Industry
            </h2>
          </div>

          {/* Industry selector tabs */}
          <div className="flex flex-wrap justify-center gap-2 mb-12">
            {INDUSTRY_SOLUTIONS.map((sol) => (
              <IndustryTab
                key={sol.id}
                solution={sol}
                active={activeId === sol.id}
                onClick={() => setActiveId(sol.id)}
              />
            ))}
          </div>

          {/* Content panel */}
          <div
            className="rounded-2xl border border-white/[0.07] bg-[var(--bg-surface)]/40 backdrop-blur-sm overflow-hidden"
            style={{ boxShadow: `0 0 60px ${active.accentHex}10` }}
          >
            {/* top accent line */}
            <div
              className="h-[2px] w-full"
              style={{
                background: `linear-gradient(90deg, transparent, ${active.accentHex}, transparent)`,
              }}
            />

            <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.6fr] gap-0">

              {/* LEFT — hero panel */}
              <div
                className="flex items-center justify-center p-10 border-b lg:border-b-0 lg:border-r"
                style={{ borderColor: `${active.accentHex}18` }}
              >
                <AnimatePresence mode="wait">
                  <IndustryHeroPanel key={active.id} solution={active} />
                </AnimatePresence>
              </div>

              {/* RIGHT — solution rows */}
              <div className="p-8 sm:p-10">
                {/* sub-heading */}
                <AnimatePresence mode="wait">
                  <motion.div
                    key={active.id + "-heading"}
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.3 }}
                    className="mb-8"
                  >
                    <span
                      className="font-mono text-xs uppercase tracking-widest"
                      style={{ color: active.accentHex }}
                    >
                      {active.tagline}
                    </span>
                    <h3 className="text-xl font-bold text-[var(--text-primary)] mt-1">
                      {active.description}
                    </h3>
                  </motion.div>
                </AnimatePresence>

                {/* numbered items */}
                <AnimatePresence mode="wait">
                  <motion.div
                    key={active.id + "-rows"}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.25 }}
                    className="flex flex-col gap-1"
                  >
                    {active.items.map((item, i) => (
                      <SolutionRow
                        key={item.number}
                        item={item}
                        accent={active.accentHex}
                        index={i}
                      />
                    ))}
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          </div>
        </motion.div>

        {/* ══════════════════════════════════════
            SECTION 3 — CORE CAPABILITIES MATRIX
            (retained from original)
        ══════════════════════════════════════ */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7 }}
          className="mb-32"
        >
          <div className="text-center mb-16">
            <span className="font-mono text-xs text-[var(--text-muted)] uppercase tracking-widest">
              [ CAPABILITY MATRIX ]
            </span>
            <h2 className="text-3xl font-bold uppercase tracking-tight text-[var(--text-primary)] mt-2">
              Transformative Solutions
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {CAPABILITIES.map((solution, i) => (
              <motion.div
                key={solution.id}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
              >
                <StarBorder
                  as="div"
                  color={solution.glow}
                  speed="5s"
                  thickness={1.5}
                  className="w-full h-full"
                  innerClassName="h-full rounded-[20px] bg-[var(--bg-surface)]/40 border border-white/5 backdrop-blur-md p-8 sm:p-10 transition-all hover:bg-[var(--bg-surface)] hover:border-white/10"
                >
                  <div
                    onMouseMove={cardTilt.onMouseMove}
                    onMouseLeave={cardTilt.onMouseLeave}
                    style={{ transformStyle: "preserve-3d" }}
                    className="flex flex-col h-full"
                  >
                    <div className="flex items-center gap-4 mb-6">
                      <div
                        className={`p-4 rounded-2xl bg-zinc-900 shadow-inner border border-white/5 ${solution.color}`}
                      >
                        {solution.icon}
                      </div>
                      <h3 className="text-2xl font-bold uppercase tracking-tight leading-none text-[var(--text-primary)]">
                        {solution.title}
                      </h3>
                    </div>
                    <p className="text-[var(--text-secondary)] text-sm sm:text-base leading-relaxed flex-1">
                      {solution.desc}
                    </p>
                    <div className="mt-8 pt-6 border-t border-white/5 flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-[var(--text-muted)] group cursor-pointer hover:text-orange-500 transition-colors">
                      <span>Explore Reference Architecture</span>
                      <ChevronRight className="h-3 w-3 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </StarBorder>
              </motion.div>
            ))}
          </div>
        </motion.div>

      </div>
    </div>
  );
};

export default Solutions;