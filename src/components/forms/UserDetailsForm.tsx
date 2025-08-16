import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Input } from '../ui/Input';
import { Button } from '../ui/Button';
import { useLanguage } from '../../context/LanguageContext';
import { useAuth } from '../../context/AuthContext';

export const UserDetailsForm: React.FC = () => {
  const { t } = useLanguage();
  const { user, updateUser } = useAuth();
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    dateOfBirth: user?.dateOfBirth || '',
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Call your backend API to update user details
      const response = await fetch('/api/user/update', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${user?.token}`,
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        updateUser(formData);
        setSuccess(true);
        setTimeout(() => setSuccess(false), 3000);
      }
    } catch (err) {
      // For demo purposes, simulate API call
      setTimeout(() => {
        updateUser(formData);
        setSuccess(true);
        setTimeout(() => setSuccess(false), 3000);
        setLoading(false);
      }, 1500);
      return;
    }

    setLoading(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h3 className="text-lg font-semibold text-secondary-900 mb-2">User Details</h3>
        <p className="text-sm text-secondary-600">Update your personal information</p>
      </div>

      {success && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-green-50 border border-green-200 text-green-600 px-4 py-3 rounded-lg text-sm"
        >
          Profile updated successfully!
        </motion.div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="bg-secondary-50 p-3 rounded-lg">
          <label className="block text-sm font-medium text-secondary-700 mb-1">
            Mobile Number
          </label>
          <p className="text-secondary-900 font-medium">{user?.phone}</p>
          <p className="text-xs text-secondary-500">Mobile number cannot be changed</p>
        </div>

        <Input
          label="Full Name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Enter your full name"
        />

        <Input
          label="Email Address"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Enter your email"
        />

        <Input
          label="Date of Birth"
          name="dateOfBirth"
          type="date"
          value={formData.dateOfBirth}
          onChange={handleChange}
        />

        <Button
          type="submit"
          loading={loading}
          className="w-full"
          size="lg"
        >
          Update Details
        </Button>
      </form>
    </div>
  );
};