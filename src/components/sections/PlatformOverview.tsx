import { motion, type Variants } from "framer-motion";
import {
  LayoutDashboard,
  Map,
  AlertTriangle,
  TrendingUp,
  Smartphone,
  Plug,
  Users,
  FileText,
  ArrowRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";

const features = [
  { icon: LayoutDashboard, label: "Dashboards" },
  { icon: Map, label: "GIS Mapping" },
  { icon: AlertTriangle, label: "Alarm Management" },
  { icon: TrendingUp, label: "Historian" },
  { icon: Smartphone, label: "Mobile Access" },
  { icon: Plug, label: "Open APIs" },
  { icon: Users, label: "User Management" },
  { icon: FileText, label: "Reports" },
];

const containerVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.08,
    },
  },
};

const fadeUpVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5 },
  },
};

const headerFadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
  },
};

export default function PlatformOverview() {
  return (
    <section className="relative overflow-hidden bg-[var(--bg-void)] py-28 border-y border-white/5">
      <div className="mx-auto max-w-5xl px-6 lg:px-8">
        {/* Header */}
        <div className="mx-auto max-w-2xl text-center mb-16">
          <motion.h2
            variants={headerFadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl"
          >
            Altrex Digital Platform
          </motion.h2>
          <motion.p
            variants={headerFadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            className="mt-4 text-lg leading-relaxed text-muted-foreground"
          >
            Single platform to manage assets, operations, alarms, analytics, and field infrastructure.
          </motion.p>
        </div>

        {/* Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          className="grid grid-cols-2 gap-4 sm:grid-cols-4 sm:gap-6"
        >
          {features.map((feat, i) => {
            const Icon = feat.icon;
            return (
              <motion.div
                key={i}
                variants={fadeUpVariants}
                className="group flex flex-col items-center justify-center rounded-2xl border border-white/5 bg-white/[0.02] p-6 transition-colors duration-300 hover:bg-white/[0.04]"
              >
                <div
                  className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl transition-transform duration-300 group-hover:scale-110"
                  style={{
                    backgroundColor: "rgba(249,115,22,0.08)",
                    border: "1px solid rgba(249,115,22,0.2)",
                  }}
                >
                  <Icon className="h-6 w-6 text-orange-500" />
                </div>
                <span className="text-center text-sm font-medium text-foreground">
                  {feat.label}
                </span>
              </motion.div>
            );
          })}
        </motion.div>

        {/* CTA */}
        <motion.div
          variants={headerFadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          className="mt-16 flex justify-center"
        >
          <Button
            size="lg"
            className="gap-2 bg-primary px-8 py-6 text-base text-primary-foreground hover:bg-accent shadow-lg shadow-primary/20"
          >
            Explore Platform
            <ArrowRight className="h-4 w-4" />
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
