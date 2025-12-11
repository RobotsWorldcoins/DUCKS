import React from 'react';
import { Header } from './Header';
import { Footer } from './Footer';

interface LayoutProps {
  children: React.ReactNode;
  setCurrentRoute: (route: string) => void;
  currentRoute: string;
}

export const Layout: React.FC<LayoutProps> = ({ children, setCurrentRoute, currentRoute }) => {
  return (
    <div className="min-h-screen flex flex-col bg-gold-50 text-gray-800">
      <Header setCurrentRoute={setCurrentRoute} currentRoute={currentRoute} />
      <main className="flex-grow container mx-auto px-4 py-8 max-w-5xl">
        {children}
      </main>
      <Footer setCurrentRoute={setCurrentRoute} />
    </div>
  );
};