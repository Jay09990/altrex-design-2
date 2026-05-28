/**
 * Scrambles through random values (diagnostic-style) before settling on a final label.
 */

import { useEffect, useMemo, useRef, useState } from "react";
import { useInView } from "framer-motion";

type ScrambleCounterProps = {
  target: number;
  finalText: string;
  className?: string;
  /**
   * Total frames for the scramble.
   */
  totalFrames?: number;
  /**
   * Interval duration in ms.
   */
  intervalMs?: number;
};

export default function ScrambleCounter({
  target,
  finalText,
  className,
  totalFrames = 40,
  intervalMs = 30,
}: ScrambleCounterProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-10%" });
  const [display, setDisplay] = useState(finalText);

  const formattedTarget = useMemo(
    () => Math.max(0, Math.floor(target)).toLocaleString(),
    [target]
  );

  useEffect(() => {
    if (!isInView) return;

    let frame = 0;
    const total = Math.max(1, totalFrames);

    const id = window.setInterval(() => {
      if (frame < total * 0.7) {
        const next = Math.floor(Math.random() * Math.max(1, target));
        setDisplay(next.toLocaleString());
      } else {
        const progress = frame / total;
        setDisplay(Math.floor(target * progress).toLocaleString());
      }

      frame += 1;
      if (frame >= total) {
        window.clearInterval(id);
        setDisplay(finalText || formattedTarget);
      }
    }, intervalMs);

    return () => window.clearInterval(id);
  }, [finalText, formattedTarget, intervalMs, isInView, target, totalFrames]);

  return (
    <span ref={ref} className={className}>
      {display}
    </span>
  );
}

