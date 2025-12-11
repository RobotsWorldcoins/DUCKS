
import React, { useState } from 'react';
import { useGame } from '../store';
import { ADMIN_ADDRESS } from '../constants';
import { ShieldAlert, ShieldCheck, DollarSign, Users, RefreshCw } from 'lucide-react';

export const Admin: React.FC = () => {
  const { userData, poolData, isConnected, withdrawAdminFees, withdrawReserve, transferLiquidity, isLoading } = useGame();
  const [transferAmount, setTransferAmount] = useState("");

  // STRICT Security check 
  if (!isConnected || userData.address !== ADMIN_ADDRESS) { 
     return (
         <div className="flex flex-col items-center justify-center min-h-[60vh] text-red-500 p-8 text-center">
             <ShieldAlert size={64} className="mb-4" />
             <h1 className="text-3xl font-black mb-2">ACCESS DENIED</h1>
             <p className="text-gray-600 max-w-md">
                 This panel is cryptographically restricted to wallet: <br/>
                 <span className="font-mono bg-gray-100 p-1 rounded text-xs text-gray-800">{ADMIN_ADDRESS}</span>
             </p>
             <p className="mt-4 text-sm text-gray-400">Your address: {userData.address || "Not Connected"}</p>
         </div>
     )
  }

  return (
    <div className="bg-slate-900 text-slate-50 p-6 md:p-10 rounded-3xl shadow-2xl border border-slate-700">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 border-b border-slate-700 pb-6">
            <div>
                <h1 className="text-3xl font-mono font-bold text-green-400 flex items-center gap-3">
                    <ShieldCheck /> ADMIN_PANEL
                </h1>
                <p className="text-slate-400 font-mono text-sm mt-1 opacity-75">
                    GENIUS MINDS AI :: SUPERUSER ACCESS
                </p>
            </div>
            <div className="mt-4 md:mt-0 flex flex-col items-end">
                <div className="px-3 py-1 bg-green-900/50 text-green-300 rounded border border-green-800 text-xs font-bold animate-pulse flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-400 rounded-full"></div> SYSTEM ACTIVE
                </div>
                <span className="text-xs font-mono text-slate-500 mt-1">v1.2.4-stable</span>
            </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {/* Card 1: Fixed Profit */}
            <div className="bg-slate-800 p-6 rounded-xl border-l-4 border-gold-500">
                <span className="text-slate-400 text-xs font-bold uppercase tracking-wider flex items-center gap-2">
                    <DollarSign size={14} /> Admin Profit (3%)
                </span>
                <div className="text-4xl font-mono mt-2 font-bold text-white">
                    {poolData.adminFeeBalance.toFixed(4)} <span className="text-lg text-slate-500">WLD</span>
                </div>
                <p className="text-xs text-slate-500 mt-2">Available to withdraw</p>
            </div>

            {/* Card 2: Reserve/Orphan Fees */}
            <div className="bg-slate-800 p-6 rounded-xl border-l-4 border-blue-500">
                <span className="text-slate-400 text-xs font-bold uppercase tracking-wider flex items-center gap-2">
                    <Users size={14} /> Backup Reserve (5%)
                </span>
                <div className="text-4xl font-mono mt-2 font-bold text-white">
                    {poolData.reserveBalance.toFixed(4)} <span className="text-lg text-slate-500">WLD</span>
                </div>
                <p className="text-xs text-slate-500 mt-2">Protected Anti-Exploit Pool</p>
            </div>

            {/* Card 3: Total Contract */}
            <div className="bg-slate-800 p-6 rounded-xl border-l-4 border-green-500">
                <span className="text-slate-400 text-xs font-bold uppercase tracking-wider">
                     Main Liquidity (TVL)
                </span>
                <div className="text-4xl font-mono mt-2 font-bold text-white">
                    {poolData.contractBalance.toFixed(2)} <span className="text-lg text-slate-500">WLD</span>
                </div>
                <p className="text-xs text-slate-500 mt-2">Public Pool</p>
            </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Withdrawals */}
            <div className="bg-slate-800 p-8 rounded-xl border border-slate-700">
                <h3 className="text-sm font-bold text-slate-300 mb-6 uppercase tracking-widest border-b border-slate-700 pb-2">
                    Fee Withdrawals
                </h3>
                <div className="flex flex-col gap-4">
                    <button 
                        onClick={withdrawAdminFees}
                        disabled={isLoading || poolData.adminFeeBalance <= 0}
                        className="bg-green-600 hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed text-white px-6 py-4 rounded-lg font-mono text-sm font-bold transition flex items-center justify-between"
                    >
                        <span>WITHDRAW ADMIN PROFIT</span>
                        <span>{poolData.adminFeeBalance.toFixed(2)} WLD</span>
                    </button>
                    <button 
                        onClick={withdrawReserve}
                        disabled={isLoading || poolData.reserveBalance <= 0}
                        className="bg-blue-600 hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed text-white px-6 py-4 rounded-lg font-mono text-sm font-bold transition flex items-center justify-between"
                    >
                        <span>WITHDRAW RESERVE VAULT</span>
                        <span>{poolData.reserveBalance.toFixed(2)} WLD</span>
                    </button>
                </div>
            </div>

            {/* Liquidity Management */}
            <div className="bg-slate-800 p-8 rounded-xl border border-slate-700">
                 <h3 className="text-sm font-bold text-slate-300 mb-6 uppercase tracking-widest border-b border-slate-700 pb-2 flex items-center gap-2">
                    <RefreshCw size={16} /> Inter-Pool Liquidity Transfer
                </h3>
                <div className="space-y-4">
                    <input 
                        type="number"
                        placeholder="Amount to transfer"
                        value={transferAmount}
                        onChange={(e) => setTransferAmount(e.target.value)}
                        className="w-full bg-slate-900 border border-slate-600 text-white rounded p-3 font-mono"
                    />
                    <div className="flex gap-4">
                        <button 
                             onClick={() => transferLiquidity('reserve', Number(transferAmount))}
                             disabled={isLoading}
                             className="flex-1 bg-slate-700 hover:bg-slate-600 text-white py-3 rounded font-bold text-xs"
                        >
                            RESERVE &rarr; MAIN
                        </button>
                        <button 
                             onClick={() => transferLiquidity('main', Number(transferAmount))}
                             disabled={isLoading}
                             className="flex-1 bg-slate-700 hover:bg-slate-600 text-white py-3 rounded font-bold text-xs"
                        >
                            MAIN &rarr; RESERVE
                        </button>
                    </div>
                    <p className="text-xs text-slate-500 mt-2">
                        *Use only in emergency to rebalance pools. Requires Multi-Sig verification (Simulated).
                    </p>
                </div>
            </div>
        </div>
    </div>
  );
};
