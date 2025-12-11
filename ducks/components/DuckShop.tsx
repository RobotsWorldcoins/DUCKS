
import React, { useState } from 'react';
import { useGame } from '../store';
import { DUCK_TIERS } from '../constants';
import { ShoppingCart, TrendingUp, Info } from 'lucide-react';
import { ConfirmationModal } from './ConfirmationModal';

export const DuckShop: React.FC = () => {
  const { buyDucks, poolData, isLoading, userData } = useGame();
  const [selectedTier, setSelectedTier] = useState<number | null>(null);

  // Helper to calculate dynamic price based on bonding curve
  const getDynamicPrice = (basePrice: number) => {
    return Math.floor(basePrice * poolData.bondingCurveMultiplier * 1000) / 1000;
  };

  const handleBuyClick = (id: number) => {
    setSelectedTier(id);
  };

  const confirmBuy = () => {
    if (selectedTier !== null) {
      buyDucks(selectedTier);
      setSelectedTier(null);
    }
  };

  const selectedTierInfo = selectedTier ? DUCK_TIERS.find(t => t.id === selectedTier) : null;
  const selectedPrice = selectedTierInfo ? getDynamicPrice(selectedTierInfo.basePriceWLD) : 0;

  return (
    <div className="mb-12">
      <ConfirmationModal 
        isOpen={selectedTier !== null}
        onClose={() => setSelectedTier(null)}
        onConfirm={confirmBuy}
        title="Confirm Purchase"
        confirmLabel={`Pay ${selectedPrice.toFixed(3)} WLD`}
        message={
            <div>
                Are you sure you want to buy <strong>{selectedTierInfo?.name}</strong>?
                <ul className="mt-3 space-y-1 list-disc list-inside text-xs bg-gray-50 p-3 rounded-lg border border-gray-100">
                    <li>Cost: <span className="font-bold text-gray-900">{selectedPrice.toFixed(3)} WLD</span></li>
                    <li>Ducks: <span className="font-bold text-gray-900">+{selectedTierInfo?.duckAmount}</span></li>
                    <li>ROI: <span className="font-bold text-gray-900">~{selectedTierInfo?.roi} Days</span></li>
                </ul>
            </div>
        }
      />

      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
            <ShoppingCart className="text-gold-600" />
            Duck Market
        </h2>
        
        {/* Bonding Curve Tooltip */}
        <div className="relative group cursor-help">
            <span className="text-xs font-mono bg-orange-100 text-orange-700 px-3 py-1.5 rounded-full border border-orange-200 flex items-center gap-1.5 font-bold transition-colors group-hover:bg-orange-200">
                <TrendingUp size={14} /> 
                Demand: x{poolData.bondingCurveMultiplier.toFixed(4)}
                <Info size={12} className="opacity-50" />
            </span>
            <div className="absolute bottom-full right-0 mb-2 w-64 bg-gray-900 text-white text-xs rounded-xl p-3 shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50 pointer-events-none">
                <p className="font-bold mb-1 text-gold-400">Bonding Curve Active</p>
                Price adjusts dynamically based on market demand. Higher demand increases entry price slightly to protect early farmers.
                <div className="absolute bottom-0 right-4 transform translate-y-1/2 rotate-45 w-2 h-2 bg-gray-900"></div>
            </div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {DUCK_TIERS.map((tier) => {
            const currentPrice = getDynamicPrice(tier.basePriceWLD);
            const canAfford = userData.wldBalance >= currentPrice;

            return (
                <div key={tier.id} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-xl transition-all duration-300 group transform hover:-translate-y-1">
                    {/* Header Section */}
                    <div className="bg-gradient-to-br from-yellow-50 to-white p-6 relative overflow-hidden border-b border-gray-100 h-32 flex flex-col items-center justify-center">
                        <div className="absolute text-8xl opacity-5 select-none pointer-events-none transform -rotate-12 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                            🦆
                        </div>
                        <h3 className="text-gray-900 font-black text-2xl z-10 text-center relative">
                            {tier.name}
                        </h3>
                         <span className="text-gold-600 text-[10px] font-bold uppercase tracking-[0.2em] mt-2 z-10 bg-gold-50 px-2 py-1 rounded-full border border-gold-100">
                             Level {tier.id}
                        </span>
                    </div>

                    <div className="p-5">
                        <div className="flex items-center justify-between mt-1 mb-4">
                             <div className="bg-gold-100 text-gold-700 px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5">
                                <span>🦆</span> +{tier.duckAmount} Ducks
                             </div>
                             <span className="text-xs text-gray-400 font-medium bg-gray-50 px-2 py-1 rounded">ROI ~{tier.roi} Days</span>
                        </div>
                        
                        <div className="space-y-3">
                            <div className="flex justify-between items-center bg-gray-50 px-3 py-2 rounded-lg border border-gray-100">
                                <span className="text-xs text-gray-500 uppercase font-bold">Cost</span>
                                <span className="font-black text-gray-900 text-lg">{currentPrice.toFixed(3)} <span className="text-xs font-normal text-gray-500">WLD</span></span>
                            </div>
                            
                            <button
                                onClick={() => handleBuyClick(tier.id)}
                                disabled={isLoading || !canAfford}
                                className={`w-full py-3 rounded-xl font-bold text-sm shadow-sm transition-all flex items-center justify-center gap-2
                                    ${canAfford 
                                        ? 'bg-gold-500 hover:bg-gold-600 text-white shadow-gold-200' 
                                        : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                                    }
                                `}
                            >
                                {isLoading ? (
                                  <span className="animate-spin">⚡</span>
                                ) : canAfford ? (
                                  <>Buy Now</>
                                ) : (
                                  'Insufficient WLD'
                                )}
                            </button>
                        </div>
                    </div>
                </div>
            );
        })}
      </div>
    </div>
  );
};
