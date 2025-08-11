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
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">{t('app.name')}</h3>
            <p className="text-secondary-300 text-sm">
              {t('app.tagline')} - Connecting travelers across Tamil Nadu with reliable and comfortable transportation.
            </p>
            <div className="flex space-x-4">
              <motion.span whileHover={{ scale: 1.1 }} className="w-10 h-10 bg-primary-500 rounded-lg flex items-center justify-center cursor-pointer">
                <Phone className="w-5 h-5" />
              </motion.span>
              <motion.span whileHover={{ scale: 1.1 }} className="w-10 h-10 bg-primary-500 rounded-lg flex items-center justify-center cursor-pointer">
                <Mail className="w-5 h-5" />
              </motion.span>
              <motion.span whileHover={{ scale: 1.1 }} className="w-10 h-10 bg-primary-500 rounded-lg flex items-center justify-center cursor-pointer">
                <MapPin className="w-5 h-5" />
              </motion.span>
            </div>
          </div>

          <div className="space-y-4">
            <h4 className="font-medium">Quick Links</h4>
            <ul className="space-y-2 text-sm text-secondary-300">
              <li><a href="#" className="hover:text-white transition-colors">About Us</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Services</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Safety</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Support</a></li>
            </ul>
          </div>

          <div className="space-y-4">
            <h4 className="font-medium">Contact Info</h4>
            <div className="space-y-2 text-sm text-secondary-300">
              <p className="flex items-center space-x-2">
                <Phone className="w-4 h-4" />
                <span>+91 98765 43210</span>
              </p>
              <p className="flex items-center space-x-2">
                <Mail className="w-4 h-4" />
                <span>contact@thamizhtravels.com</span>
              </p>
              <p className="flex items-center space-x-2">
                <MapPin className="w-4 h-4" />
                <span>Chennai, Tamil Nadu</span>
              </p>
            </div>
          </div>
        </div>

        <div className="border-t border-secondary-800 mt-8 pt-8 text-center text-sm text-secondary-400">
          <p className="flex items-center justify-center space-x-1">
            <span>Made with</span>
            <motion.span animate={{ scale: [1, 1.2, 1] }} transition={{ duration: 1, repeat: Infinity }}>
              <Heart className="w-4 h-4 fill-red-500 text-red-500" />
            </motion.span>
            <span>for Tamil Nadu</span>
          </p>
          <p className="mt-2">© 2025 {t('app.name')}. All rights reserved.</p>
        </div>
      </div>
    </motion.footer>
  );
};