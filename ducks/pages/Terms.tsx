import React from 'react';
import { TERMS_TEXT } from '../constants';
import { FileText } from 'lucide-react';

export const Terms: React.FC = () => {
  return (
    <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100 max-w-4xl mx-auto">
      <div className="border-b border-gray-100 pb-6 mb-6">
          <h1 className="text-2xl font-bold flex items-center gap-2 text-gray-900">
              <FileText className="text-gold-500" />
              Terms & Conditions
          </h1>
          <p className="text-sm text-gray-400 mt-2">Last Updated: October 2023</p>
      </div>
      
      <div className="space-y-6 text-sm md:text-base text-gray-700 font-light">
         {TERMS_TEXT.split('\n\n').map((section, idx) => (
             <div key={idx} className="bg-gray-50 p-6 rounded-xl border border-gray-100">
                 <p className="whitespace-pre-line">{section}</p>
             </div>
         ))}
      </div>

      <div className="mt-8 text-center">
          <p className="text-xs text-gray-400">
              By using the DUCKS application, you acknowledge that you have read and understood these terms.
          </p>
      </div>
    </div>
  );
};