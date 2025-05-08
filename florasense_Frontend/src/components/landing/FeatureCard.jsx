"use client"

import { motion } from "framer-motion"
import { ArrowRight } from "lucide-react"

const FeatureCard = ({ feature, inView }) => {
  // return (
  //   <motion.div
  //     className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl 
  //     transition-all duration-300 hover:-translate-y-2 h-full flex flex-col"
  //     initial={{ opacity: 0, y: 20 }}
  //     animate={inView ? { opacity: 1, y: 0 } : {}}
  //     transition={{ delay: feature.delay, duration: 0.6 }}
  //   >
  //     <div
  //       className={`bg-gradient-to-r ${feature.color} w-14 h-14 rounded-xl flex items-center 
  //     justify-center mb-6 shadow-lg`}
  //     >
  //       <feature.icon className="w-8 h-8 text-white" />
  //     </div>
  //     <h3 className="text-xl font-semibold text-gray-900 mb-3">{feature.title}</h3>
  //     <p className="text-gray-600 leading-relaxed flex-grow">{feature.description}</p>
  //     <motion.button className="mt-4 text-primary-600 font-medium flex items-center group" whileHover={{ x: 5 }}>
  //       {feature.title === "Plant Community" ? "Comming Soon" : "Learn More"}
  //       {feature.title !== "Plant Community" && <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />  }
        
  //     </motion.button>
  //   </motion.div>
  const handleClick = () => {
    if (feature.action) {
      feature.action()
    }
  }

  return (
    <motion.div
      className={`bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl 
      transition-all duration-300 hover:-translate-y-2 h-full flex flex-col ${
        feature.action ? "cursor-pointer" : ""
      }`}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: feature.delay, duration: 0.6 }}
      onClick={handleClick}
    >
      <div
        className={`bg-gradient-to-r ${feature.color} w-14 h-14 rounded-xl flex items-center 
      justify-center mb-6 shadow-lg`}
      >
        <feature.icon className="w-8 h-8 text-white" />
      </div>
      <h3 className="text-xl font-semibold text-gray-900 mb-3">{feature.title}</h3>
      <p className="text-gray-600 leading-relaxed flex-grow">{feature.description}</p>
      <motion.button className="mt-4 text-primary-600 font-medium flex items-center group" whileHover={{ x: 5 }}>
        {feature.title === "Care Guides" ?  "Check it out" : feature.title === "Plant Identification" ? "Search Available" : "Coming Soon" }
        {(feature.title === "Care Guides" || feature.title === "Plant Identification") && (
          <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
        )}
      </motion.button>
    </motion.div>
  )
}

export default FeatureCard

