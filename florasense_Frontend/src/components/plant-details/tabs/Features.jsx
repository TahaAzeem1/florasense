import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const Features = ({ plant }) => {
  const formatBoolean = (value) => {
    if (value === true) return "Yes";
    if (value === false) return "No";
    return "Not specified";
  };

  const safeValue = (value, defaultValue = "Not specified") => {
    return value !== null && value !== undefined && value !== ""
      ? value
      : defaultValue;
  };

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key="features"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        transition={{ duration: 0.3 }}
        className="space-y-6"
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {[
            {
              label: "Flowers",
              value: formatBoolean(plant.flowers),
              color: plant.flowers
                ? "bg-pink-50 border-pink-200"
                : "bg-gray-50 border-gray-200",
            },
            {
              label: "Flowering Season",
              value: safeValue(plant.flowering_season),
              color: "bg-pink-50 border-pink-200",
            },
            {
              label: "Fruits",
              value: formatBoolean(plant.fruits),
              color: plant.fruits
                ? "bg-orange-50 border-orange-200"
                : "bg-gray-50 border-gray-200",
            },
            {
              label: "Edible Fruit",
              value: formatBoolean(plant.edible_fruit),
              color: plant.edible_fruit
                ? "bg-orange-50 border-orange-200"
                : "bg-gray-50 border-gray-200",
            },
            {
              label: "Fruiting Season",
              value: safeValue(plant.fruiting_season),
              color: "bg-orange-50 border-orange-200",
            },
            {
              label: "Harvest Season",
              value: safeValue(plant.harvest_season),
              color: "bg-yellow-50 border-yellow-200",
            },
            {
              label: "Harvest Method",
              value: safeValue(plant.harvest_method),
              color: "bg-yellow-50 border-yellow-200",
            },
            {
              label: "Edible Leaf",
              value: formatBoolean(plant.edible_leaf),
              color: plant.edible_leaf
                ? "bg-green-50 border-green-200"
                : "bg-gray-50 border-gray-200",
            },
            {
              label: "Medicinal",
              value: formatBoolean(plant.medicinal),
              color: plant.medicinal
                ? "bg-blue-50 border-blue-200"
                : "bg-gray-50 border-gray-200",
            },
            {
              label: "Poisonous to Humans",
              value: formatBoolean(plant.poisonous_to_humans),
              color: plant.poisonous_to_humans
                ? "bg-red-50 border-red-200"
                : "bg-green-50 border-green-200",
            },
            {
              label: "Poisonous to Pets",
              value: formatBoolean(plant.poisonous_to_pets),
              color: plant.poisonous_to_pets
                ? "bg-red-50 border-red-200"
                : "bg-green-50 border-green-200",
            },
            {
              label: "Drought Tolerant",
              value: formatBoolean(plant.drought_tolerant),
              color: plant.drought_tolerant
                ? "bg-amber-50 border-amber-200"
                : "bg-gray-50 border-gray-200",
            },
            {
              label: "Salt Tolerant",
              value: formatBoolean(plant.salt_tolerant),
              color: plant.salt_tolerant
                ? "bg-blue-50 border-blue-200"
                : "bg-gray-50 border-gray-200",
            },
            {
              label: "Thorny",
              value: formatBoolean(plant.thorny),
              color: plant.thorny
                ? "bg-red-50 border-red-200"
                : "bg-green-50 border-green-200",
            },
            {
              label: "Invasive",
              value: formatBoolean(plant.invasive),
              color: plant.invasive
                ? "bg-red-50 border-red-200"
                : "bg-green-50 border-green-200",
            },
            {
              label: "Tropical",
              value: formatBoolean(plant.tropical),
              color: plant.tropical
                ? "bg-teal-50 border-teal-200"
                : "bg-gray-50 border-gray-200",
            },
            {
              label: "Indoor",
              value: formatBoolean(plant.indoor),
              color: plant.indoor
                ? "bg-purple-50 border-purple-200"
                : "bg-gray-50 border-gray-200",
            },
            {
              label: "Rare",
              value: formatBoolean(plant.rare),
              color: plant.rare
                ? "bg-indigo-50 border-indigo-200"
                : "bg-gray-50 border-gray-200",
            },
          ].map(({ label, value, color }) => (
            <div
              key={label}
              className={`p-4 rounded-lg border ${color}`}
            >
              <p className="text-sm text-gray-500 mb-1">
                {label}
              </p>
              <p className="font-medium text-gray-800">{value}</p>
            </div>
          ))}
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default Features;