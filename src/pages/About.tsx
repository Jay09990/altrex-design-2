import { useRef } from "react";

import {
  Building2,
  MapPin,
  Globe,
  ShieldCheck,
  Sparkles,
  Users,
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
import BlurText from "@/components/BlurText";
import DecryptedText from "@/components/DecryptedText";
import ShinyText from "@/components/ShinyText";
import ClickSpark from "@/components/ClickSpark";
import StarBorder from "@/components/StarBorder";
import GradientText from "@/components/GradientText";
import InViewDecryptedText from "@/components/InViewDecryptedText";
import ScrambleCounter from "@/components/ScrambleCounter";
import SystemDataTicker from "@/components/SystemDataTicker";
import { useMagneticTilt } from "@/hooks/useMagneticTilt";

/* ─── Shared Variants ────────────────────────────────────────────────────── */

const fadeUpVariants: Variants = {
  hidden:  { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.65 } },
};

const containerVariants: Variants = {
  hidden:  {},
  visible: { transition: { staggerChildren: 0.12 } },
};

const cardVariants: Variants = {
  hidden:  { opacity: 0, y: 24 },
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
  { value: 200,   suffix: "+", label: "Global Deployments" },
  { value: 50,    suffix: "+", label: "Team Members" },
  { value: 99.99, suffix: "%", label: "Uptime SLA" },
  { value: 15,    suffix: "ms", label: "Avg Latency" },
];

const timeline = [
  { year: "2021", title: "Company founded in Ahmedabad", description: "Started building scalable industrial intelligence infrastructure." },
  { year: "2022", title: "First industrial SCADA deployment", description: "Delivered enterprise-grade monitoring for Oil & Gas operations." },
  { year: "2023", title: "IoT platform launched, 50+ clients", description: "Expanded into realtime IoT and asset monitoring infrastructure." },
  { year: "2024", title: "AI/ML analytics module added", description: "Introduced predictive analytics and industrial AI workflows." },
  { year: "2025", title: "Global expansion, 200+ deployments", description: "Scaled infrastructure across multiple regions and industries." },
];

const team = [
  { initials: "RA", name: "Raj Aghera",    role: "Founder / CEO",           bio: "Leading Altrex's vision for industrial intelligence platforms." },
  { initials: "DK", name: "Daniel Kim",    role: "CTO",                     bio: "Architecting scalable realtime industrial infrastructure." },
  { initials: "EC", name: "Emily Carter",  role: "Head of Product",         bio: "Designing powerful industrial workflows and experiences." },
  { initials: "SP", name: "Sarah Patel",   role: "Head of Customer Success", bio: "Helping industries modernise operations with confidence." },
];

const principles = [
  { number: "01", title: "Transparency",  description: "Open, honest communication with every client at every stage." },
  { number: "02", title: "Reliability",   description: "99.99% uptime backed by redundant global infrastructure." },
  { number: "03", title: "Innovation",    description: "Continuous R&D investment in AI, ML, and edge computing." },
  { number: "04", title: "Security",      description: "Enterprise-grade encryption and SOC 2 compliant practices." },
  { number: "05", title: "Speed",         description: "Sub-15ms response times across all platform services." },
  { number: "06", title: "Partnership",   description: "Long-term relationships, not one-time transactions." },
];

/* ─── Section: Hero ──────────────────────────────────────────────────────── */

function HeroSection() {
  const ref     = useRef<HTMLElement>(null);
  const inView  = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      ref={ref}
      className="relative flex min-h-[75vh] items-center overflow-hidden bg-transparent pt-28 pb-20"
    >
      {/* Animated glow blobs — same pattern as HeroSection.tsx */}
      <div className="bg-grid absolute inset-0 -z-20 opacity-[0.35]" />
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -left-24 top-24 h-[520px] w-[520px] rounded-full bg-violet-500/10 blur-3xl" />
        <div className="absolute -right-24 bottom-0 h-[520px] w-[520px] rounded-full bg-fuchsia-500/10 blur-3xl" />
      </div>

      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="mx-auto max-w-4xl text-center"
        >
          {/* Badge */}
          <motion.div variants={fadeUpVariants}>
            <Badge
              variant="secondary"
              className="border border-white/10 bg-[var(--bg-surface)]/50 p-4 text-sm font-medium text-[var(--data-green)]"
            >
              <span className="h-2 w-2 rounded-full bg-[var(--data-green)] inline-block mr-2" />
              <InViewDecryptedText
                text="OUR STORY"
                speed={60}
                maxIterations={12}
                className="text-[var(--data-green)]"
                encryptedClassName="text-[var(--text-muted)]"
              />
            </Badge>
          </motion.div>

          {/* H1 — BlurText animates each word in on mount */}
          <motion.div variants={fadeUpVariants} className="mt-8">
            <BlurText
              text="We are building the future of Industrial Intelligence"
              animateBy="words"
              delay={80}
              direction="top"
              className="text-5xl font-bold tracking-tight text-[var(--text-primary)] sm:text-6xl lg:text-7xl"
            />
          </motion.div>

          {/* Subtitle */}
          <motion.p
            variants={fadeUpVariants}
            className="mx-auto mt-8 max-w-3xl text-lg leading-8 text-[var(--text-secondary)] sm:text-xl"
          >
            Altrex builds scalable industrial IoT infrastructure powering realtime
            SCADA systems, AI-driven analytics, asset intelligence, and industrial
            automation platforms globally.
          </motion.p>

          {/* Stat chips */}
          <motion.div
            variants={fadeUpVariants}
            className="mt-12 flex flex-wrap items-center justify-center gap-4"
          >
            {[
              { icon: Building2, label: "Founded 2021" },
              { icon: MapPin,    label: "Ahmedabad, India" },
              { icon: Globe,     label: "200+ Global Deployments" },
            ].map(({ icon: Icon, label }) => (
              <div
                key={label}
                className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-[var(--bg-surface)]/60 px-5 py-2.5 shadow-sm"
              >
                <Icon className="h-4 w-4 text-[var(--accent-violet)]" />
                <span className="text-sm font-medium text-[var(--text-primary)]">{label}</span>
              </div>
            ))}
          </motion.div>

          <motion.div variants={fadeUpVariants} className="mx-auto mt-14 max-w-3xl">
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
  const ref    = useRef<HTMLElement>(null);
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
            <GradientText
              colors={["#ff6b00", "#ffa05e", "#ff6b00"]}
              animationSpeed={6}
              className="inline-block text-4xl font-bold sm:text-5xl"
            >
              realtime intelligence
            </GradientText>
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
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-violet-600 to-fuchsia-500 text-white shadow-lg">
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
  const ref    = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section ref={ref} className="relative bg-transparent py-24">
      <div className="pointer-events-none absolute inset-0 -z-10 opacity-35">
        <div className="absolute inset-0 bg-gradient-to-b from-fuchsia-500/10 via-transparent to-violet-500/10" />
      </div>

      <div className="mx-auto max-w-6xl px-6 lg:px-8">
        <div className="text-center">
          <Badge
            variant="secondary"
            className="border border-white/10 bg-[var(--bg-surface)]/50 p-4 text-sm font-medium text-[var(--data-green)]"
          >
            <span className="h-2 w-2 rounded-full bg-[var(--data-green)] inline-block mr-2" />
            <InViewDecryptedText
              text="OUR JOURNEY"
              speed={60}
              maxIterations={12}
              className="text-[var(--data-green)]"
              encryptedClassName="text-[var(--text-muted)]"
            />
          </Badge>
          <h2 className="mt-6 text-4xl font-bold tracking-tight text-[var(--text-primary)] sm:text-5xl">
            From idea to global platform
          </h2>
        </div>

        <div className="relative mt-20">
          {/* Central gradient line */}
          <div className="absolute left-4 top-0 h-full w-0.5 bg-gradient-to-b from-violet-400/40 via-fuchsia-400/35 to-cyan-400/35 md:left-1/2 md:-translate-x-px" />

          {timeline.map((item, i) => {
            const isLeft = i % 2 === 0;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: isLeft ? -40 : 40 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.6, delay: i * 0.15, ease: [0.22, 1, 0.36, 1] }}
                className={`relative mb-16 flex w-full md:items-center ${
                  isLeft ? "md:justify-start" : "md:justify-end"
                }`}
              >
                {/* Timeline dot */}
                <div className="absolute left-4 top-6 h-3 w-3 -translate-x-1/2 rounded-full bg-gradient-to-br from-violet-600 to-fuchsia-500 shadow-[0_0_0_6px_rgba(139,92,246,0.12)] md:left-1/2" />

                {/* Card */}
                <div className="ml-12 max-w-sm rounded-3xl border border-white/10 bg-[var(--bg-surface)]/75 p-8 shadow-sm md:ml-0">
                  {/* Year — DecryptedText scrambles then resolves when in view */}
                  <div className="inline-flex overflow-hidden rounded-full bg-violet-600/80 px-4 py-1.5">
                    <DecryptedText
                      text={item.year}
                      animateOn="view"
                      speed={60}
                      sequential
                      revealDirection="start"
                      className="text-sm font-bold text-white"
                      encryptedClassName="text-sm font-bold text-violet-300"
                    />
                  </div>
                  <h3 className="mt-5 text-xl font-semibold text-[var(--text-primary)]">{item.title}</h3>
                  <p className="mt-3 leading-7 text-[var(--text-secondary)]">{item.description}</p>
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
  const ref    = useRef<HTMLElement>(null);
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
            className="border border-white/10 bg-[var(--bg-surface)]/50 p-4 text-sm font-medium text-[var(--data-green)]"
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
              <div className="flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-violet-500 to-fuchsia-500 text-2xl font-bold text-white shadow-lg">
                {member.initials}
              </div>

              <h3 className="mt-6 text-xl font-semibold text-[var(--text-primary)]">{member.name}</h3>
              <p className="mt-1 text-sm font-medium text-[var(--accent-violet)]">{member.role}</p>
              <p className="mt-4 text-sm leading-7 text-[var(--text-secondary)]">{member.bio}</p>

              <button className="mt-6 inline-flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 text-[var(--text-muted)] transition-colors hover:border-violet-400/30 hover:text-violet-200">
                <FaLinkedinIn className="h-4 w-4" />
              </button>
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
  const ref    = useRef<HTMLElement>(null);
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
                  <div className="bg-gradient-to-r from-violet-600 to-fuchsia-500 bg-clip-text text-6xl font-bold text-transparent">
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

function CTASection() {
  const ref    = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section ref={ref} className="bg-transparent py-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-violet-600/70 to-fuchsia-600/60 px-8 py-20 text-center shadow-2xl lg:px-20"
        >
          {/* ShinyText sweeps a metallic shine across the heading */}
          <h2 className="relative z-10 text-4xl font-bold tracking-tight sm:text-5xl">
            <ShinyText
              text="Ready to transform your operations?"
              speed={3}
              color="#ffffff"
              shineColor="#ffffffcc"
              spread={100}
              className="text-4xl font-bold sm:text-5xl"
            />
          </h2>

          <p className="relative z-10 mx-auto mt-6 max-w-2xl text-lg text-white/70">
            Build smarter industrial systems with realtime intelligence,
            AI-driven analytics, and scalable infrastructure.
          </p>

          {/*
            ClickSpark wraps both buttons inside a shared canvas.
            Each click anywhere in the div fires particle sparks at the cursor.
          */}
          <div className="relative z-10 mt-10">
            <ClickSpark sparkCount={8}>
              <div className="flex flex-wrap items-center justify-center gap-4 py-4">
                <Button className="h-12 rounded-2xl bg-white px-8 text-violet-700 hover:bg-violet-50">
                  Get Started
                </Button>
                <Button
                  variant="outline"
                  className="h-12 rounded-2xl border-white/30 bg-transparent px-8 text-white hover:bg-white/10"
                >
                  Talk to Sales
                </Button>
              </div>
            </ClickSpark>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

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
      <CTASection />
    </div>
  );
};

export default About;
