"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Search, X, Filter, SortAsc, SortDesc } from "lucide-react"
import { Menu, Transition } from "@headlessui/react"

const MyPlantsHeader = ({
  searchQuery,
  setSearchQuery,
  totalPlants,
  sortOption,
  setSortOption,
  sortDirection,
  setSortDirection,
}) => {
  const [isFocused, setIsFocused] = useState(false)

  const handleClearSearch = () => {
    setSearchQuery("")
  }

  const toggleSortDirection = () => {
    setSortDirection(sortDirection === "asc" ? "desc" : "asc")
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-white rounded-xl shadow-md p-4 md:p-6 mb-6"
    >
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 flex items-center">
            My Plant Collection
            {totalPlants > 0 && (
              <span className="ml-3 text-sm bg-primary-100 text-primary-800 py-1 px-2 rounded-full">
                {totalPlants} {totalPlants === 1 ? "plant" : "plants"}
              </span>
            )}
          </h1>
          <p className="text-gray-600 mt-1">Manage and track your plants in one place</p>
        </div>

        <div className="flex items-center gap-2">
          <Menu as="div" className="relative">
            <Menu.Button className="p-2 rounded-lg text-gray-500 hover:text-primary-600 hover:bg-primary-50 transition-colors">
              <Filter className="w-5 h-5" />
            </Menu.Button>
            <Transition
              enter="transition duration-100 ease-out"
              enterFrom="transform scale-95 opacity-0"
              enterTo="transform scale-100 opacity-100"
              leave="transition duration-75 ease-out"
              leaveFrom="transform scale-100 opacity-100"
              leaveTo="transform scale-95 opacity-0"
            >
              <Menu.Items className="absolute right-0 mt-2 w-56 origin-top-right bg-white rounded-lg shadow-lg p-2 z-10 border border-gray-100">
                <div className="p-2">
                  <h3 className="text-sm font-medium text-gray-700 mb-2">Sort by</h3>
                  <div className="space-y-1">
                    {["name", "date_added", "type"].map((option) => (
                      <Menu.Item key={option}>
                        {({ active }) => (
                          <button
                            className={`${active ? "bg-primary-50 text-primary-700" : "text-gray-700"} ${
                              sortOption === option ? "bg-primary-100 text-primary-800" : ""
                            } group flex w-full items-center rounded-md px-2 py-2 text-sm capitalize transition-colors`}
                            onClick={() => setSortOption(option)}
                          >
                            {option.replace("_", " ")}
                            {sortOption === option && (
                              <span className="ml-auto">
                                {sortDirection === "asc" ? (
                                  <SortAsc className="w-4 h-4" />
                                ) : (
                                  <SortDesc className="w-4 h-4" />
                                )}
                              </span>
                            )}
                          </button>
                        )}
                      </Menu.Item>
                    ))}
                  </div>

                  {sortOption && (
                    <div className="mt-3 pt-3 border-t border-gray-100">
                      <button
                        onClick={toggleSortDirection}
                        className="flex items-center justify-between w-full px-2 py-2 text-sm text-gray-700 hover:bg-primary-50 hover:text-primary-700 rounded-md transition-colors"
                      >
                        <span>Direction</span>
                        <span className="flex items-center">
                          {sortDirection === "asc" ? <SortAsc className="w-4 h-4" /> : <SortDesc className="w-4 h-4" />}
                        </span>
                      </button>
                    </div>
                  )}
                </div>
              </Menu.Items>
            </Transition>
          </Menu>

          <div
            className={`relative flex-1 min-w-[200px] transition-all duration-200 ${
              isFocused ? "ring-2 ring-primary-500" : ""
            }`}
          >
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
              placeholder="Search your plants..."
              className="w-full pl-10 pr-10 py-2 rounded-lg border border-gray-300 focus:outline-none"
            />
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            {searchQuery && (
              <button
                onClick={handleClearSearch}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                <X className="w-5 h-5" />
              </button>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export default MyPlantsHeader
