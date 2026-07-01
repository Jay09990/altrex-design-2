import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  Activity,
  ShieldCheck,
  Radio,
  BarChart3,
  Layers3,
  ArrowRight,
} from "lucide-react";
import { AnimatePresence, motion, type Variants } from "framer-motion";

import { Badge } from "../ui/badge";
import { SectionBadge } from "../ui/section-badge";

const features = [
  {
    icon: Radio,
    title: "Connectivity",
    subtitle: "Modbus, OPC-UA, MQTT, edge drivers, APIs",
    description:
      "Connect PLCs, RTUs, flow computers, analyzers, energy meters, SCADA systems and edge gateways using industry-standard protocols.",
    color: "#f97316",
    label: "CONNECTIVITY",
    industryExample: "omc",
    industryLabel: "OMC",
    bullets: [
      "Modbus TCP/RTU, OPC-UA, and MQTT integration",
      "REST APIs, BACnet, IEC-104, DNP3",
      "Custom Industrial Drivers"
    ],
  },
  {
    icon: ShieldCheck,
    title: "Security",
    subtitle: "IEC-62443, MFA, role-based access",
    description:
      "Secure industrial infrastructure with IEC-62443 aligned architecture, role-based access control, MFA and encrypted communications.",
    color: "#f97316",
    label: "SECURITY",
    industryExample: "steel",
    industryLabel: "Steel",
    bullets: [
      "IEC-62443 aligned design",
      "Multi-factor authentication for every user and admin",
      "Role-based access controls",
      "Audit Trails",
      "Encrypted Communications"
    ],
  },
  {
    icon: Layers3,
    title: "Limitless Model",
    subtitle: "Unlimited devices, tags, users, assets",
    description:
      "Manage unlimited devices, tags, assets, users, locations and operational data through a centralized industrial information model",
    color: "#f97316",
    label: "LIMITLESS",
    industryExample: "wind",
    industryLabel: "Wind",
    bullets: [
      "Unlimited device and asset scale for industrial operations",
      "Infinite tag capacity for telemetry, alarms, and metadata",
      "SaaS-ready platform architecture for elastic growth",
      "User and role management for secure access at scale",
      "Site and location management for multi-site operations",
      "Hierarchical asset and location modeling for operational context",
      "Digital twin capabilities for real-time operational insights",
    ],
  },
  {
    icon: Activity,
    title: "Intelligence",
    subtitle: "Alarms, KPIs, predictive analytics",
    description:
      "Transform operational data into actionable insights through alarms, KPIs, analytics, reporting and predictive intelligence.",
    color: "#f97316",
    label: "INTELLIGENCE",
    industryExample: "manufacturing",
    industryLabel: "Manufacturing",
    bullets: [
      "Alarm Management ",
      "KPI Dashboards",
      "Predictive analytics and scheduled insight reporting",
      "Event Processing and Operational Insights",
    ],
  },
  {
    icon: BarChart3,
    title: "Visualization",
    subtitle: "Dashboards, GIS, asset maps",
    description:
      "Visualize rich operational dashboards with GIS mapping, asset tracking, trend analysis and enterprise reporting.",
    color: "#f97316",
    label: "VISUALIZE",
    industryExample: "renewable",
    industryLabel: "Renewable",
    bullets: [
      "Real-time dashboards with industrial context",
      "GIS mapping and asset visualization across sites",
      "Trend analysis and reporting for operational insights",
      "Mobile access to operational data and insights",
    ],
  },
];

const containerVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
    },
  },
};

const fadeUpVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 40,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
    },
  },
};

interface CoreFeaturesProps {
  showIndustryLinks?: boolean;
}

const CoreFeatures = ({ showIndustryLinks = false }: CoreFeaturesProps) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(min-width: 768px)");
    const handleChange = (event: MediaQueryListEvent) =>
      setIsDesktop(event.matches);
    setIsDesktop(mediaQuery.matches);
    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  useEffect(() => {
    if (!isDesktop || isPaused) return;
    const interval = window.setInterval(() => {
      setActiveIndex((current) => (current + 1) % features.length);
    }, 4000);
    return () => window.clearInterval(interval);
  }, [isDesktop, isPaused]);

  const activeFeature = features[activeIndex];

  return (
    <section className="relative overflow-hidden bg-transparent py-28">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        className="mx-auto max-w-7xl px-6 lg:px-8"
      >
        <div className="mx-auto max-w-3xl text-center">
          <motion.div variants={fadeUpVariants}>
            <SectionBadge
              title="W! PLATFORM"
              dot={true}
              pulse={false}
              dotColor="bg-[var(--data-green)]"
              className="border border-black/[0.08] bg-card/80 p-4 text-sm font-medium text-[var(--data-green)]"
              decryptedTextClassName="text-[var(--data-green)]"
            />
          </motion.div>

          <motion.h2
            variants={fadeUpVariants}
            className="mt-6 text-4xl font-bold tracking-tight text-foreground sm:text-5xl"
          >
            Enterprise Capabilities for
            <span className="block bg-orange-500 bg-clip-text text-transparent">
              Industrial Digital Transformation
            </span>
          </motion.h2>

          <motion.p
            variants={fadeUpVariants}
            className="mt-6 text-lg leading-8 text-muted-foreground"
          >
            Built for utility operators, manufacturing facilities, energy infrastructure, smart cities and mission-critical industrial environments.
          </motion.p>
        </div>

        <div
          className="mt-20 flex flex-col gap-6 md:flex-row"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          <div className="md:w-[40%]">
            <div className="hidden md:block rounded-3xl border border-border bg-card p-4">
              {features.map((feature, index) => {
                const isActive = index === activeIndex;
                return (
                  <button
                    key={feature.label}
                    type="button"
                    onClick={() => setActiveIndex(index)}
                    className={`group mb-3 flex w-full cursor-pointer flex-col gap-2 rounded-2xl border-l-4 p-4 text-left transition-all duration-200 ${isActive
                        ? "opacity-100"
                        : "opacity-40 hover:opacity-80"
                      }`}
                    style={{
                      borderColor: isActive ? feature.color : "transparent",
                      backgroundColor: isActive
                        ? `${feature.color}14`
                        : "transparent",
                    }}
                  >
                    <span className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
                      0{index + 1}
                    </span>
                    <span className="text-xl font-bold uppercase tracking-tight text-foreground">
                      {feature.title}
                    </span>
                    <span className="font-mono text-[12px] uppercase tracking-wide text-muted-foreground">
                      {feature.subtitle}
                    </span>
                  </button>
                );
              })}
            </div>

            <div className="flex md:hidden overflow-x-auto rounded-3xl border border-border bg-card p-4">
              <div className="flex gap-3">
                {features.map((feature, index) => {
                  const isActive = index === activeIndex;
                  return (
                    <button
                      key={feature.label}
                      type="button"
                      onClick={() => setActiveIndex(index)}
                      className={`min-w-[170px] rounded-2xl border p-4 text-left transition-all duration-200 ${isActive
                          ? "opacity-100"
                          : "opacity-40 hover:opacity-80"
                        }`}
                      style={{
                        borderColor: isActive ? feature.color : "transparent",
                        backgroundColor: isActive
                          ? `${feature.color}14`
                          : "transparent",
                      }}
                    >
                      <div className="flex items-center justify-between gap-3">
                        <span className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
                          0{index + 1}
                        </span>
                        <span className="font-mono text-[12px] uppercase tracking-wide text-muted-foreground">
                          {feature.subtitle}
                        </span>
                      </div>
                      <p className="mt-3 text-xl font-bold uppercase tracking-tight text-foreground">
                        {feature.title}
                      </p>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          <div className="md:w-[60%] rounded-3xl border border-border bg-muted p-8">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeFeature.label}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                className="flex flex-col gap-8"
              >
                <div className="font-mono text-[10px] tracking-widest text-muted-foreground uppercase">
                  [MODULE: {activeFeature.label} / STATUS: ACTIVE]
                </div>

                <div className="relative mx-auto flex h-28 w-28 items-center justify-center rounded-full">
                  <div
                    className="absolute inset-0 rounded-full"
                    style={{
                      background: activeFeature.color,
                      opacity: 0.08,
                      boxShadow: `0 0 40px ${activeFeature.color}40`,
                    }}
                  />
                  <activeFeature.icon
                    className="relative h-12 w-12"
                    style={{ color: activeFeature.color }}
                  />
                </div>

                <div className="space-y-4">
                  <h3 className="text-xl font-bold uppercase tracking-tight text-foreground">
                    {activeFeature.title}
                  </h3>
                  <p className="max-w-3xl text-[14px] leading-relaxed text-muted-foreground">
                    {activeFeature.description}
                  </p>
                </div>

                <div className="space-y-3">
                  {activeFeature.bullets.map((bullet) => (
                    <div key={bullet} className="flex items-start gap-3">
                      <span
                        className="mt-1 h-2.5 w-2.5 rounded-full"
                        style={{ backgroundColor: activeFeature.color }}
                      />
                      <p className="text-[14px] leading-relaxed text-muted-foreground">
                        {bullet}
                      </p>
                    </div>
                  ))}
                </div>

                {showIndustryLinks && "industryExample" in activeFeature && (
                  <div className="mt-8 pt-6 border-t border-border">
                    <Link
                      to={`/industries?sector=${activeFeature.industryExample}`}
                      className="inline-flex items-center gap-2 text-sm font-mono uppercase tracking-wider transition-all hover:gap-3"
                      style={{ color: activeFeature.color }}
                    >
                      <span>
                        See how this works in {activeFeature.industryLabel}
                      </span>
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                  </div>
                )}

                <div className="mt-auto text-right font-mono text-[10px] tracking-widest text-muted-foreground uppercase">
                  [SYS: 04 / LAT: 11ms / REG: EU-WEST]
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default CoreFeatures;
