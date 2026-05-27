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

const Home = () => {
  return (
    <div>
      <HeroSection />
      <TrustedBy />
      <CoreFeatures />
      <ProductShowcase />
      <WhyChooseUs />
      <Architecture />
      <UseCases />
      <DeveloperExperience />
      <StatisticsSection />
      <Testimonials />
      <Pricing />
      <FAQ />
      <CTA />
    </div>
  )
}

export default Home