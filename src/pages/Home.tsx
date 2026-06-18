import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Architecture from "@/components/sections/Architecture"
import CTA from "@/components/sections/CTA"
import FAQ from "@/components/sections/FAQ"
import HeroSection from "@/components/sections/HeroSection"
import StatisticsSection from "@/components/sections/StatisticsSection"
import Testimonials from "@/components/sections/Testimonials"
import UseCases from "@/components/sections/UseCases"
import ProgressLine from "@/components/ProgressLine"
import LoadingScreen from "@/components/LoadingScreen"
import { HOME_CHAPTERS } from "@/data/homeChapters"
import { useLoading } from "@/context/LoadingContext"
import WhatWeDo from "@/components/sections/WhatWeDo";
import PlatformOverview from "@/components/sections/PlatformOverview";
import IndustriesTeaser from "@/components/sections/IndustriesTeaser";
import WhyChooseUs from "@/components/sections/WhyChooseUs";

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
    <div className="relative">
      {/* Loading Screen */}
      {showLoading && (
        <LoadingScreen onComplete={handleLoadingComplete} />
      )}

      {/* Three.js Node Web Background */}

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
        <WhatWeDo />
        <PlatformOverview />

        <div id={HOME_CHAPTERS[3].id} className="scroll-mt-28">
          <UseCases />
          <StatisticsSection />
        </div>

        <IndustriesTeaser />
        <WhyChooseUs />

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
