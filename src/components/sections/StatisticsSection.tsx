import {
  Activity,
  ArrowUpRight,
  Globe,
  MessagesSquare,
  ShieldCheck,
  Timer,
  Wifi,
  Zap,
} from "lucide-react";

import { motion, type Variants } from "framer-motion";

import { Badge } from "../ui/badge";
import ScrambleCounter from "../ScrambleCounter";
import SystemDataTicker from "../SystemDataTicker";
import InViewDecryptedText from "../InViewDecryptedText";

const stats = [
  {
    icon: MessagesSquare,
    target: 10_000_000,
    value: "10M+",
    label: "Messages Processed Daily",
    description: "Realtime events and messaging traffic handled globally.",
  },
  {
    icon: Wifi,
    target: 24_800,
    value: "24.8K",
    label: "Active Connections",
    description: "Connected devices and live realtime infrastructure.",
  },
  {
    icon: Timer,
    target: 50,
    value: "50ms",
    label: "Average Latency",
    description: "Ultra-fast communication optimized for realtime systems.",
  },
  {
    icon: Globe,
    target: 120,
    value: "120+",
    label: "Global Regions",
    description: "Distributed infrastructure deployed worldwide.",
  },
  {
    icon: ShieldCheck,
    target: 100,
    value: "99.99%",
    label: "Infrastructure Uptime",
    description: "Enterprise-grade reliability for mission-critical systems.",
  },
  {
    icon: Activity,
    target: 1_200_000,
    value: "1.2M/s",
    label: "Message Throughput",
    description: "High-performance event streaming at massive scale.",
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

const StatisticsSection = () => {
  return (
    <section className="relative overflow-hidden bg-transparent py-28">
      <style>{`
        @keyframes gradient-sweep {
          0%   { background-position: 0% 50%; }
          50%  { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }

        .bg-sweep {
          background: linear-gradient(
            135deg,
            #ede9fe 0%,
            #f5f3ff 30%,
            #e0e7ff 60%,
            #f5f3ff 100%
          );

          background-size: 300% 300%;

          animation: gradient-sweep 10s ease infinite;
          opacity: 0.42;
        }

        @keyframes fade-up {
          from {
            opacity: 0;
            transform: translateY(16px);
          }

          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .fade-up {
          animation: fade-up 0.6s ease both;
        }
      `}</style>

      {/* Animated gradient background */}
      <div className="absolute inset-0 -z-10" />

      {/* Ambient glows */}
      <motion.div
        animate={{
          opacity: [0.25, 0.45, 0.25],
          scale: [1, 1.08, 1],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
        }}
      />

      <motion.div
        animate={{
          opacity: [0.2, 0.4, 0.2],
          scale: [1, 1.1, 1],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
        }}
      />

      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.15 }}
        className="mx-auto max-w-7xl px-6 lg:px-8"
      >
        {/* Header */}
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <motion.div variants={fadeUpVariants}>
              <Badge
                variant="secondary"
                className="border border-orange-500/30 bg-orange-500/10 p-4 text-sm font-medium text-orange-400"
              >
                <InViewDecryptedText
                  text="STATISTICS & METRICS"
                  speed={60}
                  maxIterations={12}
                  className="text-violet-300"
                  encryptedClassName="text-[var(--text-muted)]"
                />
              </Badge>
            </motion.div>

            <motion.h2
              variants={fadeUpVariants}
            className="mt-6 max-w-xl text-4xl font-bold tracking-tight text-[var(--text-primary)] sm:text-5xl"
            >
              Realtime Infrastructure{" "}

              <span className="bg-orange-500 bg-clip-text text-transparent">
                at Global Scale
              </span>
            </motion.h2>

            <motion.p
              variants={fadeUpVariants}
              className="mt-4 max-w-lg text-lg text-[var(--text-secondary)]"
            >
              High-performance infrastructure optimized for modern realtime
              messaging, IoT communication, and distributed systems.
            </motion.p>
          </div>

          {/* Live badge */}
          <motion.div
            variants={fadeUpVariants}
            whileHover={{
              y: -3,
            }}
            transition={{
              duration: 0.25,
            }}
            className="flex flex-shrink-0 items-center gap-3 rounded-2xl border border-1 border-orange-500/30 bg-orange-600/30 px-6 py-4"
          >
            <span className="relative flex h-3 w-3">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75" />

              <span className="relative inline-flex h-3 w-3 rounded-full bg-green-500" />
            </span>

            <div>
              <p className="text-2xl font-bold text-[var(--text-primary)]">
                1.2M/s
              </p>

              <p className="text-xs text-[var(--text-muted)]">
                Live throughput
              </p>
            </div>
          </motion.div>
        </div>

        <motion.div variants={fadeUpVariants} className="mt-10">
          <SystemDataTicker
            items={[
              "SYS: OK",
              "REGIONS: 120 ONLINE",
              "LATENCY: 11ms P50",
              "PACKETS: 2.1M/s",
              "ERROR_RATE: 0.002%",
              "QUEUE_DEPTH: 14",
              "UPTIME: 99.99%",
            ]}
          />
        </motion.div>

        {/* Top row */}
        <div className="mt-16 flex flex-col divide-y divide-black/[0.06] sm:flex-row sm:divide-x sm:divide-y-0">
          {stats.slice(0, 3).map((item, i) => {
            const Icon = item.icon;

            return (
              <motion.div
                key={i}
                variants={fadeUpVariants}
                whileHover={{
                  y: -4,
                }}
                transition={{
                  duration: 0.25,
                }}
                className="fade-up flex-1 px-4 py-8 sm:px-10 sm:py-4"
                style={{
                  animationDelay: `${i * 0.12}s`,
                }}
              >
                <motion.div
                  whileHover={{
                    rotate: 4,
                    scale: 1.06,
                  }}
                  className="flex h-11 w-11 items-center justify-center rounded-xl bg-orange-500 text-white shadow-lg"
                >
                  <Icon className="h-5 w-5" />
                </motion.div>

                <p className="mt-6 text-7xl font-bold tracking-tight text-[var(--text-primary)]">
                  <ScrambleCounter target={item.target} finalText={item.value} />
                </p>

                <p className="mt-3 text-xl font-bold uppercase tracking-tight text-[var(--text-primary)]">
                  {item.label}
                </p>

                <p className="mt-2 text-[14px] leading-relaxed text-[var(--text-muted)]">
                  {item.description}
                </p>
              </motion.div>
            );
          })}
        </div>

        {/* Divider */}
        <div className="my-6 h-px bg-black/[0.06]" />

        {/* Bottom row */}
        <div className="grid gap-6 sm:grid-cols-3">
          {stats.slice(3).map((item, i) => {
            const Icon = item.icon;

            return (
              <motion.div
                key={i}
                variants={fadeUpVariants}
                whileHover={{
                  y: -4,
                }}
                transition={{
                  duration: 0.25,
                }}
                className="flex items-start gap-4 rounded-2xl border border-black/[0.08] p-5 shadow-sm bg-[var(--bg-surface)]"
              >
                <motion.div
                  whileHover={{
                    scale: 1.08,
                    rotate: 4,
                  }}
                  className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-black/5 text-[var(--text-muted)]"
                >
                  <Icon className="h-4.5 w-4.5" />
                </motion.div>

                <div>
                  <div className="flex items-center gap-2">
                    <p className="text-3xl font-bold text-[var(--text-primary)]">
                      <ScrambleCounter target={item.target} finalText={item.value} />
                    </p>

                    <div className="flex items-center gap-0.5 text-xs font-medium text-green-400">
                      <ArrowUpRight className="h-3 w-3" />
                      +12%
                    </div>
                  </div>

                  <p className="mt-1 font-mono text-[12px] uppercase tracking-wide text-[var(--text-muted)]">
                    {item.label}
                  </p>

                  <p className="mt-1 text-[14px] leading-relaxed text-[var(--text-secondary)]">
                    {item.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Bottom analytics section */}
        <motion.div
          variants={fadeUpVariants}
          whileHover={{
            y: -4,
          }}
          transition={{
            duration: 0.25,
          }}
          className="mt-16 grid gap-8 overflow-hidden rounded-3xl p-8 lg:grid-cols-2"
        >
          <div>
            <div className="inline-flex items-center rounded-full border border-violet-500/20 bg-violet-500/10 px-4 py-2 text-sm font-medium text-violet-400">
              Live Realtime Analytics
            </div>

            <h3 className="mt-6 text-3xl font-bold text-[var(--text-primary)]">
              Monitor Infrastructure Performance in Realtime
            </h3>

            <p className="mt-4 text-base leading-8 text-[var(--text-secondary)]">
              Gain complete visibility into messaging traffic, connected
              devices, and distributed infrastructure through powerful realtime
              analytics.
            </p>

            <div className="mt-8 grid grid-cols-2 gap-4">
              {[
                {
                  label: "Data Streamed Monthly",
                  value: "4.8PB",
                },

                {
                  label: "Concurrent Sessions",
                  value: "850K+",
                },
              ].map((m, i) => (
                <motion.div
                  key={i}
                  whileHover={{
                    y: -3,
                  }}
                  transition={{
                    duration: 0.2,
                  }}
                  className="rounded-2xl border border-black/[0.08] bg-[var(--bg-surface)] p-5 shadow-sm"
                >
                  <p className="text-3xl font-bold text-[var(--text-primary)]">
                    {m.value}
                  </p>

                  <p className="mt-1 text-sm text-[var(--text-muted)]">
                    {m.label}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Fake chart panel */}
          <motion.div
            whileHover={{
              y: -3,
            }}
            transition={{
              duration: 0.2,
            }}
            className="overflow-hidden rounded-2xl border border-black/[0.08] bg-[var(--bg-surface)] p-6 shadow-sm"
          >
            <div className="flex items-center justify-between">
              <p className="text-sm font-medium text-[var(--text-muted)]">
                Throughput Growth
              </p>

              <div className="flex items-center gap-1.5 text-xs text-green-400">
                <Zap className="h-3 w-3" />
                +128% this year
              </div>
            </div>

            <div className="mt-6 flex h-40 items-end gap-2">
              {[60, 80, 100, 75, 120, 90, 140, 110, 170, 130, 190, 150].map(
                (h, i) => (
                  <motion.div
                    key={i}
                    initial={{
                      height: 0,
                    }}
                    whileInView={{
                      height: `${(h / 190) * 100}%`,
                    }}
                    transition={{
                      duration: 0.5,
                      delay: i * 0.05,
                    }}
                    className="flex-1 rounded-t bg-orange-500"
                  />
                )
              )}
            </div>

            <div className="mt-6 flex items-center justify-between">
              <p className="text-sm text-[var(--text-muted)]">
                Jan — Dec 2024
              </p>

              <div className="flex items-center gap-2 rounded-full border border-green-500/30 bg-green-500/10 px-3 py-1">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75" />

                  <span className="relative inline-flex h-2 w-2 rounded-full bg-green-500" />
                </span>

                <span className="text-xs text-green-400">
                  Live
                </span>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default StatisticsSection;
