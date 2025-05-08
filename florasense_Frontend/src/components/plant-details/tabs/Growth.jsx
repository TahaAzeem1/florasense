import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Zap, Thermometer, Sprout, Leaf } from 'lucide-react';

const Growth = ({ plant }) => {
  const safeValue = (value, defaultValue = "Not specified") => {
    return value !== null && value !== undefined && value !== ""
      ? value
      : defaultValue;
  };

  const safeArray = (array, defaultValue = []) => {
    return Array.isArray(array) && array.length > 0 ? array : defaultValue;
  };

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key="growth"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        transition={{ duration: 0.3 }}
        className="space-y-6"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-primary-50 p-5 rounded-xl">
            <div className="flex items-center mb-3">
              <Zap className="w-5 h-5 text-primary-600 mr-2" />
              <h3 className="font-semibold text-primary-800">
                Growth Rate
              </h3>
            </div>
            <p className="text-primary-700">
              {safeValue(plant.growth_rate)}
            </p>
          </div>

          {plant.hardiness && (
            <div className="bg-primary-50 p-5 rounded-xl">
              <div className="flex items-center mb-3">
                <Thermometer className="w-5 h-5 text-primary-600 mr-2" />
                <h3 className="font-semibold text-primary-800">
                  Hardiness Zone
                </h3>
              </div>
              <p className="text-primary-700">
                {plant.hardiness.min && plant.hardiness.max ? (
                  <>
                    Zone {plant.hardiness.min} to{" "}
                    {plant.hardiness.max}
                  </>
                ) : plant.hardiness.min ? (
                  <>From Zone {plant.hardiness.min}</>
                ) : plant.hardiness.max ? (
                  <>Up to Zone {plant.hardiness.max}</>
                ) : (
                  "Not specified"
                )}
              </p>
            </div>
          )}

          {safeArray(plant.propagation).length > 0 && (
            <div className="bg-primary-50 p-5 rounded-xl">
              <div className="flex items-center mb-3">
                <Sprout className="w-5 h-5 text-primary-600 mr-2" />
                <h3 className="font-semibold text-primary-800">
                  Propagation
                </h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {plant.propagation.map((method) => (
                  <span
                    key={method}
                    className="px-3 py-1 bg-primary-100 text-primary-700 rounded-full text-sm capitalize"
                  >
                    {method}
                  </span>
                ))}
              </div>
            </div>
          )}

          <div className="bg-primary-50 p-5 rounded-xl">
            <div className="flex items-center mb-3">
              <Leaf className="w-5 h-5 text-primary-600 mr-2" />
              <h3 className="font-semibold text-primary-800">
                Soil
              </h3>
            </div>
            {safeArray(plant.soil).length > 0 ? (
              <div className="flex flex-wrap gap-2">
                {plant.soil.map((type) => (
                  <span
                    key={type}
                    className="px-3 py-1 bg-primary-100 text-primary-700 rounded-full text-sm capitalize"
                  >
                    {type}
                  </span>
                ))}
              </div>
            ) : (
              <p className="text-primary-700">
                Soil information not available
              </p>
            )}
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default Growth;