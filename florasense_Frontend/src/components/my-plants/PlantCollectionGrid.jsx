"use client"

import { motion, AnimatePresence } from "framer-motion"
import PlantCard from "./PlantCard"

const PlantCollectionGrid = ({ plants, onRemovePlant }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
    >
      <AnimatePresence>
        {plants.map((plant) => (
          <motion.div key={plant.id} layout exit={{ opacity: 0, scale: 0.8 }} transition={{ duration: 0.3 }}>
            <PlantCard plant={plant} onRemove={onRemovePlant} />
          </motion.div>
        ))}
      </AnimatePresence>
    </motion.div>
  )
}

export default PlantCollectionGrid
