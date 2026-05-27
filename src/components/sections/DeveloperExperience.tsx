import {
  ArrowRight,
  Blocks,
  Braces,
  Code2,
  Database,
  GitBranch,
  Globe,
  Layers3,
  Rocket,
  ShieldCheck,
  Terminal,
  Workflow,
} from "lucide-react";

import { motion, type Variants } from "framer-motion";

import { Badge } from "../ui/badge";

const featureChips = [
  { icon: Code2, label: "Modern SDKs", sub: "React · Node · Go" },
  { icon: Terminal, label: "CLI & Tooling", sub: "Deploy & debug" },
  { icon: Globe, label: "REST & WebSocket APIs", sub: "Flexible & fast" },
  { icon: ShieldCheck, label: "Authentication", sub: "JWT · OAuth · Keys" },
  { icon: Workflow, label: "Realtime Workflows", sub: "Event-driven" },
  { icon: Database, label: "Data Streaming", sub: "Live telemetry" },
];

const dxHighlights = [
  {
    icon: Rocket,
    title: "Ship in Minutes",
    description:
      "Production-ready SDKs and starter templates for every modern framework.",
  },
  {
    icon: Braces,
    title: "Type-Safe APIs",
    description:
      "Full TypeScript support with auto-generated types from your schema.",
  },
  {
    icon: GitBranch,
    title: "Git-Native Workflow",
    description:
      "Branch-based environments, instant previews, and CI/CD integrations.",
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

const DeveloperExperience = () => {
  return (
    <section className="relative overflow-hidden py-28">
      {/* Background Glow */}
      <div className="absolute inset-0 -z-10">
        <motion.div
          animate={{
            opacity: [0.3, 0.5, 0.3],
            scale: [1, 1.08, 1],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
          }}
          className="absolute left-0 top-0 h-[400px] w-[400px] rounded-full bg-violet-100/60 blur-3xl"
        />

        <motion.div
          animate={{
            opacity: [0.25, 0.45, 0.25],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
          }}
          className="absolute bottom-0 right-0 h-[400px] w-[400px] rounded-full bg-fuchsia-100/50 blur-3xl"
        />
      </div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.15 }}
        className="mx-auto max-w-7xl px-6 lg:px-8"
      >
        {/* Header */}
        <div className="mx-auto max-w-3xl text-center">
          <motion.div variants={fadeUpVariants}>
            <Badge
              variant="secondary"
              className="border border-violet-200 bg-violet-50 p-4 text-sm font-medium text-violet-700"
            >
              Developer Experience
            </Badge>
          </motion.div>

          <motion.h2
            variants={fadeUpVariants}
            className="mt-6 text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl"
          >
            Built for{" "}
            <span className="bg-gradient-to-r from-violet-600 to-fuchsia-500 bg-clip-text text-transparent">
              Modern Developers
            </span>
          </motion.h2>

          <motion.p
            variants={fadeUpVariants}
            className="mt-6 text-lg leading-8 text-gray-600"
          >
            Powerful APIs, modern tooling, scalable infrastructure, and seamless
            developer workflows designed for realtime applications.
          </motion.p>
        </div>

        {/* Split layout */}
        <motion.div
          variants={fadeUpVariants}
          className="mt-20 grid gap-10 lg:grid-cols-2"
        >
          {/* Left: Terminal */}
          <motion.div
            whileHover={{
              y: -4,
            }}
            transition={{
              duration: 0.25,
            }}
            className="overflow-hidden rounded-3xl bg-gray-950 shadow-2xl shadow-gray-900/40"
          >
            {/* Terminal topbar */}
            <div className="flex items-center gap-2 border-b border-white/5 bg-gray-900 px-5 py-3.5">
              <motion.div
                animate={{
                  opacity: [1, 0.7, 1],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                }}
                className="h-3 w-3 rounded-full bg-red-500/80"
              />

              <motion.div
                animate={{
                  opacity: [1, 0.7, 1],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  delay: 0.2,
                }}
                className="h-3 w-3 rounded-full bg-yellow-500/80"
              />

              <motion.div
                animate={{
                  opacity: [1, 0.7, 1],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  delay: 0.4,
                }}
                className="h-3 w-3 rounded-full bg-green-500/80"
              />

              <span className="ml-3 text-xs text-gray-500">
                realtime-client.ts
              </span>
            </div>

            {/* Code */}
            <div className="space-y-1 p-6 font-mono text-[13px] leading-7">
              <div>
                <span className="text-fuchsia-400">import</span>
                <span className="text-white"> {"{ AltrexClient }"} </span>
                <span className="text-fuchsia-400">from</span>
                <span className="text-violet-300">
                  {" "}
                  '@altrex/realtime'
                </span>
              </div>

              <div className="text-gray-500"></div>

              <div>
                <span className="text-gray-500">
                  // Initialize with your API key
                </span>
              </div>

              <div>
                <span className="text-fuchsia-400">const</span>
                <span className="text-white"> client </span>
                <span className="text-gray-400">= </span>
                <span className="text-green-400">new</span>
                <span className="text-white"> AltrexClient</span>
                <span className="text-gray-400">{"({"}</span>
              </div>

              <div className="pl-6">
                <span className="text-cyan-300">apiKey</span>
                <span className="text-gray-400">: </span>
                <span className="text-violet-300">
                  process.env.ALTREX_KEY
                </span>
                <span className="text-gray-400">,</span>
              </div>

              <div className="pl-6">
                <span className="text-cyan-300">region</span>
                <span className="text-gray-400">: </span>
                <span className="text-violet-300">'us-east-1'</span>
              </div>

              <div>
                <span className="text-gray-400">{"})"};</span>
              </div>

              <div className="text-gray-500"></div>

              <div>
                <span className="text-gray-500">
                  // Subscribe to a topic
                </span>
              </div>

              <div>
                <span className="text-white">client</span>
                <span className="text-gray-400">.</span>
                <span className="text-green-400">subscribe</span>
                <span className="text-gray-400">{"('"}</span>
                <span className="text-violet-300">
                  devices/live
                </span>
                <span className="text-gray-400">
                  {"', (msg) => {"}
                </span>
              </div>

              <div className="pl-6">
                <span className="text-blue-400">console</span>
                <span className="text-gray-400">.</span>
                <span className="text-green-400">log</span>
                <span className="text-gray-400">
                  {"(msg.payload);"}
                </span>
              </div>

              <div>
                <span className="text-gray-400">{"});"}</span>
              </div>

              <div className="text-gray-500"></div>

              <div>
                <span className="text-gray-500">
                  // Publish metrics
                </span>
              </div>

              <div>
                <span className="text-white">client</span>
                <span className="text-gray-400">.</span>
                <span className="text-green-400">publish</span>
                <span className="text-gray-400">{"('"}</span>
                <span className="text-violet-300">
                  metrics/update
                </span>
                <span className="text-gray-400">
                  {"', {"}
                </span>
              </div>

              <div className="pl-6">
                <span className="text-cyan-300">temp</span>
                <span className="text-gray-400">: </span>
                <span className="text-orange-300">72.4</span>
                <span className="text-gray-400">, </span>
                <span className="text-cyan-300">status</span>
                <span className="text-gray-400">: </span>
                <span className="text-violet-300">'ok'</span>
              </div>

              <div>
                <span className="text-gray-400">{"});"}</span>
              </div>

              <motion.div
                animate={{
                  opacity: [1, 0.7, 1],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                }}
                className="flex items-center gap-2 pt-2"
              >
                <div className="h-2 w-2 rounded-full bg-green-400" />

                <span className="text-green-400">
                  Connected · 1 subscriber active
                </span>

                <span className="inline-block h-4 w-0.5 animate-pulse bg-green-400" />
              </motion.div>
            </div>
          </motion.div>

          {/* Right */}
          <div className="flex flex-col gap-6">
            {/* Feature chips */}
            <div>
              <p className="mb-4 text-xs font-semibold uppercase tracking-widest text-gray-400">
                What's included
              </p>

              <div className="flex flex-wrap gap-3">
                {featureChips.map(({ icon: Icon, label, sub }, i) => (
                  <motion.div
                    key={i}
                    whileHover={{
                      y: -3,
                    }}
                    transition={{
                      duration: 0.2,
                    }}
                    className="flex items-center gap-2.5 rounded-full border border-gray-200 bg-white px-4 py-2.5 shadow-sm hover:border-violet-300 hover:shadow-md transition-all"
                  >
                    <div className="flex h-7 w-7 items-center justify-center rounded-full bg-violet-100 text-violet-700">
                      <Icon className="h-3.5 w-3.5" />
                    </div>

                    <div>
                      <p className="text-xs font-semibold text-gray-900">
                        {label}
                      </p>

                      <p className="text-[10px] text-gray-500">
                        {sub}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* DX Highlight Cards */}
            <div className="grid gap-4 sm:grid-cols-1">
              {dxHighlights.map(
                ({ icon: Icon, title, description }, i) => (
                  <motion.div
                    key={i}
                    whileHover={{
                      y: -5,
                    }}
                    transition={{
                      duration: 0.25,
                    }}
                    className="group flex items-start gap-4 rounded-2xl border border-gray-200 bg-white p-5 shadow-sm transition-all duration-300 hover:border-violet-300 hover:shadow-lg"
                  >
                    <div className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-violet-600 to-fuchsia-500 text-white shadow-md">
                      <Icon className="h-5 w-5" />
                    </div>

                    <div>
                      <h3 className="font-semibold text-gray-900 group-hover:text-violet-700 transition-colors">
                        {title}
                      </h3>

                      <p className="mt-1 text-sm leading-6 text-gray-600">
                        {description}
                      </p>
                    </div>
                  </motion.div>
                )
              )}
            </div>

            {/* Bottom CTA */}
            <motion.div
              whileHover={{
                y: -3,
              }}
              transition={{
                duration: 0.2,
              }}
              className="flex flex-col gap-3 rounded-2xl border border-gray-200 bg-gray-50 p-6 sm:flex-row sm:items-center sm:justify-between"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-violet-600 to-fuchsia-500 text-white shadow-md">
                <Rocket className="h-5 w-5" />
              </div>

              <div className="flex-1">
                <h4 className="font-semibold text-gray-900">
                  Production Ready Infrastructure
                </h4>

                <p className="text-sm text-gray-500">
                  Deploy in minutes. Scale without limits.
                </p>
              </div>

              <div className="flex gap-2">
                <motion.button
                  whileHover={{
                    scale: 1.03,
                  }}
                  whileTap={{
                    scale: 0.96,
                  }}
                  className="inline-flex items-center rounded-xl bg-gray-900 px-4 py-2.5 text-sm font-medium text-white hover:bg-gray-800 transition-colors"
                >
                  Docs{" "}
                  <ArrowRight className="ml-1.5 h-3.5 w-3.5" />
                </motion.button>

                <motion.button
                  whileHover={{
                    scale: 1.03,
                  }}
                  whileTap={{
                    scale: 0.96,
                  }}
                  className="rounded-xl border border-gray-300 bg-white px-4 py-2.5 text-sm font-medium text-gray-700 hover:border-violet-400 hover:text-violet-700 transition-colors"
                >
                  API Ref
                </motion.button>
              </div>
            </motion.div>

            {/* Tech stack pills */}
            <div className="grid grid-cols-4 gap-3">
              {[
                { icon: Braces, title: "TypeScript" },
                { icon: GitBranch, title: "WebSocket" },
                { icon: Blocks, title: "MQTT" },
                { icon: Layers3, title: "REST API" },
              ].map(({ icon: Icon, title }, i) => (
                <motion.div
                  key={i}
                  whileHover={{
                    y: -3,
                    scale: 1.02,
                  }}
                  transition={{
                    duration: 0.2,
                  }}
                  className="flex items-center gap-2 rounded-xl border border-gray-200 bg-white px-3 py-2.5"
                >
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gray-100">
                    <Icon className="h-4 w-4 text-gray-700" />
                  </div>

                  <span className="text-xs font-medium text-gray-800">
                    {title}
                  </span>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default DeveloperExperience;