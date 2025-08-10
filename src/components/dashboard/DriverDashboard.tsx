import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Bell, MapPin, Clock, Star, TrendingUp, DollarSign } from 'lucide-react';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { useLanguage } from '../../context/LanguageContext';
import { useAuth } from '../../context/AuthContext';
import { DriverDetailsForm } from '../forms/DriverDetailsForm';

const mockTripRequests = [
  { id: '1', from: 'T. Nagar', to: 'Anna Nagar', distance: '8.5 km', fare: '₹150', time: '5 mins ago' },
  { id: '2', from: 'Velachery', to: 'OMR', distance: '12.2 km', fare: '₹220', time: '2 mins ago' },
];

const mockTripHistory = [
  { id: '1', from: 'Adyar', to: 'Mylapore', distance: '5.2 km', fare: '₹120', rating: 5, date: '2025-01-14' },
  { id: '2', from: 'Guindy', to: 'Porur', distance: '15.8 km', fare: '₹280', rating: 4, date: '2025-01-14' },
  { id: '3', from: 'Tambaram', to: 'Chromepet', distance: '7.3 km', fare: '₹140', rating: 5, date: '2025-01-13' },
];

export const DriverDashboard: React.FC = () => {
  const { t } = useLanguage();
  const { user } = useAuth();
  const [isOnline, setIsOnline] = useState(false);

  // Show driver details form for new drivers
  if (user?.isNew) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <DriverDetailsForm />
      </div>
    );
  }

  const stats = [
    { title: 'Today\'s Earnings', value: '₹850', icon: DollarSign, color: 'text-green-600', bg: 'bg-green-100' },
    { title: 'Trips Completed', value: '12', icon: TrendingUp, color: 'text-blue-600', bg: 'bg-blue-100' },
    { title: 'Rating', value: '4.8', icon: Star, color: 'text-yellow-600', bg: 'bg-yellow-100' },
    { title: 'Hours Online', value: '8.5', icon: Clock, color: 'text-purple-600', bg: 'bg-purple-100' },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-8"
      >
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold text-secondary-900">Driver Dashboard</h1>
            <p className="text-secondary-600 mt-2">Welcome back, {user?.name}!</p>
          </div>

          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <span className="text-sm text-secondary-600">Status:</span>
              <button
                onClick={() => setIsOnline(!isOnline)}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  isOnline ? 'bg-green-600' : 'bg-secondary-300'
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    isOnline ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
              <span className={`text-sm font-medium ${isOnline ? 'text-green-600' : 'text-secondary-500'}`}>
                {isOnline ? 'Online' : 'Offline'}
              </span>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card hover className="p-4">
                <div className="flex items-center space-x-3">
                  <div className={`w-10 h-10 rounded-lg ${stat.bg} flex items-center justify-center`}>
                    <stat.icon className={`w-5 h-5 ${stat.color}`} />
                  </div>
                  <div>
                    <p className="text-xs text-secondary-600">{stat.title}</p>
                    <p className="text-lg font-bold text-secondary-900">{stat.value}</p>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Trip Requests */}
          <Card className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-secondary-900 flex items-center space-x-2">
                <Bell className="w-5 h-5 text-primary-500" />
                <span>{t('new.requests')}</span>
              </h3>
              <span className="bg-red-100 text-red-600 text-xs px-2 py-1 rounded-full">
                {mockTripRequests.length} new
              </span>
            </div>

            <div className="space-y-4">
              {mockTripRequests.map((request) => (
                <motion.div
                  key={request.id}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="border border-secondary-200 rounded-lg p-4 hover:border-primary-300 transition-colors"
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="space-y-1">
                      <div className="flex items-center space-x-2 text-sm">
                        <MapPin className="w-4 h-4 text-green-500" />
                        <span className="font-medium">{request.from}</span>
                      </div>
                      <div className="flex items-center space-x-2 text-sm">
                        <MapPin className="w-4 h-4 text-red-500" />
                        <span className="font-medium">{request.to}</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-green-600">{request.fare}</p>
                      <p className="text-xs text-secondary-500">{request.distance}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-secondary-500">{request.time}</span>
                    <div className="space-x-2">
                      <Button size="sm" variant="outline">Decline</Button>
                      <Button size="sm">Accept</Button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </Card>

          {/* Trip History */}
          <Card className="p-6">
            <h3 className="text-lg font-semibold text-secondary-900 mb-4">{t('trip.history')}</h3>
            
            <div className="space-y-4">
              {mockTripHistory.map((trip) => (
                <motion.div
                  key={trip.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="flex items-center justify-between p-3 bg-secondary-50 rounded-lg"
                >
                  <div className="space-y-1">
                    <div className="text-sm font-medium text-secondary-900">
                      {trip.from} → {trip.to}
                    </div>
                    <div className="text-xs text-secondary-500">
                      {trip.distance} • {trip.date}
                    </div>
                  </div>
                  
                  <div className="text-right space-y-1">
                    <p className="font-bold text-green-600">{trip.fare}</p>
                    <div className="flex items-center space-x-1">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-3 h-3 ${
                            i < trip.rating ? 'text-yellow-500 fill-current' : 'text-secondary-300'
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </Card>
        </div>
      </motion.div>
    </div>
  );
};