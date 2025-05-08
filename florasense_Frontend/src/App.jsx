import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Toaster } from "react-hot-toast";
import { BrowserRouter, Routes, Route, Navigate, useLocation } from "react-router-dom";
import { AuthProvider, useAuth } from "./context/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";
import LoginSignUpPage from "./pages/LoginSignUpPage";
import LandingPage from './pages/LandingPage';
import SearchResultsPage from './pages/SearchResultsPage';
import PlantDetails from './pages/PlantDetails';
import MainLayout from './layouts/MainLayout';
import UserLayout from './layouts/UserLayout';
import UserProfile from './pages/UserProfile';
import MyPlants from './pages/MyPlants';
import Custom from './pages/Custom';
import CareGuide from "./pages/CareGuide"

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }, [pathname]);

  return null;
};

const LoadingSpinner = () => (
  <div className="min-h-screen flex items-center justify-center">
    <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-indigo-600"></div>
  </div>
);

const ProtectedLayout = ({ children }) => (
  <ProtectedRoute>
   {children}
  </ProtectedRoute>
);

const ProtectedLoginRoute = () => {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (isAuthenticated) {
    return <Navigate to="/home" replace />;
  }

  return <LoginSignUpPage />
};

const AuthenticatedRoutes = () => {
  const { isAuthenticated, isLoading } = useAuth();
  const location = useLocation();

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  return (
    <MainLayout>
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Navigate to="/home" replace />} />
        <Route
          path="/home"
          element={
            <ProtectedLayout>
              <LandingPage />
            </ProtectedLayout>
          }
        />
        <Route
          path="/search"
          element={
            <ProtectedLayout>
              <SearchResultsPage />
            </ProtectedLayout>
          }
        />
        <Route
          path="/plant/:id"
          element={
            <ProtectedLayout>
              <PlantDetails />
            </ProtectedLayout>
          }
        />
        <Route
          path="/care-guide"
          element={
            <ProtectedLayout>
              <CareGuide />
            </ProtectedLayout>
          }
        />
        <Route
          path="/user"
          element={
            <ProtectedLayout>
              <UserLayout />
            </ProtectedLayout>
          }
        >
          <Route index element={<UserProfile />} />
          <Route path="plants" element={<MyPlants />} />
          <Route path="custom" element={<Custom />} />
        </Route>
        <Route
          path="*"
          element={
            <ProtectedLayout>
              <Navigate to="/home" replace />
            </ProtectedLayout>
          }
        />
      </Routes>
    </MainLayout>
  );
};

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<ProtectedLoginRoute />} />
          <Route path="/*" element={<AuthenticatedRoutes />} />
        </Routes>
        <Toaster position="top-right" />
      </BrowserRouter>
    </AuthProvider>
  );
}
