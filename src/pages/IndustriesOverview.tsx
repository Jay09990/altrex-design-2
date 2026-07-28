import { Link } from "react-router-dom";
import { motion, type Variants } from "framer-motion";
import {
  Flame,
  Droplets,
  Zap,
  Sun,
  Factory,
  Truck,
  Building2,
  Network,
  Gauge,
  ArrowRight,
} from "lucide-react";
import { SectionBadge } from "@/components/ui/section-badge";
import { industriesRegistry } from "@/data/industriesRegistry";

function getIconForIndustry(slug: string) {
  switch (slug) {
    case "cgd":                        return Flame;
    case "oil-gas":                    return Gauge;
    case "water-wastewater":           return Droplets;
    case "power-utilities":            return Zap;
    case "renewable-energy":           return Sun;
    case "manufacturing-automation":   return Factory;
    case "logistics-transportation":   return Truck;
    case "smart-cities":               return Building2;
    case "infrastructure-utilities":   return Network;
    default:                           return Building2;
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

export default function IndustriesOverview() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-transparent">
      <div className="mx-auto max-w-7xl px-6 py-28 lg:px-8">

        {/* Page header */}
        <div className="mx-auto max-w-3xl text-center mb-20">
          <motion.div
            variants={headerFadeUp}
            initial="hidden"
            animate="visible"
          >
            <SectionBadge
              title="INDUSTRIES WE SERVE"
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
            Built for Every Industrial Sector
          </motion.h1>

          <motion.p
            variants={headerFadeUp}
            initial="hidden"
            animate="visible"
            transition={{ delay: 0.1 }}
            className="mt-5 text-lg leading-relaxed text-muted-foreground"
          >
            Tailored digital solutions across nine critical industries from city gas to smart cities.
          </motion.p>
        </div>

        {/* Industries grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
        >
          {industriesRegistry.map((industry) => {
            const Icon = getIconForIndustry(industry.slug);
            const tagline = industry.hero?.tagline || "";

            return (
              <motion.div key={industry.slug} variants={fadeUpVariants}>
                <Link
                  to={`/industries/${industry.slug}`}
                  className="group relative flex h-full flex-col rounded-2xl border border-border bg-[var(--bg-surface)] p-6 shadow-lg transition-all duration-300 hover:-translate-y-1 hover:border-border hover:bg-[var(--bg-surface)]/80 backdrop-blur-sm"
                >
                  <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-xl bg-orange-500/10 text-orange-500 border border-orange-500/20 shadow-[0_0_15px_rgba(249,115,22,0.15)] transition-all duration-300 group-hover:scale-110 group-hover:bg-orange-500/20">
                    <Icon className="h-6 w-6" />
                  </div>

                  <h2 className="mb-2 text-lg font-bold tracking-tight text-foreground">
                    {industry.name}
                  </h2>

                  {tagline && (
                    <p className="text-[13px] leading-relaxed text-muted-foreground line-clamp-2 flex-1">
                      {tagline}
                    </p>
                  )}

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
