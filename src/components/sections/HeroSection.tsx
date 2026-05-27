import { useEffect, useRef } from "react";
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

const HeadlineLine = ({ text }: { text: string }) => {
  const ref = useRef<HTMLSpanElement>(null);
  const words = text.split(" ");

  useEffect(() => {
    if (!ref.current) return;

    const words = ref.current.querySelectorAll("[data-word]");

    gsap.fromTo(
      words,
      {
        y: 32,
        opacity: 0,
      },
      {
        y: 0,
        opacity: 1,
        duration: 0.75,
        stagger: 0.05,
        ease: "power3.out",
      }
    );
  }, []);

  return (
    <span
      ref={ref}
      className="inline-flex flex-wrap justify-center gap-x-[0.22em] gap-y-0 leading-none"
    >
      {words.map((word, idx) => (
        <span
          key={`${word}-${idx}`}
          data-word
          className="inline-block whitespace-pre will-change-transform"
        >
          {word}
        </span>
      ))}
    </span>
  );
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
          <Badge variant="secondary" className="border-white/10 bg-[var(--bg-surface)]/50 p-4">
            <div className="flex h-5 w-5 items-center justify-center rounded-full bg-[var(--data-green)]">
              <span className="h-2 w-2 rounded-full bg-white animate-pulse" />
            </div>
            <span className="font-mono text-xs text-[var(--text-primary)]">
              MODERN REALTIME INFRASTRUCTURE PLATFORM
            </span>
          </Badge>
        </motion.div>

        {/* Heading with animated word lines */}
        <h1 className="max-w-6xl text-5xl font-bold tracking-[-0.04em] text-[var(--text-primary)] sm:text-6xl lg:text-7xl xl:text-8xl">
          <span className="block leading-[0.88]">
            <HeadlineLine text="BUILD POWERFUL REALTIME" />
          </span>
          <span className="mt-3 block leading-[0.88]">
            <HeadlineLine text="APPLICATIONS WITHOUT" />
          </span>
          <span className="mt-3 block leading-[0.88]">
            <HeadlineLine text="COMPLEXITY" />
          </span>
        </h1>

        {/* Metadata Labels */}
        <div
          ref={metadataRef}
          className="mt-12 flex flex-wrap items-center justify-center gap-8 font-mono text-xs tracking-widest text-[var(--text-secondary)] uppercase"
        >
          <span>[NODE_COUNT: 847,291]</span>
          <span className="hidden sm:inline">|</span>
          <span className="hidden sm:inline">[LATENCY: 11ms]</span>
          <span className="hidden md:inline">|</span>
          <span className="hidden md:inline">[UPTIME: 99.99%]</span>
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
              className="gap-2 border-white/10 px-8 py-6 text-[var(--text-primary)] hover:bg-white/5"
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
