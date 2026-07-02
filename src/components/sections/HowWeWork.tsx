import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence, useInView, type Variants } from "framer-motion";
import {
  Search,
  PenTool,
  Code2,
  Rocket,
  LifeBuoy,
} from "lucide-react";

import { SectionBadge } from "../ui/section-badge";

// ─────────────────────────────────────────────────────────────────────────────
// Data
// ─────────────────────────────────────────────────────────────────────────────

const steps = [
  {
    icon: Search,
    number: "01",
    title: "Discover",
    description: "Understand business requirements, objectives, and challenges.",
    accent: "#3b82f6",
  },
  {
    icon: PenTool,
    number: "02",
    title: "Design",
    description: "Create the solution architecture and implementation plan.",
    accent: "#8b5cf6",
  },
  {
    icon: Code2,
    number: "03",
    title: "Implement",
    description: "Develop, integrate, and configure the solution.",
    accent: "#f97316",
  },
  {
    icon: Rocket,
    number: "04",
    title: "Deploy",
    description: "Perform testing, commissioning, and production deployment.",
    accent: "#10b981",
  },
  {
    icon: LifeBuoy,
    number: "05",
    title: "Support",
    description: "Provide managed services, monitoring, maintenance, and continuous optimization.",
    accent: "#06b6d4",
  },
];

// Node coordinates on a 1200×300 viewBox — an S-shaped wave.
const NODE_COORDS = [
  { x: 100, y: 70 },
  { x: 325, y: 230 },
  { x: 550, y: 70 },
  { x: 775, y: 230 },
  { x: 1000, y: 70 },
];

const WAVE_PATH =
  "M100,70 C212,70 212,230 325,230 " +
  "C438,230 438,70 550,70 " +
  "C662,70 662,230 775,230 " +
  "C888,230 888,70 1000,70";

const VB_W = 1200;
const VB_H = 300;

// ─────────────────────────────────────────────────────────────────────────────
// Animation
// ─────────────────────────────────────────────────────────────────────────────

const containerVariants: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};

const fadeUpVariants: Variants = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

// ─────────────────────────────────────────────────────────────────────────────
// Desktop wave flow
// ─────────────────────────────────────────────────────────────────────────────

function WaveFlow() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const wrapRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(wrapRef, { once: true, amount: 0.3 });

  // Auto-advance
  useEffect(() => {
    if (paused) return;
    const id = setInterval(() => {
      setActive((prev) => (prev + 1) % steps.length);
    }, 3200);
    return () => clearInterval(id);
  }, [paused]);

  const activeStep = steps[active];

  return (
    <div ref={wrapRef} className="mt-16">
      {/* Wave path + nodes */}
      <div
        className="relative w-full"
        style={{ aspectRatio: `${VB_W} / ${VB_H}` }}
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
      >
        <svg
          viewBox={`0 0 ${VB_W} ${VB_H}`}
          className="absolute inset-0 h-full w-full overflow-visible"
          fill="none"
        >
          {/* base track */}
          <path d={WAVE_PATH} stroke="var(--border-border)" strokeWidth="2" />
          {/* animated draw-in */}
          <motion.path
            d={WAVE_PATH}
            stroke={activeStep.accent}
            strokeWidth="2.5"
            strokeLinecap="round"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={isInView ? { pathLength: 1, opacity: 1 } : {}}
            transition={{ duration: 1.6, ease: "easeInOut" }}
          />
        </svg>

        {steps.map((step, i) => {
          const Icon = step.icon;
          const coord = NODE_COORDS[i];
          const left = `${(coord.x / VB_W) * 100}%`;
          const top = `${(coord.y / VB_H) * 100}%`;
          const isActive = active === i;

          return (
            <motion.button
              key={step.title}
              type="button"
              initial={{ opacity: 0, scale: 0.6 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ type: "spring", stiffness: 220, damping: 18, delay: 0.3 + i * 0.15 }}
              onMouseEnter={() => setActive(i)}
              onFocus={() => setActive(i)}
              onClick={() => setActive(i)}
              className="group absolute flex flex-col items-center gap-3 focus:outline-none"
              style={{ left, top, transform: "translate(-50%, -50%)" }}
            >
              {/* glow */}
              <div
                className="absolute h-20 w-20 rounded-full blur-2xl transition-opacity duration-500"
                style={{
                  background: step.accent,
                  opacity: isActive ? 0.35 : 0,
                }}
              />

              {/* node circle */}
              <motion.div
                animate={{
                  scale: isActive ? 1.15 : 1,
                  borderColor: isActive ? step.accent : "var(--border-border)",
                }}
                transition={{ duration: 0.3, ease: "easeOut" }}
                className="relative flex h-16 w-16 items-center justify-center rounded-full border-2 bg-card/80 backdrop-blur-sm shadow-lg sm:h-[72px] sm:w-[72px]"
                style={{
                  boxShadow: isActive
                    ? `0 12px 28px -10px ${step.accent}70`
                    : "0 4px 12px -6px rgba(0,0,0,0.15)",
                }}
              >
                <Icon
                  className="h-6 w-6 transition-colors duration-300 sm:h-7 sm:w-7"
                  strokeWidth={2}
                  style={{ color: isActive ? step.accent : "var(--muted-foreground)" }}
                />
                <span
                  className="absolute -top-2 -right-1 flex h-6 w-6 items-center justify-center rounded-full text-[10px] font-bold text-white shadow-md transition-transform duration-300"
                  style={{
                    background: step.accent,
                    transform: isActive ? "scale(1)" : "scale(0.85)",
                  }}
                >
                  {i + 1}
                </span>
              </motion.div>

              {/* label */}
              <span
                className="text-xs font-bold uppercase tracking-wider transition-colors duration-300 sm:text-sm"
                style={{ color: isActive ? step.accent : "var(--muted-foreground)" }}
              >
                {step.title}
              </span>
            </motion.button>
          );
        })}
      </div>

      {/* Detail panel — glassmorphism, swaps with active step */}
      <div className="relative mt-6 flex justify-center px-4">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeStep.title}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.35, ease: "easeOut" }}
            className="relative w-full max-w-xl overflow-hidden rounded-2xl border border-white/10 bg-card/60 p-7 text-center shadow-[0_20px_50px_-24px_rgba(0,0,0,0.4)] backdrop-blur-xl"
          >
            <div
              className="pointer-events-none absolute inset-0 opacity-[0.08]"
              style={{ background: `radial-gradient(circle at 50% 0%, ${activeStep.accent}, transparent 70%)` }}
            />
            <span
              className="relative font-mono text-xs font-bold tracking-[0.25em]"
              style={{ color: activeStep.accent }}
            >
              STEP {activeStep.number}
            </span>
            <h3 className="relative mt-2 text-2xl font-bold text-foreground">
              {activeStep.title}
            </h3>
            <p className="relative mx-auto mt-3 max-w-md text-[15px] leading-relaxed text-muted-foreground">
              {activeStep.description}
            </p>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Progress dots */}
      <div className="mt-6 flex items-center justify-center gap-2">
        {steps.map((step, i) => (
          <button
            key={step.title}
            type="button"
            onClick={() => setActive(i)}
            aria-label={`Go to ${step.title}`}
            className="h-1.5 rounded-full transition-all duration-300"
            style={{
              width: active === i ? 28 : 8,
              background: active === i ? step.accent : "var(--border-border)",
            }}
          />
        ))}
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Mobile fallback — connected vertical card stack
// ─────────────────────────────────────────────────────────────────────────────

function MobileFlow() {
  return (
    <div className="relative mt-14 flex flex-col gap-6 px-2">
      {/* connecting line */}
      <div className="absolute left-[35px] top-2 bottom-2 w-px bg-gradient-to-b from-blue-400/40 via-orange-400/40 to-cyan-400/40" />

      {steps.map((step, i) => {
        const Icon = step.icon;
        return (
          <motion.div
            key={step.title}
            initial={{ opacity: 0, x: -16 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.5, delay: i * 0.08 }}
            className="relative flex gap-5"
          >
            <div
              className="relative z-10 flex h-[52px] w-[52px] flex-shrink-0 items-center justify-center rounded-full border-2 bg-card shadow-md"
              style={{ borderColor: step.accent }}
            >
              <Icon className="h-5 w-5" style={{ color: step.accent }} strokeWidth={2} />
              <span
                className="absolute -top-1.5 -right-1.5 flex h-5 w-5 items-center justify-center rounded-full text-[9px] font-bold text-white"
                style={{ background: step.accent }}
              >
                {i + 1}
              </span>
            </div>

            <div className="flex-1 rounded-2xl border border-white/10 bg-card/60 p-5 shadow-sm backdrop-blur-sm">
              <span className="font-mono text-[10px] font-bold tracking-widest" style={{ color: step.accent }}>
                STEP {step.number}
              </span>
              <h3 className="mt-1 text-lg font-bold text-foreground">{step.title}</h3>
              <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
                {step.description}
              </p>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Section
// ─────────────────────────────────────────────────────────────────────────────

const HowWeWork = () => {
  return (
    <section className="relative overflow-hidden bg-transparent py-28">
      <div
        className="pointer-events-none absolute inset-0 -z-10 opacity-40"
        style={{
          backgroundImage: "radial-gradient(circle, var(--border-border) 1px, transparent 1px)",
          backgroundSize: "32px 32px",
        }}
      />

      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.15 }}
        className="mx-auto max-w-6xl px-6 lg:px-8"
      >
        {/* Header */}
        <div className="mx-auto max-w-2xl text-center">
          <motion.div variants={fadeUpVariants}>
            <SectionBadge title="Process" dot={true} className="mb-6" />
          </motion.div>

          <motion.h2
            variants={fadeUpVariants}
            className="mt-6 text-4xl font-bold tracking-tight text-foreground sm:text-5xl"
          >
            How We Work
          </motion.h2>

          <motion.p
            variants={fadeUpVariants}
            className="mt-6 text-lg font-semibold leading-8 text-muted-foreground"
          >
            From understanding your business needs to delivering and
            continuously optimizing your solution, we follow a structured
            process to ensure successful project execution.
          </motion.p>
        </div>

        {/* Desktop wave flow */}
        <div className="hidden lg:block">
          <WaveFlow />
        </div>

        {/* Mobile / tablet fallback */}
        <div className="lg:hidden">
          <MobileFlow />
        </div>
      </motion.div>
    </section>
  );
};

export default HowWeWork;