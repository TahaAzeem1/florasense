// "use client"

// import { useState } from "react"
// import { motion } from "framer-motion"
// import { Leaf, TreesIcon as Plant, Sun, Droplet, Thermometer, Wind, HelpCircle, Home, MapPin, Send } from "lucide-react"
// import LoadingSpinner from "../LoadingSpinner"

// const FormField = ({ label, icon: Icon, children, required }) => {
//   return (
//     <div className="mb-6">
//       <label className="block mb-2 text-sm font-medium text-gray-700 flex items-center">
//         <Icon className="h-4 w-4 mr-2 text-primary-500" />
//         {label}
//         {required && <span className="text-red-500 ml-1">*</span>}
//       </label>
//       {children}
//     </div>
//   )
// }

// const CareGuideForm = ({ onSubmit, isSubmitting }) => {
//   const [formData, setFormData] = useState({
//     plantName: "",
//     plantType: "",
//     growingEnvironment: "indoor",
//     lightCondition: "",
//     wateringFrequency: "",
//     temperature: "",
//     humidity: "",
//     region: "",
//     specificConcerns: "",
//     experienceLevel: "beginner",
//   })

//   const [errors, setErrors] = useState({})

//   const handleChange = (e) => {
//     const { name, value } = e.target
//     setFormData((prev) => ({
//       ...prev,
//       [name]: value,
//     }))

//     // Clear error when field is edited
//     if (errors[name]) {
//       setErrors((prev) => ({
//         ...prev,
//         [name]: "",
//       }))
//     }
//   }

//   const validateForm = () => {
//     const newErrors = {}
//     if (!formData.plantName.trim()) newErrors.plantName = "Plant name is required"
//     if (!formData.plantType.trim()) newErrors.plantType = "Plant type is required"
//     if (!formData.lightCondition) newErrors.lightCondition = "Light condition is required"
//     if (!formData.wateringFrequency) newErrors.wateringFrequency = "Watering frequency is required"

//     setErrors(newErrors)
//     return Object.keys(newErrors).length === 0
//   }

//   const handleSubmit = (e) => {
//     e.preventDefault()
//     if (validateForm()) {
//       onSubmit(formData)
//     }
//   }

//   return (
//     <form onSubmit={handleSubmit}>
//       <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6">
//         <FormField label="Plant Name" icon={Leaf} required>
//           <input
//             type="text"
//             name="plantName"
//             value={formData.plantName}
//             onChange={handleChange}
//             placeholder="e.g., Monstera Deliciosa"
//             className={`w-full px-4 py-2 rounded-lg border ${
//               errors.plantName ? "border-red-500" : "border-gray-300"
//             } focus:outline-none focus:ring-2 focus:ring-primary-500`}
//           />
//           {errors.plantName && <p className="mt-1 text-sm text-red-500">{errors.plantName}</p>}
//         </FormField>

//         <FormField label="Plant Type/Species" icon={Plant} required>
//           <input
//             type="text"
//             name="plantType"
//             value={formData.plantType}
//             onChange={handleChange}
//             placeholder="e.g., Tropical Houseplant"
//             className={`w-full px-4 py-2 rounded-lg border ${
//               errors.plantType ? "border-red-500" : "border-gray-300"
//             } focus:outline-none focus:ring-2 focus:ring-primary-500`}
//           />
//           {errors.plantType && <p className="mt-1 text-sm text-red-500">{errors.plantType}</p>}
//         </FormField>

//         <FormField label="Growing Environment" icon={Home}>
//           <div className="flex space-x-4">
//             <label className="flex items-center">
//               <input
//                 type="radio"
//                 name="growingEnvironment"
//                 value="indoor"
//                 checked={formData.growingEnvironment === "indoor"}
//                 onChange={handleChange}
//                 className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300"
//               />
//               <span className="ml-2 text-gray-700">Indoor</span>
//             </label>
//             <label className="flex items-center">
//               <input
//                 type="radio"
//                 name="growingEnvironment"
//                 value="outdoor"
//                 checked={formData.growingEnvironment === "outdoor"}
//                 onChange={handleChange}
//                 className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300"
//               />
//               <span className="ml-2 text-gray-700">Outdoor</span>
//             </label>
//           </div>
//         </FormField>

//         <FormField label="Region/Climate" icon={MapPin}>
//           <input
//             type="text"
//             name="region"
//             value={formData.region}
//             onChange={handleChange}
//             placeholder="e.g., Tropical, Mediterranean"
//             className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary-500"
//           />
//         </FormField>

//         <FormField label="Light Conditions" icon={Sun} required>
//           <select
//             name="lightCondition"
//             value={formData.lightCondition}
//             onChange={handleChange}
//             className={`w-full px-4 py-2 rounded-lg border ${
//               errors.lightCondition ? "border-red-500" : "border-gray-300"
//             } focus:outline-none focus:ring-2 focus:ring-primary-500`}
//           >
//             <option value="">Select light condition</option>
//             <option value="Full sun">Full sun</option>
//             <option value="Partial sun">Partial sun</option>
//             <option value="Bright indirect light">Bright indirect light</option>
//             <option value="Medium indirect light">Medium indirect light</option>
//             <option value="Low light">Low light</option>
//             <option value="Shade">Shade</option>
//           </select>
//           {errors.lightCondition && <p className="mt-1 text-sm text-red-500">{errors.lightCondition}</p>}
//         </FormField>

//         <FormField label="Watering Frequency" icon={Droplet} required>
//           <select
//             name="wateringFrequency"
//             value={formData.wateringFrequency}
//             onChange={handleChange}
//             className={`w-full px-4 py-2 rounded-lg border ${
//               errors.wateringFrequency ? "border-red-500" : "border-gray-300"
//             } focus:outline-none focus:ring-2 focus:ring-primary-500`}
//           >
//             <option value="">Select watering frequency</option>
//             <option value="Daily">Daily</option>
//             <option value="Every 2-3 days">Every 2-3 days</option>
//             <option value="Weekly">Weekly</option>
//             <option value="Every 2 weeks">Every 2 weeks</option>
//             <option value="Monthly">Monthly</option>
//             <option value="Rarely">Rarely</option>
//             <option value="Not sure">Not sure</option>
//           </select>
//           {errors.wateringFrequency && <p className="mt-1 text-sm text-red-500">{errors.wateringFrequency}</p>}
//         </FormField>

//         <FormField label="Temperature" icon={Thermometer}>
//           <select
//             name="temperature"
//             value={formData.temperature}
//             onChange={handleChange}
//             className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary-500"
//           >
//             <option value="">Select temperature range</option>
//             <option value="Cold (Below 10°C/50°F)">Cold (Below 10°C/50°F)</option>
//             <option value="Cool (10-18°C/50-65°F)">Cool (10-18°C/50-65°F)</option>
//             <option value="Average (18-24°C/65-75°F)">Average (18-24°C/65-75°F)</option>
//             <option value="Warm (24-29°C/75-85°F)">Warm (24-29°C/75-85°F)</option>
//             <option value="Hot (Above 29°C/85°F)">Hot (Above 29°C/85°F)</option>
//           </select>
//         </FormField>

//         <FormField label="Humidity" icon={Wind}>
//           <select
//             name="humidity"
//             value={formData.humidity}
//             onChange={handleChange}
//             className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary-500"
//           >
//             <option value="">Select humidity level</option>
//             <option value="Very low">Very low (Desert-like)</option>
//             <option value="Low">Low (Dry indoor air)</option>
//             <option value="Average">Average (Normal indoor air)</option>
//             <option value="High">High (Bathroom/kitchen level)</option>
//             <option value="Very high">Very high (Terrarium/greenhouse)</option>
//           </select>
//         </FormField>
//       </div>

//       <FormField label="Experience Level" icon={HelpCircle}>
//         <div className="flex flex-wrap gap-2">
//           {["beginner", "intermediate", "experienced"].map((level) => (
//             <label
//               key={level}
//               className={`px-4 py-2 rounded-lg border cursor-pointer transition-colors ${
//                 formData.experienceLevel === level
//                   ? "bg-primary-100 border-primary-300 text-primary-700"
//                   : "bg-white border-gray-300 text-gray-700 hover:bg-gray-50"
//               }`}
//             >
//               <input
//                 type="radio"
//                 name="experienceLevel"
//                 value={level}
//                 checked={formData.experienceLevel === level}
//                 onChange={handleChange}
//                 className="sr-only"
//               />
//               <span className="capitalize">{level}</span>
//             </label>
//           ))}
//         </div>
//       </FormField>

//       <FormField label="Specific Concerns or Questions" icon={HelpCircle}>
//         <textarea
//           name="specificConcerns"
//           value={formData.specificConcerns}
//           onChange={handleChange}
//           placeholder="Any specific issues or questions about your plant? (e.g., yellowing leaves, pest problems)"
//           rows="3"
//           className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary-500"
//         ></textarea>
//       </FormField>

//       <motion.button
//         type="submit"
//         disabled={isSubmitting}
//         className="w-full mt-4 bg-primary-600 text-white py-3 px-6 rounded-lg font-medium flex items-center justify-center hover:bg-primary-700 transition-colors disabled:opacity-70"
//         whileHover={{ scale: 1.02 }}
//         whileTap={{ scale: 0.98 }}
//       >
//         {isSubmitting ? (
//           <div className="flex items-center">
//             <LoadingSpinner />
//             <span className="ml-2">Generating Care Guide...</span>
//           </div>
//         ) : (
//           <div className="flex items-center">
//             <Send className="h-5 w-5 mr-2" />
//             Generate Care Guide
//           </div>
//         )}
//       </motion.button>
//     </form>
//   )
// }

// export default CareGuideForm

"use client"

import { useState, useEffect, useRef } from "react"
import { motion } from "framer-motion"
import {
  Leaf,
  TreesIcon as Plant,
  Sun,
  Droplet,
  Thermometer,
  Wind,
  HelpCircle,
  Home,
  MapPin,
  Send,
  X,
} from "lucide-react"
import LoadingSpinner from "../LoadingSpinner"
import plantDatabase from "../../data/plantDatabase.json"

const FormField = ({ label, icon: Icon, children, required }) => {
  return (
    <div className="mb-6">
      <label className=" mb-2 text-sm font-medium text-gray-700 flex items-center">
        <Icon className="h-4 w-4 mr-2 text-primary-500" />
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>
      {children}
    </div>
  )
}

const CareGuideForm = ({ onSubmit, isSubmitting }) => {
  const [formData, setFormData] = useState({
    plantName: "",
    plantType: "",
    growingEnvironment: "indoor",
    lightCondition: "",
    wateringFrequency: "",
    temperature: "",
    humidity: "",
    region: "",
    specificConcerns: "",
    experienceLevel: "beginner",
  })

  const [errors, setErrors] = useState({})
  const [suggestions, setSuggestions] = useState([])
  const [showSuggestions, setShowSuggestions] = useState(false)
  const suggestionsRef = useRef(null)

  // Close suggestions when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (suggestionsRef.current && !suggestionsRef.current.contains(event.target)) {
        setShowSuggestions(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))

    // Generate suggestions for plant name
    if (name === "plantName") {
      const filteredSuggestions = plantDatabase
        .filter(
          (plant) =>
            plant.commonName.toLowerCase().includes(value.toLowerCase()) ||
            plant.scientificName.toLowerCase().includes(value.toLowerCase()),
        )
        .slice(0, 5) // Limit to 5 suggestions

      setSuggestions(filteredSuggestions)
      setShowSuggestions(filteredSuggestions.length > 0 && value.length > 0)
    }

    // Clear error when field is edited
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }))
    }
  }

  const selectSuggestion = (plant) => {
    setFormData((prev) => ({
      ...prev,
      plantName: plant.commonName,
      plantType: plant.scientificName,
    }))
    setShowSuggestions(false)
  }

  const validateForm = () => {
    const newErrors = {}
    if (!formData.plantName.trim()) newErrors.plantName = "Plant name is required"

    // Type is not required if a name is provided
    if (!formData.plantType.trim() && !formData.plantName.trim()) {
      newErrors.plantType = "Plant type is required if no name is provided"
    }

    if (!formData.lightCondition) newErrors.lightCondition = "Light condition is required"
    if (!formData.wateringFrequency) newErrors.wateringFrequency = "Watering frequency is required"

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (validateForm()) {
      onSubmit(formData)
    }
  }

  const clearPlantName = () => {
    setFormData((prev) => ({
      ...prev,
      plantName: "",
    }))
    setSuggestions([])
    setShowSuggestions(false)
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6">
        <FormField label="Plant Name" icon={Leaf} required>
          <div className="relative">
            <input
              type="text"
              name="plantName"
              value={formData.plantName}
              onChange={handleChange}
              placeholder="e.g., Monstera Deliciosa"
              className={`w-full px-4 py-2 rounded-lg border ${
                errors.plantName ? "border-red-500" : "border-gray-300"
              } focus:outline-none focus:ring-2 focus:ring-primary-500`}
            />
            {formData.plantName && (
              <button
                type="button"
                onClick={clearPlantName}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                <X className="h-4 w-4" />
              </button>
            )}
            {showSuggestions && (
              <div
                ref={suggestionsRef}
                className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-auto"
              >
                {suggestions.map((plant, index) => (
                  <div
                    key={index}
                    className="px-4 py-2 hover:bg-primary-50 cursor-pointer flex flex-col"
                    onClick={() => selectSuggestion(plant)}
                  >
                    <span className="font-medium">{plant.commonName}</span>
                    <span className="text-xs text-gray-500 italic">{plant.scientificName}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
          {errors.plantName && <p className="mt-1 text-sm text-red-500">{errors.plantName}</p>}
        </FormField>

        <FormField label="Plant Type/Species" icon={Plant}>
          <input
            type="text"
            name="plantType"
            value={formData.plantType}
            onChange={handleChange}
            placeholder="e.g., Monstera deliciosa"
            className={`w-full px-4 py-2 rounded-lg border ${
              errors.plantType ? "border-red-500" : "border-gray-300"
            } focus:outline-none focus:ring-2 focus:ring-primary-500`}
          />
          {errors.plantType && <p className="mt-1 text-sm text-red-500">{errors.plantType}</p>}
          <p className="mt-1 text-xs text-gray-500">Scientific name or plant type (optional if name is provided)</p>
        </FormField>

        <FormField label="Growing Environment" icon={Home}>
          <div className="flex space-x-4">
            <label className="flex items-center">
              <input
                type="radio"
                name="growingEnvironment"
                value="indoor"
                checked={formData.growingEnvironment === "indoor"}
                onChange={handleChange}
                className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300"
              />
              <span className="ml-2 text-gray-700">Indoor</span>
            </label>
            <label className="flex items-center">
              <input
                type="radio"
                name="growingEnvironment"
                value="outdoor"
                checked={formData.growingEnvironment === "outdoor"}
                onChange={handleChange}
                className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300"
              />
              <span className="ml-2 text-gray-700">Outdoor</span>
            </label>
          </div>
        </FormField>

        <FormField label="Region/Climate" icon={MapPin}>
          <input
            type="text"
            name="region"
            value={formData.region}
            onChange={handleChange}
            placeholder="e.g., Tropical, Mediterranean"
            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary-500"
          />
        </FormField>

        <FormField label="Light Conditions" icon={Sun} required>
          <select
            name="lightCondition"
            value={formData.lightCondition}
            onChange={handleChange}
            className={`w-full px-4 py-2 rounded-lg border ${
              errors.lightCondition ? "border-red-500" : "border-gray-300"
            } focus:outline-none focus:ring-2 focus:ring-primary-500`}
          >
            <option value="">Select light condition</option>
            <option value="Full sun">Full sun</option>
            <option value="Partial sun">Partial sun</option>
            <option value="Bright indirect light">Bright indirect light</option>
            <option value="Medium indirect light">Medium indirect light</option>
            <option value="Low light">Low light</option>
            <option value="Shade">Shade</option>
          </select>
          {errors.lightCondition && <p className="mt-1 text-sm text-red-500">{errors.lightCondition}</p>}
        </FormField>

        <FormField label="Watering Frequency" icon={Droplet} required>
          <select
            name="wateringFrequency"
            value={formData.wateringFrequency}
            onChange={handleChange}
            className={`w-full px-4 py-2 rounded-lg border ${
              errors.wateringFrequency ? "border-red-500" : "border-gray-300"
            } focus:outline-none focus:ring-2 focus:ring-primary-500`}
          >
            <option value="">Select watering frequency</option>
            <option value="Daily">Daily</option>
            <option value="Every 2-3 days">Every 2-3 days</option>
            <option value="Weekly">Weekly</option>
            <option value="Every 2 weeks">Every 2 weeks</option>
            <option value="Monthly">Monthly</option>
            <option value="Rarely">Rarely</option>
            <option value="Not sure">Not sure</option>
          </select>
          {errors.wateringFrequency && <p className="mt-1 text-sm text-red-500">{errors.wateringFrequency}</p>}
        </FormField>

        <FormField label="Temperature" icon={Thermometer}>
          <select
            name="temperature"
            value={formData.temperature}
            onChange={handleChange}
            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary-500"
          >
            <option value="">Select temperature range</option>
            <option value="Cold (Below 10°C/50°F)">Cold (Below 10°C/50°F)</option>
            <option value="Cool (10-18°C/50-65°F)">Cool (10-18°C/50-65°F)</option>
            <option value="Average (18-24°C/65-75°F)">Average (18-24°C/65-75°F)</option>
            <option value="Warm (24-29°C/75-85°F)">Warm (24-29°C/75-85°F)</option>
            <option value="Hot (Above 29°C/85°F)">Hot (Above 29°C/85°F)</option>
          </select>
        </FormField>

        <FormField label="Humidity" icon={Wind}>
          <select
            name="humidity"
            value={formData.humidity}
            onChange={handleChange}
            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary-500"
          >
            <option value="">Select humidity level</option>
            <option value="Very low">Very low (Desert-like)</option>
            <option value="Low">Low (Dry indoor air)</option>
            <option value="Average">Average (Normal indoor air)</option>
            <option value="High">High (Bathroom/kitchen level)</option>
            <option value="Very high">Very high (Terrarium/greenhouse)</option>
          </select>
        </FormField>
      </div>

      <FormField label="Experience Level" icon={HelpCircle}>
        <div className="flex flex-wrap gap-2">
          {["beginner", "intermediate", "experienced"].map((level) => (
            <label
              key={level}
              className={`px-4 py-2 rounded-lg border cursor-pointer transition-colors ${
                formData.experienceLevel === level
                  ? "bg-primary-100 border-primary-300 text-primary-700"
                  : "bg-white border-gray-300 text-gray-700 hover:bg-gray-50"
              }`}
            >
              <input
                type="radio"
                name="experienceLevel"
                value={level}
                checked={formData.experienceLevel === level}
                onChange={handleChange}
                className="sr-only"
              />
              <span className="capitalize">{level}</span>
            </label>
          ))}
        </div>
      </FormField>

      <FormField label="Specific Concerns or Questions" icon={HelpCircle}>
        <textarea
          name="specificConcerns"
          value={formData.specificConcerns}
          onChange={handleChange}
          placeholder="Any specific issues or questions about your plant? (e.g., yellowing leaves, pest problems)"
          rows="3"
          className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary-500"
        ></textarea>
      </FormField>

      <motion.button
        type="submit"
        disabled={isSubmitting}
        className="w-full mt-4 bg-primary-600 text-white py-3 px-6 rounded-lg font-medium flex items-center justify-center hover:bg-primary-700 transition-colors disabled:opacity-70"
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        {isSubmitting ? (
          <div className="flex items-center">
            <LoadingSpinner />
            <span className="ml-2">Generating Care Guide...</span>
          </div>
        ) : (
          <div className="flex items-center">
            <Send className="h-5 w-5 mr-2" />
            Generate Care Guide
          </div>
        )}
      </motion.button>
    </form>
  )
}

export default CareGuideForm
