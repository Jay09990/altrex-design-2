import { useEffect, useRef, memo } from "react";

import { motion, useInView, type Variants } from "framer-motion";

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
  type EdgeProps,
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

/* ─── Color Tokens ───────────────────────────────────────────────────────── */

const C = {
  violet: "#8b5cf6",
  fuchsia: "#d946ef",
  cyan: "#06b6d4",
  orange: "#f97316",
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
  hidden: {
    opacity: 0,
    y: 32,
  },

  visible: {
    opacity: 1,
    y: 0,

    transition: {
      duration: 0.6,
    },
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
      .arch-flow .react-flow__node {
        cursor: grab;
      }

      .arch-flow .react-flow__node:active {
        cursor: grabbing;
      }

      .arch-flow .react-flow__attribution {
        display: none !important;
      }

      .arch-flow .react-flow__renderer {
        background: transparent !important;
      }

      .flow-active .beam-animated {
        animation-play-state: running;
      }

      .beam-animated {
        animation-play-state: paused;
      }

      @keyframes beam-flow {
        from {
          stroke-dashoffset: 120;
        }

        to {
          stroke-dashoffset: 0;
        }
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
  data,
}: EdgeProps) {
  const color = (data?.color as string) ?? C.violet;

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
          strokeWidth: 1.5,
          strokeOpacity: 0.15,
        }}
      />

      <path
        className="beam-animated"
        d={edgePath}
        fill="none"
        stroke={color}
        strokeWidth={2}
        strokeLinecap="round"
        style={{
          strokeDasharray: "5 8",
          strokeDashoffset: 120,
          animationName: "beam-flow",
          animationDuration: `${duration}s`,
          animationTimingFunction: "linear",
          animationIterationCount: "infinite",
          filter: `drop-shadow(0 0 3px ${color}70)`,
        }}
      />
    </>
  );
});

/* ─── Item Node ──────────────────────────────────────────────────────────── */

function ItemNode({ data }: NodeProps<any>) {
  const Icon = data.icon;

  const color = (data.color as string) ?? C.violet;

  return (
    <div
      className="flex min-w-[180px] items-center gap-2.5 rounded-2xl bg-white px-3.5 py-2.5 transition-all duration-200"
      style={{
        border: `1px solid ${color}28`,
        boxShadow: `0 2px 12px rgba(0,0,0,0.06), 0 0 0 1px ${color}08`,
      }}
    >
      <div
        className="flex h-[34px] w-[34px] shrink-0 items-center justify-center rounded-[10px]"
        style={{
          background: `${color}12`,
          border: `1px solid ${color}22`,
        }}
      >
        {Icon && <Icon size={14} color={color} strokeWidth={1.8} />}
      </div>

      <span className="text-xs font-semibold text-gray-700">{data.label}</span>

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

/* ─── Block Node ─────────────────────────────────────────────────────────── */

function BlockNode({ data }: NodeProps<any>) {
  const color = (data.color as string) ?? C.violet;

  return (
    <div
      className="rounded-[20px] bg-white p-[18px]"
      style={{
        width: data.width ?? 240,
        border: `1px solid ${color}18`,
        borderTop: `3px solid ${color}`,
        boxShadow: `0 4px 24px rgba(0,0,0,0.06), 0 0 0 1px ${color}06`,
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
                background: `${color}08`,
                border: `1px solid ${color}16`,
              }}
            >
              {item}
            </div>
          ))}
        </div>
      )}

      {data.variant === "platform" && (
        <div className="grid grid-cols-2 gap-2">
          {(data.items as { icon: any; label: string }[]).map((item, i) => {
            const Icon = item.icon;

            return (
              <div
                key={i}
                className="flex flex-col items-center gap-[6px] rounded-[12px] border border-violet-100 bg-violet-50/60 px-2 py-2.5"
              >
                <div
                  className="flex h-[28px] w-[28px] items-center justify-center rounded-lg"
                  style={{
                    background: `${color}12`,
                    border: `1px solid ${color}20`,
                  }}
                >
                  <Icon size={12} color={color} strokeWidth={1.8} />
                </div>

                <span className="text-center text-[9px] font-semibold leading-tight text-gray-500">
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

/* ─── Registries ─────────────────────────────────────────────────────────── */

const nodeTypes = {
  item: ItemNode,
  block: BlockNode,
};

const edgeTypes = {
  animated: AnimatedEdge,
};

/* ─── Nodes ──────────────────────────────────────────────────────────────── */

const NODES: Node[] = [
  ...industries.map((item, i) => ({
    id: `industry-${i}`,
    type: "item" as const,
    position: {
      x: 20,
      y: 90 + i * 88,
    },
    data: {
      ...item,
      color: C.violet,
    },
  })),

  {
    id: "devices",
    type: "block" as const,
    position: {
      x: 310,
      y: 140,
    },
    data: {
      title: "Devices",
      color: C.violet,
      items: devices,
      width: 230,
      variant: "platform",
    },
  },

  {
    id: "connectivity",
    type: "block" as const,
    position: {
      x: 620,
      y: 110,
    },
    data: {
      title: "Connectivity",
      color: C.fuchsia,
      items: connectivity,
      width: 220,
      variant: "connectivity",
    },
  },

  {
    id: "platform",
    type: "block" as const,
    position: {
      x: 940,
      y: 60,
    },
    data: {
      title: "WV Platform",
      color: C.violet,
      items: platform,
      width: 310,
      variant: "platform",
    },
  },

  ...hosting.map((item, i) => ({
    id: `hosting-${i}`,
    type: "item" as const,
    position: {
      x: 1370,
      y: 160 + i * 150,
    },
    data: {
      ...item,
      color: C.cyan,
    },
  })),

  {
    id: "sap",
    type: "item" as const,
    position: {
      x: 950,
      y: 595,
    },
    data: {
      icon: BriefcaseBusiness,
      label: "SAP",
      color: C.cyan,
    },
  },

  {
    id: "erp",
    type: "item" as const,
    position: {
      x: 1070,
      y: 595,
    },
    data: {
      icon: Database,
      label: "ERP",
      color: C.orange,
    },
  },

  {
    id: "crm",
    type: "item" as const,
    position: {
      x: 1190,
      y: 595,
    },
    data: {
      icon: Users,
      label: "CRM",
      color: C.fuchsia,
    },
  },
];

/* ─── Edges ──────────────────────────────────────────────────────────────── */

const EDGES: Edge[] = [
  ...industries.map((_, i) => ({
    id: `ind-dev-${i}`,
    source: `industry-${i}`,
    target: "devices",
    type: "animated" as const,
    data: {
      color: C.violet,
    },
  })),

  {
    id: "dev-con",
    source: "devices",
    target: "connectivity",
    type: "animated",
    data: {
      color: C.violet,
    },
  },

  {
    id: "con-plat",
    source: "connectivity",
    target: "platform",
    type: "animated",
    data: {
      color: C.fuchsia,
    },
  },

  {
    id: "plat-host-1",
    source: "platform",
    target: "hosting-0",
    type: "animated",
    data: {
      color: C.cyan,
    },
  },

  {
    id: "plat-host-2",
    source: "platform",
    target: "hosting-1",
    type: "animated",
    data: {
      color: C.cyan,
    },
  },

  {
    id: "plat-sap",
    source: "platform",
    sourceHandle: "bottom",
    target: "sap",
    targetHandle: "top",
    type: "animated",
    data: {
      color: C.cyan,
    },
  },

  {
    id: "plat-erp",
    source: "platform",
    sourceHandle: "bottom",
    target: "erp",
    targetHandle: "top",
    type: "animated",
    data: {
      color: C.orange,
    },
  },

  {
    id: "plat-crm",
    source: "platform",
    sourceHandle: "bottom",
    target: "crm",
    targetHandle: "top",
    type: "animated",
    data: {
      color: C.fuchsia,
    },
  },
];

/* ─── Labels ─────────────────────────────────────────────────────────────── */

const LAYER_LABELS = [
  {
    label: "Industries",
    left: "1.5%",
    color: C.violet,
  },

  {
    label: "Devices",
    left: "19%",
    color: C.violet,
  },

  {
    label: "Connectivity",
    left: "38%",
    color: C.fuchsia,
  },

  {
    label: "Platform",
    left: "57%",
    color: C.violet,
  },

  {
    label: "Deployment",
    left: "82%",
    color: C.cyan,
  },
];

function LayerLabels() {
  return (
    <div className="pointer-events-none absolute inset-x-6 top-5 z-10">
      {LAYER_LABELS.map(({ label, left, color }) => (
        <div
          key={label}
          className="absolute flex items-center gap-1.5"
          style={{ left }}
        >
          <span
            className="inline-block h-[6px] w-[6px] shrink-0 rounded-full"
            style={{
              background: color,
            }}
          />

          <span
            className="text-[9px] font-bold uppercase tracking-widest"
            style={{
              color,
              opacity: 0.7,
            }}
          >
            {label}
          </span>
        </div>
      ))}
    </div>
  );
}

/* ─── Live Pulse ─────────────────────────────────────────────────────────── */

function LivePulse() {
  return (
    <div
      className="pointer-events-none absolute bottom-5 left-5 z-10 flex items-center gap-2 rounded-full border border-emerald-200 bg-white/90 px-3 py-1.5 shadow-sm backdrop-blur-sm"
    >
      <span className="relative flex h-2 w-2">
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />

        <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
      </span>

      <span className="text-[10px] font-semibold text-emerald-700">
        Live Data Flow
      </span>
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

  useEffect(() => {
    const canvas = canvasRef.current;

    if (!canvas) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        canvas.classList.toggle("flow-active", entry.isIntersecting);
      },

      {
        threshold: 0.05,
      },
    );

    observer.observe(canvas);

    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden bg-white py-28"
    >
      {/* Background glows */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute left-0 top-0 h-[500px] w-[500px] rounded-full bg-violet-100/50 blur-3xl" />

        <div className="absolute bottom-0 right-0 h-[400px] w-[400px] rounded-full bg-fuchsia-100/40 blur-3xl" />
      </div>

      <div className="mx-auto max-w-[1650px] px-6">
        {/* Header */}
        <motion.div
          className="mx-auto max-w-3xl text-center"
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={headerVariants}
        >
          <motion.div
            whileHover={{
              scale: 1.03,
            }}
            className="inline-block"
          >
            <Badge
              variant="secondary"
              className="border border-violet-200 bg-violet-50 p-4 text-sm font-medium text-violet-700"
            >
              Realtime Architecture
            </Badge>
          </motion.div>

          <h2 className="mt-6 text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
            Built for Distributed{" "}
            <span className="bg-gradient-to-r from-violet-600 to-fuchsia-500 bg-clip-text text-transparent">
              Global Infrastructure
            </span>
          </h2>

          <p className="mt-4 text-lg leading-8 text-gray-500">
            From industrial devices to cloud — every layer connected, secured,
            and orchestrated in realtime.
          </p>
        </motion.div>

        {/* Flow canvas */}
        <div
          ref={canvasRef}
          className="relative mt-20 overflow-hidden rounded-2xl border border-violet-100 bg-violet-50/40"
          style={{
            height: 820,
            boxShadow:
              "0 0 0 1px rgba(139,92,246,0.06), 0 8px 48px rgba(139,92,246,0.08), 0 2px 16px rgba(0,0,0,0.04)",
          }}
        >
          <div className="pointer-events-none absolute inset-x-0 top-0 z-10 h-px bg-gradient-to-r from-transparent via-violet-400/50 to-transparent" />

          <LayerLabels />

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
            defaultViewport={{
              x: 0,
              y: 0,
              zoom: 1,
            }}
            nodesDraggable
            nodesConnectable={false}
            elementsSelectable={false}
            proOptions={{
              hideAttribution: true,
            }}
          >
            <Background
              variant={BackgroundVariant.Dots}
              gap={28}
              size={1.2}
              color="rgba(139,92,246,0.09)"
            />
          </ReactFlow>

          <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-px bg-gradient-to-r from-transparent via-cyan-400/30 to-transparent" />
        </div>
      </div>
    </section>
  );
};

export default Architecture;
