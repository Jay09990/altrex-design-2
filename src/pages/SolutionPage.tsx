import { useParams, Link } from "react-router-dom";
import { motion, type Variants } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import { 
  ArrowRight, Activity, Zap, Database, LayoutDashboard, 
  Settings, Network, Factory, Flame, Droplet, Truck, 
  BarChart3, Cpu, Layers, Share2, TrendingUp, CheckCircle2,
  Clock, ShieldCheck, Workflow
} from "lucide-react";

import { SectionBadge } from "@/components/ui/section-badge";
import { Button } from "@/components/ui/button";
import InViewDecryptedText from "@/components/InViewDecryptedText";
import ScrambleCounter from "@/components/ScrambleCounter";

import { getSolutionBySlug } from "@/data/solutionsData";
import DynamicArchitecture from "@/components/sections/DynamicArchitecture";
import LiveSystemPanel from "@/components/sections/LiveSystemPanel";
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

const getCapabilityIcon = (idx: number) => {
  const icons = [Layers, Cpu, Database, Network, Share2, Workflow];
  return icons[idx % icons.length];
};

const getIndustryIcon = (name: string) => {
  const nameLower = name.toLowerCase();
  if (nameLower.includes("gas") || nameLower.includes("oil")) return Flame;
  if (nameLower.includes("water")) return Droplet;
  if (nameLower.includes("manufactur") || nameLower.includes("factory")) return Factory;
  if (nameLower.includes("renewab") || nameLower.includes("solar") || nameLower.includes("energy")) return Zap;
  if (nameLower.includes("utilit") || nameLower.includes("power")) return Activity;
  if (nameLower.includes("fleet") || nameLower.includes("mobil") || nameLower.includes("vehicle")) return Truck;
  if (nameLower.includes("building") || nameLower.includes("commercial")) return LayoutDashboard;
  if (nameLower.includes("iot")) return Network;
  return Settings;
};

const getBenefitVisual = (title: string, description: string) => {
  const text = (title + " " + description).toLowerCase();
  
  if (text.match(/reduce|minimize|lower|save|cost/)) return { icon: TrendingUp, color: "text-green-500", bg: "bg-green-500/10", animate: "reduce" };
  if (text.match(/accelerate|speed|fast|quick|time/)) return { icon: Clock, color: "text-blue-500", bg: "bg-blue-500/10", animate: "pulse" };
  if (text.match(/increase|maximize|improve|efficiency|growth/)) return { icon: BarChart3, color: "text-orange-500", bg: "bg-orange-500/10", animate: "grow" };
  if (text.match(/security|reliable|safe|secure|protect/)) return { icon: ShieldCheck, color: "text-indigo-500", bg: "bg-indigo-500/10", animate: "shield" };
  if (text.match(/digital|transform|modern|future/)) return { icon: Zap, color: "text-fuchsia-500", bg: "bg-fuchsia-500/10", animate: "spark" };
  
  return { icon: CheckCircle2, color: "text-orange-500", bg: "bg-orange-500/10", animate: "fade" };
};

// ─── Platform Capabilities — Bento Grid ───────────────────────────────────────
// Drop-in replacement for the existing PlatformCapabilities() function in
// SolutionPage.tsx. Same props (`capabilities: Capability[]`), same data
// shape — no changes needed to solutionsData.ts. Uses the fadeUp, stagger,
// and cardVariant variants already defined at the top of SolutionPage.tsx.

interface Capability {
  title: string;
  description: string;
  items: string[];
}

// One "hero" tile (2x2) + a mix of tall / wide / square tiles.
// `dense` auto-flow packs any extra items after 6 into the grid gaps.
const spanPattern = [
  "lg:col-span-2 lg:row-span-2", // 0 — hero
  "lg:col-span-1 lg:row-span-1", // 1 — square
  "lg:col-span-1 lg:row-span-2", // 2 — tall
  "lg:col-span-1 lg:row-span-1", // 3 — square
  "lg:col-span-2 lg:row-span-1", // 4 — wide
  "lg:col-span-1 lg:row-span-1", // 5 — square
];

function PlatformCapabilities({ capabilities }: { capabilities: Capability[] }) {
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

  return (
    <section className="bg-card/20 py-24 overflow-hidden">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          variants={stagger}
        >
          <motion.div variants={fadeUp} className="mb-16 space-y-3 text-center">
            <SectionLabel>Core Engine</SectionLabel>
            <SectionHeading>Platform Capabilities</SectionHeading>
            <p className="text-muted-foreground max-w-2xl mx-auto mt-4 text-sm">
              Built for scale and resilience. Explore the core technological modules driving our infrastructure.
            </p>
          </motion.div>

          <div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 lg:auto-rows-[190px]"
            style={{ gridAutoFlow: "dense" }}
          >
            {capabilities.map((cap, idx) => {
              const Icon = getCapabilityIcon(idx);
              const isHovered = hoveredIdx === idx;
              const isHero = idx === 0;
              const span = spanPattern[idx % spanPattern.length];
              const ordinal = String(idx + 1).padStart(2, "0");
              const bulletLimit = isHero ? cap.items.length : span.includes("row-span-2") ? 5 : 3;

              return (
                <motion.div
                  key={cap.title}
                  variants={cardVariant}
                  onMouseEnter={() => setHoveredIdx(idx)}
                  onMouseLeave={() => setHoveredIdx(null)}
                  className={`relative flex flex-col justify-between rounded-2xl border bg-card/80 backdrop-blur-sm p-6 overflow-hidden transition-all duration-300 ${span} ${
                    isHero ? "lg:p-8" : ""
                  }`}
                  style={{
                    borderColor: isHovered
                      ? "rgba(249,115,22,0.55)"
                      : "var(--border)",
                    boxShadow: isHovered
                      ? "0 0 0 1px rgba(249,115,22,0.15), 0 12px 32px -12px rgba(249,115,22,0.25)"
                      : "none",
                  }}
                >
                  {/* Faint giant ordinal, bigger on the hero tile */}
                  <span
                    className={`absolute top-3 right-4 select-none pointer-events-none font-black leading-none text-foreground ${
                      isHero ? "text-[140px]" : "text-[64px]"
                    }`}
                    style={{ opacity: 0.04 }}
                    aria-hidden="true"
                  >
                    {ordinal}
                  </span>

                  {/* Ambient orange glow only on the hero tile, to anchor it as "the" module */}
                  {isHero && (
                    <div className="pointer-events-none absolute -bottom-16 -left-16 h-56 w-56 rounded-full bg-orange-500/10 blur-3xl" />
                  )}

                  <div className="relative z-10 flex flex-col h-full">
                    <div className="flex items-start justify-between">
                      <motion.div
                        className={`flex items-center justify-center rounded-2xl bg-orange-500/10 text-orange-500 ring-1 ring-inset ring-orange-500/20 ${
                          isHero ? "h-16 w-16 mb-6" : "h-12 w-12 mb-4"
                        }`}
                        animate={{ scale: isHovered ? 1.08 : 1 }}
                        transition={{ duration: 0.2, ease: "easeInOut" }}
                      >
                        <Icon className={isHero ? "h-7 w-7" : "h-5 w-5"} />
                      </motion.div>

                      {isHero && (
                        <span className="mt-1 rounded-full border border-orange-500/30 bg-orange-500/10 px-2.5 py-1 text-[10px] font-mono uppercase tracking-widest text-orange-500">
                          Core Module
                        </span>
                      )}
                    </div>

                    <h3
                      className={`font-bold text-foreground ${
                        isHero ? "text-2xl mb-3" : "text-base mb-2"
                      }`}
                    >
                      {cap.title}
                    </h3>

                    <p
                      className={`text-muted-foreground ${
                        isHero ? "text-sm max-w-md mb-6" : "text-xs mb-4 line-clamp-2"
                      }`}
                    >
                      {cap.description}
                    </p>

                    {/* Bullets — full list on hero, trimmed elsewhere */}
                    <motion.div
                      initial="hidden"
                      whileInView="visible"
                      viewport={{ once: true }}
                      variants={{
                        visible: { transition: { staggerChildren: 0.08, delayChildren: 0.15 } },
                      }}
                      className="flex flex-wrap gap-1.5 mt-auto"
                    >
                      {cap.items.slice(0, bulletLimit).map((item) => (
                        <motion.span
                          key={item}
                          variants={{
                            hidden: { opacity: 0, scale: 0.85 },
                            visible: { opacity: 1, scale: 1, transition: { type: "spring" } },
                          }}
                          className={`inline-flex items-center rounded-md bg-muted/50 border border-border text-muted-foreground ${
                            isHero ? "px-2.5 py-1 text-[10px]" : "px-2 py-0.5 text-[9px]"
                          }`}
                        >
                          {item}
                        </motion.span>
                      ))}
                      {cap.items.length > bulletLimit && (
                        <span className="inline-flex items-center rounded-md bg-orange-500/10 text-orange-500 border border-orange-500/20 px-2 py-0.5 text-[9px] font-medium">
                          +{cap.items.length - bulletLimit}
                        </span>
                      )}
                    </motion.div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

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
    <div className="relative min-h-screen bg-background text-foreground overflow-x-hidden">
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
              <SectionBadge
                title={`SOLUTION / ${solution.name.toUpperCase()}`}
                dot={true}
                dotColor="bg-emerald-500"
                className="mb-8"
              />
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
                className="h-11 px-6 rounded-lg border border-border text-foreground hover:bg-card"
              >
                {solution.hero.ctas[1]}
              </Button>
            </motion.div>
          </div>

          <motion.div variants={fadeUp} className="hidden lg:block w-full h-full">
            <LiveSystemPanel solution={solution} />
          </motion.div>
        </motion.div>
      </section>

      {/* ══════════════════════════════════════════════════════════
          METRICS STRIP
      ══════════════════════════════════════════════════════════ */}
      <section className="border-y border-border bg-card/60 backdrop-blur-sm">
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
              className="flex flex-col items-center justify-center text-center p-4 border-r last:border-r-0 border-border"
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
          PLATFORM CAPABILITIES (Horizontal Flow)
      ══════════════════════════════════════════════════════════ */}
      <PlatformCapabilities capabilities={solution.capabilities} />

      {/* ══════════════════════════════════════════════════════════
          INDUSTRIES & APPLICATIONS
      ══════════════════════════════════════════════════════════ */}
      <section className="border-t border-border bg-card/30 py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.15 }}
            variants={stagger}
            className="flex flex-col"
          >
            <motion.div variants={fadeUp} className="mb-12 space-y-3 text-center">
              <SectionLabel>Ecosystem</SectionLabel>
              <SectionHeading>Industries & Applications</SectionHeading>
              <p className="text-muted-foreground text-sm max-w-2xl mx-auto mt-4">
                Tailored infrastructure built for mission-critical deployments across key operational domains.
              </p>
            </motion.div>

            <motion.div 
              variants={stagger} 
              className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4"
            >
              {solution.industries.map((industry) => {
                const IndIcon = getIndustryIcon(industry.name);
                return (
                  <motion.div 
                    key={industry.name} 
                    variants={cardVariant} 
                    className="group rounded-xl border border-border bg-card p-5 hover:border-orange-500/30 transition-all hover:shadow-lg flex flex-col"
                  >
                    <div className="mb-4 h-10 w-10 rounded-lg bg-muted flex items-center justify-center text-muted-foreground group-hover:text-orange-500 group-hover:bg-orange-500/10 transition-colors">
                      <IndIcon className="h-5 w-5" />
                    </div>
                    <h4 className="text-sm font-bold text-foreground mb-4 flex items-center gap-2 leading-tight">
                       <InViewDecryptedText text={industry.name} speed={50} />
                    </h4>
                    <div className="flex flex-wrap gap-1.5 mt-auto">
                      {industry.items.slice(0, 2).map((item) => (
                         <span key={item} className="inline-flex rounded-md px-2 py-0.5 text-[9px] font-medium bg-background border border-border text-muted-foreground truncate max-w-full">
                           {item}
                         </span>
                      ))}
                      {industry.items.length > 2 && (
                        <span className="inline-flex rounded-md px-2 py-0.5 text-[9px] font-medium bg-muted text-muted-foreground">
                          +{industry.items.length - 2}
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
          BUSINESS VALUE (Programmatic Visuals)
      ══════════════════════════════════════════════════════════ */}
      <section className="border-t border-border bg-background py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.15 }}
            variants={stagger}
            className="flex flex-col"
          >
            <motion.div variants={fadeUp} className="mb-16 space-y-3 text-center">
              <SectionLabel>Value Proposition</SectionLabel>
              <SectionHeading>Business Value</SectionHeading>
              <p className="text-muted-foreground text-sm max-w-2xl mx-auto mt-4">
                Quantifiable impact and strategic advantages delivered by the Altrex infrastructure.
              </p>
            </motion.div>

            <motion.div 
              variants={stagger} 
              className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
            >
              {solution.benefits.map((benefit) => {
                const visual = getBenefitVisual(benefit.title, benefit.description);
                const Icon = visual.icon;
                
                return (
                  <motion.div 
                    key={benefit.title} 
                    variants={cardVariant} 
                    className="group relative rounded-2xl border border-border bg-card p-6 flex flex-col gap-5 hover:border-orange-500/20 transition-all overflow-hidden"
                  >
                    {/* Background Visual Accent */}
                    <div className={`absolute top-0 right-0 h-24 w-24 -mr-8 -mt-8 rounded-full ${visual.bg} blur-2xl opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none`} />

                    <div className="flex items-center gap-4">
                      <div className={`flex shrink-0 h-12 w-12 items-center justify-center rounded-xl ${visual.bg} ${visual.color}`}>
                        <motion.div
                          animate={
                            visual.animate === "pulse" ? { scale: [1, 1.2, 1] } :
                            visual.animate === "reduce" ? { y: [0, 4, 0] } :
                            visual.animate === "grow" ? { y: [0, -4, 0] } :
                            visual.animate === "shield" ? { opacity: [0.6, 1, 0.6] } :
                            visual.animate === "spark" ? { rotate: [0, 15, -15, 0] } : {}
                          }
                          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                        >
                          <Icon className="h-6 w-6" />
                        </motion.div>
                      </div>
                      <h4 className="text-base font-bold text-foreground group-hover:text-orange-500 transition-colors">
                        {benefit.title}
                      </h4>
                    </div>
                    
                    <p className="text-sm text-muted-foreground leading-relaxed flex-1">
                      {benefit.description}
                    </p>

                    {/* Tiny inline visual based on benefit type */}
                    <div className="pt-4 border-t border-border mt-auto flex items-center justify-between">
                       <span className="text-[10px] font-mono text-muted-foreground uppercase tracking-widest">Efficiency Module</span>
                       {visual.animate === "reduce" && (
                         <div className="flex items-end gap-0.5 h-3">
                            {[10, 8, 6, 4].map((h, j) => <div key={j} className="w-1 bg-green-500/40 rounded-full" style={{ height: `${h}px` }} />)}
                         </div>
                       )}
                       {visual.animate === "grow" && (
                         <div className="flex items-end gap-0.5 h-3">
                            {[4, 6, 8, 10].map((h, j) => <div key={j} className="w-1 bg-orange-500/40 rounded-full" style={{ height: `${h}px` }} />)}
                         </div>
                       )}
                       {visual.animate === "pulse" && (
                         <div className="flex items-center gap-1">
                            <motion.div animate={{ opacity: [0, 1, 0] }} transition={{ duration: 1, repeat: Infinity }} className="h-1.5 w-1.5 rounded-full bg-blue-500" />
                            <div className="h-1 w-8 bg-muted rounded-full overflow-hidden">
                               <motion.div animate={{ x: ["-100%", "100%"] }} transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }} className="h-full w-1/2 bg-blue-500" />
                            </div>
                         </div>
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
          ARCHITECTURE
      ══════════════════════════════════════════════════════════ */}
      {solution.architecture && (
        <section className="border-t border-border bg-card/10">
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
                <p className="text-sm text-muted-foreground max-w-2xl mx-auto mt-4">
                  End-to-end data flow from field devices to enterprise systems — secured and orchestrated in real time.
                </p>
              </motion.div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="rounded-2xl border border-border bg-card p-6 lg:p-10 shadow-sm"
            >
              <DynamicArchitecture nodes={solution.architecture.nodes} />
            </motion.div>
          </div>
        </section>
      )}

      {/* ══════════════════════════════════════════════════════════
          CTA FOOTER
      ══════════════════════════════════════════════════════════ */}
      <CTASection
        title={solution.ctaHeading}
        description={solution.ctaDescription}
        badge="[ Take Action ]"
        primaryButton={{ label: "Request Demo", href: "/contact" }}
        secondaryButton={{ label: "Talk to an Expert", href: "/contact" }}
      />
    </div>
  );
};

export default SolutionPage;
