
import React, { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { AlertTriangle } from "lucide-react";
import PlantDetailsShimmer from "../components/plant-details/PlantDetailsShimmer";
import PlantCareGuide from "../components/plant-details/PlantCareGuide";
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';
import { addPlantToCollection, checkPlantInCollection, removePlantFromCollection } from '../services/myPlantCollection';

// Import components
import PlantHeader from '../components/plant-details/PlantHeader';
import QuickFacts from '../components/plant-details/QuickFacts';
import CareGuideButton from '../components/plant-details/CareGuideButton';
import Characteristics from '../components/plant-details/Characteristics';
import TabContent from '../components/plant-details/TabContent';

const PlantDetails = () => {
  const { id } = useParams();
  const { currentUser } = useAuth();
  const [plant, setPlant] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showCareGuide, setShowCareGuide] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);
  const [activeTab, setActiveTab] = useState(0);
  const detailsRef = useRef(null);
  const [isAddingToCollection, setIsAddingToCollection] = useState(false);
  const [isInCollection, setIsInCollection] = useState(false);
  const [isRemovingFromCollection, setIsRemovingFromCollection] = useState(false);

  const fetchPlantDetails = async (id) => {
    try {
      if (!id) throw new Error("Plant ID is required");

      setLoading(true);
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/api/getPlantDetails/${id}`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch plant details");
      }

      const data = await response.json();
      const plantData = Array.isArray(data) ? data[0] : data;
      setPlant(plantData);
      return plantData;
    } catch (error) {
      console.error("Error fetching plant details:", error.message);
      return null;
    } finally {
      setLoading(false);
    }
  };

  const handleAddToCollection = async (plant) => {
    try {
      setIsAddingToCollection(true);
      await addPlantToCollection(plant, currentUser.id);
      setIsInCollection(true);
      toast.success('Plant added to your collection!');
    } catch (error) {
      console.error('Error adding plant to collection:', error);
      toast.error('Failed to add plant to collection');
    } finally {
      setIsAddingToCollection(false);
    }
  };

  const handleRemoveFromCollection = async (plant) => {
    try {
      setIsRemovingFromCollection(true);
      await removePlantFromCollection(plant.id.toString(), currentUser.id);
      setIsInCollection(false);
      toast.success('Plant removed from your collection');
    } catch (error) {
      console.error('Error removing plant from collection:', error);
      toast.error('Failed to remove plant from collection');
    } finally {
      setIsRemovingFromCollection(false);
    }
  };

  useEffect(() => {
    fetchPlantDetails(id);
    setShowCareGuide(false);
    setActiveTab(0);

    const checkFavorite = () => {
      const savedPlants = localStorage.getItem("favoritePlants");
      if (savedPlants) {
        const favorites = JSON.parse(savedPlants);
        setIsFavorite(favorites.includes(id));
      }
    };

    checkFavorite();
    if (currentUser) {
      checkPlantInCollection(id, currentUser.id)
        .then(setIsInCollection)
        .catch(console.error);
    }
  }, [id, currentUser]);

  if (loading) return <PlantDetailsShimmer />;
  if (!plant)
    return (
      <div className="max-w-7xl mx-auto px-4 py-16 text-center">
        <AlertTriangle className="w-16 h-16 mx-auto text-yellow-500 mb-4" />
        <h2 className="text-2xl font-bold text-gray-800 mb-2">
          Plant Not Found
        </h2>
        <p className="text-gray-600">
          We couldn't find the plant you're looking for.
        </p>
      </div>
    );

  return (
    <motion.div
      ref={detailsRef}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="max-w-7xl mx-auto px-4 py-8"
    >
      <PlantHeader
        plant={plant}
        isInCollection={isInCollection}
        isAddingToCollection={isAddingToCollection}
        isRemovingFromCollection={isRemovingFromCollection}
        currentUser={currentUser}
        onAddToCollection={handleAddToCollection}
        onRemoveFromCollection={handleRemoveFromCollection}
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <motion.div
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="lg:col-span-1 space-y-6"
        >
          <QuickFacts plant={plant} />
          <CareGuideButton
            plant={plant}
            onGenerateGuide={() => setShowCareGuide(true)}
          />
          <Characteristics plant={plant} />
        </motion.div>

        <motion.div
          initial={{ x: 20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="lg:col-span-2"
        >
          <TabContent
            plant={plant}
            activeTab={activeTab}
            setActiveTab={setActiveTab}
          />
        </motion.div>
      </div>

      {showCareGuide && (
        <PlantCareGuide
          plant={plant}
          onClose={() => setShowCareGuide(false)}
        />
      )}
    </motion.div>
  );
};

export default PlantDetails;