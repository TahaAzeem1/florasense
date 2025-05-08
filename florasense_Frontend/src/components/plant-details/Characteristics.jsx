import React from 'react';
import { Leaf, Check, X, Flower, AlertTriangle } from 'lucide-react';

const Characteristics = ({ plant }) => {
  const formatBoolean = (value) => {
    if (value === true) return "Yes";
    if (value === false) return "No";
    return "Not specified";
  };

  return (
    <div className="bg-white rounded-xl shadow-md p-6">
      <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
        <Leaf className="w-5 h-5 mr-2 text-primary-500" />
        Characteristics
      </h2>

      <div className="space-y-3">
        {[
          {
            label: "Flowers",
            value: formatBoolean(plant.flowers),
            icon: Flower,
            color: plant.flowers
              ? "text-pink-500 bg-pink-100"
              : "text-gray-500 bg-gray-100",
          },
          {
            label: "Edible",
            value: formatBoolean(plant.edible_leaf || plant.edible_fruit),
            icon: plant.edible_leaf || plant.edible_fruit ? Check : X,
            color:
              plant.edible_leaf || plant.edible_fruit
                ? "text-green-500 bg-green-100"
                : "text-gray-500 bg-gray-100",
          },
          {
            label: "Medicinal",
            value: formatBoolean(plant.medicinal),
            icon: plant.medicinal ? Check : X,
            color: plant.medicinal
              ? "text-blue-500 bg-blue-100"
              : "text-gray-500 bg-gray-100",
          },
          {
            label: "Poisonous",
            value: formatBoolean(
              plant.poisonous_to_humans || plant.poisonous_to_pets
            ),
            icon:
              plant.poisonous_to_humans || plant.poisonous_to_pets
                ? AlertTriangle
                : Check,
            color:
              plant.poisonous_to_humans || plant.poisonous_to_pets
                ? "text-red-500 bg-red-100"
                : "text-green-500 bg-green-100",
          },
          {
            label: "Indoor",
            value: formatBoolean(plant.indoor),
            icon: plant.indoor ? Check : X,
            color: plant.indoor
              ? "text-purple-500 bg-purple-100"
              : "text-gray-500 bg-gray-100",
          },
        ].map(({ label, value, icon: Icon, color }) => (
          <div key={label} className="flex items-center justify-between">
            <span className="text-gray-700">{label}</span>
            <div
              className={`flex items-center px-3 py-1 rounded-full ${color}`}
            >
              <Icon className="w-4 h-4 mr-1" />
              <span className="text-sm font-medium">{value}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Characteristics;