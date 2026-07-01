import { Link } from "react-router-dom";
import { useState } from "react";
import { motion, type Variants } from "framer-motion";
import {
  Flame,
  Zap,
  Droplet,
  Leaf,
  Factory,
  Truck,
  Building2,
  Construction,
  Activity,
  ArrowRight,
} from "lucide-react";
import { SectionBadge } from "@/components/ui/section-badge";
import { industriesRegistry } from "@/data/industriesRegistry";

// ── Icon mapping ──────────────────────────────────────────────────────────────
function getIconForIndustry(name: string) {
  const lowerName = name.toLowerCase();
  if (lowerName.includes("gas")) return Flame;
  if ((lowerName.includes("power") || lowerName.includes("energy")) && !lowerName.includes("renewable")) return Zap;
  if (lowerName.includes("renewable")) return Leaf;
  if (lowerName.includes("water")) return Droplet;
  if (lowerName.includes("manufactur")) return Factory;
  if (lowerName.includes("logistic") || lowerName.includes("transport")) return Truck;
  if (lowerName.includes("smart cit")) return Building2;
  if (lowerName.includes("infrastructure")) return Construction;
  return Activity;
}

// ── Solid color mapping per industry ─────────────────────────────────────────
// Distinct solid colors, no gradients. Orange-led palette with necessary
// differentiators so all 9 cards remain visually distinguishable.
function getColorForIndustry(name: string): string {
  const lowerName = name.toLowerCase();
  if (lowerName.includes("gas")) return "#ea580c";          // orange-600
  if (lowerName.includes("oil")) return "#c2410c";          // orange-700
  if (lowerName.includes("water")) return "#0891b2";        // cyan-600
  if (lowerName.includes("renewable")) return "#16a34a";    // green-600
  if (lowerName.includes("power") || lowerName.includes("energy")) return "#d97706"; // amber-600
  if (lowerName.includes("manufactur")) return "#7c3aed";   // violet-600
  if (lowerName.includes("logistic") || lowerName.includes("transport")) return "#2563eb"; // blue-600
  if (lowerName.includes("smart cit")) return "#0d9488";    // teal-600
  if (lowerName.includes("infrastructure")) return "#dc2626"; // red-600
  return "#f97316"; // fallback orange-500
}

// ── Extract bullet points for the flipped back face ──────────────────────────
function getBulletsForIndustry(industry: any): string[] {
  // Try common shapes that might exist in the registry data.
  if (Array.isArray(industry.keyCapabilities) && industry.keyCapabilities.length) {
    return industry.keyCapabilities.slice(0, 5);
  }
  if (Array.isArray(industry.highlights) && industry.highlights.length) {
    return industry.highlights.slice(0, 5);
  }
  if (Array.isArray(industry.modules) && industry.modules.length) {
    return industry.modules.slice(0, 5).map((m: any) => (typeof m === "string" ? m : m.title ?? m.name ?? ""));
  }
  if (Array.isArray(industry.challenges) && industry.challenges.length) {
    return industry.challenges.slice(0, 5).map((c: any) => (typeof c === "string" ? c : c.title ?? ""));
  }
  // Fallback: split overview into short sentence fragments.
  if (industry.overview) {
    return industry.overview
      .split(/[.,]/)
      .map((s: string) => s.trim())
      .filter((s: string) => s.length > 4)
      .slice(0, 4);
  }
  return [];
}

const containerVariants: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
};

const fadeUpVariants: Variants = {
  hidden: { opacity: 0, y: 20, scale: 0.96 },
  visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.5 } },
};

const headerFadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } },
};

// ── Single flip card ──────────────────────────────────────────────────────────
function IndustryFlipCard({ industry }: { industry: any }) {
  const [flipped, setFlipped] = useState(false);
  const Icon = getIconForIndustry(industry.name);
  const color = getColorForIndustry(industry.name);
  const tagline = industry.hero?.tagline || industry.overview?.split(".")[0] || "";
  const bullets = getBulletsForIndustry(industry);

  return (
    <motion.div variants={fadeUpVariants} className="relative" style={{ perspective: "1200px" }}>
      <div
        role="button"
        tabIndex={0}
        onClick={() => setFlipped((f) => !f)}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") setFlipped((f) => !f);
        }}
        className="group relative h-64 w-full cursor-pointer outline-none"
        style={{ perspective: "1200px" }}
      >
        <motion.div
          className="relative h-full w-full"
          style={{ transformStyle: "preserve-3d" }}
          animate={{ rotateY: flipped ? 180 : 0 }}
          transition={{ duration: 0.55, ease: [0.4, 0.0, 0.2, 1] }}
        >
          {/* ── FRONT FACE ── */}
          <div
            className="absolute inset-0 flex flex-col items-center justify-center rounded-2xl p-6 text-center shadow-xl overflow-hidden"
            style={{
              backgroundColor: color,
              backfaceVisibility: "hidden",
            }}
          >
            {/* Default state: icon only, centered */}
            <motion.div
              className="flex flex-col items-center justify-center transition-all duration-300"
            >
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-white/15 transition-all duration-300 group-hover:-translate-y-3 group-hover:bg-white/25">
                <Icon size={32} className="text-white" strokeWidth={1.8} />
              </div>

              {/* Title + tagline reveal on hover */}
              <div className="mt-0 grid grid-rows-[0fr] opacity-0 transition-all duration-300 group-hover:mt-4 group-hover:grid-rows-[1fr] group-hover:opacity-100">
                <div className="overflow-hidden">
                  <h3 className="text-base font-bold text-white leading-tight">
                    {industry.name}
                  </h3>
                  {tagline && (
                    <p className="mt-1.5 text-[11px] leading-snug text-white/80 line-clamp-2 max-w-[180px]">
                      {tagline}
                    </p>
                  )}
                </div>
              </div>
            </motion.div>

            {/* Click hint, fades in on hover */}
            <span className="absolute bottom-3 left-0 right-0 text-center text-[9px] font-mono uppercase tracking-widest text-white/0 transition-opacity duration-300 group-hover:text-white/60">
              Click to view details
            </span>
          </div>

          {/* ── BACK FACE ── */}
          <div
            className="absolute inset-0 flex flex-col rounded-2xl p-5 shadow-xl overflow-hidden"
            style={{
              backgroundColor: color,
              backfaceVisibility: "hidden",
              transform: "rotateY(180deg)",
            }}
          >
            <div className="flex items-center gap-2 border-b border-border pb-3">
              <Icon size={16} className="text-white shrink-0" strokeWidth={2} />
              <h3 className="text-sm font-bold text-white leading-tight">
                {industry.name}
              </h3>
            </div>

            <ul className="mt-3 flex-1 space-y-2 overflow-hidden">
              {bullets.length > 0 ? (
                bullets.map((b, i) => (
                  <li key={i} className="flex items-start gap-2 text-[11px] leading-snug text-white/90">
                    <span className="mt-1 h-1 w-1 shrink-0 rounded-full bg-white/70" />
                    <span className="line-clamp-2">{b}</span>
                  </li>
                ))
              ) : (
                <li className="text-[11px] text-white/70">
                  {industry.overview?.slice(0, 120) ?? "Details coming soon."}
                </li>
              )}
            </ul>

            <Link
              to={`/industries/${industry.slug}`}
              onClick={(e) => e.stopPropagation()}
              className="mt-3 flex items-center justify-center gap-1.5 rounded-lg bg-white/15 py-2 text-[11px] font-semibold text-white transition-colors hover:bg-white/25"
            >
              View Full Page
              <ArrowRight size={12} />
            </Link>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}

// ── Section ───────────────────────────────────────────────────────────────────
export default function IndustriesTeaser() {
  return (
    <section className="relative overflow-hidden bg-transparent py-28">
      <div className="mx-auto max-w-6xl px-6 lg:px-8">

        {/* Header */}
        <div className="mx-auto max-w-3xl text-center mb-16">
          <motion.div
            variants={headerFadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
          >
            <SectionBadge
              title="INDUSTRIES WE SERVE"
              dot={true}
              dotColor="bg-emerald-500"
              className="mb-6"
            />
          </motion.div>

          <motion.h2
            variants={headerFadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            className="mt-6 text-4xl font-bold tracking-tight text-foreground sm:text-5xl"
          >
            Built for Mission-Critical Operations
          </motion.h2>

          <motion.p
            variants={headerFadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            className="mt-4 text-lg text-muted-foreground font-semibold" 
          >
            Hover to preview. Click any card to explore what we deliver.
          </motion.p>
        </div>

        {/* 3×3 Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
        >
          {industriesRegistry.slice(0, 9).map((industry) => (
            <IndustryFlipCard key={industry.slug} industry={industry} />
          ))}
        </motion.div>

      </div>
    </section>
  );
}