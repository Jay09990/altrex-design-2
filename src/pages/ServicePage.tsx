import type { ReactNode } from "react";
import { useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { motion, type Variants } from "framer-motion";
import { ArrowRight, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { servicesRegistry } from "@/data/servicesRegistry";
import type { ServiceData } from "@/types/service";
import { Badge } from "@/components/ui/badge";

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
    <span className="font-mono text-xs tracking-[0.2em] uppercase text-[var(--text-secondary)]">
      {children}
    </span>
  );
}

function SectionHeading({ children }: { children: ReactNode }) {
  return (
    <h2 className="text-3xl font-bold tracking-tight text-[var(--text-primary)] sm:text-4xl">
      {children}
    </h2>
  );
}

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
      <div className="flex min-h-screen items-center justify-center bg-[var(--bg-void)] px-6 py-12">
        <div className="text-center">
          <p className="font-mono text-sm text-[var(--text-secondary)] mb-4">
            404 — SERVICE NOT FOUND
          </p>
          <Link to="/">
            <Button variant="ghost" className="text-[var(--text-primary)]">
              Return to Home
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen bg-[var(--bg-void)] text-[var(--text-primary)]">
      <div className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[700px] overflow-hidden">
        <div className="absolute left-[-5%] top-[5%] h-[500px] w-[500px] rounded-full bg-orange-500/8 blur-[120px]" />
        <div className="absolute right-[-5%] top-[15%] h-[400px] w-[400px] rounded-full bg-fuchsia-500/8 blur-[120px]" />
      </div>

      <section className="mx-auto max-w-7xl px-6 pt-32 pb-24 lg:px-8">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={stagger}
          className="max-w-4xl"
        >
          {/* Status badge */}
          <motion.div variants={fadeUp} className="mb-6">
            <Badge
              variant="secondary"
              className="border border-[var(--border-subtle)] bg-[var(--bg-surface)]"
            >
              <div className="flex h-4 w-4 items-center justify-center rounded-full bg-[var(--data-green)]">
                <span className="h-1.5 w-1.5 rounded-full bg-white animate-pulse" />
              </div>
              <span className="font-mono text-xs text-[var(--text-primary)] tracking-widest uppercase">
                Services
              </span>
              <ChevronRight className="h-3 w-3 text-[var(--text-muted)]" />
              <span className="font-mono text-xs text-[var(--text-muted)]">
                {service.title}
              </span>
            </Badge>
          </motion.div>

          {/* Tagline */}
          <motion.p
            variants={fadeUp}
            className="font-mono text-sm tracking-[0.2em] uppercase text-[var(--accent-violet)] mb-4"
          >
            {service.hero.subtitle}
          </motion.p>

          {/* Main heading */}
          <motion.h1
            variants={fadeUp}
            className="text-4xl font-bold tracking-[-0.03em] text-[var(--text-primary)] sm:text-5xl lg:text-6xl leading-[1.1] uppercase break-normal"
          >
            {service.title}
          </motion.h1>

          {/* Description */}
          <motion.p
            variants={fadeUp}
            transition={{ delay: 0.8 }}
            className="mt-8 max-w-2xl text-base leading-7 text-[var(--text-secondary)] sm:text-lg"
          >
            {service.hero.description}
          </motion.p>

          {service.hero.badge && (
            <motion.div
              variants={fadeUp}
              transition={{ delay: 0.95 }}
              className="mt-8 max-w-2xl rounded-2xl border border-orange-400/20 bg-orange-50/50 p-5 text-sm text-[var(--text-primary)]"
            >
              {service.hero.badge}
            </motion.div>
          )}

          <motion.div
            variants={fadeUp}
            transition={{ delay: 1 }}
            className="mt-10 flex flex-wrap gap-4"
          >
            {service.hero.ctas.slice(0, 2).map((cta, idx) => (
              <Link key={cta} to="/contact">
                <Button
                  variant={idx === 0 ? "default" : "ghost"}
                  className={
                    idx === 0
                      ? "h-11 px-6 rounded-lg bg-orange-500 text-white hover:bg-orange-600"
                      : "h-11 px-6 rounded-lg border border-[var(--border-subtle)] text-[var(--text-primary)] hover:bg-[var(--bg-surface)]"
                  }
                >
                  {cta}
                  {idx === 0 ? <ArrowRight className="ml-2 h-4 w-4" /> : null}
                </Button>
              </Link>
            ))}
          </motion.div>
        </motion.div>
      </section>

      <section className="border-y border-[var(--border-subtle)] bg-[var(--bg-surface)]/60 backdrop-blur-sm">
        <div className="mx-auto max-w-7xl px-6 lg:px-8 py-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {service.keyBenefits.map((benefit) => (
            <div
              key={benefit}
              className="rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-void)] p-5 text-sm text-[var(--text-secondary)] shadow-sm"
            >
              <div className="flex items-center gap-3">
                <span className="h-2.5 w-2.5 rounded-full bg-orange-500" />
                <span>{benefit}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 lg:px-8 py-24">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.25 }}
          variants={stagger}
          className="grid gap-12 lg:grid-cols-[1fr_1.6fr] lg:gap-20 items-start"
        >
          <motion.div variants={fadeUp} className="space-y-3">
            <SectionLabel>{service.overview.title}</SectionLabel>
            <SectionHeading>{service.overview.subtitle}</SectionHeading>
          </motion.div>

          <motion.div
            variants={fadeUp}
            className="space-y-6 text-base leading-8 text-[var(--text-secondary)] lg:text-lg"
          >
            {service.overview.paragraphs.map((paragraph, idx) => (
              <p key={idx}>{paragraph}</p>
            ))}
          </motion.div>
        </motion.div>
      </section>

      {service.whatWeDeliver ? (
        <section className="border-y border-[var(--border-subtle)] bg-[var(--bg-surface)]/60 backdrop-blur-sm">
          <div className="mx-auto max-w-7xl px-6 lg:px-8 py-24">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.15 }}
              variants={stagger}
            >
              <motion.div variants={fadeUp} className="mb-14 space-y-3">
                <SectionLabel>Capabilities</SectionLabel>
                <SectionHeading>Operational Scope Matrix</SectionHeading>
              </motion.div>

              <motion.div
                variants={stagger}
                className="grid gap-6 md:grid-cols-2 lg:grid-cols-3"
              >
                {service.whatWeDeliver.map((item, idx) => (
                  <motion.div
                    key={item.title}
                    variants={cardVariant}
                    className="group rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-void)] p-6 shadow-sm hover:border-orange-400/25 transition-all duration-300"
                  >
                    <div className="mb-4 flex items-center justify-between">
                      <span className="font-mono text-[11px] font-bold tracking-[0.25em] text-orange-500">
                        {String(idx + 1).padStart(2, "0")}
                      </span>
                      <div className="h-1.5 w-14 rounded-full bg-orange-500/10" />
                    </div>
                    <h3 className="text-lg font-semibold text-[var(--text-primary)] mb-3">
                      {item.title}
                    </h3>
                    <p className="text-sm leading-6 text-[var(--text-secondary)]">
                      {item.description}
                    </p>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>
          </div>
        </section>
      ) : null}

      {service.approachSteps ? (
        <section className="mx-auto max-w-7xl px-6 lg:px-8 py-24">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.15 }}
            variants={stagger}
          >
            <motion.div variants={fadeUp} className="mb-14 space-y-3">
              <SectionLabel>Methodology</SectionLabel>
              <SectionHeading>Approach Sequence</SectionHeading>
            </motion.div>

            <motion.div variants={stagger} className="space-y-8">
              {service.approachSteps.map((step) => (
                <motion.div
                  key={step.title}
                  variants={cardVariant}
                  className="group rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-void)] p-8 shadow-sm transition-all duration-300 hover:border-orange-400/25"
                >
                  <div className="flex flex-col gap-6 lg:flex-row lg:items-start">
                    <div className="lg:max-w-md">
                      <h3 className="text-xl font-bold text-[var(--text-primary)] group-hover:text-orange-500 transition-colors duration-300">
                        {step.title}
                      </h3>
                    </div>
                    <div className="flex-1 lg:pl-8 space-y-4">
                      {step.activities?.length ? (
                        <div>
                          <span className="text-[11px] font-mono uppercase tracking-[0.24em] text-[var(--text-secondary)] block mb-2">
                            Target Milestones
                          </span>
                          <div className="flex flex-wrap gap-2">
                            {step.activities.map((activity, activityIdx) => (
                              <span
                                key={activityIdx}
                                className="rounded-full border border-[var(--border-subtle)] bg-[var(--bg-surface)] px-2.5 py-1 text-xs text-[var(--text-secondary)]"
                              >
                                {activity}
                              </span>
                            ))}
                          </div>
                        </div>
                      ) : null}

                      {step.deliverables?.length ? (
                        <div>
                          <span className="text-[11px] font-mono uppercase tracking-[0.24em] text-orange-500 block mb-2">
                            Core Engineering Deliverables
                          </span>
                          <div className="flex flex-wrap gap-2">
                            {step.deliverables.map(
                              (deliverable, deliverableIdx) => (
                                <span
                                  key={deliverableIdx}
                                  className="rounded-full border border-orange-200 bg-orange-50 px-2.5 py-1 text-xs text-orange-700 font-medium"
                                >
                                  {deliverable}
                                </span>
                              ),
                            )}
                          </div>
                        </div>
                      ) : null}

                      {step.servicesInclude?.length ? (
                        <div>
                          <span className="text-[11px] font-mono uppercase tracking-[0.24em] text-[var(--text-secondary)] block mb-2">
                            Functional Inclusions
                          </span>
                          <ul className="list-disc list-inside space-y-2 text-sm text-[var(--text-secondary)]">
                            {step.servicesInclude.map((item, itemIdx) => (
                              <li key={itemIdx}>{item}</li>
                            ))}
                          </ul>
                        </div>
                      ) : null}

                      {step.typicalComponents ? (
                        <div className="space-y-3 pt-2">
                          {Object.entries(step.typicalComponents).map(
                            ([groupTitle, items], componentIdx) => (
                              <div key={componentIdx}>
                                <span className="text-[11px] font-mono text-[var(--text-secondary)] block mb-1">
                                  {groupTitle}
                                </span>
                                <div className="flex flex-wrap gap-1.5">
                                  {items.map((item, itemIdx) => (
                                    <span
                                      key={itemIdx}
                                      className="rounded-full border border-[var(--border-subtle)] bg-[var(--bg-surface)] px-2 py-0.5 text-[11px] text-[var(--text-secondary)]"
                                    >
                                      {item}
                                    </span>
                                  ))}
                                </div>
                              </div>
                            ),
                          )}
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

      {service.platformCapabilities ? (
        <section className="border-y border-[var(--border-subtle)] bg-[var(--bg-surface)]/60 backdrop-blur-sm">
          <div className="mx-auto max-w-7xl px-6 lg:px-8 py-24">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.15 }}
              variants={stagger}
            >
              <motion.div variants={fadeUp} className="mb-14 space-y-3">
                <SectionLabel>Capabilities</SectionLabel>
                <SectionHeading>Technical Capabilities Range</SectionHeading>
              </motion.div>

              <motion.div
                variants={stagger}
                className="grid gap-8 lg:grid-cols-2"
              >
                {service.platformCapabilities.map((group) => (
                  <motion.div
                    key={group.title}
                    variants={cardVariant}
                    className="rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-void)] p-6 shadow-sm"
                  >
                    <h3 className="mb-4 flex items-center gap-2 text-base font-semibold text-[var(--text-primary)]">
                      <span className="h-3 w-1 rounded-full bg-orange-400" />
                      {group.title}
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {group.items.map((item) => (
                        <span
                          key={item}
                          className="rounded-full border border-[var(--border-subtle)] bg-[var(--bg-surface)] px-2.5 py-1 text-xs text-[var(--text-secondary)]"
                        >
                          {item}
                        </span>
                      ))}
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>
          </div>
        </section>
      ) : null}

      {service.integrationCapabilities ? (
        <section className="mx-auto max-w-7xl px-6 lg:px-8 py-24 border-y border-[var(--border-subtle)] bg-[var(--bg-surface)]/60 backdrop-blur-sm">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.15 }}
            variants={stagger}
          >
            <motion.div variants={fadeUp} className="mb-14 space-y-3">
              <SectionLabel>Integration</SectionLabel>
              <SectionHeading>Integration Capabilities</SectionHeading>
            </motion.div>

            <motion.div
              variants={stagger}
              className="grid gap-8 lg:grid-cols-2"
            >
              {service.integrationCapabilities.map((group) => (
                <motion.div
                  key={group.title}
                  variants={cardVariant}
                  className="rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-void)] p-6 shadow-sm"
                >
                  <h3 className="mb-4 text-base font-semibold text-[var(--text-primary)]">
                    {group.title}
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {group.items.map((item) => (
                      <span
                        key={item}
                        className="rounded-full border border-[var(--border-subtle)] bg-[var(--bg-surface)] px-2.5 py-1 text-xs text-[var(--text-secondary)]"
                      >
                        {item}
                      </span>
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
            <div className="rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-void)] p-8 shadow-sm">
              <h3 className="text-lg font-bold text-[var(--text-primary)] mb-2">
                {service.securityAndCompliance.title}
              </h3>
              <p className="text-[var(--text-secondary)] text-sm mb-6">
                {service.securityAndCompliance.description}
              </p>
              <ul className="grid gap-3 sm:grid-cols-2 text-sm text-[var(--text-secondary)]">
                {service.securityAndCompliance.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-2">
                    <span className="mt-1 block h-2 w-2 rounded-full bg-orange-500" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          ) : null}

          {service.scalability ? (
            <div className="rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-void)] p-8 shadow-sm flex flex-col justify-between">
              <div>
                <h3 className="text-lg font-bold text-[var(--text-primary)] mb-2">
                  {service.scalability.title}
                </h3>
                <p className="text-[var(--text-secondary)] text-sm mb-4">
                  {service.scalability.description}
                </p>
                <div className="flex flex-wrap gap-2 mb-6">
                  {service.scalability.suitableFor.map((suit) => (
                    <span
                      key={suit}
                      className="rounded-full border border-[var(--border-subtle)] bg-[var(--bg-surface)] px-2 py-0.5 text-[11px] text-[var(--text-secondary)]"
                    >
                      {suit}
                    </span>
                  ))}
                </div>
              </div>
              <div className="rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-surface)] p-3 text-[11px] font-mono text-orange-500">
                <span className="block font-semibold uppercase tracking-[0.2em] mb-1">
                  Summary
                </span>
                {service.scalability.summary}
              </div>
            </div>
          ) : null}
        </section>
      ) : null}

      {service.whyChoose ? (
        <section className="mx-auto max-w-7xl px-6 lg:px-8 py-24 border-y border-[var(--border-subtle)] bg-[var(--bg-surface)]/60 backdrop-blur-sm">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.15 }}
            variants={stagger}
          >
            <motion.div variants={fadeUp} className="mb-14 space-y-3">
              <SectionLabel>Differentiators</SectionLabel>
              <SectionHeading>{service.whyChoose.title}</SectionHeading>
            </motion.div>

            <motion.div
              variants={stagger}
              className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3"
            >
              {service.whyChoose.items.map((item, idx) => {
                const title = typeof item === "string" ? item : item.title;
                const description =
                  typeof item === "string" ? undefined : item.description;
                return (
                  <motion.div
                    key={`${title}-${idx}`}
                    variants={cardVariant}
                    className="rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-void)] p-6 shadow-sm hover:border-orange-400/25 transition-all duration-300"
                  >
                    <span className="font-mono text-[11px] text-orange-500 block mb-3">
                      {String(idx + 1).padStart(2, "0")}
                    </span>
                    <h3 className="text-lg font-semibold text-[var(--text-primary)] mb-2">
                      {title}
                    </h3>
                    {description ? (
                      <p className="text-sm leading-6 text-[var(--text-secondary)]">
                        {description}
                      </p>
                    ) : null}
                  </motion.div>
                );
              })}
            </motion.div>
          </motion.div>
        </section>
      ) : null}

      {service.serviceLevels ? (
        <section className="mx-auto max-w-7xl px-6 lg:px-8 py-24">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.15 }}
            variants={stagger}
          >
            <motion.div variants={fadeUp} className="mb-14 text-center">
              <SectionLabel>Service Levels</SectionLabel>
              <SectionHeading>Service Level Engineering</SectionHeading>
            </motion.div>

            <motion.div
              variants={stagger}
              className="grid gap-6 md:grid-cols-3"
            >
              {service.serviceLevels.map((level) => (
                <motion.div
                  key={level.title}
                  variants={cardVariant}
                  className="rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-void)] p-6 shadow-sm flex flex-col justify-between"
                >
                  <div>
                    <h3 className="text-lg font-bold text-[var(--text-primary)] mb-4 pb-2 border-b border-[var(--border-subtle)]">
                      {level.title}
                    </h3>
                    <ul className="space-y-2 text-sm text-[var(--text-secondary)] mb-8">
                      {level.coverage.map((coverage) => (
                        <li key={coverage} className="flex items-start gap-2">
                          <span className="mt-1 text-orange-500">•</span>
                          <span>{coverage}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-surface)] p-3 text-[11px] font-mono text-[var(--text-secondary)]">
                    <span className="block font-semibold uppercase tracking-[0.2em] mb-1 text-orange-500">
                      Operational Mapping:
                    </span>
                    {level.suitableFor}
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </section>
      ) : null}

      {service.useCases ||
      service.trainingPrograms ||
      service.commissioningActivities ? (
        <section className="mx-auto px-6 lg:px-8 py-24 border-y border-[var(--border-subtle)] bg-[var(--bg-surface)]/60 backdrop-blur-sm">
          <div className="space-y-12">
            {service.useCases ? (
              <div>
                <h4 className="text-xs font-mono uppercase tracking-[0.28em] text-orange-500 mb-6">
                  Target Implementations
                </h4>
                <div className="grid gap-6 md:grid-cols-2">
                  {service.useCases.map((uc) => (
                    <div
                      key={uc.title}
                      className="rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-void)] p-6 shadow-sm"
                    >
                      <h5 className="text-sm font-semibold text-[var(--text-primary)] mb-3 uppercase tracking-[0.14em]">
                        {uc.title}
                      </h5>
                      <ul className="list-disc list-inside space-y-2 text-sm text-[var(--text-secondary)]">
                        {uc.items.map((item) => (
                          <li key={item}>{item}</li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>
            ) : null}

            {service.trainingPrograms ? (
              <div>
                <h4 className="text-xs font-mono uppercase tracking-[0.28em] text-orange-500 mb-6">
                  Training Alignment
                </h4>
                <div className="grid gap-6 md:grid-cols-3">
                  {service.trainingPrograms.map((prog) => (
                    <div
                      key={prog.title}
                      className="rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-void)] p-6 shadow-sm"
                    >
                      <h5 className="text-sm font-semibold text-[var(--text-primary)] mb-3">
                        {prog.title}
                      </h5>
                      {prog.topics ? (
                        <ul className="space-y-2 text-sm text-[var(--text-secondary)]">
                          {prog.topics.map((topic) => (
                            <li key={topic}>• {topic}</li>
                          ))}
                        </ul>
                      ) : null}
                    </div>
                  ))}
                </div>
              </div>
            ) : null}

            {service.commissioningActivities ? (
              <div className="grid gap-6 md:grid-cols-2">
                <div className="rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-void)] p-6 shadow-sm">
                  <h5 className="text-xs font-mono uppercase tracking-[0.28em] text-orange-500 mb-4">
                    Deployment Checks
                  </h5>
                  <ul className="list-disc list-inside space-y-2 text-sm text-[var(--text-secondary)]">
                    {service.commissioningActivities.activities.map(
                      (activity) => (
                        <li key={activity}>{activity}</li>
                      ),
                    )}
                  </ul>
                </div>
                <div className="rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-void)] p-6 shadow-sm">
                  <h5 className="text-xs font-mono uppercase tracking-[0.28em] text-orange-500 mb-4">
                    Validation Mapping
                  </h5>
                  <ul className="list-disc list-inside space-y-2 text-sm text-[var(--text-secondary)]">
                    {service.commissioningActivities.verificationAreas.map(
                      (area) => (
                        <li key={area}>{area}</li>
                      ),
                    )}
                  </ul>
                </div>
              </div>
            ) : null}
          </div>
        </section>
      ) : null}

      <section className="mx-auto max-w-7xl px-6 lg:px-8 py-20">
        <div className="text-center">
          <h4 className="text-xs font-mono uppercase tracking-[0.28em] text-[var(--text-secondary)] mb-8">
            Operational Verticals Served
          </h4>
          <div className="flex flex-wrap justify-center gap-2.5">
            {service.industries.map((industry) => (
              <span
                key={industry}
                className="rounded-full border border-[var(--border-subtle)] bg-[var(--bg-surface)] px-4 py-1.5 text-xs text-[var(--text-secondary)] font-medium"
              >
                {industry}
              </span>
            ))}
          </div>
        </div>
      </section>

      <section className="border-y border-[var(--border-subtle)] bg-[var(--bg-surface)]/60 backdrop-blur-sm">
        <div className="relative overflow-hidden py-28">
          <div className="pointer-events-none absolute top-1/2 left-1/2 h-[400px] w-[400px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-orange-500/10 blur-[100px]" />
          <div className="mx-auto max-w-4xl px-6 relative z-10 text-center">
            <h3 className="text-3xl md:text-4xl font-bold tracking-tight text-[var(--text-primary)] mb-4">
              {service.callToAction.title}
            </h3>
            <p className="mx-auto max-w-2xl text-base leading-relaxed text-[var(--text-secondary)] mb-10">
              {service.callToAction.description}
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link to="/contact">
                <Button className="h-11 rounded-lg bg-orange-500 px-8 text-white hover:bg-orange-600">
                  {service.callToAction.ctas[0] ?? "Request Demo"}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              <Link to="/contact">
                <Button
                  variant="ghost"
                  className="h-11 rounded-lg border border-[var(--border-subtle)] px-8 text-[var(--text-primary)] hover:bg-[var(--bg-surface)]"
                >
                  {service.callToAction.ctas[1] ?? "Talk to an Expert"}
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
