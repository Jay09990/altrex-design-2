  import { useRef } from "react";
  import { motion, useInView } from "framer-motion";
  import type { ArchNode } from "@/data/solutionsData";

  const COLORS = {
    source: { border: "#10b981", bg: "#10b98112", text: "#10b981" },
    layer:  { border: "#ff6b00", bg: "#ff6b0010", text: "#ff6b00" },
    branch: { border: "#6366f1", bg: "#6366f110", text: "#6366f1" },
    output: { border: "#06b6d4", bg: "#06b6d410", text: "#06b6d4" },
  } as const;

  // ── Vertical connector between rows ──────────────────────────────────────────
  function VerticalConnector({ color = "#ff6b00", delay = 0 }: { color?: string; delay?: number }) {
    return (
      <motion.div
        initial={{ opacity: 0, scaleY: 0 }}
        animate={{ opacity: 1, scaleY: 1 }}
        transition={{ duration: 0.35, delay, ease: "easeOut" }}
        className="flex flex-col items-center my-1 relative"
        style={{ originY: 0 }}
      >
        <div className="w-[2px] h-8 relative overflow-hidden rounded-full" style={{ background: `linear-gradient(to bottom, ${color}20, ${color}80)` }}>
          <motion.div 
            className="w-full h-4 absolute top-0 left-0"
            style={{
               background: `linear-gradient(to bottom, transparent, ${color}, transparent)`,
            }}
            animate={{ y: [-16, 32] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "linear", delay: delay + 0.3 }}
          />
        </div>
        <div style={{
          width: 0, height: 0,
          borderLeft: "5px solid transparent",
          borderRight: "5px solid transparent",
          borderTop: `6px solid ${color}`,
          marginTop: "-1px"
        }} />
      </motion.div>
    );
  }

  // ── Single node card ──────────────────────────────────────────────────────────
  function ArchCard({ node, delay }: { node: ArchNode; delay: number }) {
    const c = COLORS[node.type];

    if (node.type === "branch") {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay }}
      className="relative rounded-xl border px-5 py-4 flex flex-col items-center gap-3
                 min-w-[220px] max-w-[380px] text-center w-full"
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

      {/* Header label */}
      <span
        className="text-[11px] font-bold uppercase tracking-widest"
        style={{ color: c.text }}
      >
        {node.label}
      </span>

      {/* Divider */}
      <div className="w-full h-px" style={{ background: c.border + "30" }} />

      {/* Children as compact tags inside the card */}
      <div className="flex flex-wrap justify-center gap-1.5">
        {(node.children ?? []).map((child, ci) => (
          <motion.span
            key={ci}
            initial={{ opacity: 0, scale: 0.88 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.25, delay: delay + 0.04 + ci * 0.03 }}
            className="rounded-md border px-2.5 py-1 text-[11px] font-medium"
            style={{
              borderColor: c.border + "35",
              color: "var(--text-secondary)",
              background: "var(--bg-raised)",
            }}
          >
            {child}
          </motion.span>
        ))}
      </div>

      {/* Type badge */}
      <span
        className="rounded px-1.5 py-px text-[9px] font-bold uppercase tracking-widest"
        style={{ color: c.text, background: c.border + "20" }}
      >
        {node.type}
      </span>
    </motion.div>
  );
}

    return (
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay }}
        className="relative rounded-xl border px-5 py-3.5 flex flex-col items-center gap-1
                  min-w-[150px] max-w-[200px] text-center"
        style={{
          borderColor: c.border,
          background: c.bg,
          boxShadow: `0 4px 18px ${c.border}18`,
        }}
      >
        <div className="absolute top-0 left-4 right-4 h-px rounded-full" style={{ background: c.border }} />
        <span className="text-[13px] font-bold tracking-tight leading-snug" style={{ color: "var(--text-primary)" }}>
          {node.label}
        </span>
        {node.sublabel && (
          <span className="text-[10px] font-medium leading-snug" style={{ color: "var(--text-muted)" }}>
            {node.sublabel}
          </span>
        )}
        <span
          className="mt-0.5 rounded px-1.5 py-px text-[9px] font-bold uppercase tracking-widest"
          style={{ color: c.text, background: c.border + "20" }}
        >
          {node.type}
        </span>
      </motion.div>
    );
  }

  // ── Group nodes into rows by type ─────────────────────────────────────────────
  // Consecutive nodes of the same type share a row.
  // A "branch" node always gets its own full-width row.
  function groupIntoRows(nodes: ArchNode[]): ArchNode[][] {
    const rows: ArchNode[][] = [];
    let i = 0;

    while (i < nodes.length) {
      const current = nodes[i];

      if (current.type === "branch") {
        // branch always gets its own row
        rows.push([current]);
        i++;
      } else {
        // collect consecutive same-type nodes into one row
        const row: ArchNode[] = [current];
        while (
          i + 1 < nodes.length &&
          nodes[i + 1].type === current.type &&
          nodes[i + 1].type !== "branch"
        ) {
          i++;
          row.push(nodes[i]);
        }
        rows.push(row);
        i++;
      }
    }

    return rows;
  }

  // ── Legend ────────────────────────────────────────────────────────────────────
  function LegendDot({ color, label }: { color: string; label: string }) {
    return (
      <div className="flex items-center gap-1.5">
        <div className="h-2 w-2 rounded-full shrink-0" style={{ background: color }} />
        <span className="text-[11px] text-muted-foreground font-medium capitalize">{label}</span>
      </div>
    );
  }

  // ── Main component ────────────────────────────────────────────────────────────
  interface DynamicArchitectureProps {
    nodes: ArchNode[];
  }

  export default function DynamicArchitecture({ nodes }: DynamicArchitectureProps) {
    const ref = useRef<HTMLDivElement>(null);
    const isInView = useInView(ref, { once: true, margin: "-80px" });
    const rows = groupIntoRows(nodes);

    return (
      <div ref={ref} className="w-full">
        <div className="flex flex-col items-center w-full py-6">
          {rows.map((row, rowIdx) => {
            // calculate base delay for this row
            const nodesBefore = rows.slice(0, rowIdx).reduce((acc, r) => acc + r.length, 0);
            const rowDelay = isInView ? nodesBefore * 0.08 : 0;

            return (
              <div key={rowIdx} className="flex flex-col items-center w-full">
                {/* ── Row of nodes ── */}
                <div className="flex flex-wrap justify-center gap-3 w-full px-4">
                  {row.map((node, nodeIdx) => (
                    <ArchCard
                      key={node.id}
                      node={node}
                      delay={isInView ? rowDelay + nodeIdx * 0.06 : 0}
                    />
                  ))}
                </div>

                {/* ── Vertical connector to next row ── */}
                {rowIdx < rows.length - 1 && isInView && (
                  <VerticalConnector
                    color={COLORS[rows[rowIdx + 1][0].type].border}
                    delay={rowDelay + row.length * 0.06}
                  />
                )}
              </div>
            );
          })}
        </div>

        {/* Legend */}
        {isInView && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4, delay: nodes.length * 0.08 + 0.2 }}
            className="flex flex-wrap justify-center gap-4 mt-2 pt-4 border-t border-border"
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
