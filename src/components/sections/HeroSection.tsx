import { useEffect, useRef } from "react";
import { Play } from "lucide-react";
import { motion, type Variants } from "framer-motion";
import { gsap } from "gsap";
import useMagneticButton from "@/hooks/useMagneticButton";

import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import CharReveal from "@/components/CharReveal";
import TrustedBy from "./TrustedBy";

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



  return (
    <section id="chapter-01" className="relative overflow-hidden scroll-mt-28 min-h-screen flex flex-col">
      <div className="flex-1 flex flex-col items-center justify-center">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="relative z-10 mx-auto flex max-w-screen-2xl flex-col items-center justify-center px-6 pt-20 text-center lg:px-8"
        >
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="mb-6"
          >
            <Badge variant="secondary" className="border-black/[0.08] bg-[var(--bg-surface)] shadow-sm">
              <div className="flex h-4 w-4 items-center justify-center rounded-full bg-[var(--data-green)]">
                <span className="h-1.5 w-1.5 rounded-full bg-white animate-pulse" />
              </div>
              <span className="font-mono text-sm text-[var(--text-primary)]">
                MODERN REALTIME INFRASTRUCTURE PLATFORM
              </span>
            </Badge>
          </motion.div>

          {/* Heading — character-by-character reveal */}
          <CharReveal
            as="h1"
            lines={["BUILD REALTIME APPLICATIONS", "WITHOUT COMPLEXITY"]}
            className="max-w-9xl text-3xl font-bold tracking-[-0.04em] text-[var(--text-primary)] sm:text-5xl lg:text-5xl xl:text-7xl mt-8 leading-[0.95]"
            immediate
            delay={0}
            stagger={0.028}
            lineGap="mt-6"
          />

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
            className="mt-10 max-w-2xl text-base leading-7 text-[var(--text-secondary)] sm:text-lg"
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
            className="mt-12 mb-20 flex flex-col items-center gap-4 sm:flex-row"
          >
            {/* <div className="relative">
              <Button
                ref={startBtnRef}
                className="gap-2 bg-[var(--accent-violet)] px-8 py-5 text-white hover:bg-[var(--accent-violet)]/90"
              >
                Start Building
                <ArrowRight className="h-4 w-4" />
              </Button>
            </div> */}

            <div className="relative">
              <Button
                // ref={demoBtnRef}
                ref={startBtnRef}
                variant="outline"
                className="gap-2 bg-[var(--accent-violet)] px-8 py-5 text-white"
              >
                <Play className="h-4 w-4" />
                Watch Demo
              </Button>
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Logo Loop at the bottom */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.6, duration: 0.8 }}
        className="w-full pb-10"
      >
        <TrustedBy />
      </motion.div>
    </section>
  );
};

export default HeroSection;
