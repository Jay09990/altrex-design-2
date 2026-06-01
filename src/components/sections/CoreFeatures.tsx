import {
  Activity,
  ShieldCheck,
  Radio,
  Cpu,
  BarChart3,
  Globe,
  Layers3,
  Zap,
} from "lucide-react";

import { motion, type Variants } from "framer-motion";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";

import { Badge } from "../ui/badge";
import InViewDecryptedText from "../InViewDecryptedText";

const features = [
  {
    icon: Radio,
    title: "Realtime Messaging",
    description:
      "Deliver ultra-low latency communication across distributed systems and connected devices.",
    color: "var(--accent-violet)",
    glow: "rgba(139, 92, 246, 0.25)",
    label: "MESSAGING",
    gradient: "from-violet-500 to-fuchsia-500",
  },

  {
    icon: ShieldCheck,
    title: "Enterprise Security",
    description:
      "Built-in authentication, encrypted communication, and secure infrastructure at scale.",
    color: "#06b6d4",
    glow: "rgba(6, 182, 212, 0.25)",
    label: "SECURITY",
    gradient: "from-cyan-500 to-blue-500",
  },

  {
    icon: Cpu,
    title: "IoT Connectivity",
    description:
      "Connect millions of devices using scalable MQTT and WebSocket infrastructure.",
    color: "var(--accent-fuchsia)",
    glow: "rgba(217, 70, 239, 0.25)",
    label: "CONNECT",
    gradient: "from-fuchsia-500 to-pink-500",
  },

  {
    icon: Globe,
    title: "Global Infrastructure",
    description:
      "Deploy worldwide with distributed edge-ready realtime architecture.",
    color: "var(--data-green)",
    glow: "rgba(34, 197, 94, 0.25)",
    label: "EDGE",
    gradient: "from-emerald-500 to-teal-500",
  },

  {
    icon: Activity,
    title: "Live Monitoring",
    description:
      "Track metrics, system health, throughput, and realtime performance instantly.",
    color: "#f59e0b",
    glow: "rgba(245, 158, 11, 0.25)",
    label: "METRICS",
    gradient: "from-amber-500 to-orange-500",
  },

  {
    icon: Layers3,
    title: "Horizontal Scaling",
    description:
      "Scale seamlessly with high-performance clustering and fault-tolerant systems.",
    color: "var(--accent-violet)",
    glow: "rgba(139, 92, 246, 0.25)",
    label: "SCALE",
    gradient: "from-violet-500 to-cyan-500",
  },

  {
    icon: BarChart3,
    title: "Advanced Analytics",
    description:
      "Gain insights with realtime dashboards, event streams, and intelligent metrics.",
    color: "#3b82f6",
    glow: "rgba(59, 130, 246, 0.25)",
    label: "ANALYTICS",
    gradient: "from-blue-500 to-indigo-500",
  },

  {
    icon: Zap,
    title: "High Performance",
    description:
      "Optimized for speed, reliability, and millions of concurrent realtime operations.",
    color: "var(--accent-fuchsia)",
    glow: "rgba(217, 70, 239, 0.25)",
    label: "PERFORMANCE",
    gradient: "from-fuchsia-500 to-violet-500",
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
  return (
    <section className="relative overflow-hidden bg-transparent py-28">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        className="mx-auto max-w-7xl px-6 lg:px-8"
      >
        {/* Heading */}
        <div className="mx-auto max-w-3xl text-center">
          <motion.div variants={fadeUpVariants}>
            <Badge
              variant="secondary"
              className="border border-black/[0.08] bg-[var(--bg-surface)]/80 p-4 text-sm font-medium text-[var(--data-green)]"
            >
              <span className="h-2 w-2 rounded-full bg-[var(--data-green)] inline-block mr-2" />
              <InViewDecryptedText
                text="CORE PULSE"
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
            Everything You Need to Build
            <span className="block  bg-orange-500 bg-clip-text text-transparent">
              Modern Realtime Systems
            </span>
          </motion.h2>

          <motion.p
            variants={fadeUpVariants}
            className="mt-6 text-lg leading-8 text-[var(--text-secondary)]"
          >
            Powerful infrastructure designed for scalable messaging, IoT
            communication, distributed systems, and realtime applications.
          </motion.p>
        </div>

        {/* Features Grid */}
        <motion.div
          variants={containerVariants}
          className="mt-20 grid gap-6 md:grid-cols-2 xl:grid-cols-4"
        >
          {features.map((feature, index) => {
            const Icon = feature.icon;
            const xOffset = index % 2 === 0 ? -80 : 80;

            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: xOffset, rotateY: 8 }}
                whileInView={{ opacity: 1, x: 0, rotateY: 0 }}
                viewport={{ once: true, amount: 0.35 }}
                transition={{
                  duration: 0.7,
                  delay: index * 0.08,
                  ease: [0.16, 1, 0.3, 1],
                }}
                whileHover={{
                  y: -8,
                }}
                style={{ transformPerspective: 900 }}
              >
                <Card 
                  className="group relative h-full overflow-hidden rounded-2xl border border-black/[0.08] bg-[var(--bg-surface)] p-8 transition-all duration-300 hover:border-violet-300/40 hover:shadow-[0_20px_40px_-15px_var(--hover-glow)]"
                  style={{
                    "--hover-glow": feature.glow,
                  } as React.CSSProperties}
                >
                  <CardHeader className="relative z-10 p-0">
                    {/* Status Label */}
                    <div className="absolute right-0 top-0">
                      <span className="font-mono text-[9px] text-[var(--text-muted)] tracking-widest">
                        [{feature.label}: ACTIVE]
                      </span>
                    </div>

                    {/* Icon */}
                    <motion.div
                      whileHover={{
                        scale: 1.08,
                        rotate: 3,
                      }}
                      className="flex h-12 w-12 items-center justify-center rounded-lg text-white shadow-md transition-colors"
                      style={{
                        background: `rgba(0,0,0,0.04)`,
                        border: `1px solid rgba(0,0,0,0.08)`,
                        color: feature.color,
                        boxShadow: `0 0 12px ${feature.glow}`,
                      }}
                    >
                      <Icon className="h-5 w-5" />
                    </motion.div>

                    <CardTitle 
                      className="mt-6 text-xl font-semibold text-[var(--text-primary)] transition-colors duration-300"
                      style={{
                        "--hover-text": feature.color,
                      } as React.CSSProperties}
                    >
                      <span className="group-hover:text-[var(--hover-text)] transition-colors duration-300">
                        {feature.title}
                      </span>
                    </CardTitle>
                  </CardHeader>

                  <CardContent className="mt-3 p-0">
                    <CardDescription className="text-sm leading-6 text-[var(--text-secondary)]">
                      {feature.description}
                    </CardDescription>
                  </CardContent>

                  {/* Top Border Fill Animation */}
                  <motion.div
                    initial={{ scaleX: 0 }}
                    whileInView={{ scaleX: 1 }}
                    viewport={{ once: true, amount: 0.5 }}
                    transition={{ duration: 0.8 }}
                    className={`absolute left-0 right-0 top-0 h-[2px] origin-left bg-gradient-to-r ${feature.gradient}`}
                  />
                </Card>
              </motion.div>
            );
          })}
        </motion.div>
      </motion.div>
    </section>
  );
};

export default CoreFeatures;
