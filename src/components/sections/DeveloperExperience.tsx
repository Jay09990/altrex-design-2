import {
  Activity,
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
import InViewDecryptedText from "../InViewDecryptedText";

const featureChips = [
  {
    icon: Code2,
    label: "Modern SDKs",
    sub: "React · Node · Go",
    color: "var(--accent-violet)",
    glow: "rgba(139, 92, 246, 0.2)"
  },
  {
    icon: Terminal,
    label: "CLI & Tooling",
    sub: "Deploy & debug",
    color: "#06b6d4",
    glow: "rgba(6, 182, 212, 0.2)"
  },
  {
    icon: Globe,
    label: "REST & WebSocket APIs",
    sub: "Flexible & fast",
    color: "var(--accent-fuchsia)",
    glow: "rgba(217, 70, 239, 0.2)"
  },
  {
    icon: ShieldCheck,
    label: "Authentication",
    sub: "JWT · OAuth · Keys",
    color: "var(--data-green)",
    glow: "rgba(34, 197, 94, 0.2)"
  },
  {
    icon: Workflow,
    label: "Realtime Workflows",
    sub: "Event-driven",
    color: "#f59e0b",
    glow: "rgba(245, 158, 11, 0.2)"
  },
  {
    icon: Database,
    label: "Data Streaming",
    sub: "Live telemetry",
    color: "#3b82f6",
    glow: "rgba(59, 130, 246, 0.2)"
  },
];

const dxHighlights = [
  {
    icon: Rocket,
    title: "Ship in Minutes",
    description:
      "Production-ready SDKs and starter templates for every modern framework.",
    gradient: "from-[#0d9488] to-[#0d9488]",
    borderHover: "hover:border-[var(--accent-violet)]/30",
  },
  {
    icon: Braces,
    title: "Type-Safe APIs",
    description:
      "Full TypeScript support with auto-generated types from your schema.",
    gradient: "from-[#0d9488] to-[#0d9488]",
    borderHover: "hover:border-cyan-500/30",
  },
  {
    icon: GitBranch,
    title: "Git-Native Workflow",
    description:
      "Branch-based environments, instant previews, and CI/CD integrations.",
    gradient: "from-[#0d9488] to-[#0d9488]",
    borderHover: "hover:border-emerald-500/30",
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
    <section className="relative overflow-hidden bg-transparent py-28">
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
              className="border border-[var(--accent-violet)]/20 bg-[var(--accent-violet)]/10 p-4 text-sm font-medium text-[var(--accent-violet)]"
            >
              <InViewDecryptedText
                text="REALTIME ARCHITECTURE"
                speed={60}
                maxIterations={12}
                className="text-[var(--accent-violet)]"
                encryptedClassName="text-[var(--text-muted)]"
              />
            </Badge>
          </motion.div>

          <motion.h2
            variants={fadeUpVariants}
            className="mt-6 text-4xl font-bold tracking-tight text-[var(--text-primary)] sm:text-5xl"
          >
            Built for{" "}
            <span className="bg-orange-500 bg-clip-text text-transparent">
              Modern Developers
            </span>
          </motion.h2>

          <motion.p
            variants={fadeUpVariants}
            className="mt-6 text-lg leading-8 text-[var(--text-secondary)]"
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
          {/* Left: Code Playground */}
          <motion.div
            whileHover={{
              y: -4,
            }}
            transition={{
              duration: 0.25,
            }}
            className="relative overflow-hidden rounded-3xl border border-black/[0.08] bg-[var(--bg-surface)] shadow-2xl shadow-black/5"
          >
            {/* Background Glow */}
            <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-[var(--accent-glow)] opacity-20 blur-3xl" />
            
            {/* Title Bar */}
            <div className="flex h-12 items-center justify-between border-b border-black/[0.08] bg-black/[0.02] px-5">
              <div className="flex items-center gap-4">
                <div className="flex gap-1.5">
                  <div className="h-3 w-3 rounded-full bg-[#ff5f56]" />
                  <div className="h-3 w-3 rounded-full bg-[#ffbd2e]" />
                  <div className="h-3 w-3 rounded-full bg-[#27c93f]" />
                </div>
                <div className="h-4 w-[1px] bg-black/[0.1]" />
                <div className="flex items-center gap-2">
                  <Code2 className="h-4 w-4 text-[var(--text-secondary)]" />
                  <span className="text-xs font-medium text-[var(--text-secondary)]">src/index.ts — altrex-sdk</span>
                </div>
              </div>
              
              <div className="flex items-center gap-2">
                <div className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[var(--data-green)] opacity-75"></span>
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-[var(--data-green)]"></span>
                </div>
                <span className="text-[10px] font-semibold uppercase tracking-wider text-[var(--data-green)]">Connected</span>
              </div>
            </div>

            {/* Code Editor */}
            <div className="p-6 font-mono text-sm leading-relaxed">
              <div className="space-y-0.5">
                <p><span className="text-fuchsia-500">import</span> {"{"} <span className="text-cyan-500">AltrexClient</span> {"}"} <span className="text-fuchsia-500">from</span> <span className="text-emerald-500">"@altrex/sdk"</span>;</p>
                <p>&nbsp;</p>
                <p><span className="text-fuchsia-500">const</span> client = <span className="text-fuchsia-500">new</span> <span className="text-cyan-500">AltrexClient</span>({"{"}</p>
                <p>&nbsp;&nbsp;apiKey: <span className="text-emerald-500">"at_live_8k2f..."</span>,</p>
                <p>&nbsp;&nbsp;region: <span className="text-emerald-500">"us-east"</span></p>
                <p>{"}"});</p>
                <p>&nbsp;</p>
                <p><span className="text-slate-500">// Subscribe to realtime stream</span></p>
                <p><span className="text-fuchsia-500">const</span> stream = client.<span className="text-blue-500">subscribe</span>(<span className="text-emerald-500">"telemetry/v1"</span>);</p>
                <p>&nbsp;</p>
                <p>stream.<span className="text-blue-500">on</span>(<span className="text-emerald-500">"message"</span>, (data) <span className="text-fuchsia-500">=&gt;</span> {"{"}</p>
                <p>&nbsp;&nbsp;console.<span className="text-blue-500">log</span>(<span className="text-emerald-500">"Received:"</span>, data);</p>
                <p>{"}"});</p>
                <p>&nbsp;</p>
                <p><span className="text-slate-500">// Publish update</span></p>
                <p><span className="text-fuchsia-500">await</span> client.<span className="text-blue-500">publish</span>(<span className="text-emerald-500">"updates/v1"</span>, {"{"}</p>
                <p>&nbsp;&nbsp;status: <span className="text-emerald-500">"active"</span>,</p>
                <p>&nbsp;&nbsp;timestamp: <span className="text-cyan-500">Date</span>.<span className="text-blue-500">now</span>()</p>
                <p>{"}"});</p>
              </div>
            </div>

            {/* Floating Metric Overlay */}
            <div className="absolute bottom-6 right-6 flex items-center gap-3 rounded-xl border border-black/[0.08] bg-[var(--bg-surface)]/90 p-3 shadow-lg backdrop-blur-sm">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[var(--data-green)]/10 text-[var(--data-green)]">
                <Activity className="h-4 w-4" />
              </div>
              <div>
                <p className="text-[10px] font-semibold uppercase tracking-wider text-[var(--text-muted)]">Node Latency</p>
                <div className="flex items-baseline gap-2">
                  <span className="text-sm font-bold text-[var(--text-primary)]">1.2ms</span>
                  <div className="flex items-end gap-[1px] h-3">
                    <div className="w-[2px] bg-[var(--data-green)]/30 h-1" />
                    <div className="w-[2px] bg-[var(--data-green)]/50 h-2" />
                    <div className="w-[2px] bg-[var(--data-green)]/40 h-1.5" />
                    <div className="w-[2px] bg-[var(--data-green)] h-3" />
                    <div className="w-[2px] bg-[var(--data-green)]/60 h-2" />
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right */}
          <div className="flex flex-col gap-6">
            {/* Feature chips */}
            <div>
              <p className="mb-4 text-xs font-semibold uppercase tracking-widest text-[var(--text-muted)]">
                What's included
              </p>

              <div className="flex flex-wrap gap-3">
                {featureChips.map((chip, i) => {
                  const Icon = chip.icon;
                  return (
                    <motion.div
                      key={i}
                      whileHover={{
                        y: -3,
                      }}
                      transition={{
                        duration: 0.2,
                      }}
                      className="flex items-center gap-2.5 rounded-full border border-black/[0.08] bg-black/5 px-4 py-2.5 shadow-sm transition-all hover:border-[var(--hover-border)] hover:shadow-md"
                      style={{
                        "--hover-border": chip.color,
                        boxShadow: `0 0 8px ${chip.glow}`,
                      } as React.CSSProperties}
                    >
                      <div
                        className="flex h-7 w-7 items-center justify-center rounded-full"
                        style={{
                          background: `${chip.color}15`,
                          color: chip.color,
                        }}
                      >
                        <Icon className="h-3.5 w-3.5" />
                      </div>

                      <div>
                        <p className="text-xs font-semibold text-[var(--text-primary)]">
                          {chip.label}
                        </p>

                        <p className="text-[10px] text-[var(--text-secondary)]">
                          {chip.sub}
                        </p>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </div>

            {/* DX Highlight Cards */}
            <div className="grid gap-4 sm:grid-cols-1">
              {dxHighlights.map(
                (highlight, i) => {
                  const Icon = highlight.icon;
                  return (
                    <motion.div
                      key={i}
                      whileHover={{
                        y: -5,
                      }}
                      transition={{
                        duration: 0.25,
                      }}
                      className={`group flex items-start gap-4 rounded-2xl border border-white/10 bg-[var(--bg-surface)]/80 p-5 shadow-sm transition-all duration-300 ${highlight.borderHover} hover:shadow-lg`}
                    >
                      <div className={`flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-xl bg-gradient-to-br ${highlight.gradient} text-white shadow-md`}>
                        <Icon className="h-5 w-5" />
                      </div>

                      <div>
                        <h3 className="font-semibold text-[var(--text-primary)] transition-colors group-hover:text-[var(--accent-violet)]">
                          {highlight.title}
                        </h3>

                        <p className="mt-1 text-sm leading-6 text-[var(--text-secondary)]">
                          {highlight.description}
                        </p>
                      </div>
                    </motion.div>
                  );
                }
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
              className="flex flex-col gap-3 rounded-2xl border border-black/[0.08] bg-black/5 p-6 sm:flex-row sm:items-center sm:justify-between"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#0d9488] text-white shadow-md">
                <Rocket className="h-5 w-5" />
              </div>

              <div className="flex-1">
                <h4 className="font-semibold text-[var(--text-primary)]">
                  Production Ready Infrastructure
                </h4>

                <p className="text-sm text-[var(--text-secondary)]">
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
                  className="inline-flex items-center rounded-xl bg-[var(--bg-surface)] px-4 py-2.5 text-sm font-medium text-[var(--text-primary)] transition-colors hover:bg-white/10"
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
                  className="rounded-xl border border-black/[0.08] bg-black/5 px-4 py-2.5 text-sm font-medium text-[var(--text-secondary)] hover:border-[var(--accent-violet)]/30 hover:text-[var(--text-primary)] transition-colors"
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
                  className="flex items-center gap-2 rounded-xl border border-black/[0.08] bg-[var(--bg-surface)] px-3 py-2.5 shadow-sm"
                >
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-black/5">
                    <Icon className="h-4 w-4 text-[var(--text-secondary)]" />
                  </div>

                  <span className="text-xs font-medium text-[var(--text-primary)]">
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
