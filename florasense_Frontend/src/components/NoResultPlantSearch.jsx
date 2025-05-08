import { motion } from 'framer-motion';
import { Leaf, SearchX } from 'lucide-react';
import { TbLeafOff } from "react-icons/tb";

const NoResults = ({ searchQuery }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col items-center justify-center py-16 px-4 text-center"
    >
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ 
          type: "spring",
          stiffness: 260,
          damping: 20,
          delay: 0.2 
        }}
        className="relative w-32 h-32 mb-8"
      >
        <div className="absolute inset-0 flex items-center justify-center">
          <TbLeafOff className="w-16 h-16 text-primary-200" />
        </div>
        <motion.div
          animate={{
            rotate: 360,
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            repeatType: "reverse",
            ease: "easeInOut"
          }}
          className="absolute inset-0 border-4 border-dashed border-primary-100 rounded-full"
        />
        <SearchX className="absolute bottom-0 right-0 w-10 h-10 text-primary-400 bg-white rounded-full p-1" />
      </motion.div>

      <motion.h3
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="text-2xl font-semibold text-gray-900 mb-3"
      >
        No plants found
      </motion.h3>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="text-gray-600 mb-6 max-w-md"
      >
        We apologize, but we couldn't find any plants matching "{searchQuery}". 
        Perhaps try a different search term or check the spelling?
      </motion.p>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="space-y-2 text-sm text-gray-500"
      >
        <p>You might want to:</p>
        <ul className="list-disc list-inside">
          <li>Check for spelling mistakes</li>
          <li>Use more general terms</li>
          <li>Try searching by plant type</li>
        </ul>
      </motion.div>
    </motion.div>
  );
};

export default NoResults;