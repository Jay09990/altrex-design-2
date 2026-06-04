
import { useEffect, useRef, memo, useState } from "react";
import { motion, useInView, useScroll, useTransform, type Variants } from "framer-motion";
import { ReactFlow, useNodesState, useEdgesState, Position, Handle, BaseEdge, type Node, type Edge, type NodeProps, type EdgeProps, getBezierPath } from "@xyflow/react";
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
  Layers3,
  Monitor,
  Network,
  Radio,
  Server,
  ShieldCheck,
  Users,
  Wifi,
  Zap,
  Plug,
  Settings,
  Activity,
  Cable,
  Code,
} from "lucide-react";
import { Badge } from "../ui/badge";
import { gsap } from "gsap";
import { useTheme } from "@/hooks/useTheme";
import darklogo from "@/assets/altrex-logo-bg-black-removebg-blackbg.png";
import lightlogo from "@/assets/altrex-logo-bg-white-removebg-whitebg.png";

const C = {
  source: "#10b981",
  device: "#3b82f6",
  connectivity: "#d946ef",
  platform: "#ff6b00",
  cloud: "#06b6d4",
  system: "#6366f1",
  edge: "#ff6b00",
} as const;

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
  "plat-host": 4.7,
  "plat-sap": 4.9,
  "plat-erp": 5.5,
  "plat-crm": 4.3,
};

const industries = [
  { icon: Factory, label: "Oil & Gas" },
  { icon: Building2, label: "Power & Energy" },
  { icon: Zap, label: "Renewables" },
  { icon: FlaskConical, label: "Manufacturing" },
  { icon: Car, label: "Transportation" },
  { icon: Globe, label: "Smart Cities" },
];
const devices = [
  { icon: Cpu, label: "PLCs / RTUs" },
  { icon: Wifi, label: "Sensors / Rectifiers" },
  { icon: Monitor, label: "HMIs" },
  { icon: Layers3, label: "SCADA / DCS" },
];
const connectivity = [
  { icon: Plug, label: "MODBUS" },
  { icon: Settings, label: "OPC-UA" },
  { icon: Network, label: "ETHERNET" },
  { icon: Activity, label: "PROFINET" },
  { icon: Cable, label: "ETH/IP" },
  { icon: Radio, label: "MQTT" },
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
  { icon: Server, label: "On-Premise Server" },
  { icon: Cloud, label: "Private Cloud" },
  { icon: Cloud, label: "Public Cloud" },
];
const services = [
  { icon: BriefcaseBusiness, label: "SAP" },
  { icon: Database, label: "ERP" },
  { icon: Users, label: "CRM" },
];

// ── Platform Node ─────────────────────────────────────────────────────────────
function PlatformNode({ data }: NodeProps<any>) {
  const { theme } = useTheme();
  const logo = theme === "dark" ? darklogo : lightlogo;
  const SIZE = 360;
  const center = SIZE / 2;
  const RING_R = 125; // Radius for the platform items

  return (
    <div
      className="relative flex items-center justify-center rounded-full"
      style={{
        width: SIZE,
        height: SIZE,
        background: `${C.platform}07`,
        border: `1.5px solid ${C.platform}`,
      }}
    >
      {/* Center circle background */}
      <div
        className="absolute rounded-full bg-[var(--bg-surface)]"
        style={{ width: 150, height: 150, border: `1.5px solid ${C.platform}` }}
      />

      {/* Company logo — infinite glide up/down */}
      <motion.img
        src={logo}
        alt="Altrex"
        className="z-10 w-24 drop-shadow-xl"
        style={{ position: "absolute" }}
        animate={{ y: [0, -8, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Items arranged in a ring */}
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
              className="flex h-11 w-11 items-center justify-center rounded-xl bg-[var(--bg-surface)] border border-[var(--border-subtle)] shadow-md transition-transform hover:scale-110"
              style={{
                boxShadow: `0 2px 10px ${C.platform}25, 0 0 0 1px ${C.platform}12`,
              }}
            >
              <Icon size={22} color={C.platform} strokeWidth={2} />
            </div>
            <span className="whitespace-nowrap rounded border border-black/[0.04] bg-[var(--bg-surface)]/90 px-1 py-[3px] text-[10px] font-bold uppercase tracking-tighter text-[var(--text-secondary)]">
              {item.label}
            </span>
          </div>
        );
      })}

      <Handle
        type="target"
        position={Position.Left}
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

// ── Item Node ─────────────────────────────────────────────────────────────────
function ItemNode({ data }: NodeProps<any>) {
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const color = isDark ? "#ffffff" : "#18181b";
  const iconColor = (data.color as string) ?? C.source;
  const Icon = data.icon;
  return (
    <div
      className={`flex min-w-[140px] items-center gap-3.5 rounded-xl bg-[var(--bg-surface)] px-4 py-3.5 transition-all duration-200`}
      style={{
        border: `1px solid ${iconColor}`,
        boxShadow: `0 8px 12px -9px ${iconColor}`,
      }}
    >
      {Icon && <Icon size={20} color={iconColor} strokeWidth={2} />}
      <span className="text-[13px] font-bold tracking-tight text-[var(--text-primary)]">
        {data.label}
      </span>
      <Handle type="target" position={Position.Left} style={{ opacity: 0 }} />
      <Handle type="source" position={Position.Right} style={{ opacity: 0 }} />
      <Handle
        type="target"
        position={Position.Top}
        style={{ opacity: 0 }}
        id="top"
      />
    </div>
  );
}

// ── Block Node ────────────────────────────────────────────────────────────────
function BlockNode({ data }: NodeProps<any>) {
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const color = isDark ? "#ffffff" : "#18181b";
  const iconColor = (data.color as string) ?? C.source;
  const isDevices = data.title === "Devices";
  return (
    <div
      className="rounded-[20px] bg-[var(--bg-surface)] p-[18px] shadow-sm"
      style={{
        width: data.width ?? 240,
        border: `1px solid ${color}15`,
        borderTop: `3px solid ${color}`,
        boxShadow: `0 4px 24px rgba(0,0,0,0.05), 0 0 0 1px ${color}04`,
        minHeight: isDevices ? 340 : "auto",
      }}
    >
      <p
        className="mb-3.5 text-center text-[12px] font-bold uppercase tracking-widest"
        style={{ color }}
      >
        {data.title}
      </p>
      {data.variant === "connectivity" && (
        <div className="flex flex-col gap-[6px]">
          {(data.items as string[]).map((item, i) => (
            <div
              key={i}
              className="rounded-[9px] px-3 py-[6px] text-center text-[13px] font-semibold"
              style={{
                color,
                background: isDark
                  ? `rgba(255,255,255,0.04)`
                  : `rgba(0,0,0,0.02)`,
                border: `1px solid ${color}15`,
              }}
            >
              {item}
            </div>
          ))}
        </div>
      )}
      {data.variant === "platform" && (
        <div
          className={`grid gap-2 ${isDevices ? "grid-cols-1" : "grid-cols-2"}`}
        >
          {(data.items as { icon: any; label: string }[]).map((item, i) => {
            const Icon = item.icon;
            return (
              <div
                key={i}
                className="flex flex-col items-center gap-[6px] rounded-[12px] border border-[var(--border-subtle)] bg-[var(--bg-raised)] px-2 py-2.5 shadow-sm"
              >
                <div
                  className="flex h-[28px] w-[28px] items-center justify-center rounded-lg"
                  style={{
                    background: `${iconColor}15`,
                    border: `1px solid ${iconColor}30`,
                  }}
                >
                  <Icon size={15} color={iconColor} strokeWidth={1.8} />
                </div>
                <span className="text-center text-[11px] font-semibold leading-tight text-[var(--text-secondary)]">
                  {item.label}
                </span>
              </div>
            );
          })}
        </div>
      )}
      <Handle type="target" position={Position.Left} style={{ opacity: 0 }} />
      <Handle type="source" position={Position.Right} style={{ opacity: 0 }} />
      <Handle
        type="source"
        position={Position.Bottom}
        style={{ opacity: 0 }}
        id="bottom"
      />
    </div>
  );
}

// ── Merged Devices & Connectivity Node ────────────────────────────────────────
function MergedHubNode({ data }: NodeProps<any>) {
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const color = isDark ? "#ffffff" : "#18181b";
  const devItems = data.devices as { icon: any; label: string }[];
  const conItems = data.connectivity as { icon: any; label: string }[];

  const SIZE = 420;
  const center = SIZE / 2;
  const INNER_D = 220; // Increased diameter of inner circle
  const ARC_R = 175; // Increased radius for top and bottom arcs

  return (
    <div
      className="relative flex items-center justify-center"
      style={{
        width: SIZE,
        height: SIZE,
        background: "bg-[(var(--bg-surface))]",
      }}
    >
      {/* SVG Connectors */}
      <svg
        className="absolute inset-0 pointer-events-none z-0"
        width={SIZE}
        height={SIZE}
      >
        {conItems.map((_, i) => {
          const isTop = i < 4;
          const angleDeg = isTop ? -150 + i * 40 : 30 + (i - 4) * 40;
          const rad = (angleDeg * Math.PI) / 180;
          const x1 = center + Math.cos(rad) * (INNER_D / 2);
          const y1 = center + Math.sin(rad) * (INNER_D / 2);
          const x2 = center + Math.cos(rad) * (ARC_R - 36);
          const y2 = center + Math.sin(rad) * (ARC_R - 36);
          return (
            <line
              key={`line-${i}`}
              x1={x1}
              y1={y1}
              x2={x2}
              y2={y2}
              stroke={C.connectivity}
              strokeWidth={1.5}
              strokeDasharray="4 4"
            />
          );
        })}
      </svg>

      {/* Center circle */}
      <div
        className="absolute rounded-full bg-[var(--bg-surface)] flex items-center justify-center transition-all duration-300"
        style={{
          width: INNER_D,
          height: INNER_D,
          border: `1px solid ${isDark ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.03)"}`,
          boxShadow: isDark
            ? `0 10px 40px rgba(0,0,0,0.4), 0 0 20px ${C.device}15 inset`
            : `0 10px 40px rgba(0,0,0,0.08), 0 0 0 1px rgba(0,0,0,0.02)`,
        }}
      >
        {/* Device grid 2x2 */}
        <div className="grid grid-cols-2 grid-rows-2 w-[160px] h-[160px] gap-2.5">
          {devItems.map((item, i) => {
            const Icon = item.icon;
            return (
              <div
                key={`dev-${i}`}
                className="flex flex-col items-center justify-center p-1 rounded-xl transition-all duration-200 hover:scale-105"
              >
                <div
                  className="flex h-[42px] w-[42px] items-center justify-center rounded-[14px] bg-[var(--bg-surface)] border"
                  style={{
                    borderColor: `${C.device}30`,
                    background: `${C.device}08`,
                    boxShadow: `0 2px 8px ${C.device}15`,
                  }}
                >
                  <Icon size={20} color={C.device} strokeWidth={2} />
                </div>
                <span
                  className="mt-1.5 text-center font-bold uppercase tracking-tight text-[var(--text-primary)]"
                  style={{
                    fontSize: "9px",
                    lineHeight: "1.2",
                    maxWidth: "75px",
                  }}
                >
                  {item.label}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Items arranged in top and bottom arcs */}
      {conItems.map((item, i) => {
        const isTop = i < 4;
        let angleDeg = 0;
        if (isTop) {
          // Top arc: 4 items mapped to angles from -150 to -30
          angleDeg = -150 + i * 40;
        } else {
          // Bottom arc: 4 items mapped to angles from 30 to 150
          angleDeg = 30 + (i - 4) * 40;
        }
        const rad = (angleDeg * Math.PI) / 180;
        const x = center + Math.cos(rad) * ARC_R;
        const y = center + Math.sin(rad) * ARC_R;
        const Icon = item.icon;
        return (
          <div
            key={`con-${i}`}
            className="absolute z-20"
            style={{ left: x, top: y, transform: "translate(-50%, -50%)" }}
          >
            <motion.div
              className="flex flex-col items-center gap-1.5"
              animate={{ y: [0, -4, 0] }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut",
                delay: i * 0.2,
              }}
            >
              <div
                className="flex h-[46px] w-[46px] items-center justify-center rounded-[16px] bg-[var(--bg-surface)] border shadow-sm transition-transform hover:scale-110"
                style={{
                  borderColor: `${C.connectivity}30`,
                  background: `${C.connectivity}08`,
                  boxShadow: `0 4px 12px ${C.connectivity}15`,
                }}
              >
                <Icon size={22} color={C.connectivity} strokeWidth={1.8} />
              </div>
              <span className="text-center text-[10px] font-bold uppercase tracking-tight text-[var(--text-primary)]">
                {item.label}
              </span>
            </motion.div>
          </div>
        );
      })}

      <Handle
        type="target"
        position={Position.Left}
        style={{ opacity: 0, left: center - INNER_D / 2, top: "50%" }}
      />
      <Handle
        type="source"
        position={Position.Right}
        style={{ opacity: 0, right: center - INNER_D / 2, top: "50%" }}
      />
    </div>
  );
}

// ── Group Node (combined items with title) ─────────────────
function GroupNode({ data }: NodeProps<any>) {
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const color = isDark ? "#ffffff" : "#18181b";
  const iconColor = data.color ?? C.cloud;
  const title = data.title ?? "Group";
  return (
    <div
      className="rounded-[18px] bg-[var(--bg-surface)] p-[14px] shadow-sm"
      style={{
        width: 225,
        border: `1px solid ${color}15`,
        borderTop: `3px solid ${color}`,
        boxShadow: `0 4px 24px rgba(0,0,0,0.05), 0 0 0 1px ${color}04`,
      }}
    >
      <p
        className="mb-3 text-center text-[12px] font-bold uppercase tracking-widest"
        style={{ color }}
      >
        {title}
      </p>
      <div className="flex flex-col gap-2">
        {(data.items as { icon: any; label: string }[]).map((item, i) => {
          const Icon = item.icon;
          return (
            <div
              key={i}
              className="flex items-center gap-2.5 rounded-[10px] px-2.5 py-2.5"
              style={{
                background: isDark
                  ? `rgba(255,255,255,0.03)`
                  : `rgba(0,0,0,0.02)`,
                border: `1px solid ${color}12`,
              }}
            >
              <div
                className="flex h-[28px] w-[28px] shrink-0 items-center justify-center rounded-lg"
                style={{
                  background: `${iconColor}15`,
                  border: `1px solid ${iconColor}30`,
                }}
              >
                <Icon size={15} color={iconColor} strokeWidth={1.8} />
              </div>
              <div className="flex flex-col gap-[2px]">
                <span className="text-[13px] font-semibold leading-none text-[var(--text-primary)]">
                  {item.label}
                </span>
                <span className="font-mono text-[9px] leading-none uppercase tracking-widest text-[var(--text-muted)]">
                  ◉ ACTIVE
                </span>
              </div>
            </div>
          );
        })}
      </div>
      <Handle type="target" position={Position.Left} style={{ opacity: 0 }} />
    </div>
  );
}

// ── Edge types ────────────────────────────────────────────────────────────────
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
  const duration = EDGE_DURATIONS[id] ?? 5;
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

/** Perfectly straight line — used for ERP so the edge has zero curvature */
const StraightAnimatedEdge = memo(function ({
  id,
  sourceX,
  sourceY,
  targetX,
  targetY,
  data,
}: EdgeProps) {
  const color = (data as any)?.color ?? C.edge;
  const duration = EDGE_DURATIONS[id] ?? 5;
  const edgePath = `M ${sourceX},${sourceY} L ${targetX},${targetY}`;
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

const nodeTypes: any = {
  item: ItemNode,
  block: BlockNode,
  platform: PlatformNode,
  "list-group": GroupNode,
  "merged-hub": MergedHubNode,
};
const edgeTypes: any = {
  animated: AnimatedEdge,
  "straight-animated": StraightAnimatedEdge,
};

// ── Node layout ───────────────────────────────────────────────────────────────
const NODES: Node[] = [
  // Industries — tighter 70 px pitch
  ...industries.map((item, i) => {
    const itemColors = [
      C.system,
      C.device,
      C.connectivity,
      C.platform,
      C.cloud,
      C.system,
      C.device,
    ];
    return {
      id: `industry-${i}`,
      type: "item" as const,
      position: { x: 40, y: 125 + i * 90 },
      data: { ...item, color: itemColors[i % itemColors.length] },
    };
  }),
  {
    id: "merged-hub",
    type: "merged-hub" as const,
    position: { x: 330, y: 175 },
    data: { devices: devices, connectivity: connectivity },
  },
  {
    id: "platform",
    type: "platform" as const,
    position: { x: 760, y: 174 },
    data: { items: platform },
  },
  {
    id: "hosting",
    type: "list-group" as const,
    position: { x: 1250, y: 120 },
    data: { items: hosting, title: "Hosting", color: C.cloud },
  },
  {
    id: "services",
    type: "list-group" as const,
    position: { x: 1250, y: 355 },
    data: { items: services, title: "Enterprise Services", color: C.platform },
  },
];

const EDGES: Edge[] = [
  ...industries.map((_, i) => {
    const itemColors = [
      C.system,
      C.device,
      C.connectivity,
      C.platform,
      C.cloud,
      C.system,
      C.device,
    ];
    return {
      id: `ind-dev-${i}`,
      source: `industry-${i}`,
      target: "merged-hub",
      type: "animated" as const,
      data: { color: itemColors[i % itemColors.length] },
    };
  }),
  {
    id: "hub-plat",
    source: "merged-hub",
    target: "platform",
    type: "animated",
  },
  {
    id: "plat-host",
    source: "platform",
    sourceHandle: "right",
    target: "hosting",
    type: "animated",
  },
  {
    id: "plat-serv",
    source: "platform",
    sourceHandle: "right",
    target: "services",
    type: "animated",
  },
];

const headerVariants: Variants = {
  hidden: { opacity: 0, y: 32 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

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
      .arch-flow .react-flow__renderer,
      .arch-flow .react-flow__pane,
      .arch-flow .react-flow__background,
      .arch-flow { background: transparent !important; }
      .flow-active .beam-animated { animation-play-state: running; }
      .beam-animated { animation-play-state: paused; }
      @keyframes beam-flow { from { stroke-dashoffset: 120; } to { stroke-dashoffset: 0; } }
      @keyframes spin-cw { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
      @keyframes spin-ccw { from { transform: rotate(360deg); } to { transform: rotate(0deg); } }
      .animate-spin-slow { animation: spin-cw 30s linear infinite; }
      .animate-spin-slow-reverse { animation: spin-ccw 30s linear infinite; }
    `;
    document.head.appendChild(style);
  }, []);
}

const ArchitectureMobile = () => {
  const { theme } = useTheme();
  const logo = theme === "dark" ? darklogo : lightlogo;

  const steps = [
    { title: "Industries", items: industries, color: C.system },
    { title: "Devices", items: devices, color: C.device },
    { title: "Connectivity", items: connectivity, color: C.connectivity },
    { title: "Altrex Platform", items: platform, color: C.platform, isPlatform: true },
    { title: "Enterprise Systems", items: [...hosting, ...services], color: C.cloud }
  ];

  return (
    <div className="mt-12 flex flex-col items-center gap-12 px-4">
      {steps.map((step, idx) => (
        <motion.div
          key={idx}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: idx * 0.1 }}
          className="relative flex w-full max-w-sm flex-col items-center"
        >
          {/* Progress line */}
          {idx < steps.length - 1 && (
            <div
              className="absolute top-full left-1/2 h-12 w-0.5 -translate-x-1/2"
              style={{ background: `linear-gradient(to bottom, ${step.color}, ${steps[idx + 1].color}40)` }}
            />
          )}

          <div
            className="flex w-full flex-col rounded-2xl border bg-[var(--bg-surface)] p-6 shadow-sm"
            style={{ borderColor: `${step.color}30`, borderTop: `4px solid ${step.color}` }}
          >
            <h3 className="mb-4 text-center text-xs font-bold uppercase tracking-widest" style={{ color: step.color }}>
              {step.title}
            </h3>

            {step.isPlatform ? (
              <div className="flex flex-col items-center">
                <motion.img
                  src={logo}
                  alt="Altrex"
                  className="mb-6 w-24"
                  animate={{ y: [0, -5, 0] }}
                  transition={{ duration: 3, repeat: Infinity }}
                />
                <div className="grid grid-cols-2 gap-3 w-full">
                  {step.items.slice(0, 4).map((item: any, i) => (
                    <div key={i} className="flex flex-col items-center gap-1.5 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-raised)] p-2">
                      <item.icon size={16} color={step.color} />
                      <span className="text-[10px] font-bold uppercase tracking-tight text-[var(--text-secondary)]">{item.label}</span>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-3">
                {step.items.map((item: any, i) => (
                  <div key={i} className="flex items-center gap-2 rounded-lg border border-[var(--border-subtle)] bg-[var(--bg-raised)] p-2">
                    <item.icon size={14} color={step.color} strokeWidth={2} />
                    <span className="text-[10px] font-semibold text-[var(--text-primary)]">{item.label}</span>
                  </div>
                ))}
              </div>
            )}
          </div>

          {idx < steps.length - 1 && (
            <div className="mt-4 flex h-8 w-8 items-center justify-center rounded-full bg-[var(--bg-surface)] border shadow-sm" style={{ borderColor: `${step.color}40` }}>
              <ArrowDown size={14} className="text-[var(--text-muted)]" />
            </div>
          )}
        </motion.div>
      ))}
    </div>
  );
};

// ── Architecture section ───────────────────────────────────────────────────────
const Architecture = () => {
  useFlowStyles();
  const [flowNodes, , onNodesChange] = useNodesState(NODES);
  const [flowEdges, , onEdgesChange] = useEdgesState(EDGES);
  const sectionRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "15%"]);
  const cardY = useTransform(scrollYProgress, [0, 1], ["0%", "-8%"]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const observer = new IntersectionObserver(
      ([e]) => {
        canvas.classList.toggle("flow-active", e.isIntersecting);
      },
      { threshold: 0.05 },
    );
    observer.observe(canvas);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    const observer = new IntersectionObserver(
      ([e]) => {
        const grid = document.getElementById("bg-grid-overlay");
        if (!grid) return;
        if (e.isIntersecting) {
          gsap.to(grid, { opacity: 0.8, duration: 0.8, ease: "power2.out" });
        } else {
          gsap.to(grid, { opacity: 0.3, duration: 0.6, ease: "power2.out" });
        }
      },
      { threshold: 0.2 },
    );
    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden bg-transparent pt-28"
    >
      <motion.div
        style={{ y: bgY }}
        className="pointer-events-none absolute inset-0 -z-10 opacity-60"
      >
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "radial-gradient(circle, var(--border-subtle) 1px, transparent 1px)",
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
              className="border border-[var(--accent-violet)]/20 bg-[var(--accent-violet)]/10 text-[var(--accent-violet)]"
            >
              Realtime Architecture
            </Badge>
          </motion.div>
          <h2 className="mt-6 text-4xl font-bold uppercase tracking-tighter text-[var(--text-primary)] sm:text-5xl">
            BUILT FOR DISTRIBUTED{" "}
            <span className="text-[var(--accent-violet)]">
              GLOBAL INFRASTRUCTURE
            </span>
          </h2>
          <p className="mt-4 text-lg leading-8 text-[var(--text-secondary)]">
            From industrial devices to cloud — every layer connected, secured,
            and orchestrated in realtime.
          </p>
        </motion.div>

        {isMobile ? (
          <ArchitectureMobile />
        ) : (
          <motion.div
            ref={canvasRef}
            className="relative mt-16 overflow-hidden"
            style={{
              y: cardY,
              height: 750,
            }}
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
              nodesDraggable
              nodesConnectable={false}
              elementsSelectable={false}
              autoPanOnNodeDrag={false}
              nodeExtent={[
                [0, 0],
                [1600, 750],
              ]}
              proOptions={{ hideAttribution: true }}
            />

            {/* SVG grid overlay — rendered above ReactFlow so it's always visible */}
            <svg
              className="pointer-events-none absolute inset-0 h-full w-full"
              style={{
                zIndex: 20,
                WebkitMaskImage:
                  "radial-gradient(ellipse at center, black 30%, transparent 75%)",
                maskImage:
                  "radial-gradient(ellipse at center, black 30%, transparent 75%)",
              }}
              xmlns="http://www.w3.org/2000/svg"
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
                    stroke="rgba(100,116,139,0.25)"
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
