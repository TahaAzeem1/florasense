"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import TestimonialCard from "./TestimonialCard"

const TestimonialsSection = () => {
  const testimonialsRef = useRef(null)
  const testimonialsInView = useInView(testimonialsRef, { once: true, amount: 0.2 })

  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "Plant Enthusiast",
      content:
        "FloraSense has completely transformed how I care for my plants. The identification feature is incredibly accurate!",
      avatar: "https://randomuser.me/api/portraits/women/32.jpg",
      delay: 0.1,
    },
    {
      name: "Michael Chen",
      role: "Urban Gardener",
      content:
        "As someone with over 50 houseplants, this app has been a game-changer for keeping track of watering schedules.",
      avatar: "https://randomuser.me/api/portraits/men/44.jpg",
      delay: 0.2,
    },
    {
      name: "Emma Rodriguez",
      role: "Botanical Researcher",
      content: "The level of detail in the plant database is impressive. I use FloraSense daily in my research work.",
      avatar: "https://randomuser.me/api/portraits/women/68.jpg",
      delay: 0.3,
    },
  ]

  return (
    <div ref={testimonialsRef} className="bg-primary-900 py-24 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={testimonialsInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">What Our Users Say</h2>
          <p className="text-xl text-primary-100 max-w-3xl mx-auto">
            Join thousands of plant enthusiasts who have transformed their plant care routine
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial) => (
            <TestimonialCard key={testimonial.name} testimonial={testimonial} inView={testimonialsInView} />
          ))}
        </div>
      </div>
    </div>
  )
}

export default TestimonialsSection

