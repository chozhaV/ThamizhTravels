import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Phone, Shield } from 'lucide-react';
import { Input } from '../../components/ui/Input';
import { Button } from '../../components/ui/Button';
import { useLanguage } from '../../context/LanguageContext';
import { useAuth } from '../../context/AuthContext';
import { OTPResponse } from '../../types';
import axios from "axios";

const API_BASE = "http://localhost:5000";

export const MobileLogin: React.FC = () => {
  const { t } = useLanguage();
  const { login } = useAuth();
  const [step, setStep] = useState<'phone' | 'otp'>('phone');
  const [phone, setPhone] = useState('');
  const [code, setCode] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const sendcode = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!phone) return setError("Please enter phone number");
    try {
      setLoading(true);
      const res = await axios.post(`${API_BASE}/send-otp`, { phone });
      console.log(res);
      setError(res.data.message);
      setStep("otp");
    } catch (error: any) {
      setError(error.response?.data?.message || "Error sending OTP");
    } finally {
      setLoading(false);
    }
  };

  const verifyOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!code) return setError("Please enter OTP");
    try {
      setLoading(true);
      const res = await axios.post(`${API_BASE}/verify-otp`, { phone, code });
      setError(res.data.message);
      if (res.data.token) {
        localStorage.setItem("authToken", res.data.token);
        login(res.data);
      }
    } catch (error: any) {
      setError(error.response?.data?.message || "Error verifying OTP");
    } finally {
      setLoading(false);
    }
  };

  const handleResendOTP = async () => {
    setLoading(true);
    setError('');

    try {
      const response = await fetch('/api/send-otp', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ phone }),
      });

      const data: OTPResponse = await response.json();

      if (!data.success) {
        setError(data.message || 'Failed to resend OTP');
      }
    } catch (err) {
      // For demo purposes, simulate API call
      setTimeout(() => {
        setLoading(false);
      }, 1000);
      return;
    }

    setLoading(false);
  };

  return (
    <div className="w-full">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full"
      >
        <div className="bg-white rounded-2xl shadow-sm border border-secondary-200 p-6">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-secondary-900 mb-3">Get Started</h2>
            <p className="text-secondary-600 mb-6">Book your ride in seconds</p>
            
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring" }}
              className="w-12 h-12 bg-primary-500 rounded-xl mx-auto mb-4 flex items-center justify-center"
            >
              {step === 'phone' ? (
                <Phone className="w-6 h-6 text-white" />
              ) : (
                <Shield className="w-6 h-6 text-white" />
              )}
            </motion.div>
            <h3 className="text-lg font-semibold text-secondary-900">
              {step === 'phone' ? 'Enter Mobile Number' : 'Verify OTP'}
            </h3>
            <p className="text-secondary-600 mt-2">
              {step === 'phone' 
                ? 'We\'ll send you a verification code' 
                : `Code sent to ${phone}`
              }
            </p>
          </div>

          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-red-50 border border-red-200 text-red-600 px-3 py-2 rounded-lg mb-4 text-sm"
            >
              {error}
            </motion.div>
          )}

          {step === 'phone' ? (
            <motion.form
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-6"
              onSubmit={sendcode}
            >
              <Input
                label="Mobile Number"
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="+91 98765 43210"
                required
                maxLength={13}
              />

              <Button type="submit" loading={loading} className="w-full" size="lg">
                Send OTP
              </Button>
            </motion.form>
          ) : (
            <motion.form
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-6"
              onSubmit={verifyOtp}
            >
              <Input
                label="Enter OTP"
                type="text"
                value={code}
                onChange={(e) => setCode(e.target.value.replace(/\D/g, '').slice(0, 6))}
                placeholder="123456"
                required
                maxLength={6}
                className="text-center text-2xl tracking-widest"
              />

              <div className="space-y-3">
                <Button type="submit" loading={loading} className="w-full" size="lg">
                  Verify OTP
                </Button>

                <div className="text-center">
                  <button
                    type="button"
                    onClick={handleResendOTP}
                    disabled={loading}
                    className="text-primary-600 hover:text-primary-700 text-sm font-medium disabled:opacity-50"
                  >
                    Resend OTP
                  </button>
                </div>

                <div className="text-center">
                  <button
                    type="button"
                    onClick={() => {
                      setStep('phone');
                      setCode('');
                      setError('');
                    }}
                    className="text-secondary-500 hover:text-secondary-700 text-sm"
                  >
                    Change mobile number
                  </button>
                </div>
              </div>
            </motion.form>
          )}
        </div>
      </motion.div>
    </div>
  );
};