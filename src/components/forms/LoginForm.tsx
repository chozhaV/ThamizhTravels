import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Input } from '../ui/Input';
import { Button } from '../ui/Button';
import { useLanguage } from '../../context/LanguageContext';
import { User } from '../../types';

interface LoginFormProps {
  role: 'admin' | 'driver' | 'user';
  onLogin: (user: User) => void;
}

export const LoginForm: React.FC<LoginFormProps> = ({ role, onLogin }) => {
  const { t } = useLanguage();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Simulate API call
    setTimeout(() => {
      const user: User = {
        id: '1',
        name: role === 'admin' ? 'Admin User' : role === 'driver' ? 'Driver Name' : 'John Doe',
        email: formData.email,
        phone: '+91 98765 43210',
        address: 'Chennai, Tamil Nadu',
        role: role,
        isNew: false, // Set to true for demo purposes to show forms
      };
      onLogin(user);
      setLoading(false);
    }, 1500);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <motion.form
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      onSubmit={handleSubmit}
      className="space-y-6"
    >
      <Input
        label={t('email')}
        type="email"
        name="email"
        value={formData.email}
        onChange={handleChange}
        placeholder="Enter your email"
        required
      />

      <Input
        label={t('password')}
        type="password"
        name="password"
        value={formData.password}
        onChange={handleChange}
        placeholder="Enter your password"
        required
      />

      <Button
        type="submit"
        loading={loading}
        className="w-full"
        size="lg"
      >
        {t('signin')}
      </Button>
    </motion.form>
  );
};