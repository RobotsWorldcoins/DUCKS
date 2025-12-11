
import React from 'react';
import { useGame } from '../store';
import { Users, Coins, History } from 'lucide-react';

export const ReferralStats: React.FC = () => {
  const { userData } = useGame();

  if (userData.referralLogs.length === 0) {
      return null;
  }

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gold-100 p-6 mb-8">
        <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                <Users className="text-blue-600" /> Referral Network
            </h3>
            <span className="text-xs font-mono bg-blue-50 text-blue-700 px-2 py-1 rounded">
                1% Commission Active
            </span>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="bg-gray-50 p-4 rounded-xl border border-gray-100">
                <p className="text-xs text-gray-500 font-bold uppercase tracking-wider mb-1">Total Recruits</p>
                <p className="text-2xl font-black text-gray-800">{userData.referralCount}</p>
            </div>
            <div className="bg-gray-50 p-4 rounded-xl border border-gray-100">
                <p className="text-xs text-gray-500 font-bold uppercase tracking-wider mb-1">Total Earned</p>
                <p className="text-2xl font-black text-gold-600">{userData.referralEarnings.toFixed(2)} <span className="text-sm text-gray-400">WLD</span></p>
            </div>
        </div>

        <div className="overflow-hidden rounded-xl border border-gray-100">
            <table className="w-full text-left text-sm">
                <thead className="bg-gray-50 text-gray-500 font-semibold uppercase text-xs">
                    <tr>
                        <th className="px-4 py-3">Wallet Address</th>
                        <th className="px-4 py-3">Date</th>
                        <th className="px-4 py-3 text-right">Commission</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                    {userData.referralLogs.map((log, index) => (
                        <tr key={index} className="hover:bg-gray-50 transition-colors">
                            <td className="px-4 py-3 font-mono text-gray-700">{log.address}</td>
                            <td className="px-4 py-3 text-gray-500">{log.timestamp}</td>
                            <td className="px-4 py-3 text-right font-bold text-green-600">+{log.amount.toFixed(4)} WLD</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    </div>
  );
};
