import { motion, type Variants } from "framer-motion";
import { FileText, Fuel, Compass, Truck, ArrowRight } from "lucide-react";

import { Button } from "../ui/button";
import { SectionBadge } from "../ui/section-badge";
import CharReveal from "../CharReveal";

const caseStudies = [
  {
    key: "cgd",
    image:
      "https://media.istockphoto.com/id/1093678798/photo/stationary-engineer-at-work.jpg?s=612x612&w=0&k=20&c=lSKIIxxUZoInuWX8H7UtaBA9Mbm4W86sMYuvGhnskkM=",
    icon: Fuel,
    title: "CGD Monitoring Platform",
    description: "Real-time station monitoring.",
    accent: "#f97316",
    overlay: {
      title: "Asset Overview",
      rows: [
        { label: "Pressure", value: "4.2 bar" },
        { label: "Flow Rate", value: "182 m³/h" },
        { label: "Stations", value: "236" },
      ],
    },
  },
  {
    key: "gis",
    image:
      "https://media.istockphoto.com/id/1488371748/video/indian-male-data-scientist-and-caucasian-female-business-manager-talking-in-front-of-big.jpg?s=640x640&k=20&c=Kc2w3RVwE26jpMpIFxcgLOcgTgewDmpyAIeTEaw6fsg=",
    icon: Compass,
    title: "Utility Asset GIS",
    description: "Geospatial asset visibility.",
    accent: "#3b82f6",
    overlay: {
      title: "Asset Overview",
      rows: [
        { label: "Pipelines", value: "1,245" },
        { label: "Valves", value: "842" },
        { label: "Stations", value: "236" },
      ],
    },
  },
  {
    key: "fleet",
    image:
      "https://media.istockphoto.com/id/1305796880/photo/concept-money-armor-van-route-on-the-map.jpg?s=612x612&w=0&k=20&c=H8v0DitZZoMFOvdWCKMe-3A9NTFfwKx9w9_-2H7Jhd0=",
    icon: Truck,
    title: "Fleet Tracking Solution",
    description: "Operational efficiency and route optimization.",
    accent: "#10b981",
    overlay: {
      title: "Vehicle Status",
      rows: [
        { label: "Speed", value: "65 km/h" },
        { label: "Distance", value: "156 km" },
        { label: "ETA", value: "02:45 PM" },
      ],
    },
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// Animation
// ─────────────────────────────────────────────────────────────────────────────

const containerVariants: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.14 } },
};

const fadeUpVariants: Variants = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 36 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

// ─────────────────────────────────────────────────────────────────────────────
// Card
// ─────────────────────────────────────────────────────────────────────────────

function CaseStudyCard({ item }: { item: (typeof caseStudies)[number] }) {
  const Icon = item.icon;

  return (
    <motion.div
      variants={cardVariants}
      whileHover={{ y: -6 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className="group flex h-full flex-col overflow-visible rounded-[20px] border bg-card shadow-[0_2px_10px_-6px_rgba(0,0,0,0.08)] transition-all duration-300 hover:shadow-[0_24px_48px_-24px_var(--card-accent)]"
      style={
        {
          borderColor: `${item.accent}30`,
          "--card-accent": `${item.accent}66`,
        } as React.CSSProperties
      }
    >
      {/* Photo panel */}
      <div className="relative h-52 w-full overflow-hidden rounded-t-[20px]">
        <img
          src={item.image}
          alt={item.title}
          className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
        />

        {/* subtle tint so the accent color reads through the photo */}
        <div
          className="absolute inset-0 mix-blend-multiply opacity-10"
          style={{ background: item.accent }}
        />

        {/* floating data-overlay card */}
        <motion.div
          initial={{ opacity: 0, x: 12, y: -6 }}
          whileInView={{ opacity: 1, x: 0, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.25 }}
          className="absolute right-3 top-3 w-[140px] rounded-xl border border-black/5 bg-white/95 p-3 shadow-[0_8px_24px_-8px_rgba(0,0,0,0.2)] backdrop-blur-sm"
        >
          <p className="mb-2 text-[10px] font-bold uppercase tracking-wide text-slate-500">
            {item.overlay.title}
          </p>
          <div className="space-y-1.5">
            {item.overlay.rows.map((row) => (
              <div
                key={row.label}
                className="flex items-center justify-between text-[11px]"
              >
                <span className="text-slate-400">{row.label}</span>
                <span className="font-semibold text-slate-700">
                  {row.value}
                </span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* fade so the overlapping badge below reads cleanly */}
        <div className="absolute inset-x-0 bottom-0 h-14 bg-gradient-to-t from-card via-card/40 to-transparent" />
      </div>

      {/* Body — icon badge overlaps the seam between image and body */}
      <div className="relative flex flex-1 flex-col items-center px-7 pb-8 text-center">
        <div
          className="absolute -top-9 flex h-[72px] w-[72px] items-center justify-center rounded-full text-white shadow-lg ring-[6px] ring-card transition-transform duration-300 group-hover:scale-105"
          style={{ background: item.accent }}
        >
          <Icon className="h-7 w-7" strokeWidth={2} />
        </div>

        <h3 className="mt-11 text-xl font-bold tracking-tight text-foreground">
          {item.title}
        </h3>
        <p className="mt-2.5 text-sm font-semibold leading-relaxed text-muted-foreground">
          {item.description}
        </p>

        <div className="mt-6">
          <motion.button
            whileHover={{ x: 3 }}
            transition={{ duration: 0.2 }}
            className="flex h-10 w-10 items-center justify-center rounded-lg border transition-colors duration-300"
            style={{ borderColor: `${item.accent}55`, color: item.accent }}
            aria-label={`View ${item.title} case study`}
          >
            <ArrowRight className="h-4 w-4" strokeWidth={2.5} />
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Section
// ─────────────────────────────────────────────────────────────────────────────

const CaseStudies = () => {
  return (
    <section className="relative overflow-hidden bg-transparent py-28">
      <div
        className="pointer-events-none absolute inset-0 -z-10 opacity-40"
        style={{
          backgroundImage:
            "radial-gradient(circle, var(--border-border) 1px, transparent 1px)",
          backgroundSize: "32px 32px",
        }}
      />

      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.15 }}
        className="mx-auto max-w-7xl px-6 lg:px-8"
      >
        {/* Header */}
        <div className="mx-auto max-w-2xl text-center">
          <motion.div
            variants={fadeUpVariants}
            initial="hidden"
            animate="visible"
          >
            <SectionBadge
              title="Case Studies"
              dot={true}
              dotColor="bg-emerald-500"
              className="mb-8"
            />
          </motion.div>

          <CharReveal
            as="h1"
            lines={["Success Stories"]}
            className="text-4xl font-bold tracking-[-0.03em] text-foreground sm:text-5xl leading-[1.02] uppercase text-center"
            immediate
            delay={0}
            stagger={0.028}
            lineGap="mt-1.5"
          />

          <motion.p
            variants={fadeUpVariants}
            className="mt-6 text-lg leading-8 text-muted-foreground font-semibold"
          >
            Showcase how our solutions have helped customers improve operational
            efficiency, visibility, and digital transformation across various
            industries.
          </motion.p>
        </div>

        {/* Cards */}
        <div className="mt-20 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {caseStudies.map((item) => (
            <CaseStudyCard key={item.key} item={item} />
          ))}
        </div>

        {/* CTA */}
        <motion.div
          variants={fadeUpVariants}
          className="mt-14 flex justify-center"
        >
          <Button
            className="gap-2 bg-accent px-8 py-6 text-base text-primary-foreground"
          >
            View All Projects
            <ArrowRight />
          </Button>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default CaseStudies;
