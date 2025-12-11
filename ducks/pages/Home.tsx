
import React from 'react';
import { useGame } from '../store';
import { StatsPanel } from '../components/StatsPanel';
import { ActionCenter } from '../components/ActionCenter';
import { DuckShop } from '../components/DuckShop';
import { TutorialOverlay } from '../components/TutorialOverlay';
import { ReferralStats } from '../components/ReferralStats';
import { Leaderboard } from '../components/Leaderboard';
import { GameInstructions } from '../components/GameInstructions';
import { Copy, Sparkles, ScanFace } from 'lucide-react';

// Embedded SVG Logo to ensure 100% reliability (Fixes broken image bug)
const GeniusMindsLogo = () => (
  <svg viewBox="0 0 400 400" className="w-64 h-64 md:w-80 md:h-80 z-10 relative" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="goldGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#fbbf24" />
        <stop offset="100%" stopColor="#d97706" />
      </linearGradient>
    </defs>
    
    <g transform="translate(100, 60)">
      {/* Abstract Hexagon Brain/Chip Icon */}
      <path d="M100 0 L186.6 50 L186.6 150 L100 200 L13.4 150 L13.4 50 Z" fill="white" stroke="url(#goldGradient)" strokeWidth="8" strokeLinejoin="round" />
      
      {/* Internal Circuitry */}
      <path d="M100 40 V100" stroke="#111827" strokeWidth="6" strokeLinecap="round" />
      <path d="M100 100 L140 125" stroke="#111827" strokeWidth="6" strokeLinecap="round" />
      <path d="M100 100 L60 125" stroke="#111827" strokeWidth="6" strokeLinecap="round" />
      
      {/* Nodes */}
      <circle cx="100" cy="40" r="6" fill="#fbbf24" />
      <circle cx="140" cy="125" r="6" fill="#fbbf24" />
      <circle cx="60" cy="125" r="6" fill="#fbbf24" />
      <circle cx="100" cy="100" r="10" fill="#111827" />
    </g>
    
    {/* Typography */}
    <text x="200" y="300" fontFamily="Inter, sans-serif" fontWeight="900" fontSize="32" textAnchor="middle" fill="#111827" letterSpacing="1">GENIUS</text>
    <text x="200" y="340" fontFamily="Inter, sans-serif" fontWeight="500" fontSize="22" textAnchor="middle" fill="#4b5563" letterSpacing="4">MINDS AI</text>
  </svg>
);

export const Home: React.FC = () => {
  const { isConnected, signInWithWorldID, userData, poolData, isLoading, loginStep } = useGame();
  const [copied, setCopied] = React.useState(false);

  const copyReferral = () => {
    if (userData.referralCode) {
      navigator.clipboard.writeText(userData.referralCode);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  if (!isConnected) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center space-y-8 min-h-[80vh]">
        <div className="relative group">
            {/* Soft Glow Effect */}
            <div className="absolute inset-0 bg-gold-300 blur-3xl opacity-20 rounded-full animate-pulse"></div>
            
            {/* Logo Container - Clean White Background */}
            <div className="relative bg-white p-8 rounded-3xl shadow-2xl border border-gray-50 flex items-center justify-center">
              <GeniusMindsLogo />
            </div>
        </div>
        
        <div className="max-w-xl space-y-4 px-4 relative z-10">
            <h1 className="text-4xl md:text-6xl font-black text-gray-900 tracking-tighter leading-tight">
                Grow Ducks. <br/>
                <span className="text-gold-500 text-transparent bg-clip-text bg-gradient-to-r from-gold-500 to-orange-500">
                  Earn WLD.
                </span>
            </h1>
            <p className="text-xl text-gray-600 font-medium">
                The premier yield farming game on WorldChain. 
                <br/>Hatch eggs, compound interest, and profit.
            </p>
        </div>

        <button 
            onClick={() => signInWithWorldID(false)}
            disabled={isLoading}
            className="bg-black text-white px-10 py-4 rounded-full font-bold text-lg shadow-xl hover:bg-gray-800 hover:shadow-2xl transition-all transform hover:-translate-y-1 active:scale-95 flex items-center gap-3 mx-auto disabled:opacity-75 disabled:cursor-wait relative z-10"
        >
            {isLoading ? (
                <span className="flex items-center gap-2">{loginStep === 'verifying' ? 'Verifying Proof...' : 'Connecting...'}</span>
            ) : (
                <>
                    <ScanFace size={24} />
                    <span>Sign in with World ID</span>
                </>
            )}
        </button>

        <div className="grid grid-cols-3 gap-8 mt-12 text-gray-500 text-sm border-t border-gold-200 pt-8 w-full max-w-2xl px-4 relative z-10">
             <div>
                <span className="block text-3xl font-black text-gray-900">14k+</span>
                Active Farmers
             </div>
             <div>
                <span className="block text-3xl font-black text-gray-900">$5.2k</span>
                TVL (WLD)
             </div>
             <div>
                <span className="block text-3xl font-black text-green-600">{poolData.apy.toFixed(0)}%</span>
                Current APR
             </div>
        </div>
      </div>
    );
  }

  return (
    <div className="animate-fade-in pb-24">
       {/* First Time User Tutorial Overlay */}
       <TutorialOverlay />

       {/* Top Row: Welcome + Referral Card */}
       <div className="mb-8 grid grid-cols-1 md:grid-cols-2 gap-4 items-end">
          <div>
            <h2 className="text-3xl font-black text-gray-900">My Farm</h2>
            <p className="text-gray-500 font-medium">Manage your ducks and harvest yield.</p>
          </div>
          
          {/* Aggressive Referral Card */}
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl p-1 shadow-md text-white transform hover:scale-[1.02] transition-transform">
             <div className="bg-white/10 backdrop-blur-md rounded-lg p-3 flex justify-between items-center">
                <div className="flex-1">
                   <div className="flex items-center gap-2 mb-1">
                      <Sparkles size={16} className="text-yellow-300" />
                      <span className="text-xs font-bold uppercase tracking-wider text-blue-100">Duck Dynasty Program</span>
                   </div>
                   <p className="text-sm font-bold leading-tight">
                     Earn <span className="text-yellow-300 text-lg">1%</span> from every friend forever!
                   </p>
                </div>
                
                <div className="flex flex-col items-end gap-2">
                   <div className="bg-black/30 px-3 py-1 rounded text-xs font-mono font-bold border border-white/10">
                      {userData.referralCode || '...'}
                   </div>
                   <button 
                      onClick={copyReferral}
                      className="text-xs flex items-center gap-1 hover:text-yellow-300 transition font-medium"
                   >
                      {copied ? <span className="font-bold text-green-300">COPIED!</span> : <><Copy size={12} /> Copy Code</>}
                   </button>
                </div>
             </div>
          </div>
       </div>

       <StatsPanel />
       <ActionCenter />
       
       {/* Competition Leaderboard */}
       <Leaderboard />

       <ReferralStats />
       
       <GameInstructions />
       
       <DuckShop />
    </div>
  );
};
