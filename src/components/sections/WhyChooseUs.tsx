import {
  Globe,
  Layers3,
  ShieldCheck,
  Sparkles,
  TimerReset,
  Zap,
} from "lucide-react";

import { motion, type Variants } from "framer-motion";

import { SectionBadge } from "../ui/section-badge";
import { Button } from "../ui/button";

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
        <motion.div variants={fadeUpVariants}>
          <SectionBadge
            title="WHY CHOOSE US"
            className="mb-6 p-2"
            decryptedTextClassName="text-secondary-foreground"
          />
        </motion.div>

        <div className="mt-6 max-w-2xl">
          <motion.h2
            variants={fadeUpVariants}
            className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl"
          >
            Ready to Modernize Your{" "}
            <span className="bg-violet-500 bg-clip-text text-transparent">
              Operations?
            </span>
          </motion.h2>

          <motion.p
            variants={fadeUpVariants}
            className="mt-4 text-lg text-muted-foreground"
          >
            See how Altrex can help you connect assets, visualize operations,
            and make smarter decisions.
          </motion.p>

          <motion.div
            variants={fadeUpVariants}
            className="mt-8 flex flex-col gap-4 sm:flex-row"
          >
            <Button className="gap-2 bg-violet-500 text-white border-none hover:bg-violet-400">
              Schedule Demo
            </Button>
            <Button variant="outline" className="gap-2">
              Contact Sales
            </Button>
          </motion.div>
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
            className="relative col-span-1 overflow-hidden rounded-3xl bg-card p-10 shadow-2xl lg:col-span-2 lg:row-span-2"
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

              <p className="mt-5 text-lg leading-8 text-muted-foreground">
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
            className="relative overflow-hidden rounded-3xl border border-orange-200/60 bg-card p-8 shadow-sm lg:row-span-4"
          >
            <SectionBadge dot={true} dotColor="bg-emerald-500" className="mb-6">
              Live Metrics
            </SectionBadge>

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
                  <p className="mt-1 text-sm text-muted-foreground">
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
                className={`group flex gap-4 self-start rounded-2xl border border-black/[0.07] bg-card p-6 shadow-sm transition-all duration-300 h-41 ${item.borderHover} hover:bg-muted`}
              >
                <motion.div
                  whileHover={{ scale: 1.08, rotate: 4 }}
                  className={`flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-xl bg-gradient-to-br ${item.gradient} text-white shadow-md ${item.glow}`}
                >
                  <Icon className="h-5 w-5" />
                </motion.div>

                <div>
                  <h3 className="font-semibold text-foreground">
                    {item.title}
                  </h3>

                  <p className="mt-1.5 text-sm leading-6 text-muted-foreground">
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
