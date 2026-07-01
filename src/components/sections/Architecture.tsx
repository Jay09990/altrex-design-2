import { useEffect, useRef, memo, useState } from "react";
import {
  motion,
  useInView,
  useScroll,
  useTransform,
  type Variants,
} from "framer-motion";
import {
  ReactFlow,
  useNodesState,
  useEdgesState,
  Position,
  Handle,
  BaseEdge,
  type Node,
  type Edge,
  type NodeProps,
  type EdgeProps,
  getBezierPath,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import {
  BriefcaseBusiness,
  Cloud,
  Cpu,
  Database,
  Globe,
  Layers3,
  Monitor,
  Network,
  Radio,
  Server,
  ShieldCheck,
  Users,
  Wifi,
  Plug,
  Settings,
  Activity,
  Cable,
  Code,
  ArrowDown,
  Zap,
  Bot,
  Gauge,
  HardDrive,
} from "lucide-react";
import { SectionBadge } from "../ui/section-badge";
import { gsap } from "gsap";
import { useTheme } from "@/hooks/useTheme";
import lightlogo from "@/assets/W!Platform Logo.png";
import darklogo from "@/assets/W!Platform-Logo-dark.png";

const fadeUpVariants: Variants = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.65 } },
};

// ─────────────────────────────────────────────────────────────────────────────
// Colour palette
// ─────────────────────────────────────────────────────────────────────────────
const C = {
  device: "#00336c", // blue  — Devices circle
  connectivity: "#d946ef", // fuchsia — fallback
  platform: "#ff6b01", // orange — Platform circle
  cloud: "#06b6d4", // cyan
  system: "#6366f1", // indigo
  edge: "#ff6b01",
} as const;

// Per-protocol accent colours
const CON_COLORS: Record<string, string> = {
  MQTT: "#ec4899",
  "OPC-UA": "#8b5cf6",
  MODBUS: "#f59e0b",
  ETHERNET: "#06b6d4",
  PROFINET: "#10b981",
  "ETH/IP": "#3b82f6",
  "REST API": "#f97316",
  "SQL/NOSQL": "#6366f1",
};

// ─────────────────────────────────────────────────────────────────────────────
// Edge animation durations
// ─────────────────────────────────────────────────────────────────────────────
const EDGE_DURATIONS: Record<string, number> = {
  "plat-host": 4.7,
  "plat-serv": 5.5,
};

// ─────────────────────────────────────────────────────────────────────────────
// Data
// ─────────────────────────────────────────────────────────────────────────────

// 8 devices arranged evenly inside the Devices circle
const devices = [
  { icon: Cpu, label: "PLCs" },
  { icon: HardDrive, label: "RTUs" },
  { icon: Wifi, label: "Sensors" },
  { icon: Zap, label: "Rectifiers" },
  { icon: Monitor, label: "HMIs" },
  { icon: Gauge, label: "SCADA" },
  { icon: Layers3, label: "DCS" },
  { icon: Bot, label: "IoT" },
];

const connectivity = [
  { icon: Radio, label: "MQTT" },
  { icon: Settings, label: "OPC-UA" },
  { icon: Plug, label: "MODBUS" },
  { icon: Network, label: "ETHERNET" },
  { icon: Activity, label: "PROFINET" },
  { icon: Cable, label: "ETH/IP" },
  { icon: Code, label: "REST API" },
  { icon: Database, label: "SQL/NOSQL" },
];

const platform = [
  { icon: Globe, label: "Web SCADA" },
  { icon: Database, label: "Visualization" },
  { icon: ShieldCheck, label: "Alerting" },
  { icon: Layers3, label: "Assets" },
  { icon: Network, label: "Reporting" },
  { icon: ShieldCheck, label: "Security" },
  { icon: Radio, label: "Analytics" },
  { icon: Cpu, label: "AI & ML" },
];

const hosting = [
  { icon: Server, label: "On-Premise Server", color: C.device },
  { icon: Cloud, label: "Private Cloud", color: C.cloud },
  { icon: Cloud, label: "Public Cloud", color: C.platform },
];

const services = [
  { icon: BriefcaseBusiness, label: "SAP", color: C.platform },
  { icon: Database, label: "ERP", color: C.cloud },
  { icon: Users, label: "CRM", color: "#10b981" },
];

// ─────────────────────────────────────────────────────────────────────────────
// DevicesCircleNode — styled identically to PlatformNode, blue theme
// 8 items arranged evenly on an inner ring; center shows "DEVICES" label
// ─────────────────────────────────────────────────────────────────────────────
const DEV_CIRCLE_SIZE = 360;
const DEV_CIRCLE_HALF = DEV_CIRCLE_SIZE / 2;
const DEV_RING_R = 125;

function DevicesCircleNode({ data }: NodeProps<any>) {
  const devItems = data.devices as typeof devices;
  const center = DEV_CIRCLE_HALF;

  return (
    <div
      className="relative flex items-center justify-center rounded-full"
      style={{
        width: DEV_CIRCLE_SIZE,
        height: DEV_CIRCLE_SIZE,
        background: `${C.device}07`,
        border: `1.5px solid ${C.device}`,
        boxShadow: `0 0 48px ${C.device}14`,
        cursor: "grab",
      }}
    >
      {/* Inner ring backing */}
      <div
        className="absolute rounded-full bg-card"
        style={{ width: 150, height: 150, border: `1.5px solid ${C.device}` }}
      />

      {/* Centre label */}
      <div
        className="absolute z-10 flex flex-col items-center justify-center select-none"
        style={{ pointerEvents: "none" }}
      >
        <span
          className="font-black uppercase tracking-widest text-foreground"
          style={{ fontSize: "11px", letterSpacing: "0.18em" }}
        >
          DEVICES
        </span>
        <span
          className="mt-[3px] font-semibold uppercase tracking-wider"
          style={{ fontSize: "8px", color: `${C.device}99` }}
        >
          LAYER
        </span>
      </div>

      {/* 8 device items on ring */}
      {devItems.map((item, i) => {
        const angle = (i / devItems.length) * Math.PI * 2;
        const x = center + Math.cos(angle) * DEV_RING_R;
        const y = center + Math.sin(angle) * DEV_RING_R;
        const Icon = item.icon;
        return (
          <div
            key={i}
            className="absolute z-20 flex flex-col items-center gap-[5px]"
            style={{ left: x, top: y, transform: "translate(-50%, -50%)" }}
          >
            <div
              className="flex h-11 w-11 items-center justify-center rounded-xl bg-card border shadow-md"
              style={{
                boxShadow: `0 2px 10px ${C.device}25, 0 0 0 1px ${C.device}12`,
              }}
            >
              <Icon size={20} color={C.device} strokeWidth={2} />
            </div>
            <span className="whitespace-nowrap rounded border bg-card/90 px-1 py-[3px] text-[10px] font-bold uppercase tracking-tighter text-muted-foreground">
              {item.label}
            </span>
          </div>
        );
      })}

      {/* Handles — right side only, devices is the leftmost node */}
      <Handle
        type="source"
        position={Position.Right}
        id="right"
        style={{ right: -1, top: "50%", opacity: 0 }}
      />
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// ConnectivityNode — compact Industry-style card, TWO sides:
//   left handle  = target (receives edge from Devices circle)
//   right handle = source (sends edge to Platform circle)
// ─────────────────────────────────────────────────────────────────────────────
function ConnectivityNode({ data }: NodeProps<any>) {
  const color: string = CON_COLORS[data.label] ?? C.connectivity;
  const Icon = data.icon;
  return (
    <div
      className="flex items-center justify-center gap-2.5 rounded-[10px] bg-card px-3 py-2.5"
      style={{
        border: `1px solid ${color}`,
        boxShadow: `0 6px 10px -8px ${color}, 0 0 0 1px ${color}08`,
        width: CON_NODE_WIDTH,
        cursor: "grab",
      }}
    >
      <Icon size={15} color={color} strokeWidth={2} />
      <span
        className="whitespace-nowrap font-bold tracking-tight text-foreground"
        style={{ fontSize: "11px" }}
      >
        {data.label}
      </span>

      {/* Left  = incoming from Devices */}
      <Handle
        type="target"
        position={Position.Left}
        id="left"
        style={{ opacity: 0 }}
      />
      {/* Right = outgoing to Platform */}
      <Handle
        type="source"
        position={Position.Right}
        id="right"
        style={{ opacity: 0 }}
      />
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// PlatformNode (unchanged visual, receives edges on left only)
// ─────────────────────────────────────────────────────────────────────────────
function PlatformNode({ data }: NodeProps<any>) {
  const { theme } = useTheme();
  const logo = theme === "dark" ? darklogo : lightlogo;
  const SIZE = 360;
  const center = SIZE / 2;
  const RING_R = 125;

  return (
    <div
      className="relative flex items-center justify-center rounded-full"
      style={{
        width: SIZE,
        height: SIZE,
        background: `${C.platform}07`,
        border: `1px solid ${C.platform}`,
        cursor: "grab",
      }}
    >
      <div
        className="absolute rounded-full bg-card"
        style={{ width: 150, height: 150, border: `1.5px solid ${C.platform}` }}
      />
      <motion.img
        src={logo}
        alt="Altrex"
        className="z-10 w-26 drop-shadow-xl"
        style={{ position: "absolute" }}
        animate={{ y: [0, -8, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      />
      {data.items.map((item: any, i: number) => {
        const angle = (i / data.items.length) * Math.PI * 2;
        const x = center + Math.cos(angle) * RING_R;
        const y = center + Math.sin(angle) * RING_R;
        const Icon = item.icon;
        return (
          <div
            key={i}
            className="absolute z-20 flex flex-col items-center gap-[5px]"
            style={{ left: x, top: y, transform: "translate(-50%, -50%)" }}
          >
            <div
              className="flex h-11 w-11 items-center justify-center rounded-xl bg-card border shadow-md"
              style={{
                boxShadow: `0 2px 10px ${C.platform}25, 0 0 0 1px ${C.platform}12`,
              }}
            >
              <Icon size={22} color={C.platform} strokeWidth={2} />
            </div>
            <span className="whitespace-nowrap rounded border bg-card/90 px-1 py-[3px] text-[10px] font-bold uppercase tracking-tighter text-muted-foreground">
              {item.label}
            </span>
          </div>
        );
      })}
      {/* Target on left (from connectivity), source on right (to hosting/services) */}
      <Handle
        type="target"
        position={Position.Left}
        id="left"
        style={{ left: -1, top: "50%", opacity: 0 }}
      />
      <Handle
        type="source"
        position={Position.Right}
        id="right"
        style={{ right: -1, top: "50%", opacity: 0 }}
      />
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// GroupNode — Hosting / Enterprise Services (unchanged)
// ─────────────────────────────────────────────────────────────────────────────
function GroupNode({ data }: NodeProps<any>) {
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const color = isDark ? "#ffffff" : "#18181b";
  return (
    <div
      className="rounded-[18px] bg-card p-[14px] shadow-sm"
      style={{
        width: 225,
        border: `1px solid ${color}15`,
        borderTop: `3px solid ${color}`,
        boxShadow: `0 4px 24px rgba(0,0,0,0.05), 0 0 0 1px ${color}04`,
        cursor: "grab",
      }}
    >
      <p
        className="mb-3 text-center text-[12px] font-bold uppercase tracking-widest"
        style={{ color }}
      >
        {data.title}
      </p>
      <div className="flex flex-col gap-2">
        {(data.items as { icon: any; label: string; color?: string }[]).map(
          (item, i) => {
            const Icon = item.icon;
            const itemColor = item.color ?? data.color ?? C.cloud;
            return (
              <div
                key={i}
                className="flex min-w-[10px] items-center gap-3.5 rounded-xl bg-card px-4 py-3"
                style={{
                  border: `1px solid ${itemColor}`,
                  boxShadow: `0 8px 12px -9px ${itemColor}`,
                }}
              >
                <Icon size={20} color={itemColor} strokeWidth={2} />
                <span className="text-[13px] font-bold tracking-tight text-foreground">
                  {item.label}
                </span>
              </div>
            );
          },
        )}
      </div>
      <Handle type="target" position={Position.Left} style={{ opacity: 0 }} />
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// AnimatedEdge
// ─────────────────────────────────────────────────────────────────────────────
const AnimatedEdge = memo(function AnimatedEdge({
  id,
  sourceX,
  sourceY,
  targetX,
  targetY,
  sourcePosition,
  targetPosition,
  data,
}: EdgeProps) {
  const color = (data as any)?.color ?? C.edge;
  const duration = EDGE_DURATIONS[id] ?? 4.8;
  const [edgePath] = getBezierPath({
    sourceX,
    sourceY,
    targetX,
    targetY,
    sourcePosition,
    targetPosition,
  });

  return (
    <>
      <BaseEdge
        id={id}
        path={edgePath}
        style={{ stroke: color, strokeWidth: 1.5, strokeOpacity: 0.15 }}
      />
      <path
        className="beam-animated"
        d={edgePath}
        fill="none"
        stroke={color}
        strokeWidth={2}
        strokeLinecap="round"
        style={{
          strokeDasharray: "4 12",
          strokeDashoffset: 120,
          animationName: "beam-flow",
          animationDuration: `${duration}s`,
          animationTimingFunction: "linear",
          animationIterationCount: "infinite",
        }}
      />
    </>
  );
});

// ─────────────────────────────────────────────────────────────────────────────
// Node / edge type maps
// ─────────────────────────────────────────────────────────────────────────────
const nodeTypes: any = {
  "devices-circle": DevicesCircleNode,
  connectivity: ConnectivityNode,
  platform: PlatformNode,
  "list-group": GroupNode,
};
const edgeTypes: any = {
  animated: AnimatedEdge,
};

// ─────────────────────────────────────────────────────────────────────────────
// Layout constants
// ─────────────────────────────────────────────────────────────────────────────
// Canvas: 1580 × 600 (Moderate height for comfort without being too tall)
const CANVAS_WIDTH = 1580;
const CANVAS_HEIGHT = 600;

const CON_NODE_WIDTH = 140;
const COL_DEV = 60;
const COL_PLAT = 780;
const COL_RIGHT = 1270;
const COL_CON =
  COL_DEV +
  DEV_CIRCLE_SIZE +
  (COL_PLAT - (COL_DEV + DEV_CIRCLE_SIZE) - CON_NODE_WIDTH) / 2;

const CIRCLE_TOP = (CANVAS_HEIGHT - DEV_CIRCLE_SIZE) / 2; // ~120
const CIRCLE_HALF = DEV_CIRCLE_SIZE / 2; // 180

// Connectivity column: 8 nodes, evenly spaced vertically, centred on circle centre
const CON_NODE_H = 36; // approximate card height
const CON_GAP = 24; // gap between cards
const CON_TOTAL_H =
  connectivity.length * CON_NODE_H + (connectivity.length - 1) * CON_GAP;
const CON_START_Y = CIRCLE_TOP + CIRCLE_HALF - CON_TOTAL_H / 2;

function buildConNodes(): Node[] {
  return connectivity.map((item, i) => ({
    id: `con-${i}`,
    type: "connectivity" as const,
    position: { x: COL_CON, y: CON_START_Y + i * (CON_NODE_H + CON_GAP) },
    data: item,
    draggable: true,
  }));
}

// Edges: Devices right-handle → each connectivity left-handle
function buildDevConEdges(): Edge[] {
  return connectivity.map((item, i) => ({
    id: `dev-con-${i}`,
    source: "devices-circle",
    sourceHandle: "right",
    target: `con-${i}`,
    targetHandle: "left",
    type: "animated" as const,
    data: { color: CON_COLORS[item.label] ?? C.connectivity },
  }));
}

// Edges: each connectivity right-handle → Platform left-handle
function buildConPlatEdges(): Edge[] {
  return connectivity.map((item, i) => ({
    id: `con-plat-${i}`,
    source: `con-${i}`,
    sourceHandle: "right",
    target: "platform",
    targetHandle: "left",
    type: "animated" as const,
    data: { color: CON_COLORS[item.label] ?? C.connectivity },
  }));
}

const STATIC_NODES: Node[] = [
  {
    id: "devices-circle",
    type: "devices-circle" as const,
    position: { x: COL_DEV, y: CIRCLE_TOP },
    data: { devices },
    draggable: true,
  },
  {
    id: "platform",
    type: "platform" as const,
    position: { x: COL_PLAT, y: CIRCLE_TOP },
    data: { items: platform },
    draggable: true,
  },
  {
    id: "hosting",
    type: "list-group" as const,
    position: { x: COL_RIGHT, y: CANVAS_HEIGHT / 2 - 235 }, // Centered pair
    data: { items: hosting, title: "Hosting", color: C.cloud },
    draggable: true,
  },
  {
    id: "services",
    type: "list-group" as const,
    position: { x: COL_RIGHT, y: CANVAS_HEIGHT / 2 + 25 }, // Centered pair
    data: { items: services, title: "Enterprise Services", color: C.platform },
    draggable: true,
  },
];

const STATIC_EDGES: Edge[] = [
  {
    id: "plat-host",
    source: "platform",
    sourceHandle: "right",
    target: "hosting",
    type: "animated",
    data: { color: C.platform },
  },
  {
    id: "plat-serv",
    source: "platform",
    sourceHandle: "right",
    target: "services",
    type: "animated",
    data: { color: C.platform },
  },
];

const ALL_NODES: Node[] = [...STATIC_NODES, ...buildConNodes()];
const ALL_EDGES: Edge[] = [
  ...STATIC_EDGES,
  ...buildDevConEdges(),
  ...buildConPlatEdges(),
];

// ─────────────────────────────────────────────────────────────────────────────
// Inject CSS keyframes
// ─────────────────────────────────────────────────────────────────────────────
function useFlowStyles() {
  useEffect(() => {
    const ID = "arch-flow-styles";
    if (document.getElementById(ID)) return;
    const s = document.createElement("style");
    s.id = ID;
    s.innerHTML = `
      .arch-flow .react-flow__node { cursor: default; }
      .arch-flow .react-flow__node[data-id^="con-"] { cursor: grab; }
      .arch-flow .react-flow__node[data-id^="con-"]:active { cursor: grabbing; }
      .arch-flow .react-flow__attribution { display: none !important; }
      .arch-flow .react-flow__renderer,
      .arch-flow .react-flow__pane,
      .arch-flow .react-flow__background,
      .arch-flow { background: transparent !important; }
      .flow-active .beam-animated { animation-play-state: running; }
      .beam-animated { animation-play-state: paused; }
      @keyframes beam-flow { from { stroke-dashoffset: 120; } to { stroke-dashoffset: 0; } }
    `;
    document.head.appendChild(s);
  }, []);
}

// ─────────────────────────────────────────────────────────────────────────────
// Mobile fallback — clean vertical stepper, no Industries step
// ─────────────────────────────────────────────────────────────────────────────
const ArchitectureMobile = () => {
  const { theme } = useTheme();
  const logo = theme === "dark" ? darklogo : lightlogo;

  const steps = [
    { title: "Devices", items: devices, color: C.device },
    { title: "Connectivity", items: connectivity, color: C.connectivity },
    {
      title: "Altrex Platform",
      items: platform,
      isPlatform: true,
      color: C.platform,
    },
    { title: "Hosting", items: hosting, color: C.cloud },
    { title: "Enterprise Services", items: services, color: C.platform },
  ];

  return (
    <div className="mt-12 flex flex-col items-center gap-10 px-4">
      {steps.map((step, idx) => (
        <motion.div
          key={idx}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: idx * 0.08 }}
          className="relative flex w-full max-w-sm flex-col items-center"
        >
          {/* Connector to next step */}
          {idx < steps.length - 1 && (
            <div
              className="absolute top-full left-1/2 h-10 w-0.5 -translate-x-1/2"
              style={{
                background: `linear-gradient(to bottom, ${step.color}, ${steps[idx + 1].color}40)`,
              }}
            />
          )}

          <div
            className="flex w-full flex-col rounded-2xl border bg-card p-5 shadow-sm"
            style={{
              borderColor: `${step.color}30`,
              borderTop: `4px solid ${step.color}`,
            }}
          >
            <h3
              className="mb-3 text-center text-xs font-bold uppercase tracking-widest"
              style={{ color: step.color }}
            >
              {step.title}
            </h3>

            {step.isPlatform ? (
              <div className="flex flex-col items-center">
                <motion.img
                  src={logo}
                  alt="Altrex"
                  className="mb-4 w-20"
                  animate={{ y: [0, -5, 0] }}
                  transition={{ duration: 3, repeat: Infinity }}
                />
                <div className="grid grid-cols-2 gap-2 w-full">
                  {step.items.slice(0, 4).map((item: any, i) => (
                    <div
                      key={i}
                      className="flex flex-col items-center gap-1 rounded-xl border border-border bg-muted p-2"
                    >
                      <item.icon size={15} color={step.color} />
                      <span className="text-[9px] font-bold uppercase tracking-tight text-muted-foreground">
                        {item.label}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-2">
                {step.items.map((item: any, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-2 rounded-lg border border-border bg-muted p-2"
                  >
                    <item.icon
                      size={13}
                      color={(item.color as string) ?? step.color}
                      strokeWidth={2}
                    />
                    <span className="text-[10px] font-semibold text-foreground">
                      {item.label}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>

          {idx < steps.length - 1 && (
            <div
              className="mt-4 flex h-7 w-7 items-center justify-center rounded-full bg-card border shadow-sm"
              style={{ borderColor: `${step.color}40` }}
            >
              <ArrowDown size={13} className="text-muted-foreground" />
            </div>
          )}
        </motion.div>
      ))}
    </div>
  );
};

// ─────────────────────────────────────────────────────────────────────────────
// Architecture section
// ─────────────────────────────────────────────────────────────────────────────
const headerVariants: Variants = {
  hidden: { opacity: 0, y: 32 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const Architecture = () => {
  useFlowStyles();
  const [flowNodes, , onNodesChange] = useNodesState(ALL_NODES);
  const [flowEdges, , onEdgesChange] = useEdgesState(ALL_EDGES);

  const sectionRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "15%"]);
  const cardY = useTransform(scrollYProgress, [0, 1], ["0%", "-8%"]);

  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 1024);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  useEffect(() => {
    const c = canvasRef.current;
    if (!c) return;
    const obs = new IntersectionObserver(
      ([e]) => c.classList.toggle("flow-active", e.isIntersecting),
      { threshold: 0.05 },
    );
    obs.observe(c);
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    const s = sectionRef.current;
    if (!s) return;
    const obs = new IntersectionObserver(
      ([e]) => {
        const g = document.getElementById("bg-grid-overlay");
        if (!g) return;
        gsap.to(g, {
          opacity: e.isIntersecting ? 0.8 : 0.3,
          duration: 0.7,
          ease: "power2.out",
        });
      },
      { threshold: 0.2 },
    );
    obs.observe(s);
    return () => obs.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden bg-transparent pt-28"
    >
      {/* Dot-grid background */}
      <motion.div
        style={{ y: bgY }}
        className="pointer-events-none absolute inset-0 -z-10 opacity-60"
      >
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "radial-gradient(circle, var(--border-border) 1px, transparent 1px)",
            backgroundSize: "32px 32px",
          }}
        />
      </motion.div>

      <div className="mx-auto max-w-[1650px] px-6">
        {/* Header */}
        <motion.div
          className="mx-auto max-w-3xl text-center"
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
              title="Realtime Architecture"
              dot={true}
              className="mb-6"
            />
          </motion.div>
          <h2 className="mt-6 text-4xl font-bold uppercase tracking-tighter text-foreground sm:text-5xl">
            BUILT FOR DISTRIBUTED GLOBAL INFRASTRUCTURE
          </h2>
          <p className="mt-4 text-lg leading-8 text-muted-foreground font-semibold">
            From industrial devices to cloud — every layer connected, secured,
            and orchestrated in realtime.
          </p>
        </motion.div>

        {/* Diagram / Mobile */}
        {isMobile ? (
          <ArchitectureMobile />
        ) : (
          <motion.div
            ref={canvasRef}
            className="relative mt-16 overflow-hidden"
            style={{ y: cardY, height: CANVAS_HEIGHT }}
          >
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
              nodesDraggable={true}
              nodesConnectable={false}
              elementsSelectable={false}
              autoPanOnNodeDrag={false}
              nodeExtent={[
                [0, 0],
                [CANVAS_WIDTH, CANVAS_HEIGHT],
              ]}
              proOptions={{ hideAttribution: true }}
            />

            {/* Subtle grid overlay */}
            <svg
              className="pointer-events-none absolute inset-0 h-full w-full"
              style={{
                zIndex: 20,
                WebkitMaskImage:
                  "radial-gradient(ellipse at center, black 30%, transparent 75%)",
                maskImage:
                  "radial-gradient(ellipse at center, black 30%, transparent 75%)",
              }}
            >
              <defs>
                <pattern
                  id="arch-grid"
                  width="40"
                  height="40"
                  patternUnits="userSpaceOnUse"
                >
                  <path
                    d="M 40 0 L 0 0 0 40"
                    fill="none"
                    stroke="rgba(100,116,139,0.2)"
                    strokeWidth="1"
                  />
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#arch-grid)" />
            </svg>
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default Architecture;
