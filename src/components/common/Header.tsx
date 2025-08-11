import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Car, Menu, X, Globe, Shield, Users, MapPin, Phone } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../../context/LanguageContext';
import { useAuth } from '../../context/AuthContext';

export const Header: React.FC = () => {
  const { language, setLanguage, t } = useLanguage();
  const { user, logout, isAuthenticated } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleLanguage = () => {
    setLanguage(language === 'en' ? 'ta' : 'en');
    setIsMenuOpen(false);
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const menuItems = [
    { label: 'Driver', path: '/driver/login', icon: Car },
    { label: language === 'en' ? 'தமிழ்' : 'English', action: toggleLanguage, icon: Globe },
    { label: 'About Us', path: '#', icon: Users },
    { label: 'Services', path: '#', icon: MapPin },
    { label: 'Safety', path: '#', icon: Shield },
    { label: 'Support', path: '#', icon: Phone },
  ];

  return (
    <>
      <motion.header
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="bg-white shadow-sm border-b border-secondary-200 sticky top-0 z-40"
      >
        <div className="max-w-md mx-auto px-4">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              <motion.div
                whileHover={{ scale: 1.1, rotate: 360 }}
                transition={{ duration: 0.5 }}
                className="w-10 h-10 bg-primary-500 rounded-lg flex items-center justify-center"
              >
                <Car className="w-6 h-6 text-white" />
              </motion.div>
              <div>
                <h1 className="text-lg font-bold text-secondary-900">{t('app.name')}</h1>
                <p className="text-xs text-secondary-500">{t('app.tagline')}</p>
              </div>
            </div>

            <button
              onClick={toggleMenu}
              className="p-2 rounded-lg hover:bg-secondary-100 transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center"
            >
              <Menu className="w-6 h-6 text-secondary-600" />
            </button>
          </div>
        </div>
      </motion.header>

      {/* Side Drawer Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black bg-opacity-50 z-50"
              onClick={() => setIsMenuOpen(false)}
            />

            {/* Drawer */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'tween', duration: 0.3 }}
              className="fixed top-0 right-0 h-full w-80 max-w-[85vw] bg-white shadow-xl z-50"
            >
              <div className="p-4">
                <div className="flex justify-between items-center mb-8">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-primary-500 rounded-lg flex items-center justify-center">
                      <Car className="w-5 h-5 text-white" />
                    </div>
                    <span className="font-bold text-secondary-900">{t('app.name')}</span>
                  </div>
                  <button
                    onClick={() => setIsMenuOpen(false)}
                    className="p-2 rounded-lg hover:bg-secondary-100 transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center"
                  >
                    <X className="w-6 h-6 text-secondary-600" />
                  </button>
                </div>

                <nav className="space-y-2">
                  {!isAuthenticated && menuItems.map((item, index) => (
                    <motion.div
                      key={item.label}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      {item.action ? (
                        <button
                          onClick={item.action}
                          className="w-full flex items-center space-x-3 p-4 rounded-lg hover:bg-secondary-100 transition-colors min-h-[44px]"
                        >
                          <item.icon className="w-5 h-5 text-secondary-600" />
                          <span className="text-secondary-900 font-medium">{item.label}</span>
                        </button>
                      ) : (
                        <Link
                          to={item.path}
                          onClick={() => setIsMenuOpen(false)}
                          className="w-full flex items-center space-x-3 p-4 rounded-lg hover:bg-secondary-100 transition-colors min-h-[44px]"
                        >
                          <item.icon className="w-5 h-5 text-secondary-600" />
                          <span className="text-secondary-900 font-medium">{item.label}</span>
                        </Link>
                      )}
                    </motion.div>
                  ))}

                  {isAuthenticated && user && (
                    <motion.div
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="border-t border-secondary-200 pt-4 mt-4"
                    >
                      <div className="flex items-center space-x-3 p-4 bg-primary-50 rounded-lg mb-4">
                        <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center">
                          <span className="text-primary-600 font-semibold">
                            {user.name.charAt(0).toUpperCase()}
                          </span>
                        </div>
                        <div>
                          <p className="font-medium text-secondary-900">{user.name}</p>
                          <p className="text-sm text-secondary-500 capitalize">{user.role}</p>
                        </div>
                      </div>
                      
                      <button
                        onClick={() => {
                          logout();
                          setIsMenuOpen(false);
                        }}
                        className="w-full flex items-center space-x-3 p-4 rounded-lg hover:bg-red-50 transition-colors min-h-[44px] text-red-600"
                      >
                        <span className="font-medium">Logout</span>
                      </button>
                    </motion.div>
                  )}
                </nav>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};