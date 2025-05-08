"use client"

import { motion } from "framer-motion"
import { Sparkles } from "lucide-react"

const TestimonialCard = ({ testimonial, inView }) => {
  return (
    <motion.div
      className="bg-primary-800/50 backdrop-blur-sm rounded-2xl p-8 shadow-lg"
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: testimonial.delay, duration: 0.6 }}
      whileHover={{ y: -5, boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)" }}
    >
      <div className="flex items-center mb-6">
        <img
          src={testimonial.avatar || "/placeholder.svg"}
          alt={testimonial.name}
          className="w-14 h-14 rounded-full mr-4 border-2 border-primary-300"
        />
        <div>
          <h3 className="font-semibold text-lg">{testimonial.name}</h3>
          <p className="text-primary-300">{testimonial.role}</p>
        </div>
      </div>
      <p className="text-primary-100 leading-relaxed">"{testimonial.content}"</p>
      <div className="mt-4 flex">
        {[...Array(5)].map((_, i) => (
          <Sparkles key={i} className="w-5 h-5 text-yellow-400" />
        ))}
      </div>
    </motion.div>
  )
}

export default TestimonialCard

