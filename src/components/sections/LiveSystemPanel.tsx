import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import type { Solution } from "@/data/solutionsData";

interface LiveSystemPanelProps {
  solution: Solution;
}

export default function LiveSystemPanel({ solution }: LiveSystemPanelProps) {
  // Extract 2-3 metrics
  const metrics = solution.metrics.slice(0, 3);
  
  // Extract unique technology items from capabilities
  const techItems = Array.from(
    new Set(solution.capabilities.flatMap(c => c.items))
  ).slice(0, 6);
  
  const [activeChip, setActiveChip] = useState(0);

  useEffect(() => {
    if (techItems.length === 0) return;
    const interval = setInterval(() => {
      setActiveChip(prev => (prev + 1) % techItems.length);
    }, 2000);
    return () => clearInterval(interval);
  }, [techItems.length]);

  return (
    <div className="relative rounded-2xl border border-border bg-card shadow-xl overflow-hidden flex flex-col h-full w-full max-w-md ml-auto">
      {/* Terminal Header */}
      <div className="flex items-center px-4 py-2.5 border-b border-border bg-muted/30">
        <div className="flex gap-1.5 mr-4">
          <div className="h-2.5 w-2.5 rounded-full bg-red-500/80" />
          <div className="h-2.5 w-2.5 rounded-full bg-yellow-500/80" />
          <div className="h-2.5 w-2.5 rounded-full bg-green-500/80" />
        </div>
        <div className="flex items-center gap-2">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
          </span>
          <span className="font-mono text-[10px] text-muted-foreground uppercase tracking-widest">
            ALTREX PLATFORM — LIVE
          </span>
        </div>
      </div>

      {/* Body */}
      <div className="p-6 flex-1 flex flex-col gap-6 bg-card/40 backdrop-blur-sm">
        
        {/* Animated Metric Bar */}
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <span className="font-mono text-xs text-muted-foreground uppercase tracking-widest">System Load</span>
            <span className="font-mono text-[10px] text-orange-500 bg-orange-500/10 px-2 py-0.5 rounded uppercase">Optimal</span>
          </div>
          <div className="h-1.5 w-full bg-muted rounded-full overflow-hidden flex">
             <motion.div 
               className="h-full bg-orange-500 rounded-full"
               animate={{ width: ["30%", "75%", "45%", "85%", "50%", "30%"] }}
               transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
             />
          </div>
        </div>

        {/* Stat Tiles */}
        <div className="grid grid-cols-2 gap-3 mt-2">
          {metrics.map((metric, i) => (
            <div key={i} className={`border border-border rounded-xl p-3 bg-background/50 flex flex-col gap-1 ${i === 2 ? 'col-span-2' : ''}`}>
              <div className="flex items-center gap-1.5">
                <div className={`h-1.5 w-1.5 rounded-full ${i === 0 ? 'bg-green-500' : i === 1 ? 'bg-blue-500' : 'bg-fuchsia-500'}`} />
                <span className="font-mono text-[9px] text-muted-foreground uppercase tracking-wider truncate">
                  {metric.label}
                </span>
              </div>
              <div className="font-mono text-lg font-bold text-foreground truncate">
                {metric.value}
              </div>
            </div>
          ))}
        </div>

        {/* Tech Chips */}
        <div className="mt-auto pt-2">
          <div className="font-mono text-[10px] text-muted-foreground uppercase mb-3 tracking-widest">
            Active Protocols
          </div>
          <div className="flex flex-wrap gap-2">
            {techItems.map((item, idx) => (
              <motion.div
                key={item}
                animate={{
                  borderColor: activeChip === idx ? "rgba(249, 115, 22, 0.5)" : "var(--border)",
                  backgroundColor: activeChip === idx ? "rgba(249, 115, 22, 0.1)" : "transparent",
                  color: activeChip === idx ? "rgb(249, 115, 22)" : "inherit",
                }}
                className="px-2.5 py-1 border border-border text-[10px] text-muted-foreground font-mono rounded-md transition-colors duration-500"
              >
                {item}
              </motion.div>
            ))}
          </div>
        </div>
        
      </div>
    </div>
  );
}
