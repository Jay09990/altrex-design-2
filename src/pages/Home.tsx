import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Architecture from "@/components/sections/Architecture"
import CoreFeatures from "@/components/sections/CoreFeatures"
import CTA from "@/components/sections/CTA"
import DeveloperExperience from "@/components/sections/DeveloperExperience"
import FAQ from "@/components/sections/FAQ"
import HeroSection from "@/components/sections/HeroSection"
import Pricing from "@/components/sections/Pricing"
import ProductShowcase from "@/components/sections/ProductShowcase"
import StatisticsSection from "@/components/sections/StatisticsSection"
import Testimonials from "@/components/sections/Testimonials"
import TrustedBy from "@/components/sections/TrustedBy"
import UseCases from "@/components/sections/UseCases"
import WhyChooseUs from "@/components/sections/WhyChooseUs"
import NodeWeb from "@/components/NodeWeb"
import LoadingScreen from "@/components/LoadingScreen"
import HomeChapterNav from "@/components/HomeChapterNav"
import ProgressLine from "@/components/ProgressLine"
import { HOME_CHAPTERS } from "@/data/homeChapters"

const Home = () => {
  const [showLoading, setShowLoading] = useState(true);
  const [showScene, setShowScene] = useState(false);
  const [animateContent, setAnimateContent] = useState(false);

  useEffect(() => {
    // Pre-warm the 3D scene and layout in the background before the loader exits
    const timer = setTimeout(() => {
      setShowScene(true);
    }, 1000);

    // Start content animation exactly when loader starts sliding up (at 1800ms)
    const animationTimer = setTimeout(() => {
      setAnimateContent(true);
    }, 1800);

    return () => {
      clearTimeout(timer);
      clearTimeout(animationTimer);
    };
  }, []);

  return (
    <div className="relative bg-[var(--bg-void)]">
      {/* Loading Screen */}
      {showLoading && <LoadingScreen onComplete={() => setShowLoading(false)} />}

      {/* Three.js Node Web Background */}
      {showScene && (
        <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
          {/* Background Grid Overlay */}
          <div id="bg-grid-overlay" className="absolute inset-0 bg-grid opacity-80" />
          <NodeWeb />

          <motion.div
            aria-hidden="true"
            animate={{
              x: [0, 40, 0],
              y: [0, -24, 0],
              opacity: [0.45, 0.8, 0.45],
            }}
            transition={{
              duration: 18,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />

          <motion.div
            aria-hidden="true"
            animate={{
              x: [0, -32, 0],
              y: [0, 28, 0],
              opacity: [0.28, 0.55, 0.28],
            }}
            transition={{
              duration: 22,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />

          <motion.div
            aria-hidden="true"
            animate={{
              opacity: [0.14, 0.28, 0.14],
            }}
            transition={{
              duration: 12,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="pointer-events-none absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-white/5 to-transparent"
          />
        </div>
      )}

      {/* Chapter Nav */}
      <HomeChapterNav />

      {/* Progress Line */}
      <ProgressLine />

      {/* Content */}
      <motion.div
        className="relative z-10"
        initial={{ opacity: 0, y: 35 }}
        animate={animateContent ? { opacity: 1, y: 0 } : {}}
        transition={{
          duration: 1.1,
          ease: [0.16, 1, 0.3, 1], // easeOutQuart/Expo
        }}
      >
        <HeroSection />

        <div id={HOME_CHAPTERS[1].id} className="scroll-mt-28">
          <TrustedBy />
          <CoreFeatures />
        </div>

        <div id={HOME_CHAPTERS[2].id} className="scroll-mt-28">
          <ProductShowcase />
          <WhyChooseUs />
          <Architecture />
        </div>

        <div id={HOME_CHAPTERS[3].id} className="scroll-mt-28">
          <UseCases />
          <DeveloperExperience />
          <StatisticsSection />
        </div>

        <div id={HOME_CHAPTERS[4].id} className="scroll-mt-28">
          <Testimonials />
          <Pricing />
        </div>

        <div id={HOME_CHAPTERS[5].id} className="scroll-mt-28">
          <FAQ />
          <CTA />
        </div>
      </motion.div>
    </div>
  )
}

export default Home
