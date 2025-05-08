"use client"

import { useState, useRef } from "react"
import { useNavigate } from "react-router-dom"
import { motion, useScroll, useTransform } from "framer-motion"
import { Search, ChevronDown, Sparkles } from "lucide-react"

const HeroSection = ({ onScrollToFeatures }) => {
  const navigate = useNavigate()
  const [searchQuery, setSearchQuery] = useState("")
  const heroRef = useRef(null)

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  })

  const heroOpacity = useTransform(scrollYProgress, [0, 1], [1, 0])
  const heroScale = useTransform(scrollYProgress, [0, 1], [1, 0.8])
  const heroY = useTransform(scrollYProgress, [0, 1], [0, 100])

  const handleSearch = (e) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`)
    }
  }

  return (
    <motion.div
    ref={heroRef}
    className="relative min-h-screen w-full flex items-center"
    style={{ opacity: heroOpacity, scale: heroScale, y: heroY }}
  >
    {/* Background Image with Parallax Effect */}
    <motion.div
      className="fixed inset-0 w-full h-screen bg-[url('https://images.unsplash.com/photo-1466781783364-36c955e42a7f?ixlib=rb-1.2.1&auto=format&fit=crop&w=2851&q=80')] 
      bg-cover bg-center bg-no-repeat"
      initial={{ scale: 1.1 }}
      animate={{ scale: 1 }}
      transition={{ duration: 1.5 }}
    >
      <div className="absolute inset-0 bg-primary-900/50 backdrop-blur-[1px]" />
    </motion.div>

      {/* Hero Content */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32 lg:py-40">
        <div className="text-center max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mb-6"
          >
            <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-white/20 backdrop-blur-md text-white">
              <Sparkles className="w-4 h-4 mr-2" />
              Your Personal Plant Companion
            </span>
          </motion.div>

          <motion.h1
            className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Discover & Nurture Your <span className="text-primary-300">Green</span> World
          </motion.h1>

          <motion.p
            className="text-xl md:text-2xl text-primary-50 mb-12 max-w-2xl mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.8 }}
          >
            Identify, track, and care for your plants with our intelligent plant companion app
          </motion.p>

          {/* Search Bar */}
          <motion.div
            className="max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
          >
            <form onSubmit={handleSearch} className="relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search for plants..."
                className="w-full px-6 py-4 pr-14 rounded-full text-lg shadow-xl 
                border border-primary-100 focus:outline-none focus:ring-2 
                focus:ring-primary-500 focus:border-transparent"
              />
              <button
                type="submit"
                className="absolute right-3 top-1/2 -translate-y-1/2 
                bg-primary-600 text-white p-3 rounded-full hover:bg-primary-700 
                transition-colors duration-200 shadow-lg"
              >
                <Search className="w-6 h-6" />
              </button>
            </form>
          </motion.div>

          {/* Scroll Down Indicator */}
          <motion.div
            className="absolute bottom-10 left-1/2 -translate-x-1/2 cursor-pointer"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, y: [0, 10, 0] }}
            transition={{ delay: 1, duration: 1.5, repeat: Number.POSITIVE_INFINITY }}
            onClick={onScrollToFeatures}
          >
            <ChevronDown className="w-10 h-10 text-white" />
          </motion.div>
        </div>
      </div>
    </motion.div>
  )
}

export default HeroSection

