import { useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { motion, type Variants } from "framer-motion";
import { ArrowRight, CheckCircle2, ChevronRight } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import InViewDecryptedText from "@/components/InViewDecryptedText";
import ScrambleCounter from "@/components/ScrambleCounter";

import { getIndustryBySlug } from "@/data/industriesRegistry";
import DynamicArchitecture from "@/components/sections/DynamicArchitecture";

// ─── Animation Variants ───────────────────────────────────────────────────────

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 32 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7 } },
};

const stagger: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

const staggerFast: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.07 } },
};

const cardVariant: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

// ─── Shared Sub-Components ────────────────────────────────────────────────────

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <span className="font-mono text-xs tracking-[0.2em] uppercase text-[var(--text-muted)]">
      {children}
    </span>
  );
}

function SectionHeading({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="text-3xl font-bold tracking-tight text-[var(--text-primary)] sm:text-4xl">
      {children}
    </h2>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

const IndustryPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const industry = getIndustryBySlug(slug ?? "");

  // ── 404 ──
  if (!industry) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[var(--bg-void)]">
        <div className="text-center">
          <p className="font-mono text-sm text-[var(--text-muted)] mb-4">
            404 — INDUSTRY NOT FOUND
          </p>
          <Link to="/">
            <Button variant="ghost" className="text-[var(--text-primary)]">
              <ArrowRight className="mr-2 h-4 w-4 rotate-180" />
              Back to Home
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen bg-[var(--bg-void)] text-[var(--text-primary)]">
      {/* ── Background ambient glows ── */}
      <div className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[700px] overflow-hidden">
        <div className="absolute left-[-5%] top-[5%] h-[500px] w-[500px] rounded-full bg-orange-500/8 blur-[120px]" />
        <div className="absolute right-[-5%] top-[15%] h-[400px] w-[400px] rounded-full bg-fuchsia-500/8 blur-[120px]" />
      </div>

      {/* ══════════════════════════════════════════════════════════
          HERO
      ══════════════════════════════════════════════════════════ */}
      <section className="mx-auto max-w-7xl px-6 pt-32 pb-24 lg:px-8">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={stagger}
          className="max-w-4xl"
        >
          {/* Breadcrumb badge */}
          <motion.div variants={fadeUp} className="mb-6">
            <Badge
              variant="secondary"
              className="border border-[var(--border-subtle)] bg-[var(--bg-surface)]"
            >
              <div className="flex h-4 w-4 items-center justify-center rounded-full bg-[var(--data-green)]">
                <span className="h-1.5 w-1.5 rounded-full bg-white animate-pulse" />
              </div>
              <span className="font-mono text-xs text-[var(--text-primary)] tracking-widest uppercase">
                Industries
              </span>
              <ChevronRight className="h-3 w-3 text-[var(--text-muted)]" />
              <span className="font-mono text-xs text-[var(--text-muted)]">
                {industry.name}
              </span>
            </Badge>
          </motion.div>

          {/* Tagline */}
          <motion.p
            variants={fadeUp}
            className="font-mono text-sm tracking-[0.2em] uppercase text-[var(--accent-violet)] mb-4"
          >
            {industry.hero.tagline}
          </motion.p>

          {/* Main heading */}
          <motion.h1
            variants={fadeUp}
            className="text-4xl font-bold tracking-[-0.03em] text-[var(--text-primary)] sm:text-5xl lg:text-6xl leading-[1.1] uppercase break-normal"
          >
            {industry.hero.heading}
          </motion.h1>

          {/* Description */}
          <motion.p
            variants={fadeUp}
            transition={{ delay: 0.8 }}
            className="mt-8 max-w-2xl text-base leading-7 text-[var(--text-secondary)] sm:text-lg"
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
              <Button className="bg-orange-500 hover:bg-orange-600 text-white h-11 px-6 rounded-lg font-medium">
                {industry.hero.ctas[0]}
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
            <Link to="/contact">
              <Button
                variant="ghost"
                className="h-11 px-6 rounded-lg border border-[var(--border-subtle)] text-[var(--text-primary)] hover:bg-[var(--bg-surface)]"
              >
                {industry.hero.ctas[1]}
              </Button>
            </Link>
          </motion.div>
        </motion.div>
      </section>

      {/* ══════════════════════════════════════════════════════════
          METRICS STRIP
      ══════════════════════════════════════════════════════════ */}
      <section className="border-y border-[var(--border-subtle)] bg-[var(--bg-surface)]/60 backdrop-blur-sm">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={staggerFast}
          className="mx-auto max-w-7xl px-6 lg:px-8 py-10 grid grid-cols-2 gap-6 sm:grid-cols-4"
        >
          {industry.metrics.map((metric) => (
            <motion.div
              key={metric.label}
              variants={cardVariant}
              className="text-center"
            >
              <div className="text-2xl font-bold text-orange-400 font-mono">
                <ScrambleCounter
                  target={Number(metric.value.replace(/[^0-9.]+/g, "")) || 0}
                  finalText={metric.value}
                />
              </div>
              <div className="mt-1 text-xs text-[var(--text-muted)] font-mono uppercase tracking-wider">
                {metric.label}
              </div>
            </motion.div>
          ))}
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
            className="text-base leading-8 text-[var(--text-secondary)] lg:text-lg"
          >
            {industry.overview}
          </motion.p>
        </motion.div>
      </section>

      {/* ══════════════════════════════════════════════════════════
          INDUSTRY CHALLENGES
      ══════════════════════════════════════════════════════════ */}
      <section className="border-t border-[var(--border-subtle)] bg-[var(--bg-surface)]/30">
        <div className="mx-auto max-w-7xl px-6 lg:px-8 py-24">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.15 }}
            variants={stagger}
          >
            <motion.div variants={fadeUp} className="mb-14 space-y-3">
              <SectionLabel>Challenges</SectionLabel>
              <SectionHeading>Industry Challenges</SectionHeading>
            </motion.div>

            <motion.div
              variants={stagger}
              className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4"
            >
              {industry.challenges.map((challenge, idx) => (
                <motion.div
                  key={challenge.title}
                  variants={cardVariant}
                  className="group relative rounded-2xl bg-[var(--bg-surface)] flex flex-col overflow-hidden cursor-default"
                  style={{
                    boxShadow:
                      "0 1px 3px rgba(0,0,0,0.06), 0 4px 16px rgba(0,0,0,0.04)",
                  }}
                >
                  {/* Border ring */}
                  <div className="absolute inset-0 rounded-2xl border border-[var(--border-subtle)] group-hover:border-transparent transition-colors duration-300 pointer-events-none z-10" />
                  <div
                    className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-10"
                    style={{ border: "1px solid rgba(255,107,0,0.28)" }}
                  />

                  {/* Top bar */}
                  <div className="flex items-center justify-between px-6 pt-5 pb-0">
                    <div className="flex items-center gap-2.5">
                      <span
                        className="font-mono text-[10px] font-bold tracking-[0.15em] px-1.5 py-0.5 rounded"
                        style={{
                          color: "#ff6b00",
                          background: "rgba(255,107,0,0.10)",
                          border: "1px solid rgba(255,107,0,0.20)",
                        }}
                      >
                        {String(idx + 1).padStart(2, "0")}
                      </span>
                      <div className="flex gap-0.5 items-center">
                        {[...Array(4)].map((_, i) => (
                          <div
                            key={i}
                            className="bg-[var(--border-subtle)] group-hover:bg-orange-500/20 transition-colors duration-500"
                            style={{
                              width: 2,
                              height: i % 2 === 0 ? 10 : 6,
                              borderRadius: 1,
                            }}
                          />
                        ))}
                      </div>
                    </div>
                    <div className="h-1.5 w-1.5 rounded-full bg-[var(--border-active)] group-hover:bg-orange-400 transition-colors duration-300" />
                  </div>

                  {/* Content */}
                  <div className="flex flex-col flex-1 px-6 pt-4 pb-6 gap-3">
                    <h3 className="text-[15px] font-bold tracking-tight text-[var(--text-primary)] leading-snug group-hover:text-orange-500 transition-colors duration-300">
                      {challenge.title}
                    </h3>

                    <div className="h-px bg-[var(--border-subtle)] group-hover:bg-orange-500/15 transition-colors duration-300" />

                    <ul className="mt-1 space-y-2">
                      {challenge.items.map((item, itemIdx) => (
                        <li
                          key={item}
                          className="flex items-center gap-2.5 text-[11.5px] text-[var(--text-muted)]"
                        >
                          <span
                            className="shrink-0 font-mono text-[9px] text-[var(--text-muted)]/60"
                            style={{ minWidth: 14 }}
                          >
                            {String(itemIdx + 1).padStart(2, "0")}
                          </span>
                          <span className="h-px flex-1 bg-[var(--border-subtle)] max-w-[10px] shrink-0" />
                          <span className="leading-4">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Bottom accent */}
                  <div
                    className="h-[3px] w-0 group-hover:w-full transition-all duration-500 ease-out mt-auto"
                    style={{
                      background: "linear-gradient(to right, #ff6b00, #ff9a50)",
                    }}
                  />
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════
          PLATFORM MODULES
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

          <motion.div variants={stagger} className="grid gap-6 sm:grid-cols-2">
            {industry.modules.map((mod, idx) => (
              <motion.div
                key={mod.title}
                variants={cardVariant}
                className="rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-surface)]/60 p-8 hover:bg-[var(--bg-surface)] transition-colors duration-300"
              >
                <div className="flex items-start gap-4 mb-4">
                  <span className="font-mono text-[10px] text-orange-500 border border-orange-500/30 rounded px-1.5 py-0.5 shrink-0 mt-0.5">
                    {String(idx + 1).padStart(2, "0")}
                  </span>
                  <h3 className="text-lg font-semibold text-[var(--text-primary)]">
                    {mod.title}
                  </h3>
                </div>

                <p className="text-sm text-[var(--text-secondary)] leading-6 mb-5">
                  {mod.description}
                </p>

                {/* Monitors / Features / Benefits — show whichever are populated */}
                <div className="space-y-4">
                  {mod.monitors && mod.monitors.length > 0 && (
                    <div>
                      <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-[var(--text-muted)] mb-2">
                        Monitor
                      </p>
                      <div className="flex flex-wrap gap-1.5">
                        {mod.monitors.map((m) => (
                          <span
                            key={m}
                            className="rounded-full border border-[var(--border-subtle)] bg-[var(--bg-void)] px-2.5 py-0.5 text-[11px] text-[var(--text-muted)]"
                          >
                            {m}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {mod.features && mod.features.length > 0 && (
                    <div>
                      <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-[var(--text-muted)] mb-2">
                        Features
                      </p>
                      <ul className="space-y-1.5">
                        {mod.features.map((f) => (
                          <li
                            key={f}
                            className="flex items-center gap-2 text-xs text-[var(--text-secondary)]"
                          >
                            <CheckCircle2 className="h-3 w-3 text-orange-400 shrink-0" />
                            {f}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {mod.benefits && mod.benefits.length > 0 && (
                    <div className="pt-2 border-t border-[var(--border-subtle)]">
                      <div className="flex flex-wrap gap-1.5">
                        {mod.benefits.map((b) => (
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
            ))}
          </motion.div>
        </motion.div>
      </section>

      {/* ══════════════════════════════════════════════════════════
          BUSINESS BENEFITS
      ══════════════════════════════════════════════════════════ */}
      <section className="border-t border-[var(--border-subtle)] bg-[var(--bg-surface)]/30">
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
              className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3"
            >
              {industry.benefits.map((benefit, idx) => (
                <motion.div
                  key={benefit.title}
                  variants={cardVariant}
                  className="group flex gap-4 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-surface)]/40 p-6 hover:border-orange-500/25 hover:bg-[var(--bg-surface)] transition-all duration-300"
                >
                  <span className="font-mono text-[11px] text-[var(--text-muted)] shrink-0 mt-0.5">
                    {String(idx + 1).padStart(2, "0")}
                  </span>
                  <div>
                    <h3 className="text-sm font-semibold text-[var(--text-primary)] mb-1.5 group-hover:text-orange-400 transition-colors">
                      {benefit.title}
                    </h3>
                    <p className="text-xs leading-5 text-[var(--text-muted)]">
                      {benefit.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════
          WHY ALTREX
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

          <motion.ul variants={stagger} className="grid gap-3 sm:grid-cols-2">
            {industry.whyAltrex.map((point) => (
              <motion.li
                key={point}
                variants={cardVariant}
                className="flex items-start gap-3 text-sm text-[var(--text-secondary)]"
              >
                <CheckCircle2 className="h-4 w-4 text-orange-400 shrink-0 mt-0.5" />
                {point}
              </motion.li>
            ))}
          </motion.ul>
        </motion.div>
      </section>

      {/* ══════════════════════════════════════════════════════════
              DEPLOYMENT ARCHITECTURE
            ══════════════════════════════════════════════════════════ */}
      {industry.architecture && (
        <section className="border-t border-[var(--border-subtle)]">
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
                <p className="text-sm text-[var(--text-secondary)] max-w-2xl">
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
              className="rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-surface)]/60 p-6 lg:p-10"
            >
              <DynamicArchitecture nodes={industry.architecture.nodes} />
            </motion.div>
          </div>
        </section>
      )}

      {/* ══════════════════════════════════════════════════════════
          CTA FOOTER
      ══════════════════════════════════════════════════════════ */}
      <section className="border-t border-[var(--border-subtle)]">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={stagger}
          className="mx-auto max-w-7xl px-6 lg:px-8 py-24 text-center"
        >
          <motion.p
            variants={fadeUp}
            className="font-mono text-xs text-[var(--text-muted)] tracking-[0.25em] uppercase mb-6"
          >
            [ READY TO START ]
          </motion.p>

          <motion.h2
            variants={fadeUp}
            className="text-3xl font-bold tracking-tight text-[var(--text-primary)] sm:text-4xl lg:text-5xl max-w-3xl mx-auto"
          >
            {industry.cta.heading}
          </motion.h2>

          <motion.p
            variants={fadeUp}
            className="mt-6 max-w-2xl mx-auto text-base text-[var(--text-secondary)] leading-7"
          >
            {industry.cta.description}
          </motion.p>

          <motion.div
            variants={fadeUp}
            className="mt-10 flex flex-wrap gap-4 justify-center"
          >
            <Link to="/contact">
              <Button className="bg-orange-500 hover:bg-orange-600 text-white h-11 px-8 rounded-lg font-medium">
                Request Demo
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
            <Link to="/contact">
              <Button
                variant="ghost"
                className="h-11 px-8 rounded-lg border border-[var(--border-subtle)] text-[var(--text-primary)] hover:bg-[var(--bg-surface)]"
              >
                Talk to an Expert
              </Button>
            </Link>
          </motion.div>
        </motion.div>
      </section>
    </div>
  );
};

export default IndustryPage;
