import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Clock, CreditCard, Calendar, Navigation, Car, Star } from 'lucide-react';
import { Card } from '../ui/Card';
import { Input } from '../ui/Input';
import { Button } from '../ui/Button';
import { Modal } from '../ui/Modal';
import { useLanguage } from '../../context/LanguageContext';
import { useAuth } from '../../context/AuthContext';
import { UserDetailsForm } from '../forms/UserDetailsForm';

const mockBookings = [
  { id: '1', from: 'T. Nagar', to: 'Anna Nagar', driver: 'Ram Kumar', fare: '₹150', status: 'completed', date: '2025-01-14', rating: 5 },
  { id: '2', from: 'Velachery', to: 'OMR', driver: 'Vijay Anand', fare: '₹220', status: 'in-progress', date: '2025-01-14', rating: 0 },
];

export const UserDashboard: React.FC = () => {
  const { t } = useLanguage();
  const { user } = useAuth();
  const [bookingData, setBookingData] = useState({
    from: '',
    to: '',
    vehicleType: '',
    scheduledTime: '',
    paymentMethod: '',
    notes: '',
  });
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [loading, setLoading] = useState(false);

  // Show user details form for new users
  if (user?.isNew) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <UserDetailsForm />
      </div>
    );
  }

  const handleBooking = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Simulate booking API call
    setTimeout(() => {
      setLoading(false);
      setShowBookingModal(false);
      alert('Booking confirmed! Your driver will arrive shortly.');
      // Reset form
      setBookingData({
        from: '',
        to: '',
        vehicleType: '',
        scheduledTime: '',
        paymentMethod: '',
        notes: '',
      });
    }, 2000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setBookingData(prev => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-8"
      >
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold text-secondary-900">Welcome, {user?.name}!</h1>
            <p className="text-secondary-600 mt-2">Book your next ride or manage existing bookings</p>
          </div>

          <Button
            onClick={() => setShowBookingModal(true)}
            size="lg"
            className="flex items-center space-x-2"
          >
            <Car className="w-5 h-5" />
            <span>{t('book.ride')}</span>
          </Button>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card hover className="p-6 cursor-pointer" onClick={() => setShowBookingModal(true)}>
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center">
                <Navigation className="w-6 h-6 text-primary-600" />
              </div>
              <div>
                <h3 className="font-semibold text-secondary-900">{t('book.ride')}</h3>
                <p className="text-sm text-secondary-600">Book a new ride</p>
              </div>
            </div>
          </Card>

          <Card hover className="p-6 cursor-pointer">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <Clock className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <h3 className="font-semibold text-secondary-900">Schedule Ride</h3>
                <p className="text-sm text-secondary-600">Book for later</p>
              </div>
            </div>
          </Card>

          <Card hover className="p-6 cursor-pointer">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                <CreditCard className="w-6 h-6 text-purple-600" />
              </div>
              <div>
                <h3 className="font-semibold text-secondary-900">Payment</h3>
                <p className="text-sm text-secondary-600">Manage payments</p>
              </div>
            </div>
          </Card>
        </div>

        {/* My Bookings */}
        <Card className="p-6">
          <h3 className="text-lg font-semibold text-secondary-900 mb-6">{t('my.bookings')}</h3>
          
          <div className="space-y-4">
            {mockBookings.map((booking) => (
              <motion.div
                key={booking.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="border border-secondary-200 rounded-lg p-4"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <MapPin className="w-4 h-4 text-green-500" />
                      <span className="text-sm font-medium">{booking.from}</span>
                      <span className="text-secondary-400">→</span>
                      <MapPin className="w-4 h-4 text-red-500" />
                      <span className="text-sm font-medium">{booking.to}</span>
                    </div>
                    <div className="flex items-center space-x-4 text-xs text-secondary-600">
                      <span>Driver: {booking.driver}</span>
                      <span>{booking.date}</span>
                      <span className="font-semibold text-green-600">{booking.fare}</span>
                    </div>
                    {booking.status === 'completed' && booking.rating > 0 && (
                      <div className="flex items-center space-x-1">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`w-3 h-3 ${
                              i < booking.rating ? 'text-yellow-500 fill-current' : 'text-secondary-300'
                            }`}
                          />
                        ))}
                      </div>
                    )}
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <span className={`inline-flex px-2 py-1 text-xs rounded-full ${
                      booking.status === 'completed'
                        ? 'bg-green-100 text-green-800'
                        : booking.status === 'in-progress'
                        ? 'bg-blue-100 text-blue-800'
                        : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {booking.status}
                    </span>
                    {booking.status === 'in-progress' && (
                      <Button size="sm" variant="outline">Track</Button>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </Card>

        {/* Booking Modal */}
        <Modal
          isOpen={showBookingModal}
          onClose={() => setShowBookingModal(false)}
          title={t('book.ride')}
        >
          <form onSubmit={handleBooking} className="space-y-6">
            <div className="space-y-4">
              <Input
                label={t('pickup.location')}
                name="from"
                value={bookingData.from}
                onChange={handleChange}
                placeholder="Enter pickup location"
                required
              />

              <Input
                label={t('drop.location')}
                name="to"
                value={bookingData.to}
                onChange={handleChange}
                placeholder="Enter drop location"
                required
              />

              <div>
                <label className="block text-sm font-medium text-secondary-700 mb-1">
                  {t('vehicle.preference')}
                </label>
                <select
                  name="vehicleType"
                  value={bookingData.vehicleType}
                  onChange={handleChange}
                  className="w-full px-3 py-2.5 border border-secondary-300 rounded-lg shadow-sm focus:border-primary-500 focus:ring-2 focus:ring-primary-200 focus:outline-none"
                  required
                >
                  <option value="">Select vehicle type</option>
                  <option value="auto">Auto Rickshaw (₹8/km)</option>
                  <option value="bike">Bike (₹6/km)</option>
                  <option value="car">Car (₹12/km)</option>
                  <option value="van">Van (₹15/km)</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-secondary-700 mb-1">
                  {t('payment.method')}
                </label>
                <div className="space-y-2">
                  {[
                    { value: 'cash', label: t('cash'), icon: '💵' },
                    { value: 'card', label: t('credit.card'), icon: '💳' },
                    { value: 'upi', label: t('upi'), icon: '📱' },
                  ].map((method) => (
                    <label key={method.value} className="flex items-center space-x-3 p-3 border border-secondary-300 rounded-lg cursor-pointer hover:border-primary-500">
                      <input
                        type="radio"
                        name="paymentMethod"
                        value={method.value}
                        checked={bookingData.paymentMethod === method.value}
                        onChange={handleChange}
                        className="text-primary-500 focus:ring-primary-500"
                        required
                      />
                      <span className="text-xl">{method.icon}</span>
                      <span className="font-medium">{method.label}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-secondary-700 mb-1">
                  Notes (Optional)
                </label>
                <textarea
                  name="notes"
                  value={bookingData.notes}
                  onChange={handleChange}
                  rows={3}
                  className="w-full px-3 py-2.5 border border-secondary-300 rounded-lg shadow-sm focus:border-primary-500 focus:ring-2 focus:ring-primary-200 focus:outline-none"
                  placeholder="Any special instructions..."
                />
              </div>
            </div>

            <div className="flex space-x-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => setShowBookingModal(false)}
                className="flex-1"
              >
                {t('cancel')}
              </Button>
              <Button
                type="submit"
                loading={loading}
                className="flex-1"
              >
                {t('book.now')}
              </Button>
            </div>
          </form>
        </Modal>
      </motion.div>
    </div>
  );
};