import React from 'react';
import { motion } from 'framer-motion';
import { Shield } from 'lucide-react';
import { LoginForm } from '../../components/forms/LoginForm';
import { useLanguage } from '../../context/LanguageContext';
import { useAuth } from '../../context/AuthContext';
import { UserDetails } from '../../types';

export const AdminLogin: React.FC = () => {
  const { t } = useLanguage();
  const { login } = useAuth();

  const handleLogin = (user: UserDetails) => {
    login(user);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 to-white flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-md"
      >
        <div className="bg-white rounded-2xl shadow-xl p-6">
          <div className="text-center mb-8">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring" }}
              className="w-16 h-16 bg-primary-500 rounded-xl mx-auto mb-4 flex items-center justify-center"
            >
              <Shield className="w-8 h-8 text-white" />
            </motion.div>
            <h1 className="text-2xl font-bold text-secondary-900">{t('admin.login')}</h1>
            <p className="text-secondary-600 mt-2">{t('welcome.back')}</p>
          </div>

          <LoginForm role="admin" onLogin={handleLogin} />
        </div>
      </motion.div>
    </div>
  );
};