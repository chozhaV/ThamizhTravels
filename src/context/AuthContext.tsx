import React, { createContext, useContext, useState, ReactNode } from 'react';
import { UserDetails } from '../types';

interface AuthContextType {
  user: UserDetails | null;
  login: (user: UserDetails) => void;
  logout: () => void;
  updateUser: (userData: Partial<UserDetails>) => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<UserDetails | null>(() => {
    const token = localStorage.getItem('authToken');
    const userData = localStorage.getItem('userData');
    if (token && userData) {
      return JSON.parse(userData);
    }
    return null;
  });

  const login = (userData: UserDetails) => {
    localStorage.setItem('authToken', userData.token || '');
    localStorage.setItem('userData', JSON.stringify(userData));
    setUser(userData);
  };

  const logout = () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('userData');
    setUser(null);
  };

  const updateUser = (userData: Partial<UserDetails>) => {
    if (user) {
      const updatedUser = { ...user, ...userData };
      localStorage.setItem('userData', JSON.stringify(updatedUser));
      setUser(updatedUser);
    }
  };

  const isAuthenticated = !!user;

  return (
    <AuthContext.Provider value={{ user, login, logout, updateUser, isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};