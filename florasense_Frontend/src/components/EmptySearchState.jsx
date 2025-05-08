import { motion } from 'framer-motion';
import { Search, Leaf } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { TbLeafOff } from "react-icons/tb";

const EmptySearchState = () => {
  const navigate = useNavigate();

  const handleSuggestionClick = (suggestion) => {
    navigate(`/search?q=${encodeURIComponent(suggestion)}`);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col items-center justify-center py-16 px-4"
    >
      <div className="relative w-32 h-32 mb-8">
        <motion.div
          animate={{
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            repeatType: "reverse",
          }}
        >
          <Leaf className="w-full h-full text-primary-200" />
        </motion.div>
        <motion.div
          className="absolute -right-4 -bottom-4 bg-white rounded-full p-2 shadow-lg"
          animate={{
            rotate: [0, 360],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear",
          }}
        >
          <Search className="w-8 h-8 text-primary-500" />
        </motion.div>
      </div>

      <h2 className="text-2xl font-bold text-gray-900 mb-4 text-center">
        Discover Your Perfect Plant
      </h2>
      <p className="text-gray-600 text-center max-w-md mb-8">
        Search for plants by name, type, or characteristics. Get detailed information about care, growth habits, and more.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-2xl w-full">
        {['Snake Plant', 'Monstera', 'Peace Lily'].map((suggestion) => (
          <motion.button
            key={suggestion}
            onClick={() => handleSuggestionClick(suggestion)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-4 py-2 rounded-full bg-primary-50 text-primary-700 hover:bg-primary-100 transition-colors"
          >
            {suggestion}
          </motion.button>
        ))}
      </div>
    </motion.div>
  );
};

export default EmptySearchState;
