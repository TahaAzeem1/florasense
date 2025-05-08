"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { useNavigate } from "react-router-dom"
import { Leaf, Trash2, Info, Calendar } from "lucide-react"

const PlantCard = ({ plant, onRemove }) => {
  const navigate = useNavigate()
  const [isHovered, setIsHovered] = useState(false)
  const [isRemoving, setIsRemoving] = useState(false)

  const handleRemove = async (e) => {
    e.stopPropagation()
    if (isRemoving) return

    try {
      setIsRemoving(true)
      await onRemove(plant)
    } catch (error) {
      console.error("Error removing plant:", error)
    } finally {
      setIsRemoving(false)
    }
  }

  const handleCardClick = () => {
    navigate(`/plant/${plant.plant_id}`)
  }

  // Default image if none provided
  const plantImage = plant.image_path || "/placeholder.svg?height=300&width=300"

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      whileHover={{ y: -5 }}
      transition={{ duration: 0.3 }}
      className="bg-white rounded-xl shadow-md overflow-hidden cursor-pointer h-full"
      onClick={handleCardClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative h-48 overflow-hidden">
        {plantImage ? (
          <motion.img
            src={plantImage}
            alt={plant.common_name}
            className="w-full h-full object-cover"
            animate={{ scale: isHovered ? 1.05 : 1 }}
            transition={{ duration: 0.3 }}
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-primary-100 to-primary-300 flex items-center justify-center">
            <Leaf className="w-16 h-16 text-primary-600 opacity-50" />
          </div>
        )}

        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: isHovered || isRemoving ? 1 : 0 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={handleRemove}
          disabled={isRemoving}
          className="absolute top-3 right-3 p-2 bg-white/80 backdrop-blur-sm rounded-full text-red-500 hover:bg-red-100 hover:text-red-600 transition-colors shadow-sm"
        >
          {isRemoving ? (
            <div className="w-5 h-5 border-2 border-red-500 border-t-transparent rounded-full animate-spin" />
          ) : (
            <Trash2 className="w-5 h-5" />
          )}
        </motion.button>
      </div>

      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-900 mb-1 line-clamp-1">{plant.common_name}</h3>

        <div className="flex items-center text-gray-600 text-sm mb-3">
          {plant.plant_type ? (
            <span className="bg-primary-50 text-primary-700 px-2 py-0.5 rounded-full capitalize">
              {plant.plant_type}
            </span>
          ) : (
            <span className="bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full">Unknown type</span>
          )}
        </div>

        <div className="flex flex-wrap gap-3 text-xs text-gray-500">
          <div className="flex items-center">
            <Calendar className="w-4 h-4 mr-1 text-primary-500" />
            <span>Added {new Date(plant.created_at).toLocaleDateString()}</span>
          </div>

          <motion.div whileHover={{ y: -2 }} className="flex items-center text-primary-600 font-medium">
            <Info className="w-4 h-4 mr-1" />
            <span>View Details</span>
          </motion.div>
        </div>
      </div>
    </motion.div>
  )
}

export default PlantCard
