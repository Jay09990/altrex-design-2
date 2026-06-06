import {
  Globe,
  Layers3,
  ShieldCheck,
  Sparkles,
  TimerReset,
  Zap,
} from "lucide-react";

import { motion, type Variants } from "framer-motion";

import { Badge } from "../ui/badge";
import InViewDecryptedText from "../InViewDecryptedText";

const benefits = [
  {
    icon: Zap,
    title: "Ultra Low Latency",
    description:
      "Deliver realtime communication with millisecond response times optimized for modern distributed systems.",
    gradient: "bg-orange-400",
    borderHover: "hover:border-orange-500/30",
    glow: "shadow-orange-900/40",
  },

  {
    icon: ShieldCheck,
    title: "Enterprise Security",
    description:
      "IEC-62443 aligned architecture, Multi-factor authentication,Role-based access, Comprehensive audit trails",
    gradient: "bg-blue-500",
    borderHover: "hover:border-cyan-500/30",
    glow: "shadow-cyan-900/40",
  },

  {
    icon: Layers3,
    title: "Infinite Scalability",
    description:
      "Scale from a single site to thousands ofassets and millions of telemetry points.",
    gradient: "bg-amber-500",
    borderHover: "hover:border-orange-500/30",
    glow: "shadow-orange-900/40",
  },

  {
    icon: Globe,
    title: "Hybrid Infrastructure",
    description:
      "Deploy on-premise, cloud or hybrid environments with edge-ready architecture.",
    gradient: "bg-teal-500",
    borderHover: "hover:border-emerald-500/30",
    glow: "shadow-emerald-900/40",
  },

  {
    icon: TimerReset,
    title: "99.99% Reliability",
    description:
      "99.99% availability for mission-critical industrial operations.",
    gradient: "bg-amber-500",
    borderHover: "hover:border-amber-500/30",
    glow: "shadow-amber-900/40",
  },

  {
    icon: Sparkles,
    title: "Developer Experience",
    description:
      "Modern APIs, SDKs, documentation, and tooling designed for fast integration and productivity.",
    gradient: "bg-cyan-500",
    borderHover: "hover:border-cyan-500/30",
    glow: "shadow-cyan-900/40",
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

const WhyChooseUs = () => {
  return (
    <section className="relative overflow-hidden bg-transparent py-28">
      <style>{`
        @keyframes count-up {
          from { opacity: 0; transform: translateY(12px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        .stat-animate {
          animation: count-up 0.7s ease both;
        }

        .stat-animate:nth-child(2) {
          animation-delay: 0.15s;
        }

        .stat-animate:nth-child(3) {
          animation-delay: 0.3s;
        }

        .stat-animate:nth-child(4) {
          animation-delay: 0.45s;
        }

        .dot-grid {
          background-image: radial-gradient(circle, rgba(255,107,0,0.15) 1px, transparent 1px);
          background-size: 28px 28px;
        }
      `}</style>

      {/* Dot grid overlay */}
      <div className="dot-grid absolute inset-0 -z-10" />

      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.15 }}
        className="mx-auto max-w-7xl px-6 lg:px-8"
      >
        {/* Section label */}
        <motion.div variants={fadeUpVariants}>
          <Badge
            variant="secondary"
            className="border border-orange-500/30 bg-orange-500/10 p-4 text-sm font-medium text-orange-500"
          >
            <InViewDecryptedText
              text="WHY CHOOSE US"
              speed={60}
              maxIterations={12}
              className="text-orange-500"
              encryptedClassName="text-[var(--text-muted)]"
            />
          </Badge>
        </motion.div>

        <div className="mt-6 max-w-2xl">
          <motion.h2
            variants={fadeUpVariants}
            className="text-4xl font-bold tracking-tight text-[var(--text-primary)] sm:text-5xl"
          >
            Built for Modern{" "}
            <span className="bg-violet-500 bg-clip-text text-transparent">
              Realtime Infrastructure
            </span>
          </motion.h2>

          <motion.p
            variants={fadeUpVariants}
            className="mt-4 text-lg text-[var(--text-secondary)]"
          >
            Everything required to monitor, manage and optimize
            industrial infrastructure from a single W! Platform.
          </motion.p>
        </div>

        {/* Bento Grid */}
        <motion.div
          variants={fadeUpVariants}
          className="mt-16 grid gap-6 lg:grid-cols-3 lg:grid-rows-4 auto-rows-min"
        >
          {/* Hero Card */}
          <motion.div
            whileHover={{ y: -6 }}
            transition={{ duration: 0.25 }}
            className="relative col-span-1 overflow-hidden rounded-3xl bg-[var(--bg-surface)] p-10 shadow-2xl lg:col-span-2 lg:row-span-2"
          >
            <div className="relative z-10">
              <motion.div
                whileHover={{ scale: 1.08, rotate: 4 }}
                className="flex h-16 w-16 items-center justify-center rounded-2xl border border-orange-500/30 bg-gradient-to-br from-orange-600 to-orange-400 text-white shadow-md"
              >
                <Zap className="h-8 w-8 text-white" />
              </motion.div>

              <h3 className="mt-8 text-3xl font-bold leading-tight lg:text-4xl">
                Designed for
                <br />
                Mission-Critical Operations.
              </h3>

              <p className="mt-5 text-lg leading-8 text-[var(--text-secondary)]">
                Deliver continuous visibility and control across
                distributed industrial assets with enterprise-grade
                reliabilit
              </p>
            </div>
          </motion.div>

          {/* Live Metric Card */}
          <motion.div
            whileHover={{ y: -6 }}
            transition={{ duration: 0.25 }}
            className="relative overflow-hidden rounded-3xl border border-orange-200/60 bg-[var(--bg-surface)] p-8 shadow-sm lg:row-span-4"
          >
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-green-500/30 bg-green-500/10 px-3 py-1 text-xs font-medium text-green-400">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-green-500" />
              </span>
              Live Metrics
            </div>

            <div className="space-y-6">
              {[
                {
                  label: "Connected Devices",
                  value: "2K+",
                  color: "text-orange-600",
                  iconBg: "bg-orange-500/10",
                  iconColor: "text-orange-500",
                  deltaColor: "bg-orange-500/10 text-orange-700",
                  bar: "bg-gradient-to-r from-orange-500 to-amber-400",
                },
                {
                  label: "Telemetry Events / Day",
                  value: "10M+",
                  color: "text-violet-600",
                  iconBg: "bg-violet-500/10",
                  iconColor: "text-violet-500",
                  deltaColor: "bg-violet-500/10 text-violet-700",
                  bar: "bg-gradient-to-r from-violet-500 to-purple-400",
                },
                {
                  label: "Platform Availability",
                  value: "99.9%",
                  color: "text-teal-600",
                  iconBg: "bg-teal-500/10",
                  iconColor: "text-teal-500",
                  deltaColor: "bg-teal-500/10 text-teal-700",
                  bar: "bg-gradient-to-r from-teal-500 to-emerald-400",
                },
                {
                  label: "Operational Facilities",
                  value: "10+",
                  color: "text-sky-600",
                  iconBg: "bg-sky-500/10",
                  iconColor: "text-sky-500",
                  deltaColor: "bg-sky-500/10 text-sky-700",
                  bar: "bg-gradient-to-r from-sky-500 to-cyan-400",
                },
              ].map((m, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: i * 0.12 }}
                  className="stat-animate border-b border-black/[0.06] pb-5"
                >
                  <p className={`text-4xl font-bold ${m.color}`}>{m.value}</p>
                  <p className="mt-1 text-sm text-[var(--text-muted)]">
                    {m.label}
                  </p>
                  <div className="mt-3 h-1 overflow-hidden rounded-full bg-black/[0.08]">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{
                        width:
                          i === 0
                            ? "72%"
                            : i === 1
                              ? "99.99%"
                              : i === 2
                                ? "40%"
                                : "85%",
                      }}
                      transition={{ duration: 1, delay: i * 0.15 }}
                      className={`h-full rounded-full ${m.bar}`}
                    />
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Bottom Cards */}
          {benefits.slice(1, 5).map((item, i) => {
            const Icon = item.icon;

            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                whileHover={{ y: -5 }}
                transition={{ duration: 0.35, delay: i * 0.08 }}
                className={`group flex gap-4 self-start rounded-2xl border border-black/[0.07] bg-[var(--bg-surface)] p-6 shadow-sm transition-all duration-300 ${item.borderHover} hover:bg-[var(--bg-raised)]`}
              >
                <motion.div
                  whileHover={{ scale: 1.08, rotate: 4 }}
                  className={`flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-xl bg-gradient-to-br ${item.gradient} text-white shadow-md ${item.glow}`}
                >
                  <Icon className="h-5 w-5" />
                </motion.div>

                <div>
                  <h3 className="font-semibold text-[var(--text-primary)]">
                    {item.title}
                  </h3>

                  <p className="mt-1.5 text-sm leading-6 text-[var(--text-secondary)]">
                    {item.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </motion.div>
    </section>
  );
};

export default WhyChooseUs;
