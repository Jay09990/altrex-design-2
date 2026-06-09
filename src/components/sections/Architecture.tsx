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
  useStore,
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
  ArrowDown,
} from "lucide-react";
import { Badge } from "../ui/badge";
import { gsap } from "gsap";
import { useTheme } from "@/hooks/useTheme";
import lightlogo from "@/assets/AltrexLogoTr1.png";
import darklogo from "@/assets/AltrexLogoTr2.png";
import wiLogo from "@/assets/W!_icon_round.ico";

// ─────────────────────────────────────────────────────────────────────────────
// Colour palette
// ─────────────────────────────────────────────────────────────────────────────
const C = {
  source:       "#10b981",
  device:       "#3b82f6",
  connectivity: "#d946ef",
  platform:     "#ff6b00",
  cloud:        "#06b6d4",
  system:       "#6366f1",
  edge:         "#ff6b00",
} as const;

// Per-protocol tint colours so connectivity nodes feel colour-coded
const CON_COLORS: Record<string, string> = {
  MODBUS:    "#f59e0b",
  "OPC-UA":  "#8b5cf6",
  ETHERNET:  "#06b6d4",
  DNPC3:     "#10b981",
  "IEC-104": "#3b82f6",
  MQTT:      "#ec4899",
  "REST API":"#f97316",
  "SQL/NOSQL":"#6366f1",
};

// ─────────────────────────────────────────────────────────────────────────────
// Data
// ─────────────────────────────────────────────────────────────────────────────
const EDGE_DURATIONS: Record<string, number> = {
  "ind-dev-0": 4.2, "ind-dev-1": 5.0, "ind-dev-2": 4.6,
  "ind-dev-3": 5.4, "ind-dev-4": 4.8, "ind-dev-5": 5.2,
  "hub-plat":  4.5,
  "plat-host": 4.7, "plat-serv": 5.5,
};

const industries = [
  { icon: Factory,      label: "Oil & Gas"      },
  { icon: Building2,    label: "Power & Energy"  },
  { icon: Zap,          label: "Renewables"      },
  { icon: FlaskConical, label: "Manufacturing"   },
  { icon: Car,          label: "Transportation"  },
  { icon: Globe,        label: "Smart Cities"    },
];

// devices — fixed inside the circle at top / left / right / bottom
const devices = [
  { icon: Cpu,     label: "PLCs / RTUs",        slot: "top"    },
  { icon: Wifi,    label: "Sensors /\nRectifiers", slot: "left"   },
  { icon: Monitor, label: "HMIs",               slot: "right"  },
  { icon: Layers3, label: "SCADA / DCS",        slot: "bottom" },
];

const connectivity = [
  { icon: Plug,     label: "MODBUS"    },
  { icon: Settings, label: "OPC-UA"   },
  { icon: Network,  label: "ETHERNET" },
  { icon: Activity, label: "DNPC3"    },
  { icon: Cable,    label: "IEC-104"  },
  { icon: Radio,    label: "MQTT"     },
  { icon: Code,     label: "REST API" },
  { icon: Database, label: "SQL/NOSQL"},
];

const platform = [
  { icon: Globe,       label: "Web SCADA"    },
  { icon: Database,    label: "Visualization"},
  { icon: ShieldCheck, label: "Alerting"     },
  { icon: Layers3,     label: "Assets"       },
  { icon: Network,     label: "Reporting"    },
  { icon: ShieldCheck, label: "Security"     },
  { icon: Radio,       label: "Analytics"    },
  { icon: Cpu,         label: "AI & ML"      },
];

const hosting = [
  { icon: Server, label: "On-Premise Server", color: C.device   },
  { icon: Cloud,  label: "Private Cloud",     color: C.cloud    },
  { icon: Cloud,  label: "Public Cloud",      color: C.platform },
];

const services = [
  { icon: BriefcaseBusiness, label: "SAP", color: C.platform },
  { icon: Database,          label: "ERP", color: C.cloud    },
  { icon: Users,             label: "CRM", color: C.source   },
];

// ─────────────────────────────────────────────────────────────────────────────
// Devices circle dimensions (must be shared with edge logic)
// ─────────────────────────────────────────────────────────────────────────────
const CIRCLE_SIZE   = 210;   // outer diameter
const CIRCLE_RADIUS = CIRCLE_SIZE / 2;  // 120px

// ─────────────────────────────────────────────────────────────────────────────
// DevicesCircleNode — single draggable unit, four items fixed inside
// ─────────────────────────────────────────────────────────────────────────────
function DevicesCircleNode({ data }: NodeProps<any>) {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  const devItems = data.devices as typeof devices;

  // Cardinal offsets from circle centre for each slot
  const slotOffset: Record<string, { x: number; y: number }> = {
    top:    { x: 0,    y: -68 },
    left:   { x: -68, y: 0   },
    right:  { x: 68,  y: 0   },
    bottom: { x: 0,   y: 68  },
  };

  return (
    <div
      className="relative flex items-center justify-center"
      style={{
        width:  CIRCLE_SIZE,
        height: CIRCLE_SIZE,
        // React Flow needs pointer-events for drag; don't block with overflow:hidden
      }}
    >
      {/* ── Outer glow ring ── */}
      <div
        className="absolute inset-0 rounded-full bg-[var(--bg-surface)]"
        style={{
          border: `1px solid ${C.device}`,
          boxShadow: `0 0 10px -2px  ${C.device}, 0 0 0 1px ${C.device}08`
        }}
      />

      {/* ── Inner hub circle ── */}
      <div
        className="absolute rounded-full flex items-center justify-center"
        style={{
          width: 68, height: 68,
          background: isDark
            ? `radial-gradient(circle, ${C.device}15, ${C.device}05)`
            : `radial-gradient(circle, ${C.device}10, transparent)`,
          border: `1px solid ${C.device}`,
          boxShadow: `0 0 10px -2px  ${C.device}, 0 0 0 1px ${C.device}08`,
        }}
      >
        {/* Hamburger lines — matches reference image centre */}
        <motion.img src={wiLogo} alt="W!"
        className="z-10 w-7 drop-shadow-xl" style={{ position: "absolute" }}
        animate={{ y: [0, -8, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }} />
      </div>

      {/* ── Four device items at cardinal positions ── */}
      {devItems.map((item) => {
        const off = slotOffset[item.slot];
        const Icon = item.icon;
        return (
          <div
            key={item.slot}
            className="absolute flex flex-col items-center gap-[6px]"
            style={{
              left: CIRCLE_RADIUS + off.x,
              top:  CIRCLE_RADIUS + off.y,
              transform: "translate(-50%, -50%)",
              pointerEvents: "none",  // items are NOT individually draggable
            }}
          >
            <div
              className="flex h-[32px] w-[32px] items-center justify-center rounded-[10px] bg-[var(--bg-surface)] transition-all duration-200"
              style={{
                border: `1px solid ${C.device}`,
                boxShadow: `0 5px 10px -4px ${C.device}, 0 0 0 1px ${C.device}08`
              }}
            >
              <Icon size={15} color={C.device} strokeWidth={2} />
            </div>
            <span
              className="text-center font-bold uppercase tracking-tight text-[var(--text-primary)]"
              style={{ fontSize: "8.5px", lineHeight: "1.2", maxWidth: 56, whiteSpace: "pre-line" }}
            >
              {item.label}
            </span>
          </div>
        );
      })}

      {/* ── Invisible handles — React Flow still needs them for edges ──
           We place handles around the circumference; the custom edge
           ignores them and computes its own tangent point anyway.
           These are just needed so React Flow registers the node as connectable. */}
      <Handle type="target" position={Position.Left}
        style={{ opacity: 0, top: "50%", left: 0 }} />
      <Handle type="source" position={Position.Right}
        id="right"
        style={{ opacity: 0, top: "50%", right: 0 }} />
      <Handle type="target" position={Position.Top}
        id="top"
        style={{ opacity: 0, left: "50%", top: 0 }} />
      <Handle type="target" position={Position.Bottom}
        id="bottom"
        style={{ opacity: 0, left: "50%", bottom: 0 }} />
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// ConnectivityNode — compact card matching the ItemNode (Industry) design style
// ─────────────────────────────────────────────────────────────────────────────
function ConnectivityNode({ data }: NodeProps<any>) {
  const color: string = CON_COLORS[data.label] ?? C.connectivity;
  const Icon = data.icon;
  return (
    <div
      className="flex items-center gap-2.5 rounded-[10px] bg-[var(--bg-surface)] px-3 py-2.5 transition-all duration-200 hover:scale-105"
      style={{
        border: `1px solid ${color}`,
        boxShadow: `0 6px 10px -8px ${color}, 0 0 0 1px ${color}08`,
        minWidth: 110,
        cursor: "grab",
      }}
    >
      <Icon size={15} color={color} strokeWidth={2} />
      <span
        className="font-bold tracking-tight text-[var(--text-primary)]"
        style={{ fontSize: "11px" }}
      >
        {data.label}
      </span>

      {/* All four handles so React Flow can route edges from any direction */}
      <Handle type="source" position={Position.Right}  style={{ opacity: 0 }} />
      <Handle type="source" position={Position.Left}   style={{ opacity: 0 }} id="left" />
      <Handle type="source" position={Position.Top}    style={{ opacity: 0 }} id="top" />
      <Handle type="source" position={Position.Bottom} style={{ opacity: 0 }} id="bottom" />
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// CircumferenceEdge
// Computes the exact tangent point on the devices circle's circumference
// nearest to the connectivity node, rather than routing to a fixed handle.
// ─────────────────────────────────────────────────────────────────────────────
const CircumferenceEdge = memo(function CircumferenceEdge({
  id,
  source,
  target,
  data,
}: EdgeProps) {
  const sourceNode = useStore((s) => s.nodeLookup.get(source));
  const targetNode = useStore((s) => s.nodeLookup.get(target));

  if (!sourceNode || !targetNode) return null;

  // Connectivity node centre
  const conW = (sourceNode.measured?.width  ?? 110);
  const conH = (sourceNode.measured?.height ?? 38);
  const conCx = (sourceNode.position?.x ?? 0) + conW / 2;
  const conCy = (sourceNode.position?.y ?? 0) + conH / 2;

  // Devices circle centre
  const devCx = (targetNode.position?.x ?? 0) + CIRCLE_RADIUS;
  const devCy = (targetNode.position?.y ?? 0) + CIRCLE_RADIUS;

  // Vector from circle centre → connectivity node
  const dx = conCx - devCx;
  const dy = conCy - devCy;
  const dist = Math.sqrt(dx * dx + dy * dy) || 1;
  const ux = dx / dist;
  const uy = dy / dist;

  // Tangent point on the circle's boundary
  const tpx = devCx + ux * (CIRCLE_RADIUS + 2);
  const tpy = devCy + uy * (CIRCLE_RADIUS + 2);

  // Source point: closest edge of the connectivity node to the circle
  // We pick from the midpoints of the four sides
  const srcCandidates = [
    { x: conCx,       y: (sourceNode.position?.y ?? 0)        }, // top
    { x: conCx,       y: (sourceNode.position?.y ?? 0) + conH }, // bottom
    { x: (sourceNode.position?.x ?? 0),       y: conCy        }, // left
    { x: (sourceNode.position?.x ?? 0) + conW, y: conCy       }, // right
  ];
  let srcPt = srcCandidates[0];
  let minD = Infinity;
  for (const pt of srcCandidates) {
    const d = Math.hypot(pt.x - tpx, pt.y - tpy);
    if (d < minD) { minD = d; srcPt = pt; }
  }

  // Build a smooth bezier
  const midX = (srcPt.x + tpx) / 2;
  const midY = (srcPt.y + tpy) / 2;
  const edgePath = `M ${srcPt.x},${srcPt.y} C ${midX},${srcPt.y} ${midX},${tpy} ${tpx},${tpy}`;

  const color: string = (data as any)?.color ?? C.connectivity;
  const duration = 3.5 + ((id.charCodeAt(id.length - 1) % 20) / 10);

  return (
    <>
      {/* Ghost track */}
      <path
        d={edgePath}
        fill="none"
        stroke={color}
        strokeWidth={1.5}
        strokeOpacity={0.18}
        strokeDasharray="5 5"
      />
      {/* Animated beam */}
      <path
        className="beam-animated"
        d={edgePath}
        fill="none"
        stroke={color}
        strokeWidth={2}
        strokeLinecap="round"
        style={{
          strokeDasharray: "4 14",
          strokeDashoffset: 120,
          animationName: "beam-flow",
          animationDuration: `${duration}s`,
          animationTimingFunction: "linear",
          animationIterationCount: "infinite",
        }}
      />
      {/* Dot at the circle circumference */}
      <circle cx={tpx} cy={tpy} r={3} fill={color} opacity={0.55} />
    </>
  );
});

// ─────────────────────────────────────────────────────────────────────────────
// AnimatedEdge — reused for industries → devices and platform → integrations
// ─────────────────────────────────────────────────────────────────────────────
const AnimatedEdge = memo(function AnimatedEdge({
  id, sourceX, sourceY, targetX, targetY,
  sourcePosition, targetPosition, data,
}: EdgeProps) {
  const color = (data as any)?.color ?? C.edge;
  const duration = EDGE_DURATIONS[id] ?? 5;
  const [edgePath] = getBezierPath({
    sourceX, sourceY, targetX, targetY, sourcePosition, targetPosition,
  });
  return (
    <>
      <BaseEdge id={id} path={edgePath}
        style={{ stroke: color, strokeWidth: 1.5, strokeOpacity: 0.15 }} />
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
// PlatformNode (unchanged from original)
// ─────────────────────────────────────────────────────────────────────────────
function PlatformNode({ data }: NodeProps<any>) {
  const { theme } = useTheme();
  const logo  = theme === "dark" ? darklogo : lightlogo;
  const SIZE  = 360;
  const center = SIZE / 2;
  const RING_R = 125;
  return (
    <div
      className="relative flex items-center justify-center rounded-full"
      style={{
        width: SIZE, height: SIZE,
        background: `${C.platform}07`,
        border: `1.5px solid ${C.platform}`,
        cursor: "grab",
      }}
    >
      <div className="absolute rounded-full bg-[var(--bg-surface)]"
        style={{ width: 150, height: 150, border: `1.5px solid ${C.platform}` }} />
      <motion.img src={logo} alt="Altrex"
        className="z-10 w-24 drop-shadow-xl" style={{ position: "absolute" }}
        animate={{ y: [0, -8, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }} />
      {data.items.map((item: any, i: number) => {
        const angle = (i / data.items.length) * Math.PI * 2;
        const x = center + Math.cos(angle) * RING_R;
        const y = center + Math.sin(angle) * RING_R;
        const Icon = item.icon;
        return (
          <div key={i} className="absolute z-20 flex flex-col items-center gap-[5px]"
            style={{ left: x, top: y, transform: "translate(-50%, -50%)" }}>
            <div
              className="flex h-11 w-11 items-center justify-center rounded-xl bg-[var(--bg-surface)] border border-[var(--border-subtle)] shadow-md transition-transform hover:scale-110"
              style={{ boxShadow: `0 2px 10px ${C.platform}25, 0 0 0 1px ${C.platform}12` }}>
              <Icon size={22} color={C.platform} strokeWidth={2} />
            </div>
            <span className="whitespace-nowrap rounded border border-black/[0.04] bg-[var(--bg-surface)]/90 px-1 py-[3px] text-[10px] font-bold uppercase tracking-tighter text-[var(--text-secondary)]">
              {item.label}
            </span>
          </div>
        );
      })}
      <Handle type="target" position={Position.Left}
        style={{ left: -1, top: "50%", opacity: 0 }} />
      <Handle type="source" position={Position.Right} id="right"
        style={{ right: -1, top: "50%", opacity: 0 }} />
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// ItemNode (industries + others)
// ─────────────────────────────────────────────────────────────────────────────
function ItemNode({ data }: NodeProps<any>) {
  const iconColor = (data.color as string) ?? C.source;
  const Icon = data.icon;
  return (
    <div
      className="flex min-w-[140px] items-center gap-3.5 rounded-xl bg-[var(--bg-surface)] px-4 py-3.5 transition-all duration-200"
      style={{ border: `1px solid ${iconColor}`, boxShadow: `0 8px 12px -9px ${iconColor}`, cursor: "grab" }}>
      {Icon && <Icon size={20} color={iconColor} strokeWidth={2} />}
      <span className="text-[13px] font-bold tracking-tight text-[var(--text-primary)]">
        {data.label}
      </span>
      <Handle type="target" position={Position.Left}  style={{ opacity: 0 }} />
      <Handle type="source" position={Position.Right} style={{ opacity: 0 }} />
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// GroupNode (hosting + enterprise services)
// ─────────────────────────────────────────────────────────────────────────────
function GroupNode({ data }: NodeProps<any>) {
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const color  = isDark ? "#ffffff" : "#18181b";
  return (
    <div
      className="rounded-[18px] bg-[var(--bg-surface)] p-[14px] shadow-sm"
      style={{
        width: 225,
        border: `1px solid ${color}15`,
        borderTop: `3px solid ${color}`,
        boxShadow: `0 4px 24px rgba(0,0,0,0.05), 0 0 0 1px ${color}04`,
        cursor: "grab",
      }}>
      <p className="mb-3 text-center text-[12px] font-bold uppercase tracking-widest" style={{ color }}>
        {data.title}
      </p>
      <div className="flex flex-col gap-2">
        {(data.items as { icon: any; label: string; color?: string }[]).map((item, i) => {
          const Icon = item.icon;
          const itemColor = item.color ?? data.color ?? C.cloud;
          return (
            <div key={i}
              className="flex min-w-[140px] items-center gap-3.5 rounded-xl bg-[var(--bg-surface)] px-4 py-3.5"
              style={{ border: `1px solid ${itemColor}`, boxShadow: `0 8px 12px -9px ${itemColor}` }}>
              <Icon size={20} color={itemColor} strokeWidth={2} />
              <span className="text-[13px] font-bold tracking-tight text-[var(--text-primary)]">
                {item.label}
              </span>
            </div>
          );
        })}
      </div>
      <Handle type="target" position={Position.Left} style={{ opacity: 0 }} />
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Node / edge type maps
// ─────────────────────────────────────────────────────────────────────────────
const nodeTypes: any = {
  item:             ItemNode,
  platform:         PlatformNode,
  "list-group":     GroupNode,
  "devices-circle": DevicesCircleNode,
  connectivity:     ConnectivityNode,
};
const edgeTypes: any = {
  animated:        AnimatedEdge,
  circumference:   CircumferenceEdge,
};

// ─────────────────────────────────────────────────────────────────────────────
// Initial positions
// ─────────────────────────────────────────────────────────────────────────────
// Devices circle sits at x=400, y=225  →  centre ≈ (520, 345)
const DEV_X = 400;
const DEV_Y = 225;
const DEV_CX = DEV_X + CIRCLE_RADIUS;  // 520
const DEV_CY = DEV_Y + CIRCLE_RADIUS;  // 345

// Distribute 8 connectivity nodes around the circle.
// Leave the right side open (platform lives there) — sweep 300° starting at 110°.
function buildConNodes(): Node[] {
  const n   = connectivity.length;
  const START_DEG = 110;
  const SWEEP_DEG = 300;
  const ORBIT_R   = 195;  // tighter orbit to match smaller circle + smaller cards

  return connectivity.map((item, i) => {
    const deg = START_DEG + (i / (n - 1)) * SWEEP_DEG;
    const rad = (deg * Math.PI) / 180;
    const x   = DEV_CX + Math.cos(rad) * ORBIT_R - 55; // 55 ≈ half card width
    const y   = DEV_CY + Math.sin(rad) * ORBIT_R - 18;
    return {
      id:       `con-${i}`,
      type:     "connectivity" as const,
      position: { x, y },
      data:     item,
      draggable: true,
    };
  });
}

function buildConEdges(): Edge[] {
  return connectivity.map((item, i) => ({
    id:     `con-edge-${i}`,
    source: `con-${i}`,
    target: "devices-circle",
    type:   "circumference" as const,
    data:   { color: CON_COLORS[item.label] ?? C.connectivity },
  }));
}

const INDUSTRY_COLORS = [C.system, C.device, C.connectivity, C.platform, C.cloud, C.system];

const STATIC_NODES: Node[] = [
  ...industries.map((item, i) => ({
    id:       `industry-${i}`,
    type:     "item" as const,
    position: { x: 40, y: 100 + i * 90 },
    data:     { ...item, color: INDUSTRY_COLORS[i % INDUSTRY_COLORS.length] },
    draggable: true,
  })),
  {
    id:       "devices-circle",
    type:     "devices-circle" as const,
    position: { x: DEV_X, y: DEV_Y },
    data:     { devices },
    draggable: true,   // ← the whole circle is draggable
  },
  {
    id:       "platform",
    type:     "platform" as const,
    position: { x: 840, y: 174 },
    data:     { items: platform },
    draggable: true,
  },
  {
    id:       "hosting",
    type:     "list-group" as const,
    position: { x: 1300, y: 120 },
    data:     { items: hosting, title: "Hosting", color: C.cloud },
    draggable: true,
  },
  {
    id:       "services",
    type:     "list-group" as const,
    position: { x: 1300, y: 360 },
    data:     { items: services, title: "Enterprise Services", color: C.platform },
    draggable: true,
  },
];

const STATIC_EDGES: Edge[] = [
  ...industries.map((_, i) => ({
    id:     `ind-dev-${i}`,
    source: `industry-${i}`,
    target: "devices-circle",
    type:   "animated" as const,
    data:   { color: INDUSTRY_COLORS[i % INDUSTRY_COLORS.length] },
  })),
  {
    id: "hub-plat",
    source: "devices-circle",
    sourceHandle: "right",
    target: "platform",
    type: "animated",
    data: { color: C.device },
  },
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
const ALL_EDGES: Edge[] = [...STATIC_EDGES, ...buildConEdges()];

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
      .arch-flow .react-flow__node[data-id="devices-circle"] { cursor: grab; }
      .arch-flow .react-flow__node[data-id="devices-circle"]:active { cursor: grabbing; }
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
// Mobile fallback
// ─────────────────────────────────────────────────────────────────────────────
const ArchitectureMobile = () => {
  const { theme } = useTheme();
  const logo = theme === "dark" ? darklogo : lightlogo;
  const steps = [
    { title: "Industries",        items: industries,                    color: C.system       },
    { title: "Devices",           items: devices,                       color: C.device       },
    { title: "Connectivity",      items: connectivity,                  color: C.connectivity },
    { title: "Altrex Platform",   items: platform,  isPlatform: true,  color: C.platform     },
    { title: "Enterprise Systems",items: [...hosting, ...services],     color: C.cloud        },
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
          {idx < steps.length - 1 && (
            <div className="absolute top-full left-1/2 h-12 w-0.5 -translate-x-1/2"
              style={{ background: `linear-gradient(to bottom, ${step.color}, ${steps[idx+1].color}40)` }} />
          )}
          <div className="flex w-full flex-col rounded-2xl border bg-[var(--bg-surface)] p-6 shadow-sm"
            style={{ borderColor: `${step.color}30`, borderTop: `4px solid ${step.color}` }}>
            <h3 className="mb-4 text-center text-xs font-bold uppercase tracking-widest" style={{ color: step.color }}>
              {step.title}
            </h3>
            {step.isPlatform ? (
              <div className="flex flex-col items-center">
                <motion.img src={logo} alt="Altrex" className="mb-6 w-24"
                  animate={{ y: [0, -5, 0] }} transition={{ duration: 3, repeat: Infinity }} />
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
            <div className="mt-4 flex h-8 w-8 items-center justify-center rounded-full bg-[var(--bg-surface)] border shadow-sm"
              style={{ borderColor: `${step.color}40` }}>
              <ArrowDown size={14} className="text-[var(--text-muted)]" />
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
  hidden:  { opacity: 0, y: 32 },
  visible: { opacity: 1, y: 0,  transition: { duration: 0.6 } },
};

const Architecture = () => {
  useFlowStyles();
  const [flowNodes, , onNodesChange] = useNodesState(ALL_NODES);
  const [flowEdges, , onEdgesChange] = useEdgesState(ALL_EDGES);
  const sectionRef = useRef<HTMLDivElement>(null);
  const canvasRef  = useRef<HTMLDivElement>(null);
  const isInView   = useInView(sectionRef, { once: true, margin: "-100px" });
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start end", "end start"] });
  const bgY   = useTransform(scrollYProgress, [0, 1], ["0%", "15%"]);
  const cardY = useTransform(scrollYProgress, [0, 1], ["0%", "-8%"]);

  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 1024);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  useEffect(() => {
    const c = canvasRef.current; if (!c) return;
    const obs = new IntersectionObserver(([e]) => c.classList.toggle("flow-active", e.isIntersecting), { threshold: 0.05 });
    obs.observe(c); return () => obs.disconnect();
  }, []);

  useEffect(() => {
    const s = sectionRef.current; if (!s) return;
    const obs = new IntersectionObserver(([e]) => {
      const g = document.getElementById("bg-grid-overlay"); if (!g) return;
      gsap.to(g, { opacity: e.isIntersecting ? 0.8 : 0.3, duration: 0.7, ease: "power2.out" });
    }, { threshold: 0.2 });
    obs.observe(s); return () => obs.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="relative overflow-hidden bg-transparent pt-28">
      <motion.div style={{ y: bgY }} className="pointer-events-none absolute inset-0 -z-10 opacity-60">
        <div className="absolute inset-0"
          style={{
            backgroundImage: "radial-gradient(circle, var(--border-subtle) 1px, transparent 1px)",
            backgroundSize: "32px 32px",
          }} />
      </motion.div>

      <div className="mx-auto max-w-[1650px] px-6">
        <motion.div
          className="mx-auto max-w-3xl text-center"
          initial="hidden" animate={isInView ? "visible" : "hidden"} variants={headerVariants}>
          <motion.div whileHover={{ scale: 1.03 }} className="inline-block">
            <Badge variant="secondary"
              className="border border-[var(--accent-violet)]/20 bg-[var(--accent-violet)]/10 text-[var(--accent-violet)]">
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

        {isMobile ? (
          <ArchitectureMobile />
        ) : (
          <motion.div ref={canvasRef} className="relative mt-16 overflow-hidden" style={{ y: cardY, height: 750 }}>
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
              nodeExtent={[[0, 0], [1600, 750]]}
              proOptions={{ hideAttribution: true }}
            />

            {/* Grid overlay */}
            <svg
              className="pointer-events-none absolute inset-0 h-full w-full"
              style={{
                zIndex: 20,
                WebkitMaskImage: "radial-gradient(ellipse at center, black 30%, transparent 75%)",
                maskImage:        "radial-gradient(ellipse at center, black 30%, transparent 75%)",
              }}
            >
              <defs>
                <pattern id="arch-grid" width="40" height="40" patternUnits="userSpaceOnUse">
                  <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(100,116,139,0.25)" strokeWidth="1" />
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#arch-grid)" />
            </svg>

            {/* Drag hint */}
            <div
              className="absolute bottom-4 right-5 flex items-center gap-2 rounded-full border border-[var(--border-subtle)] bg-[var(--bg-surface)]/80 px-3 py-1.5 backdrop-blur-sm"
              style={{ zIndex: 30, fontSize: 11, color: "var(--text-muted)" }}
            >
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                <path d="M6 2v8M2 6h8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
              </svg>
              Drag devices circle &amp; connectivity nodes
            </div>
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default Architecture;