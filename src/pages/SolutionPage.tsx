import { useParams, Link } from "react-router-dom";
import { motion, type Variants } from "framer-motion";
import { 
  ArrowRight, Activity, Zap, Database, LayoutDashboard, 
  Settings, Network, Factory, Flame, Droplet, Truck, 
  BarChart3, Cpu, Layers, Share2, TrendingUp, CheckCircle2,
  Clock, ShieldCheck, Workflow
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { SectionBadge } from "@/components/ui/section-badge";
import { Button } from "@/components/ui/button";
import InViewDecryptedText from "@/components/InViewDecryptedText";
import ScrambleCounter from "@/components/ScrambleCounter";

import { getSolutionBySlug } from "@/data/solutionsData";
import DynamicArchitecture from "@/components/sections/DynamicArchitecture";
import LiveSystemPanel from "@/components/sections/LiveSystemPanel";

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
                className="h-11 px-6 rounded-lg border border-[var(--border-subtle)] text-foreground hover:bg-card"
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
          PLATFORM CAPABILITIES (Horizontal Flow)
      ══════════════════════════════════════════════════════════ */}
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

            <div className="relative flex flex-col lg:flex-row gap-8 lg:gap-0">
              {solution.capabilities.map((cap, idx) => {
                const Icon = getCapabilityIcon(idx);
                const isLast = idx === solution.capabilities.length - 1;
                return (
                  <div key={cap.title} className="relative flex-1 flex flex-col items-center text-center lg:px-4">
                    {/* Connector Line (Desktop) */}
                    {!isLast && (
                      <div className="hidden lg:block absolute top-12 left-[calc(50%+40px)] w-[calc(100%-80px)] h-px bg-[var(--border-subtle)] -z-10">
                        <motion.div
                          className="h-full bg-orange-500 shadow-[0_0_8px_2px_rgba(249,115,22,0.6)]"
                          initial={{ x: "-100%" }}
                          whileInView={{ x: "100%" }}
                          viewport={{ once: false, amount: 0.1 }}
                          transition={{ duration: 3, repeat: Infinity, ease: "linear", delay: idx * 0.5 }}
                        />
                      </div>
                    )}
                    
                    {/* Connector Line (Mobile) */}
                    {!isLast && (
                      <div className="lg:hidden absolute top-[100%] left-1/2 w-px h-8 bg-[var(--border-subtle)] -translate-x-1/2 z-0">
                        <motion.div
                          className="w-full bg-orange-500 shadow-[0_0_8px_2px_rgba(249,115,22,0.6)]"
                          initial={{ height: "0%", opacity: 0 }}
                          whileInView={{ height: "100%", opacity: [0, 1, 0] }}
                          viewport={{ once: false, amount: 0.1 }}
                          transition={{ duration: 2, repeat: Infinity, delay: idx * 0.5 }}
                        />
                      </div>
                    )}

                    <motion.div variants={cardVariant} className="flex flex-col items-center bg-card/80 backdrop-blur-sm p-6 rounded-2xl border border-[var(--border-subtle)] w-full h-full relative z-10 shadow-sm hover:shadow-md transition-shadow group/cap">
                      <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-orange-500/10 text-orange-500 ring-1 ring-inset ring-orange-500/20 group-hover/cap:bg-orange-500/20 transition-colors">
                        <Icon className="h-6 w-6" />
                      </div>
                      <h3 className="text-lg font-bold text-foreground mb-3">
                        {cap.title}
                      </h3>
                      <p className="text-sm text-muted-foreground mb-6 flex-1">
                        {cap.description}
                      </p>
                      
                      {/* Staggered Chips */}
                      <motion.div 
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={{
                          visible: { transition: { staggerChildren: 0.1, delayChildren: 0.2 } }
                        }}
                        className="flex flex-wrap justify-center gap-1.5 mt-auto"
                      >
                        {cap.items.slice(0, 4).map((item) => (
                          <motion.span 
                            key={item} 
                            variants={{
                              hidden: { opacity: 0, scale: 0.8 },
                              visible: { opacity: 1, scale: 1, transition: { type: "spring" } }
                            }}
                            className="inline-flex items-center rounded-md bg-muted/50 px-2 py-0.5 text-[9px] font-medium text-muted-foreground border border-[var(--border-subtle)]"
                          >
                            {item}
                          </motion.span>
                        ))}
                        {cap.items.length > 4 && (
                          <motion.span 
                            variants={{
                              hidden: { opacity: 0, scale: 0.8 },
                              visible: { opacity: 1, scale: 1 }
                            }}
                            className="inline-flex items-center rounded-md bg-orange-500/10 text-orange-500 px-2 py-0.5 text-[9px] font-medium border border-orange-500/20"
                          >
                            +{cap.items.length - 4}
                          </motion.span>
                        )}
                      </motion.div>
                    </motion.div>
                  </div>
                );
              })}
            </div>
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
                    className="group rounded-xl border border-[var(--border-subtle)] bg-card p-5 hover:border-orange-500/30 transition-all hover:shadow-lg flex flex-col"
                  >
                    <div className="mb-4 h-10 w-10 rounded-lg bg-muted flex items-center justify-center text-muted-foreground group-hover:text-orange-500 group-hover:bg-orange-500/10 transition-colors">
                      <IndIcon className="h-5 w-5" />
                    </div>
                    <h4 className="text-sm font-bold text-foreground mb-4 flex items-center gap-2 leading-tight">
                       <InViewDecryptedText text={industry.name} speed={50} />
                    </h4>
                    <div className="flex flex-wrap gap-1.5 mt-auto">
                      {industry.items.slice(0, 2).map((item) => (
                         <span key={item} className="inline-flex rounded-md px-2 py-0.5 text-[9px] font-medium bg-background border border-[var(--border-subtle)] text-muted-foreground truncate max-w-full">
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
      <section className="border-t border-[var(--border-subtle)] bg-background py-24">
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
                    className="group relative rounded-2xl border border-[var(--border-subtle)] bg-card p-6 flex flex-col gap-5 hover:border-orange-500/20 transition-all overflow-hidden"
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
                    <div className="pt-4 border-t border-[var(--border-subtle)] mt-auto flex items-center justify-between">
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
        <section className="border-t border-[var(--border-subtle)] bg-card/10">
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
              className="rounded-2xl border border-[var(--border-subtle)] bg-card p-6 lg:p-10 shadow-sm"
            >
              <DynamicArchitecture nodes={solution.architecture.nodes} />
            </motion.div>
          </div>
        </section>
      )}

      {/* ══════════════════════════════════════════════════════════
          CTA FOOTER
      ══════════════════════════════════════════════════════════ */}
      <section className="border-t border-[var(--border-subtle)] bg-card/20 relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-orange-500/5 blur-[120px] pointer-events-none" />
        
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={stagger}
          className="mx-auto max-w-4xl px-6 lg:px-8 py-24 text-center relative z-10"
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
              <Button className="bg-orange-500 hover:bg-primary text-white h-12 px-8 rounded-lg font-medium shadow-lg shadow-orange-500/20">
                Request Demo
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
            <Link to="/contact">
              <Button
                variant="outline"
                className="h-12 px-8 rounded-lg text-foreground hover:bg-muted border-[var(--border-subtle)]"
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
