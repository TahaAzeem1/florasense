"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import { Search, BookOpen, Calendar } from "lucide-react"

const HowItWorksSection = () => {
  const howItWorksRef = useRef(null)
  const howItWorksInView = useInView(howItWorksRef, { once: true, amount: 0.2 })

  const howItWorks = [
    {
      title: "Search or Snap",
      description: "Search for plants by name or use your camera to identify unknown species.",
      icon: Search,
      delay: 0.1,
    },
    {
      title: "Get Detailed Info",
      description: "Access comprehensive care guides, growth habits, and environmental needs.",
      icon: BookOpen,
      delay: 0.2,
    },
    {
      title: "Track Your Collection",
      description: "Add plants to your collection and get reminders for watering and care.",
      icon: Calendar,
      delay: 0.3,
    },
  ]

  return (
    <div ref={howItWorksRef} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
      <motion.div
        className="text-center mb-16"
        initial={{ opacity: 0, y: 20 }}
        animate={howItWorksInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6 }}
      >
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">How FloraSense Works</h2>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Simple steps to get started with your plant care journey
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
        {/* Connecting Line */}
        <div className="hidden md:block absolute top-1/2 left-0 right-0 h-0.5 bg-primary-200 -z-10"></div>

        {howItWorks.map((step, index) => (
          <motion.div
            key={step.title}
            className="bg-white rounded-2xl p-8 shadow-lg relative z-10 flex flex-col items-center text-center"
            initial={{ opacity: 0, y: 20 }}
            whileHover={{ scale: 1.05 , duration: 0.3 }}
            animate={howItWorksInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: step.delay, duration: 0.6 }}
          >
            <div className="bg-primary-600 w-16 h-16 rounded-full flex items-center justify-center mb-6 shadow-lg">
              <step.icon className="w-8 h-8 text-white" />
            </div>
            <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-primary-600 text-white w-8 h-8 rounded-full flex items-center justify-center font-bold">
              {index + 1}
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-3">{step.title}</h3>
            <p className="text-gray-600 leading-relaxed">{step.description}</p>
          </motion.div>
        ))}
      </div>
    </div>
  )
}

export default HowItWorksSection

