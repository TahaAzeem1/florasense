import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Plus, Check, Leaf, X } from 'lucide-react';

const CollectionButton = ({ 
  plant, 
  isInCollection, 
  isAddingToCollection,
  isRemovingFromCollection, 
  onAddToCollection,
  onRemoveFromCollection 
}) => {
  if (isInCollection) {
    return (
      <motion.button
        className="flex items-center px-3 sm:px-4 py-2 bg-primary-100 text-primary-700 rounded-lg group hover:bg-red-100 hover:text-red-700 transition-colors relative"
        initial={{ scale: 0.9 }}
        animate={{ scale: 1 }}
        onClick={() => onRemoveFromCollection(plant)}
        disabled={isRemovingFromCollection}
      >
        {isRemovingFromCollection ? (
          <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-current mr-2" />
        ) : (
          <>
            <div className="relative w-5 h-5 mr-2">
              <Check className="group-hover:hidden" />
              <X className="hidden group-hover:block" />
            </div>
            <div className="w-[80px] sm:w-[100px] text-center">
              <span className="group-hover:hidden">
                <span className="hidden sm:inline">In Collection</span>
                <span className="sm:hidden">Saved</span>
              </span>
              <span className="hidden group-hover:block">Remove</span>
            </div>
          </>
        )}
      </motion.button>
    );
  }

  return (
    <motion.button
      onClick={() => onAddToCollection(plant)}
      disabled={isAddingToCollection}
      className="flex items-center px-3 sm:px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 disabled:opacity-50"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      {isAddingToCollection ? (
        <div className="flex items-center">
          <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2" />
          <span className="sm:hidden">Adding</span>
          <span className="hidden sm:inline">Adding...</span>
        </div>
      ) : (
        <>
          <Plus className="w-5 h-5 mr-2" />
          <span className="sm:hidden">Add</span>
          <span className="hidden sm:inline">Add to Collection</span>
        </>
      )}
    </motion.button>
  );
};

const PlantHeader = ({
  plant,
  isInCollection,
  isAddingToCollection,
  isRemovingFromCollection,
  currentUser,
  onAddToCollection,
  onRemoveFromCollection
}) => {
  const scientificName = Array.isArray(plant.scientific_name)
    ? plant.scientific_name[0]
    : plant.scientific_name || "Unknown";

  return (
    <div className="relative mb-8">
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="relative h-[400px] md:h-[500px] rounded-2xl overflow-hidden shadow-xl"
      >
        {plant.default_image?.original_url ? (
          <img
            src={plant.default_image.original_url}
            alt={plant.common_name}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-primary-100 to-primary-300 flex items-center justify-center">
            <Leaf className="w-24 h-24 text-primary-600 opacity-50" />
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />

        <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            <div className="flex justify-between items-end">
              <div>
                <h1 className="text-3xl md:text-4xl font-bold mb-2">
                  {plant.common_name}
                </h1>
                <p className="text-xl italic text-primary-200">
                  {scientificName}
                </p>
              </div>
              {currentUser && (
                <CollectionButton
                  plant={plant}
                  isInCollection={isInCollection}
                  isAddingToCollection={isAddingToCollection}
                  isRemovingFromCollection={isRemovingFromCollection}
                  onAddToCollection={onAddToCollection}
                  onRemoveFromCollection={onRemoveFromCollection}
                />
              )}
            </div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default PlantHeader;