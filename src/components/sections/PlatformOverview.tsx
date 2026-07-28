import { useRef } from "react";
import { motion, useInView, type Variants } from "framer-motion";
import {
  ArrowRight,
  AlertTriangle,
  MapPin,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

// ─────────────────────────────────────────────────────────────────────────────
// Live mini-preview components — one per feature, each a tiny functioning demo
// ─────────────────────────────────────────────────────────────────────────────

// Dashboards — tiny animated bar chart ticking up and down
function DashboardsPreview() {
  const bars = [0.5, 0.8, 0.4, 0.9, 0.6];
  return (
    <div className="flex h-6 items-end gap-[3px]">
      {bars.map((h, i) => (
        <motion.div
          key={i}
          className="w-[3px] rounded-full bg-orange-500"
          animate={{ height: [`${h * 60}%`, `${(1 - h) * 80 + 20}%`, `${h * 60}%`] }}
          transition={{
            duration: 1.8,
            repeat: Infinity,
            ease: "easeInOut",
            delay: i * 0.15,
          }}
          style={{ height: `${h * 60}%` }}
        />
      ))}
    </div>
  );
}

// GIS Mapping — pulsing location pin on a mini grid
function GISPreview() {
  return (
    <div className="relative h-6 w-9 overflow-hidden rounded-sm">
      <svg className="absolute inset-0 h-full w-full opacity-25">
        <defs>
          <pattern id="gis-mini-grid" width="6" height="6" patternUnits="userSpaceOnUse">
            <path d="M 6 0 L 0 0 0 6" fill="none" stroke="currentColor" className="text-orange-500" strokeWidth="0.5" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#gis-mini-grid)" />
      </svg>
      <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
        <motion.span
          className="absolute h-3 w-3 rounded-full bg-orange-500"
          style={{ left: "50%", top: "50%", transform: "translate(-50%,-50%)" }}
          animate={{ opacity: [0.5, 0, 0.5], scale: [1, 2.2, 1] }}
          transition={{ duration: 1.6, repeat: Infinity, ease: "easeOut" }}
        />
        <MapPin size={12} className="relative z-10 text-orange-500" />
      </span>
    </div>
  );
}

// Alarm Management — bell that shakes with a red badge counter incrementing
function AlarmPreview() {
  return (
    <div className="relative flex h-6 w-6 items-center justify-center">
      <motion.div
        animate={{ rotate: [0, -12, 10, -8, 0] }}
        transition={{ duration: 0.6, repeat: Infinity, repeatDelay: 1.4, ease: "easeInOut" }}
      >
        <AlertTriangle size={16} className="text-orange-500" />
      </motion.div>
      <motion.span
        className="absolute -right-1 -top-1 flex h-3.5 w-3.5 items-center justify-center rounded-full bg-red-500 text-[7px] font-bold text-white"
        animate={{ scale: [1, 1.25, 1] }}
        transition={{ duration: 0.6, repeat: Infinity, repeatDelay: 1.4 }}
      >
        3
      </motion.span>
    </div>
  );
}

// Historian — tiny scrolling sparkline
function HistorianPreview() {
  const points = "0,12 4,8 8,10 12,4 16,7 20,2 24,6 28,3";
  return (
    <svg width="32" height="16" viewBox="0 0 32 16" className="overflow-visible">
      <motion.polyline
        points={points}
        fill="none"
        stroke="#f97316"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 1 }}
        transition={{ duration: 2, repeat: Infinity, repeatType: "loop", ease: "easeInOut" }}
      />
      <motion.circle
        r="2"
        fill="#f97316"
        animate={{
          cx: [0, 4, 8, 12, 16, 20, 24, 28],
          cy: [12, 8, 10, 4, 7, 2, 6, 3],
        }}
        transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
      />
    </svg>
  );
}

// Mobile Access — small phone outline with a notification dot pulsing
function MobilePreview() {
  return (
    <div className="relative flex h-6 w-4 items-center justify-center rounded-[3px] border border-orange-500/50">
      <motion.span
        className="absolute right-[1px] top-[1px] h-1 w-1 rounded-full bg-emerald-400"
        animate={{ opacity: [1, 0.2, 1] }}
        transition={{ duration: 1.4, repeat: Infinity }}
      />
      <span className="h-2.5 w-2 rounded-[1px] bg-orange-500/30" />
    </div>
  );
}

// Open APIs — two nodes connected by a traveling pulse
function APIsPreview() {
  return (
    <svg width="32" height="14" viewBox="0 0 32 14">
      <line x1="3" y1="7" x2="29" y2="7" stroke="#f97316" strokeOpacity="0.2" strokeWidth="1.5" />
      <circle cx="3" cy="7" r="2.5" fill="#f97316" />
      <circle cx="29" cy="7" r="2.5" fill="#f97316" opacity="0.6" />
      <motion.circle
        r="2"
        fill="#fb923c"
        animate={{ cx: [3, 29, 3] }}
        transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
        cy={7}
      />
    </svg>
  );
}

// User Management — small avatar group with one highlighting in sequence
function UsersPreview() {
  const dots = [0, 1, 2];
  return (
    <div className="flex items-center -space-x-1.5">
      {dots.map((i) => (
        <motion.div
          key={i}
          className="h-4 w-4 rounded-full border-2 border-[var(--bg-void)] bg-orange-500/40"
          animate={{ backgroundColor: ["rgba(249,115,22,0.4)", "rgba(249,115,22,1)", "rgba(249,115,22,0.4)"] }}
          transition={{ duration: 1.8, repeat: Infinity, delay: i * 0.5, ease: "easeInOut" }}
        />
      ))}
    </div>
  );
}

// Reports — a document corner folding/unfolding with a checkmark line drawing
function ReportsPreview() {
  return (
    <svg width="20" height="22" viewBox="0 0 20 22">
      <rect x="2" y="1" width="16" height="20" rx="1.5" fill="none" stroke="#f97316" strokeOpacity="0.4" strokeWidth="1.2" />
      {[6, 10, 14].map((y, i) => (
        <motion.line
          key={y}
          x1="5" y1={y} x2="15" y2={y}
          stroke="#f97316"
          strokeWidth="1.2"
          strokeLinecap="round"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 0.5, delay: i * 0.25, repeat: Infinity, repeatDelay: 1.4 }}
        />
      ))}
    </svg>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Feature data — icon-area now renders the live preview, label stays static
// ─────────────────────────────────────────────────────────────────────────────

const features = [
  { Preview: DashboardsPreview, label: "Dashboards" },
  { Preview: GISPreview, label: "GIS Mapping" },
  { Preview: AlarmPreview, label: "Alarm Management" },
  { Preview: HistorianPreview, label: "Historian" },
  { Preview: MobilePreview, label: "Mobile Access" },
  { Preview: APIsPreview, label: "Open APIs" },
  { Preview: UsersPreview, label: "User Management" },
  { Preview: ReportsPreview, label: "Reports" },
];

// ─────────────────────────────────────────────────────────────────────────────
// Deck-reveal variants — cards start stacked/offset behind each other,
// then "deal out" into the grid with a slight rotation settle.
// ─────────────────────────────────────────────────────────────────────────────

const containerVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.09,
      delayChildren: 0.1,
    },
  },
};

const dealVariants: Variants = {
  hidden: {
    opacity: 0,
    y: -28,
    x: -10,
    scale: 0.82,
    rotate: -6,
  },
  visible: {
    opacity: 1,
    y: 0,
    x: 0,
    scale: 1,
    rotate: 0,
    transition: {
      duration: 0.55,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};

const headerFadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
  },
};

export default function PlatformOverview() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden bg-[var(--bg-void)] py-28 border-y border-border"
    >
      <div className="mx-auto max-w-5xl px-6 lg:px-8">

        {/* Header */}
        <div className="mx-auto max-w-2xl text-center mb-16">
          <motion.h2
            variants={headerFadeUp}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl"
          >
            Altrex Digital Platform
          </motion.h2>
          <motion.p
            variants={headerFadeUp}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            transition={{ delay: 0.08 }}
            className="mt-4 text-lg leading-relaxed text-muted-foreground"
          >
            Single platform to manage assets, operations, alarms, analytics, and field infrastructure.
          </motion.p>
        </div>

        {/* Deck-reveal grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid grid-cols-2 gap-4 sm:grid-cols-4 sm:gap-6"
          style={{ perspective: "1000px" }}
        >
          {features.map((feat, i) => {
            const Preview = feat.Preview;
            return (
              <motion.div
                key={i}
                variants={dealVariants}
                whileHover={{ y: -4 }}
                className="group flex flex-col items-center justify-center rounded-2xl border border-border bg-orange-400/5 p-6 transition-colors duration-300 hover:border-orange-500/20 hover:bg-white/[0.04]"
              >
                {/* Live preview replaces the static icon */}
                <div
                  className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl transition-transform duration-300 group-hover:scale-110"
                  style={{
                    backgroundColor: "rgba(249,115,22,0.08)",
                    border: "1px solid rgba(249,115,22,0.2)",
                  }}
                >
                  <Preview />
                </div>
                <span className="text-center text-sm font-medium text-foreground">
                  {feat.label}
                </span>
              </motion.div>
            );
          })}
        </motion.div>

        {/* CTA */}
        <motion.div
          variants={headerFadeUp}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          transition={{ delay: 0.9 }}
          className="mt-16 flex justify-center"
        >
          <Link
            to={"/services"}
          >
            <Button
              size="lg"
              className="gap-2 bg-accent px-8 py-6 text-base text-primary-foreground">
              Explore Platform
            <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}