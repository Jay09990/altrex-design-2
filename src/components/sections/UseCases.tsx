/**
 * UseCases section rendered as a scroll-scrubbed horizontal track.
 * The section pins and the cards travel on X as the user scrolls vertically.
 */

import { useRef } from "react";
import { motion, type Variants } from "framer-motion";
import {
  Building2,
  Car,
  Factory,
  MapPinned,
  Shield,
  Smartphone,
  SquareChartGantt,
  PlugZap,
} from "lucide-react";

import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { useScrollScrubHorizontalTrack } from "@/hooks/useScrollScrubHorizontalTrack";
import InViewDecryptedText from "../InViewDecryptedText";

const useCases = [
  {
    icon: Factory,
    title: "Industrial IoT",
    description: "Connect devices and field assets.",
    metric: "Processes 50M+ Telemetry events/sec",
    bullets: [
      "Industrial protocol connectivity",
      "Real-time telemetry acquisition",
      "Edge-to-cloud data integration",
    ],
  },
  {
    icon: Shield,
    title: "Video Analytics",
    description: "AI-powered surveillance and monitoring.",
    metric: "Monitors 10K camera feeds",
    bullets: [
      "Live stream ingestion",
      "Secure encrypted transport",
      "Event-based alerting",
    ],
  },
  {
    icon: Car,
    title: "Fleet Management",
    description: "Track vehicles and optimize operations.",
    metric: "Tracks 50K+ vehicles in real time",
    bullets: [
      "Live vehicle tracking and route optimization",
      "Driver performance and safety monitoring",
      "Maintenance scheduling and operational reporting",
    ],
  },
  {
    icon: Building2,
    title: "Web SCADA",
    description: "Real-time monitoring and control.",
    metric: " Monitors 10K+ field assets",
    bullets: [
      "Remote Monitoring of CNG Stations",
      "AMR Infrastructure of Gas Meters",
      "GIS-based Network & Cascade Vehicle Management ",
    ],
  },
  {
    icon: Smartphone,
    title: "Realtime Applications",
    description:
      "Create modern messaging apps, live collaboration platforms, and realtime experiences.",
    metric: "Supports 100K concurrent users",
    bullets: [
      "Low-latency pub/sub channels",
      "Presence & typing indicators",
      "Push notification delivery",
    ],
  },
  {
    icon: SquareChartGantt,
    title: "GIS & Asset Management",
    description: "Location intelligence and asset visibility.",
    metric: "Manages 500K+ assets",
    bullets: [
      "Interactive GIS-based asset visualization",
      "Asset lifecycle and maintenance management",
      "Location-based operational intelligence",
    ],
  },
  {
    icon: PlugZap,
    title: "Energy Management",
    description: "Monitor and optimize energy consumption.",
    metric: "Monitors 50K+ energy points",
    bullets: [
      "Real-time energy consumption monitoring",
      "Demand and power quality analytics",
      "Automated reporting and efficiency insights",
    ],
  },
  {
    icon: MapPinned,
    title: "Global Infrastructure",
    description:
      "Deploy distributed systems worldwide with ultra-low latency and high availability.",
    metric: "120+ global edge regions",
    bullets: [
      "Multi-region failover",
      "Edge-close data routing",
      "99.99% SLA guaranteed",
    ],
  },
];

const containerVariants: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};

const fadeUpVariants: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7 } },
};

const UseCases = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useScrollScrubHorizontalTrack(sectionRef, trackRef, {
    minWidth: 1024,
    endPadding: 140,
  });

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden bg-transparent py-28"
    >
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.15 }}
        className="mx-auto max-w-7xl px-6 lg:px-8"
      >
        {/* Header */}
        <div className="mx-auto max-w-3xl text-center">
          {/* Badge */}
          <motion.div
            variants={fadeUpVariants}
            initial="hidden"
            animate="visible"
          >
            <Badge
              variant="secondary"
              className="border-border bg-card shadow-sm mb-6"
            >
              <div className="flex h-4 w-4 items-center justify-center rounded-full bg-emerald-500">
                <span className="h-1.5 w-1.5 rounded-full bg-white animate-pulse" />
              </div>
              <span className="font-mono text-xs sm:text-sm text-foreground">
                <InViewDecryptedText
                  text="use cases"
                  speed={60}
                  maxIterations={12}
                  className="text-foreground uppercase"
                  encryptedClassName="text-muted-foreground"
                />
              </span>
            </Badge>
          </motion.div>

          <motion.h2
            variants={fadeUpVariants}
            className="mt-6 text-4xl font-bold tracking-tight text-foreground sm:text-5xl"
          >
            Built for Modern Enterprise Industrial Operations
          </motion.h2>

          <motion.p
            variants={fadeUpVariants}
            className="mt-6 text-lg leading-8 text-muted-foreground font-semibold"
          >
            A horizontal journey through the highest-impact realtime use cases —
            from industrial telemetry to global infrastructure.
          </motion.p>
        </div>
      </motion.div>

      {/* Horizontal track */}
      <div className="relative mt-14 overflow-x-auto scrollbar-hide">
        <div
          ref={trackRef}
          className="flex w-max gap-6 px-6 lg:px-16 will-change-transform"
        >
          {useCases.map((item, index) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.45, delay: index * 0.05 }}
                className="w-[340px] flex-shrink-0 rounded-3xl border border-black/[0.08] bg-card p-8 shadow-sm backdrop-blur-sm md:w-[420px]"
              >
                <div className="flex items-start justify-between">
                  <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-primary text-white shadow-lg">
                    <Icon className="h-7 w-7" />
                  </div>

                  <Badge variant="outline">
                    {item.metric}
                  </Badge>
                </div>

                <h3 className="mt-6 text-xl font-bold uppercase tracking-tight text-foreground">
                  {item.title}
                </h3>
                <p className="mt-3 text-[14px] leading-relaxed text-muted-foreground">
                  {item.description}
                </p>

                <ul className="mt-6 space-y-3">
                  {item.bullets.map((bullet) => (
                    <li
                      key={bullet}
                      className="flex items-center gap-3 text-sm text-muted-foreground"
                    >
                      <div className="flex h-5 w-5 items-center justify-center rounded-full bg-violet-100">
                        <div className="h-1.5 w-1.5 rounded-full bg-violet-600" />
                      </div>
                      {bullet}
                    </li>
                  ))}
                </ul>

                <div className="mt-8 flex gap-3">
                  <Button variant="default">Start Building</Button>
                  <Button variant="outline">Book Demo</Button>
                </div>
              </motion.div>
            );
          })}

          {/* Tail spacer so the last card fully clears the viewport */}
          <div
            className="w-[40vw] md:w-[30vw] lg:w-[20vw] flex-shrink-0"
            aria-hidden="true"
          />
        </div>
      </div>
    </section>
  );
};

export default UseCases;
