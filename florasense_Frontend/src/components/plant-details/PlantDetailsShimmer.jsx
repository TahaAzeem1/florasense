// import { motion } from 'framer-motion';

// const PlantDetailsShimmer = () => {
//   return (
//     <div className="max-w-7xl mx-auto px-4 py-8">
//       <motion.div
//         initial={{ opacity: 0 }}
//         animate={{ opacity: 1 }}
//         className="animate-pulse"
//       >
//         <div className="h-96 bg-gray-200 rounded-xl mb-8" />
//         <div className="h-8 bg-gray-200 w-1/3 rounded mb-4" />
//         <div className="h-6 bg-gray-200 w-1/4 rounded mb-8" />
        
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
//           {[1, 2, 3, 4].map((i) => (
//             <div key={i} className="h-24 bg-gray-200 rounded-lg" />
//           ))}
//         </div>
        
//         <div className="h-48 bg-gray-200 rounded-lg mb-8" />
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//           {[1, 2, 3].map((i) => (
//             <div key={i} className="h-32 bg-gray-200 rounded-lg" />
//           ))}
//         </div>
//       </motion.div>
//     </div>
//   );
// };

// export default PlantDetailsShimmer;


"use client"

import { motion } from "framer-motion"

const PlantDetailsShimmer = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="animate-pulse space-y-8">
        {/* Hero Image Shimmer */}
        <div className="relative h-[400px] md:h-[500px] rounded-2xl overflow-hidden bg-gray-200" />

        {/* Content Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column */}
          <div className="lg:col-span-1 space-y-6">
            {/* Quick Facts Card */}
            <div className="bg-white rounded-xl shadow-md p-6 space-y-4">
              <div className="h-6 bg-gray-200 w-1/3 rounded mb-4" />
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="flex items-center">
                  <div className="bg-gray-200 h-10 w-10 rounded-lg mr-3" />
                  <div className="space-y-2 flex-1">
                    <div className="h-3 bg-gray-200 w-1/4 rounded" />
                    <div className="h-4 bg-gray-200 w-1/2 rounded" />
                  </div>
                </div>
              ))}
            </div>

            {/* Care Guide Button Shimmer */}
            <div className="bg-gray-200 rounded-xl p-6 h-48" />
          </div>

          {/* Right Column */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-md overflow-hidden">
              {/* Tabs Shimmer */}
              <div className="flex bg-gray-50 border-b border-gray-200">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="flex-1 py-4 px-4 flex justify-center">
                    <div className="h-5 bg-gray-200 w-24 rounded" />
                  </div>
                ))}
              </div>

              {/* Tab Content Shimmer */}
              <div className="p-6 space-y-6">
                <div className="h-4 bg-gray-200 w-1/3 rounded mb-2" />
                <div className="h-4 bg-gray-200 w-full rounded mb-1" />
                <div className="h-4 bg-gray-200 w-full rounded mb-1" />
                <div className="h-4 bg-gray-200 w-3/4 rounded mb-6" />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="bg-gray-100 p-5 rounded-xl h-32" />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  )
}

export default PlantDetailsShimmer

