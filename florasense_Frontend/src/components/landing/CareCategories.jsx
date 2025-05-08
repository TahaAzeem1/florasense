"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import { Tab } from "@headlessui/react"
import { Leaf, Droplets, Sun, Wind, ArrowRight, BookOpen, Bell } from "lucide-react"
import PlantDetailsGif from "../../assets/Plant Details.gif"
import CareGuideGif from "../../assets/Care Guide.gif"
const CareCategories = () => {
  const categoriesRef = useRef(null)
  const categoriesInView = useInView(categoriesRef, { once: true, amount: 0.2 })

  const careCategories = [
    { 
      name: "Plants Details", 
      icon: Leaf,
      description: "Discover comprehensive information about your plants, from species identification to growth patterns.",
      features: [
        "Species identification and characteristics",
        "Scientific and common details",
        "Short care tips",
        "Growth patterns and lifecycle",
        "Watering and light requirements",
        "Plant Features",
      ],
      image: PlantDetailsGif
    },
    { 
      name: "Care Guide", 
      icon: BookOpen,
      description: "Expert-curated care instructions tailored to each plant's specific needs and environment.",
      features: [
        "Watering and light requirements",
        "Soil and fertilization tips",
        "Pruning and maintenance schedule",
        "Location & Environment recommendations",
        "Special Considerations",
        "Pruning & Maintenance"
      ],
      image: CareGuideGif
    },
    { 
      name: "Reminders", 
      icon: Bell,
      description: "Stay on top of your plant care routine with smart, customizable reminders and notifications.",
      features: [
        "Customizable watering schedules",
        "Fertilization and repotting alerts",
        "Seasonal care notifications"
      ],
      image: CareGuideGif
    }
  ]

  return (
    <div className="bg-primary-50 py-24" ref={categoriesRef}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={categoriesInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Expert Plant Guide</h2>
          <p className="text-xl text-gray-600 max-w-4xl mx-auto">
            Detailed instructions, care guides and reminders for every type of plant in your collection
          </p>
        </motion.div>

        <Tab.Group>
          <Tab.List className="flex space-x-2 rounded-xl bg-white p-1 shadow-md max-w-2xl mx-auto mb-12">
            {careCategories.map((category) => (
              <Tab
                key={category.name}
                className={({ selected }) =>
                  `w-full rounded-lg py-3 text-sm font-medium leading-5 transition-all duration-200
                  ${
                    selected
                      ? "bg-primary-100 text-primary-700 shadow"
                      : "text-gray-600 hover:bg-primary-50 hover:text-primary-600"
                  }
                  `
                }
              >
                <div className="flex items-center justify-center">
                  <category.icon className="w-5 h-5 mr-2" />
                  {category.name}
                </div>
              </Tab>
            ))}
          </Tab.List>
          <Tab.Panels className="mt-2">
            {careCategories.map((category, idx) => (
              <Tab.Panel key={idx} className="rounded-xl bg-white p-6 shadow-lg">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-6">
                    <h3 className="text-2xl font-bold text-gray-900">{category.name}</h3>
                    <p className="text-gray-600">
                      {category.description}
                    </p>
                    <ul className="space-y-4">
                      {category.features.map((feature, index) => (
                        <li key={index} className="flex items-start">
                          <category.icon className="w-5 h-5 text-primary-600 mr-2 mt-0.5" />
                          <span className="text-gray-700">{feature}</span>
                        </li>
                      ))}
                    </ul>
                    <motion.button
                      className="mt-6 bg-primary-600 text-white px-6 py-2 rounded-lg flex items-center group hover:bg-primary-700 transition-colors"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      Explore {category.name}
                      <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </motion.button>
                  </div>
                  <div className="rounded-xl overflow-hidden shadow-lg relative group">
                    <img
                     src= {category.image}
                      alt={category.name}
                      className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                </div>
              </Tab.Panel>
            ))}
          </Tab.Panels>
        </Tab.Group>
      </div>
    </div>
  )
}

export default CareCategories

