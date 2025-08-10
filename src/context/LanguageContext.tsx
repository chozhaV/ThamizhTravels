import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Language, Translations } from '../types';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const translations: Translations = {
  en: {
    // Common
    'app.name': 'ThamizhTravels',
    'app.tagline': 'Your Travel Companion',
    'login': 'Login',
    'logout': 'Logout',
    'dashboard': 'Dashboard',
    'profile': 'Profile',
    'settings': 'Settings',
    'search': 'Search',
    'filter': 'Filter',
    'save': 'Save',
    'cancel': 'Cancel',
    'submit': 'Submit',
    'loading': 'Loading...',
    'error': 'Something went wrong',
    'success': 'Success',
    
    // Auth
    'admin.login': 'Admin Login',
    'driver.login': 'Driver Login',
    'user.login': 'User Login',
    'email': 'Email',
    'password': 'Password',
    'signin': 'Sign In',
    'welcome.back': 'Welcome Back',
    
    // Dashboard
    'manage.users': 'Manage Users',
    'manage.drivers': 'Manage Drivers',
    'trip.history': 'Trip History',
    'new.requests': 'New Requests',
    'book.ride': 'Book a Ride',
    'my.bookings': 'My Bookings',
    
    // Forms
    'name': 'Name',
    'phone': 'Phone Number',
    'address': 'Address',
    'license.no': 'License Number',
    'vehicle.type': 'Vehicle Type',
    'vehicle.no': 'Vehicle Number',
    
    // Booking
    'pickup.location': 'Pickup Location',
    'drop.location': 'Drop Location',
    'vehicle.preference': 'Vehicle Preference',
    'payment.method': 'Payment Method',
    'schedule.ride': 'Schedule Ride',
    'book.now': 'Book Now',
    
    // Payment
    'credit.card': 'Credit/Debit Card',
    'upi': 'UPI',
    'cash': 'Cash on Delivery',
  },
  ta: {
    // Common
    'app.name': 'தமிழ் டிராவல்ஸ்',
    'app.tagline': 'உங்கள் பயண துணை',
    'login': 'உள்நுழைவு',
    'logout': 'வெளியேறு',
    'dashboard': 'முகப்பு',
    'profile': 'சுயவிவரம்',
    'settings': 'அமைப்புகள்',
    'search': 'தேடல்',
    'filter': 'வடிகட்டி',
    'save': 'சேமி',
    'cancel': 'ரத்து',
    'submit': 'சமர்ப்பிக்கவும்',
    'loading': 'ஏற்றுகிறது...',
    'error': 'ஏதோ தவறு நடந்துள்ளது',
    'success': 'வெற்றி',
    
    // Auth
    'admin.login': 'நிர்வாக உள்நுழைவு',
    'driver.login': 'ஓட்டுநர் உள்நுழைவு',
    'user.login': 'பயனர் உள்நுழைவு',
    'email': 'மின்னஞ்சல்',
    'password': 'கடவுச்சொல்',
    'signin': 'உள்நுழைய',
    'welcome.back': 'மீண்டும் வரவேற்கிறோம்',
    
    // Dashboard
    'manage.users': 'பயனர்களை நிர்வகிக்கவும்',
    'manage.drivers': 'ஓட்டுநர்களை நிர்வகிக்கவும்',
    'trip.history': 'பயண வரலாறு',
    'new.requests': 'புதிய கோரிக்கைகள்',
    'book.ride': 'சவாரி முன்பதிவு',
    'my.bookings': 'என் முன்பதிவுகள்',
    
    // Forms
    'name': 'பெயர்',
    'phone': 'தொலைபேசி எண்',
    'address': 'முகவரி',
    'license.no': 'உரிம எண்',
    'vehicle.type': 'வாகன வகை',
    'vehicle.no': 'வாகன எண்',
    
    // Booking
    'pickup.location': 'ஏறும் இடம்',
    'drop.location': 'இறங்கும் இடம்',
    'vehicle.preference': 'வாகன விருப்பம்',
    'payment.method': 'பணம் செலுத்தும் முறை',
    'schedule.ride': 'சவாரி திட்டமிடுங்கள்',
    'book.now': 'இப்போது முன்பதிவு செய்யுங்கள்',
    
    // Payment
    'credit.card': 'கிரெடிட்/டெபிட் கார்ட்',
    'upi': 'யூபிஐ',
    'cash': 'டெலிவரியில் பணம்',
  },
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('en');

  const t = (key: string): string => {
    return translations[language][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};