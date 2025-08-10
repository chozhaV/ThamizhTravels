import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Input } from '../ui/Input';
import { Button } from '../ui/Button';
import { useLanguage } from '../../context/LanguageContext';

export const DriverDetailsForm: React.FC = () => {
  const { t } = useLanguage();
  const [formData, setFormData] = useState({
    name: '',
    licenseNo: '',
    vehicleType: '',
    vehicleNo: '',
    phone: '',
    email: '',
    address: '',
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      alert('Driver details saved successfully!');
    }, 1500);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-2xl mx-auto"
    >
      <div className="bg-white rounded-xl shadow-sm p-6">
        <h2 className="text-2xl font-bold text-secondary-900 mb-6">Driver Registration</h2>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Input
              label={t('name')}
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter full name"
              required
            />

            <Input
              label={t('phone')}
              name="phone"
              type="tel"
              value={formData.phone}
              onChange={handleChange}
              placeholder="+91 98765 43210"
              required
            />

            <Input
              label={t('email')}
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="driver@example.com"
              required
            />

            <Input
              label={t('license.no')}
              name="licenseNo"
              value={formData.licenseNo}
              onChange={handleChange}
              placeholder="TN01 20XX XXXXXX"
              required
            />

            <div>
              <label className="block text-sm font-medium text-secondary-700 mb-1">
                {t('vehicle.type')}
              </label>
              <select
                name="vehicleType"
                value={formData.vehicleType}
                onChange={handleChange}
                className="w-full px-3 py-2.5 border border-secondary-300 rounded-lg shadow-sm focus:border-primary-500 focus:ring-2 focus:ring-primary-200 focus:outline-none"
                required
              >
                <option value="">Select vehicle type</option>
                <option value="auto">Auto Rickshaw</option>
                <option value="bike">Bike</option>
                <option value="car">Car</option>
                <option value="van">Van</option>
              </select>
            </div>

            <Input
              label={t('vehicle.no')}
              name="vehicleNo"
              value={formData.vehicleNo}
              onChange={handleChange}
              placeholder="TN 01 AB 1234"
              required
            />
          </div>

          <Input
            label={t('address')}
            name="address"
            value={formData.address}
            onChange={handleChange}
            placeholder="Complete address"
            required
          />

          <Button
            type="submit"
            loading={loading}
            className="w-full"
            size="lg"
          >
            {t('submit')}
          </Button>
        </form>
      </div>
    </motion.div>
  );
};