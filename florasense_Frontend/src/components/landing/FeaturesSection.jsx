"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import { Camera, BookOpen, Heart, Bot } from 'lucide-react'
import FeatureCard from "./FeatureCard"
import { useNavigate } from "react-router-dom"

const FeaturesSection = () => {
  const featuresRef = useRef(null)
  const featuresInView = useInView(featuresRef, { once: true, amount: 0.2 })
  const navigate = useNavigate()

  const features = [
    {
      title: "Plant Identification",
      description: "Instantly identify any plant species with our advanced AI recognition technology.",
      icon: Camera,
      color: "from-green-500 to-emerald-600",
      delay: 0.1,
      action: () => navigate("/search"),
    },
    {
      title: "Care Guides",
      description: "Get detailed, AI-powered care instructions tailored to your specific plants.",
      icon: BookOpen,
      color: "from-blue-500 to-cyan-600",
      delay: 0.2,
      action: () => navigate("/care-guide"),
    },
    {
      title: "Interactive Queries",
      description: "Get expert answers to your plant care questions with our AI-powered plant care assistant.",
      icon: Bot,
      color: "from-amber-500 to-orange-600",
      delay: 0.3,
      // action: () => navigate("/care-guide"),
    },
    {
      title: "Plant Community",
      description: "Connect with fellow plant enthusiasts to share tips and showcase your collection.",
      icon: Heart,
      color: "from-pink-500 to-rose-600",
      delay: 0.4,
    },
  ]

  return (
    <div ref={featuresRef} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
      <motion.div
        className="text-center mb-16"
        initial={{ opacity: 0, y: 20 }}
        animate={featuresInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6 }}
      >
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Powerful Features for Plant Lovers</h2>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Everything you need to identify, understand, and care for your plants in one place
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {features.map((feature) => (
          <FeatureCard key={feature.title} feature={feature} inView={featuresInView} />
        ))}
      </div>
    </div>
  )
}

export default FeaturesSection
