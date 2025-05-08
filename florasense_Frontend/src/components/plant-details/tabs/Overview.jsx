import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const Overview = ({ plant }) => {
  const safeArray = (array, defaultValue = []) => {
    return Array.isArray(array) && array.length > 0 ? array : defaultValue;
  };

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key="overview"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        transition={{ duration: 0.3 }}
        className="space-y-6"
      >
        {plant.description && (
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-2">
              Description
            </h3>
            <p className="text-gray-700 leading-relaxed">
              {plant.description}
            </p>
          </div>
        )}

        {safeArray(plant.other_name).length > 0 && (
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-2">
              Other Names
            </h3>
            <div className="flex flex-wrap gap-2">
              {plant.other_name.map((name) => (
                <span
                  key={name}
                  className="px-3 py-1 bg-primary-100 text-primary-700 rounded-full text-sm"
                >
                  {name}
                </span>
              ))}
            </div>
          </div>
        )}

        {safeArray(plant.attracts).length > 0 && (
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-2">
              Attracts
            </h3>
            <div className="flex flex-wrap gap-2">
              {plant.attracts.map((animal) => (
                <span
                  key={animal}
                  className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm capitalize"
                >
                  {animal}
                </span>
              ))}
            </div>
          </div>
        )}

        {safeArray(plant.plant_anatomy).length > 0 && (
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-2">
              Plant Anatomy
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {plant.plant_anatomy.map((part) => (
                <div
                  key={part.part}
                  className="bg-gray-50 p-4 rounded-lg"
                >
                  <h4 className="font-medium text-gray-800 capitalize mb-1">
                    {part.part}
                  </h4>
                  {safeArray(part.color).length > 0 && (
                    <div className="flex flex-wrap gap-1">
                      {part.color.map((color) => (
                        <span
                          key={color}
                          className="px-2 py-0.5 bg-white text-gray-700 rounded text-xs capitalize"
                        >
                          {color.replace("-", " ")}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {plant.dimensions && (
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-2">
              Dimensions
            </h3>
            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="text-gray-700">
                {plant.dimensions.min_value &&
                plant.dimensions.max_value ? (
                  <>
                    {plant.dimensions.min_value} -{" "}
                    {plant.dimensions.max_value}{" "}
                    {plant.dimensions.unit || "units"}
                  </>
                ) : plant.dimensions.min_value ? (
                  <>
                    Minimum: {plant.dimensions.min_value}{" "}
                    {plant.dimensions.unit || "units"}
                  </>
                ) : plant.dimensions.max_value ? (
                  <>
                    Maximum: {plant.dimensions.max_value}{" "}
                    {plant.dimensions.unit || "units"}
                  </>
                ) : (
                  "Dimensions not specified"
                )}
              </p>
            </div>
          </div>
        )}
      </motion.div>
    </AnimatePresence>
  );
};

export default Overview;