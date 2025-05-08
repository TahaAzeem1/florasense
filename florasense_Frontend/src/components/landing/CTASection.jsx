"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import { Leaf, ArrowRight, Sparkles } from "lucide-react"

const CTASection = () => {
  const ctaRef = useRef(null)
  const ctaInView = useInView(ctaRef, { once: true, amount: 0.2 })

  return (
    <div ref={ctaRef} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
      <motion.div
        className="bg-gradient-to-r from-primary-600 to-primary-500 rounded-3xl p-12 shadow-xl relative overflow-hidden"
        initial={{ opacity: 0, y: 20 }}
        animate={ctaInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8 }}
      >
        {/* Decorative Elements */}
        <div className="absolute top-0 right-0 -mt-10 -mr-10">
          <Leaf className="w-64 h-64 text-primary-400/20 rotate-45" />
        </div>
        <div className="absolute bottom-0 left-0 -mb-8 -ml-8">
          <Leaf className="w-40 h-40 text-primary-400/20 -rotate-45" />
        </div>

        <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="text-white max-w-2xl">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Start Your Plant Journey?</h2>
            <p className="text-primary-100 text-lg mb-6">
              Join our community of plant lovers and transform your relationship with your green companions.
            </p>
            <div className="flex flex-wrap gap-4">
              <motion.button
                className="bg-white text-primary-700 px-8 py-3 rounded-lg font-medium flex items-center group hover:bg-primary-50 transition-colors shadow-lg"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Get Started
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </motion.button>
              <motion.button
                className="border-2 border-white text-white px-8 py-3 rounded-lg font-medium flex items-center group hover:bg-white/10 transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Learn More
              </motion.button>
            </div>
          </div>
          <div className="w-full md:w-auto">
            <motion.div
              className="bg-white/20 backdrop-blur-sm p-6 rounded-2xl shadow-lg"
              whileHover={{ y: -5, boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)" }}
            >
              <div className="text-center text-white">
                <Sparkles className="w-12 h-12 mx-auto mb-4 text-yellow-300" />
                <h3 className="text-2xl font-bold mb-2">Premium Features</h3>
                <p className="text-primary-100 mb-4">Unlock advanced plant care tools</p>
                <ul className="text-left space-y-3 mb-6">
                  {["AI Plant Doctor", "Unlimited Collections", "Expert Consultations", "Premium Content"].map(
                    (feature) => (
                      <li key={feature} className="flex items-center">
                        <div className="bg-primary-300/20 p-1 rounded-full mr-3">
                          <Leaf className="w-4 h-4 text-primary-100" />
                        </div>
                        {feature}
                      </li>
                    ),
                  )}
                </ul>
                <motion.button
                  className="w-full bg-white text-primary-700 px-6 py-3 rounded-lg font-medium hover:bg-primary-50 transition-colors shadow-lg"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Upgrade Now
                </motion.button>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </div>
  )
}

export default CTASection

