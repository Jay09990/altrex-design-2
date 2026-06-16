/**
 * Lightweight "live system data" ticker used to sell motion + realtime feel.
 */

import { useMemo } from "react";

type SystemDataTickerProps = {
  items: string[];
  className?: string;
};

export default function SystemDataTicker({
  items,
  className,
}: SystemDataTickerProps) {
  const loop = useMemo(() => [...items, ...items], [items]);

  return (
    <div
      className={`relative overflow-hidden rounded-2xl border border-black/[0.08] bg-card ${className ?? ""}`}
    >
      <div className="pointer-events-none absolute inset-y-0 left-0 w-20 bg-gradient-to-r from-[var(--bg-void)] to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-20 bg-gradient-to-l from-[var(--bg-void)] to-transparent" />

      <div className="ticker-track flex w-max items-center gap-8 px-6 py-3 font-mono text-[10px] tracking-widest text-muted-foreground">
        {loop.map((item, idx) => (
          <span key={`${item}-${idx}`} className="whitespace-nowrap">
            [{item}]
          </span>
        ))}
      </div>

      <style>{`
        @keyframes ticker-scroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .ticker-track {
          animation: ticker-scroll 18s linear infinite;
          will-change: transform;
        }
      `}</style>
    </div>
  );
}

