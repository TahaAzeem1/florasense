import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sun, Thermometer, Wind, Droplet, Scissors, Bug } from 'lucide-react';

const Care = ({ plant }) => {
  const getTemperatureRange = (plant) => {
    if (plant.temperature_minimum?.celsius) {
      const max = plant.temperature_maximum?.celsius || Math.min(
        plant.temperature_minimum.celsius + 15,
        30
      );
      return `${plant.temperature_minimum.celsius}°C to ${max}°C`;
    }

    const analyzerText = [
      plant.category,
      plant.family,
      plant.common_name,
      plant.origin
    ].join(' ').toLowerCase();

    const coldHardyKeywords = [
      'alpine', 'arctic', 'mountain', 'hardy', 'cedar', 'spruce',
      'pine', 'juniper', 'frost', 'winter', 'cool', 'shade'
    ];

    const tropicalKeywords = [
      'tropical', 'jungle', 'rainforest', 'palm', 'banana',
      'hibiscus', 'orchid', 'bromeliad', 'humid', 'warm'
    ];

    const desertKeywords = [
      'cactus', 'succulent', 'desert', 'arid', 'drought',
      'agave', 'aloe', 'sahara', 'mexican', 'australian'
    ];

    if (tropicalKeywords.some(kw => analyzerText.includes(kw))) {
      return '🌡️ 18°C to 30°C (Warm tropical)';
    }
    if (desertKeywords.some(kw => analyzerText.includes(kw))) {
      return '🌵 10°C to 35°C (Desert tolerant)';
    }
    if (coldHardyKeywords.some(kw => analyzerText.includes(kw))) {
      return '❄️ -5°C to 25°C (Cold hardy)';
    }

    return plant.category?.toLowerCase().includes('fern')
      ? '🌿 15°C to 25°C (Moderate-cool)'
      : '🌱 10°C to 28°C (Moderate)';
  };

  const determineHumidityPreference = (plant) => {
    const containsKeyword = (text, keywords) =>
      (text || "")
        .toLowerCase()
        .split(/\s+/)
        .some((word) => keywords.some((kw) => word.includes(kw)));

    const lowHumidityKeywords = [
      "cactus", "succulent", "desert", "arid", "drought",
      "sand", "rock", "aloe", "agave", "sedum",
      "echeveria", "sempervivum", "crassula", "haworthia", "sansevieria",
    ];

    const highHumidityKeywords = [
      "tropical", "rainforest", "jungle", "fern", "moss",
      "orchid", "bromeliad", "fiddle", "calathea", "maranta",
      "alocasia", "philodendron", "monstera", "anthurium",
    ];

    if (plant.humidity && plant.humidity !== "null") {
      return plant.humidity;
    }

    if (plant.category) {
      const category = plant.category.toLowerCase();
      if (containsKeyword(category, lowHumidityKeywords)) {
        return "Low humidity preferred";
      }
      if (containsKeyword(category, highHumidityKeywords)) {
        return "High humidity preferred";
      }
    }

    if (plant.common_name) {
      if (containsKeyword(plant.common_name, lowHumidityKeywords)) {
        return "Low humidity preferred";
      }
      if (containsKeyword(plant.common_name, highHumidityKeywords)) {
        return "High humidity preferred";
      }
    }

    return "Moderate humidity";
  };

  const safeArray = (array, defaultValue = []) => {
    return Array.isArray(array) && array.length > 0 ? array : defaultValue;
  };

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key="care"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        transition={{ duration: 0.3 }}
        className="space-y-6"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {safeArray(plant.sunlight).length > 0 && (
            <div className="bg-yellow-50 p-5 rounded-xl">
              <div className="flex items-center mb-3">
                <Sun className="w-5 h-5 text-yellow-600 mr-2" />
                <h3 className="font-semibold text-yellow-800">
                  Sunlight
                </h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {plant.sunlight.map((sun) => (
                  <span
                    key={sun}
                    className="px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full text-sm"
                  >
                    {sun}
                  </span>
                ))}
              </div>
            </div>
          )}
          <div className="bg-purple-50 p-5 rounded-xl">
            <div className="flex items-center mb-3">
              <Thermometer className="w-5 h-5 text-purple-600 mr-2" />
              <h3 className="font-semibold text-purple-800">
                Temperature
              </h3>
            </div>
            <p className="text-purple-800">
              {getTemperatureRange(plant)}
            </p>
          </div>

          <div className="bg-green-50 p-5 rounded-xl">
            <div className="flex items-center mb-3">
              <Wind className="w-5 h-5 text-green-600 mr-2" />
              <h3 className="font-semibold text-green-800">
                Humidity
              </h3>
            </div>
            <p className="text-green-800">
              {determineHumidityPreference(plant)}
            </p>
          </div>
          {plant.watering && (
            <div className="bg-blue-50 p-5 rounded-xl">
              <div className="flex items-center mb-3">
                <Droplet className="w-5 h-5 text-blue-600 mr-2" />
                <h3 className="font-semibold text-blue-800">
                  Watering
                </h3>
              </div>
              <p className="text-blue-800 mb-2">
                {plant.watering}
              </p>
              {plant.watering_general_benchmark && (
                <div className="bg-blue-100/50 px-3 py-2 rounded-lg inline-block">
                  <p className="text-sm text-blue-700">
                    Every {plant.watering_general_benchmark.value}{" "}
                    {plant.watering_general_benchmark.unit}
                  </p>
                </div>
              )}
            </div>
          )}

          <div className="bg-green-50 p-5 rounded-xl">
            <div className="flex items-center mb-3">
              <Scissors className="w-5 h-5 text-green-600 mr-2" />
              <h3 className="font-semibold text-green-800">
                Maintenance
              </h3>
            </div>
            <p className="text-green-800 mb-2">
              {plant.maintenance || "Not specified"}
            </p>

            {safeArray(plant.pruning_month).length > 0 && (
              <div className="mt-2">
                <p className="text-sm text-green-700 mb-1">
                  Pruning Months:
                </p>
                <div className="flex flex-wrap gap-1">
                  {plant.pruning_month.map((month, index) => (
                    <span
                      key={index}
                      className="px-2 py-0.5 bg-green-100 text-green-800 rounded text-xs"
                    >
                      {month}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {plant.pruning_count?.amount &&
              plant.pruning_count?.interval && (
                <div className="bg-green-100/50 px-3 py-2 rounded-lg inline-block mt-2">
                  <p className="text-sm text-green-700">
                    {plant.pruning_count.amount} time(s){" "}
                    {plant.pruning_count.interval}
                  </p>
                </div>
              )}
          </div>

          <div className="bg-amber-50 p-5 rounded-xl">
            <div className="flex items-center mb-3">
              <Bug className="w-5 h-5 text-amber-600 mr-2" />
              <h3 className="font-semibold text-amber-800">
                Pest Susceptibility
              </h3>
            </div>
            <p className="text-amber-800">
              {plant.pest_susceptibility
                ? plant.pest_susceptibility
                : "Information not available"}
            </p>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default Care;