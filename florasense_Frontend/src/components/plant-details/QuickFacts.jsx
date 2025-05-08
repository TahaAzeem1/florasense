import React from 'react';
import { Info, Leaf, Sprout, Calendar, Thermometer } from 'lucide-react';
import { motion } from 'framer-motion';

const QuickFacts = ({ plant }) => {
  const safeValue = (value, defaultValue = "Not specified") => {
    return value !== null && value !== undefined && value !== ""
      ? value
      : defaultValue;
  };

  return (
    <div className="bg-white rounded-xl shadow-md p-6">
      <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
        <Info className="w-5 h-5 mr-2 text-primary-500" />
        Quick Facts
      </h2>

      <div className="space-y-4">
        {[
          {
            label: "Type",
            value: safeValue(plant.type),
            icon: Leaf,
          },
          {
            label: "Family",
            value: safeValue(plant.family),
            icon: Sprout,
          },
          {
            label: "Cycle",
            value: safeValue(plant.cycle),
            icon: Calendar,
          },
          {
            label: "Care Level",
            value: safeValue(plant.care_level),
            icon: Thermometer,
          },
        ].map(({ label, value, icon: Icon }) => (
          <div key={label} className="flex items-center">
            <div className="bg-primary-100 p-2 rounded-lg mr-3">
              <Icon className="w-5 h-5 text-primary-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">{label}</p>
              <p className="font-medium text-gray-800 capitalize">
                {value}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default QuickFacts;