import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const SearchResult = ({ result }) => {
  const navigate = useNavigate();

  return (
    <motion.div 
      onClick={() => navigate(`/plant/${result.id}`)}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full flex flex-col md:flex-row items-stretch gap-6 bg-white p-6 md:p-8 rounded-xl shadow-sm mb-6 hover:shadow-lg transition-all duration-300 border border-gray-100 min-h-[250px] cursor-pointer"
    >
      {result?.default_image?.original_url ? (
        <div className="w-full md:w-48 flex-shrink-0">
          <img 
            src={result.default_image.original_url} 
            alt={result.common_name}
            className="w-full h-full object-cover rounded-xl shadow-md hover:scale-105 transition-transform duration-300"
          />
        </div>
      ) : (
        <div className="w-full md:w-48 flex-shrink-0 bg-gradient-to-br from-gray-100 to-gray-200 rounded-xl flex items-center justify-center shadow-md">
          <svg 
            className="w-16 h-16 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
            />
          </svg>
        </div>
      )}
      
      <div className="flex-1 space-y-4">
        <div className="space-y-2">
          <h3 className="text-2xl font-bold text-gray-900">
            {result.common_name}
          </h3>
          <p className="text-lg italic text-primary-600">
            {result.scientific_name}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-gray-50 p-3 rounded-lg">
            <p className="text-sm font-semibold text-gray-600">Family</p>
            <p className="text-lg text-gray-900">{result.family || 'Unknown'}</p>
          </div>
          <div className="bg-gray-50 p-3 rounded-lg">
            <p className="text-sm font-semibold text-gray-600">Genus</p>
            <p className="text-lg text-gray-900">{result.genus || 'Unknown'}</p>
          </div>
        </div>

        {result.other_name && result.other_name.length > 0 && (
          <div className="bg-primary-50 p-4 rounded-lg">
            <p className="text-sm font-semibold text-primary-700 mb-2">Other Names:</p>
            <div className="flex flex-wrap gap-2">
              {result.other_name.map((name, index) => (
                <span 
                  key={index} 
                  className="inline-block px-3 py-1 bg-primary-100 text-primary-700 rounded-full text-sm"
                >
                  {name}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default SearchResult;