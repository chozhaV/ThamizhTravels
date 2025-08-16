import React from 'react';
import { Header } from './Header';

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen bg-primary-50 flex flex-col max-w-md mx-auto">
      <Header />
      <main className="flex-1">
        {children}
      </main>
    </div>
  );
};