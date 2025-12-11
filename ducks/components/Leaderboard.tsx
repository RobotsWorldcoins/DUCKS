
import React, { useMemo, useState, useEffect } from 'react';
import { useGame } from '../store';
import { Trophy, Medal, Timer, AlertCircle } from 'lucide-react';

export const Leaderboard: React.FC = () => {
  const { leaderboard, userData } = useGame();
  const [timeLeft, setTimeLeft] = useState("");
  const [isUrgent, setIsUrgent] = useState(false);

  // Countdown Timer Logic
  useEffect(() => {
    const calculateTimeLeft = () => {
      // Set target to end of current month
      const now = new Date();
      const endOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0, 23, 59, 59);
      const diff = endOfMonth.getTime() - now.getTime();

      if (diff > 0) {
        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
        const minutes = Math.floor((diff / 1000 / 60) % 60);
        
        // Pad with zeros for professional look
        const h = hours < 10 ? `0${hours}` : hours;
        const m = minutes < 10 ? `0${minutes}` : minutes;
        
        setTimeLeft(`${days}d ${h}h ${m}m`);
        
        // Urgency logic: Less than 24 hours
        setIsUrgent(diff < 86400000); // 24 * 60 * 60 * 1000
      } else {
        setTimeLeft("Ended");
        setIsUrgent(false);
      }
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 60000);
    return () => clearInterval(timer);
  }, []);

  // Merge current user into leaderboard for display purposes and sort
  const sortedLeaderboard = useMemo(() => {
    let allEntries = [...leaderboard];
    
    // Check if user is already in the list (in real app this is DB ID check, here string match)
    const userExists = allEntries.some(e => e.address === userData.address);
    
    // Add current user to list for ranking if they aren't there
    if (!userExists && userData.address) {
        allEntries.push({
            address: userData.address,
            ducksBought: userData.monthlyDucksBought,
            totalWins: userData.competitionWins
        });
    } else if (userExists && userData.address) {
        // Update user's displayed score in list
        allEntries = allEntries.map(e => 
            e.address === userData.address 
            ? { ...e, ducksBought: userData.monthlyDucksBought } 
            : e
        );
    }

    return allEntries.sort((a, b) => b.ducksBought - a.ducksBought);
  }, [leaderboard, userData.address, userData.monthlyDucksBought, userData.competitionWins]);

  // Logic to determine Prize Winners (Skip ineligible users)
  let prizesGiven = 0;
  const processedEntries = sortedLeaderboard.map((entry, index) => {
    const isEligible = entry.totalWins < 3;
    let isWinner = false;
    
    // We give prizes to the top 5 ELIGIBLE users
    if (isEligible && prizesGiven < 5) {
        isWinner = true;
        prizesGiven++;
    }

    return {
        ...entry,
        rank: index + 1,
        isEligible,
        isWinner,
        isMe: entry.address === userData.address
    };
  });

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gold-100 overflow-hidden mb-8">
      {/* Header */}
      <div className="bg-gradient-to-r from-gray-900 to-gray-800 p-6 text-white flex flex-col md:flex-row justify-between items-center gap-4">
        <div className="flex items-center gap-4">
            <div className="bg-gold-500 p-3 rounded-full shadow-lg shadow-gold-500/20">
                <Trophy size={28} className="text-white" />
            </div>
            <div>
                <h3 className="text-xl font-black uppercase tracking-wide">Duck Derby</h3>
                <p className="text-gray-400 text-sm">Monthly Competition • Top 5 Win 1000 Ducks</p>
            </div>
        </div>
        
        <div className={`flex items-center gap-2 px-4 py-2 rounded-lg border backdrop-blur-sm transition-colors duration-500
            ${isUrgent 
                ? 'bg-red-500/20 border-red-500/50 text-red-200 animate-pulse' 
                : 'bg-white/10 border-white/10'
            }
        `}>
            <Timer size={18} className={isUrgent ? "text-red-400" : "text-gold-400"} />
            <div className="text-right">
                <p className={`text-[10px] uppercase font-bold leading-none ${isUrgent ? "text-red-300" : "text-gray-400"}`}>
                    {isUrgent ? "Ending Soon" : "Ends In"}
                </p>
                <p className="font-mono font-bold text-lg leading-none">{timeLeft}</p>
            </div>
        </div>
      </div>

      {/* Stats Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-left">
            <thead className="bg-gray-50 text-gray-500 text-xs font-bold uppercase tracking-wider">
                <tr>
                    <th className="px-6 py-4">Rank</th>
                    <th className="px-6 py-4">Farmer</th>
                    <th className="px-6 py-4">Ducks Bought (Month)</th>
                    <th className="px-6 py-4 text-center">Status</th>
                </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
                {processedEntries.map((entry) => (
                    <tr key={entry.address} className={`${entry.isMe ? 'bg-gold-50' : 'hover:bg-gray-50'} transition-colors`}>
                        <td className="px-6 py-4">
                             <div className="flex items-center gap-2">
                                {entry.rank === 1 && <span className="text-2xl">🥇</span>}
                                {entry.rank === 2 && <span className="text-2xl">🥈</span>}
                                {entry.rank === 3 && <span className="text-2xl">🥉</span>}
                                {entry.rank > 3 && <span className="font-mono font-bold text-gray-400">#{entry.rank}</span>}
                             </div>
                        </td>
                        <td className="px-6 py-4">
                            <div className="flex flex-col">
                                <span className={`font-mono font-medium ${entry.isMe ? 'text-gold-700 font-bold' : 'text-gray-700'}`}>
                                    {entry.isMe ? 'You' : entry.address}
                                </span>
                                {entry.isMe && <span className="text-[10px] bg-gold-200 text-gold-800 px-1 rounded w-fit">ME</span>}
                            </div>
                        </td>
                        <td className="px-6 py-4 font-bold text-gray-800">
                            {entry.ducksBought.toLocaleString()}
                        </td>
                        <td className="px-6 py-4 text-center">
                            {!entry.isEligible ? (
                                <div className="inline-flex items-center gap-1 px-2 py-1 bg-gray-100 text-gray-400 rounded text-xs font-bold" title="Max 3 wins reached">
                                    <AlertCircle size={12} /> MAX WINS
                                </div>
                            ) : entry.isWinner ? (
                                <div className="inline-flex items-center gap-1 px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-bold animate-pulse">
                                    <Medal size={12} /> PRIZE QUALIFIED
                                </div>
                            ) : (
                                <span className="text-xs text-gray-400 font-medium">--</span>
                            )}
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
      </div>

      {/* Footer Info */}
      <div className="bg-gray-50 p-4 border-t border-gray-100 text-center">
          <p className="text-xs text-gray-500">
              *Users can win a maximum of 3 times. If a top user is ineligible, the prize passes to the next rank.
          </p>
      </div>
    </div>
  );
};
