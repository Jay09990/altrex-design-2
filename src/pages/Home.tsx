import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Architecture from "@/components/sections/Architecture"
import CoreFeatures from "@/components/sections/CoreFeatures"
import CTA from "@/components/sections/CTA"
import FAQ from "@/components/sections/FAQ"
import HeroSection from "@/components/sections/HeroSection"
import StatisticsSection from "@/components/sections/StatisticsSection"
import Testimonials from "@/components/sections/Testimonials"
import UseCases from "@/components/sections/UseCases"
import WhyChooseUs from "@/components/sections/WhyChooseUs"
import ProgressLine from "@/components/ProgressLine"
import LoadingScreen from "@/components/LoadingScreen"
import { HOME_CHAPTERS } from "@/data/homeChapters"

import { useLoading } from "@/context/LoadingContext"

const Home = () => {
  const { isInitialLoadComplete, setInitialLoadComplete } = useLoading();

  const [showLoading, setShowLoading] = useState(!isInitialLoadComplete);
  const [showContent, setShowContent] = useState(isInitialLoadComplete);

  useEffect(() => {
    if (isInitialLoadComplete) return;

    // After loading screen exits (at ~1100ms), show content
    const contentTimer = setTimeout(() => {
      setShowContent(true);
    }, 1100);

    return () => clearTimeout(contentTimer);
  }, [isInitialLoadComplete]);

  const handleLoadingComplete = () => {
    setInitialLoadComplete(true);
    setShowLoading(false);
  };

  return (
    <div className="relative bg-background">
      {/* Loading Screen */}
      {showLoading && (
        <LoadingScreen onComplete={handleLoadingComplete} />
      )}

      {/* Three.js Node Web Background */}
      <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
        {/* Background Grid Overlay */}
        <div id="bg-grid-overlay" className="absolute inset-0 bg-grid opacity-80" />

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
      
      {/* Progress Line */}
      <ProgressLine />

      {/* Content - animations start immediately since loading screen is complete */}
      <motion.div
        className="relative z-10"
        initial={{ opacity: 0, y: 35 }}
        animate={showContent ? { opacity: 1, y: 0 } : {}}
        transition={{
          duration: 1.1,
          ease: [0.16, 1, 0.3, 1], // easeOutQuart/Expo
        }}
      >
        <HeroSection />

        <div id={HOME_CHAPTERS[2].id} className="scroll-mt-28">
          <Architecture />
        </div>

        <div id={HOME_CHAPTERS[3].id} className="scroll-mt-28">
          <UseCases />
          <StatisticsSection />
        </div>

        <div id={HOME_CHAPTERS[4].id} className="scroll-mt-28">
          <Testimonials />
        </div>

        <div id={HOME_CHAPTERS[5].id} className="scroll-mt-28">
          <CTA />
          <FAQ />
        </div>
      </motion.div>
    </div>
  )
}

export default Home
