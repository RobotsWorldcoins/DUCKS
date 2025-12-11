
import React from 'react';
import { ShieldCheck, Lock, FileText, CheckCircle } from 'lucide-react';

export const Footer: React.FC<{ setCurrentRoute: (r: string) => void }> = ({ setCurrentRoute }) => {
  return (
    <footer className="bg-white border-t border-gold-200 mt-12 py-8">
      <div className="container mx-auto px-4 text-center">
        
        <div className="flex justify-center items-center space-x-6 mb-6">
          <button onClick={() => setCurrentRoute('terms')} className="text-sm text-gray-500 hover:text-gold-600 flex items-center gap-1">
            <FileText size={14} /> Terms
          </button>
          <button onClick={() => setCurrentRoute('verification')} className="text-sm text-gray-500 hover:text-gold-600 flex items-center gap-1">
            <CheckCircle size={14} /> Badge Checker
          </button>
          <div className="text-sm text-green-600 flex items-center gap-1" title="Contract Verified">
            <ShieldCheck size={14} /> Security Audit
          </div>
          <div className="text-sm text-blue-600 flex items-center gap-1" title="Data Encrypted">
            <Lock size={14} /> Secure Connection
          </div>
        </div>

        <p className="text-gold-800 font-bold text-lg mb-2">no DUCKS no WLD =)</p>
        <p className="text-xs text-gray-400">
          © 2024 Genius Minds AI. All rights reserved. <br/>
          Deployed on WorldChain. 
        </p>
      </div>
    </footer>
  );
};
