import { useEffect, useState } from "react";
import {
  Activity,
  ShieldCheck,
  Radio,
  BarChart3,
  Layers3,
} from "lucide-react";
import { AnimatePresence, motion, type Variants } from "framer-motion";

import { Badge } from "../ui/badge";
import InViewDecryptedText from "../InViewDecryptedText";

const features = [
  {
    icon: Radio,
    title: "Connectivity",
    subtitle: "Modbus, OPC-UA, MQTT, edge drivers, APIs",
    description:
      "Connect industrial assets over Modbus, OPC-UA, MQTT, edge drivers and modern APIs with support for Siemens, Rockwell, Schneider, ABB, IEC, DNP3, and BACnet.",
    color: "#f97316",
    label: "CONNECTIVITY",
    bullets: [
      "Field-ready Modbus, OPC-UA, and MQTT integration",
      "Support for Siemens, Rockwell, Schneider, ABB equipment",
      "Universal industrial protocol coverage for OT/IT networks",
    ],
  },
  {
    icon: ShieldCheck,
    title: "Security",
    subtitle: "IEC-62443, MFA, role-based access",
    description:
      "IEC-62443 aligned security with role-based access, MFA, secure deployment modes, and cloud or on-premise protection.",
    color: "#06b6d4",
    label: "SECURITY",
    bullets: [
      "IEC-62443 aligned industrial security posture",
      "Multi-factor authentication for every user and admin",
      "Role-based access controls across assets and data streams",
    ],
  },
  {
    icon: Layers3,
    title: "Limitless Model",
    subtitle: "Unlimited devices, tags, users, assets",
    description:
      "Unlimited field devices, tags, clients, users, and assets powered by a SaaS-ready industrial platform architecture.",
    color: "#22c55e",
    label: "LIMITLESS",
    bullets: [
      "Unlimited device and asset scale for industrial operations",
      "Infinite tag capacity for telemetry, alarms, and metadata",
      "SaaS-ready platform architecture for elastic growth",
    ],
  },
  {
    icon: Activity,
    title: "Intelligence",
    subtitle: "Alarms, KPIs, predictive analytics",
    description:
      "Alarm engine, fleet and VTS management, KPIs, predictive insights, report schedulers, and dynamic analytics.",
    color: "#f59e0b",
    label: "INTELLIGENCE",
    bullets: [
      "Advanced alarm engine and operational event processing",
      "Live KPIs and fleet / VTS telemetry management",
      "Predictive analytics and scheduled insight reporting",
    ],
  },
  {
    icon: BarChart3,
    title: "Visualization",
    subtitle: "Dashboards, GIS, asset maps",
    description:
      "Interactive dashboards, asset maps, GIS visualization, real-time reporting, and operational context across every workflow.",
    color: "#3b82f6",
    label: "VISUALIZE",
    bullets: [
      "Real-time dashboards with industrial context",
      "GIS mapping and asset visualization across sites",
      "Operational reports and visualization for exec decision-making",
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

const CoreFeatures = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(min-width: 768px)");
    const handleChange = (event: MediaQueryListEvent) => setIsDesktop(event.matches);
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
            <Badge
              variant="secondary"
              className="border border-black/[0.08] bg-[var(--bg-surface)]/80 p-4 text-sm font-medium text-[var(--data-green)]"
            >
              <span className="h-2 w-2 rounded-full bg-[var(--data-green)] inline-block mr-2" />
              <InViewDecryptedText
                text="ALTREX PLATFORM"
                speed={60}
                maxIterations={12}
                className="text-[var(--data-green)]"
                encryptedClassName="text-[var(--text-muted)]"
              />
            </Badge>
          </motion.div>

          <motion.h2
            variants={fadeUpVariants}
            className="mt-6 text-4xl font-bold tracking-tight text-[var(--text-primary)] sm:text-5xl"
          >
            Core features that power
            <span className="block bg-orange-500 bg-clip-text text-transparent">
              Industrial realtime operations
            </span>
          </motion.h2>

          <motion.p
            variants={fadeUpVariants}
            className="mt-6 text-lg leading-8 text-[var(--text-secondary)]"
          >
            Altrex Platform delivers secure connectivity, limitless scale, intelligent automation, and rich visualization for modern industrial systems.
          </motion.p>
        </div>

        <div
          className="mt-20 flex flex-col gap-6 md:flex-row"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          <div className="md:w-[40%]">
            <div className="hidden md:block rounded-3xl border border-white/10 bg-[var(--bg-surface)] p-4">
              {features.map((feature, index) => {
                const isActive = index === activeIndex;
                return (
                  <button
                    key={feature.label}
                    type="button"
                    onClick={() => setActiveIndex(index)}
                    className={`group mb-3 flex w-full cursor-pointer flex-col gap-2 rounded-2xl border-l-4 p-4 text-left transition-all duration-200 ${
                      isActive
                        ? "opacity-100"
                        : "opacity-40 hover:opacity-80"
                    }`}
                    style={{
                      borderColor: isActive ? feature.color : "transparent",
                      backgroundColor: isActive ? `${feature.color}14` : "transparent",
                    }}
                  >
                    <span className="font-mono text-xs uppercase tracking-widest text-[var(--text-muted)]">
                      0{index + 1}
                    </span>
                    <span className="text-lg font-bold text-[var(--text-primary)]">
                      {feature.title}
                    </span>
                    <span className="text-sm text-[var(--text-secondary)]">
                      {feature.subtitle}
                    </span>
                  </button>
                );
              })}
            </div>

            <div className="flex md:hidden overflow-x-auto rounded-3xl border border-white/10 bg-[var(--bg-surface)] p-4">
              <div className="flex gap-3">
                {features.map((feature, index) => {
                  const isActive = index === activeIndex;
                  return (
                    <button
                      key={feature.label}
                      type="button"
                      onClick={() => setActiveIndex(index)}
                      className={`min-w-[170px] rounded-2xl border p-4 text-left transition-all duration-200 ${
                        isActive
                          ? "opacity-100"
                          : "opacity-40 hover:opacity-80"
                      }`}
                      style={{
                        borderColor: isActive ? feature.color : "transparent",
                        backgroundColor: isActive ? `${feature.color}14` : "transparent",
                      }}
                    >
                      <div className="flex items-center justify-between gap-3">
                        <span className="font-mono text-[10px] uppercase tracking-widest text-[var(--text-muted)]">
                          0{index + 1}
                        </span>
                        <span className="text-xs text-[var(--text-secondary)]">
                          {feature.subtitle}
                        </span>
                      </div>
                      <p className="mt-3 text-sm font-bold text-[var(--text-primary)]">
                        {feature.title}
                      </p>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          <div className="md:w-[60%] rounded-3xl border border-white/10 bg-[var(--bg-raised)] p-8">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeFeature.label}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                className="flex flex-col gap-8"
              >
                <div className="font-mono text-[10px] tracking-widest text-[var(--text-muted)] uppercase">
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
                  <h3 className="text-3xl font-bold uppercase tracking-tight text-[var(--text-primary)]">
                    {activeFeature.title}
                  </h3>
                  <p className="max-w-3xl text-base leading-8 text-[var(--text-secondary)]">
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
                      <p className="text-sm leading-7 text-[var(--text-secondary)]">{bullet}</p>
                    </div>
                  ))}
                </div>

                <div className="mt-auto text-right font-mono text-[10px] tracking-widest text-[var(--text-muted)] uppercase">
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
