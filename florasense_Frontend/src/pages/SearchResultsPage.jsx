import { useState, useEffect, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Search, ArrowLeft } from 'lucide-react';
import SearchShimmer from '../components/SearchShimmer';
import SearchResult from '../components/SearchResult';
import NoResults from '../components/NoResultPlantSearch';
import EmptySearchState from '../components/EmptySearchState';

// Mock data
const mockResults = [
  {
    id: 1,
    name: "Snake Plant",
    alternateNames: [
      "Dracaena trifasciata",
      "Mother-in-law's tongue",
      "Saint George's sword"
    ],
    type: "Indoor Plant",
    image: "https://images.unsplash.com/photo-1593691509543-c55fb32e8a76?w=300"
  },
  {
    id: 2,
    name: "Monstera Deliciosa",
    alternateNames: [
      "Swiss Cheese Plant",
      "Split-leaf Philodendron",
      "Mexican Breadfruit"
    ],
    type: "Tropical Plant",
    image: "https://images.unsplash.com/photo-1614594975525-e45190c55d0b?w=300"
  }
];

export default function SearchResultsPage() {
    const [isLoading, setIsLoading] = useState(false);
    const [results, setResults] = useState([]);
    const [displayedQuery, setDisplayedQuery] = useState("");
    const [inputQuery, setInputQuery] = useState("");
    const location = useLocation();
    const navigate = useNavigate();
    const lastSearchRef = useRef("");

const fetchResults = async (query) => {
    if (!query) return; // Prevent API call if query is empty
    
    setIsLoading(true);
    try {
      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/getSearchedPlantList?query=${query}`);
      const data = await response.json();
      setResults(data);
    } catch (error) {
      console.error("Error fetching plant data:", error);
      setResults([]);
    } finally {
      setIsLoading(false);
    }
  };

useEffect(() => {
    const query = new URLSearchParams(location.search).get('q');
    if (!query) return;
    setDisplayedQuery(query);
    setInputQuery(query);

    if (query !== lastSearchRef.current) {
        lastSearchRef.current = query;
        fetchResults(query);
      }

    fetchResults();
  }, [location.search]);

  
  const handleSearch = (e) => {
    e.preventDefault();
    const trimmedQuery = inputQuery.trim();
    
    if (!trimmedQuery) return;
    
    // Only navigate if the search term is different
    if (trimmedQuery !== lastSearchRef.current) {
      navigate(`/search?q=${encodeURIComponent(trimmedQuery)}`);
    }
  };

  return (
    <div className="min-h-screen">
      {/* Search Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center space-x-4">
            
            
            <form onSubmit={handleSearch} className="flex-1 max-w-2xl">
              <div className="relative">
                <input
                  type="text"
                  value={inputQuery}
                  onChange={(e) => setInputQuery(e.target.value)}
                  placeholder="Search for plants..."
                  className="w-full px-4 py-2 pl-10 rounded-full border border-gray-300 
                  focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              </div>
            </form>
          </div>
        </div>
      </div>

      {/* Results Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {!isLoading && displayedQuery && (
          <h2 className="text-xl font-semibold text-gray-900 mb-6">
            Search Results for "{displayedQuery}"
          </h2>
        )}
        
        <div className="space-y-4">
          {isLoading ? (
            <SearchShimmer />
          ) : displayedQuery ? (
            results.length > 0 ? (
              results.map(result => (
                <SearchResult key={result.id} result={result} />
              ))
            ) : (
              <NoResults searchQuery={displayedQuery} />
            )
          ) : (
            <EmptySearchState />
          )}
        </div>
      </div>
    </div>
  );
}