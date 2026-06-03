import { motion, type Variants } from "framer-motion";
import { Mail, MapPin, Phone, ArrowRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import CharReveal from "@/components/CharReveal";

const fadeUpVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 40,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
    },
  },
};

const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
};

const Contact = () => {
  return (
    <div className="relative min-h-screen overflow-hidden bg-[var(--bg-void)] text-[var(--text-primary)]">
      <div className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[600px] overflow-hidden">
        <div className="absolute left-[-10%] top-[10%] h-[420px] w-[420px] rounded-full bg-orange-500/10 blur-3xl" />
        <div className="absolute right-[-10%] top-[20%] h-[360px] w-[360px] rounded-full bg-fuchsia-500/10 blur-3xl" />
      </div>

      <div className="mx-auto max-w-7xl px-6 lg:px-8 pt-28 pb-24">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
          className="mx-auto max-w-7xl text-center"
        >
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="mb-6"
          >
            <Badge
              variant="secondary"
              className="border-black/[0.08] bg-[var(--bg-surface)] shadow-sm"
            >
              <div className="flex h-4 w-4 items-center justify-center rounded-full bg-[var(--data-green)]">
                <span className="h-1.5 w-1.5 rounded-full bg-white animate-pulse" />
              </div>
              <span className="font-mono text-sm text-[var(--text-primary)]">
                CONTACT US
              </span>
            </Badge>
          </motion.div>

          {/* Heading — character-by-character reveal */}
          <CharReveal
            as="h1"
            lines={["Get in touch with our team", "to discuss your project."]}
            className="max-w-9xl text-3xl font-bold tracking-[-0.04em] text-[var(--text-primary)] sm:text-5xl lg:text-5xl xl:text-7xl mt-8 leading-[0.95] uppercase"
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
            className="mt-10 max-w-2xl text-base leading-7 text-[var(--text-secondary)] sm:text-lg text-center mx-auto"
          >
            Share your challenge, book a demo, or start a pilot. Altrex helps
            manufacturing, energy, and logistics teams modernize operations with
            secure IoT, analytics, and automation.
          </motion.p>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.25 }}
          variants={staggerContainer}
          className="mt-16 grid gap-8 lg:grid-cols-[1.2fr_0.8fr]"
        >
          <motion.section
            variants={fadeUpVariants}
            className="rounded-2xl border border-black/10 bg-[var(--bg-surface)] p-10 shadow-[0_30px_80px_-40px_rgba(15,23,42,0.16)]"
          >
            <div className="grid gap-8">
              <div className="space-y-4">
                <p className="text-sm uppercase tracking-[0.1em] text-[var(--text-muted)]">
                  Request a consultation
                </p>
                <h2 className="text-3xl font-semibold text-[var(--text-primary)]">
                  Send us a note and we’ll reply shortly.
                </h2>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="text-sm font-medium text-[var(--text-secondary)]">
                    Full Name
                  </label>
                  <Input placeholder="Your name" className="mt-3 w-full p-5" />
                </div>
                <div>
                  <label className="text-sm font-medium text-[var(--text-secondary)]">
                    Work Email
                  </label>
                  <Input
                    placeholder="name@company.com"
                    className="mt-3 w-full p-5"
                  />
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="text-sm font-medium text-[var(--text-secondary)]">
                    Company
                  </label>
                  <Input placeholder="Company name" className="mt-3 w-full p-5" />
                </div>
                <div className="sm:col-span-2">
                  <label className="text-sm font-medium text-[var(--text-secondary)]">
                    Message
                  </label>
                  <textarea
                    rows={6}
                    className="mt-3 min-h-[180px] w-full rounded-xl border border-input bg-transparent px-4 py-4 text-base text-[var(--text-primary)] outline-none transition-colors focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50"
                    placeholder="Tell us about your project, timeline, and current challenges."
                  />
                </div>
              </div>

              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <p className="text-sm text-[var(--text-muted)]">
                  We typically reply within one business day. Use the direct
                  contacts for urgent enquiries.
                </p>
                <Button className="w-full sm:w-auto bg-primary text-primary-foreground hover:bg-primary/90 px-8 py-3">
                  Send Message
                </Button>
              </div>
            </div>
          </motion.section>

          <motion.aside
            variants={fadeUpVariants}
            className="space-y-6 rounded-2xl border border-black/10 bg-[var(--bg-surface)] p-10 shadow-[0_30px_80px_-40px_rgba(15,23,42,0.16)]"
          >
            <div className="rounded-xl bg-gradient-to-r from-orange-500/10 via-transparent to-fuchsia-500/10 p-7">
              <p className="text-sm font-semibold uppercase tracking-[0.1em] text-[var(--text-secondary)]">
                Contact Details
              </p>
              <h2 className="mt-4 text-2xl font-semibold text-[var(--text-primary)]">
                Talk with our enterprise team.
              </h2>
              <p className="mt-4 text-sm leading-7 text-[var(--text-secondary)]">
                Fast-track your industrial digital transformation with secure,
                realtime systems designed for production and operations teams.
              </p>
            </div>

            <div className="grid gap-4">
              <motion.div
                variants={fadeUpVariants}
                className="rounded-xl border border-black/10 bg-[var(--bg-surface)] p-6"
              >
                <div className="flex items-center gap-2 text-orange-600">
                  <Mail className="h-5 w-5" />
                  <span className="text-sm font-semibold text-[var(--text-primary)]">
                    Email
                  </span>
                </div>
                <p className="mt-4 text-sm text-[var(--text-secondary)]">
                  hello@altrex.com
                </p>
              </motion.div>

              <motion.div
                variants={fadeUpVariants}
                className="rounded-xl border border-black/10 bg-[var(--bg-surface)] p-6"
              >
                <div className="flex items-center gap-2 text-slate-700">
                  <Phone className="h-5 w-5" />
                  <span className="text-sm font-semibold text-[var(--text-primary)]">
                    Phone
                  </span>
                </div>
                <p className="mt-4 text-sm text-[var(--text-secondary)]">
                  +91 12345 67890
                </p>
              </motion.div>

              <motion.div
                variants={fadeUpVariants}
                className="rounded-xl border border-black/10 bg-[var(--bg-surface)] p-6"
              >
                <div className="flex items-center gap-2 text-slate-700">
                  <MapPin className="h-5 w-5" />
                  <span className="text-sm font-semibold text-[var(--text-primary)]">
                    Headquarters
                  </span>
                </div>
                <p className="mt-4 text-sm text-[var(--text-secondary)]">
                  Ahmedabad, India
                </p>
              </motion.div>
            </div>
          </motion.aside>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={staggerContainer}
          className="mt-16 grid gap-6 lg:grid-cols-3"
        >
          {[
            {
              title: "Enterprise-grade security",
              text: "SOC 2 compliant workflows, encrypted data transport, and zero trust access.",
            },
            {
              title: "Realtime operational visibility",
              text: "Dashboards, alerts, and anomaly detection built for industrial teams.",
            },
            {
              title: "Built for scale",
              text: "From edge sensors to cloud analytics, designed to support large distributed assets.",
            },
          ].map((item) => (
            <motion.div
              key={item.title}
              variants={fadeUpVariants}
              className="rounded-2xl border border-black/10 bg-[var(--bg-surface)] p-7 shadow-[0_30px_80px_-40px_rgba(15,23,42,0.16)] transition hover:-translate-y-1 hover:border-white/20"
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h3 className="text-xl font-semibold text-[var(--text-primary)]">
                    {item.title}
                  </h3>
                  <p className="mt-3 text-sm leading-7 text-[var(--text-secondary)]">
                    {item.text}
                  </p>
                </div>
                <Button size="icon" variant="outline">
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default Contact;
