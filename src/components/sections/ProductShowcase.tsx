import {
  Activity,
  ArrowUpRight,
  Bell,
  Globe,
  LayoutDashboard,
  Radio,
  Settings,
  ShieldCheck,
  TrendingUp,
  Users,
  Wifi,
  Zap,
} from "lucide-react";

import { useRef } from "react";
import { motion, useScroll, useTransform, type Variants } from "framer-motion";

import { Badge } from "../ui/badge";
import { SectionBadge } from "../ui/section-badge";

const barHeights = [38, 52, 70, 48, 82, 60, 110, 88, 130, 100, 150, 120];
const linePoints = [38, 52, 70, 48, 82, 60, 110, 88, 130, 100, 150, 120];

const maxH = Math.max(...linePoints);

const toSvgPolyline = (heights: number[], max: number, h: number) =>
  heights
    .map((v, i) => `${(i / (heights.length - 1)) * 100},${h - (v / max) * h}`)
    .join(" ");

const svgPoints = toSvgPolyline(linePoints, maxH, 120);

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

const ProductShowcase = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "0%"]);
  const cardY = useTransform(scrollYProgress, [0, 1], ["0%", "-8%"]);
  const labelY = useTransform(scrollYProgress, [0, 1], ["0%", "-20%"]);

  return (
    <section ref={sectionRef} className="relative overflow-hidden bg-transparent py-28">
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
            <SectionBadge
              title="PRODUCT SHOWCASE"
              className="border border-black/[0.08] bg-card/50 p-4 text-sm font-medium text-[var(--data-green)]"
              decryptedTextClassName="text-[var(--data-green)]"
            />
          </motion.div>

          <motion.h2
            variants={fadeUpVariants}
            className="mt-6 text-4xl font-bold tracking-tight text-foreground sm:text-5xl"
          >
            Monitor Everything
            <span className="block bg-gradient-to-r from-violet-600 to-fuchsia-500 bg-clip-text text-transparent">
              In Realtime
            </span>
          </motion.h2>

          <motion.p
            variants={fadeUpVariants}
            className="mt-6 text-lg leading-8 text-muted-foreground"
          >
            Gain complete visibility into messaging infrastructure, connected
            devices, and realtime performance through a modern analytics
            dashboard.
          </motion.p>
        </div>

        {/* Dashboard */}
        <motion.div
          variants={fadeUpVariants}
          className="relative mt-20"
        >
          {/* Ambient glow — layered light-bleed effect */}
          {/* Deep blur blob: sits furthest back, spreads the light wide */}
          <motion.div
            style={{ y: bgY }}
            className="pointer-events-none absolute left-1/2 top-1/2 h-[100%] w-[100%] -translate-x-1/2 -translate-y-1/2"
          >
            <div className="absolute -inset-10 rounded-[60px] bg-gradient-to-br from-violet-500/30 via-fuchsia-400/20 to-cyan-400/15 blur-3xl" />
            <div className="absolute -inset-4 rounded-[48px] bg-gradient-to-br from-violet-400/20 via-fuchsia-300/15 to-cyan-300/10 blur-xl" />
            <div className="absolute -inset-px rounded-[32px] bg-gradient-to-br from-violet-300/10 via-fuchsia-200/8 to-transparent blur-sm" />
          </motion.div>

          <motion.div style={{ y: labelY }} className="pointer-events-none absolute -left-3 top-8 hidden lg:block">
            <div className="rounded-2xl border border-black/[0.08] bg-card px-4 py-3 font-mono text-[10px] tracking-widest text-muted-foreground shadow-sm">
              [GRID: ACTIVE]
            </div>
          </motion.div>

          <motion.div style={{ y: labelY }} className="pointer-events-none absolute -right-3 bottom-10 hidden lg:block">
            <div className="rounded-2xl border border-black/[0.08] bg-card px-4 py-3 font-mono text-[10px] tracking-widest text-muted-foreground shadow-sm">
              [DIAGRAM: SYNCED]
            </div>
          </motion.div>

          {/* Browser Chrome */}
          <motion.div
            whileHover={{
              y: -4,
            }}
            transition={{
              duration: 0.25,
            }}
            style={{ y: cardY }}
            className="relative overflow-hidden rounded-2xl border border-black/[0.08] bg-card shadow-[0_30px_60px_-15px_rgba(0,0,0,0.1)]"
          >
            {/* Browser Topbar */}
            <div className="flex items-center justify-between border-b border-black/[0.08] bg-gray-50 px-5 py-3">
              <div className="flex items-center gap-2">
                <div className="h-3 w-3 rounded-full bg-red-400" />
                <div className="h-3 w-3 rounded-full bg-yellow-400" />
                <div className="h-3 w-3 rounded-full bg-green-400" />

                <div className="ml-4 flex items-center gap-2 rounded-lg border border-black/[0.08] bg-card px-4 py-1 text-xs text-muted-foreground">
                  <span className="h-2 w-2 rounded-full bg-[var(--text-muted)]" />
                  dashboard.altrex.dev
                </div>
              </div>

              <div className="flex items-center gap-2 rounded-lg border border-emerald-400/20 bg-emerald-500/10 px-3 py-1">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75" />

                  <span className="relative inline-flex h-2 w-2 rounded-full bg-green-500" />
                </span>

                <span className="text-xs font-medium text-emerald-300">
                  All Systems Operational
                </span>
              </div>
            </div>

            {/* Dashboard Layout: Sidebar + Main */}
            <div className="flex h-[600px] overflow-hidden">
              {/* Sidebar */}
              <div className="flex w-16 flex-shrink-0 flex-col items-center gap-6 border-r border-black/[0.08] bg-card py-5">
                {/* Logo */}
                <motion.div
                  whileHover={{
                    scale: 1.08,
                    rotate: 5,
                  }}
                  className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-violet-600 to-fuchsia-600 shadow-md shadow-violet-300"
                >
                  <Zap className="h-4 w-4 text-white" />
                </motion.div>

                {/* Nav */}
                <div className="mt-2 flex flex-col gap-4">
                  {[
                    { icon: LayoutDashboard, active: true },
                    { icon: Activity, active: false },
                    { icon: Wifi, active: false },
                    { icon: Users, active: false },
                    { icon: ShieldCheck, active: false },
                    { icon: Settings, active: false },
                  ].map(({ icon: Icon, active }, i) => (
                    <motion.div
                      key={i}
                      whileHover={{
                        scale: 1.08,
                      }}
                      className={`flex h-9 w-9 items-center justify-center rounded-lg transition-all duration-200 ${
                        active
                          ? "border border-violet-400/20 bg-violet-500/15 text-violet-200 shadow-[0_0_20px_rgba(139,92,246,0.15)]"
                          : "border border-black/[0.06] bg-gray-50 text-muted-foreground hover:text-foreground"
                      }`}
                    >
                      <Icon className="h-4 w-4" />
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Main Content */}
              <div className="flex flex-1 flex-col overflow-hidden bg-gray-50/50">
                {/* Inner Topbar */}
                <div className="flex flex-shrink-0 items-center justify-between border-b border-black/[0.08] bg-card px-6 py-3">
                  <div>
                    <p className="text-[11px] text-muted-foreground">
                      Welcome back
                    </p>

                    <h3 className="text-sm font-semibold text-foreground">
                      Altrex Dashboard
                    </h3>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="relative flex h-8 w-8 items-center justify-center rounded-lg border border-black/[0.08] bg-card text-muted-foreground">
                      <Bell className="h-4 w-4" />

                      <div className="absolute right-1.5 top-1.5 h-1.5 w-1.5 rounded-full bg-violet-500" />
                    </div>

                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-violet-600 to-fuchsia-600 text-xs font-bold text-white">
                      A
                    </div>
                  </div>
                </div>

                {/* Body */}
                <div className="flex flex-1 gap-5 overflow-hidden p-5">
                  {/* Left Column */}
                  <div className="flex min-w-0 flex-1 flex-col gap-5">
                    {/* Stat Cards */}
                    <div className="grid grid-cols-3 gap-4">
                      {[
                        {
                          icon: Radio,
                          label: "Messages / sec",
                          value: "1.2M",
                          change: "+12%",
                          iconBg: "from-violet-600 to-violet-500",
                          iconShadow: "shadow-violet-200",
                          cardBg: "bg-card/80",
                          border: "border-black/[0.08]",
                          blob: "bg-violet-400",
                        },
                        {
                          icon: Wifi,
                          label: "Active Devices",
                          value: "24.8K",
                          change: "+8%",
                          iconBg: "from-fuchsia-600 to-fuchsia-500",
                          iconShadow: "shadow-fuchsia-200",
                          cardBg: "bg-card/80",
                          border: "border-black/[0.08]",
                          blob: "bg-fuchsia-400",
                        },
                        {
                          icon: Globe,
                          label: "Global Regions",
                          value: "120+",
                          change: "+24%",
                          iconBg: "from-cyan-600 to-cyan-500",
                          iconShadow: "shadow-cyan-200",
                          cardBg: "bg-card/80",
                          border: "border-black/[0.08]",
                          blob: "bg-cyan-400",
                        },
                      ].map(
                        (
                          {
                            icon: Icon,
                            label,
                            value,
                            change,
                            iconBg,
                            iconShadow,
                            cardBg,
                            border,
                            blob,
                          },
                          i,
                        ) => (
                          <motion.div
                            key={i}
                            whileHover={{
                              y: -6,
                            }}
                            transition={{
                              duration: 0.25,
                            }}
                            className={`relative overflow-hidden rounded-xl border ${border} ${cardBg} p-4`}
                          >
                            <div className="flex items-start justify-between">
                              <div
                                className={`flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br ${iconBg} text-white shadow-md ${iconShadow}`}
                              >
                                <Icon className="h-4 w-4" />
                              </div>

                              <Badge
                                variant="outline"
                                className="border-emerald-400/20 bg-emerald-500/10 font-semibold text-emerald-300"
                              >
                                {change}

                                <ArrowUpRight className="h-3 w-3" />
                              </Badge>
                            </div>

                            <p className="mt-4 text-2xl font-bold text-foreground">
                              {value}
                            </p>

                            <p className="mt-0.5 font-mono text-[12px] uppercase tracking-wide text-muted-foreground">
                              {label}
                            </p>

                            <div
                              className={`pointer-events-none absolute -bottom-5 -right-5 h-20 w-20 rounded-full ${blob} opacity-10`}
                            />
                          </motion.div>
                        ),
                      )}
                    </div>

                    {/* Chart Panel */}
                    <motion.div
                      whileHover={{
                        y: -4,
                      }}
                      transition={{
                        duration: 0.25,
                      }}
                      className="flex flex-1 flex-col rounded-xl border border-black/[0.08] bg-card p-5 shadow-sm"
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="text-sm font-semibold text-foreground">
                            Message Throughput
                          </h4>

                          <p className="mt-0.5 text-xs text-muted-foreground">
                            Live infrastructure analytics
                          </p>
                        </div>

                        <div className="flex items-center gap-3">
                          <div className="flex items-center gap-1.5 text-xs font-medium text-violet-300">
                            <TrendingUp className="h-3 w-3" />

                            <span>+18% this week</span>
                          </div>

                          <div className="rounded-lg border border-black/[0.08] bg-card px-3 py-1 text-xs text-muted-foreground shadow-sm">
                            24h
                          </div>
                        </div>
                      </div>

                      {/* Chart area */}
                      <div
                        className="relative mt-4 flex-1"
                        style={{ minHeight: 120 }}
                      >
                        {/* Grid lines */}
                        <div className="absolute inset-0 flex flex-col justify-between pb-5">
                          {[0, 1, 2, 3].map((_, i) => (
                            <div
                              key={i}
                              className="w-full border-t border-black/[0.06]"
                            />
                          ))}
                        </div>

                        {/* SVG */}
                        <svg
                          className="absolute inset-0 h-[calc(100%-20px)] w-full"
                          preserveAspectRatio="none"
                          viewBox="0 0 100 120"
                        >
                          <polygon
                            points={`0,120 ${svgPoints} 100,120`}
                            fill="url(#fillGrad)"
                          />

                          <motion.polyline
                            initial={{
                              pathLength: 0,
                            }}
                            whileInView={{
                              pathLength: 1,
                            }}
                            transition={{
                              duration: 2,
                            }}
                            points={svgPoints}
                            fill="none"
                            stroke="url(#strokeGrad)"
                            strokeWidth="1.8"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>

                        {/* Bar chart layer */}
                        <div className="absolute bottom-5 left-0 right-0 flex items-end gap-1.5">
                          {barHeights.map((h, i) => (
                            <motion.div
                              key={i}
                              initial={{
                                height: 0,
                              }}
                              whileInView={{
                                height: `${(h / maxH) * 110}px`,
                              }}
                              transition={{
                                duration: 0.5,
                                delay: i * 0.05,
                              }}
                              className="flex-1 rounded-t bg-gradient-to-t from-violet-400 to-fuchsia-300"
                            />
                          ))}
                        </div>

                        {/* X-axis labels */}
                        <div className="absolute bottom-0 flex w-full justify-between text-[9px] text-muted-foreground">
                          {[
                            "00",
                            "02",
                            "04",
                            "06",
                            "08",
                            "10",
                            "12",
                            "14",
                            "16",
                            "18",
                            "20",
                            "22",
                          ].map((t) => (
                            <span key={t}>{t}:00</span>
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default ProductShowcase;
