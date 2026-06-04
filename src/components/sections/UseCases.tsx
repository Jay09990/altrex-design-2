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
  HeartPulse,
  MapPinned,
  Shield,
  Smartphone,
  Sprout,
} from "lucide-react";

import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { useScrollScrubHorizontalTrack } from "@/hooks/useScrollScrubHorizontalTrack";

const useCases = [
  {
    icon: Factory,
    title: "Industrial IoT",
    description:
      "Monitor machines, automate workflows, and process realtime industrial data at scale.",
    metric: "Processes 50K sensor events/sec",
    bullets: ["Machine health monitoring", "Workflow automation pipelines", "Edge data processing"],
  },
  {
    icon: Shield,
    title: "Smart Surveillance",
    description:
      "Power CCTV systems, live monitoring, and secure realtime video infrastructure.",
    metric: "Monitors 10K camera feeds",
    bullets: ["Live stream ingestion", "Secure encrypted transport", "Event-based alerting"],
  },
  {
    icon: Car,
    title: "Fleet Tracking",
    description:
      "Track vehicles, optimize logistics, and stream live telemetry across global fleets.",
    metric: "Tracks 80K+ vehicles globally",
    bullets: ["GPS telemetry streaming", "Route optimization signals", "Driver behavior analytics"],
  },
  {
    icon: Building2,
    title: "Smart Cities",
    description:
      "Build scalable infrastructure for traffic systems, utilities, and connected urban environments.",
    metric: "Manages 1M+ city devices",
    bullets: ["Traffic signal coordination", "Utility grid telemetry", "Public safety networks"],
  },
  {
    icon: Smartphone,
    title: "Realtime Applications",
    description:
      "Create modern messaging apps, live collaboration platforms, and realtime experiences.",
    metric: "Supports 100K concurrent users",
    bullets: ["Low-latency pub/sub channels", "Presence & typing indicators", "Push notification delivery"],
  },
  {
    icon: MapPinned,
    title: "Global Infrastructure",
    description:
      "Deploy distributed systems worldwide with ultra-low latency and high availability.",
    metric: "120+ global edge regions",
    bullets: ["Multi-region failover", "Edge-close data routing", "99.99% SLA guaranteed"],
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

  useScrollScrubHorizontalTrack(sectionRef, trackRef, { minWidth: 1024, endPadding: 240 });

  return (
    <section ref={sectionRef} className="relative overflow-hidden bg-transparent py-28">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.15 }}
        className="mx-auto max-w-7xl px-6 lg:px-8"
      >
        {/* Header */}
        <div className="mx-auto max-w-3xl text-center">
          <motion.div variants={fadeUpVariants}>
            <Badge
              variant="secondary"
              className="border border-violet-200 bg-violet-50 p-4 text-sm font-medium text-violet-700"
            >
              Use Cases
            </Badge>
          </motion.div>

          <motion.h2
            variants={fadeUpVariants}
            className="mt-6 text-4xl font-bold tracking-tight text-[var(--text-primary)] sm:text-5xl"
          >
            Built for Modern{" "}
            <span className="bg-orange-500 bg-clip-text text-transparent">
              Realtime Platforms
            </span>
          </motion.h2>

          <motion.p variants={fadeUpVariants} className="mt-6 text-lg leading-8 text-[var(--text-secondary)]">
            A horizontal journey through the highest-impact realtime use cases — from industrial telemetry to global
            infrastructure.
          </motion.p>
        </div>
      </motion.div>

      {/* Horizontal track */}
      <div className="relative mt-14 overflow-hidden">
        <div
          ref={trackRef}
          className="flex w-max gap-6 px-6 lg:px-16 will-change-transform [transform:translate3d(0,0,0)]"
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
                className="w-[340px] flex-shrink-0 rounded-3xl border border-black/[0.08] bg-[var(--bg-surface)] p-8 shadow-sm backdrop-blur-sm md:w-[420px]"
              >
                <div className="flex items-start justify-between">
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#ff751f] text-white shadow-lg">
                    <Icon className="h-7 w-7" />
                  </div>

                  <div className="inline-flex items-center gap-2 rounded-full border border-green-500/25 bg-green-500/10 px-3 py-1 text-[11px] font-semibold text-green-400">
                    <span className="h-1.5 w-1.5 rounded-full bg-green-400" />
                    {item.metric}
                  </div>
                </div>

                <h3 className="mt-6 text-xl font-bold uppercase tracking-tight text-[var(--text-primary)]">{item.title}</h3>
                <p className="mt-3 text-[14px] leading-relaxed text-[var(--text-secondary)]">{item.description}</p>

                <ul className="mt-6 space-y-3">
                  {item.bullets.map((bullet) => (
                    <li key={bullet} className="flex items-center gap-3 text-sm text-[var(--text-secondary)]">
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
          <div className="w-[20vw] flex-shrink-0" aria-hidden="true" />
        </div>
      </div>
    </section>
  );
};

export default UseCases;

