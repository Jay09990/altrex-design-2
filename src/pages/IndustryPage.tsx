import { useParams, Link } from "react-router-dom";
import { motion, type Variants, AnimatePresence } from "framer-motion";
import { useState } from "react";
import {
  ArrowRight, CheckCircle2,
} from "lucide-react";


import { Button } from "@/components/ui/button";

import { getIndustryBySlug } from "@/data/industriesRegistry";
import DynamicArchitecture from "@/components/sections/DynamicArchitecture";
import { SectionBadge } from "@/components/ui/section-badge";
import ChallengesOrbit from "@/components/sections/ChallengesOrbit";
import CTASection from "@/components/CTASection";

// ─── Animation Variants ───────────────────────────────────────────────────────

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 32 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7 } },
};

const stagger: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

const cardVariant: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

// ─── Shared Sub-Components ────────────────────────────────────────────────────

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <span className="font-mono text-xs tracking-[0.2em] uppercase text-muted-foreground">
      {children}
    </span>
  );
}

function SectionHeading({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
      {children}
    </h2>
  );
}

// ─── Radar custom tick ────────────────────────────────────────────────────────

const RadarTick = ({ x, y, payload }: { x?: number; y?: number; payload?: { value: string } }) => {
  if (!payload) return null;
  const label = payload.value.length > 14 ? payload.value.slice(0, 13) + "…" : payload.value;
  return (
    <text
      x={x}
      y={y}
      textAnchor="middle"
      dominantBaseline="central"
      fontSize={11}
      fill="var(--muted-foreground)"
    >
      {label}
    </text>
  );
};

// ─── Page ─────────────────────────────────────────────────────────────────────

const IndustryPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const industry = getIndustryBySlug(slug ?? "");

  // Section-local state (lifted to page to avoid re-mount issues)
  const [activeChallenge, setActiveChallenge] = useState<number | null>(null);
  const [selectedModule, setSelectedModule] = useState<number>(0);

  // ── 404 ──
  if (!industry) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <div className="text-center">
          <p className="font-mono text-sm text-muted-foreground mb-4">
            404 — INDUSTRY NOT FOUND
          </p>
          <Link to="/">
            <Button variant="ghost" className="text-foreground">
              <ArrowRight className="mr-2 h-4 w-4 rotate-180" />
              Back to Home
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  // Derive bar widths — clamp between 10% and 95%
  const metricMaxes = [1000, 100, 24, 5];
  const getBarWidth = (value: string, idx: number) => {
    const num = Number(value.replace(/[^0-9.]+/g, "")) || 0;
    const max = metricMaxes[idx] ?? 100;
    const raw = (num / max) * 100;
    return Math.min(95, Math.max(10, raw));
  };

  // Radar data
  const radarData = industry.challenges.map((c, idx) => ({
    subject: c.title.length > 20 ? c.title.slice(0, 19) + "…" : c.title,
    score: 75 + (idx * 7) % 25,
    fullTitle: c.title,
  }));

  const activeModule = industry.modules[selectedModule];

  return (
    <div className={`relative min-h-screen bg-background text-foreground`}>
      {/* ── Background ambient glows ── */}
      <div className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[700px] overflow-hidden">
        <div className="absolute left-[-5%] top-[5%] h-[500px] w-[500px] rounded-full bg-orange-500/8 blur-[120px]" />
        <div className="absolute right-[-5%] top-[15%] h-[400px] w-[400px] rounded-full bg-fuchsia-500/8 blur-[120px]" />
      </div>

      {/* ══════════════════════════════════════════════════════════
          HERO
      ══════════════════════════════════════════════════════════ */}
      <section className="relative isolate overflow-hidden min-h-[92vh] flex items-center pt-28 pb-20">
        {industry.image && (
          <div className="absolute inset-0 -z-10">
            <img
              src={industry.image}
              alt={industry.name}
              className="h-full w-full object-cover object-center"
            />
          </div>
        )}
        <div
          className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-40"
          style={{
            background: "linear-gradient(to bottom, rgba(0,0,0,0.65) 0%, rgba(0,0,0,0) 100%)",
          }}
        />
        <div
          className="pointer-events-none absolute inset-0 -z-10"
          style={{
            background: "linear-gradient(to right, rgba(0,0,0,0.78) 0%, rgba(0,0,0,0.55) 38%, rgba(0,0,0,0.15) 65%, rgba(0,0,0,0) 100%)",
          }}
        />
        <div
          className="pointer-events-none absolute inset-x-0 bottom-0 -z-10 h-32"
          style={{
            background: "linear-gradient(to top, var(--background) 0%, rgba(0,0,0,0) 100%)",
          }}
        />
        <div className="relative z-10 mx-auto max-w-7xl w-full px-6 lg:px-8">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={stagger}
            className="max-w-4xl"
          >
            {/* Breadcrumb badge */}
            <motion.div variants={fadeUp} className="mb-6">
              <SectionBadge
                title={`${industry.name} — Digital Platform`}
                dot={true}
                dotColor="bg-emerald-500"
                className="mb-8"
              />
            </motion.div>

            {/* Tagline */}
            <motion.p
              variants={fadeUp}
              className="font-mono text-sm tracking-[0.2em] uppercase text-[var(--accent-violet)] mb-4"
              style={industry.image ? { color: "rgba(251,146,60,1)" } : undefined}
            >
              {industry.hero.tagline}
            </motion.p>

            {/* Main heading */}
            <motion.h1
              variants={fadeUp}
              className="text-4xl font-bold tracking-[-0.03em] text-foreground sm:text-5xl lg:text-6xl leading-[1.1] uppercase break-normal"
              style={industry.image ? { color: "white" } : undefined}
            >
              {industry.hero.heading}
            </motion.h1>

            {/* Description */}
            <motion.p
              variants={fadeUp}
              transition={{ delay: 0.8 }}
              className="mt-8 max-w-2xl text-base leading-7 text-muted-foreground sm:text-lg"
              style={industry.image ? { color: "rgba(255,255,255,0.82)" } : undefined}
            >
              {industry.hero.description}
            </motion.p>

            {/* CTAs */}
            <motion.div
              variants={fadeUp}
              transition={{ delay: 1 }}
              className="mt-10 flex flex-wrap gap-4"
            >
              <Link to="/contact">
                <Button className="bg-orange-500 hover:bg-primary text-white h-11 px-6 rounded-lg font-medium">
                  {industry.hero.ctas[0]}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              <Link to="/contact">
                <Button
                  variant="outline"
                  className="h-11 px-6 rounded-lg border border-border text-foreground hover:bg-card"
                >
                  {industry.hero.ctas[1]}
                </Button>
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════
          METRICS STRIP — Animated fill bars
      ══════════════════════════════════════════════════════════ */}
      <section className="border-y border-border bg-card/60 backdrop-blur-sm">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={stagger}
          className="mx-auto max-w-7xl px-6 lg:px-8 flex flex-col gap-6 py-10"
        >
          {industry.metrics.map((metric, idx) => {
            const targetPct = getBarWidth(metric.value, idx);
            return (
              <motion.div
                key={metric.label}
                variants={fadeUp}
                transition={{ delay: idx * 0.15 }}
                className="flex items-center gap-4"
              >
                {/* Label */}
                <span className="font-mono text-xs uppercase tracking-wider text-muted-foreground w-36 shrink-0">
                  {metric.label}
                </span>

                {/* Bar track */}
                <div className="relative flex-1 h-[2px] bg-muted/30 rounded-full overflow-visible">
                  <motion.div
                    className="absolute left-0 top-0 h-full bg-orange-500 rounded-full"
                    initial={{ width: 0 }}
                    whileInView={{ width: `${targetPct}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.2, ease: "easeOut", delay: idx * 0.15 }}
                  >
                    {/* Glowing tip */}
                    <span
                      className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 h-[6px] w-[6px] rounded-full bg-orange-400"
                      style={{ boxShadow: "0 0 8px 4px rgba(249,115,22,0.6)" }}
                    />
                  </motion.div>
                </div>

                {/* Value */}
                <span className="font-mono text-sm font-bold text-orange-400 w-20 text-right shrink-0">
                  {metric.value}
                </span>
              </motion.div>
            );
          })}
        </motion.div>
      </section>

      {/* ══════════════════════════════════════════════════════════
          OVERVIEW
      ══════════════════════════════════════════════════════════ */}
      <section className="mx-auto max-w-7xl px-6 lg:px-8 py-24">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.25 }}
          variants={stagger}
          className="grid gap-12 lg:grid-cols-[1fr_1.6fr] lg:gap-20 items-start"
        >
          <motion.div variants={fadeUp} className="space-y-3">
            <SectionLabel>Overview</SectionLabel>
            <SectionHeading>Platform Overview</SectionHeading>
          </motion.div>
          <motion.p
            variants={fadeUp}
            className="text-base leading-8 text-muted-foreground lg:text-lg"
          >
            {industry.overview}
          </motion.p>
        </motion.div>
      </section>

      {/* ══════════════════════════════════════════════════════════
          INDUSTRY CHALLENGES — Radar chart + collapsible pills
      ══════════════════════════════════════════════════════════ */}
      <ChallengesOrbit challenges={industry.challenges} />
      {/* ══════════════════════════════════════════════════════════
          PLATFORM MODULES — Left-rail navigator
      ══════════════════════════════════════════════════════════ */}
      <section className="mx-auto max-w-7xl px-6 lg:px-8 py-24">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          variants={stagger}
        >
          <motion.div variants={fadeUp} className="mb-14 space-y-3">
            <SectionLabel>Platform</SectionLabel>
            <SectionHeading>Platform Modules</SectionHeading>
          </motion.div>

          {/* Mobile: horizontal tab strip */}
          <div className="lg:hidden flex overflow-x-auto gap-1 mb-4 pb-2 border-b border-border">
            {industry.modules.map((mod, idx) => (
              <button
                key={mod.title}
                onClick={() => setSelectedModule(idx)}
                className={`shrink-0 px-3 py-1.5 text-xs rounded-full border transition-colors duration-200 ${
                  selectedModule === idx
                    ? "border-orange-500/50 bg-orange-500/10 text-orange-400"
                    : "border-border text-muted-foreground hover:text-foreground"
                }`}
              >
                {mod.title}
              </button>
            ))}
          </div>

          {/* Desktop: split layout */}
          <motion.div
            variants={cardVariant}
            className="hidden lg:flex rounded-2xl border border-border overflow-hidden bg-card/40"
          >
            {/* Left rail */}
            <div className="w-64 shrink-0 border-r border-border bg-card/60 flex flex-col py-4">
              {industry.modules.map((mod, idx) => (
                <button
                  key={mod.title}
                  onClick={() => setSelectedModule(idx)}  
                  className={`text-left px-5 py-3.5 text-sm font-medium transition-colors duration-200 relative ${
                    selectedModule === idx
                      ? "text-foreground bg-orange-500/8"
                      : "text-muted-foreground hover:text-foreground hover:bg-muted/30"
                  }`}
                >
                  {selectedModule === idx && (
                    <motion.span
                      layoutId="module-indicator"
                      className="absolute left-0 top-0 h-full w-0.5 bg-orange-500"
                    />
                  )}
                  {mod.title}
                </button>
              ))}
            </div>

            {/* Right pane */}
            <div className="flex-1 p-8 overflow-y-auto max-h-[600px]">
              <AnimatePresence mode="wait">
                <motion.div
                  key={selectedModule}
                  initial={{ opacity: 0, x: 16 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -16 }}
                  transition={{ duration: 0.25 }}
                >
                  <h3 className="text-xl font-bold text-foreground mb-2">
                    {activeModule.title}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-6 mb-6">
                    {activeModule.description}
                  </p>

                  <div className="space-y-5">
                    {activeModule.monitors && activeModule.monitors.length > 0 && (
                      <div>
                        <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground mb-2">
                          Monitor
                        </p>
                        <div className="flex flex-wrap gap-1.5">
                          {activeModule.monitors.map((m) => (
                            <span
                              key={m}
                              className="rounded-full border border-border bg-background px-2.5 py-0.5 text-[11px] text-muted-foreground"
                            >
                              {m}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}

                    {activeModule.features && activeModule.features.length > 0 && (
                      <div>
                        <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground mb-2">
                          Features
                        </p>
                        <ul className="space-y-1.5">
                          {activeModule.features.map((f) => (
                            <li key={f} className="flex items-center gap-2 text-xs text-muted-foreground">
                              <CheckCircle2 className="h-3 w-3 text-orange-400 shrink-0" />
                              {f}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {activeModule.benefits && activeModule.benefits.length > 0 && (
                      <div className="pt-2 border-t border-border">
                        <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground mb-2">
                          Benefits
                        </p>
                        <div className="flex flex-wrap gap-1.5">
                          {activeModule.benefits.map((b) => (
                            <span
                              key={b}
                              className="rounded-full border border-orange-500/20 bg-orange-500/5 px-2.5 py-0.5 text-[11px] text-orange-400"
                            >
                              {b}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </motion.div>

          {/* Mobile pane content */}
          <div className="lg:hidden mt-4 rounded-2xl border border-border bg-card/40 p-6">
            <AnimatePresence mode="wait">
              <motion.div
                key={selectedModule}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.2 }}
              >
                <h3 className="text-lg font-bold text-foreground mb-2">
                  {activeModule.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-6 mb-5">
                  {activeModule.description}
                </p>
                <div className="space-y-4">
                  {activeModule.monitors && activeModule.monitors.length > 0 && (
                    <div>
                      <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground mb-2">Monitor</p>
                      <div className="flex flex-wrap gap-1.5">
                        {activeModule.monitors.map((m) => (
                          <span key={m} className="rounded-full border border-border bg-background px-2.5 py-0.5 text-[11px] text-muted-foreground">{m}</span>
                        ))}
                      </div>
                    </div>
                  )}
                  {activeModule.features && activeModule.features.length > 0 && (
                    <ul className="space-y-1.5">
                      {activeModule.features.map((f) => (
                        <li key={f} className="flex items-center gap-2 text-xs text-muted-foreground">
                          <CheckCircle2 className="h-3 w-3 text-orange-400 shrink-0" />{f}
                        </li>
                      ))}
                    </ul>
                  )}
                  {activeModule.benefits && activeModule.benefits.length > 0 && (
                    <div className="flex flex-wrap gap-1.5">
                      {activeModule.benefits.map((b) => (
                        <span key={b} className="rounded-full border border-orange-500/20 bg-orange-500/5 px-2.5 py-0.5 text-[11px] text-orange-400">{b}</span>
                      ))}
                    </div>
                  )}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </motion.div>
      </section>

      {/* ══════════════════════════════════════════════════════════
          BUSINESS BENEFITS — Masonry with SVG draw-on-scroll
      ══════════════════════════════════════════════════════════ */}
      <section className="border-t border-border bg-card/30">
        <div className="mx-auto max-w-7xl px-6 lg:px-8 py-24">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.15 }}
            variants={stagger}
          >
            <motion.div variants={fadeUp} className="mb-14 space-y-3">
              <SectionLabel>Value</SectionLabel>
              <SectionHeading>Business Benefits</SectionHeading>
            </motion.div>

            <motion.div
              variants={stagger}
              className="columns-1 sm:columns-2 lg:columns-3 gap-5 space-y-5"
            >
              {industry.benefits.map((benefit, idx) => {
                return (
                  <motion.div
                    key={benefit.title}
                    variants={cardVariant}
                    className="group break-inside-avoid rounded-xl border border-border bg-card/40 p-6 hover:border-orange-500/25 hover:bg-card transition-all duration-300"
                  >
                    {/* Animated SVG icon — strokeDashoffset draw effect */}
                    <motion.svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      className="h-8 w-8 text-orange-500 mb-4 stroke-[1.5]"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      initial={{ strokeDashoffset: 100 }}
                      whileInView={{ strokeDashoffset: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.8, delay: idx * 0.1 }}
                      style={{ strokeDasharray: 100 }}
                    >
                      {/* Render the icon path by temporarily using IconComponent for its path data */}
                      {idx % 6 === 0 && <><polyline points="22 7 13.5 15.5 8.5 10.5 2 17" /><polyline points="16 7 22 7 22 13" /></>}
                      {idx % 6 === 1 && <><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /></>}
                      {idx % 6 === 2 && <><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" /></>}
                      {idx % 6 === 3 && <><line x1="18" y1="20" x2="18" y2="10" /><line x1="12" y1="20" x2="12" y2="4" /><line x1="6" y1="20" x2="6" y2="14" /></>}
                      {idx % 6 === 4 && <><circle cx="12" cy="12" r="3" /><path d="M19.07 4.93a10 10 0 0 1 0 14.14M5.93 19.07a10 10 0 0 1 0-14.14M15.54 8.46a5 5 0 0 1 0 7.07M8.46 15.54a5 5 0 0 1 0-7.07" /></>}
                      {idx % 6 === 5 && <><polyline points="9 11 12 14 22 4" /><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" /></>}
                    </motion.svg>

                    <p className="font-mono text-[10px] text-muted-foreground mb-1">
                      {String(idx + 1).padStart(2, "0")}
                    </p>
                    <h3 className="text-sm font-semibold text-foreground mb-2 group-hover:text-orange-400 transition-colors duration-300">
                      {benefit.title}
                    </h3>
                    <p className="text-xs leading-5 text-muted-foreground">
                      {benefit.description}
                    </p>
                  </motion.div>
                );
              })}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════
          WHY ALTREX — Two-column comparison table
      ══════════════════════════════════════════════════════════ */}
      <section className="mx-auto max-w-7xl px-6 lg:px-8 py-24">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={stagger}
          className="grid gap-12 lg:grid-cols-[1fr_1.8fr] lg:gap-20 items-start"
        >
          <motion.div variants={fadeUp} className="space-y-3">
            <SectionLabel>Differentiators</SectionLabel>
            <SectionHeading>Why Altrex Tech</SectionHeading>
          </motion.div>

          {/* Comparison table */}
          <div className="overflow-hidden rounded-xl border border-border bg-card/40">
            {/* Headers */}
            <div className="grid grid-cols-2 border-b border-border">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="px-5 py-3 border-r border-border"
              >
                <span className="text-xs font-mono uppercase tracking-wider text-muted-foreground/60">
                  Without Altrex
                </span>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="px-5 py-3"
              >
                <span className="text-xs font-mono uppercase tracking-wider text-orange-400">
                  With Altrex
                </span>
              </motion.div>
            </div>

            {/* Rows */}
            {industry.whyAltrex.map((point, idx) => {
              const withoutPhrase =
                "No " + point.split(" ").slice(0, 4).join(" ").replace(/[,;]$/, "");
              return (
                <motion.div
                  key={point}
                  className="grid grid-cols-2 border-b border-border last:border-b-0"
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={stagger}
                >
                  {/* Left cell */}
                  <motion.div
                    className="flex items-start gap-2 px-5 py-3 border-r border-border"
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: idx * 0.06 }}
                  >
                    <span className="text-red-400/60 text-xs mt-0.5 shrink-0">✗</span>
                    <span className="text-xs text-muted-foreground/50 line-through decoration-muted-foreground/30 leading-5">
                      {withoutPhrase}
                    </span>
                  </motion.div>

                  {/* Right cell */}
                  <motion.div
                    className="flex items-start gap-2 px-5 py-3"
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: idx * 0.06 + 0.3 }}
                  >
                    <span className="text-orange-400 text-xs mt-0.5 shrink-0">✓</span>
                    <span className="text-xs text-foreground leading-5">{point}</span>
                  </motion.div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </section>

      {/* ══════════════════════════════════════════════════════════
              DEPLOYMENT ARCHITECTURE
            ══════════════════════════════════════════════════════════ */}
      {industry.architecture && (
        <section className="border-t border-border">
          <div className="mx-auto max-w-7xl px-6 lg:px-8 py-24">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.15 }}
              variants={stagger}
            >
              <motion.div variants={fadeUp} className="mb-12 space-y-3">
                <SectionLabel>Architecture</SectionLabel>
                <SectionHeading>Typical Deployment Architecture</SectionHeading>
                <p className="text-sm text-muted-foreground max-w-2xl">
                  End-to-end data flow from field devices to operations teams —
                  every layer connected, secured, and orchestrated in real time.
                </p>
              </motion.div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="rounded-2xl border border-border bg-card/60 p-6 lg:p-10"
            >
              <DynamicArchitecture nodes={industry.architecture.nodes} />
            </motion.div>
          </div>
        </section>
      )}

      {/* ══════════════════════════════════════════════════════════
          CTA FOOTER
      ══════════════════════════════════════════════════════════ */}
      <CTASection
        title={industry.cta.heading}
        description={industry.cta.description}
        badge="[ READY TO START ]"
        primaryButton={{ label: "Request Demo", href: "/contact" }}
        secondaryButton={{ label: "Talk to an Expert", href: "/contact" }}
      />
    </div>
  );
};

export default IndustryPage;
