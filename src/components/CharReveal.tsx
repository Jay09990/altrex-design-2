/**
 * CharReveal — character-by-character reveal animation.
 *
 * Each character slides up from behind an overflow:hidden clip,
 * with a configurable stagger between chars. Supports:
 *   - Per-line colour/style overrides (for gradient headlines)
 *   - `immediate` mode (no IntersectionObserver — for above-fold heroes)
 *   - Scroll-triggered mode via `useInView` (for sections further down the page)
 */

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

/* ── Types ──────────────────────────────────────────────────────────────── */

export interface LineConfig {
  text: string;
  /** Tailwind class(es) applied to every character span in this line */
  className?: string;
  /** Inline style applied to every character span in this line (e.g. gradient text) */
  style?: React.CSSProperties;
}

interface CharRevealProps {
  /** Array of strings or LineConfig objects (one per visual line) */
  lines: (string | LineConfig)[];
  /** The HTML element to render as the outer wrapper (defaults to "div") */
  as?: "h1" | "h2" | "h3" | "h4" | "div" | "span";
  /** className on the outer wrapper element */
  className?: string;
  /** Seconds before the first character begins animating (default 0) */
  delay?: number;
  /** Seconds between each successive character (default 0.022) */
  stagger?: number;
  /**
   * When true, animation fires immediately on mount — ideal for above-fold heroes.
   * When false (default), animation fires once the element enters the viewport.
   */
  immediate?: boolean;
  /** Tailwind margin class placed before every line after the first (default "mt-2") */
  lineGap?: string;
}

/* ── Component ──────────────────────────────────────────────────────────── */

export default function CharReveal({
  lines,
  as: Tag = "div",
  className = "",
  delay = 0,
  stagger = 0.022,
  immediate = false,
  lineGap = "mt-2",
}: CharRevealProps) {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref as React.RefObject<Element>, {
    once: true,
    margin: "-60px",
  });
  const shouldAnimate = immediate || inView;

  // Normalise to LineConfig[]
  const normalizedLines: LineConfig[] = lines.map((l) =>
    typeof l === "string" ? { text: l } : l,
  );

  // Track a global character index across all lines for consistent stagger timing
  let globalIdx = 0;

  return (
    // @ts-expect-error — polymorphic element via 'as' prop
    <Tag ref={ref} className={className}>
      {normalizedLines.map((line, lineIdx) => (
        <span
          key={lineIdx}
          /* display:block makes each line its own row, identical to a <div>
             but valid inside heading elements */
          style={{ display: "block" }}
          className={lineIdx > 0 ? lineGap : ""}
        >
          {[...line.text].map((char) => {
            const idx = globalIdx++;

            // Space: render naked so it retains natural width
            if (char === " ") {
              return (
                <span
                  key={idx}
                  style={{ display: "inline-block", minWidth: "0.25em" }}
                >
                  {" "}
                </span>
              );
            }

            return (
              <span
                key={idx}
                style={{
                  display: "inline-block",
                  overflow: "hidden",
                  verticalAlign: "bottom",
                  lineHeight: "inherit",
                }}
              >
                <motion.span
                  style={{ display: "inline-block", ...line.style }}
                  className={line.className ?? ""}
                  initial={{ y: "110%" }}
                  animate={shouldAnimate ? { y: "0%" } : { y: "110%" }}
                  transition={{
                    duration: 0.55,
                    delay: delay + idx * stagger,
                    ease: [0.76, 0, 0.24, 1],
                  }}
                >
                  {char}
                </motion.span>
              </span>
            );
          })}
        </span>
      ))}
    </Tag>
  );
}
