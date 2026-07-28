/**
 * UseCases section rendered as a scroll-scrubbed horizontal track.
 * The section pins and the cards travel on X as the user scrolls vertically.
 */

import { useRef } from "react";
import { motion, type Variants } from "framer-motion";
import {
  Cloud,
  Briefcase,
  Wrench,
  Sliders,
  Cpu,
  Video,
  Settings,
  MapPin,
  GraduationCap,
} from "lucide-react";

import { SectionBadge } from "../ui/section-badge";
import { useScrollScrubHorizontalTrack } from "@/hooks/useScrollScrubHorizontalTrack";
import { Card } from "../ui/card";

const useCases = [
  {
    icon: Cloud,
    title: "SaaS Platform Services",
    description: "Subscription-based access to enterprise-grade platform capabilities.",
    metric: "99.9% platform uptime",
    bullets: [
      "Multi-tenant architecture with role-based access",
      "Elastic scaling across users and workloads",
      "Continuous updates with zero-downtime releases",
    ],
  },
  {
    icon: Briefcase,
    title: "Turnkey Project Implementation",
    description: "End-to-end delivery from design through go-live.",
    metric: "200+ projects delivered",
    bullets: [
      "Requirement scoping and solution architecture",
      "On-site deployment and system commissioning",
      "Post-go-live handover and documentation",
    ],
  },
  {
    icon: Wrench,
    title: "Managed Services & AMC",
    description: "Ongoing support to keep deployed systems running reliably.",
    metric: "24/7 support coverage",
    bullets: [
      "Scheduled preventive maintenance",
      "Priority incident response and resolution",
      "Annual maintenance contracts with SLA guarantees",
    ],
  },
  {
    icon: Sliders,
    title: "System Integration Services",
    description: "Connect disparate platforms into a unified operational view.",
    metric: "40+ systems integrated",
    bullets: [
      "API and middleware-based system connectivity",
      "Legacy system and third-party platform integration",
      "Unified data flow across business applications",
    ],
  },
  {
    icon: Cpu,
    title: "Industrial IoT & Edge Integration",
    description: "Bring field devices and edge hardware onto a connected network.",
    metric: "15K+ devices connected",
    bullets: [
      "Sensor and PLC connectivity at the edge",
      "Local edge processing with cloud sync",
      "Protocol translation for legacy industrial hardware",
    ],
  },
  {
    icon: Video,
    title: "CCTV & Video Analytics Services",
    description: "Camera network deployment with AI-driven video intelligence.",
    metric: "5K+ cameras deployed",
    bullets: [
      "CCTV network design and installation",
      "AI-based object and behavior detection",
      "Centralized video management and archival",
    ],
  },
  {
    icon: Settings,
    title: "Cloud & Infrastructure Services",
    description: "Design and manage resilient cloud and on-prem infrastructure.",
    metric: "99.95% infrastructure availability",
    bullets: [
      "Cloud architecture design and migration",
      "Hybrid and on-premise infrastructure setup",
      "Infrastructure monitoring and capacity planning",
    ],
  },
  {
    icon: MapPin,
    title: "GIS & Asset Digitization",
    description: "Map and digitize physical assets for spatial visibility.",
    metric: "1M+ assets digitized",
    bullets: [
      "Field survey and GPS-based asset mapping",
      "GIS layer creation and spatial data modeling",
      "Digital asset registry with searchable records",
    ],
  },
  {
    icon: GraduationCap,
    title: "Training & Consulting",
    description: "Build internal capability through guided training and advisory.",
    metric: "500+ professionals trained",
    bullets: [
      "Platform onboarding and hands-on training",
      "Process and workflow consulting",
      "Certification programs for technical teams",
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
          <motion.div
            variants={fadeUpVariants}
            initial="hidden"
            animate="visible"
          >
            <SectionBadge title="use cases" dot={true} className="mb-6" />
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
            A horizontal journey through the highest-impact realtime use
            cases — from industrial telemetry to global infrastructure.
          </motion.p>
        </div>
      </motion.div>

      {/* Horizontal track */}
      <div className="use-cases-scroll relative mt-14 overflow-x-auto pb-12 pt-2 scrollbar-hide">
        <div
          ref={trackRef}
          className="flex w-max gap-7 px-6 lg:px-16 will-change-transform"
        >
          {useCases.map((item) => {
            const Icon = item.icon;
            return (
              <Card
                className="group relative flex h-[460px] w-[340px] flex-shrink-0 flex-col overflow-hidden md:w-[420px]"
              >

                {/* Content zone */}
                <div className="relative flex flex-1 flex-col p-9">
                  {/* Icon */}
                  <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-primary text-white">
                    <Icon className="h-6.5 w-6.5" strokeWidth={2} />
                  </div>

                  {/* Eyebrow + title */}
                  <span className="mt-7 text-xs font-bold uppercase tracking-[0.1em] text-accent">
                    Use case
                  </span>
                  <h3 className="mt-2 text-xl font-bold uppercase leading-tight tracking-tight text-foreground">
                    {item.title}
                  </h3>
                  <p className="mt-3 text-[15px] leading-relaxed text-muted-foreground">
                    {item.description}
                  </p>

                  <div className="mt-6 h-px w-full bg-gradient-to-r from-white/[0.08] via-white/[0.04] to-transparent" />

                  {/* Bullets */}
                  <ul className="mt-6 space-y-3.5">
                    {item.bullets.map((bullet) => (
                      <li
                        key={bullet}
                        className="flex items-start gap-3 text-sm font-medium leading-snug text-muted-foreground transition-colors duration-200 group-hover:text-foreground/80"
                      >
                        <div className="mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-accent/15 ring-1 ring-accent/20">
                          <div className="h-1.5 w-1.5 rounded-full bg-accent" />
                        </div>
                        <span>{bullet}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </Card>
            );
          })}

          {/* Tail spacer so the last card fully clears the viewport */}
          <div
            className="w-[40vw] flex-shrink-0 md:w-[30vw] lg:w-[20vw]"
            aria-hidden="true"
          />
        </div>
      </div>
    </section>
  );
};

export default UseCases;