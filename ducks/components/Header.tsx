
import React from 'react';
import { useGame } from '../store';
import { Wallet, Menu, X, ShieldCheck, Lock, ScanFace, LogOut } from 'lucide-react';
import { ADMIN_ADDRESS } from '../constants';

interface HeaderProps {
  setCurrentRoute: (route: string) => void;
  currentRoute: string;
}

export const Header: React.FC<HeaderProps> = ({ setCurrentRoute, currentRoute }) => {
  const { isConnected, signInWithWorldID, disconnectWallet, userData, isLoading, loginStep } = useGame();
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

  const isAdmin = userData.address === ADMIN_ADDRESS;

  const formatAddress = (addr: string | null) => {
    if (!addr) return '';
    return `${addr.slice(0, 6)}...${addr.slice(-4)}`;
  };

  const getButtonText = () => {
      switch(loginStep) {
          case 'connecting': return 'Connecting...';
          case 'verifying': return 'Verifying Proof...';
          case 'success': return 'Verified!';
          default: return 'Sign in with World ID';
      }
  };

  return (
    <nav className="bg-white border-b border-gold-200 sticky top-0 z-50 shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div 
            className="flex items-center cursor-pointer group"
            onClick={() => setCurrentRoute('home')}
          >
            <div className="bg-gold-400 p-2 rounded-lg mr-3 group-hover:bg-gold-500 transition-colors">
              <span className="text-2xl">🦆</span>
            </div>
            <div>
              <h1 className="text-2xl font-black text-gray-900 tracking-tight">DUCKS</h1>
              <span className="text-xs text-gold-600 font-medium tracking-wide hidden sm:block">WORLD CHAIN SUPER APP</span>
            </div>
          </div>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center space-x-6">
             <button 
              onClick={() => setCurrentRoute('home')} 
              className={`font-medium hover:text-gold-600 transition ${currentRoute === 'home' ? 'text-gold-600' : 'text-gray-600'}`}
            >
              Dashboard
            </button>
            <button 
              onClick={() => setCurrentRoute('about')} 
              className={`font-medium hover:text-gold-600 transition ${currentRoute === 'about' ? 'text-gold-600' : 'text-gray-600'}`}
            >
              About
            </button>
            
            {isAdmin && (
               <button 
                 onClick={() => setCurrentRoute('admin')} 
                 className={`font-mono font-bold text-red-600 flex items-center gap-1 ${currentRoute === 'admin' ? 'underline' : ''}`}
               >
                 <Lock size={14} /> ADMIN
               </button>
            )}
            
            {isConnected ? (
              <div className="flex items-center bg-gray-100 rounded-full pl-4 pr-1 py-1 border border-gray-200">
                <span className="text-xs font-bold text-green-600 mr-2 flex items-center gap-1">
                    <ShieldCheck size={12} /> Verified
                </span>
                <span className="text-sm font-semibold text-gray-700 mr-3 border-l border-gray-300 pl-3">
                  {userData.wldBalance.toFixed(2)} WLD
                </span>
                <button 
                  onClick={disconnectWallet}
                  className="bg-white text-gray-800 px-4 py-1.5 rounded-full text-sm font-bold shadow-sm border border-gray-200 hover:bg-red-50 hover:text-red-600 hover:border-red-200 transition-all w-32 flex items-center justify-center group relative"
                >
                  <span className="group-hover:hidden flex items-center gap-2">
                     <Wallet size={14} />
                     {formatAddress(userData.address)}
                  </span>
                  <span className="hidden group-hover:flex items-center gap-2 text-red-600">
                     <LogOut size={14} />
                     Disconnect
                  </span>
                </button>
              </div>
            ) : (
              <button 
                onClick={signInWithWorldID}
                disabled={isLoading}
                className="bg-black hover:bg-gray-800 text-white px-6 py-2 rounded-full font-bold shadow-md transition-all transform hover:scale-105 flex items-center gap-2 disabled:opacity-70 disabled:cursor-wait"
              >
                {isLoading ? <span className="animate-spin text-lg">⚡</span> : <ScanFace size={18} />}
                {getButtonText()}
              </button>
            )}
          </div>

          {/* Mobile Right Section */}
          <div className="md:hidden flex items-center gap-3">
            {isConnected && (
              <div className="bg-gray-100 rounded-full px-3 py-1.5 flex items-center gap-2 border border-gray-200 shadow-sm">
                <span className="text-xs font-black text-gray-800">{userData.wldBalance.toFixed(2)} WLD</span>
              </div>
            )}
            <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="text-gray-700 p-1">
              {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 px-4 py-4 space-y-4 shadow-lg animate-fade-in">
           <button 
              onClick={() => { setCurrentRoute('home'); setMobileMenuOpen(false); }} 
              className="block w-full text-left font-medium text-gray-700 py-2"
            >
              Dashboard
            </button>
            <button 
              onClick={() => { setCurrentRoute('about'); setMobileMenuOpen(false); }} 
              className="block w-full text-left font-medium text-gray-700 py-2"
            >
              About
            </button>
            <button 
              onClick={() => { setCurrentRoute('terms'); setMobileMenuOpen(false); }} 
              className="block w-full text-left font-medium text-gray-700 py-2"
            >
              Terms & Conditions
            </button>
            
            <div className="pt-2 border-t border-gray-100">
              {isConnected ? (
                <>
                  <div className="flex items-center justify-between bg-gold-50 p-4 rounded-xl border border-gold-100 mb-3 shadow-sm">
                     <span className="text-gold-800 text-sm font-bold flex items-center gap-2">
                       <Wallet size={16} /> Wallet Balance
                     </span>
                     <span className="text-gray-900 font-black text-xl">{userData.wldBalance.toFixed(2)} WLD</span>
                  </div>

                  <button 
                    onClick={() => { disconnectWallet(); setMobileMenuOpen(false); }}
                    className="w-full bg-red-50 hover:bg-red-100 text-red-600 border border-red-100 py-3 rounded-xl font-bold transition-colors flex items-center justify-center gap-2"
                  >
                    <LogOut size={18} />
                    Disconnect {formatAddress(userData.address)}
                  </button>
                </>
              ) : (
                <button 
                  onClick={() => { signInWithWorldID(); setMobileMenuOpen(false); }}
                  className="w-full bg-black text-white py-3 rounded-xl font-bold shadow-md flex justify-center items-center gap-2"
                >
                  <ScanFace size={20} /> Sign in with World ID
                </button>
              )}
            </div>
        </div>
      )}
    </nav>
  );
};
