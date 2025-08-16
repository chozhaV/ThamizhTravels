import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { LanguageProvider } from './context/LanguageContext';
import { AuthProvider, useAuth } from './context/AuthContext';
import { Layout } from './components/common/Layout';

// Pages
import { Home } from './pages/Home';
import { MobileLogin } from './pages/auth/MobileLogin';

// Components
import { RideBooking } from './components/booking/RideBooking';

const AppContent: React.FC = () => {
  const { user, isAuthenticated } = useAuth();

  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={!isAuthenticated ? <Home /> : <Navigate to="/ride-booking" />} />
          
          {/* Auth Routes */}
          <Route path="/login" element={!isAuthenticated ? <MobileLogin /> : <Navigate to="/ride-booking" />} />
          
          {/* Protected Routes */}
          <Route 
            path="/ride-booking" 
            element={
              isAuthenticated ? <RideBooking /> : <Navigate to="/login" />
            } 
          />
          
          <Route 
            path="/my-bookings" 
            element={
              isAuthenticated ? <div className="max-w-md mx-auto px-4 py-6 text-center"><h1 className="text-2xl font-bold text-secondary-900">My Bookings</h1><p className="text-secondary-600 mt-2">Coming Soon</p></div> : <Navigate to="/login" />
            } 
          />

          {/* Catch all route */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Layout>
    </Router>
  );
};

function App() {
  return (
    <LanguageProvider>
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </LanguageProvider>
  );
}

export default App;