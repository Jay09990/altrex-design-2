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

const benefits = [
  {
    icon: Zap,
    title: "Ultra Low Latency",
    description:
      "Deliver realtime communication with millisecond response times optimized for modern distributed systems.",
  },

  {
    icon: ShieldCheck,
    title: "Enterprise Security",
    description:
      "Protect infrastructure with secure authentication, encrypted communication, and production-grade reliability.",
  },

  {
    icon: Layers3,
    title: "Infinite Scalability",
    description:
      "Scale seamlessly across regions and millions of connected devices without operational complexity.",
  },

  {
    icon: Globe,
    title: "Global Infrastructure",
    description:
      "Deploy worldwide with edge-ready architecture built for realtime global connectivity.",
  },

  {
    icon: TimerReset,
    title: "99.99% Reliability",
    description:
      "Built for mission-critical workloads with fault-tolerant systems and high availability architecture.",
  },

  {
    icon: Sparkles,
    title: "Developer Experience",
    description:
      "Modern APIs, SDKs, documentation, and tooling designed for fast integration and productivity.",
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
    <section className="relative overflow-hidden bg-gray-950 py-28">
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
          background-image: radial-gradient(circle, rgba(139,92,246,0.18) 1px, transparent 1px);
          background-size: 28px 28px;
        }
      `}</style>

      {/* Dot grid overlay */}
      <div className="dot-grid absolute inset-0 -z-10" />

      {/* Ambient glows */}
      <div className="absolute left-0 top-0 -z-10 h-[500px] w-[500px] rounded-full bg-violet-700/20 blur-3xl" />

      <div className="absolute bottom-0 right-0 -z-10 h-[400px] w-[400px] rounded-full bg-fuchsia-700/15 blur-3xl" />

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
            className="border border-violet-500/30 bg-violet-500/10 p-4 text-sm font-medium text-violet-400"
          >
            Why Choose Us
          </Badge>
        </motion.div>

        <div className="mt-6 max-w-2xl">
          <motion.h2
            variants={fadeUpVariants}
            className="text-4xl font-bold tracking-tight text-white sm:text-5xl"
          >
            Built for Modern{" "}

            <span className="bg-gradient-to-r from-violet-400 to-fuchsia-400 bg-clip-text text-transparent">
              Realtime Infrastructure
            </span>
          </motion.h2>

          <motion.p
            variants={fadeUpVariants}
            className="mt-4 text-lg text-gray-400"
          >
            Everything you need to build scalable, secure, and enterprise-grade
            realtime applications without operational complexity.
          </motion.p>
        </div>

        {/* Bento Grid */}
        <motion.div
          variants={fadeUpVariants}
          className="mt-16 grid gap-5 lg:grid-cols-3 lg:grid-rows-2"
        >
          {/* Hero Card */}
          <motion.div
            whileHover={{
              y: -6,
            }}
            transition={{
              duration: 0.25,
            }}
            className="relative col-span-1 overflow-hidden rounded-3xl bg-gradient-to-br from-violet-600 to-fuchsia-600 p-10 text-white shadow-2xl shadow-violet-900/40 lg:col-span-2"
          >
            <div className="absolute -right-16 -top-16 h-64 w-64 rounded-full bg-white/10 blur-3xl" />

            <div className="relative z-10">
              <motion.div
                whileHover={{
                  scale: 1.08,
                  rotate: 4,
                }}
                className="flex h-16 w-16 items-center justify-center rounded-2xl border border-white/20 bg-white/10 backdrop-blur-xl"
              >
                <Zap className="h-8 w-8 text-white" />
              </motion.div>

              <h3 className="mt-8 text-3xl font-bold leading-tight lg:text-4xl">
                Designed for High-Performance
                <br />
                Realtime Systems
              </h3>

              <p className="mt-5 text-lg leading-8 text-violet-100">
                Power scalable messaging, connected devices, and distributed
                applications with modern infrastructure optimized for speed,
                reliability, and global scale.
              </p>
            </div>
          </motion.div>

          {/* Live Metric Card */}
          <motion.div
            whileHover={{
              y: -6,
            }}
            transition={{
              duration: 0.25,
            }}
            className="relative row-span-2 overflow-hidden rounded-3xl border border-violet-800/40 bg-gray-900/60 p-8 backdrop-blur-xl"
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
                  label: "Messages Daily",
                  value: "10M+",
                  color: "text-violet-400",
                },

                {
                  label: "Uptime SLA",
                  value: "99.99%",
                  color: "text-green-400",
                },

                {
                  label: "Avg Latency",
                  value: "50ms",
                  color: "text-fuchsia-400",
                },

                {
                  label: "Global Regions",
                  value: "120+",
                  color: "text-cyan-400",
                },
              ].map((m, i) => (
                <motion.div
                  key={i}
                  initial={{
                    opacity: 0,
                    y: 20,
                  }}
                  whileInView={{
                    opacity: 1,
                    y: 0,
                  }}
                  transition={{
                    duration: 0.5,
                    delay: i * 0.12,
                  }}
                  className="stat-animate border-b border-white/5 pb-5"
                >
                  <p className={`text-4xl font-bold ${m.color}`}>
                    {m.value}
                  </p>

                  <p className="mt-1 text-sm text-gray-400">
                    {m.label}
                  </p>

                  <div className="mt-3 h-1 overflow-hidden rounded-full bg-white/10">
                    <motion.div
                      initial={{
                        width: 0,
                      }}
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
                      transition={{
                        duration: 1,
                        delay: i * 0.15,
                      }}
                      className={`h-full rounded-full ${
                        m.color === "text-violet-400"
                          ? "bg-violet-500"
                          : m.color === "text-green-400"
                            ? "bg-green-500"
                            : m.color === "text-fuchsia-400"
                              ? "bg-fuchsia-500"
                              : "bg-cyan-500"
                      }`}
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
                initial={{
                  opacity: 0,
                  y: 30,
                }}
                whileInView={{
                  opacity: 1,
                  y: 0,
                }}
                whileHover={{
                  y: -5,
                }}
                transition={{
                  duration: 0.35,
                  delay: i * 0.08,
                }}
                className="group flex gap-4 rounded-2xl border border-white/5 bg-gray-900/50 p-6 backdrop-blur-sm transition-all duration-300 hover:border-violet-500/30 hover:bg-gray-900/70"
              >
                <motion.div
                  whileHover={{
                    scale: 1.08,
                    rotate: 4,
                  }}
                  className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-violet-600 to-fuchsia-500 text-white shadow-md shadow-violet-900/40"
                >
                  <Icon className="h-5 w-5" />
                </motion.div>

                <div>
                  <h3 className="font-semibold text-white">
                    {item.title}
                  </h3>

                  <p className="mt-1.5 text-sm leading-6 text-gray-400">
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