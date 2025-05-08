import { motion } from 'framer-motion';

const SearchShimmer = () => {
  const shimmerItems = Array(4).fill(null);

  return (
    <>
      {shimmerItems.map((_, index) => (
        <div key={index} className="flex items-start space-x-4 bg-white p-6 rounded-lg shadow-sm mb-4">
          <div className="w-24 h-24 bg-gray-200 rounded-lg animate-pulse" />
          <div className="flex-1 space-y-3">
            <div className="h-4 bg-gray-200 rounded w-1/4 animate-pulse" />
            <div className="space-y-2">
              <div className="h-3 bg-gray-200 rounded w-3/4 animate-pulse" />
              <div className="h-3 bg-gray-200 rounded w-2/3 animate-pulse" />
              <div className="h-3 bg-gray-200 rounded w-1/2 animate-pulse" />
            </div>
            <div className="h-4 bg-gray-200 rounded w-1/6 animate-pulse mt-2" />
          </div>
        </div>
      ))}
    </>
  );
};

export default SearchShimmer;