import { useParams, Link } from "react-router-dom";
import { motion, type Variants } from "framer-motion";
import { ArrowRight, CheckCircle2, Activity, Zap, Shield, Database, LayoutDashboard, Globe, Settings, Network } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import InViewDecryptedText from "@/components/InViewDecryptedText";
import ScrambleCounter from "@/components/ScrambleCounter";

import { getSolutionBySlug } from "@/data/solutionsData";
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
  hidden: { opacity: 0, scale: 0.95, y: 15 },
  visible: { opacity: 1, scale: 1, y: 0, transition: { duration: 0.4 } },
};

// ─── Sub-Components ───────────────────────────────────────────────────────────

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

const getRandomIcon = (index: number) => {
  const icons = [Activity, Zap, Shield, Database, LayoutDashboard, Globe, Settings, Network];
  return icons[index % icons.length];
};

// ─── Page ─────────────────────────────────────────────────────────────────────

const SolutionPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const solution = getSolutionBySlug(slug ?? "");

  if (!solution) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <div className="text-center">
          <p className="font-mono text-sm text-muted-foreground mb-4">
            404 — SOLUTION NOT FOUND
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

  return (
    <div className="relative min-h-screen bg-background text-foreground">
      {/* Background ambient glows */}
      <div className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[700px] overflow-hidden">
        <div className="absolute left-[-5%] top-[5%] h-[500px] w-[500px] rounded-full bg-orange-500/8 blur-[120px]" />
        <div className="absolute right-[-5%] top-[15%] h-[400px] w-[400px] rounded-full bg-fuchsia-500/8 blur-[120px]" />
      </div>

      {/* ══════════════════════════════════════════════════════════
          HERO & EXECUTIVE OVERVIEW
      ══════════════════════════════════════════════════════════ */}
      <section className="mx-auto max-w-7xl px-6 pt-32 pb-16 lg:px-8">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={stagger}
          className="grid gap-12 lg:grid-cols-[1.2fr_1fr] lg:gap-16 items-center"
        >
          <div className="max-w-3xl">
            <motion.div variants={fadeUp} className="mb-6 flex">
              <Badge
                variant="secondary"
                className="border border-[var(--border-subtle)] bg-card flex gap-2 items-center"
              >
                <div className="flex h-2.5 w-2.5 items-center justify-center rounded-full bg-green-500/20">
                  <span className="h-1.5 w-1.5 rounded-full bg-green-500 animate-pulse" />
                </div>
                <span className="font-mono text-[10px] text-muted-foreground tracking-widest uppercase">
                  Solution / {solution.name}
                </span>
              </Badge>
            </motion.div>

            <motion.h1
              variants={fadeUp}
              className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl leading-[1.1]"
            >
              {solution.hero.heading}
            </motion.h1>

            <motion.p
              variants={fadeUp}
              className="mt-6 text-lg leading-8 text-muted-foreground"
            >
              {solution.hero.description}
            </motion.p>

            <motion.div
              variants={fadeUp}
              className="mt-8 flex flex-wrap gap-4"
            >
              <Link to="/contact">
                <Button className="bg-orange-500 hover:bg-primary text-white h-11 px-6 rounded-lg font-medium shadow-md">
                  {solution.hero.ctas[0]}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              <Button
                variant="ghost"
                className="h-11 px-6 rounded-lg border border-[var(--border-subtle)] text-foreground hover:bg-card"
              >
                {solution.hero.ctas[1]}
              </Button>
            </motion.div>
          </div>

          <motion.div variants={fadeUp} className="relative rounded-2xl border border-[var(--border-subtle)] bg-card/40 p-8 backdrop-blur-sm shadow-xl hidden lg:block">
            <div className="absolute -top-3 left-6 px-2 bg-background font-mono text-[10px] uppercase tracking-widest text-orange-500">
              Executive Overview
            </div>
            <p className="text-base text-muted-foreground leading-relaxed">
              {solution.overview}
            </p>
          </motion.div>
        </motion.div>
      </section>

      {/* ══════════════════════════════════════════════════════════
          METRICS STRIP
      ══════════════════════════════════════════════════════════ */}
      <section className="border-y border-[var(--border-subtle)] bg-card/60 backdrop-blur-sm">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={staggerFast}
          className="mx-auto max-w-7xl px-6 lg:px-8 py-8 grid grid-cols-2 gap-6 sm:grid-cols-4"
        >
          {solution.metrics.slice(0, 4).map((metric) => (
            <motion.div
              key={metric.label}
              variants={cardVariant}
              className="flex flex-col items-center justify-center text-center p-4 border-r last:border-r-0 border-[var(--border-subtle)]"
            >
              <div className="text-3xl font-bold text-orange-500 font-mono tracking-tight">
                <ScrambleCounter
                  target={Number(metric.value.replace(/[^0-9.]+/g, "")) || 0}
                  finalText={metric.value}
                />
              </div>
              <div className="mt-2 text-[11px] text-muted-foreground font-mono uppercase tracking-[0.1em]">
                {metric.label}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* ══════════════════════════════════════════════════════════
          PLATFORM CAPABILITIES (Bento Grid)
      ══════════════════════════════════════════════════════════ */}
      <section className="bg-card/20 py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.15 }}
            variants={stagger}
          >
            <motion.div variants={fadeUp} className="mb-12 space-y-3 text-center">
              <SectionLabel>Core Engine</SectionLabel>
              <SectionHeading>Platform Capabilities</SectionHeading>
              <p className="text-muted-foreground max-w-2xl mx-auto mt-4 text-sm">
                Built for scale and resilience. Explore the core technological modules driving our infrastructure.
              </p>
            </motion.div>

            <motion.div
              variants={stagger}
              className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
            >
              {solution.capabilities.map((cap, idx) => {
                const Icon = getRandomIcon(idx);
                return (
                  <motion.div
                    key={cap.title}
                    variants={cardVariant}
                    className="group relative rounded-2xl border border-[var(--border-subtle)] bg-card p-6 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col"
                  >
                    <div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-lg bg-orange-500/10 text-orange-500">
                      <Icon className="h-5 w-5" />
                    </div>
                    <h3 className="text-base font-bold text-foreground mb-2">
                      {cap.title}
                    </h3>
                    <p className="text-sm text-muted-foreground mb-6 flex-1">
                      {cap.description}
                    </p>
                    <div className="flex flex-wrap gap-2 mt-auto">
                      {cap.items.slice(0, 3).map((item) => (
                        <span key={item} className="inline-flex items-center rounded bg-muted px-2 py-1 text-[10px] font-medium text-muted-foreground">
                          {item}
                        </span>
                      ))}
                      {cap.items.length > 3 && (
                        <span className="inline-flex items-center rounded bg-muted/50 px-2 py-1 text-[10px] font-medium text-muted-foreground/60">
                          +{cap.items.length - 3} more
                        </span>
                      )}
                    </div>
                  </motion.div>
                );
              })}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════
          INDUSTRIES & APPLICATIONS
      ══════════════════════════════════════════════════════════ */}
      <section className="border-t border-[var(--border-subtle)] bg-card/30 py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.15 }}
            variants={stagger}
            className="grid gap-12 lg:grid-cols-2 items-start"
          >
            <div>
              <motion.div variants={fadeUp} className="mb-8 space-y-3">
                <SectionLabel>Ecosystem</SectionLabel>
                <SectionHeading>Industries & Applications</SectionHeading>
                <p className="text-muted-foreground text-sm max-w-md mt-4">
                  Tailored infrastructure built for mission-critical deployments across key operational domains.
                </p>
              </motion.div>
              <motion.div variants={stagger} className="flex flex-col gap-3">
                {solution.industries.map((industry) => (
                  <motion.div key={industry.name} variants={cardVariant} className="rounded-xl border border-[var(--border-subtle)] bg-card p-4">
                    <h4 className="text-sm font-bold text-foreground mb-3 flex items-center gap-2">
                       <CheckCircle2 className="h-4 w-4 text-orange-500" />
                       <InViewDecryptedText text={industry.name} speed={50} />
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {industry.items.map((item) => (
                         <Badge key={item} variant="outline" className="text-[10px] font-normal text-muted-foreground bg-background">
                           {item}
                         </Badge>
                      ))}
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </div>

            <div>
              <motion.div variants={fadeUp} className="mb-8 space-y-3">
                <SectionLabel>Value Proposition</SectionLabel>
                <SectionHeading>Business Value</SectionHeading>
              </motion.div>
              <motion.div variants={stagger} className="grid gap-4 sm:grid-cols-2">
                {solution.benefits.map((benefit) => (
                  <motion.div key={benefit.title} variants={cardVariant} className="rounded-xl bg-muted/40 p-5">
                    <h4 className="text-sm font-semibold text-foreground mb-1.5 text-orange-500">
                      {benefit.title}
                    </h4>
                    <p className="text-xs text-muted-foreground leading-relaxed">
                      {benefit.description}
                    </p>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════
          ARCHITECTURE
      ══════════════════════════════════════════════════════════ */}
      {solution.architecture && (
        <section className="border-t border-[var(--border-subtle)] bg-background">
          <div className="mx-auto max-w-7xl px-6 lg:px-8 py-24">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.15 }}
              variants={stagger}
            >
              <motion.div variants={fadeUp} className="mb-12 space-y-3 text-center">
                <SectionLabel>Architecture</SectionLabel>
                <SectionHeading>Platform Architecture</SectionHeading>
                <p className="text-sm text-muted-foreground max-w-2xl mx-auto">
                  End-to-end data flow from field devices to enterprise systems — secured and orchestrated in real time.
                </p>
              </motion.div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="rounded-2xl border border-[var(--border-subtle)] bg-card/40 p-6 lg:p-10 shadow-sm"
            >
              <DynamicArchitecture nodes={solution.architecture.nodes} />
            </motion.div>
          </div>
        </section>
      )}

      {/* ══════════════════════════════════════════════════════════
          CTA FOOTER
      ══════════════════════════════════════════════════════════ */}
      <section className="border-t border-[var(--border-subtle)] bg-card/20">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={stagger}
          className="mx-auto max-w-4xl px-6 lg:px-8 py-24 text-center"
        >
          <motion.p
            variants={fadeUp}
            className="font-mono text-[10px] text-muted-foreground tracking-[0.25em] uppercase mb-4"
          >
            [ Take Action ]
          </motion.p>
          <motion.h2
            variants={fadeUp}
            className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl lg:text-5xl"
          >
            {solution.ctaHeading}
          </motion.h2>
          <motion.p
            variants={fadeUp}
            className="mt-6 text-base text-muted-foreground leading-relaxed"
          >
            {solution.ctaDescription}
          </motion.p>
          <motion.div
            variants={fadeUp}
            className="mt-10 flex flex-wrap gap-4 justify-center"
          >
            <Link to="/contact">
              <Button className="bg-orange-500 hover:bg-primary text-white h-11 px-8 rounded-lg font-medium shadow-md">
                Request Demo
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
            <Link to="/contact">
              <Button
                variant="outline"
                className="h-11 px-8 rounded-lg text-foreground hover:bg-muted"
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

export default SolutionPage;
