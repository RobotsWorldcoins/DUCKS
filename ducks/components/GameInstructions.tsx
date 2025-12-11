
import React, { useState } from 'react';
import { RefreshCw, Coins, Clock, Info, ChevronDown, ChevronUp } from 'lucide-react';

export const GameInstructions: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gold-100 mb-12 overflow-hidden">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between p-6 bg-gray-50 hover:bg-gray-100 transition-colors text-left"
      >
        <div className="flex items-center gap-3">
          <div className="bg-blue-100 text-blue-600 p-2 rounded-lg">
            <Info size={24} />
          </div>
          <div>
            <h3 className="text-lg font-bold text-gray-900">How to Play</h3>
            <p className="text-sm text-gray-500">Rules for Hatching, Claiming & Taxes</p>
          </div>
        </div>
        {isOpen ? <ChevronUp className="text-gray-400" /> : <ChevronDown className="text-gray-400" />}
      </button>
      
      {isOpen && (
        <div className="p-6 border-t border-gray-100 grid grid-cols-1 md:grid-cols-2 gap-8 animate-fade-in">
          
          {/* Hatching Section */}
          <div>
            <h4 className="flex items-center gap-2 font-bold text-gray-900 mb-3 text-lg">
              <RefreshCw className="text-green-500" size={20} /> 
              Hatching (Compound)
            </h4>
            <div className="bg-green-50 rounded-xl p-4 border border-green-100 space-y-2 text-sm text-gray-700">
              <p><span className="font-bold">Goal:</span> Convert eggs into MORE ducks to increase production speed.</p>
              <p><span className="font-bold">Cost:</span> 25 Eggs = 1 Duck.</p>
              <p><span className="font-bold">Fee:</span> <span className="text-green-600 font-bold">0% Tax.</span> 100% efficient.</p>
              <p><span className="font-bold">Availability:</span> You can hatch as soon as you have at least 25 eggs.</p>
              <p className="italic text-xs mt-2 text-gray-500">"Compound daily to grow your flock exponentially."</p>
            </div>
          </div>

          {/* Claiming Section */}
          <div>
            <h4 className="flex items-center gap-2 font-bold text-gray-900 mb-3 text-lg">
              <Coins className="text-gold-500" size={20} /> 
              Claiming (Sell)
            </h4>
            <div className="bg-gold-50 rounded-xl p-4 border border-gold-100 space-y-2 text-sm text-gray-700">
              <p><span className="font-bold">Goal:</span> Sell eggs for WLD to your wallet.</p>
              <p><span className="font-bold">Fee:</span> <span className="text-red-500 font-bold">9% Tax</span> (3% Admin + 5% Reserve + 1% Referral).</p>
              <p><span className="font-bold">Minimum:</span> Must have at least 10 eggs to claim.</p>
              <p><span className="font-bold">Availability:</span> Anytime, as long as you meet the minimum.</p>
              <p className="italic text-xs mt-2 text-gray-500">"Only claim when you are satisfied with your daily yield."</p>
            </div>
          </div>

          {/* General Rules */}
          <div className="md:col-span-2 pt-4 border-t border-gray-100">
             <h4 className="flex items-center gap-2 font-bold text-gray-900 mb-3 text-sm uppercase tracking-wider">
               <Clock size={16} /> Game Mechanics
             </h4>
             <ul className="list-disc pl-5 space-y-1 text-sm text-gray-600">
               <li>**Production:** Ducks produce eggs every 3 seconds.</li>
               <li>**ROI:** Exactly <span className="font-bold text-gray-900">45 Days</span> (Net of fees) if you claim every day.</li>
               <li>**Sustainability:** The 5% Reserve Fee goes into a secure vault to back the liquidity pool during high volatility.</li>
               <li>**Referrals:** You earn 1% of every Buy and Claim made by people you invite.</li>
             </ul>
          </div>
        </div>
      )}
    </div>
  );
};
