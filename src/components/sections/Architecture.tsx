import { useEffect, useRef, memo } from "react";
import { motion, useInView, useScroll, useTransform, type Variants } from "framer-motion";
import {
  ReactFlow,
  Background,
  BackgroundVariant,
  useNodesState,
  useEdgesState,
  Position,
  Handle,
  BaseEdge,
  getSmoothStepPath,
  type Node,
  type Edge,
  type NodeProps,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import {
  BriefcaseBusiness,
  Building2,
  Car,
  Cloud,
  Cpu,
  Database,
  Factory,
  FlaskConical,
  Globe,
  HeartPulse,
  Layers3,
  Monitor,
  Network,
  Radio,
  Server,
  ShieldCheck,
  Users,
  Wifi,
  Zap,
} from "lucide-react";
import { Badge } from "../ui/badge";
import { gsap } from "gsap";
import { useTheme } from "@/hooks/useTheme";
import darklogo from "@/assets/altrex-logo-bg-black-removebg-blackbg.png";
import lightlogo from "@/assets/altrex-logo-bg-white-removebg-whitebg.png";

/* ─── Color Tokens ───────────────────────────────────────────────────────── */

const C = {
  source: "#10b981",       // Industries
  device: "#3b82f6",       // Devices
  connectivity: "#d946ef", // Connectivity
  platform: "#ff6b00",     // Altrex Brand
  cloud: "#06b6d4",        // Hosting
  system: "#6366f1",       // SAP/ERP/CRM
  edge: "#ff6b00",         // All Edges
} as const;

/* ─── Edge durations ─────────────────────────────────────────────────────── */

const EDGE_DURATIONS: Record<string, number> = {
  "ind-dev-0": 4.2,
  "ind-dev-1": 5.0,
  "ind-dev-2": 4.6,
  "ind-dev-3": 5.4,
  "ind-dev-4": 4.8,
  "ind-dev-5": 5.2,
  "ind-dev-6": 4.4,
  "dev-con": 4.5,
  "con-plat": 5.1,
  "plat-host-1": 4.7,
  "plat-host-2": 5.3,
  "plat-sap": 4.9,
  "plat-erp": 5.5,
  "plat-crm": 4.3,
};

/* ─── Data ───────────────────────────────────────────────────────────────── */

const industries = [
  { icon: Factory, label: "Oil & Gas" },
  { icon: Building2, label: "Power & Energy" },
  { icon: Zap, label: "Renewables" },
  { icon: FlaskConical, label: "Manufacturing" },
  { icon: Car, label: "Transportation" },
  { icon: HeartPulse, label: "Healthcare" },
  { icon: Globe, label: "Smart Cities" },
];

const devices = [
  { icon: Cpu, label: "PLCs / RTUs" },
  { icon: Wifi, label: "Sensors / Rectifiers" },
  { icon: Monitor, label: "HMIs" },
  { icon: Layers3, label: "SCADA / DCS" },
];

const connectivity = [
  "MODBUS",
  "OPC UA / DA",
  "Ethernet",
  "ProfiNet",
  "Ethernet/IP",
  "MQTT",
  "REST API",
  "SQL / NoSQL DB",
];

const platform = [
  { icon: Globe, label: "Web-based SCADA" },
  { icon: Database, label: "Data Visualization" },
  { icon: ShieldCheck, label: "Alert & Notification" },
  { icon: Layers3, label: "Asset Management" },
  { icon: Network, label: "Reporting" },
  { icon: ShieldCheck, label: "Data Security" },
  { icon: Radio, label: "Data Analytics" },
  { icon: Cpu, label: "AI & ML" },
];

const hosting = [
  { icon: Server, label: "On-Premise Server" },
  { icon: Cloud, label: "Private / Public Cloud" },
];

/* ─── Motion Variants ────────────────────────────────────────────────────── */

const headerVariants: Variants = {
  hidden: { opacity: 0, y: 32 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6 },
  },
};

/* ─── Flow CSS ───────────────────────────────────────────────────────────── */

function useFlowStyles() {
  useEffect(() => {
    const STYLE_ID = "arch-flow-styles";
    if (document.getElementById(STYLE_ID)) return;
    const style = document.createElement("style");
    style.id = STYLE_ID;
    style.innerHTML = `
      .arch-flow .react-flow__node { cursor: grab; }
      .arch-flow .react-flow__node:active { cursor: grabbing; }
      .arch-flow .react-flow__attribution { display: none !important; }
      .arch-flow .react-flow__renderer { background: transparent !important; }
      .flow-active .beam-animated { animation-play-state: running; }
      .beam-animated { animation-play-state: paused; }
      @keyframes beam-flow {
        from { stroke-dashoffset: 120; }
        to { stroke-dashoffset: 0; }
      }
    `;
    document.head.appendChild(style);
  }, []);
}

/* ─── Animated Edge ──────────────────────────────────────────────────────── */

const AnimatedEdge = memo(function AnimatedEdge({
  id,
  sourceX,
  sourceY,
  targetX,
  targetY,
  sourcePosition,
  targetPosition,
}: any) {
  const color = C.edge;
  const duration = EDGE_DURATIONS[id] ?? 5;
  const [edgePath] = getSmoothStepPath({
    sourceX,
    sourceY,
    targetX,
    targetY,
    sourcePosition,
    targetPosition,
    borderRadius: 30,
  });

  return (
    <>
      <BaseEdge
        id={id}
        path={edgePath}
        style={{
          stroke: color,
          strokeWidth: 2,
          strokeOpacity: 0.2,
        }}
      />
      <path
        className="beam-animated"
        d={edgePath}
        fill="none"
        stroke={color}
        strokeWidth={3}
        strokeLinecap="round"
        style={{
          strokeDasharray: "8 12",
          strokeDashoffset: 120,
          animationName: "beam-flow",
          animationDuration: `${duration}s`,
          animationTimingFunction: "linear",
          animationIterationCount: "infinite",
          filter: `drop-shadow(0 0 8px ${color}bb)`,
        }}
      />
    </>
  );
});

/* ─── Item Node ──────────────────────────────────────────────────────────── */

function ItemNode({ data }: NodeProps<any>) {
  const Icon = data.icon;
  const color = (data.color as string) ?? C.platform;

  return (
    <div
      className="flex min-w-[155px] items-center gap-2.5 rounded-xl bg-[var(--bg-surface)] px-3 py-2.5 transition-all duration-200"
      style={{
        border: `1px solid ${color}40`,
        boxShadow: `0 0 0 1px ${color}10, 0 4px 16px rgba(0,0,0,0.06), 0 0 10px ${color}15`,
      }}
    >
      <div
        className="flex h-[30px] w-[30px] shrink-0 items-center justify-center rounded-lg"
        style={{
          background: `${color}15`,
          border: `1px solid ${color}30`,
        }}
      >
        {Icon && <Icon size={13} color={color} strokeWidth={1.8} />}
      </div>
      <div className="flex min-w-0 flex-col gap-[3px]">
        <span className="text-xs font-semibold leading-none text-[var(--text-primary)]">
          {data.label}
        </span>
        <span
          className="font-mono text-[7px] leading-none uppercase tracking-widest"
          style={{ color: `${color}80` }}
        >
          ◉ STATUS:ACTIVE
        </span>
      </div>
      <Handle type="target" position={Position.Left} style={{ opacity: 0 }} />
      <Handle type="source" position={Position.Right} style={{ opacity: 0 }} />
      <Handle type="target" position={Position.Top} style={{ opacity: 0 }} id="top" />
    </div>
  );
}

/* ─── Block Node ─────────────────────────────────────────────────────────── */

function BlockNode({ data }: NodeProps<any>) {
  const color = (data.color as string) ?? C.platform;

  return (
    <div
      className="rounded-[20px] bg-[var(--bg-surface)] p-[18px] shadow-sm"
      style={{
        width: data.width ?? 240,
        border: `1px solid ${color}30`,
        borderTop: `3px solid ${color}`,
        boxShadow: `0 4px 24px rgba(0,0,0,0.06), 0 0 0 1px ${color}10`,
      }}
    >
      <p
        className="mb-3.5 text-center text-[10px] font-bold uppercase tracking-widest"
        style={{ color }}
      >
        {data.title}
      </p>

      {data.variant === "connectivity" && (
        <div className="flex flex-col gap-[6px]">
          {(data.items as string[]).map((item, i) => (
            <div
              key={i}
              className="rounded-[9px] px-3 py-[6px] text-center text-[11px] font-semibold"
              style={{
                color,
                background: `${color}10`,
                border: `1px solid ${color}20`,
              }}
            >
              {item}
            </div>
          ))}
        </div>
      )}

      {data.variant === "platform" && (
        <div className={`grid gap-2 ${data.cols === 1 ? 'grid-cols-1' : 'grid-cols-2'}`}>
          {(data.items as { icon: any; label: string }[]).map((item, i) => {
            const Icon = item.icon;
            return (
              <div
                key={i}
                className="flex flex-col items-center gap-[6px] rounded-[12px] border border-black/[0.06] bg-black/5 px-2 py-2.5 shadow-sm"
              >
                <div
                  className="flex h-[28px] w-[28px] items-center justify-center rounded-lg"
                  style={{
                    background: `${color}15`,
                    border: `1px solid ${color}25`,
                  }}
                >
                  <Icon size={12} color={color} strokeWidth={1.8} />
                </div>
                <span className="text-center text-[9px] font-semibold leading-tight text-[var(--text-secondary)]">
                  {item.label}
                </span>
              </div>
            );
          })}
        </div>
      )}

      <Handle type="target" position={Position.Left} style={{ opacity: 0 }} />
      <Handle type="source" position={Position.Right} style={{ opacity: 0 }} />
      <Handle type="source" position={Position.Bottom} style={{ opacity: 0 }} id="bottom" />
    </div>
  );
}

/* ─── Platform Node (Octagon) ────────────────────────────────────────────── */

const PlatformNode = memo(({ data }: NodeProps<any>) => {
  const { theme } = useTheme();
  const logo = theme === "dark" ? darklogo : lightlogo;
  const color = C.platform;

  return (
    <div 
      className="relative flex items-center justify-center bg-[var(--bg-surface)]"
      style={{
        width: 400,
        height: 400,
        clipPath: "polygon(30% 0%, 70% 0%, 100% 30%, 100% 70%, 70% 100%, 30% 100%, 0% 70%, 0% 30%)",
        border: `2px solid ${color}`,
        boxShadow: `0 0 50px ${color}30`,
      }}
    >
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-10" style={{
        backgroundImage: `radial-gradient(${color} 1px, transparent 1px)`,
        backgroundSize: '20px 20px'
      }} />

      {/* Central Logo */}
      <div className="z-20 flex h-40 w-40 items-center justify-center rounded-full bg-[var(--bg-surface)] shadow-2xl" style={{ border: `1px solid ${color}30` }}>
        <img src={logo} alt="Altrex Logo" className="h-auto w-28 object-contain" />
      </div>

      {/* Rotating Items in a Circle */}
      {data.items.map((item: any, i: number) => {
        const angle = (i * 360) / data.items.length - 90;
        const radius = 145;
        const x = Math.cos((angle * Math.PI) / 180) * radius;
        const y = Math.sin((angle * Math.PI) / 180) * radius;
        const Icon = item.icon;

        return (
          <div
            key={i}
            className="absolute z-30 flex flex-col items-center gap-1.5"
            style={{
              transform: `translate(${x}px, ${y}px)`,
            }}
          >
            <div
              className="flex h-12 w-12 items-center justify-center rounded-full border bg-[var(--bg-surface)] shadow-lg transition-transform hover:scale-110"
              style={{
                borderColor: `${color}40`,
                boxShadow: `0 0 15px ${color}20`,
              }}
            >
              <Icon size={20} color={color} strokeWidth={2} />
            </div>
            <span className="max-w-[80px] text-center text-[9px] font-bold uppercase tracking-tight text-[var(--text-primary)]">
              {item.label}
            </span>
          </div>
        );
      })}

      <Handle type="target" position={Position.Left} style={{ opacity: 0 }} />
      <Handle type="source" position={Position.Right} style={{ opacity: 0 }} />
      <Handle type="source" position={Position.Bottom} style={{ opacity: 0 }} id="bottom" />
    </div>
  );
});

/* ─── Registries ─────────────────────────────────────────────────────────── */

const nodeTypes: any = {
  item: ItemNode,
  block: BlockNode,
  platform: PlatformNode,
};

const edgeTypes = {
  animated: AnimatedEdge,
};

/* ─── Nodes ──────────────────────────────────────────────────────────────── */

const NODES: Node[] = [
  ...industries.map((item, i) => ({
    id: `industry-${i}`,
    type: "item" as const,
    position: { x: 20, y: 90 + i * 88 },
    data: { ...item, color: C.source },
  })),

  {
    id: "devices",
    type: "block" as const,
    position: { x: 310, y: 220 },
    data: {
      title: "Devices",
      color: C.device,
      items: devices,
      width: 180,
      variant: "platform",
      cols: 1,
    },
  },

  {
    id: "connectivity",
    type: "block" as const,
    position: { x: 580, y: 202 },
    data: {
      title: "Connectivity",
      color: C.connectivity,
      items: connectivity,
      width: 220,
      variant: "connectivity",
    },
  },

  {
    id: "platform",
    type: "platform" as const,
    position: { x: 880, y: 120 },
    data: {
      color: C.platform,
      items: platform,
    },
  },

  ...hosting.map((item, i) => ({
    id: `hosting-${i}`,
    type: "item" as const,
    position: { x: 1362, y: 220 + i * 180 },
    data: { ...item, color: C.cloud },
  })),

  {
    id: "sap",
    type: "item" as const,
    position: { x: 840, y: 650 },
    data: { icon: BriefcaseBusiness, label: "SAP", color: C.system },
  },

  {
    id: "erp",
    type: "item" as const,
    position: { x: 1000, y: 650 },
    data: { icon: Database, label: "ERP", color: C.system },
  },

  {
    id: "crm",
    type: "item" as const,
    position: { x: 1160, y: 650 },
    data: { icon: Users, label: "CRM", color: C.system },
  },
]

/* ─── Edges ──────────────────────────────────────────────────────────────── */

const EDGES: Edge[] = [
  ...industries.map((_, i) => ({
    id: `ind-dev-${i}`,
    source: `industry-${i}`,
    target: "devices",
    type: "animated" as const,
  })),

  {
    id: "dev-con",
    source: "devices",
    target: "connectivity",
    type: "animated",
  },

  {
    id: "con-plat",
    source: "connectivity",
    target: "platform",
    type: "animated",
  },

  {
    id: "plat-host-1",
    source: "platform",
    target: "hosting-0",
    type: "animated",
  },

  {
    id: "plat-host-2",
    source: "platform",
    target: "hosting-1",
    type: "animated",
  },

  {
    id: "plat-sap",
    source: "platform",
    sourceHandle: "bottom",
    target: "sap",
    targetHandle: "top",
    type: "animated",
  },

  {
    id: "plat-erp",
    source: "platform",
    sourceHandle: "bottom",
    target: "erp",
    targetHandle: "top",
    type: "animated",
  },

  {
    id: "plat-crm",
    source: "platform",
    sourceHandle: "bottom",
    target: "crm",
    targetHandle: "top",
    type: "animated",
  },
];

/* ─── Live Pulse ─────────────────────────────────────────────────────────── */

function LivePulse() {
  return (
    <div className="pointer-events-none absolute bottom-4 left-4 z-10 flex flex-col gap-1.5 rounded-lg border border-black/[0.08] bg-[var(--bg-surface)]/95 px-3.5 py-2.5 shadow-lg backdrop-blur-sm">
      <div className="flex items-center gap-2">
        <span className="relative flex h-1.5 w-1.5">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
          <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-400" />
        </span>
        <span className="font-mono text-[9px] uppercase tracking-widest text-emerald-400">
          STREAM ACTIVE
        </span>
      </div>
      <div className="flex flex-col gap-[3px] border-t border-black/[0.06] pt-1.5">
        <span className="font-mono text-[8px] text-[var(--text-muted)]">
          <span className="text-emerald-500/50">▸</span> PKT/S{" "}
          <span className="text-[var(--text-secondary)]">4.2k</span>
        </span>
        <span className="font-mono text-[8px] text-[var(--text-muted)]">
          <span className="text-emerald-500/50">▸</span> LATENCY{" "}
          <span className="text-[var(--text-secondary)]">2ms</span>
        </span>
      </div>
    </div>
  );
}

/* ─── Component ──────────────────────────────────────────────────────────── */

const Architecture = () => {
  useFlowStyles();
  const [flowNodes, , onNodesChange] = useNodesState(NODES);
  const [flowEdges, , onEdgesChange] = useEdgesState(EDGES);
  const sectionRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLDivElement>(null);

  const isInView = useInView(sectionRef, {
    once: true,
    margin: "-100px",
  });

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "15%"]);
  const cardY = useTransform(scrollYProgress, [0, 1], ["0%", "-8%"]);
  const labelY = useTransform(scrollYProgress, [0, 1], ["0%", "-20%"]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        canvas.classList.toggle("flow-active", entry.isIntersecting);
      },
      { threshold: 0.05 }
    );
    observer.observe(canvas);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        const grid = document.getElementById('bg-grid-overlay');
        if (!grid) return;
        if (entry.isIntersecting) {
          gsap.to(grid, { opacity: 0.8, duration: 0.8, ease: 'power2.out' });
        } else {
          gsap.to(grid, { opacity: 0.3, duration: 0.6, ease: 'power2.out' });
        }
      },
      { threshold: 0.2 }
    );
    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="relative overflow-hidden bg-transparent py-28">
      <motion.div style={{ y: bgY }} className="pointer-events-none absolute inset-0 -z-10 opacity-60">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: "radial-gradient(circle, var(--border-subtle) 1px, transparent 1px)",
            backgroundSize: "32px 32px",
          }}
        />
      </motion.div>

      <div className="mx-auto max-w-[1650px] px-6">
        <motion.div
          className="mx-auto max-w-3xl text-center"
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={headerVariants}
        >
          <motion.div whileHover={{ scale: 1.03 }} className="inline-block">
            <Badge
              variant="secondary"
              className="border border-[var(--accent-violet)]/20 bg-[var(--accent-violet)]/10 p-4 text-sm font-medium text-[var(--accent-violet)]"
            >
              Realtime Architecture
            </Badge>
          </motion.div>

          <h2 className="mt-6 text-4xl font-bold uppercase tracking-tighter text-[var(--text-primary)] sm:text-5xl">
            BUILT FOR DISTRIBUTED{" "}
            <span className="text-[var(--accent-violet)]">GLOBAL INFRASTRUCTURE</span>
          </h2>

          <p className="mt-4 text-lg leading-8 text-[var(--text-secondary)]">
            From industrial devices to cloud — every layer connected, secured, and orchestrated in realtime.
          </p>
        </motion.div>

        <motion.div
          ref={canvasRef}
          className="relative mt-16 overflow-hidden rounded-xl bg-[var(--bg-surface)]"
          style={{
            y: cardY,
            height: 883,
            border: '1px solid var(--border-subtle)',
            boxShadow: '0 0 0 1px rgba(0,0,0,0.04), 0 8px 60px rgba(0,0,0,0.06), 0 0 50px var(--accent-glow)',
          }}
        >
          <motion.div style={{ y: labelY }} className="pointer-events-none absolute left-6 top-6 z-20 hidden lg:block">
            <div className="rounded-2xl border border-black/[0.08] bg-[var(--bg-surface)]/75 px-4 py-3 font-mono text-[10px] tracking-widest text-[var(--text-secondary)] backdrop-blur-sm">
              [STACK: LAYERED]
            </div>
          </motion.div>

          <motion.div style={{ y: labelY }} className="pointer-events-none absolute right-6 top-6 z-20 hidden lg:block">
            <div className="rounded-2xl border border-black/[0.08] bg-[var(--bg-surface)]/75 px-4 py-3 font-mono text-[10px] tracking-widest text-[var(--text-secondary)] backdrop-blur-sm">
              [PARALLAX: ON]
            </div>
          </motion.div>

          <div className="border-b border-black/[0.06] bg-[var(--bg-void)]">
            <div className="flex items-center justify-between px-5 py-2">
              <div className="flex items-center gap-3">
                <div className="flex gap-1.5">
                  <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
                  <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" />
                  <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
                </div>
                <div className="h-3 w-px bg-black/[0.08]" />
                <span className="font-mono text-[10px] text-[var(--text-muted)]">
                  altrex@arch:~${" "}
                  <span className="text-[var(--accent-violet)]">./run_topology</span>
                  {" "}--env=prod --realtime
                </span>
              </div>
              <div className="flex items-center gap-4">
                <span className="font-mono text-[9px] text-[var(--text-muted)]">
                  NODES <span className="text-[var(--accent-violet)]">14</span>
                </span>
                <span className="font-mono text-[9px] text-[var(--text-muted)]">
                  EDGES <span className="text-[var(--accent-fuchsia)]">11</span>
                </span>
                <div className="h-3 w-px bg-black/[0.08]" />
                <div className="flex items-center gap-1.5">
                  <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[var(--data-green)]" />
                  <span className="font-mono text-[9px] tracking-widest text-[var(--data-green)] uppercase">
                    LIVE
                  </span>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-5 border-t border-black/[0.06] bg-black/[0.02] px-5 py-[5px]">
              <span className="font-mono text-[8px] text-[var(--text-muted)]">
                <span className="text-[var(--accent-violet)]">▶</span> TOPOLOGY_ACTIVE
              </span>
              <span className="font-mono text-[8px] text-[var(--text-muted)]">
                PROTO: <span className="text-[var(--data-green)]">MQTT · OPC-UA · REST</span>
              </span>
              <span className="font-mono text-[8px] text-[var(--text-muted)]">
                SEC: <span className="text-[var(--data-green)]">TLS 1.3</span>
              </span>
              <span className="font-mono text-[8px] text-[var(--text-muted)]">
                UPTIME: <span className="text-[var(--text-secondary)]">99.97%</span>
              </span>
            </div>
          </div>

          <div className="pointer-events-none absolute inset-x-0 top-[63px] z-10 h-px bg-gradient-to-r from-transparent via-[var(--accent-violet)]/40 to-transparent" />

          <div
            className="pointer-events-none absolute inset-0 z-[5]"
            style={{
              background: 'repeating-linear-gradient(0deg, transparent, transparent 3px, rgba(0,0,0,0.04) 3px, rgba(0,0,0,0.04) 4px)',
            }}
          />

          <LivePulse />

          <ReactFlow
            className="arch-flow"
            nodes={flowNodes}
            edges={flowEdges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            nodeTypes={nodeTypes}
            edgeTypes={edgeTypes}
            zoomOnScroll={false}
            zoomOnPinch={false}
            zoomOnDoubleClick={false}
            panOnDrag={false}
            panOnScroll={false}
            preventScrolling={true}
            minZoom={1}
            maxZoom={1}
            defaultViewport={{ x: 0, y: 0, zoom: 1 }}
            nodesDraggable
            nodesConnectable={false}
            elementsSelectable={false}
            proOptions={{ hideAttribution: true }}
          >
            <Background variant={BackgroundVariant.Dots} gap={28} size={1.2} color="var(--border-subtle)" />
          </ReactFlow>

          <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-px bg-gradient-to-r from-transparent via-[var(--accent-violet)]/30 to-transparent" />
        </motion.div>
      </div>
    </section>
  );
};

export default Architecture;
