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
    <section className="relative overflow-hidden bg-white py-28">
      {/* Background Glow */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <motion.div
          animate={{
            opacity: [0.2, 0.4, 0.2],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
          }}
          className="absolute left-0 top-0 h-[400px] w-[400px] rounded-full bg-violet-100/50 blur-3xl"
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
          className="absolute bottom-0 right-0 h-[400px] w-[400px] rounded-full bg-fuchsia-100/40 blur-3xl"
        />
      </div>

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
              className="border border-violet-200 bg-violet-50 p-4 text-sm font-medium text-violet-700"
            >
              Core Features
            </Badge>
          </motion.div>

          <motion.h2
            variants={fadeUpVariants}
            className="mt-6 text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl"
          >
            Everything You Need to Build
            <span className="block bg-gradient-to-r from-violet-600 to-fuchsia-500 bg-clip-text text-transparent">
              Modern Realtime Systems
            </span>
          </motion.h2>

          <motion.p
            variants={fadeUpVariants}
            className="mt-6 text-lg leading-8 text-gray-600"
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
                <Card className="group relative h-full overflow-hidden rounded-2xl border border-slate-200/80 bg-white p-8 transition-all duration-300 hover:border-violet-300 hover:shadow-[0_20px_40px_-15px_rgba(124,58,237,0.12)]">
                  {/* Glow */}
                  <motion.div
                    animate={{
                      opacity: [0.2, 0.4, 0.2],
                    }}
                    transition={{
                      duration: 4,
                      repeat: Infinity,
                    }}
                    className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-violet-50 blur-2xl"
                  />

                  <CardHeader className="relative z-10 p-0">
                    {/* Icon */}
                    <motion.div
                      whileHover={{
                        scale: 1.08,
                        rotate: 3,
                      }}
                      className="flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-to-br from-violet-600 to-fuchsia-500 text-white shadow-md"
                    >
                      <Icon className="h-5 w-5" />
                    </motion.div>

                    <CardTitle className="mt-6 text-xl font-semibold text-slate-900 transition-colors duration-300 group-hover:text-violet-700">
                      {feature.title}
                    </CardTitle>
                  </CardHeader>

                  <CardContent className="mt-3 p-0">
                    <CardDescription className="text-sm leading-6 text-slate-600">
                      {feature.description}
                    </CardDescription>
                  </CardContent>

                  {/* Bottom Line */}
                  <motion.div
                    initial={{ scaleX: 0 }}
                    whileHover={{ scaleX: 1 }}
                    className="absolute bottom-0 left-0 right-0 h-[2px] origin-left bg-gradient-to-r from-violet-600 to-fuchsia-500"
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