import { useEffect, useRef, memo } from "react";
import { motion, useInView, useScroll, useTransform, type Variants } from "framer-motion";
import { ReactFlow, Background, BackgroundVariant, useNodesState, useEdgesState, Position, Handle, BaseEdge, type Node, type Edge, type NodeProps, type EdgeProps, getBezierPath } from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import { BriefcaseBusiness, Building2, Car, Cloud, Cpu, Database, Factory, FlaskConical, Globe, HeartPulse, Layers3, Monitor, Network, Radio, Server, ShieldCheck, Users, Wifi, Zap } from "lucide-react";
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
const connectivity = ["MODBUS", "OPC UA / DA", "Ethernet", "ProfiNet", "Ethernet/IP", "MQTT", "REST API", "SQL / NoSQL DB"];
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
const hosting = [{ icon: Server, label: "On-Premise Server" }, { icon: Cloud, label: "Private / Public Cloud" }];

// ── Octagon geometry (420 × 420 node) ────────────────────────────────────────
const OCT_W = 420, OCT_H = 420;
const OCT_CX = OCT_W / 2, OCT_CY = OCT_H / 2; // = 210, 210

// Vertices follow the same percentages as the clipPath: 30%/70%
const OCT_VERTS: [number, number][] = [
  [126, 0], [294, 0],   // top edge
  [420, 126], [420, 294], // right edge
  [294, 420], [126, 420], // bottom edge
  [0, 294], [0, 126],   // left edge
];

// Centroid of each triangular slice (center + two consecutive vertices)
const OCT_CENTROIDS: [number, number][] = OCT_VERTS.map((v, i) => {
  const v2 = OCT_VERTS[(i + 1) % 8];
  return [(OCT_CX + v[0] + v2[0]) / 3, (OCT_CY + v[1] + v2[1]) / 3];
});

// ── Platform Node ─────────────────────────────────────────────────────────────
function PlatformNode({ data }: NodeProps<any>) {
  const { theme } = useTheme();
  const logo = theme === "dark" ? darklogo : lightlogo;

  return (
    <div className="relative flex items-center justify-center" style={{ width: OCT_W, height: OCT_H }}>
      {/* SVG layer: filled octagon + slice dividers + center circle */}
      <svg
        viewBox={`0 0 ${OCT_W} ${OCT_H}`}
        className="absolute inset-0 h-full w-full pointer-events-none"
      >
        {/* Octagon fill */}
        <polygon
          points={OCT_VERTS.map(v => v.join(",")).join(" ")}
          fill={`${C.platform}07`}
          stroke={C.platform}
          strokeWidth="1.5"
        />
        {/* Radial dividers — one line per vertex from center */}
        {OCT_VERTS.map(([vx, vy], i) => (
          <line
            key={i}
            x1={OCT_CX} y1={OCT_CY}
            x2={vx} y2={vy}
            stroke={C.platform}
            strokeWidth="0.7"
            strokeOpacity="0.35"
          />
        ))}
        {/* Center circle background */}
        <circle
          cx={OCT_CX} cy={OCT_CY} r="88"
          fill="var(--bg-surface)"
          stroke={C.platform}
          strokeWidth="1.5"
        />
      </svg>

      {/* Company logo — infinite glide up/down */}
      <motion.img
        src={logo}
        alt="Altrex"
        className="z-10 w-28 drop-shadow-xl"
        style={{ position: "absolute" }}
        animate={{ y: [0, -8, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Icons inside each of the 8 slices */}
      {data.items.map((item: any, i: number) => {
        const [cx, cy] = OCT_CENTROIDS[i];
        const dx = cx - OCT_CX;
        const dy = cy - OCT_CY;
        const Icon = item.icon;
        return (
          <div
            key={i}
            className="absolute left-1/2 top-1/2 z-20 flex flex-col items-center gap-[5px]"
            style={{ transform: `translate(calc(-50% + ${dx}px), calc(-50% + ${dy}px))` }}
          >
            <div
              className="flex h-9 w-9 items-center justify-center rounded-lg bg-[var(--bg-surface)] border border-[var(--border-subtle)] shadow-md transition-transform hover:scale-110"
              style={{ boxShadow: `0 2px 10px ${C.platform}25, 0 0 0 1px ${C.platform}12` }}
            >
              <Icon size={15} color={C.platform} strokeWidth={2} />
            </div>
            <span className="whitespace-nowrap rounded border border-black/[0.04] bg-[var(--bg-surface)]/90 px-1 py-[3px] text-[7.5px] font-bold uppercase tracking-tighter text-[var(--text-secondary)]">
              {item.label}
            </span>
          </div>
        );
      })}

      <Handle type="target" position={Position.Left} style={{ left: 0, top: "50%", opacity: 0 }} />
      <Handle type="source" position={Position.Right} style={{ right: 0, top: "50%", opacity: 0 }} />
      <Handle type="source" position={Position.Bottom} style={{ bottom: 0, left: "50%", opacity: 0 }} id="bottom" />
    </div>
  );
}

// ── Item Node ─────────────────────────────────────────────────────────────────
function ItemNode({ data }: NodeProps<any>) {
  const Icon = data.icon;
  const color = (data.color as string) ?? C.source;
  return (
    <div
      className="flex min-w-[155px] items-center gap-2.5 rounded-xl bg-[var(--bg-surface)] px-3 py-2.5 transition-all duration-200"
      style={{ border: `1px solid ${color}28`, boxShadow: `0 0 0 1px ${color}06, 0 4px 16px rgba(0,0,0,0.06), 0 0 10px ${color}08` }}
    >
      <div className="flex h-[30px] w-[30px] shrink-0 items-center justify-center rounded-lg" style={{ background: `${color}10`, border: `1px solid ${color}22` }}>
        {Icon && <Icon size={13} color={color} strokeWidth={1.8} />}
      </div>
      <div className="flex min-w-0 flex-col gap-[3px]">
        <span className="text-xs font-semibold leading-none text-[var(--text-primary)]">{data.label}</span>
        <span className="font-mono text-[7px] leading-none uppercase tracking-widest" style={{ color: `${color}65` }}>◉ STATUS:ACTIVE</span>
      </div>
      <Handle type="target" position={Position.Left} style={{ opacity: 0 }} />
      <Handle type="source" position={Position.Right} style={{ opacity: 0 }} />
      <Handle type="target" position={Position.Top} style={{ opacity: 0 }} id="top" />
    </div>
  );
}

// ── Block Node ────────────────────────────────────────────────────────────────
function BlockNode({ data }: NodeProps<any>) {
  const color = (data.color as string) ?? C.source;
  const isDevices = data.title === "Devices";
  return (
    <div
      className="rounded-[20px] bg-[var(--bg-surface)] p-[18px] shadow-sm"
      style={{ width: data.width ?? 240, border: `1px solid ${color}18`, borderTop: `3px solid ${color}`, boxShadow: `0 4px 24px rgba(0,0,0,0.06), 0 0 0 1px ${color}06`, minHeight: isDevices ? 340 : "auto" }}
    >
      <p className="mb-3.5 text-center text-[10px] font-bold uppercase tracking-widest" style={{ color }}>{data.title}</p>
      {data.variant === "connectivity" && (
        <div className="flex flex-col gap-[6px]">
          {(data.items as string[]).map((item, i) => (
            <div key={i} className="rounded-[9px] px-3 py-[6px] text-center text-[11px] font-semibold" style={{ color, background: `${color}08`, border: `1px solid ${color}16` }}>{item}</div>
          ))}
        </div>
      )}
      {data.variant === "platform" && (
        <div className={`grid gap-2 ${isDevices ? "grid-cols-1" : "grid-cols-2"}`}>
          {(data.items as { icon: any; label: string }[]).map((item, i) => {
            const Icon = item.icon;
            return (
              <div key={i} className="flex flex-col items-center gap-[6px] rounded-[12px] border border-black/[0.06] bg-black/5 px-2 py-2.5 shadow-sm">
                <div className="flex h-[28px] w-[28px] items-center justify-center rounded-lg" style={{ background: `${color}12`, border: `1px solid ${color}20` }}>
                  <Icon size={12} color={color} strokeWidth={1.8} />
                </div>
                <span className="text-center text-[9px] font-semibold leading-tight text-[var(--text-secondary)]">{item.label}</span>
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

// ── Hosting Node (combined On-Premise + Private/Public Cloud) ─────────────────
function HostingNode({ data }: NodeProps<any>) {
  const color = C.cloud;
  return (
    <div
      className="rounded-[18px] bg-[var(--bg-surface)] p-[14px] shadow-sm"
      style={{ width: 225, border: `1px solid ${color}20`, borderTop: `3px solid ${color}`, boxShadow: `0 4px 24px rgba(0,0,0,0.06), 0 0 0 1px ${color}06` }}
    >
      <p className="mb-3 text-center text-[10px] font-bold uppercase tracking-widest" style={{ color }}>Hosting</p>
      <div className="flex flex-col gap-2">
        {(data.items as { icon: any; label: string }[]).map((item, i) => {
          const Icon = item.icon;
          return (
            <div key={i} className="flex items-center gap-2.5 rounded-[10px] px-2.5 py-2.5" style={{ background: `${color}08`, border: `1px solid ${color}16` }}>
              <div className="flex h-[28px] w-[28px] shrink-0 items-center justify-center rounded-lg" style={{ background: `${color}12`, border: `1px solid ${color}22` }}>
                <Icon size={12} color={color} strokeWidth={1.8} />
              </div>
              <div className="flex flex-col gap-[2px]">
                <span className="text-[11px] font-semibold leading-none text-[var(--text-primary)]">{item.label}</span>
                <span className="font-mono text-[7px] leading-none uppercase tracking-widest" style={{ color: `${color}65` }}>◉ ACTIVE</span>
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

const nodeTypes: any = { item: ItemNode, block: BlockNode, platform: PlatformNode, hosting: HostingNode };
const edgeTypes: any = { animated: AnimatedEdge, "straight-animated": StraightAnimatedEdge };

// ── Node layout ───────────────────────────────────────────────────────────────
// Platform center-x = 880 + 420/2 = 1090
// ERP top-handle center-x = 1013 + 155/2 ≈ 1090  →  perfectly vertical edge
// SAP/CRM spaced 220 px from ERP center  →  centers at 870 and 1310
const NODES: Node[] = [
  // Industries — tighter 70 px pitch
  ...industries.map((item, i) => ({
    id: `industry-${i}`,
    type: "item" as const,
    position: { x: 40, y: 90 + i * 70 },
    data: { ...item, color: C.source },
  })),
  { id: "devices", type: "block" as const, position: { x: 320, y: 190 }, data: { title: "Devices", color: C.device, items: devices, width: 200, variant: "platform" } },
  { id: "connectivity", type: "block" as const, position: { x: 600, y: 220 }, data: { title: "Connectivity", color: C.connectivity, items: connectivity, width: 200, variant: "connectivity" } },
  { id: "platform", type: "platform" as const, position: { x: 880, y: 188 }, data: { items: platform } },
  // Combined hosting node
  { id: "hosting", type: "hosting" as const, position: { x: 1354, y: 212 }, data: { items: hosting } },
  // SAP / ERP / CRM — further below, ERP centred under platform
  { id: "sap", type: "item" as const, position: { x: 793, y: 768 }, data: { icon: BriefcaseBusiness, label: "SAP", color: C.system } },
  { id: "erp", type: "item" as const, position: { x: 1013, y: 768 }, data: { icon: Database, label: "ERP", color: C.system } },
  { id: "crm", type: "item" as const, position: { x: 1233, y: 768 }, data: { icon: Users, label: "CRM", color: C.system } },
];

const EDGES: Edge[] = [
  ...industries.map((_, i) => ({ id: `ind-dev-${i}`, source: `industry-${i}`, target: "devices", type: "animated" as const })),
  { id: "dev-con", source: "devices", target: "connectivity", type: "animated" },
  { id: "con-plat", source: "connectivity", target: "platform", type: "animated" },
  { id: "plat-host", source: "platform", target: "hosting", type: "animated" },
  { id: "plat-sap", source: "platform", sourceHandle: "bottom", target: "sap", targetHandle: "top", type: "animated" },
  // straight-animated → perfectly vertical, no curve
  { id: "plat-erp", source: "platform", sourceHandle: "bottom", target: "erp", targetHandle: "top", type: "animated"},
  { id: "plat-crm", source: "platform", sourceHandle: "bottom", target: "crm", targetHandle: "top", type: "animated" },
];

// ── LivePulse overlay ─────────────────────────────────────────────────────────
function LivePulse() {
  return (
    <div className="pointer-events-none absolute bottom-4 left-4 z-10 flex flex-col gap-1.5 rounded-lg border border-black/[0.08] bg-[var(--bg-surface)]/95 px-3.5 py-2.5 shadow-lg backdrop-blur-sm">
      <div className="flex items-center gap-2">
        <span className="relative flex h-1.5 w-1.5"><span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" /><span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-400" /></span>
        <span className="font-mono text-[9px] uppercase tracking-widest text-emerald-400">STREAM ACTIVE</span>
      </div>
      <div className="flex flex-col gap-[3px] border-t border-black/[0.06] pt-1.5">
        <span className="font-mono text-[8px] text-[var(--text-muted)]"><span className="text-emerald-500/50">▸</span> PKT/S <span className="text-[var(--text-secondary)]">4.2k</span></span>
        <span className="font-mono text-[8px] text-[var(--text-muted)]"><span className="text-emerald-500/50">▸</span> LATENCY <span className="text-[var(--text-secondary)]">2ms</span></span>
      </div>
    </div>
  );
}

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
          style={{ y: cardY, height: 960, border: "1px solid var(--border-subtle)", boxShadow: "0 0 0 1px rgba(0,0,0,0.04), 0 8px 60px rgba(0,0,0,0.06), 0 0 50px var(--accent-glow)" }}
        >
          <motion.div style={{ y: labelY }} className="pointer-events-none absolute left-6 top-6 z-20 hidden lg:block"><div className="rounded-2xl border border-black/[0.08] bg-white/75 px-4 py-3 font-mono text-[10px] tracking-widest text-[var(--text-secondary)] backdrop-blur-sm">[STACK: LAYERED]</div></motion.div>
          <motion.div style={{ y: labelY }} className="pointer-events-none absolute right-6 top-6 z-20 hidden lg:block"><div className="rounded-2xl border border-black/[0.08] bg-white/75 px-4 py-3 font-mono text-[10px] tracking-widest text-[var(--text-secondary)] backdrop-blur-sm">[PARALLAX: ON]</div></motion.div>

          <div className="border-b border-black/[0.06] bg-[var(--bg-void)]">
            <div className="flex items-center justify-between px-5 py-2">
              <div className="flex items-center gap-3">
                <div className="flex gap-1.5"><span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" /><span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" /><span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" /></div>
                <div className="h-3 w-px bg-black/[0.08]" /><span className="font-mono text-[10px] text-[var(--text-muted)]">altrex@arch:~${" "}<span className="text-[var(--accent-violet)]">./run_topology</span>{" "}--env=prod --realtime</span>
              </div>
              <div className="flex items-center gap-4">
                <span className="font-mono text-[9px] text-[var(--text-muted)]">NODES <span className="text-[var(--accent-violet)]">13</span></span>
                <span className="font-mono text-[9px] text-[var(--text-muted)]">EDGES <span className="text-[var(--accent-fuchsia)]">10</span></span>
                <div className="h-3 w-px bg-black/[0.08]" /><div className="flex items-center gap-1.5"><span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[var(--data-green)]" /><span className="font-mono text-[9px] tracking-widest text-[var(--data-green)] uppercase">LIVE</span></div>
              </div>
            </div>
            <div className="flex items-center gap-5 border-t border-black/[0.06] bg-black/[0.02] px-5 py-[5px]">
              <span className="font-mono text-[8px] text-[var(--text-muted)]"><span className="text-[var(--accent-violet)]">▶</span> TOPOLOGY_ACTIVE</span>
              <span className="font-mono text-[8px] text-[var(--text-muted)]">PROTO: <span className="text-[var(--data-green)]">MQTT · OPC-UA · REST</span></span>
              <span className="font-mono text-[8px] text-[var(--text-muted)]">SEC: <span className="text-[var(--data-green)]">TLS 1.3</span></span>
              <span className="font-mono text-[8px] text-[var(--text-muted)]">UPTIME: <span className="text-[var(--text-secondary)]">99.97%</span></span>
            </div>
          </div>

          <div className="pointer-events-none absolute inset-x-0 top-[63px] z-10 h-px bg-gradient-to-r from-transparent via-[var(--accent-violet)]/40 to-transparent" />
          <div className="pointer-events-none absolute inset-0 z-[5]" style={{ background: "repeating-linear-gradient(0deg, transparent, transparent 3px, rgba(0,0,0,0.04) 3px, rgba(0,0,0,0.04) 4px)" }} />

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
            elementsSelectable={true}
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
