import type { ReactNode } from "react";
import { useEffect, useMemo } from "react";
import { useParams, Link } from "react-router-dom";
import { motion, type Variants } from "framer-motion";
import {
  ArrowRight,
  ChevronRight,
  Eye,
  Brain,
  AlertTriangle,
  ScanLine,
  HardHat,
  Bell,
  Network,
  CheckCircle2,
  AlertCircle,
  Cpu,
  Layers,
  Monitor,
  MapPin,
  Truck,
  Activity,
  Zap,
  Cloud,
  Settings,
  Sliders,
  Briefcase,
  Wrench,
  GraduationCap,
  Flame,
  Droplet,
  Factory,
  Building,
  HeartPulse,
  Fuel,
  Building2
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { servicesRegistry } from "@/data/servicesRegistry";
import type { ServiceData } from "@/types/service";
import { Badge } from "@/components/ui/badge";
import { SectionBadge } from "@/components/ui/section-badge";
import CTASection from "@/components/CTASection";

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const stagger: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

const cardVariant: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

function SectionLabel({ children }: { children: ReactNode }) {
  return (
    <span className="font-mono text-xs tracking-[0.2em] uppercase text-muted-foreground">
      {children}
    </span>
  );
}

function SectionHeading({ children }: { children: ReactNode }) {
  return (
    <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
      {children}
    </h2>
  );
}

const getIconForText = (text: string) => {
  const t = text.toLowerCase();
  if (t.includes("monitor")) return Eye;
  if (t.includes("ai") || t.includes("analytics")) return Brain;
  if (t.includes("alert") || t.includes("notification")) return Bell;
  if (t.includes("anpr") || t.includes("scan")) return ScanLine;
  if (t.includes("safety") || t.includes("helmet") || t.includes("ppe")) return HardHat;
  if (t.includes("incident") || t.includes("security") || t.includes("access") || t.includes("intrusion")) return AlertTriangle;
  if (t.includes("integration") || t.includes("platform") || t.includes("network")) return Network;
  if (t.includes("cloud")) return Cloud;
  if (t.includes("training") || t.includes("consult")) return GraduationCap;
  if (t.includes("data") || t.includes("device")) return Cpu;
  if (t.includes("gas")) return Flame;
  if (t.includes("fuel") || t.includes("oil")) return Fuel;
  if (t.includes("factory") || t.includes("manufactur")) return Factory;
  if (t.includes("transport") || t.includes("logistic") || t.includes("truck")) return Truck;
  if (t.includes("smart cit") || t.includes("building")) return Building2;
  if (t.includes("utility") || t.includes("water") || t.includes("droplet")) return Droplet;
  if (t.includes("energy") || t.includes("power") || t.includes("zap")) return Zap;
  if (t.includes("health")) return HeartPulse;
  return CheckCircle2;
};

const LivePanel = ({ service }: { service: ServiceData }) => {
  const seed = useMemo(() => service.slug.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0), [service.slug]);
  const systemLoad = (seed % 15) + 70; // 70-85
  const metric1 = service.whatWeDeliver?.length ?? service.keyBenefits.length;
  const metric2 = service.industries.length;
  const capabilities = service.whatWeDeliver?.map(d => d.title) ?? service.keyBenefits;

  return (
    <div className="rounded-2xl border border-border bg-[var(--bg-surface)]/80 backdrop-blur-md p-6 shadow-xl w-full max-w-xl">
      {/* Chrome */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <div className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
          <div className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" />
          <div className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
          <div className="h-4 w-px bg-white/10 mx-1" />
          <span className="font-mono text-[10px] text-[var(--text-muted)] uppercase tracking-widest">ALTREX PLATFORM — LIVE</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse" />
          <span className="text-[10px] text-[var(--data-green)] font-mono">LIVE</span>
        </div>
      </div>
      {/* Load */}
      <div className="mb-6">
        <div className="flex justify-between items-center mb-2">
          <span className="font-mono text-[10px] text-[var(--text-muted)] uppercase">SYSTEM LOAD</span>
          <span className="text-[10px] text-orange-400 bg-orange-500/10 border border-orange-500/20 px-2 py-0.5 rounded">OPTIMAL</span>
        </div>
        <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
          <motion.div className="h-full bg-gradient-to-r from-orange-600 to-orange-400" initial={{ width: 0 }} animate={{ width: `${systemLoad}%` }} transition={{ duration: 1.2, ease: "easeOut" }} />
        </div>
      </div>
      {/* Metrics */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="rounded-xl border border-border p-4 bg-background">
          <div className="h-1.5 w-1.5 rounded-full bg-[var(--data-green)] mb-2" />
          <div className="font-mono text-[9px] text-[var(--text-muted)] uppercase">ACTIVE CAPABILITIES</div>
          <div className="text-xl font-bold">{metric1}</div>
        </div>
        <div className="rounded-xl border border-border p-4 bg-background">
          <div className="h-1.5 w-1.5 rounded-full bg-[#3b82f6] mb-2" />
          <div className="font-mono text-[9px] text-[var(--text-muted)] uppercase">INDUSTRIES</div>
          <div className="text-xl font-bold">{metric2}</div>
        </div>
      </div>
      {/* Modules */}
      <div>
        <div className="font-mono text-[10px] text-[var(--text-muted)] uppercase tracking-widest mb-3">ACTIVE MODULES</div>
        <div className="flex flex-wrap gap-2">
          {capabilities.slice(0, 6).map((cap, i) => (
            <span key={cap} className={`rounded-md border border-border px-2.5 py-1 text-[10px] font-mono ${i === (seed % 6) ? 'border-orange-500/40 bg-orange-500/10 text-orange-300' : 'text-muted-foreground'}`}>{cap}</span>
          ))}
        </div>
      </div>
    </div>
  );
};

export const ServicePage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const service: ServiceData | undefined = slug
    ? servicesRegistry[slug]
    : undefined;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  if (!service) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background px-6 py-12">
        <div className="text-center">
          <p className="font-mono text-sm text-muted-foreground mb-4">
            404 — SERVICE NOT FOUND
          </p>
          <Link to="/">
            <Button variant="ghost" className="text-foreground">
              Return to Home
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen bg-background text-foreground">
      <div className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[700px] overflow-hidden">
        <div className="absolute left-[-5%] top-[5%] h-[500px] w-[500px] rounded-full bg-orange-500/8 blur-[120px]" />
        <div className="absolute right-[-5%] top-[15%] h-[400px] w-[400px] rounded-full bg-fuchsia-500/8 blur-[120px]" />
      </div>

      {/* Hero Section */}
      <section className="mx-auto max-w-7xl px-6 pt-32 pb-24 lg:px-8">
        <motion.div initial="hidden" animate="visible" variants={stagger} className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="max-w-4xl">
            <motion.div variants={fadeUp} className="mb-6">
              <SectionBadge
                title={`${service.title} — Digital Platform`}
                dot={true}
                dotColor="bg-emerald-500"
                className="mb-8"
              />
            </motion.div>
            <motion.p variants={fadeUp} className="font-mono text-sm tracking-[0.2em] uppercase text-[var(--accent-violet)] mb-4">{service.hero.subtitle}</motion.p>
            <motion.h1 variants={fadeUp} className="text-4xl font-bold tracking-[-0.03em] text-foreground sm:text-5xl lg:text-6xl leading-[1.1] uppercase">{service.title}</motion.h1>
            <motion.p variants={fadeUp} transition={{ delay: 0.8 }} className="mt-8 max-w-2xl text-base leading-7 text-muted-foreground sm:text-lg">{service.hero.description}</motion.p>
            {service.hero.badge && <motion.div variants={fadeUp} transition={{ delay: 0.95 }} className="mt-8 max-w-2xl rounded-2xl border border-orange-400/20 bg-orange-50/50 p-5 text-sm text-foreground">{service.hero.badge}</motion.div>}
            <motion.div variants={fadeUp} transition={{ delay: 1 }} className="mt-10 flex flex-wrap gap-4">
              {service.hero.ctas.slice(0, 2).map((cta, idx) => (
                <Link key={cta} to="/contact">
                  <Button variant={idx === 0 ? "default" : "ghost"} className={idx === 0 ? "h-11 px-6 rounded-lg bg-orange-500 text-white hover:bg-primary" : "h-11 px-6 rounded-lg border border-border text-foreground hover:bg-card"}>
                    {cta} {idx === 0 && <ArrowRight className="ml-2 h-4 w-4" />}
                  </Button>
                </Link>
              ))}
            </motion.div>
          </div>
          <div className="hidden lg:block w-full">
            <LivePanel service={service} />
          </div>
        </motion.div>
      </section>

      {/* SECTION 1: Capability row - Redesigned */}
      <section className="border-y border-border bg-card/60 backdrop-blur-sm">
        <div className="mx-auto max-w-7xl px-6 lg:px-8 py-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {service.keyBenefits.map((benefit, idx) => {
            const Icon = getIconForText(benefit);
            return (
              <motion.div
                key={benefit}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: idx * 0.15, duration: 0.5 }}
                className="rounded-2xl border border-border bg-background p-5 text-sm text-muted-foreground shadow-sm flex items-center gap-3"
              >
                <div className="rounded-lg bg-[rgba(249,115,22,0.08)] border border-[rgba(249,115,22,0.2)] p-2">
                  <motion.div animate={{ scale: [1, 1.1, 1] }} transition={{ duration: 2, repeat: Infinity }}>
                    <Icon className="h-5 w-5 text-[#f97316]" />
                  </motion.div>
                </div>
                <span>{benefit}</span>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* SECTION 2: Overview - Redesigned */}
      <section className="mx-auto max-w-7xl px-6 lg:px-8 py-24">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.25 }} variants={stagger} className="grid gap-12 lg:grid-cols-[1fr_1.6fr] lg:gap-20 items-start">
          <motion.div variants={fadeUp} className="space-y-3">
            <SectionLabel>{service.overview.title}</SectionLabel>
            <SectionHeading>{service.overview.subtitle}</SectionHeading>
          </motion.div>

          <motion.div variants={fadeUp} className="grid md:grid-cols-[1fr_auto_1fr] gap-8 items-center">
            <div className="rounded-xl bg-[var(--bg-raised)] border border-border p-8 h-full">
              <div className="flex items-center gap-2 mb-4 text-[var(--text-muted)] font-mono text-xs uppercase"><AlertCircle className="h-4 w-4" />THE CHALLENGE</div>
              <p className="text-sm leading-relaxed line-clamp-3">{service.overview.paragraphs[0]}</p>
            </div>

            <div className="flex justify-center items-center">
              <ArrowRight className="h-8 w-8 text-orange-500 hidden md:block" />
              <ArrowRight className="h-8 w-8 text-orange-500 rotate-90 md:hidden" />
            </div>

            <div className="rounded-xl border border-[rgba(249,115,22,0.25)] p-8 shadow-[0_0_20px_rgba(249,115,22,0.08)] h-full">
              <div className="flex items-center gap-2 mb-4 text-[#f97316] font-mono text-xs uppercase"><CheckCircle2 className="h-4 w-4" />THE ALTREX SOLUTION</div>
              <p className="text-sm leading-relaxed line-clamp-3">{service.overview.paragraphs[1]}</p>
            </div>
          </motion.div>
        </motion.div>
      </section>

      {/* SECTION 3: Technical Capabilities Range - Redesigned */}
      {service.platformCapabilities ? (
        <section className="border-y border-border bg-card/60 backdrop-blur-sm">
          <div className="mx-auto max-w-7xl px-6 lg:px-8 py-24">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.15 }} variants={stagger}>
              <motion.div variants={fadeUp} className="mb-14 space-y-3">
                <SectionLabel>Capabilities</SectionLabel>
                <SectionHeading>Technical Capabilities Range</SectionHeading>
              </motion.div>

              <motion.div variants={stagger} className="grid gap-8 lg:grid-cols-2">
                {service.platformCapabilities.map((group) => (
                  <motion.div key={group.title} variants={cardVariant} className="rounded-2xl border border-border bg-background p-6 shadow-sm">
                    <h3 className="mb-4 flex items-center gap-2 text-base font-semibold text-foreground"><span className="h-3 w-1 rounded-full bg-orange-400" />{group.title}</h3>
                    <div className="space-y-2">
                      {group.items.map((item) => {
                        const Icon = getIconForText(item);
                        return (
                          <div key={item} className="flex items-center gap-2 text-xs text-muted-foreground">
                            <Icon className="h-3.5 w-3.5 text-[#f97316]" />
                            <span>{item}</span>
                          </div>
                        );
                      })}
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>
          </div>
        </section>
      ) : null}

      {/* SECTION 4: Why Choose Altrex - Redesigned */}
      {service.whyChoose ? (
        <section className="mx-auto max-w-7xl px-6 lg:px-8 py-24 border-y border-border bg-card/60 backdrop-blur-sm">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.15 }} variants={stagger}>
            <motion.div variants={fadeUp} className="mb-14 space-y-3">
              <SectionLabel>Differentiators</SectionLabel>
              <SectionHeading>{service.whyChoose.title}</SectionHeading>
            </motion.div>

            <motion.div variants={stagger} className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {service.whyChoose.items.map((item, idx) => {
                const title = typeof item === "string" ? item : item.title;
                const desc = typeof item === "string" ? "" : item.description;
                return (
                  <motion.div key={`${title}-${idx}`} variants={cardVariant} className="rounded-2xl border border-border bg-background p-6 shadow-sm flex flex-col gap-4">
                    <span className="font-mono text-[11px] text-orange-500 block">{String(idx + 1).padStart(2, "0")}</span>
                    <h3 className="text-lg font-semibold text-foreground">{title}</h3>
                    <div className="flex items-center gap-1 text-[10px] font-mono text-muted-foreground border border-border p-2 rounded bg-[var(--bg-raised)]">
                      {idx === 0 ? <><div className="flex-1 text-center bg-[var(--bg-surface)] p-1 rounded">Input</div><ArrowRight className="h-3 w-3" /><div className="flex-1 text-center bg-orange-500 text-white p-1 rounded">ALTREX</div><ArrowRight className="h-3 w-3" /><div className="flex-1 text-center bg-[var(--bg-surface)] p-1 rounded">Outcome</div></> : <><div className="flex flex-col gap-1"><div className="bg-[var(--bg-surface)] p-1 rounded">In 1</div><div className="bg-[var(--bg-surface)] p-1 rounded">In 2</div></div><ArrowRight className="h-3 w-3" /><div className="flex-1 text-center bg-orange-500 text-white p-1 rounded flex items-center justify-center">Unified View</div></>}
                    </div>
                    <p className="text-xs leading-6 text-muted-foreground line-clamp-1">{desc}</p>
                  </motion.div>
                );
              })}
            </motion.div>
          </motion.div>
        </section>
      ) : null}

      {/* Other sections - UNCHANGED */}
      {service.whatWeDeliver ? (
        <section className="border-y border-border bg-card/60 backdrop-blur-sm">
          <div className="mx-auto max-w-7xl px-6 lg:px-8 py-24">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.15 }} variants={stagger}>
              <motion.div variants={fadeUp} className="mb-14 space-y-3">
                <SectionLabel>Capabilities</SectionLabel>
                <SectionHeading>Operational Scope Matrix</SectionHeading>
              </motion.div>
              <motion.div variants={stagger} className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {service.whatWeDeliver.map((item, idx) => (
                  <motion.div key={item.title} variants={cardVariant} className="group rounded-2xl border border-border bg-background p-6 shadow-sm hover:border-orange-400/25 transition-all duration-300">
                    <div className="mb-4 flex items-center justify-between">
                      <span className="font-mono text-[11px] font-bold tracking-[0.25em] text-orange-500">{String(idx + 1).padStart(2, "0")}</span>
                      <div className="h-1.5 w-14 rounded-full bg-orange-500/10" />
                    </div>
                    <h3 className="text-lg font-semibold text-foreground mb-3">{item.title}</h3>
                    <p className="text-sm leading-6 text-muted-foreground">{item.description}</p>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>
          </div>
        </section>
      ) : null}

      {service.approachSteps ? (
        <section className="mx-auto max-w-7xl px-6 lg:px-8 py-24">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.15 }} variants={stagger}>
            <motion.div variants={fadeUp} className="mb-14 space-y-3">
              <SectionLabel>Methodology</SectionLabel>
              <SectionHeading>Approach Sequence</SectionHeading>
            </motion.div>
            <motion.div variants={stagger} className="space-y-8">
              {service.approachSteps.map((step) => (
                <motion.div key={step.title} variants={cardVariant} className="group rounded-2xl border border-border bg-background p-8 shadow-sm transition-all duration-300 hover:border-orange-400/25">
                  <div className="flex flex-col gap-6 lg:flex-row lg:items-start">
                    <div className="lg:max-w-md">
                      <h3 className="text-xl font-bold text-foreground group-hover:text-orange-500 transition-colors duration-300">{step.title}</h3>
                    </div>
                    <div className="flex-1 lg:pl-8 space-y-4">
                      {step.activities?.length ? (
                        <div>
                          <span className="text-[11px] font-mono uppercase tracking-[0.24em] text-muted-foreground block mb-2">Target Milestones</span>
                          <div className="flex flex-wrap gap-2">
                            {step.activities.map((activity, activityIdx) => (
                              <span key={activityIdx} className="rounded-full border border-border bg-card px-2.5 py-1 text-xs text-muted-foreground">{activity}</span>
                            ))}
                          </div>
                        </div>
                      ) : null}
                      {step.deliverables?.length ? (
                        <div>
                          <span className="text-[11px] font-mono uppercase tracking-[0.24em] text-orange-500 block mb-2">Core Engineering Deliverables</span>
                          <div className="flex flex-wrap gap-2">
                            {step.deliverables.map((deliverable, deliverableIdx) => (
                              <span key={deliverableIdx} className="rounded-full border border-orange-200 bg-orange-50 px-2.5 py-1 text-xs text-orange-700 font-medium">{deliverable}</span>
                            ))}
                          </div>
                        </div>
                      ) : null}
                      {step.servicesInclude?.length ? (
                        <div>
                          <span className="text-[11px] font-mono uppercase tracking-[0.24em] text-muted-foreground block mb-2">Functional Inclusions</span>
                          <ul className="list-disc list-inside space-y-2 text-sm text-muted-foreground">
                            {step.servicesInclude.map((item, itemIdx) => (<li key={itemIdx}>{item}</li>))}
                          </ul>
                        </div>
                      ) : null}
                      {step.typicalComponents ? (
                        <div className="space-y-3 pt-2">
                          {Object.entries(step.typicalComponents).map(([groupTitle, items], componentIdx) => (
                            <div key={componentIdx}>
                              <span className="text-[11px] font-mono text-muted-foreground block mb-1">{groupTitle}</span>
                              <div className="flex flex-wrap gap-1.5">
                                {items.map((item, itemIdx) => (<span key={itemIdx} className="rounded-full border border-border bg-card px-2 py-0.5 text-[11px] text-muted-foreground">{item}</span>))}
                              </div>
                            </div>
                          ))}
                        </div>
                      ) : null}
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </section>
      ) : null}

      {service.integrationCapabilities ? (
        <section className="mx-auto max-w-7xl px-6 lg:px-8 py-24 border-y border-border bg-card/60 backdrop-blur-sm">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.15 }} variants={stagger}>
            <motion.div variants={fadeUp} className="mb-14 space-y-3">
              <SectionLabel>Integration</SectionLabel>
              <SectionHeading>Integration Capabilities</SectionHeading>
            </motion.div>
            <motion.div variants={stagger} className="grid gap-8 lg:grid-cols-2">
              {service.integrationCapabilities.map((group) => (
                <motion.div key={group.title} variants={cardVariant} className="rounded-2xl border border-border bg-background p-6 shadow-sm">
                  <h3 className="mb-4 text-base font-semibold text-foreground">{group.title}</h3>
                  <div className="flex flex-wrap gap-2">
                    {group.items.map((item) => (
                      <span key={item} className="rounded-full border border-border bg-card px-2.5 py-1 text-xs text-muted-foreground">{item}</span>
                    ))}
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </section>
      ) : null}

      {service.securityAndCompliance || service.scalability ? (
        <section className="mx-auto max-w-7xl px-6 lg:px-8 py-24 grid gap-8 lg:grid-cols-2">
          {service.securityAndCompliance ? (
            <div className="rounded-2xl border border-border bg-background p-8 shadow-sm">
              <h3 className="text-lg font-bold text-foreground mb-2">{service.securityAndCompliance.title}</h3>
              <p className="text-muted-foreground text-sm mb-6">{service.securityAndCompliance.description}</p>
              <ul className="grid gap-3 sm:grid-cols-2 text-sm text-muted-foreground">
                {service.securityAndCompliance.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-2"><span className="mt-1 block h-2 w-2 rounded-full bg-orange-500" /><span>{feature}</span></li>
                ))}
              </ul>
            </div>
          ) : null}
          {service.scalability ? (
            <div className="rounded-2xl border border-border bg-background p-8 shadow-sm flex flex-col justify-between">
              <div>
                <h3 className="text-lg font-bold text-foreground mb-2">{service.scalability.title}</h3>
                <p className="text-muted-foreground text-sm mb-4">{service.scalability.description}</p>
                <div className="flex flex-wrap gap-2 mb-6">
                  {service.scalability.suitableFor.map((suit) => (<span key={suit} className="rounded-full border border-border bg-card px-2 py-0.5 text-[11px] text-muted-foreground">{suit}</span>))}
                </div>
              </div>
              <div className="rounded-2xl border border-border bg-card p-3 text-[11px] font-mono text-orange-500">
                <span className="block font-semibold uppercase tracking-[0.2em] mb-1">Summary</span>
                {service.scalability.summary}
              </div>
            </div>
          ) : null}
        </section>
      ) : null}

      <section className="mx-auto max-w-7xl px-6 lg:px-8 py-20">
        <div className="text-center">
          <h4 className="text-xs font-mono uppercase tracking-[0.28em] text-muted-foreground mb-8">Operational Verticals Served</h4>
          <div className="flex flex-wrap justify-center gap-2.5">
            {service.industries.map((industry) => {
              const Icon = getIconForText(industry);
              return (
                <span key={industry} className="rounded-full border border-border bg-card px-4 py-1.5 text-xs text-muted-foreground font-medium flex items-center gap-1.5">
                  <Icon className="h-3.5 w-3.5 text-[#f97316]" />
                  {industry}
                </span>
              );
            })}
          </div>
        </div>
      </section>

      <CTASection
        title={service.callToAction.title}
        description={service.callToAction.description}
        badge="[ Take Action ]"
        primaryButton={{ 
          label: service.callToAction.ctas[0] ?? "Request Demo", 
          href: "/contact" 
        }}
        secondaryButton={{ 
          label: service.callToAction.ctas[1] ?? "Talk to an Expert", 
          href: "/contact" 
        }}
      />
    </div>
  );
};
