import { useEffect, useRef, memo } from "react";
import { motion, useInView, useScroll, useTransform, type Variants } from "framer-motion";
import { ReactFlow, Background, BackgroundVariant, useNodesState, useEdgesState, Position, Handle, BaseEdge, type Node, type Edge, type NodeProps, type EdgeProps, getBezierPath } from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import { BriefcaseBusiness, Building2, Car, Cloud, Cpu, Database, Factory, FlaskConical, Globe, HeartPulse, Layers3, Monitor, Network, Radio, Server, ShieldCheck, Users, Wifi, Zap, Plug, Settings, Activity, Cable, Code } from "lucide-react";
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
  "ind-dev-0": 4.2, "ind-dev-1": 5.0, "ind-dev-2": 4.6, "ind-dev-3": 5.4, "ind-dev-4": 4.8, "ind-dev-5": 5.2, "ind-dev-6": 4.4,
  "dev-con": 4.5, "con-plat": 5.1, "plat-host": 4.7, "plat-sap": 4.9, "plat-erp": 5.5, "plat-crm": 4.3,
};

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
  { icon: Plug, label: "MODBUS" },
  { icon: Settings, label: "OPC-UA" },
  { icon: Network, label: "ETHERNET" },
  { icon: Activity, label: "PROFINET" },
  { icon: Cable, label: "ETH/IP" },
  { icon: Radio, label: "MQTT" },
  { icon: Code, label: "REST API" },
  { icon: Database, label: "SQL/NOSQL" }
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
const hosting = [{ icon: Server, label: "On-Premise Server" }, { icon: Cloud, label: "Private Cloud" }, { icon: Cloud, label: "Public Cloud" }];
const services = [{ icon: BriefcaseBusiness, label: "SAP" }, { icon: Database, label: "ERP" }, { icon: Users, label: "CRM" }];



// ── Platform Node ─────────────────────────────────────────────────────────────
function PlatformNode({ data }: NodeProps<any>) {
  const { theme } = useTheme();
  const logo = theme === "dark" ? darklogo : lightlogo;
  const SIZE = 360;
  const center = SIZE / 2;
  const RING_R = 125; // Radius for the platform items

  return (
    <div className="relative flex items-center justify-center rounded-full" style={{ width: SIZE, height: SIZE, background: `${C.platform}07`, border: `1.5px solid ${C.platform}` }}>
      {/* Center circle background */}
      <div className="absolute rounded-full bg-[var(--bg-surface)]" style={{ width: 150, height: 150, border: `1.5px solid ${C.platform}` }} />

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
            style={{ left: x, top: y, transform: 'translate(-50%, -50%)' }}
          >
            <div
              className="flex h-11 w-11 items-center justify-center rounded-xl bg-[var(--bg-surface)] border border-[var(--border-subtle)] shadow-md transition-transform hover:scale-110"
              style={{ boxShadow: `0 2px 10px ${C.platform}25, 0 0 0 1px ${C.platform}12` }}
            >
              <Icon size={22} color={C.platform} strokeWidth={2} />
            </div>
            <span className="whitespace-nowrap rounded border border-black/[0.04] bg-[var(--bg-surface)]/90 px-1 py-[3px] text-[10px] font-bold uppercase tracking-tighter text-[var(--text-secondary)]">
              {item.label}
            </span>
          </div>
        );
      })}

      <Handle type="target" position={Position.Left} style={{ left: -1, top: "50%", opacity: 0 }} />
      <Handle type="source" position={Position.Right} id="right" style={{ right: -1, top: "50%", opacity: 0 }} />
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
      className="flex min-w-[155px] items-center gap-2.5 rounded-xl bg-[var(--bg-surface)] px-3 py-2.5 transition-all duration-200"
      style={{ border: `1px solid ${color}15`, boxShadow: `0 0 0 1px ${color}04, 0 4px 16px rgba(0,0,0,0.05), 0 0 10px ${color}05` }}
    >
      <div className="flex h-[30px] w-[30px] shrink-0 items-center justify-center rounded-lg" style={{ background: `${iconColor}15`, border: `1px solid ${iconColor}30` }}>
        {Icon && <Icon size={16} color={iconColor} strokeWidth={1.8} />}
      </div>
      <div className="flex min-w-0 flex-col gap-[3px]">
        <span className="text-sm font-semibold leading-none text-[var(--text-primary)]">{data.label}</span>
        <span className="font-mono text-[9px] leading-none uppercase tracking-widest text-[var(--text-muted)]">◉ STATUS:ACTIVE</span>
      </div>
      <Handle type="target" position={Position.Left} style={{ opacity: 0 }} />
      <Handle type="source" position={Position.Right} style={{ opacity: 0 }} />
      <Handle type="target" position={Position.Top} style={{ opacity: 0 }} id="top" />
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
        minHeight: isDevices ? 340 : "auto"
      }}
    >
      <p className="mb-3.5 text-center text-[12px] font-bold uppercase tracking-widest" style={{ color }}>{data.title}</p>
      {data.variant === "connectivity" && (
        <div className="flex flex-col gap-[6px]">
          {(data.items as string[]).map((item, i) => (
            <div
              key={i}
              className="rounded-[9px] px-3 py-[6px] text-center text-[13px] font-semibold"
              style={{
                color,
                background: isDark ? `rgba(255,255,255,0.04)` : `rgba(0,0,0,0.02)`,
                border: `1px solid ${color}15`
              }}
            >
              {item}
            </div>
          ))}
        </div>
      )}
      {data.variant === "platform" && (
        <div className={`grid gap-2 ${isDevices ? "grid-cols-1" : "grid-cols-2"}`}>
          {(data.items as { icon: any; label: string }[]).map((item, i) => {
            const Icon = item.icon;
            return (
              <div key={i} className="flex flex-col items-center gap-[6px] rounded-[12px] border border-[var(--border-subtle)] bg-[var(--bg-raised)] px-2 py-2.5 shadow-sm">
                <div className="flex h-[28px] w-[28px] items-center justify-center rounded-lg" style={{ background: `${iconColor}15`, border: `1px solid ${iconColor}30` }}>
                  <Icon size={15} color={iconColor} strokeWidth={1.8} />
                </div>
                <span className="text-center text-[11px] font-semibold leading-tight text-[var(--text-secondary)]">{item.label}</span>
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

// ── Merged Devices & Connectivity Node ────────────────────────────────────────
function MergedHubNode({ data }: NodeProps<any>) {
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const color = isDark ? "#ffffff" : "#18181b";
  const devItems = data.devices as { icon: any; label: string }[];
  const conItems = data.connectivity as { icon: any; label: string }[];

  const SIZE = 360;
  const center = SIZE / 2;
  const RING_R = 125; // Radius for connectivity items, same as PlatformNode

  return (
    <div
      className="relative flex items-center justify-center rounded-full"
      style={{
        width: SIZE,
        height: SIZE,
        background: isDark ? `rgba(255, 255, 255, 0.02)` : `rgba(0, 0, 0, 0.01)`,
        border: `1.5px solid ${color}25`,
        boxShadow: `0 4px 24px rgba(0,0,0,0.06), 0 0 0 1px ${color}06`,
      }}
    >
      {/* Center circle background */}
      <div
        className="absolute rounded-full bg-[var(--bg-surface)] flex items-center justify-center"
        style={{
          width: 176,
          height: 176,
          border: `1.5px solid ${color}35`,
          boxShadow: `0 0 12px ${color}10`,
        }}
      >
        {/* Device grid 2x2 */}
        <div className="grid grid-cols-2 grid-rows-2 w-[114px] h-[114px] gap-2">
          {devItems.map((item, i) => {
            const Icon = item.icon;
            return (
              <div
                key={`dev-${i}`}
                className="flex flex-col items-center justify-center p-1 rounded-lg transition-all duration-200 hover:scale-105"
              >
                <div
                  className="flex h-7 w-7 items-center justify-center rounded-lg bg-[var(--bg-surface)] border"
                  style={{
                    borderColor: `${C.device}35`,
                    background: `${C.device}10`,
                    boxShadow: `0 1px 4px ${C.device}12`,
                  }}
                >
                  <Icon size={14} color={C.device} strokeWidth={2} />
                </div>
                <span
                  className="mt-1 text-center font-bold uppercase tracking-tighter text-[var(--text-secondary)]"
                  style={{ fontSize: '7.5px', lineHeight: '1.1', maxWidth: '60px' }}
                >
                  {item.label}
                </span>
              </div>
            );
          })}
        </div>

        {/* HUB Badge in the center */}
        <div className="absolute pointer-events-none flex items-center justify-center">
          <span
            className="rounded-full px-2 py-[2px] text-[8px] font-black uppercase tracking-[0.2em]"
            style={{
              color: isDark ? "#000000" : "#ffffff",
              background: isDark ? "#ffffff" : "#18181b",
              border: `1px solid ${color}40`,
              boxShadow: "0 2px 6px rgba(0,0,0,0.15)",
              opacity: 0.95,
            }}
          >
            HUB
          </span>
        </div>
      </div>

      {/* Items arranged in a ring */}
      {conItems.map((item, i) => {
        const angle = (i / conItems.length) * Math.PI * 2;
        const x = center + Math.cos(angle) * RING_R;
        const y = center + Math.sin(angle) * RING_R;
        const Icon = item.icon;
        return (
          <div
            key={`con-${i}`}
            className="absolute z-20 flex flex-col items-center gap-[4px]"
            style={{ left: x, top: y, transform: 'translate(-50%, -50%)' }}
          >
            <div
              className="flex h-11 w-11 items-center justify-center rounded-xl bg-[var(--bg-surface)] border shadow-sm transition-transform hover:scale-115"
              style={{
                borderColor: `${C.connectivity}35`,
                background: `${C.connectivity}10`,
                boxShadow: `0 2px 8px ${C.connectivity}18, 0 0 0 1px ${C.connectivity}08`,
              }}
            >
              <Icon size={20} color={C.connectivity} strokeWidth={2} />
            </div>
            <span
              className="whitespace-nowrap rounded border bg-[var(--bg-surface)]/90 px-1.5 py-[2px] text-[8px] font-bold uppercase tracking-tighter text-[var(--text-secondary)]"
              style={{ borderColor: isDark ? `rgba(255,255,255,0.08)` : `rgba(0,0,0,0.06)` }}
            >
              {item.label}
            </span>
          </div>
        );
      })}

      <Handle type="target" position={Position.Left} style={{ opacity: 0, left: -1, top: '50%' }} />
      <Handle type="source" position={Position.Right} style={{ opacity: 0, right: -1, top: '50%' }} />
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
        boxShadow: `0 4px 24px rgba(0,0,0,0.05), 0 0 0 1px ${color}04`
      }}
    >
      <p className="mb-3 text-center text-[12px] font-bold uppercase tracking-widest" style={{ color }}>{title}</p>
      <div className="flex flex-col gap-2">
        {(data.items as { icon: any; label: string }[]).map((item, i) => {
          const Icon = item.icon;
          return (
            <div
              key={i}
              className="flex items-center gap-2.5 rounded-[10px] px-2.5 py-2.5"
              style={{
                background: isDark ? `rgba(255,255,255,0.03)` : `rgba(0,0,0,0.02)`,
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
                <span className="text-[13px] font-semibold leading-none text-[var(--text-primary)]">{item.label}</span>
                <span className="font-mono text-[9px] leading-none uppercase tracking-widest text-[var(--text-muted)]">◉ ACTIVE</span>
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
const AnimatedEdge = memo(function AnimatedEdge({ id, sourceX, sourceY, targetX, targetY, sourcePosition, targetPosition }: EdgeProps) {
  const color = C.edge;
  const duration = EDGE_DURATIONS[id] ?? 5;
  const [edgePath] = getBezierPath({ sourceX, sourceY, targetX, targetY, sourcePosition, targetPosition });
  return (
    <>
      <BaseEdge id={id} path={edgePath} style={{ stroke: color, strokeWidth: 1.5, strokeOpacity: 0.15 }} />
      <path className="beam-animated" d={edgePath} fill="none" stroke={color} strokeWidth={2} strokeLinecap="round" style={{ strokeDasharray: "4 12", strokeDashoffset: 120, animationName: "beam-flow", animationDuration: `${duration}s`, animationTimingFunction: "linear", animationIterationCount: "infinite" }} />
    </>
  );
});

/** Perfectly straight line — used for ERP so the edge has zero curvature */
const StraightAnimatedEdge = memo(function ({ id, sourceX, sourceY, targetX, targetY }: EdgeProps) {
  const color = C.edge;
  const duration = EDGE_DURATIONS[id] ?? 5;
  const edgePath = `M ${sourceX},${sourceY} L ${targetX},${targetY}`;
  return (
    <>
      <BaseEdge id={id} path={edgePath} style={{ stroke: color, strokeWidth: 1.5, strokeOpacity: 0.15 }} />
      <path className="beam-animated" d={edgePath} fill="none" stroke={color} strokeWidth={2} strokeLinecap="round" style={{ strokeDasharray: "4 12", strokeDashoffset: 120, animationName: "beam-flow", animationDuration: `${duration}s`, animationTimingFunction: "linear", animationIterationCount: "infinite" }} />
    </>
  );
});

const nodeTypes: any = { item: ItemNode, block: BlockNode, platform: PlatformNode, "list-group": GroupNode, "merged-hub": MergedHubNode };
const edgeTypes: any = { animated: AnimatedEdge, "straight-animated": StraightAnimatedEdge };

// ── Node layout ───────────────────────────────────────────────────────────────
const NODES: Node[] = [
  // Industries — tighter 70 px pitch
  ...industries.map((item, i) => ({
    id: `industry-${i}`,
    type: "item" as const,
    position: { x: 40, y: 60 + i * 70 },
    data: { ...item, color: C.source },
  })),
  {
    id: "merged-hub",
    type: "merged-hub" as const,
    position: { x: 310, y: 100 },
    data: { devices: devices, connectivity: connectivity }
  },
  { id: "platform", type: "platform" as const, position: { x: 760, y: 120 }, data: { items: platform } },
  { id: "hosting", type: "list-group" as const, position: { x: 1180, y: 45 }, data: { items: hosting, title: "Hosting", color: C.cloud } },
  { id: "services", type: "list-group" as const, position: { x: 1180, y: 280 }, data: { items: services, title: "Enterprise Services", color: C.platform } },
];

const EDGES: Edge[] = [
  ...industries.map((_, i) => ({ id: `ind-dev-${i}`, source: `industry-${i}`, target: "merged-hub", type: "animated" as const })),
  { id: "hub-plat", source: "merged-hub", target: "platform", type: "animated" },
  { id: "plat-host", source: "platform", sourceHandle: "right", target: "hosting", type: "animated" },
  { id: "plat-serv", source: "platform", sourceHandle: "right", target: "services", type: "animated" },
];

const headerVariants: Variants = { hidden: { opacity: 0, y: 32 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6 } } };

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
      @keyframes beam-flow { from { stroke-dashoffset: 120; } to { stroke-dashoffset: 0; } }
      @keyframes spin-cw { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
      @keyframes spin-ccw { from { transform: rotate(360deg); } to { transform: rotate(0deg); } }
      .animate-spin-slow { animation: spin-cw 30s linear infinite; }
      .animate-spin-slow-reverse { animation: spin-ccw 30s linear infinite; }
    `;
    document.head.appendChild(style);
  }, []);
}

// ── Architecture section ───────────────────────────────────────────────────────
const Architecture = () => {
  useFlowStyles();
  const [flowNodes, , onNodesChange] = useNodesState(NODES);
  const [flowEdges, , onEdgesChange] = useEdgesState(EDGES);
  const sectionRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start end", "end start"] });
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "15%"]);
  const cardY = useTransform(scrollYProgress, [0, 1], ["0%", "-8%"]);
  const labelY = useTransform(scrollYProgress, [0, 1], ["0%", "-20%"]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const observer = new IntersectionObserver(([e]) => { canvas.classList.toggle("flow-active", e.isIntersecting); }, { threshold: 0.05 });
    observer.observe(canvas);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    const observer = new IntersectionObserver(([e]) => {
      const grid = document.getElementById("bg-grid-overlay");
      if (!grid) return;
      if (e.isIntersecting) { gsap.to(grid, { opacity: 0.8, duration: 0.8, ease: "power2.out" }); }
      else { gsap.to(grid, { opacity: 0.3, duration: 0.6, ease: "power2.out" }); }
    }, { threshold: 0.2 });
    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="relative overflow-hidden bg-transparent py-28">
      <motion.div style={{ y: bgY }} className="pointer-events-none absolute inset-0 -z-10 opacity-60">
        <div className="absolute inset-0" style={{ backgroundImage: "radial-gradient(circle, var(--border-subtle) 1px, transparent 1px)", backgroundSize: "32px 32px" }} />
      </motion.div>

      <div className="mx-auto max-w-[1650px] px-6">
        <motion.div className="mx-auto max-w-3xl text-center" initial="hidden" animate={isInView ? "visible" : "hidden"} variants={headerVariants}>
          <motion.div whileHover={{ scale: 1.03 }} className="inline-block">
            <Badge variant="secondary" className="border border-[var(--accent-violet)]/20 bg-[var(--accent-violet)]/10 text-[var(--accent-violet)]">Realtime Architecture</Badge>
          </motion.div>
          <h2 className="mt-6 text-4xl font-bold uppercase tracking-tighter text-[var(--text-primary)] sm:text-5xl">BUILT FOR DISTRIBUTED <span className="text-[var(--accent-violet)]">GLOBAL INFRASTRUCTURE</span></h2>
          <p className="mt-4 text-lg leading-8 text-[var(--text-secondary)]">From industrial devices to cloud — every layer connected, secured, and orchestrated in realtime.</p>
        </motion.div>

        <motion.div
          ref={canvasRef}
          className="relative mt-16 overflow-hidden rounded-xl bg-[var(--bg-surface)]"
          style={{ y: cardY, height: 600, border: "1px solid var(--border-subtle)", boxShadow: "0 0 0 1px rgba(0,0,0,0.04), 0 8px 60px rgba(0,0,0,0.06), 0 0 50px var(--accent-glow)" }}
        >
          <motion.div style={{ y: labelY }} className="pointer-events-none absolute left-6 top-6 z-20 hidden lg:block"><div className="rounded-2xl border border-black/[0.08] bg-[var(--bg-surface)]/90 px-4 py-3 font-mono text-[12px] tracking-widest text-[var(--text-secondary)] backdrop-blur-sm">[STACK: LAYERED]</div></motion.div>
          <motion.div style={{ y: labelY }} className="pointer-events-none absolute right-6 top-6 z-20 hidden lg:block"><div className="rounded-2xl border border-black/[0.08] bg-[var(--bg-surface)]/90 px-4 py-3 font-mono text-[12px] tracking-widest text-[var(--text-secondary)] backdrop-blur-sm">[PARALLAX: ON]</div></motion.div>

          <div className="border-b border-black/[0.06] bg-[var(--bg-void)]">
            <div className="flex items-center justify-between px-5 py-2">
              <div className="flex items-center gap-3">
                <div className="flex gap-1.5"><span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" /><span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" /><span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" /></div>
                <div className="h-3 w-px bg-black/[0.08]" /><span className="font-mono text-[12px] text-[var(--text-muted)]">altrex@arch:~${" "}<span className="text-[var(--accent-violet)]">./run_topology</span>{" "}--env=prod --realtime</span>
              </div>
              <div className="flex items-center gap-4">
                <span className="font-mono text-[11px] text-[var(--text-muted)]">NODES <span className="text-[var(--accent-violet)]">12</span></span>
                <span className="font-mono text-[11px] text-[var(--text-muted)]">EDGES <span className="text-[var(--accent-fuchsia)]">11</span></span>
                <div className="h-3 w-px bg-black/[0.08]" /><div className="flex items-center gap-1.5"><span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[var(--data-green)]" /><span className="font-mono text-[11px] tracking-widest text-[var(--data-green)] uppercase">LIVE</span></div>
              </div>
            </div>
            <div className="flex items-center gap-5 border-t border-black/[0.06] bg-black/[0.02] px-5 py-[5px]">
              <span className="font-mono text-[10px] text-[var(--text-muted)]"><span className="text-[var(--accent-violet)]">▶</span> TOPOLOGY_ACTIVE</span>
              <span className="font-mono text-[10px] text-[var(--text-muted)]">PROTO: <span className="text-[var(--data-green)]">MQTT · OPC-UA · REST</span></span>
              <span className="font-mono text-[10px] text-[var(--text-muted)]">SEC: <span className="text-[var(--data-green)]">TLS 1.3</span></span>
              <span className="font-mono text-[10px] text-[var(--text-muted)]">UPTIME: <span className="text-[var(--text-secondary)]">99.97%</span></span>
            </div>
          </div>

          <div className="pointer-events-none absolute inset-x-0 top-[63px] z-10 h-px bg-gradient-to-r from-transparent via-[var(--accent-violet)]/40 to-transparent" />


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
            elementsSelectable={true}
            nodeExtent={[[0, 0], [1600, 520]]}
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
