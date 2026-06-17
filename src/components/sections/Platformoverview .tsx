import { useState, useEffect, useRef, useCallback } from "react";
import {
  motion,
  AnimatePresence,
  useInView,
  type Variants,
} from "framer-motion";
import {
  BarChart3,
  Map,
  Bell,
  TrendingUp,
  Smartphone,
  Link2,
  Users,
  FileText,
  ArrowRight,
  ChevronRight,
  Sparkles,
  Activity,
} from "lucide-react";
import { Badge } from "../ui/badge";
import { useTheme } from "@/hooks/useTheme";
import InViewDecryptedText from "../InViewDecryptedText";
import { Button } from "../ui/button";

// ─── Brand tokens ──────────────────────────────────────────────────────────
const ORANGE = "#e8651a";
const NAVY = "#1c3375";

// ─── Feature definitions ──────────────────────────────────────────────────
const FEATURES = [
  {
    id: "dashboards",
    icon: BarChart3,
    label: "Dashboards",
    tagline: "Operations at a glance.",
    color: "#3b82f6",
    segment: "Real-time KPI views across every site, shift, and system.",
    preview: "chart",
    metric: { value: "512", unit: "live tags" },
    tags: ["Real-time", "Multi-site", "KPI"],
  },
  {
    id: "gis",
    icon: Map,
    label: "GIS Mapping",
    tagline: "Infrastructure on the map.",
    color: "#10b981",
    segment: "Geospatial visibility of assets, pipelines, and field crews.",
    preview: "map",
    metric: { value: "9+", unit: "regions tracked" },
    tags: ["Geospatial", "Assets", "Field"],
  },
  {
    id: "alarms",
    icon: Bell,
    label: "Alarm Management",
    tagline: "Signal above the noise.",
    color: "#f59e0b",
    segment: "Priority-based alerting with escalation, audit, and suppression.",
    preview: "alarms",
    metric: { value: "< 2s", unit: "response time" },
    tags: ["Escalation", "Audit", "Priority"],
  },
  {
    id: "historian",
    icon: TrendingUp,
    label: "Historian",
    tagline: "Memory of your operations.",
    color: "#8b5cf6",
    segment: "High-frequency time-series storage with compression and replay.",
    preview: "trend",
    metric: { value: "10M+", unit: "data points/day" },
    tags: ["Time-series", "Compression", "Replay"],
  },
  {
    id: "mobile",
    icon: Smartphone,
    label: "Mobile Access",
    tagline: "Control from the field.",
    color: "#06b6d4",
    segment: "Full platform access on any device. Online and offline modes.",
    preview: "mobile",
    metric: { value: "iOS + Android", unit: "native apps" },
    tags: ["Offline-ready", "Native", "Cross-platform"],
  },
  {
    id: "api",
    icon: Link2,
    label: "Open APIs",
    tagline: "Integrate everything.",
    color: ORANGE,
    segment: "REST, MQTT, and WebSocket APIs. Standards-first, no lock-in.",
    preview: "api",
    metric: { value: "REST + WS", unit: "open APIs" },
    tags: ["REST", "MQTT", "WebSocket"],
  },
  {
    id: "users",
    icon: Users,
    label: "User Management",
    tagline: "The right access, always.",
    color: "#ec4899",
    segment: "Role-based access, MFA, SSO, and a complete audit trail.",
    preview: "users",
    metric: { value: "RBAC + MFA", unit: "security model" },
    tags: ["RBAC", "SSO", "Audit trail"],
  },
  {
    id: "reports",
    icon: FileText,
    label: "Reports",
    tagline: "Compliance, automated.",
    color: "#6366f1",
    segment:
      "Scheduled and on-demand reports across every operational dataset.",
    preview: "reports",
    metric: { value: "PDF + CSV", unit: "export formats" },
    tags: ["Scheduled", "Export", "Compliance"],
  },
] as const;

type FeatureId = (typeof FEATURES)[number]["id"];

const fadeUpVariants: Variants = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.65 } },
};

// ─── Preview fragments ─────────────────────────────────────────────────────
// Each is a purpose-built micro-UI specific to the feature — not generic icons.

function PreviewChart({ color }: { color: string }) {
  const bars = [
    0.45, 0.7, 0.55, 0.9, 0.65, 0.8, 0.72, 0.95, 0.6, 0.85, 0.78, 0.92,
  ];
  return (
    <div className="flex flex-col gap-2 w-full h-full">
      <div className="flex items-end gap-1 flex-1 px-1">
        {bars.map((h, i) => (
          <motion.div
            key={i}
            className="flex-1 rounded-sm"
            style={{
              background: `${color}${i % 3 === 2 ? "ee" : "44"}`,
              originY: 1,
            }}
            initial={{ scaleY: 0 }}
            animate={{ scaleY: h }}
            transition={{
              delay: i * 0.04,
              duration: 0.5,
              ease: [0.22, 1, 0.36, 1],
            }}
          />
        ))}
      </div>
      <div className="flex justify-between px-1">
        {["Jan", "Feb", "Mar", "Apr"].map((m) => (
          <span key={m} style={{ fontSize: 8, color: "var(--text-muted)" }}>
            {m}
          </span>
        ))}
      </div>
    </div>
  );
}

function PreviewMap({ color }: { color: string }) {
  const pins = [
    { cx: 25, cy: 40 },
    { cx: 55, cy: 25 },
    { cx: 72, cy: 55 },
    { cx: 40, cy: 65 },
    { cx: 82, cy: 35 },
  ];
  return (
    <svg viewBox="0 0 100 80" className="w-full h-full">
      <defs>
        <pattern
          id="mapDots"
          width="8"
          height="8"
          patternUnits="userSpaceOnUse"
        >
          <circle cx="1" cy="1" r="0.6" fill={`${color}22`} />
        </pattern>
      </defs>
      <rect width="100" height="80" fill="url(#mapDots)" />
      {pins.slice(0, -1).map((p, i) => (
        <motion.line
          key={i}
          x1={p.cx}
          y1={p.cy}
          x2={pins[i + 1].cx}
          y2={pins[i + 1].cy}
          stroke={color}
          strokeWidth="0.8"
          strokeOpacity="0.35"
          strokeDasharray="2 3"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ delay: 0.2 + i * 0.1, duration: 0.5 }}
        />
      ))}
      {pins.map((p, i) => (
        <g key={i}>
          <motion.circle
            cx={p.cx}
            cy={p.cy}
            r="3.5"
            fill={color}
            opacity="0.9"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: i * 0.1, type: "spring", stiffness: 300 }}
          />
          <motion.circle
            cx={p.cx}
            cy={p.cy}
            r="6"
            fill="none"
            stroke={color}
            strokeWidth="0.8"
            initial={{ opacity: 0.6, r: 3.5 }}
            animate={{ opacity: 0, r: 9 }}
            transition={{
              delay: i * 0.1 + 0.3,
              duration: 1.2,
              repeat: Infinity,
            }}
          />
        </g>
      ))}
    </svg>
  );
}

function PreviewAlarms({ color }: { color: string }) {
  const alarms = [
    { tag: "PT-101", msg: "High pressure", sev: "CRIT", t: "00:12" },
    { tag: "FT-203", msg: "Flow deviation", sev: "WARN", t: "01:45" },
    { tag: "LT-044", msg: "Low level", sev: "WARN", t: "03:22" },
  ];
  const sevColor: Record<string, string> = { CRIT: "#ef4444", WARN: color };
  return (
    <div className="flex flex-col gap-1.5 w-full">
      {alarms.map((a, i) => (
        <motion.div
          key={i}
          className="flex items-center gap-2 rounded-lg px-2.5 py-1.5"
          style={{
            background: `${sevColor[a.sev]}12`,
            border: `1px solid ${sevColor[a.sev]}30`,
          }}
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: i * 0.12, duration: 0.35 }}
        >
          <div
            className="h-1.5 w-1.5 rounded-full shrink-0"
            style={{ background: sevColor[a.sev] }}
          />
          <span
            className="font-mono text-[9px] shrink-0"
            style={{ color: sevColor[a.sev] }}
          >
            {a.tag}
          </span>
          <span
            className="flex-1 truncate"
            style={{ fontSize: 9, color: "var(--text-secondary)" }}
          >
            {a.msg}
          </span>
          <span
            className="font-mono"
            style={{ fontSize: 8, color: "var(--text-muted)" }}
          >
            {a.t}
          </span>
        </motion.div>
      ))}
    </div>
  );
}

function PreviewTrend({ color }: { color: string }) {
  const pts = [18, 22, 19, 28, 24, 32, 27, 35, 30, 38, 34, 42];
  const W = 100,
    H = 48;
  const max = Math.max(...pts),
    min = Math.min(...pts);
  const norm = (v: number) => H - ((v - min) / (max - min)) * (H - 8) - 4;
  const path = pts
    .map(
      (v, i) =>
        `${i === 0 ? "M" : "L"} ${(i / (pts.length - 1)) * W} ${norm(v)}`,
    )
    .join(" ");
  const area = `${path} L ${W} ${H} L 0 ${H} Z`;
  return (
    <svg
      viewBox={`0 0 ${W} ${H}`}
      className="w-full"
      preserveAspectRatio="none"
    >
      <defs>
        <linearGradient id="trendFill" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={color} stopOpacity="0.28" />
          <stop offset="100%" stopColor={color} stopOpacity="0" />
        </linearGradient>
      </defs>
      <path d={area} fill="url(#trendFill)" />
      <motion.path
        d={path}
        fill="none"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 1, ease: "easeInOut" }}
      />
      <circle cx={W} cy={norm(pts[pts.length - 1])} r="2.5" fill={color} />
    </svg>
  );
}

function PreviewMobile({ color }: { color: string }) {
  return (
    <div className="flex justify-center items-center h-full">
      <div className="relative" style={{ width: 60, height: 96 }}>
        <div
          className="absolute inset-0 rounded-[12px]"
          style={{ border: `2px solid ${color}50`, background: `${color}08` }}
        />
        <div
          className="absolute top-2 left-1/2 -translate-x-1/2 rounded-full"
          style={{ width: 16, height: 3, background: `${color}40` }}
        />
        <div className="absolute inset-x-2 inset-y-6 flex flex-col gap-1">
          <div
            className="rounded-sm h-4"
            style={{ background: `${color}30` }}
          />
          <div
            className="rounded-sm h-2"
            style={{ background: `${color}20`, width: "70%" }}
          />
          <div
            className="rounded-sm h-6 mt-1"
            style={{ background: `${color}18`, border: `1px solid ${color}25` }}
          />
          <div
            className="rounded-sm h-6"
            style={{ background: `${color}18`, border: `1px solid ${color}25` }}
          />
        </div>
      </div>
    </div>
  );
}

function PreviewApi({ color }: { color: string }) {
  const lines = [
    { type: "comment", text: "// Altrex REST API" },
    { type: "method", text: "GET /v2/tags/live" },
    { type: "key", text: '  "tag": "PT-101",' },
    { type: "value", text: '  "value": 4.82,' },
    { type: "value", text: '  "unit": "bar",' },
    { type: "key", text: '  "ts": 1718200000' },
  ];
  const c: Record<string, string> = {
    comment: "var(--text-muted)",
    method: color,
    key: "#10b981",
    value: "#f59e0b",
  };
  return (
    <div className="font-mono w-full" style={{ fontSize: 9 }}>
      {lines.map((l, i) => (
        <motion.div
          key={i}
          style={{ color: c[l.type] }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: i * 0.08, duration: 0.2 }}
        >
          {l.text}
        </motion.div>
      ))}
    </div>
  );
}

function PreviewUsers({ color }: { color: string }) {
  const roles = [
    { name: "Ops Admin", perms: ["Read", "Write", "Config"], active: true },
    { name: "Field Tech", perms: ["Read", "Ack"], active: true },
    { name: "Auditor", perms: ["Read", "Export"], active: false },
  ];
  return (
    <div className="flex flex-col gap-1.5 w-full">
      {roles.map((r, i) => (
        <motion.div
          key={i}
          className="flex items-center gap-2"
          initial={{ opacity: 0, x: -8 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: i * 0.1, duration: 0.3 }}
        >
          <div
            className="h-6 w-6 rounded-full shrink-0 flex items-center justify-center"
            style={{ background: `${color}22`, border: `1px solid ${color}40` }}
          >
            <span style={{ fontSize: 8, color, fontWeight: 700 }}>
              {r.name[0]}
            </span>
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-1">
              <span
                style={{
                  fontSize: 9.5,
                  fontWeight: 700,
                  color: "var(--text-primary)",
                }}
              >
                {r.name}
              </span>
              {r.active && (
                <div
                  className="h-1.5 w-1.5 rounded-full"
                  style={{ background: "#10b981" }}
                />
              )}
            </div>
            <div className="flex gap-1 mt-0.5">
              {r.perms.map((p) => (
                <span
                  key={p}
                  className="rounded px-1 py-px"
                  style={{
                    fontSize: 7,
                    background: `${color}15`,
                    color,
                    border: `1px solid ${color}25`,
                  }}
                >
                  {p}
                </span>
              ))}
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
}

function PreviewReports({ color }: { color: string }) {
  const reports = [
    { name: "Daily Operations", format: "PDF", status: "ready" },
    { name: "Energy Consumption", format: "CSV", status: "running" },
    { name: "Alarm Summary", format: "PDF", status: "ready" },
  ];
  const statusColor: Record<string, string> = {
    ready: "#10b981",
    running: color,
  };
  return (
    <div className="flex flex-col gap-1.5 w-full">
      {reports.map((r, i) => (
        <motion.div
          key={i}
          className="flex items-center gap-2 rounded-lg px-2.5 py-1.5"
          style={{
            background: "var(--bg-raised)",
            border: "1px solid var(--border-subtle)",
          }}
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.1, duration: 0.3 }}
        >
          <div className="flex-1 min-w-0">
            <span
              style={{
                fontSize: 9.5,
                fontWeight: 600,
                color: "var(--text-primary)",
              }}
            >
              {r.name}
            </span>
          </div>
          <span
            className="font-mono rounded px-1.5 py-0.5"
            style={{ fontSize: 8, background: `${color}15`, color }}
          >
            {r.format}
          </span>
          <div
            className="h-1.5 w-1.5 rounded-full shrink-0"
            style={{ background: statusColor[r.status] }}
          />
        </motion.div>
      ))}
    </div>
  );
}

function FeaturePreview({ id, color }: { id: FeatureId; color: string }) {
  const map: Record<FeatureId, React.ReactNode> = {
    dashboards: <PreviewChart color={color} />,
    gis: <PreviewMap color={color} />,
    alarms: <PreviewAlarms color={color} />,
    historian: <PreviewTrend color={color} />,
    mobile: <PreviewMobile color={color} />,
    api: <PreviewApi color={color} />,
    users: <PreviewUsers color={color} />,
    reports: <PreviewReports color={color} />,
  };
  return <>{map[id]}</>;
}

// ─── Segmented ring — FIXED positioning ────────────────────────────────────
// Single source of truth for angles: both the arc paths and the icon buttons
// derive from the exact same `segmentAngle()` / `polarToCart()` calls, at the
// exact same radius, so there is no drift between the wedge and its icon.
function SegmentedRing({
  activeIdx,
  onSelect,
  isInView,
}: {
  activeIdx: number;
  onSelect: (i: number) => void;
  isInView: boolean;
}) {
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const SIZE = 340;
  const cx = SIZE / 2;
  const cy = SIZE / 2;
  const R_OUTER = 148;
  const R_INNER = 100;
  const R_MID = (R_OUTER + R_INNER) / 2; // single radius used for every icon
  const GAP_DEG = 3;
  const n = FEATURES.length;
  // Icon button diameter scales with the ring instead of being a fixed 36px,
  // so spacing stays visually consistent if SIZE is ever tuned per-breakpoint.
  const ICON_BTN = Math.round((R_OUTER - R_INNER) * 0.84);

  function polarToCart(r: number, angleDeg: number) {
    const rad = ((angleDeg - 90) * Math.PI) / 180;
    return { x: cx + r * Math.cos(rad), y: cy + r * Math.sin(rad) };
  }

  // Single shared angle function — arcs and icons both call this.
  function segmentAngles(i: number) {
    const slice = 360 / n;
    const startDeg = i * slice + GAP_DEG / 2;
    const endDeg = startDeg + slice - GAP_DEG;
    const midDeg = i * slice + slice / 2;
    return { startDeg, endDeg, midDeg };
  }

  function arcPath(i: number, outer: number, inner: number) {
    const { startDeg, endDeg } = segmentAngles(i);
    const p1 = polarToCart(outer, startDeg);
    const p2 = polarToCart(outer, endDeg);
    const p3 = polarToCart(inner, endDeg);
    const p4 = polarToCart(inner, startDeg);
    const largeArc = endDeg - startDeg > 180 ? 1 : 0;
    return [
      `M ${p1.x} ${p1.y}`,
      `A ${outer} ${outer} 0 ${largeArc} 1 ${p2.x} ${p2.y}`,
      `L ${p3.x} ${p3.y}`,
      `A ${inner} ${inner} 0 ${largeArc} 0 ${p4.x} ${p4.y}`,
      "Z",
    ].join(" ");
  }

  return (
    <div
      className="relative flex items-center justify-center"
      style={{ width: SIZE, height: SIZE }}
    >
      <motion.div
        className="absolute rounded-full pointer-events-none"
        style={{
          width: R_OUTER * 2 + 36,
          height: R_OUTER * 2 + 36,
          border: `1px dashed ${isDark ? "rgba(100,140,255,0.12)" : "rgba(28,51,117,0.08)"}`,
          top: cx - R_OUTER - 18,
          left: cy - R_OUTER - 18,
        }}
        animate={{ rotate: 360 }}
        transition={{ duration: 80, repeat: Infinity, ease: "linear" }}
      />

      <svg
        width={SIZE}
        height={SIZE}
        className="absolute inset-0"
        viewBox={`0 0 ${SIZE} ${SIZE}`}
      >
        <defs>
          {FEATURES.map((f) => (
            <radialGradient
              key={f.id}
              id={`grad-${f.id}`}
              cx="50%"
              cy="50%"
              r="50%"
            >
              <stop offset="0%" stopColor={f.color} stopOpacity="0.5" />
              <stop offset="100%" stopColor={f.color} stopOpacity="0.15" />
            </radialGradient>
          ))}
        </defs>

        <circle
          cx={cx}
          cy={cy}
          r={R_INNER - 2}
          fill="none"
          stroke={isDark ? "rgba(100,140,255,0.08)" : "rgba(28,51,117,0.06)"}
          strokeWidth="1"
        />

        {FEATURES.map((f, i) => {
          const isActive = i === activeIdx;
          const path = arcPath(i, R_OUTER, R_INNER);
          return (
            <motion.path
              key={f.id}
              d={path}
              fill={
                isActive
                  ? `url(#grad-${f.id})`
                  : isDark
                    ? "rgba(255,255,255,0.025)"
                    : "rgba(28,51,117,0.025)"
              }
              stroke={
                isActive
                  ? f.color
                  : isDark
                    ? "rgba(100,140,255,0.12)"
                    : "rgba(28,51,117,0.08)"
              }
              strokeWidth={isActive ? 1.5 : 1}
              style={{
                cursor: "pointer",
                transition: "fill 0.3s, stroke 0.3s",
              }}
              onClick={() => onSelect(i)}
              whileHover={{ scale: 1.02 }}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: isInView ? 1 : 0, scale: isInView ? 1 : 0.9 }}
              transition={{ delay: i * 0.06, duration: 0.4 }}
            />
          );
        })}
      </svg>

      {/* Icon buttons — positioned via the SAME polarToCart + R_MID used implicitly
          by the arc midline, using percentage-based left/top so the button's own
          box model can't introduce sub-pixel drift relative to the SVG. */}
      {FEATURES.map((f, i) => {
        const { midDeg } = segmentAngles(i);
        const pt = polarToCart(R_MID, midDeg);
        const isActive = i === activeIdx;
        const Icon = f.icon;
        return (
          <motion.button
            key={f.id}
            className="absolute flex items-center justify-center rounded-full focus:outline-none"
            style={{
              width: ICON_BTN,
              height: ICON_BTN,
              left: `${(pt.x / SIZE) * 100}%`,
              top: `${(pt.y / SIZE) * 100}%`,
              transform: "translate(-50%, -50%)",
              background: isActive ? f.color : "transparent",
              border: `1.5px solid ${isActive ? f.color : isDark ? "rgba(100,140,255,0.2)" : "rgba(28,51,117,0.15)"}`,
              boxShadow: isActive ? `0 0 18px ${f.color}60` : "none",
              transition:
                "background 0.25s, border-color 0.25s, box-shadow 0.25s",
            }}
            onClick={() => onSelect(i)}
            whileHover={{ scale: 1.12 }}
            whileTap={{ scale: 0.95 }}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: isInView ? 1 : 0, scale: isInView ? 1 : 0 }}
            transition={{
              delay: 0.3 + i * 0.06,
              type: "spring",
              stiffness: 260,
            }}
          >
            <Icon
              size={Math.round(ICON_BTN * 0.42)}
              color={
                isActive
                  ? "#fff"
                  : isDark
                    ? "rgba(238,241,255,0.55)"
                    : "rgba(28,51,117,0.5)"
              }
              strokeWidth={2}
            />
          </motion.button>
        );
      })}

      <div
        className="relative z-10 flex flex-col items-center justify-center pointer-events-none"
        style={{ width: R_INNER * 1.8, height: R_INNER * 1.8 }}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={activeIdx}
            className="flex flex-col items-center gap-1"
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.1 }}
            transition={{ duration: 0.22 }}
          >
            <span
              className="font-black tabular-nums leading-none"
              style={{ fontSize: 32, color: FEATURES[activeIdx].color }}
            >
              {String(activeIdx + 1).padStart(2, "0")}
            </span>
            <span
              className="font-bold uppercase tracking-[0.2em]"
              style={{
                fontSize: 8,
                color: isDark
                  ? "rgba(238,241,255,0.3)"
                  : "rgba(28,51,117,0.35)",
              }}
            >
              of {FEATURES.length}
            </span>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}

// ─── Feature detail panel — FIXED height, premium layered card ────────────
// PANEL_HEIGHT is the single fixed height every feature state must fit inside.
// Internal regions (description, preview) use fixed sub-heights with line
// clamping / overflow control so swapping features never resizes the shell.
const PANEL_HEIGHT = 520;

function FeaturePanel({
  feature,
  idx,
}: {
  feature: (typeof FEATURES)[number];
  idx: number;
}) {
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const Icon = feature.icon;

  return (
    <div
      className="relative rounded-[28px] overflow-hidden"
      style={{
        height: PANEL_HEIGHT,
        background: isDark
          ? "linear-gradient(160deg, rgba(255,255,255,0.04), rgba(255,255,255,0.015))"
          : "linear-gradient(160deg, rgba(28,51,117,0.035), rgba(28,51,117,0.01))",
        border: `1px solid ${isDark ? "rgba(255,255,255,0.08)" : "rgba(28,51,117,0.08)"}`,
        boxShadow: isDark
          ? "0 24px 60px -20px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.06)"
          : "0 24px 60px -20px rgba(28,51,117,0.18), inset 0 1px 0 rgba(255,255,255,0.6)",
      }}
    >
      {/* Accent glow wash that shifts color per active feature */}
      <motion.div
        className="pointer-events-none absolute inset-0 -z-0"
        animate={{
          background: `radial-gradient(ellipse 70% 60% at 85% 0%, ${feature.color}1c, transparent)`,
        }}
        transition={{ duration: 0.5 }}
      />

      {/* Top accent border — colored sliver that IDs the active feature */}
      <motion.div
        className="absolute inset-x-0 top-0 h-[3px]"
        animate={{
          background: `linear-gradient(90deg, ${feature.color}, ${feature.color}00)`,
        }}
        transition={{ duration: 0.4 }}
      />

      <AnimatePresence mode="wait">
        <motion.div
          key={feature.id}
          className="relative z-10 flex h-full flex-col p-7 lg:p-9"
          initial={{ opacity: 0, x: 24 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -24 }}
          transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
        >
          {/* ── Header strip: index + progress rail + category badge ── */}
          <div className="flex items-center gap-3 shrink-0">
            <span
              className="font-mono text-[11px] tracking-widest"
              style={{
                color: isDark
                  ? "rgba(238,241,255,0.3)"
                  : "rgba(28,51,117,0.35)",
              }}
            >
              {String(idx + 1).padStart(2, "0")} / {FEATURES.length}
            </span>
            <div
              className="h-px flex-1"
              style={{ background: `${feature.color}35` }}
            />
            <div
              className="flex items-center gap-1.5 rounded-full px-3 py-1.5"
              style={{
                background: `${feature.color}14`,
                border: `1px solid ${feature.color}30`,
                boxShadow: `0 0 0 1px ${feature.color}08`,
              }}
            >
              <Icon size={12} color={feature.color} strokeWidth={2.2} />
              <span
                className="font-bold uppercase tracking-widest"
                style={{ fontSize: "9px", color: feature.color }}
              >
                {feature.label}
              </span>
            </div>
          </div>

          {/* ── Name + tagline + description — fixed-height zone ── */}
          <div className="mt-6 shrink-0" style={{ minHeight: 168 }}>
            <h3
              className="font-black uppercase tracking-tighter leading-[0.95]"
              style={{
                fontSize: "clamp(2.1rem, 3.4vw, 2.9rem)",
                color: "var(--text-primary)",
              }}
            >
              {feature.label.split(" ").map((word, i) => (
                <span key={i} className="block">
                  {i === 0 ? (
                    word
                  ) : (
                    <span
                      style={{
                        background: `linear-gradient(135deg, ${feature.color}, ${feature.color}bb)`,
                        WebkitBackgroundClip: "text",
                        WebkitTextFillColor: "transparent",
                        backgroundClip: "text",
                      }}
                    >
                      {word}
                    </span>
                  )}
                </span>
              ))}
            </h3>
            <p
              className="mt-3 max-w-sm leading-relaxed"
              style={{
                fontSize: 13.5,
                color: isDark
                  ? "rgba(238,241,255,0.55)"
                  : "rgba(28,51,117,0.55)",
                // Clamp to 2 lines so longer descriptions never push layout
                display: "-webkit-box",
                WebkitLineClamp: 2,
                WebkitBoxOrient: "vertical",
                overflow: "hidden",
              }}
            >
              {feature.segment}
            </p>

            {/* Metric callout — moved up near the headline for stronger hierarchy */}
            <div className="mt-4 flex items-baseline gap-2">
              <Activity
                size={14}
                style={{ color: feature.color }}
                className="mb-0.5"
              />
              <span
                className="font-black tracking-tight"
                style={{ fontSize: 24, color: feature.color }}
              >
                {feature.metric.value}
              </span>
              <span
                style={{
                  fontSize: 11.5,
                  color: isDark
                    ? "rgba(238,241,255,0.4)"
                    : "rgba(28,51,117,0.45)",
                }}
              >
                {feature.metric.unit}
              </span>
            </div>
          </div>

          {/* ── Capability tags ── */}
          <div className="mt-5 flex flex-wrap gap-1.5 shrink-0">
            {feature.tags.map((tag, i) => (
              <motion.span
                key={tag}
                initial={{ opacity: 0, y: 4 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.08 + i * 0.05, duration: 0.25 }}
                className="rounded-md px-2.5 py-1 font-semibold"
                style={{
                  fontSize: 10,
                  color: isDark
                    ? "rgba(238,241,255,0.65)"
                    : "rgba(28,51,117,0.65)",
                  background: isDark
                    ? "rgba(255,255,255,0.05)"
                    : "rgba(28,51,117,0.04)",
                  border: `1px solid ${isDark ? "rgba(255,255,255,0.08)" : "rgba(28,51,117,0.07)"}`,
                }}
              >
                {tag}
              </motion.span>
            ))}
          </div>

          {/* ── Live preview card — flexes to fill remaining fixed space ── */}
          <div
            className="relative mt-5 flex-1 overflow-hidden rounded-2xl p-4"
            style={{
              background: isDark
                ? "rgba(255,255,255,0.035)"
                : "rgba(28,51,117,0.035)",
              border: `1px solid ${feature.color}22`,
              boxShadow: `inset 0 0 28px ${feature.color}08`,
            }}
          >
            {/* Corner accent marks — subtle premium framing detail */}
            <span
              className="pointer-events-none absolute left-3 top-3 h-2.5 w-2.5 border-l-2 border-t-2 rounded-tl-sm"
              style={{ borderColor: `${feature.color}50` }}
            />
            <span
              className="pointer-events-none absolute right-3 top-3 h-2.5 w-2.5 border-r-2 border-t-2 rounded-tr-sm"
              style={{ borderColor: `${feature.color}50` }}
            />
            <span
              className="pointer-events-none absolute bottom-3 left-3 h-2.5 w-2.5 border-b-2 border-l-2 rounded-bl-sm"
              style={{ borderColor: `${feature.color}30` }}
            />
            <span
              className="pointer-events-none absolute bottom-3 right-3 h-2.5 w-2.5 border-b-2 border-r-2 rounded-br-sm"
              style={{ borderColor: `${feature.color}30` }}
            />

            <div className="flex items-center justify-between">
              <p
                className="font-mono uppercase tracking-widest"
                style={{
                  fontSize: "8px",
                  color: isDark
                    ? "rgba(238,241,255,0.3)"
                    : "rgba(28,51,117,0.35)",
                }}
              >
                Live preview
              </p>
              <div className="flex items-center gap-1.5">
                <motion.span
                  className="h-1.5 w-1.5 rounded-full"
                  style={{ background: feature.color }}
                  animate={{ opacity: [1, 0.3, 1] }}
                  transition={{ duration: 1.6, repeat: Infinity }}
                />
                <span
                  className="font-mono uppercase tracking-widest"
                  style={{ fontSize: "8px", color: feature.color }}
                >
                  Live
                </span>
              </div>
            </div>

            <div className="mt-3 flex h-[calc(100%-28px)] items-center">
              <FeaturePreview id={feature.id} color={feature.color} />
            </div>
          </div>

          {/* ── Step dots ── */}
          <div className="mt-5 flex items-center gap-1.5 shrink-0">
            {FEATURES.map((f, i) => (
              <div
                key={f.id}
                className="rounded-full transition-all duration-300"
                style={{
                  width: i === idx ? 18 : 5,
                  height: 5,
                  background:
                    i === idx
                      ? feature.color
                      : isDark
                        ? "rgba(255,255,255,0.12)"
                        : "rgba(28,51,117,0.12)",
                }}
              />
            ))}
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

// ─── Mobile list layout ────────────────────────────────────────────────────
function MobileFeatureList({ isInView }: { isInView: boolean }) {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  return (
    <div className="flex flex-col gap-3 md:hidden">
      {FEATURES.map((f, i) => {
        const Icon = f.icon;
        return (
          <motion.div
            key={f.id}
            className="flex items-center gap-4 rounded-2xl px-4 py-4"
            style={{
              background: isDark
                ? "rgba(255,255,255,0.03)"
                : "rgba(28,51,117,0.02)",
              border: `1px solid ${f.color}25`,
              boxShadow: `0 2px 12px ${f.color}0a`,
            }}
            initial={{ opacity: 0, y: 16 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{
              delay: i * 0.07,
              duration: 0.4,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            <div
              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl"
              style={{
                background: `${f.color}15`,
                border: `1px solid ${f.color}30`,
              }}
            >
              <Icon size={18} color={f.color} strokeWidth={2} />
            </div>
            <div className="flex-1 min-w-0">
              <p
                className="font-bold tracking-tight text-[var(--text-primary)]"
                style={{ fontSize: 13 }}
              >
                {f.label}
              </p>
              <p
                style={{
                  fontSize: 11,
                  color: isDark
                    ? "rgba(238,241,255,0.45)"
                    : "rgba(28,51,117,0.45)",
                }}
              >
                {f.tagline}
              </p>
            </div>
            <ChevronRight size={14} style={{ color: `${f.color}60` }} />
          </motion.div>
        );
      })}
    </div>
  );
}

// ─── Section root ──────────────────────────────────────────────────────────
const CYCLE_MS = 3200;

const PlatformOverview = () => {
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-80px" });
  const [activeIdx, setActiveIdx] = useState(0);
  const [paused, setPaused] = useState(false);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const startCycle = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      setActiveIdx((prev) => (prev + 1) % FEATURES.length);
    }, CYCLE_MS);
  }, []);

  useEffect(() => {
    if (isInView && !paused) startCycle();
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isInView, paused, startCycle]);

  const handleSelect = (i: number) => {
    setActiveIdx(i);
    setPaused(true);
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setTimeout(() => setPaused(false), 8000) as any;
  };

  const activeFeat = FEATURES[activeIdx];

  return (
    <section ref={sectionRef} className="relative overflow-hidden py-28">
      <motion.div
        className="pointer-events-none absolute inset-0 -z-10"
        animate={{
          background: `radial-gradient(ellipse 55% 50% at 70% 50%, ${activeFeat.color}0c, transparent)`,
        }}
        transition={{ duration: 0.6 }}
      />
      <div
        className="pointer-events-none absolute inset-0 -z-10 opacity-35"
        style={{
          backgroundImage:
            "radial-gradient(circle, var(--border-subtle) 1px, transparent 1px)",
          backgroundSize: "28px 28px",
        }}
      />

      <div className="mx-auto max-w-[1400px] px-6">
        <motion.div
          className="mb-16 flex flex-col gap-4 md:flex-row md:items-end md:justify-between"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
        >
          <div>
            <motion.div variants={fadeUpVariants} initial="hidden" animate="visible">
              <Badge
                variant="secondary"
                className="border-border bg-card shadow-sm mb-8"
              >
                <div className="flex h-4 w-4 items-center justify-center rounded-full bg-emerald-500">
                  <span className="h-1.5 w-1.5 rounded-full bg-white animate-pulse" />
                </div>
                <span className="font-mono text-xs sm:text-sm text-foreground">
                  <InViewDecryptedText
                    text="Platform Overview"
                    speed={60}
                    maxIterations={12}
                    className="text-foreground uppercase"
                    encryptedClassName="text-muted-foreground"
                  />
                </span>
              </Badge>
            </motion.div>
            <h2 className="mt-4 text-4xl font-bold uppercase text-primary sm:text-5xl">
              Altrex Digital Platform
            </h2>
            <p
              className="mt-2 max-w-md font-semibold text-muted-foreground"
            >
              A single platform to manage assets, operations, alarms, analytics,
              and field infrastructure.
            </p>
          </div>
          <Button
            className="inline-flex shrink-0 items-center gap-2.5 self-start"
          >
            Explore Platform
            <ArrowRight size={16} strokeWidth={2.5} />
          </Button>
        </motion.div>

        {/* ── Desktop: ring + feature panel ── */}
        <div className="hidden md:grid md:grid-cols-[340px_1fr] md:items-center md:gap-16 lg:gap-24">
          <motion.div
            initial={{ opacity: 0, scale: 0.88 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            <SegmentedRing
              activeIdx={activeIdx}
              onSelect={handleSelect}
              isInView={isInView}
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{
              duration: 0.6,
              delay: 0.15,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            <FeaturePanel feature={activeFeat} idx={activeIdx} />
          </motion.div>
        </div>

        {/* ── Mobile ── */}
        <div className="md:hidden">
          <motion.div
            className="mb-4 text-center"
            initial={{ opacity: 0, y: 16 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.45 }}
          >
            <p
              style={{
                fontSize: 13,
                color: isDark
                  ? "rgba(238,241,255,0.4)"
                  : "rgba(28,51,117,0.45)",
              }}
            >
              One unified platform — every capability connected.
            </p>
          </motion.div>
          <MobileFeatureList isInView={isInView} />
          <motion.div
            className="mt-8 flex justify-center"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: 0.5 }}
          >
            <motion.a
              href="#"
              className="inline-flex items-center gap-2 rounded-xl px-6 py-3.5 font-bold"
              style={{
                background: `linear-gradient(135deg, ${ORANGE}, #d4540f)`,
                color: "#fff",
                fontSize: 14,
                boxShadow: "0 4px 20px rgba(232,101,26,0.32)",
              }}
              whileTap={{ scale: 0.97 }}
            >
              Explore Platform <ArrowRight size={16} strokeWidth={2.5} />
            </motion.a>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default PlatformOverview;
