import React from 'react';
import { motion } from 'framer-motion';
import { Car, Shield, User, ArrowRight, Star, Users, MapPin, Clock } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { useLanguage } from '../context/LanguageContext';

export const Home: React.FC = () => {
  const { t } = useLanguage();

  const loginOptions = [
    { title: t('admin.login'), path: '/admin/login', icon: Shield, color: 'text-purple-600', bg: 'bg-purple-100' },
    { title: t('driver.login'), path: '/driver/login', icon: Car, color: 'text-blue-600', bg: 'bg-blue-100' },
    { title: t('user.login'), path: '/user/login', icon: User, color: 'text-green-600', bg: 'bg-green-100' },
  ];

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
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
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
                className="w-24 h-24 bg-primary-500 rounded-2xl mx-auto mb-8 flex items-center justify-center"
              >
                <Car className="w-12 h-12 text-white" />
              </motion.div>
              
              <h1 className="text-5xl md:text-6xl font-bold text-secondary-900">
                {t('app.name')}
              </h1>
              
              <p className="text-xl text-secondary-600 max-w-3xl mx-auto">
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
          <div className="absolute top-20 right-20 w-72 h-72 bg-primary-200 rounded-full mix-blend-multiply opacity-70 animate-pulse"></div>
          <div className="absolute bottom-20 left-20 w-96 h-96 bg-yellow-200 rounded-full mix-blend-multiply opacity-70 animate-pulse"></div>
        </div>
      </div>

      {/* Login Options */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl font-bold text-secondary-900 mb-4">Get Started</h2>
          <p className="text-secondary-600">Choose your role to continue</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {loginOptions.map((option, index) => (
            <motion.div
              key={option.path}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 + index * 0.1 }}
            >
              <Link to={option.path} className="block">
                <Card hover className="p-8 text-center group cursor-pointer">
                  <div className={`w-16 h-16 ${option.bg} rounded-xl mx-auto mb-4 flex items-center justify-center group-hover:scale-110 transition-transform`}>
                    <option.icon className={`w-8 h-8 ${option.color}`} />
                  </div>
                  <h3 className="text-xl font-semibold text-secondary-900 mb-2">{option.title}</h3>
                  <div className="flex items-center justify-center space-x-2 text-primary-600 group-hover:space-x-3 transition-all">
                    <span>Continue</span>
                    <ArrowRight className="w-4 h-4" />
                  </div>
                </Card>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Features */}
      <div className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold text-secondary-900 mb-4">Why Choose ThamizhTravels?</h2>
            <p className="text-secondary-600">Built for the people of Tamil Nadu, by Tamil Nadu</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 + index * 0.1 }}
                className="text-center"
              >
                <div className="w-12 h-12 bg-primary-100 rounded-lg mx-auto mb-4 flex items-center justify-center">
                  <feature.icon className="w-6 h-6 text-primary-600" />
                </div>
                <h3 className="text-lg font-semibold text-secondary-900 mb-2">{feature.title}</h3>
                <p className="text-secondary-600">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};