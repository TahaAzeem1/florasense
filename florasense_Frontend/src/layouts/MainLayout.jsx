// import { motion, AnimatePresence } from 'framer-motion';
// import { useLocation } from 'react-router-dom';
// import Navbar from '../components/Navbar';
// import PageTransition from '../components/PageTransition';

// const MainLayout = ({ children }) => {
//   const location = useLocation();

//   return (
//     <div className="min-h-screen bg-gray-50">
//       <Navbar />
//       <AnimatePresence mode="wait">
//         {/* <PageTransition key={location.pathname}> */}
//           {children}
//         {/* </PageTransition> */}
//       </AnimatePresence>
//     </div>
//   );
// };

// export default MainLayout;

"use client"

import { AnimatePresence } from "framer-motion"
import { useLocation } from "react-router-dom"
import Navbar from "../components/Navbar"
import Footer from "../components/Footer"

const MainLayout = ({ children }) => {
  const location = useLocation()

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />
      <main className="flex-grow">
        <AnimatePresence mode="wait">{children}</AnimatePresence>
      </main>
      <Footer />
    </div>
  )
}

export default MainLayout

