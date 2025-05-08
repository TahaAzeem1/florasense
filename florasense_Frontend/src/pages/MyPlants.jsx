// import React from 'react';

// const MyPlants = () => {
//   return (
//     <div className="bg-white rounded-lg shadow p-6">
//       <h2 className="text-2xl font-bold mb-6">My Plants</h2>
//       <p>My Plants section coming soon...</p>
//     </div>
//   );
// };

// export default MyPlants;

"use client"

import { useState, useEffect } from "react"
import { AnimatePresence } from "framer-motion"
import { useAuth } from "../context/AuthContext"
import { supabase } from "../lib/supabase"
import { removePlantFromCollection } from "../services/myPlantCollection"
import toast from "react-hot-toast"

// Components
import MyPlantsHeader from "../components/my-plants/MyPlantsHeader"
import PlantCollectionGrid from "../components/my-plants/PlantCollectionGrid"
import EmptyPlantCollection from "../components/my-plants/EmptyPlantCollection"
import RemoveConfirmationModal from "../components/my-plants/RemoveConfirmationModal"
import LoadingPlantCollection from "../components/my-plants/LoadingPlantCollection"

const MyPlants = () => {
  const { currentUser } = useAuth()
  const [plants, setPlants] = useState([])
  const [filteredPlants, setFilteredPlants] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState("")
  const [sortOption, setSortOption] = useState("date_added")
  const [sortDirection, setSortDirection] = useState("desc")

  // Modal state
  const [isRemoveModalOpen, setIsRemoveModalOpen] = useState(false)
  const [plantToRemove, setPlantToRemove] = useState(null)
  const [isRemoving, setIsRemoving] = useState(false)

  // Fetch plants from supabase
  useEffect(() => {
    const fetchPlants = async () => {
      if (!currentUser) return

      try {
        setIsLoading(true)

        const { data, error } = await supabase.from("myplants").select("*").eq("user_id", currentUser.id)

        if (error) throw error

        setPlants(data || [])
      } catch (error) {
        console.error("Error fetching plants:", error)
        toast.error("Failed to load your plant collection")
      } finally {
        setIsLoading(false)
      }
    }

    fetchPlants()
  }, [currentUser])

  // Filter and sort plants based on search query and sort options
  useEffect(() => {
    let result = [...plants]

    // Apply search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      result = result.filter(
        (plant) => plant.common_name?.toLowerCase().includes(query) || plant.plant_type?.toLowerCase().includes(query),
      )
    }

    // Apply sorting
    result.sort((a, b) => {
      let comparison = 0

      switch (sortOption) {
        case "name":
          comparison = (a.common_name || "").localeCompare(b.common_name || "")
          break
        case "type":
          comparison = (a.plant_type || "").localeCompare(b.plant_type || "")
          break
        case "date_added":
        default:
          comparison = new Date(a.created_at) - new Date(b.created_at)
          break
      }

      return sortDirection === "asc" ? comparison : -comparison
    })

    setFilteredPlants(result)
  }, [plants, searchQuery, sortOption, sortDirection])

  // Handle plant removal
  const handleRemovePlant = (plant) => {
    setPlantToRemove(plant)
    setIsRemoveModalOpen(true)
  }

  const confirmRemovePlant = async () => {
    if (!plantToRemove) return

    try {
      setIsRemoving(true)
      await removePlantFromCollection(plantToRemove.plant_id, currentUser.id)

      // Update local state
      setPlants(plants.filter((p) => p.id !== plantToRemove.id))
      toast.success(`${plantToRemove.common_name} removed from your collection`)

      // Close modal
      setIsRemoveModalOpen(false)
      setPlantToRemove(null)
    } catch (error) {
      console.error("Error removing plant:", error)
      toast.error("Failed to remove plant from collection")
    } finally {
      setIsRemoving(false)
    }
  }

  if (isLoading) {
    return <LoadingPlantCollection />
  }

  return (
    <div className="space-y-6">
      <MyPlantsHeader
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        totalPlants={plants.length}
        sortOption={sortOption}
        setSortOption={setSortOption}
        sortDirection={sortDirection}
        setSortDirection={setSortDirection}
      />

      <AnimatePresence mode="wait">
        {filteredPlants.length > 0 ? (
          <PlantCollectionGrid plants={filteredPlants} onRemovePlant={handleRemovePlant} />
        ) : (
          <EmptyPlantCollection isSearching={searchQuery.length > 0} searchQuery={searchQuery} />
        )}
      </AnimatePresence>

      {/* Remove confirmation modal */}
      <RemoveConfirmationModal
        isOpen={isRemoveModalOpen}
        onClose={() => setIsRemoveModalOpen(false)}
        onConfirm={confirmRemovePlant}
        plantName={plantToRemove?.common_name || "this plant"}
        isRemoving={isRemoving}
      />
    </div>
  )
}

export default MyPlants
