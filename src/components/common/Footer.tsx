import React from 'react';
import { motion } from 'framer-motion';
import { Phone, Mail, MapPin, Heart } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

export const Footer: React.FC = () => {
  const { t } = useLanguage();

  return (
    <motion.footer
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="bg-secondary-900 text-white mt-auto"
    >
      <div className="max-w-md mx-auto px-4 py-8">
        <div className="text-center space-y-6">
          <div className="space-y-4">
            <h3 className="text-xl font-semibold">{t('app.name')}</h3>
            <p className="text-secondary-300 text-sm leading-relaxed">
              {t('app.tagline')} - Connecting travelers across Tamil Nadu with reliable and comfortable transportation.
            </p>
          </div>

          <div className="flex justify-center space-x-4">
            <motion.div 
              whileHover={{ scale: 1.1 }} 
              whileTap={{ scale: 0.95 }}
              className="w-12 h-12 bg-primary-500 rounded-lg flex items-center justify-center cursor-pointer"
            >
              <Phone className="w-6 h-6" />
            </motion.div>
            <motion.div 
              whileHover={{ scale: 1.1 }} 
              whileTap={{ scale: 0.95 }}
              className="w-12 h-12 bg-primary-500 rounded-lg flex items-center justify-center cursor-pointer"
            >
              <Mail className="w-6 h-6" />
            </motion.div>
            <motion.div 
              whileHover={{ scale: 1.1 }} 
              whileTap={{ scale: 0.95 }}
              className="w-12 h-12 bg-primary-500 rounded-lg flex items-center justify-center cursor-pointer"
            >
              <MapPin className="w-6 h-6" />
            </motion.div>
          </div>

          <div className="space-y-4">
            <h4 className="font-medium text-lg">Quick Links</h4>
            <div className="space-y-3">
              <a href="#" className="block text-secondary-300 hover:text-white transition-colors py-2">About Us</a>
              <a href="#" className="block text-secondary-300 hover:text-white transition-colors py-2">Services</a>
              <a href="#" className="block text-secondary-300 hover:text-white transition-colors py-2">Safety</a>
              <a href="#" className="block text-secondary-300 hover:text-white transition-colors py-2">Support</a>
            </div>
          </div>

          <div className="space-y-4">
            <h4 className="font-medium text-lg">Contact Info</h4>
            <div className="space-y-3 text-sm text-secondary-300">
              <div className="flex items-center justify-center space-x-3">
                <Phone className="w-4 h-4" />
                <span>+91 98765 43210</span>
              </div>
              <div className="flex items-center justify-center space-x-3">
                <Mail className="w-4 h-4" />
                <span>contact@thamizhtravels.com</span>
              </div>
              <div className="flex items-center justify-center space-x-3">
                <MapPin className="w-4 h-4" />
                <span>Chennai, Tamil Nadu</span>
              </div>
            </div>
          </div>

          <div className="border-t border-secondary-800 pt-6 space-y-3">
            <div className="flex items-center justify-center space-x-2">
              <span className="text-sm text-secondary-400">Made with</span>
              <motion.div animate={{ scale: [1, 1.2, 1] }} transition={{ duration: 1, repeat: Infinity }}>
                <Heart className="w-4 h-4 fill-red-500 text-red-500" />
              </motion.div>
              <span className="text-sm text-secondary-400">for Tamil Nadu</span>
            </div>
            <p className="text-xs text-secondary-400">© 2025 {t('app.name')}. All rights reserved.</p>
          </div>
        </div>
      </div>
    </motion.footer>
  );
};