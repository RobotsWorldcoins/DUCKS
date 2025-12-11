
import React, { useState } from 'react';
import { useGame } from '../store';
import { RefreshCw, Coins, Link, CheckCircle2 } from 'lucide-react';
import { ConfirmationModal } from './ConfirmationModal';

export const ActionCenter: React.FC = () => {
  const { userData, hatchEggs, claimWLD, toggleAutoCompound, registerReferrer, isLoading } = useGame();
  const [refInput, setRefInput] = useState("");
  const [showClaimConfirm, setShowClaimConfirm] = useState(false);

  const eggCount = Math.floor(userData.eggs);

  const handleLinkReferrer = () => {
    if (refInput.trim().length > 0) {
      registerReferrer(refInput.trim());
      setRefInput("");
    }
  };

  const handleClaimClick = () => {
    setShowClaimConfirm(true);
  };

  return (
    <>
      <ConfirmationModal 
        isOpen={showClaimConfirm}
        onClose={() => setShowClaimConfirm(false)}
        onConfirm={claimWLD}
        title="Confirm Claim"
        confirmLabel="Claim WLD"
        isDangerous={true} // Warning style
        message={
            <div>
                Are you sure you want to claim your eggs for WLD?
                <div className="mt-3 bg-red-50 p-3 rounded-lg border border-red-100 text-xs text-red-800 space-y-2">
                    <p className="font-bold flex items-center gap-2">⚠️ 9% Tax Applied</p>
                    <p>A fee is deducted to support the reserve pool and admin/devs.</p>
                    <ul className="list-disc list-inside opacity-80">
                        <li>3% Admin Fee</li>
                        <li>5% Reserve Pool</li>
                        <li>1% Referral Reward</li>
                    </ul>
                </div>
            </div>
        }
      />

      <div className="bg-gradient-to-r from-gold-400 to-gold-600 rounded-2xl p-6 shadow-lg text-white mb-6">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          
          {/* Left: Egg Status */}
          <div className="flex items-center gap-4">
            <div className="bg-white/20 p-4 rounded-full backdrop-blur-sm">
              <span className="text-4xl">🥚</span>
            </div>
            <div>
              <h2 className="text-3xl font-bold">{userData.eggs.toFixed(4)}</h2>
              <p className="text-gold-100 font-medium">Unhatched Eggs</p>
            </div>
          </div>

          {/* Right: Actions */}
          <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
              
              <button 
                  onClick={hatchEggs}
                  disabled={isLoading || eggCount < 1}
                  className="flex-1 bg-white text-gold-600 hover:bg-gold-50 disabled:opacity-50 disabled:cursor-not-allowed px-6 py-3 rounded-xl font-bold shadow-sm transition-all flex items-center justify-center gap-2"
              >
                  <RefreshCw size={20} className={isLoading ? "animate-spin" : ""} />
                  Hatch (Compound)
              </button>

              <button 
                  onClick={handleClaimClick}
                  disabled={isLoading || eggCount < 10}
                  className="flex-1 bg-gold-700/40 hover:bg-gold-700/60 disabled:opacity-50 disabled:cursor-not-allowed text-white px-6 py-3 rounded-xl font-bold border border-white/20 transition-all flex items-center justify-center gap-2"
              >
                  <Coins size={20} />
                  Claim WLD
              </button>

          </div>
        </div>

        {/* Auto Compound Toggle */}
        <div className="mt-6 pt-4 border-t border-white/20 flex items-center justify-between">
            <div className="flex items-center gap-2 text-sm">
               <div className={`w-3 h-3 rounded-full ${userData.autoCompound ? 'bg-green-400 shadow-[0_0_8px_rgba(74,222,128,0.8)]' : 'bg-gray-400'}`}></div>
               <span className="font-medium opacity-90">Auto-Hatching is {userData.autoCompound ? 'ACTIVE' : 'OFF'}</span>
            </div>
            <button 
              onClick={toggleAutoCompound}
              className="text-xs font-semibold bg-black/20 hover:bg-black/30 px-3 py-1 rounded-lg transition"
            >
              {userData.autoCompound ? 'Disable' : 'Enable'} Automation
            </button>
        </div>
      </div>

      {/* Referral Link Input Section */}
      <div className="bg-white rounded-2xl p-4 shadow-sm border border-gold-100 mb-8 flex flex-col md:flex-row gap-4 items-center justify-between">
         <div className="flex items-center gap-3">
             <div className="bg-blue-100 text-blue-600 p-2 rounded-lg">
                <Link size={20} />
             </div>
             <div>
                <h4 className="font-bold text-gray-800 text-sm">Have a Referral Code?</h4>
                <p className="text-xs text-gray-500">Support the community economy.</p>
             </div>
         </div>
         
         {userData.referrer ? (
             <div className="flex items-center gap-2 bg-green-50 text-green-700 px-4 py-2 rounded-lg text-sm font-medium">
                 <CheckCircle2 size={16} />
                 Linked to: <span className="font-mono font-bold">{userData.referrer}</span>
             </div>
         ) : (
            <div className="flex gap-2 w-full md:w-auto">
                <input 
                  type="text" 
                  placeholder="Enter Code (e.g. DUCK-X99)" 
                  value={refInput}
                  onChange={(e) => setRefInput(e.target.value)}
                  className="border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-gold-400 w-full"
                />
                <button 
                  onClick={handleLinkReferrer}
                  className="bg-gray-800 text-white px-4 py-2 rounded-lg text-sm font-bold hover:bg-gray-900"
                >
                  Link
                </button>
            </div>
         )}
      </div>
    </>
  );
};
