import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Car, Menu, X, Globe, Shield, Users, MapPin, Phone, Clock } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../../context/LanguageContext';
import { useAuth } from '../../context/AuthContext';
import { UserDetailsForm } from '../forms/UserDetailsForm';

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
    { label: 'My Bookings', path: '/my-bookings', icon: Clock },
    { label: 'About Us', path: '#', icon: Users },
    { label: 'Services', path: '#', icon: MapPin },
    { label: 'Safety', path: '#', icon: Shield },
    { label: 'Contact', path: '#', icon: Phone },
  ];

  const contactInfo = [
    { label: '+91 98765 43210', icon: Phone },
    { label: 'contact@thamizhtravels.com', icon: Phone },
    { label: 'Chennai, Tamil Nadu', icon: MapPin },
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
                transition={{ duration: 0.3 }}
              >
                <Car className="w-8 h-8 text-primary-600" />
              </motion.div>
              <span className="font-bold text-xl text-secondary-900">{t('app.name')}</span>
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
                    <Car className="w-8 h-8 text-primary-600" />
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
                      ) : item.path === '/driver/login' ? (
                        <div className="w-full flex items-center space-x-3 p-4 rounded-lg bg-secondary-100 opacity-50 min-h-[44px]">
                          <item.icon className="w-5 h-5 text-secondary-400" />
                          <span className="text-secondary-500 font-medium">{item.label} (Coming Soon)</span>
                        </div>
                      ) : item.path === '/my-bookings' ? (
                        <div className="w-full flex items-center space-x-3 p-4 rounded-lg bg-secondary-100 opacity-50 min-h-[44px]">
                          <item.icon className="w-5 h-5 text-secondary-400" />
                          <span className="text-secondary-500 font-medium">{item.label} (Coming Soon)</span>
                        </div>
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
                            {user.name ? user.name.charAt(0).toUpperCase() : user.phone ? user.phone.slice(-2) : ''}
                          </span>
                        </div>
                        <div>
                          <p className="font-medium text-secondary-900">{user.name || 'User'}</p>
                          <p className="text-sm text-secondary-500">{user.phone}</p>
                        </div>
                      </div>
                      
                      {/* My Bookings for authenticated users */}
                      <div className="mb-4">
                        <Link
                          to="/my-bookings"
                          onClick={() => setIsMenuOpen(false)}
                          className="w-full flex items-center space-x-3 p-4 rounded-lg hover:bg-secondary-100 transition-colors min-h-[44px]"
                        >
                          <Clock className="w-5 h-5 text-secondary-600" />
                          <span className="text-secondary-900 font-medium">My Bookings</span>
                        </Link>
                      </div>
                      
                      {/* <div className="mb-4">
                        <UserDetailsForm />
                      </div> */}
                      
                      {/* Language toggle for authenticated users */}
                      <div className="mb-4">
                        <button
                          onClick={toggleLanguage}
                          className="w-full flex items-center space-x-3 p-4 rounded-lg hover:bg-secondary-100 transition-colors min-h-[44px]"
                        >
                          <Globe className="w-5 h-5 text-secondary-600" />
                          <span className="text-secondary-900 font-medium">{language === 'en' ? 'தமிழ்' : 'English'}</span>
                        </button>
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

                  {/* Contact Information */}
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="border-t border-secondary-200 pt-4 mt-4"
                  >
                    <h4 className="font-medium text-secondary-900 mb-3 px-4">Contact Info</h4>
                    <div className="space-y-2">
                      {contactInfo.map((contact, index) => (
                        <div
                          key={index}
                          className="flex items-center space-x-3 p-4 text-secondary-600"
                        >
                          <contact.icon className="w-4 h-4" />
                          <span className="text-sm">{contact.label}</span>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                </nav>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};