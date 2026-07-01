import { Link } from "react-router-dom";
import { motion, type Variants } from "framer-motion";
import {
  Radio,
  Cpu,
  Monitor,
  MapPin,
  Truck,
  BarChart2,
  Zap,
  Bell,
  TrendingUp,
  ShieldCheck,
  Camera,
  ArrowRight,
} from "lucide-react";
import { SectionBadge } from "@/components/ui/section-badge";
import { SOLUTIONS } from "@/data/solutionsData";

function getIconForSolution(slug: string) {
  switch (slug) {
    case "connectivity":       return Radio;
    case "iiot-platform":      return Cpu;
    case "web-scada":          return Monitor;
    case "gis-asset-management": return MapPin;
    case "fleet-management":   return Truck;
    case "amr":                return BarChart2;
    case "energy-management":  return Zap;
    case "alarm-management":   return Bell;
    case "analytics-reporting": return TrendingUp;
    case "cybersecurity":      return ShieldCheck;
    case "cctv-surveillance":  return Camera;
    default:                   return Cpu;
  }
}

const containerVariants: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
};

const fadeUpVariants: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const headerFadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } },
};

export default function SolutionsOverview() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-transparent">
      <div className="mx-auto max-w-7xl px-6 py-28 lg:px-8">

        {/* ── Page header ── */}
        <div className="mx-auto max-w-3xl text-center mb-20">
          <motion.div
            variants={headerFadeUp}
            initial="hidden"
            animate="visible"
          >
            <SectionBadge
              title="OUR SOLUTIONS"
              dot={true}
              dotColor="bg-emerald-500"
              className="mb-8"
            />
          </motion.div>

          <motion.h1
            variants={headerFadeUp}
            initial="hidden"
            animate="visible"
            transition={{ delay: 0.05 }}
            className="mt-6 text-4xl font-bold tracking-tight text-foreground sm:text-5xl"
          >
            Explore the Altrex Platform
          </motion.h1>

          <motion.p
            variants={headerFadeUp}
            initial="hidden"
            animate="visible"
            transition={{ delay: 0.1 }}
            className="mt-5 text-lg leading-relaxed text-muted-foreground"
          >
            Eleven integrated modules. One unified industrial platform.
          </motion.p>
        </div>

        {/* ── Solutions grid ── */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
        >
          {SOLUTIONS.map((solution) => {
            const Icon = getIconForSolution(solution.slug);
            const tagline = solution.hero?.tagline || "";

            return (
              <motion.div key={solution.slug} variants={fadeUpVariants}>
                <Link
                  to={`/solutions/${solution.slug}`}
                  className="group relative flex h-full flex-col rounded-2xl border border-border bg-[var(--bg-surface)] p-6 shadow-lg transition-all duration-300 hover:-translate-y-1 hover:border-border hover:bg-[var(--bg-surface)]/80 backdrop-blur-sm"
                >
                  {/* Icon */}
                  <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-xl bg-orange-500/10 text-orange-500 border border-orange-500/20 shadow-[0_0_15px_rgba(249,115,22,0.15)] transition-all duration-300 group-hover:scale-110 group-hover:bg-orange-500/20">
                    <Icon className="h-6 w-6" />
                  </div>

                  {/* Name */}
                  <h2 className="mb-2 text-lg font-bold tracking-tight text-foreground">
                    {solution.name}
                  </h2>

                  {/* Tagline */}
                  {tagline && (
                    <p className="text-[13px] leading-relaxed text-muted-foreground line-clamp-2 flex-1">
                      {tagline}
                    </p>
                  )}

                  {/* Arrow */}
                  <div className="mt-5 flex items-center gap-1.5 text-[12px] font-semibold text-orange-500 transition-all duration-300 group-hover:gap-2.5">
                    Explore
                    <ArrowRight className="h-3.5 w-3.5" />
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </motion.div>

      </div>
    </div>
  );
}
