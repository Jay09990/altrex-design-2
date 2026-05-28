/**
 * TrustedBy section rendered as a pinned, scroll-scrubbed horizontal logo track.
 */

import { useRef } from "react";
import { motion, type Variants } from "framer-motion";

import { useScrollScrubHorizontalTrack } from "@/hooks/useScrollScrubHorizontalTrack";

const techLogos = [
  {
    src: "https://upload.wikimedia.org/wikipedia/commons/a/a7/React-icon.svg",
    title: "React",
    href: "https://react.dev",
  },
  {
    src: "https://upload.wikimedia.org/wikipedia/commons/8/8e/Nextjs-logo.svg",
    title: "Next.js",
    href: "https://nextjs.org",
  },
  {
    src: "https://www.vectorlogo.zone/logos/typescriptlang/typescriptlang-icon.svg",
    title: "TypeScript",
    href: "https://www.typescriptlang.org",
  },
  {
    src: "https://www.vectorlogo.zone/logos/tailwindcss/tailwindcss-icon.svg",
    title: "Tailwind CSS",
    href: "https://tailwindcss.com",
  },
  {
    src: "https://upload.wikimedia.org/wikipedia/commons/3/33/Figma-logo.svg",
    title: "Figma",
    href: "https://figma.com",
  },
  {
    src: "https://www.vectorlogo.zone/logos/docker/docker-icon.svg",
    title: "Docker",
    href: "https://docker.com",
  },
];

const containerVariants: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.15 } },
};

const fadeUpVariants: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7 } },
};

const TrustedBy = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useScrollScrubHorizontalTrack(sectionRef, trackRef, { minWidth: 1024, endPadding: 160 });

  return (
    <section ref={sectionRef} className="relative overflow-hidden bg-transparent py-20">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        className="mx-auto max-w-7xl px-6 lg:px-8"
      >
        {/* Heading */}
        <div className="mx-auto max-w-3xl text-center">
          <motion.p
            variants={fadeUpVariants}
            className="text-sm font-semibold uppercase tracking-[0.25em] text-violet-600"
          >
            Trusted Infrastructure
          </motion.p>

          <motion.h2
            variants={fadeUpVariants}
            className="mt-4 text-3xl font-bold tracking-tight text-[var(--text-primary)] sm:text-4xl"
          >
            Trusted by Modern Technology Teams
          </motion.h2>

          <motion.p variants={fadeUpVariants} className="mt-6 text-lg leading-8 text-[var(--text-secondary)]">
            A horizontal partner strip that consumes scroll length — breaking vertical monotony while keeping the
            mission-control vibe.
          </motion.p>
        </div>
      </motion.div>

      <div className="relative mt-14 overflow-hidden">
        <div
          ref={trackRef}
          className="flex w-max items-center gap-6 px-6 lg:px-16 will-change-transform [transform:translate3d(0,0,0)]"
        >
          {techLogos.map((logo) => (
            <motion.a
              key={logo.title}
              href={logo.href}
              target="_blank"
              rel="noreferrer"
              whileHover={{ y: -2, scale: 1.01 }}
              transition={{ duration: 0.2 }}
              className="group flex w-[260px] flex-shrink-0 items-center gap-4 rounded-3xl border border-white/10 bg-[var(--bg-surface)]/75 p-6 shadow-sm transition-all duration-300 hover:border-violet-400/30 hover:shadow-md"
            >
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-black/20">
                <img src={logo.src} alt={logo.title} className="h-10 w-auto object-contain opacity-90" />
              </div>
              <div>
                <div className="text-sm font-semibold text-[var(--text-primary)] group-hover:text-violet-200 transition-colors">
                  {logo.title}
                </div>
                <div className="mt-1 font-mono text-[10px] tracking-widest text-[var(--text-muted)]">
                  [STATUS: VERIFIED]
                </div>
              </div>
            </motion.a>
          ))}

          <div className="w-[20vw] flex-shrink-0" aria-hidden="true" />
        </div>
      </div>
    </section>
  );
};

export default TrustedBy;
