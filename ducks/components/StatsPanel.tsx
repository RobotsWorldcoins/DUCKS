
import React from 'react';
import { useGame } from '../store';
import { PieChart, Pie, Cell, Tooltip } from 'recharts';
import { TrendingUp, HelpCircle } from 'lucide-react';

export const StatsPanel: React.FC = () => {
  const { userData, poolData } = useGame();

  const data = [
    { name: 'Your Ducks', value: userData.ducks },
    { name: 'Pool Ducks', value: poolData.totalDucks - userData.ducks },
  ];

  const COLORS = ['#f59e0b', '#e5e7eb'];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
      {/* Card 1: Personal Stats */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-gold-100 relative overflow-hidden">
        <div className="absolute top-0 right-0 p-4 opacity-10">
          <span className="text-6xl">🦆</span>
        </div>
        <h3 className="text-gray-500 text-sm font-semibold uppercase tracking-wider mb-1">Your Farm</h3>
        <div className="flex items-baseline gap-2">
            <span className="text-3xl font-black text-gray-900">{userData.ducks}</span>
            <span className="text-sm text-gray-600">Ducks</span>
        </div>
        <div className="mt-4 flex items-baseline gap-2">
            <span className="text-2xl font-bold text-gold-600">{userData.eggs.toFixed(2)}</span>
            <span className="text-sm text-gray-500">Eggs Pending</span>
        </div>
      </div>

      {/* Card 2: Pool Yield with Tooltip */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-gold-100 flex flex-col justify-between relative group/apr">
         <div>
            <div className="flex items-center justify-between mb-1">
                <h3 className="text-gray-500 text-sm font-semibold uppercase tracking-wider flex items-center gap-2">
                    <TrendingUp size={16} /> Pool APR
                </h3>
                <HelpCircle size={14} className="text-gray-300 cursor-help" />
            </div>
            
            <span className="text-3xl font-black text-green-600">{poolData.apy}%</span>
            <p className="text-xs text-gray-400 mt-1">Simple Interest (ROI ~45 Days)</p>
         </div>
         <div className="mt-4">
             <div className="flex justify-between text-sm text-gray-600 mb-1">
                 <span>TVL</span>
                 <span className="font-bold">{poolData.contractBalance.toLocaleString()} WLD</span>
             </div>
             <div className="w-full bg-gray-100 rounded-full h-2">
                 <div className="bg-green-500 h-2 rounded-full" style={{ width: '65%' }}></div>
             </div>
         </div>
         
         {/* Custom CSS Tooltip */}
         <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-64 bg-gray-900 text-white text-xs rounded-xl p-3 shadow-xl opacity-0 invisible group-hover/apr:opacity-100 group-hover/apr:visible transition-all duration-200 z-50 pointer-events-none text-center">
            <p className="font-bold mb-1 text-green-400">Yield Source</p>
            Generated via Morpho Blue lending interest + ecosystem taxes. Rates may fluctuate based on utilization.
            <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 rotate-45 w-2 h-2 bg-gray-900"></div>
         </div>
      </div>

      {/* Card 3: Ownership Chart */}
      <div className="bg-white rounded-2xl p-4 shadow-sm border border-gold-100 flex items-center">
        <div className="h-24 w-24 flex-shrink-0 flex items-center justify-center">
            {/* Fixed: Explicit dimensions (96px = h-24) to prevent Recharts resize error */}
            <PieChart width={96} height={96}>
              <Pie
                  data={data}
                  innerRadius={25}
                  outerRadius={40}
                  paddingAngle={5}
                  dataKey="value"
              >
                  {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
              </Pie>
              <Tooltip />
            </PieChart>
        </div>
        <div className="ml-4">
            <h3 className="text-gray-500 text-sm font-semibold uppercase tracking-wider mb-1">Pool Share</h3>
            <p className="text-xs text-gray-400">
                You own {poolData.totalDucks > 0 ? ((userData.ducks / poolData.totalDucks) * 100).toFixed(4) : 0}% of the global duck population.
            </p>
        </div>
      </div>
    </div>
  );
};
