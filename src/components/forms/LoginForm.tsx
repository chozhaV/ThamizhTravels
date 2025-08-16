import React, { useState } from "react";
import { motion } from "framer-motion";
import { Input } from "../ui/Input";
import { Button } from "../ui/Button";
import { useLanguage } from "../../context/LanguageContext";
import { UserDetails } from "../../types";

interface LoginFormProps {
  role: "admin" | "driver" | "user";
  onLogin: (user: UserDetails) => void;
}

export const LoginForm: React.FC<LoginFormProps> = ({ role, onLogin }) => {
  const { t } = useLanguage();
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [loading, setLoading] = useState(false);
  const [isLogin, setIsLogin] = useState(true);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const url = !isLogin
      ? "http://localhost:5000/signup"
      : "http://localhost:5000/login";
    const payload = !isLogin
      ? {
          name: formData.fullName,
          email: formData.email,
          password: formData.password,
          role,
        }
      : { email: formData.email, password: formData.password, role };

    try {
      const res = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (res.ok && isLogin) {
        onLogin({
          ...data.user,
          phone: "+91 98765 43210",
          address: "Chennai, Tamil Nadu",
          isNew: !isLogin,
        });
      } else if (res.ok && !isLogin) {
        alert("✅ Signup successful! Please login.");
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error(error);
      alert("❌ Something went wrong");
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <motion.form
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
      onSubmit={handleSubmit}
    >
      {!isLogin && (
        <Input
          label={t("fullName") || "Full Name"}
          type="text"
          name="fullName"
          value={formData.fullName}
          onChange={handleChange}
          placeholder="Enter your full name"
          required
        />
      )}

      <Input
        label={t("email")}
        type="email"
        name="email"
        value={formData.email}
        onChange={handleChange}
        placeholder="Enter your email"
        required
      />

      <Input
        label={t("password")}
        type="password"
        name="password"
        value={formData.password}
        onChange={handleChange}
        placeholder="Enter your password"
        required
      />

      {!isLogin && (
        <Input
          label={t("confirmPassword") || "Confirm Password"}
          type="password"
          name="confirmPassword"
          value={formData.confirmPassword}
          onChange={handleChange}
          placeholder="Confirm your password"
          required
        />
      )}

      <div className="flex gap-4">
        {isLogin ? (
          <>
            <Button type="submit" loading={loading} className="w-1/2" size="lg">
              {t("signin")}
            </Button>
            <Button
              type="button"
              className="w-1/2"
              size="lg"
              onClick={() => setIsLogin(false)}
            >
              {t("signup")}
            </Button>
          </>
        ) : (
          <>
            <Button
              type="button"
              loading={loading}
              className="w-1/2"
              size="lg"
              onClick={() => setIsLogin(true)}
            >
              {t("backToLogin") || "Back"}
            </Button>
            <Button type="submit" loading={loading} className="w-1/2" size="lg">
              {t("register") || "Register"}
            </Button>
          </>
        )}
      </div>
    </motion.form>
  );
};
