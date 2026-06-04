import { useRef } from "react";

import {
  Building2,
  MapPin,
  Globe,
  ShieldCheck,
  Sparkles,
  Users,
  Contact,
} from "lucide-react";
import { FaLinkedinIn } from "react-icons/fa6";

import { motion, useInView, type Variants } from "framer-motion";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

// React Bits components — installed at src/components/
// Install commands (run once in project root):
//   npx shadcn@latest add https://reactbits.dev/r/BlurText-TS-TW
//   npx shadcn@latest add https://reactbits.dev/r/CountUp-TS-TW
//   npx shadcn@latest add https://reactbits.dev/r/DecryptedText-TS-TW
//   npx shadcn@latest add https://reactbits.dev/r/ShinyText-TS-TW
//   npx shadcn@latest add https://reactbits.dev/r/ClickSpark-TS-TW
//   npx shadcn@latest add https://reactbits.dev/r/StarBorder-TS-TW
//   npx shadcn@latest add https://reactbits.dev/r/GradientText-TS-TW
import CharReveal from "@/components/CharReveal";
import DecryptedText from "@/components/DecryptedText";
import StarBorder from "@/components/StarBorder";
import InViewDecryptedText from "@/components/InViewDecryptedText";
import ScrambleCounter from "@/components/ScrambleCounter";
import SystemDataTicker from "@/components/SystemDataTicker";
import { useMagneticTilt } from "@/hooks/useMagneticTilt";

/* ─── Shared Variants ────────────────────────────────────────────────────── */

const fadeUpVariants: Variants = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.65 } },
};

const containerVariants: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

/* ─── Data ───────────────────────────────────────────────────────────────── */

const values = [
  {
    icon: ShieldCheck,
    title: "Reliability",
    description: "Mission-critical infrastructure built for nonstop operations.",
  },
  {
    icon: Sparkles,
    title: "Innovation",
    description: "Continuous R&D driving next-generation industrial platforms.",
  },
  {
    icon: Users,
    title: "Customer Success",
    description: "Long-term partnerships focused on measurable business impact.",
  },
];

const stats = [
  { value: 200, suffix: "+", label: "Global Deployments" },
  { value: 50, suffix: "+", label: "Team Members" },
  { value: 99.99, suffix: "%", label: "Uptime SLA" },
  { value: 15, suffix: "ms", label: "Avg Latency" },
];

const timeline = [
  {
    level: "Level 1",
    timeLabel: "μs / ms to generate",
    title: "Data Source",
    description:
      "Field devices — PLCs, Sensors, RTUs, Flow Computers, Rectifiers, Panels, VFDs, and Smart Meters — generate raw operational data at microsecond to millisecond resolution.",
    tags: ["PLCs", "Sensors", "RTUs", "Flow Computers", "VFDs", "Smart Meters"],
    status: "completed",
  },
  {
    level: "Level 2",
    timeLabel: "Seconds to acquire",
    title: "Data Acquisition",
    description:
      "Industrial acquisition layer — SCADA, DCS, HMI, GPRS/GSM, Gateways, Historian, Data Logger, and W! Controller — captures and consolidates field data within seconds.",
    tags: ["SCADA", "DCS", "HMI", "Gateways", "Historian", "Data Logger"],
    status: "completed",
  },
  {
    level: "Level 3",
    timeLabel: "Minutes to process",
    title: "IoT Platform",
    description:
      "Cloud-connected IoT backbone handling OT-IT Integration, Connectivity, Web-Server, Database, Cloud (Azure / GCP / AWS), Cyber-Security, DMZ, and Authentication.",
    tags: ["OT-IT Integration", "Cloud", "Cyber-Security", "DMZ", "Authentication"],
    status: "completed",
  },
  {
    level: "Level 4",
    timeLabel: "Days / Months to analyze",
    title: "Enterprise Application",
    description:
      "Full enterprise layer delivering Dashboards, Authentication Levels, Assets Mapping / GIS, Insights & Analytics, Notifications & Alerts, Customized Reports, ERP & SAP Connectivity, and Billing Center.",
    tags: ["Dashboards", "GIS", "Analytics", "ERP / SAP", "Billing Center"],
    status: "current",  // ← we are here
  },
  {
    level: "Level 5",
    timeLabel: "Quarters / Years to learn",
    title: "AI / ML Intelligence",
    description:
      "The final frontier — Predictive Analytics, Predictive Insights, Digital Twins, Artificial Intelligence, Machine Learning, and Deep Learning transforming industrial operations.",
    tags: ["Predictive Analytics", "Digital Twins", "AI", "ML", "Deep Learning"],
    status: "upcoming",
  },
];
const team = [
  { initials: "RD", name: "Ravi Dondeti", role: "Founder / CEO", bio: "Leading Altrex's vision for industrial intelligence platforms." },
  { initials: "DK", name: "Daniel Kim", role: "CTO", bio: "Architecting scalable realtime industrial infrastructure." },
  { initials: "EC", name: "Emily Carter", role: "Head of Product", bio: "Designing powerful industrial workflows and experiences." },
  { initials: "SP", name: "Sarah Patel", role: "Head of Customer Success", bio: "Helping industries modernise operations with confidence." },
];

const principles = [
  { number: "01", title: "Transparency", description: "Open, honest communication with every client at every stage." },
  { number: "02", title: "Reliability", description: "99.99% uptime backed by redundant global infrastructure." },
  { number: "03", title: "Innovation", description: "Continuous R&D investment in AI, ML, and edge computing." },
  { number: "04", title: "Security", description: "Enterprise-grade encryption and SOC 2 compliant practices." },
  { number: "05", title: "Speed", description: "Sub-15ms response times across all platform services." },
  { number: "06", title: "Partnership", description: "Long-term relationships, not one-time transactions." },
];

/* ─── Section: Hero ──────────────────────────────────────────────────────── */

function HeroSection() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      ref={ref}
      className="relative flex min-h-[60vh] sm:min-h-[75vh] items-center overflow-hidden bg-transparent pt-20 sm:pt-32 pb-16 sm:pb-24"
    >
      {/* Animated glow blobs — same pattern as HeroSection.tsx */}
      <div className="bg-grid absolute inset-0 -z-20 opacity-[0.35]" />
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -left-24 top-24 h-[520px] w-[520px] rounded-full bg-violet-500/10 blur-3xl" />
        <div className="absolute -right-24 bottom-0 h-[520px] w-[520px] rounded-full bg-fuchsia-500/10 blur-3xl" />
      </div>

      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="mx-auto max-w-4xl text-center"
        >
          {/* Badge */}
          <motion.div variants={fadeUpVariants}>
            <Badge variant="secondary" className="border-black/[0.08] bg-[var(--bg-surface)] shadow-sm">
              <div className="flex h-4 w-4 items-center justify-center rounded-full bg-[var(--data-green)]">
                <span className="h-1.5 w-1.5 rounded-full bg-white animate-pulse" />
              </div>
              <span className="font-mono text-xs sm:text-sm text-[var(--text-primary)]">
                <InViewDecryptedText
                  text="OUR STORY"
                  speed={60}
                  maxIterations={12}
                  className="text-[var(--text-primary)]"
                  encryptedClassName="text-[var(--text-muted)]"
                />
              </span>
            </Badge>
          </motion.div>

          {/* H1 — BlurText animates each word in on mount */}
          <CharReveal
            as="h1"
            lines={["WE ARE BUILDING THE", "FUTURE OF INDUSTRIAL", "INTELLIGENCE"]}
            className="mx-auto max-w-4xl text-2xl font-bold tracking-[-0.04em] text-[var(--text-primary)] sm:text-5xl lg:text-6xl xl:text-7xl mt-8 sm:mt-24 leading-tight sm:leading-[0.95]"
            immediate
            delay={0}
            stagger={0.028}
            lineGap="mt-2 sm:mt-2"
          />

          {/* Subtitle */}
          <motion.p
            variants={fadeUpVariants}
            className="mx-auto mt-6 max-w-3xl text-base leading-relaxed text-[var(--text-secondary)] sm:mt-8 sm:text-xl sm:leading-8"
          >
            Altrex builds scalable industrial IoT infrastructure powering realtime
            SCADA systems, AI-driven analytics, asset intelligence, and industrial
            automation platforms globally.
          </motion.p>

          {/* Stat chips */}
          <motion.div
            variants={fadeUpVariants}
            className="mt-10 flex flex-wrap items-center justify-center gap-2.5 sm:mt-12 sm:gap-4"
          >
            {[
              { icon: Building2, label: "Founded 2021" },
              { icon: MapPin, label: "Ahmedabad, India" },
              { icon: Globe, label: "200+ Global Deployments" },
            ].map(({ icon: Icon, label }) => (
              <div
                key={label}
                className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-[var(--bg-surface)]/60 px-3 py-1.5 sm:gap-2 sm:px-5 sm:py-2.5 shadow-sm"
              >
                <Icon className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-[var(--accent-violet)]" />
                <span className="text-[11px] font-medium text-[var(--text-primary)] sm:text-sm">{label}</span>
              </div>
            ))}
          </motion.div>

          <motion.div variants={fadeUpVariants} className="mx-auto mt-12 max-w-3xl sm:mt-14">
            <SystemDataTicker
              items={[
                "ABOUT: ONLINE",
                "FOUNDED: 2021",
                "DEPLOYMENTS: 200+",
                "UPTIME: 99.99%",
                "LATENCY: 15ms",
                "REGIONS: GLOBAL",
              ]}
            />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

/* ─── Section: Mission ───────────────────────────────────────────────────── */

function MissionSection() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section ref={ref} className="relative overflow-hidden bg-transparent py-24">
      <div className="pointer-events-none absolute inset-0 -z-10 opacity-40">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "radial-gradient(circle, rgba(139,92,246,0.14) 1px, transparent 1px)",
            backgroundSize: "34px 34px",
          }}
        />
      </div>

      <div className="mx-auto grid max-w-7xl gap-16 px-6 lg:grid-cols-2 lg:px-8">

        {/* LEFT — pull quote with GradientText on the accent word */}
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
        >
          <Badge
            variant="secondary"
            className="border border-white/10 bg-[var(--bg-surface)]/50 p-4 text-sm font-medium text-[var(--data-green)]"
          >
            <span className="h-2 w-2 rounded-full bg-[var(--data-green)] inline-block mr-2" />
            <InViewDecryptedText
              text="MISSION"
              speed={60}
              maxIterations={12}
              className="text-[var(--data-green)]"
              encryptedClassName="text-[var(--text-muted)]"
            />
          </Badge>

          <h2 className="mt-6 text-4xl font-bold tracking-tight text-[var(--text-primary)] sm:text-5xl">
            Empowering industries through{" "}
            {/* GradientText gives the key phrase an animated colour sweep */}
            <span
              className="inline-block text-4xl font-bold sm:text-5xl text-[var(--accent-violet)]"
            >
              realtime intelligence
            </span>
          </h2>

          <p className="mt-8 text-lg leading-8 text-[var(--text-secondary)]">
            We believe industrial operations should be intelligent, connected,
            secure, and data-driven. Our mission is to simplify industrial
            digital transformation through scalable realtime infrastructure and
            modern industrial software.
          </p>
        </motion.div>

        {/* RIGHT — staggered value cards */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="grid gap-6"
        >
          {values.map((item, i) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={i}
                variants={cardVariants}
                whileHover={{ y: -4, boxShadow: "0 20px 40px -12px rgba(124,58,237,0.12)" }}
                className="rounded-3xl border border-white/10 bg-[var(--bg-surface)]/75 p-8 shadow-sm transition-all duration-300 hover:border-white/20 hover:shadow-[0_20px_40px_-15px_rgba(139,92,246,0.14)]"
              >
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[var(--accent-violet)]/15 text-[var(--accent-violet)] shadow-lg">
                  <Icon className="h-6 w-6" />
                </div>
                <h3 className="mt-6 text-xl font-semibold text-[var(--text-primary)]">{item.title}</h3>
                <p className="mt-3 text-[var(--text-secondary)]">{item.description}</p>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}

/* ─── Section: Stats Bar ─────────────────────────────────────────────────── */

function StatsSection() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <section ref={ref} className="relative bg-transparent py-16">
      <div className="pointer-events-none absolute inset-0 -z-10 opacity-25">
        <div className="absolute inset-0 bg-gradient-to-b from-violet-500/10 via-transparent to-cyan-500/10" />
      </div>

      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="grid grid-cols-2 divide-x divide-y divide-white/5 rounded-3xl border border-white/10 bg-[var(--bg-surface)]/65 shadow-sm md:grid-cols-4 md:divide-y-0"
        >
          {stats.map((stat, i) => (
            <div key={i} className="flex flex-col items-center justify-center px-8 py-12">
              <div className="text-4xl font-bold text-[var(--text-primary)]">
                <ScrambleCounter
                  target={Math.max(1, Math.floor(stat.value))}
                  finalText={`${stat.value}${stat.suffix}`}
                  intervalMs={30}
                  totalFrames={40}
                />
              </div>
              <p className="mt-2 text-center text-sm text-[var(--text-secondary)]">{stat.label}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

/* ─── Section: Timeline ──────────────────────────────────────────────────── */

function TimelineSection() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section ref={ref} className="relative bg-transparent py-24">
      <div className="pointer-events-none absolute inset-0 -z-10 opacity-35">
        <div className="absolute inset-0 bg-gradient-to-b from-fuchsia-500/10 via-transparent to-violet-500/10" />
      </div>

      <div className="mx-auto max-w-6xl px-6 lg:px-8">
        {/* Header */}
        <div className="text-center">
          <Badge
            variant="secondary"
            className="border border-white/10 bg-[var(--bg-surface)]/50 p-4 text-sm font-medium text-[var(--data-green)]"
          >
            <span className="h-2 w-2 rounded-full bg-[var(--data-green)] inline-block mr-2" />
            <InViewDecryptedText
              text="OUR MODEL"
              speed={60}
              maxIterations={12}
              className="text-[var(--data-green)]"
              encryptedClassName="text-[var(--text-muted)]"
            />
          </Badge>
          <h2 className="mt-6 text-4xl font-bold tracking-tight text-[var(--text-primary)] sm:text-5xl">
            Digital maturity model
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-[var(--text-secondary)]">
            Five levels of industrial intelligence — from raw field data to
            AI-driven predictive operations. Currently operating at{" "}
            <span className="font-semibold text-[var(--accent-violet)]">Level 4</span>.
          </p>
        </div>

        {/* Timeline */}
        <div className="relative mt-20">
          {/* Central gradient line */}
          <div className="absolute left-4 top-0 h-full w-0.5 bg-gradient-to-b from-violet-500 via-green-500/35 to-black/10 md:left-1/2 md:-translate-x-px" />

          {timeline.map((item, i) => {
            const isLeft = i % 2 === 0;
            const isCurrent = item.status === "current";
            const isUpcoming = item.status === "upcoming";

            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: isLeft ? -40 : 40 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.6, delay: i * 0.15, ease: [0.22, 1, 0.36, 1] }}
                className={`relative mb-16 flex w-full md:items-center ${isLeft ? "md:justify-start" : "md:justify-end"
                  }`}
              >
                {/* Timeline dot — pulsing ring on current level */}
                <div
                  className={`absolute left-4 top-6 h-3 w-3 -translate-x-1/2 rounded-full md:left-1/2 ${isCurrent
                    ? "bg-[var(--data-green)] shadow-[0_0_0_6px_rgba(74,222,128,0.18)] animate-pulse"
                    : isUpcoming
                      ? "bg-white/20 shadow-[0_0_0_4px_rgba(255,255,255,0.06)]"
                      : "bg-gradient-to-br from-violet-500 to-orange-400/35 shadow-[0_0_0_6px_rgba(139,92,246,0.12)]"
                    }`}
                />

                {/* Card */}
                <div
                  className={`ml-12 max-w-sm rounded-3xl border p-8 shadow-sm transition-all duration-300 md:ml-0 ${isCurrent
                    ? "border-[var(--data-green)]/40 bg-[var(--bg-surface)]/90 shadow-[0_0_40px_-10px_rgba(74,222,128,0.15)]"
                    : isUpcoming
                      ? "border-white/5 bg-[var(--bg-surface)]/40 opacity-60"
                      : "border-white/10 bg-[var(--bg-surface)]/75 hover:border-white/20 hover:shadow-[0_20px_40px_-15px_rgba(139,92,246,0.14)]"
                    }`}
                >
                  {/* Level pill */}
                  <div className="flex items-center gap-3">
                    <div
                      className={`inline-flex overflow-hidden rounded-full px-4 py-1.5 ${isCurrent
                        ? "bg-[var(--data-green)]/20 border border-[var(--data-green)]/40"
                        : isUpcoming ? "bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10"
                          : "bg-violet-500"
                        }`}
                    >
                      <DecryptedText
                        text={item.level}
                        animateOn="view"
                        speed={60}
                        sequential
                        revealDirection="start"
                        className={`text-sm font-bold ${isCurrent
                          ? "text-[var(--data-green)]"
                          : isUpcoming ? "text-[var(--text-muted)]"
                            : "text-white"
                          }`}
                        encryptedClassName={`text-sm font-bold ${isCurrent ? "text-[var(--data-green)]/50" : "text-violet-300"
                          }`}
                      />
                    </div>

                    {/* Status badge */}
                    {isCurrent && (
                      <span className="inline-flex items-center gap-1.5 rounded-full border border-[var(--data-green)]/30 bg-[var(--data-green)]/10 px-3 py-1 text-xs font-medium text-[var(--data-green)]">
                        <span className="h-1.5 w-1.5 rounded-full bg-[var(--data-green)] animate-pulse" />
                        Current
                      </span>
                    )}
                    {isUpcoming && (
                      <span className="inline-flex items-center gap-1.5 rounded-full border border-black/10 dark:border-white/10 bg-black/5 dark:bg-white/5 px-3 py-1 text-xs font-medium text-[var(--text-muted)]">
                        Upcoming
                      </span>
                    )}
                  </div>

                  {/* Time label */}
                  <p className={`mt-3 text-xs font-mono tracking-widest uppercase ${isCurrent ? "text-[var(--data-green)]/70" : "text-[var(--text-muted)]"
                    }`}>
                    {item.timeLabel}
                  </p>

                  <h3 className="mt-3 text-xl font-semibold text-[var(--text-primary)]">
                    {item.title}
                  </h3>
                  <p className="mt-3 leading-7 text-[var(--text-secondary)] text-sm">
                    {item.description}
                  </p>

                  {/* Tags */}
                  <div className="mt-5 flex flex-wrap gap-2">
                    {item.tags.map((tag) => (
                      <span
                        key={tag}
                        className={`rounded-lg border px-2.5 py-1 text-xs font-medium ${isCurrent
                          ? "border-[var(--data-green)]/20 bg-[var(--data-green)]/8 text-[var(--data-green)]/80"
                          : isUpcoming ? "border-black/8 dark:border-white/5 bg-black/5 dark:bg-white/5 text-[var(--text-muted)] opacity-60"
                            : "border-black/8 bg-black/3 text-[var(--text-muted)]"
                          }`}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
/* ─── Section: Team ──────────────────────────────────────────────────────── */

function TeamSection() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const tilt = useMagneticTilt({ maxRotate: 10, perspective: 900 });

  return (
    <section ref={ref} className="relative overflow-hidden bg-transparent py-24">
      <div className="pointer-events-none absolute inset-0 -z-10 opacity-40">
        <div className="absolute inset-0 bg-gradient-to-b from-violet-500/10 via-transparent to-fuchsia-500/10" />
      </div>

      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="text-center">
          <Badge
            variant="secondary"
            className="border border-white/10 bg-[var(--bg-surface)]/50 p-4 text-sm font-medium ]"
          >
            <span className="h-2 w-2 rounded-full bg-[var(--data-green)] inline-block mr-2" />
            <InViewDecryptedText
              text="THE TEAM"
              speed={60}
              maxIterations={12}
              className="text-[var(--data-green)]"
              encryptedClassName="text-[var(--text-muted)]"
            />
          </Badge>
          <h2 className="mt-6 text-4xl font-bold tracking-tight text-[var(--text-primary)] sm:text-5xl">
            People behind the platform
          </h2>
        </div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="mt-16 grid gap-6 md:grid-cols-2 lg:grid-cols-4"
        >
          {team.map((member, i) => (
            <motion.div
              key={i}
              variants={cardVariants}
              onMouseMove={tilt.onMouseMove}
              onMouseLeave={tilt.onMouseLeave}
              whileHover={{ y: -4 }}
              transition={{ duration: 0.25 }}
              style={{ transformStyle: "preserve-3d" }}
              className="rounded-3xl border border-white/10 bg-[var(--bg-surface)]/75 p-8 shadow-sm transition-all duration-300 hover:border-white/20 hover:shadow-[0_20px_40px_-15px_rgba(139,92,246,0.14)]"
            >
              {/* Gradient avatar with initials */}
              <div className="flex h-20 w-20 items-center justify-center rounded-full bg-violet-500 text-2xl font-bold text-white shadow-lg">
                {member.initials}
              </div>

              <h3 className="mt-6 text-xl font-semibold text-[var(--text-primary)]">{member.name}</h3>
              <p className="mt-1 text-sm font-medium text-[var(--accent-violet)]">{member.role}</p>
              <p className="mt-4 text-sm leading-7 text-[var(--text-secondary)]">{member.bio}</p>

              <Button size="icon" variant="ghost" aria-label={`LinkedIn ${member.name}`}>
                <FaLinkedinIn className="h-4 w-4" />
              </Button>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

/* ─── Section: Values ────────────────────────────────────────────────────── */

// StarBorder renders a dark card by default — we override the inner content
// with our own white card and pass `as="div"` so it doesn't render as a button.
function ValuesSection() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section ref={ref} className="relative bg-transparent py-24">
      <div className="pointer-events-none absolute inset-0 -z-10 opacity-35">
        <div className="absolute inset-0 bg-gradient-to-b from-cyan-500/10 via-transparent to-violet-500/10" />
      </div>

      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="text-center">
          <Badge
            variant="secondary"
            className="border border-white/10 bg-[var(--bg-surface)]/50 p-4 text-sm font-medium text-[var(--data-green)]"
          >
            <span className="h-2 w-2 rounded-full bg-[var(--data-green)] inline-block mr-2" />
            <InViewDecryptedText
              text="WHAT DRIVES US"
              speed={60}
              maxIterations={12}
              className="text-[var(--data-green)]"
              encryptedClassName="text-[var(--text-muted)]"
            />
          </Badge>
          <h2 className="mt-6 text-4xl font-bold tracking-tight text-[var(--text-primary)] sm:text-5xl">
            Built on principles that matter
          </h2>
        </div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="mt-16 grid gap-6 md:grid-cols-2 xl:grid-cols-3"
        >
          {principles.map((item, i) => (
            <motion.div key={i} variants={cardVariants}>
              {/*
                StarBorder wraps the card with an animated glowing star that
                sweeps around the border. `as="div"` prevents it rendering a <button>.
                `color` matches our violet accent. `speed` slows it for elegance.
                We override the inner div styling via className on StarBorder,
                then put our actual card content inside.
              */}
              <StarBorder
                as="div"
                color="#ff6b00"
                speed="8s"
                thickness={1}
                className="w-full cursor-default"
                innerClassName="border border-white/10 bg-[var(--bg-surface)]/75 p-6 rounded-[18px]"
              >
                <div className="">
                  <div className="bg-violet-500 bg-clip-text text-6xl font-bold text-transparent">
                    {item.number}
                  </div>
                  <h3 className="mt-4 text-xl font-semibold text-[var(--text-primary)]">{item.title}</h3>
                  <p className="mt-3 leading-7 text-[var(--text-secondary)]">{item.description}</p>
                </div>
              </StarBorder>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

/* ─── Section: CTA ───────────────────────────────────────────────────────── */

const CTA = () => {
  return (
    <section className="relative overflow-hidden bg-transparent py-32 mx-auto max-w-7xl px-6 pt-16 pb-0 lg:px-8">
      <style>{`
        @keyframes cta-bg {
          0%   { background-position: 0% 50%; }
          50%  { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }

        .cta-gradient {
          background: linear-gradient(
            135deg,
            #7c2d12 0%,
            #ea580c 25%,
            #ff6b00 50%,
            #ea580c 75%,
            #431407 100%
          );

          background-size: 300% 300%;

          animation: cta-bg 8s ease infinite;
        }

        .headline-glow {
          text-shadow:
            0 0 60px rgba(196,181,253,0.4),
            0 0 120px rgba(196,181,253,0.15);
        }
      `}</style>

      <div className="relative mb-14 overflow-hidden rounded-4xl border px-10 py-9 text-[var(--text-primary)] shadow-sm">
        <div className="flex flex-wrap items-center justify-between gap-6">
          <div>
            <h2 className="font-bold text-4xl text-[var(--text-primary)] leading-snug">
              Ready to transform your operations{" "}
            </h2>
            <p className="mt-1.5 text-lg text-[var(--text-secondary)] max-w-xl leading-relaxed">
              Build smarter industrial systems with realtime intelligence, AI-driven analytics, and scalable infrastructure.
            </p>
          </div>
          <div className="flex gap-2.5">
            <Button className="gap-2 bg-violet-500 text-white border-none">
                <Contact className="h-3.5 w-3.5" /> Contact Us
              </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

/* ─── Page ───────────────────────────────────────────────────────────────── */

const About = () => {
  return (
    <div className="overflow-hidden bg-[var(--bg-void)]">
      <HeroSection />
      <MissionSection />
      <StatsSection />
      <TimelineSection />
      <TeamSection />
      <ValuesSection />
      <CTA />
    </div>
  );
};

export default About;
