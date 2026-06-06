/**
 * SolutionArchitecture
 *
 * Renders a per-solution architecture diagram as a horizontal left-to-right
 * flow. Data comes directly from `solution.architecture` in solutionsData.ts,
 * which is sourced from the Word document.
 *
 * Node types:
 *   source  – input devices / data origins
 *   layer   – named processing / platform layers
 *   branch  – a group of parallel child pills rendered side-by-side
 *   output  – final sinks (ERP, dashboards, SOC, etc.)
 */

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import type { ArchNode } from "@/data/solutionsData";

// ── Colour palette ────────────────────────────────────────────────────────────
const COLORS = {
  source: { border: "#10b981", bg: "#10b98112", text: "#10b981" },
  layer:  { border: "#ff6b00", bg: "#ff6b0010", text: "#ff6b00" },
  branch: { border: "#6366f1", bg: "#6366f110", text: "#6366f1" },
  output: { border: "#06b6d4", bg: "#06b6d410", text: "#06b6d4" },
} as const;

// ── Connector arrow (horizontal →) ───────────────────────────────────────────
function Connector({ color = "#ff6b00", delay = 0 }: { color?: string; delay?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, scaleX: 0 }}
      animate={{ opacity: 1, scaleX: 1 }}
      transition={{ duration: 0.4, delay, ease: "easeOut" }}
      className="flex items-center shrink-0"
      style={{ originX: 0 }}
    >
      {/* Line */}
      <div
        className="h-px w-8 shrink-0"
        style={{ background: `linear-gradient(to right, ${color}60, ${color})` }}
      />
      {/* Arrowhead */}
      <div
        style={{
          width: 0,
          height: 0,
          borderTop: "4px solid transparent",
          borderBottom: "4px solid transparent",
          borderLeft: `6px solid ${color}`,
        }}
      />
    </motion.div>
  );
}

// ── Single node card ──────────────────────────────────────────────────────────
function ArchCard({
  node,
  delay,
}: {
  node: ArchNode;
  delay: number;
}) {
  const c = COLORS[node.type];

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, delay, ease: "easeOut" }}
      className="flex flex-col items-center"
    >
      {node.type === "branch" ? (
        /* ── Branch: header pill + children row ── */
        <div className="flex flex-col items-center gap-3">
          {/* Branch header label */}
          <div
            className="rounded-lg border px-3 py-1.5 text-[11px] font-bold uppercase tracking-widest"
            style={{ borderColor: c.border + "50", color: c.text, background: c.bg }}
          >
            {node.label}
          </div>

          {/* Children grid */}
          <div className="flex flex-wrap justify-center gap-2 max-w-[340px]">
            {(node.children ?? []).map((child, ci) => (
              <motion.div
                key={ci}
                initial={{ opacity: 0, scale: 0.85 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: delay + 0.05 + ci * 0.05 }}
                className="rounded-lg border px-3 py-2 text-[11px] font-semibold leading-none whitespace-nowrap"
                style={{
                  borderColor: c.border + "40",
                  color: "var(--text-secondary)",
                  background: "var(--bg-raised)",
                  boxShadow: `0 2px 8px ${c.border}15`,
                }}
              >
                {child}
              </motion.div>
            ))}
          </div>
        </div>
      ) : (
        /* ── source / layer / output: single card ── */
        <div
          className="relative rounded-xl border px-5 py-3.5 flex flex-col items-center gap-1 min-w-[160px] max-w-[220px] text-center"
          style={{
            borderColor: c.border,
            background: c.bg,
            boxShadow: `0 4px 18px ${c.border}18`,
          }}
        >
          {/* Top accent line */}
          <div
            className="absolute top-0 left-4 right-4 h-px rounded-full"
            style={{ background: c.border }}
          />

          <span
            className="text-[13px] font-bold tracking-tight leading-snug"
            style={{ color: "var(--text-primary)" }}
          >
            {node.label}
          </span>

          {node.sublabel && (
            <span
              className="text-[10px] font-medium leading-snug"
              style={{ color: "var(--text-muted)" }}
            >
              {node.sublabel}
            </span>
          )}

          {/* Type badge */}
          <span
            className="mt-0.5 rounded px-1.5 py-px text-[9px] font-bold uppercase tracking-widest"
            style={{ color: c.text, background: c.border + "20" }}
          >
            {node.type}
          </span>
        </div>
      )}
    </motion.div>
  );
}

// ── Legend entry ──────────────────────────────────────────────────────────────
function LegendDot({ color, label }: { color: string; label: string }) {
  return (
    <div className="flex items-center gap-1.5">
      <div
        className="h-2 w-2 rounded-full shrink-0"
        style={{ background: color }}
      />
      <span className="text-[11px] text-[var(--text-muted)] font-medium capitalize">{label}</span>
    </div>
  );
}

// ── Main component ────────────────────────────────────────────────────────────
interface SolutionArchitectureProps {
  nodes: ArchNode[];
}

export default function SolutionArchitecture({ nodes }: SolutionArchitectureProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <div ref={ref} className="w-full">
      {/* ── Scrollable flow canvas ── */}
      <div className="w-full overflow-x-auto pb-4">
        <div
          className="relative mx-auto flex min-w-max items-center gap-0 px-4 py-8"
        >
          {nodes.map((node, idx) => {
            const delay = isInView ? idx * 0.1 : 0;
            const connectorColor =
              idx < nodes.length - 1
                ? COLORS[nodes[idx + 1].type].border
                : COLORS[node.type].border;

            return (
              <div key={node.id} className="flex items-center">
                {isInView && <ArchCard node={node} delay={delay} />}
                {idx < nodes.length - 1 && isInView && (
                  <Connector color={connectorColor} delay={delay + 0.08} />
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* ── Legend ── */}
      {isInView && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4, delay: nodes.length * 0.1 + 0.2 }}
          className="flex flex-wrap justify-center gap-4 mt-2 pt-4 border-t border-[var(--border-subtle)]"
        >
          <LegendDot color={COLORS.source.text} label="Source" />
          <LegendDot color={COLORS.layer.text} label="Platform Layer" />
          <LegendDot color={COLORS.branch.text} label="Parallel Services" />
          <LegendDot color={COLORS.output.text} label="Output / Integration" />
        </motion.div>
      )}
    </div>
  );
}