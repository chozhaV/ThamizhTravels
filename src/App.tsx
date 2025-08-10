import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { LanguageProvider } from './context/LanguageContext';
import { AuthProvider, useAuth } from './context/AuthContext';
import { Layout } from './components/common/Layout';

// Pages
import { Home } from './pages/Home';
import { AdminLogin } from './pages/auth/AdminLogin';
import { DriverLogin } from './pages/auth/DriverLogin';
import { UserLogin } from './pages/auth/UserLogin';

// Dashboards
import { AdminDashboard } from './components/dashboard/AdminDashboard';
import { DriverDashboard } from './components/dashboard/DriverDashboard';
import { UserDashboard } from './components/dashboard/UserDashboard';

const ProtectedRoute: React.FC<{ children: React.ReactNode; allowedRoles: string[] }> = ({ children, allowedRoles }) => {
  const { user, isAuthenticated } = useAuth();

  if (!isAuthenticated || !user) {
    return <Navigate to="/" replace />;
  }

  if (!allowedRoles.includes(user.role)) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
};

const AppContent: React.FC = () => {
  const { user, isAuthenticated } = useAuth();

  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={!isAuthenticated ? <Home /> : <Navigate to={`/${user?.role}/dashboard`} />} />
          
          {/* Auth Routes */}
          <Route path="/admin/login" element={!isAuthenticated ? <AdminLogin /> : <Navigate to="/admin/dashboard" />} />
          <Route path="/driver/login" element={!isAuthenticated ? <DriverLogin /> : <Navigate to="/driver/dashboard" />} />
          <Route path="/user/login" element={!isAuthenticated ? <UserLogin /> : <Navigate to="/user/dashboard" />} />
          
          {/* Dashboard Routes */}
          <Route 
            path="/admin/dashboard" 
            element={
              <ProtectedRoute allowedRoles={['admin']}>
                <AdminDashboard />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/driver/dashboard" 
            element={
              <ProtectedRoute allowedRoles={['driver']}>
                <DriverDashboard />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/user/dashboard" 
            element={
              <ProtectedRoute allowedRoles={['user']}>
                <UserDashboard />
              </ProtectedRoute>
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