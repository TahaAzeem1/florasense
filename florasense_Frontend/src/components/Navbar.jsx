// import React from "react";
// import { Link, useLocation } from "react-router-dom";
// import { useAuth } from "../context/AuthContext";
// import { motion } from "framer-motion";
// import { Leaf } from "lucide-react";
// import ProfileDropdown from "./ProfileDropdown";

// const Navbar = () => {
//   const { logout } = useAuth();
//   const location = useLocation();

//   const isActive = (path) => location.pathname === path;

//   return (
//     <motion.nav
//       initial={{ y: -100 }}
//       animate={{ y: 0 }}
//       className="bg-white/80 backdrop-blur-sm shadow-md sticky top-0 z-50"
//     >
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         <div className="flex justify-between h-16">
//           <div className="flex items-center">
//             <Link
//               to="/home"
//               className="flex items-center group hover:scale-110 transition-transform duration-300"
//             >
//               <Leaf
//                 className="h-8 w-8 text-primary-600 mr-2 group-hover:rotate-12 transition-transform"
//                 whileHover={{ scale: 1.1 }}
//               />
//               <span className="text-2xl font-bold bg-gradient-to-r from-primary-600 to-primary-400 bg-clip-text text-transparent group-hover:from-primary-500 group-hover:to-primary-300 transition-all">
//                 FloraSense
//               </span>
//             </Link>
//             <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
//               {["home", "search"].map((path) => (
//                 <Link key={path} to={`/${path}`} className="relative group">
//                   <motion.span
//                     className={`inline-flex items-center px-1 pt-1 text-sm font-medium capitalize ${
//                       isActive(`/${path}`)
//                         ? "text-primary-600"
//                         : "text-gray-500 hover:text-gray-700"
//                     }`}
//                     whileHover={{ y: -2 }}
//                     transition={{ type: "spring", stiffness: 300 }}
//                   >
//                     {path}
//                   </motion.span>
//                   {isActive(`/${path}`) && (
//                     <motion.div
//                       layoutId="activeTab"
//                       className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary-600"
//                       initial={false}
//                     />
//                   )}
//                   <motion.div
//                     className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary-400 scale-x-0 group-hover:scale-x-100 transition-transform"
//                     style={{ originX: 0 }}
//                   />
//                 </Link>
//               ))}
//             </div>
//           </div>
//           <div className="flex items-center space-x-4">
//             <ProfileDropdown />
//           </div>
//         </div>
//       </div>
//     </motion.nav>
//   );
// };

// export default Navbar;


"use client"
import { useState, useEffect } from "react"
import { Link, useLocation } from "react-router-dom"
import { motion, AnimatePresence } from "framer-motion"
import { Leaf, Menu, X } from "lucide-react"
import ProfileDropdown from "./ProfileDropdown"
import { SiOverleaf } from "react-icons/si";
const Navbar = () => {
  const location = useLocation()
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const isActive = (path) => location.pathname === path

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true)
      } else {
        setIsScrolled(false)
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Close mobile menu when location changes
  useEffect(() => {
    setIsMobileMenuOpen(false)
  }, [location])

  const navLinks = [
    { path: "/home", label: "Home" },
    { path: "/search", label: "Search" },
    { path: "/care-guide", label: "Care Guide" },
  ]

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`${
        isScrolled ? "bg-white/90 backdrop-blur-md shadow-md" : "bg-white/80 backdrop-blur-sm"
      } sticky top-0 z-50 transition-all duration-300`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/home" className="flex items-center group hover:scale-105 transition-transform duration-300">
              <motion.div whileHover={{ rotate: [0, -10, 10, -10, 0] }} transition={{ duration: 0.5 }}>
                <SiOverleaf className="h-8 w-8 text-primary-600 mr-2 group-hover:text-primary-500 transition-colors" />
              </motion.div>
              <span className="text-2xl font-bold bg-gradient-to-r from-primary-600 to-primary-400 bg-clip-text text-transparent group-hover:from-primary-500 group-hover:to-primary-300 transition-all">
                FloraSense
              </span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden sm:ml-8 sm:flex sm:space-x-8">
              {navLinks.map((link) => (
                <Link key={link.path} to={link.path} className="relative group">
                  <motion.span
                    className={`inline-flex items-center px-1 pt-1 text-sm font-medium capitalize ${
                      isActive(link.path) ? "text-primary-600" : "text-gray-500 hover:text-gray-700"
                    }`}
                    whileHover={{ y: -2 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    {link.label}
                  </motion.span>
                  {isActive(link.path) && (
                    <motion.div
                      layoutId="activeTab"
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary-600"
                      initial={false}
                    />
                  )}
                  <motion.div
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary-400 scale-x-0 group-hover:scale-x-100 transition-transform"
                    style={{ originX: 0 }}
                  />
                </Link>
              ))}
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <ProfileDropdown />

            {/* Mobile menu button */}
            {/* <div className="sm:hidden flex items-center">
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="p-2 rounded-md text-gray-500 hover:text-primary-600 hover:bg-primary-50 transition-colors focus:outline-none"
                aria-expanded={isMobileMenuOpen}
                aria-label="Toggle menu"
              >
                {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div> */}
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {/* <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="sm:hidden bg-white border-t border-gray-100"
          >
            <div className="px-2 pt-2 pb-3 space-y-1">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`block px-3 py-2 rounded-md text-base font-medium ${
                    isActive(link.path)
                      ? "bg-primary-100 text-primary-600"
                      : "text-gray-600 hover:bg-primary-50 hover:text-primary-600"
                  } transition-colors`}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence> */}
    </motion.nav>
  )
}

export default Navbar

