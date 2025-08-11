import React from 'react';
import { motion } from 'framer-motion';
import { Car, Shield, User, ArrowRight, Star, Users, MapPin, Clock } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Card } from '../components/ui/Card';
import { useLanguage } from '../context/LanguageContext';

export const Home: React.FC = () => {
  const { t } = useLanguage();

  const features = [
    { title: 'Safe & Reliable', description: 'Verified drivers with ratings', icon: Shield },
    { title: '24/7 Service', description: 'Available round the clock', icon: Clock },
    { title: 'Easy Booking', description: 'Book with just a few taps', icon: MapPin },
    { title: 'Trusted by Thousands', description: '10,000+ happy customers', icon: Users },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 to-white">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="max-w-md mx-auto px-4 py-12">
          <div className="text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-6"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: "spring" }}
                className="w-20 h-20 bg-primary-500 rounded-2xl mx-auto mb-6 flex items-center justify-center"
              >
                <Car className="w-10 h-10 text-white" />
              </motion.div>
              
              <h1 className="text-4xl font-bold text-secondary-900 leading-tight">
                {t('app.name')}
              </h1>
              
              <p className="text-lg text-secondary-600 leading-relaxed px-4">
                Experience seamless travel across Tamil Nadu with our reliable booking platform. 
                Safe, fast, and always at your service.
              </p>
              
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="flex items-center justify-center space-x-2 text-sm text-secondary-500"
              >
                <Star className="w-4 h-4 text-yellow-500 fill-current" />
                <span>4.8/5 rating from 10,000+ users</span>
              </motion.div>
            </motion.div>
          </div>
        </div>

        {/* Background decoration */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10">
          <div className="absolute top-10 right-10 w-32 h-32 bg-primary-200 rounded-full mix-blend-multiply opacity-70 animate-pulse"></div>
          <div className="absolute bottom-10 left-10 w-40 h-40 bg-yellow-200 rounded-full mix-blend-multiply opacity-70 animate-pulse"></div>
        </div>
      </div>

      {/* Login Button */}
      <div className="max-w-md mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="text-center mb-8"
        >
          <h2 className="text-2xl font-bold text-secondary-900 mb-3">Get Started</h2>
          <p className="text-secondary-600">Book your ride in seconds</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <Link to="/user/login" className="block">
            <Card hover className="p-6 text-center group cursor-pointer">
              <div className="w-16 h-16 bg-green-100 rounded-xl mx-auto mb-4 flex items-center justify-center group-hover:scale-110 transition-transform">
                <User className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold text-secondary-900 mb-3">{t('user.login')}</h3>
              <div className="w-full bg-primary-500 hover:bg-primary-600 text-white py-4 px-6 rounded-xl font-semibold text-lg transition-colors flex items-center justify-center space-x-2 min-h-[44px]">
                <span>Continue</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </div>
            </Card>
          </Link>
        </motion.div>
      </div>

      {/* Features */}
      <div className="bg-white py-12">
        <div className="max-w-md mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-8"
          >
            <h2 className="text-2xl font-bold text-secondary-900 mb-3">Why Choose ThamizhTravels?</h2>
            <p className="text-secondary-600">Built for the people of Tamil Nadu</p>
          </motion.div>

          <div className="space-y-4">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 + index * 0.1 }}
                className="bg-white rounded-xl p-6 shadow-sm border border-secondary-200"
              >
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <feature.icon className="w-6 h-6 text-primary-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-secondary-900 mb-1">{feature.title}</h3>
                    <p className="text-secondary-600 text-sm">{feature.description}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};