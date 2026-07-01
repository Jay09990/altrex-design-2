import { useState, type FormEvent } from "react";
import { motion, type Variants } from "framer-motion";
import {
  Mail,
  MapPin,
  Phone,
  Clock,
  ArrowRight,
  Loader2,
  CheckCircle2,
  ShieldCheck,
  Activity,
  Headset,
  Layers,
  ChevronDown,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import CharReveal from "@/components/CharReveal";
import { SectionBadge } from "@/components/ui/section-badge";
import CTASection from "@/components/CTASection";

const fadeUpVariants: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8 } },
};

const staggerContainer: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
};

const INDUSTRIES = [
  "Manufacturing",
  "Energy & Utilities",
  "Logistics & Supply Chain",
  "Other",
];

const CONTACT_CARDS = [
  {
    icon: MapPin,
    label: "Headquarters",
    value: "Ahmedabad, India",
    href: "https://maps.google.com/?q=Ahmedabad,India",
  },
  {
    icon: Mail,
    label: "Email",
    value: "hello@altrex.com",
    href: "mailto:hello@altrex.com",
  },
  {
    icon: Phone,
    label: "Phone",
    value: "+91 12345 67890",
    href: "tel:+911234567890",
  },
  {
    icon: Clock,
    label: "Business Hours",
    value: "Mon – Fri, 9 AM – 6 PM IST",
    href: null,
  },
];

const SIDE_PANEL_STATS = [
  { icon: Activity, label: "Platform availability", value: "99.9%" },
  { icon: Layers, label: "Connected assets monitored", value: "1,000+" },
  { icon: Headset, label: "Monitoring coverage", value: "24/7" },
];

const WHY_CHOOSE = [
  {
    icon: ShieldCheck,
    title: "Industry expertise",
    text: "Years of experience deploying IoT and automation across manufacturing, energy, and logistics.",
  },
  {
    icon: Layers,
    title: "Scalable platform",
    text: "From a single facility to distributed assets across regions, built to grow with you.",
  },
  {
    icon: Activity,
    title: "Real-time monitoring",
    text: "Live dashboards and anomaly detection that surface issues before they become downtime.",
  },
  {
    icon: Headset,
    title: "End-to-end support",
    text: "From pilot to production, a dedicated team stays with your project at every stage.",
  },
];

type FormStatus = "idle" | "submitting" | "success";

const Contact = () => {
  const [status, setStatus] = useState<FormStatus>("idle");
  const [industry, setIndustry] = useState("");
  const [industryOpen, setIndustryOpen] = useState(false);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("submitting");
    // TODO: replace with real submit call once backend endpoint is available
    setTimeout(() => setStatus("success"), 1400);
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-background text-foreground">
      {/* ---------------- Hero ---------------- */}
      <section>
        <div className="mx-auto max-w-7xl px-6 lg:px-8 pt-28 pb-20">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
            className="mx-auto max-w-7xl text-center"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
              className="mb-6"
            >
              <SectionBadge
                title="CONTACT US"
                dot={true}
                dotColor="bg-emerald-500"
                className="mb-8"
              />
            </motion.div>

            <CharReveal
              as="h1"
              lines={["Get in touch with our team", "to discuss your project."]}
              className="max-w-9xl text-3xl font-bold tracking-[-0.04em] text-foreground sm:text-5xl lg:text-5xl xl:text-6xl mt-8 leading-[0.95] uppercase"
              immediate
              delay={0}
              stagger={0.028}
              lineGap="mt-6"
            />

            <motion.p
              variants={fadeUpVariants}
              initial="hidden"
              animate="visible"
              transition={{ delay: 1.2 }}
              className="mt-10 max-w-2xl text-base leading-7 text-muted-foreground font-semibold sm:text-lg text-center mx-auto"
            >
              Share your challenge, book a demo, or start a pilot. Altrex helps
              manufacturing, energy, and logistics teams modernize operations
              with secure IoT, analytics, and automation.
            </motion.p>

            <motion.div
              variants={fadeUpVariants}
              initial="hidden"
              animate="visible"
              transition={{ delay: 1.4 }}
              className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row"
            >
              <Button className="bg-primary text-primary-foreground px-8 py-6 text-base hover:bg-accent cursor-pointer">
                Schedule a Demo
              </Button>
              <Button
                variant="outline"
                className="px-8 py-6 text-base cursor-pointer"
              >
                Contact Sales
              </Button>
            </motion.div>

            <motion.div
              variants={fadeUpVariants}
              initial="hidden"
              animate="visible"
              transition={{ delay: 1.6 }}
              className="mt-12 flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-sm text-muted-foreground"
            >
              <span className="flex items-center gap-2">
                <ShieldCheck className="h-4 w-4 text-emerald-500" />
                SOC 2 compliant
              </span>
              <span className="flex items-center gap-2">
                <Activity className="h-4 w-4 text-emerald-500" />
                99.9% platform uptime
              </span>
              <span className="flex items-center gap-2">
                <Headset className="h-4 w-4 text-emerald-500" />
                24/7 monitoring support
              </span>
            </motion.div>
          </motion.div>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-6 lg:px-8 pb-24">
        {/* ---------------- Contact info cards ---------------- */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={staggerContainer}
          className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4"
        >
          {CONTACT_CARDS.map((card) => {
            const Icon = card.icon;
            const content = (
              <>
                <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-border text-accent">
                  <Icon className="h-5 w-5" />
                </div>
                <p className="mt-5 text-sm font-medium text-muted-foreground">
                  {card.label}
                </p>
                <p className="mt-1.5 text-base font-semibold text-foreground">
                  {card.value}
                </p>
              </>
            );

            return card.href ? (
              <motion.a
                key={card.label}
                href={card.href}
                target={card.href.startsWith("http") ? "_blank" : undefined}
                rel={
                  card.href.startsWith("http")
                    ? "noopener noreferrer"
                    : undefined
                }
                variants={fadeUpVariants}
                className="group rounded-2xl border border-border bg-card p-6"
              >
                {content}
              </motion.a>
            ) : (
              <motion.div
                key={card.label}
                variants={fadeUpVariants}
                className="group rounded-2xl border border-border bg-card p-6"
              >
                {content}
              </motion.div>
            );
          })}
        </motion.div>

        {/* ---------------- Form + side panel ---------------- */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          variants={staggerContainer}
          className="mt-8 grid gap-8 lg:grid-cols-[1.2fr_0.8fr]"
        >
          <motion.section
            variants={fadeUpVariants}
            className="rounded-2xl border border-border bg-card p-8 shadow-[0_30px_80px_-40px_rgba(15,23,42,0.16)] sm:p-10"
          >
            {status === "success" ? (
              <div className="flex h-full min-h-[480px] flex-col items-center justify-center text-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-emerald-500/10">
                  <CheckCircle2 className="h-8 w-8 text-emerald-500" />
                </div>
                <h2 className="mt-6 text-2xl font-semibold text-foreground">
                  Message sent.
                </h2>
                <p className="mt-3 max-w-sm text-sm leading-7 text-muted-foreground">
                  Thanks for reaching out. Our team typically replies within one
                  business day.
                </p>
                <Button
                  variant="outline"
                  className="mt-8 border-border"
                  onClick={() => setStatus("idle")}
                >
                  Send another message
                </Button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="grid gap-8">
                <div className="space-y-4">
                  <p className="text-sm uppercase tracking-[0.1em] font-semibold text-muted-foreground">
                    Request a consultation
                  </p>
                  <h2 className="text-3xl font-semibold text-foreground">
                    Send us a note and we’ll reply shortly.
                  </h2>
                </div>

                <div className="grid gap-5 sm:grid-cols-2">
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">
                      Full Name
                    </label>
                    <Input
                      required
                      placeholder="Your name"
                      className="mt-3 w-full p-5"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">
                      Work Email
                    </label>
                    <Input
                      required
                      type="email"
                      placeholder="name@company.com"
                      className="mt-3 w-full p-5"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">
                      Company
                    </label>
                    <Input
                      placeholder="Company name"
                      className="mt-3 w-full p-5"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">
                      Phone
                    </label>
                    <Input
                      type="tel"
                      placeholder="+91 12345 67890"
                      className="mt-3 w-full p-5"
                    />
                  </div>

                  <div className="relative sm:col-span-2">
                    <label className="text-sm font-medium text-muted-foreground">
                      Industry
                    </label>
                    <button
                      type="button"
                      onClick={() => setIndustryOpen((open) => !open)}
                      className="mt-3 flex w-full items-center justify-between rounded-lg border border-input bg-transparent px-5 py-3 text-left text-sm text-foreground outline-none transition-colors focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50"
                    >
                      <span className={industry ? "" : "text-muted-foreground"}>
                        {industry || "Select your industry"}
                      </span>
                      <ChevronDown
                        className={`h-4 w-4 text-muted-foreground transition-transform ${
                          industryOpen ? "rotate-180" : ""
                        }`}
                      />
                    </button>
                    {industryOpen && (
                      <div className="absolute z-10 mt-2 w-full overflow-hidden rounded-xl border border-border bg-card shadow-[0_30px_80px_-30px_rgba(15,23,42,0.25)]">
                        {INDUSTRIES.map((option) => (
                          <button
                            key={option}
                            type="button"
                            onClick={() => {
                              setIndustry(option);
                              setIndustryOpen(false);
                            }}
                            className="block w-full px-5 py-3 text-left text-sm text-foreground transition-colors hover:bg-orange-500/10"
                          >
                            {option}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>

                  <div className="sm:col-span-2">
                    <label className="text-sm font-medium text-muted-foreground">
                      Message
                    </label>
                    <textarea
                      required
                      rows={6}
                      className="mt-3 min-h-[160px] w-full rounded-lg border border-input bg-transparent px-4 py-4 text-sm text-foreground outline-none transition-colors focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50"
                      placeholder="Tell us about your project, timeline, and current challenges."
                    />
                  </div>
                </div>

                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                  <p className="text-sm text-muted-foreground">
                    We typically reply within one business day.
                  </p>
                  <Button
                    type="submit"
                    disabled={status === "submitting"}
                    className="w-full sm:w-auto bg-accent px-8 py-6"
                  >
                    {status === "submitting" ? (
                      <span className="flex items-center gap-2">
                        <Loader2 className="h-4 w-4 animate-spin" />
                        Sending...
                      </span>
                    ) : (
                      "Send Message"
                    )}
                  </Button>
                </div>
              </form>
            )}
          </motion.section>

          <motion.aside
            variants={fadeUpVariants}
            className="space-y-5 rounded-2xl border border-border bg-card p-8 shadow-[0_30px_80px_-40px_rgba(15,23,42,0.16)] sm:p-10"
          >
            <div className="rounded-xl bg-gradient-to-r from-orange-500/10 via-transparent to-fuchsia-500/10 p-7">
              <div className="flex items-center gap-2">
                <span className="relative flex h-2.5 w-2.5">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-500 opacity-75" />
                  <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-500" />
                </span>
                <p className="text-sm font-semibold uppercase tracking-[0.1em] text-muted-foreground">
                  Live platform status
                </p>
              </div>
              <h2 className="mt-4 text-2xl font-semibold text-foreground">
                Talk with our enterprise team.
              </h2>
              <p className="mt-4 text-sm leading-7 text-muted-foreground">
                Fast-track your industrial digital transformation with secure,
                realtime systems designed for production and operations teams.
              </p>
            </div>

            <div className="grid gap-4">
              {SIDE_PANEL_STATS.map((stat) => {
                const Icon = stat.icon;
                return (
                  <div
                    key={stat.label}
                    className="flex items-center justify-between rounded-xl border border-border bg-card p-5"
                  >
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-orange-500/15 to-fuchsia-500/15">
                        <Icon className="h-4.5 w-4.5" />
                      </div>
                      <span className="text-sm text-muted-foreground">
                        {stat.label}
                      </span>
                    </div>
                    <span className="text-lg font-semibold text-foreground">
                      {stat.value}
                    </span>
                  </div>
                );
              })}
            </div>
          </motion.aside>
        </motion.div>

        {/* ---------------- Location / map ---------------- */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={staggerContainer}
          className="mt-16"
        >
          <motion.div
            variants={fadeUpVariants}
            className="relative overflow-hidden rounded-2xl border border-border shadow-[0_30px_80px_-40px_rgba(15,23,42,0.16)]"
          >
            <div className="relative h-[380px] w-full bg-gradient-to-br from-slate-100 via-slate-50 to-slate-100 dark:from-slate-900 dark:via-slate-950 dark:to-slate-900">
              <div
                className="absolute inset-0 opacity-[0.06]"
                style={{
                  backgroundImage:
                    "linear-gradient(to right, currentColor 1px, transparent 1px), linear-gradient(to bottom, currentColor 1px, transparent 1px)",
                  backgroundSize: "40px 40px",
                }}
              />
              <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
                <span className="relative flex h-12 w-12 items-center justify-center">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-orange-500/40" />
                  <span className="relative flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-orange-500 to-fuchsia-500 shadow-lg">
                    <MapPin className="h-5 w-5 text-white" />
                  </span>
                </span>
              </div>
            </div>

            <div className="absolute bottom-6 left-6 right-6 sm:left-8 sm:right-auto sm:max-w-sm">
              <div className="rounded-xl border border-border bg-card/95 p-6 backdrop-blur-md shadow-[0_30px_80px_-30px_rgba(15,23,42,0.3)]">
                <p className="text-sm font-semibold uppercase tracking-[0.1em] text-muted-foreground">
                  Visit our office
                </p>
                <h3 className="mt-2 text-lg font-semibold text-foreground">
                  Altrex Headquarters
                </h3>
                <p className="mt-2 text-sm leading-6 text-muted-foreground">
                  Ahmedabad, Gujarat, India
                </p>
                <a
                  href="https://maps.google.com/?q=Ahmedabad,India"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-foreground transition-opacity hover:opacity-70"
                >
                  Get directions
                  <ArrowRight className="h-3.5 w-3.5" />
                </a>
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* ---------------- Why choose Altrex ---------------- */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={staggerContainer}
          className="my-16"
        >
          <motion.div variants={fadeUpVariants} className="mb-10 text-center">
            {/* Badge */}
            <motion.div
              variants={fadeUpVariants}
              initial="hidden"
              animate="visible"
            >
              <SectionBadge
                title="our story"
                dot={true}
                dotColor="bg-emerald-500"
                className="mb-8"
              />
            </motion.div>
            <h2 className="text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
              Built for industrial teams that can't afford downtime.
            </h2>
          </motion.div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {WHY_CHOOSE.map((item) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={item.title}
                  variants={fadeUpVariants}
                  className="rounded-2xl border border-border bg-card p-7"
                >
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-border text-accent">
                    <Icon className="h-5 w-5" />
                  </div>
                  <h3 className="mt-5 text-base font-semibold text-foreground">
                    {item.title}
                  </h3>
                  <p className="mt-3 text-sm leading-6 text-muted-foreground font-medium">
                    {item.text}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        {/* ---------------- CTA ---------------- */}
        <CTASection
            title="Ready to Modernize Your Operations?"
            description="Talk to our team about a pilot program tailored to your site, fleet, or facility."
            primaryButton={{ label: "Explore Solutions", href: "/solutions" }}
            secondaryButton={{ label: "Schedule a Demo", href: "/contact" }}
          />
      </div>
    </div>
  );
};

export default Contact;
