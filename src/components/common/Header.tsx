import React from 'react';
import { motion } from 'framer-motion';
import { Car, Globe, LogOut, Menu, User } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../../context/LanguageContext';
import { useAuth } from '../../context/AuthContext';
import { Button } from '../ui/Button';

export const Header: React.FC = () => {
  const { language, setLanguage, t } = useLanguage();
  const { user, logout, isAuthenticated } = useAuth();

  const toggleLanguage = () => {
    setLanguage(language === 'en' ? 'ta' : 'en');
  };

  return (
    <motion.header
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="bg-white shadow-sm border-b border-secondary-200 sticky top-0 z-40"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-3">
            <motion.span
              whileHover={{ scale: 1.1, rotate: 360 }}
              transition={{ duration: 0.5 }}
              className="w-8 h-8 bg-primary-500 rounded-lg flex items-center justify-center"
            >
              <Car className="w-5 h-5 text-white" />
            </motion.span>
            <div>
              <h1 className="text-xl font-bold text-secondary-900">{t('app.name')}</h1>
              <p className="text-xs text-secondary-500 hidden sm:block">{t('app.tagline')}</p>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            {!isAuthenticated && (
              <Link to="/driver/login">
                <Button
                  variant="outline"
                  size="sm"
                  className="flex items-center space-x-1"
                >
                  <Car className="w-4 h-4" />
                  <span>Driver</span>
                </Button>
              </Link>
            )}

            <Button
              variant="ghost"
              size="sm"
              onClick={toggleLanguage}
              className="flex items-center space-x-1"
            >
              <Globe className="w-4 h-4" />
              <span className="hidden sm:inline">{language === 'en' ? 'தமிழ்' : 'English'}</span>
            </Button>

            {user && (
              <div className="flex items-center space-x-3">
                <div className="hidden sm:flex items-center space-x-2">
                  <div className="w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center">
                    <User className="w-4 h-4 text-primary-600" />
                  </div>
                  <div className="text-sm">
                    <p className="font-medium text-secondary-900">{user.name}</p>
                    <p className="text-secondary-500 capitalize">{user.role}</p>
                  </div>
                </div>

                <Button
                  variant="ghost"
                  size="sm"
                  onClick={logout}
                  className="flex items-center space-x-1"
                >
                  <LogOut className="w-4 h-4" />
                  <span className="hidden sm:inline">{t('logout')}</span>
                </Button>
              </div>
            )}

            <button className="sm:hidden p-2 rounded-lg hover:bg-secondary-100 transition-colors">
              <Menu className="w-5 h-5 text-secondary-600" />
            </button>
          </div>
        </div>
      </div>
    </motion.header>
  );
};