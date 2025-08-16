import React from 'react';
import { motion } from 'framer-motion';
import { Car, Shield, Clock, Users, MapPin, CreditCard } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { MobileLogin } from './auth/MobileLogin';

export const Home: React.FC = () => {
  const { language, t } = useLanguage();

  const features = [
    {
      icon: <Car className="w-8 h-8 text-yellow-600" />,
      title: language === 'ta' ? 'வேகமான பயணம்' : 'Quick Rides',
      description: language === 'ta' ? 'உடனடி வாகன சேவை' : 'Instant vehicle booking'
    },
    {
      icon: <Shield className="w-8 h-8 text-yellow-600" />,
      title: language === 'ta' ? 'பாதுகாப்பான பயணம்' : 'Safe Travel',
      description: language === 'ta' ? 'முழு பாதுகாப்பு உத்தரவாதம்' : 'Complete safety assurance'
    },
    {
      icon: <Clock className="w-8 h-8 text-yellow-600" />,
      title: language === 'ta' ? '24/7 சேவை' : '24/7 Service',
      description: language === 'ta' ? 'எப்போதும் கிடைக்கும் சேவை' : 'Always available service'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-yellow-50 to-white">
      {/* Hero Section */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="px-4 py-8 text-center"
      >
        <div className="max-w-md mx-auto">
          <motion.div
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mb-6"
          >
            <Car className="w-16 h-16 text-yellow-600 mx-auto mb-4" />
            <h1 className="text-3xl font-bold text-gray-800 mb-2">
              {t('app.name')}
            </h1>
            <p className="text-gray-600 text-lg">
              {language === 'ta' ? 'உங்கள் நம்பகமான பயண துணை' : 'Your trusted travel companion'}
            </p>
          </motion.div>

          {/* Login Form */}
          <MobileLogin />
        </div>
      </motion.div>

      {/* Features Section */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        className="px-4 py-8"
      >
        <div className="max-w-md mx-auto">
          <h2 className="text-2xl font-bold text-center text-gray-800 mb-8">
            {language === 'ta' ? 'ஏன் தமிழ் டிராவல்ஸ்?' : 'Why ThamizhTravels?'}
          </h2>
          
          <div className="space-y-6">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.6 + index * 0.1 }}
                className="bg-white rounded-xl p-6 shadow-sm border border-yellow-100"
              >
                <div className="flex items-center space-x-4">
                  <div className="flex-shrink-0">
                    {feature.icon}
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-800 mb-1">
                      {feature.title}
                    </h3>
                    <p className="text-gray-600 text-sm">
                      {feature.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Services Preview */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.8 }}
        className="px-4 py-8 bg-yellow-50"
      >
        <div className="max-w-md mx-auto text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">
            {language === 'ta' ? 'எங்கள் சேவைகள்' : 'Our Services'}
          </h2>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-white rounded-lg p-4 shadow-sm">
              <MapPin className="w-8 h-8 text-yellow-600 mx-auto mb-2" />
              <p className="text-sm font-medium text-gray-800">
                {language === 'ta' ? 'நகர பயணம்' : 'City Rides'}
              </p>
            </div>
            <div className="bg-white rounded-lg p-4 shadow-sm">
              <Users className="w-8 h-8 text-yellow-600 mx-auto mb-2" />
              <p className="text-sm font-medium text-gray-800">
                {language === 'ta' ? 'குழு பயணம்' : 'Group Travel'}
              </p>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};