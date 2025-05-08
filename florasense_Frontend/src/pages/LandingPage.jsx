"use client"

import { useRef } from "react"
import { useInView } from "framer-motion"
import HeroSection from "../components/landing/HeroSection"
import FeaturesSection from "../components/landing/FeaturesSection"
import CareCategories from "../components/landing/CareCategories"
import HowItWorksSection from "../components/landing/HowItWorksSection"
import TestimonialsSection from "../components/landing/TestimonialsSection"
import CTASection from "../components/landing/CTASection"

export default function LandingPage() {
  const featuresRef = useRef(null)
  const featuresInView = useInView(featuresRef, { once: true, amount: 0.2 })

  const scrollToFeatures = () => {
    featuresRef.current.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <div className="bg-gradient-to-b from-primary-50 to-white overflow-x-hidden">
      <HeroSection onScrollToFeatures={scrollToFeatures} />
      <div ref={featuresRef}>
        <FeaturesSection />
      </div>
      <CareCategories />
      <HowItWorksSection />
      <TestimonialsSection />
      {/* <CTASection /> */}
    </div>
  )
}

