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

const features = [
  {
    icon: Radio,
    title: "Realtime Messaging",
    description:
      "Deliver ultra-low latency communication across distributed systems and connected devices.",
  },

  {
    icon: ShieldCheck,
    title: "Enterprise Security",
    description:
      "Built-in authentication, encrypted communication, and secure infrastructure at scale.",
  },

  {
    icon: Cpu,
    title: "IoT Connectivity",
    description:
      "Connect millions of devices using scalable MQTT and WebSocket infrastructure.",
  },

  {
    icon: Globe,
    title: "Global Infrastructure",
    description:
      "Deploy worldwide with distributed edge-ready realtime architecture.",
  },

  {
    icon: Activity,
    title: "Live Monitoring",
    description:
      "Track metrics, system health, throughput, and realtime performance instantly.",
  },

  {
    icon: Layers3,
    title: "Horizontal Scaling",
    description:
      "Scale seamlessly with high-performance clustering and fault-tolerant systems.",
  },

  {
    icon: BarChart3,
    title: "Advanced Analytics",
    description:
      "Gain insights with realtime dashboards, event streams, and intelligent metrics.",
  },

  {
    icon: Zap,
    title: "High Performance",
    description:
      "Optimized for speed, reliability, and millions of concurrent realtime operations.",
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

const cardVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 30,
  },

  visible: {
    opacity: 1,
    y: 0,

    transition: {
      duration: 0.5,
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
              className="border border-white/10 bg-[var(--bg-surface)]/50 p-4 text-sm font-medium text-[var(--data-green)]"
            >
              <span className="h-2 w-2 rounded-full bg-[var(--data-green)] inline-block mr-2" />
              CORE PULSE
            </Badge>
          </motion.div>

          <motion.h2
            variants={fadeUpVariants}
            className="mt-6 text-4xl font-bold tracking-tight text-[var(--text-primary)] sm:text-5xl"
          >
            Everything You Need to Build
            <span className="block text-[var(--accent-violet)]">
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

            return (
              <motion.div
                key={index}
                variants={cardVariants}
                whileHover={{
                  y: -8,
                }}
              >
                <Card className="group relative h-full overflow-hidden rounded-2xl border border-white/10 bg-[var(--bg-surface)]/80 p-8 transition-all duration-300 hover:border-white/20 hover:shadow-[0_20px_40px_-15px_rgba(139,92,246,0.2)]">
                  <CardHeader className="relative z-10 p-0">
                    {/* Status Label */}
                    <div className="absolute right-6 top-6">
                      <span className="font-mono text-xs text-[var(--text-muted)] tracking-widest">
                        [MODULE: ACTIVE]
                      </span>
                    </div>

                    {/* Icon */}
                    <motion.div
                      whileHover={{
                        scale: 1.08,
                        rotate: 3,
                      }}
                      className="flex h-12 w-12 items-center justify-center rounded-lg bg-[var(--accent-glow)] text-[var(--accent-violet)] shadow-md"
                    >
                      <Icon className="h-5 w-5" />
                    </motion.div>

                    <CardTitle className="mt-6 text-xl font-semibold text-[var(--text-primary)] transition-colors duration-300 group-hover:text-[var(--accent-violet)]">
                      {feature.title}
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
                    className="absolute left-0 right-0 top-0 h-[2px] origin-left bg-gradient-to-r from-[var(--accent-violet)] to-[var(--accent-fuchsia)]"
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
