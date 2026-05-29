import { useEffect, useMemo, useRef } from "react";
import { ArrowRight, Play } from "lucide-react";
import { motion, type Variants } from "framer-motion";
import { gsap } from "gsap";
import useMagneticButton from "@/hooks/useMagneticButton";

import { Badge } from "../ui/badge";
import { Button } from "../ui/button";

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

const HeroSection = () => {
  const metadataRef = useRef<HTMLDivElement>(null);
  const startBtnRef = useRef<HTMLButtonElement>(null);
  const demoBtnRef = useRef<HTMLButtonElement>(null);

  useMagneticButton(startBtnRef, 0.3, 50);
  useMagneticButton(demoBtnRef, 0.3, 50);

  useEffect(() => {
    if (!metadataRef.current) return;

    gsap.fromTo(
      metadataRef.current,
      { opacity: 0, y: 20 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        delay: 1,
        ease: "power2.out",
      }
    );
  }, []);

  const headlineLines = useMemo(
    () => [
      <>
        BUILD POWERFUL{" "}
        <span className="bg-gradient-to-r from-[var(--accent-violet)] via-[var(--accent-fuchsia)] to-cyan-400 bg-clip-text text-transparent">
          REALTIME
        </span>
      </>,
      <>APPLICATIONS WITHOUT</>,
      <span className="bg-gradient-to-r from-[var(--accent-violet)] via-[var(--accent-fuchsia)] to-cyan-400 bg-clip-text text-transparent">
        COMPLEXITY
      </span>,
    ],
    []
  );

  return (
    <section id="chapter-01" className="relative overflow-hidden scroll-mt-28 pt-32">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="relative z-10 mx-auto flex min-h-[90vh] max-w-7xl flex-col items-center justify-center px-6 pb-20 pt-20 text-center lg:px-8"
      >
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <Badge variant="secondary" className="border-black/[0.08] bg-[var(--bg-surface)] p-4 shadow-sm">
            <div className="flex h-5 w-5 items-center justify-center rounded-full bg-[var(--data-green)]">
              <span className="h-2 w-2 rounded-full bg-white animate-pulse" />
            </div>
            <span className="font-mono text-xs text-[var(--text-primary)]">
              MODERN REALTIME INFRASTRUCTURE PLATFORM
            </span>
          </Badge>
        </motion.div>

        {/* Heading with hard-clipped line scrub */}
        <h1 className="max-w-6xl text-5xl font-bold tracking-[-0.04em] text-[var(--text-primary)] sm:text-6xl lg:text-7xl xl:text-8xl">
          {headlineLines.map((line, lineIndex) => (
            <div
              key={lineIndex}
              className={`${lineIndex === 0 ? "" : "mt-3"} block leading-[0.88]`}
              style={{ overflow: "hidden" }}
            >
              <motion.div
                initial={{ y: "110%" }}
                animate={{ y: "0%" }}
                transition={{
                  duration: 0.9,
                  delay: lineIndex * 0.15,
                  ease: [0.76, 0, 0.24, 1],
                }}
              >
                {line}
              </motion.div>
            </div>
          ))}
        </h1>

        {/* Metadata Labels */}
        <div
          ref={metadataRef}
          className="mt-12 flex flex-wrap items-center justify-center gap-8 font-mono text-[10px] sm:text-xs tracking-widest text-[var(--text-secondary)] uppercase"
        >
          <span>[NODE_COUNT: <span className="text-[var(--accent-violet)] font-bold">847,291</span>]</span>
          <span className="hidden sm:inline text-black/[0.08]">|</span>
          <span className="hidden sm:inline">[LATENCY: <span className="text-cyan-400 font-bold">11ms</span>]</span>
          <span className="hidden md:inline text-black/[0.08]">|</span>
          <span className="hidden md:inline">[UPTIME: <span className="text-[var(--data-green)] font-bold">99.99%</span>]</span>
        </div>

        {/* Description */}
        <motion.p
          variants={fadeUpVariants}
          initial="hidden"
          animate="visible"
          transition={{ delay: 1.2 }}
          className="mt-10 max-w-3xl text-base leading-8 text-[var(--text-secondary)] sm:text-lg"
        >
          Power scalable messaging, IoT communication, and distributed systems
          with enterprise-grade realtime infrastructure built for modern
          applications.
        </motion.p>

        {/* Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.4, duration: 0.8 }}
          className="mt-16 flex flex-col items-center gap-4 sm:flex-row"
        >
          <div className="relative">
            <Button 
              ref={startBtnRef}
              className="gap-2 bg-[var(--accent-violet)] px-8 py-6 text-white hover:bg-[var(--accent-violet)]/90"
            >
              Start Building
              <ArrowRight className="h-4 w-4" />
            </Button>
          </div>

          <div className="relative">
            <Button 
              ref={demoBtnRef}
              variant="outline" 
              className="gap-2 border-black/[0.08] bg-[var(--bg-surface)] px-8 py-6 text-[var(--text-primary)] hover:bg-[var(--bg-raised)]"
            >
              <Play className="h-4 w-4" />
              Watch Demo
            </Button>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default HeroSection;
