"use client"

import { motion } from "framer-motion"
import { Leaf, Plus, Search } from "lucide-react"
import { useNavigate } from "react-router-dom"

const EmptyPlantCollection = ({ isSearching, searchQuery }) => {
  const navigate = useNavigate()

  if (isSearching) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col items-center justify-center py-16 px-4 text-center"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{
            type: "spring",
            stiffness: 260,
            damping: 20,
            delay: 0.2,
          }}
          className="relative w-32 h-32 mb-8"
        >
          <div className="absolute inset-0 flex items-center justify-center">
            <Leaf className="w-16 h-16 text-primary-200" />
          </div>
          <motion.div
            animate={{
              rotate: 360,
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 3,
              repeat: Number.POSITIVE_INFINITY,
              repeatType: "reverse",
              ease: "easeInOut",
            }}
            className="absolute inset-0 border-4 border-dashed border-primary-100 rounded-full"
          />
          <Search className="absolute bottom-0 right-0 w-10 h-10 text-primary-400 bg-white rounded-full p-1" />
        </motion.div>

        <motion.h3
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="text-2xl font-semibold text-gray-900 mb-3"
        >
          No plants found
        </motion.h3>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="text-gray-600 mb-6 max-w-md"
        >
          We couldn't find any plants matching "{searchQuery}" in your collection.
        </motion.p>
      </motion.div>
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col items-center justify-center py-16 px-4 text-center"
    >
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{
          type: "spring",
          stiffness: 260,
          damping: 20,
        }}
        className="relative w-40 h-40 mb-8"
      >
        <div className="absolute inset-0 flex items-center justify-center">
          <Leaf className="w-24 h-24 text-primary-200" />
        </div>
        <motion.div
          animate={{
            rotate: 360,
          }}
          transition={{
            duration: 20,
            repeat: Number.POSITIVE_INFINITY,
            ease: "linear",
          }}
          className="absolute inset-0 border-4 border-dashed border-primary-100 rounded-full"
        />
        <motion.div
          className="absolute -right-4 -bottom-4 bg-white rounded-full p-3 shadow-lg"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <Plus className="w-10 h-10 text-primary-500" />
        </motion.div>
      </motion.div>

      <motion.h3
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="text-2xl font-semibold text-gray-900 mb-3"
      >
        Your plant collection is empty
      </motion.h3>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="text-gray-600 mb-6 max-w-md"
      >
        Start building your collection by searching for plants and adding them to your collection.
      </motion.p>

      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => navigate("/search")}
        className="px-6 py-3 bg-primary-600 text-white rounded-lg flex items-center space-x-2 shadow-md hover:bg-primary-700 transition-colors"
      >
        <Search className="w-5 h-5" />
        <span>Find Plants</span>
      </motion.button>
    </motion.div>
  )
}

export default EmptyPlantCollection
