
import React, { createContext, useContext, useState, useEffect, useCallback, useRef } from 'react';
import { createPublicClient, createWalletClient, custom, parseEther, formatEther } from 'viem';
import { worldchain } from 'viem/chains';
import { UserData, PoolData, LeaderboardEntry } from './types';
import { CONTRACT_ADDRESS, WLD_TOKEN_ADDRESS } from './constants';
import { DUCKS_ABI, ERC20_ABI } from './abi';
import { DUCK_TIERS } from './constants';

const calculateAdaptiveAPY = (utilization: number) => {
    const rateAtTarget = 0.04; 
    const targetUtil = 0.9;
    const rateAtOne = 1.50;
    
    if (utilization <= targetUtil) {
        return (utilization / targetUtil) * rateAtTarget;
    } else {
        const excess = utilization - targetUtil;
        const range = 1 - targetUtil;
        return rateAtTarget + (excess / range) * (rateAtOne - rateAtTarget);
    }
};

interface GameContextType {
  isConnected: boolean;
  userData: UserData;
  poolData: PoolData;
  leaderboard: LeaderboardEntry[];
  signInWithWorldID: () => void;
  disconnectWallet: () => void;
  buyDucks: (tierId: number) => Promise<void>;
  hatchEggs: () => Promise<void>;
  claimWLD: () => Promise<void>;
  toggleAutoCompound: () => void;
  registerReferrer: (code: string) => void;
  withdrawAdminFees: () => Promise<void>;
  withdrawReserve: () => Promise<void>;
  transferLiquidity: (from: 'main' | 'reserve', amount: number) => Promise<void>;
  isLoading: boolean;
  loginStep: string;
}

const GameContext = createContext<GameContextType | undefined>(undefined);

const INITIAL_USER: UserData = {
  address: null, ducks: 0, eggs: 0, wldBalance: 0, claimedWLD: 0,
  referralCode: "", referrer: null, referralEarnings: 0, referralCount: 0,
  referralLogs: [], monthlyDucksBought: 0, competitionWins: 0,
  autoCompound: false, isHuman: false,
};

const INITIAL_POOL: PoolData = {
  totalDucks: 0, totalEggs: 0, contractBalance: 0, adminFeeBalance: 0,
  reserveBalance: 0, apy: 0, bondingCurveMultiplier: 1.0,
};

export const GameProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isConnected, setIsConnected] = useState(false);
  const [userData, setUserData] = useState<UserData>(INITIAL_USER);
  const [poolData, setPoolData] = useState<PoolData>(INITIAL_POOL);
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [loginStep, setLoginStep] = useState('idle');
  
  const publicClientRef = useRef<any>(null);
  const walletClientRef = useRef<any>(null);

  const signInWithWorldID = useCallback(async () => {
    setIsLoading(true);
    setLoginStep('connecting');
    try {
        let provider = (window as any).ethereum;
        let attempts = 0;
        while (!provider && attempts < 10) {
            await new Promise(r => setTimeout(r, 200));
            provider = (window as any).ethereum;
            attempts++;
        }
        if (!provider) {
            alert("World App Wallet not detected.");
            throw new Error("No provider");
        }

        const walletClient = createWalletClient({ chain: worldchain, transport: custom(provider) });
        const publicClient = createPublicClient({ chain: worldchain, transport: custom(provider) });

        publicClientRef.current = publicClient;
        walletClientRef.current = walletClient;

        const [address] = await walletClient.requestAddresses();
        const chainId = await publicClient.getChainId();
        if (chainId !== 480) {
            await walletClient.switchChain({ id: 480 });
        }

        setLoginStep('verifying');
        await refreshData(address, publicClient);
        setIsConnected(true);
        setLoginStep('success');
    } catch (err) {
        console.error(err);
    } finally {
        setIsLoading(false);
        setLoginStep('idle');
    }
  }, []);

  const refreshData = async (address: string, client: any) => {
      try {
        const [user, balance, multiplier, totalDucks] = await Promise.all([
             client.readContract({ address: CONTRACT_ADDRESS, abi: DUCKS_ABI, functionName: 'users', args: [address] }),
             client.readContract({ address: WLD_TOKEN_ADDRESS, abi: ERC20_ABI, functionName: 'balanceOf', args: [address] }),
             client.readContract({ address: CONTRACT_ADDRESS, abi: DUCKS_ABI, functionName: 'bondingCurveMultiplier' }),
             client.readContract({ address: CONTRACT_ADDRESS, abi: DUCKS_ABI, functionName: 'totalDucks' }),
        ]);

        const simulatedUtilization = 0.85; 
        const currentApy = calculateAdaptiveAPY(simulatedUtilization) * 100;

        setUserData(prev => ({
            ...prev,
            address,
            ducks: Number(user[0]),
            eggs: Number(formatEther(user[1])),
            wldBalance: Number(formatEther(balance as bigint)),
            isHuman: user[7], // bool isHuman
            autoCompound: user[8], // bool autoCompound
            referrer: user[3] === "0x0000000000000000000000000000000000000000" ? null : user[3],
            referralEarnings: Number(formatEther(user[4])),
            referralCount: Number(user[5]),
            monthlyDucksBought: Number(user[6]),
        }));

        setPoolData(prev => ({
            ...prev,
            totalDucks: Number(totalDucks),
            bondingCurveMultiplier: Number(formatEther(multiplier as bigint)),
            apy: currentApy
        }));
      } catch (e) { console.error("Refresh error", e); }
  };

  const disconnectWallet = () => { setIsConnected(false); setUserData(INITIAL_USER); };

  const buyDucks = async (tierId: number) => {
      if (!walletClientRef.current || !userData.address) return;
      setIsLoading(true);
      try {
          const tier = DUCK_TIERS.find(t => t.id === tierId);
          if (!tier) return;

          // Calculate Dynamic Cost (Contract Logic replication for estimation)
          // Ideally fetch 'getBuyPrice' from contract
          const costWei = await publicClientRef.current.readContract({
              address: CONTRACT_ADDRESS, abi: DUCKS_ABI, functionName: 'getBuyPrice', args: [BigInt(tier.duckAmount)]
          });

          // Check Allowance
          const allowance = await publicClientRef.current.readContract({
              address: WLD_TOKEN_ADDRESS, abi: ERC20_ABI, functionName: 'allowance', args: [userData.address, CONTRACT_ADDRESS]
          });

          if (allowance < costWei) {
              const hashApprove = await walletClientRef.current.writeContract({
                  address: WLD_TOKEN_ADDRESS, abi: ERC20_ABI, functionName: 'approve', args: [CONTRACT_ADDRESS, costWei], account: userData.address
              });
              await publicClientRef.current.waitForTransactionReceipt({ hash: hashApprove });
          }

          const referrer = userData.referrer || "0x0000000000000000000000000000000000000000";
          
          const hashBuy = await walletClientRef.current.writeContract({
              address: CONTRACT_ADDRESS, abi: DUCKS_ABI, functionName: 'buyDucks', args: [BigInt(tierId), BigInt(tier.duckAmount), referrer], account: userData.address
          });
          await publicClientRef.current.waitForTransactionReceipt({ hash: hashBuy });
          
          await refreshData(userData.address, publicClientRef.current);
      } catch (e) { console.error(e); alert("Transaction Failed"); } 
      finally { setIsLoading(false); }
  };

  const hatchEggs = async () => {
      if (!walletClientRef.current || !userData.address) return;
      setIsLoading(true);
      try {
          const hash = await walletClientRef.current.writeContract({
              address: CONTRACT_ADDRESS, abi: DUCKS_ABI, functionName: 'hatch', args: [], account: userData.address
          });
          await publicClientRef.current.waitForTransactionReceipt({ hash });
          await refreshData(userData.address, publicClientRef.current);
      } catch (e) { console.error(e); alert("Hatch Failed"); }
      finally { setIsLoading(false); }
  };

  const claimWLD = async () => {
      if (!walletClientRef.current || !userData.address) return;
      setIsLoading(true);
      try {
          const hash = await walletClientRef.current.writeContract({
              address: CONTRACT_ADDRESS, abi: DUCKS_ABI, functionName: 'claim', args: [], account: userData.address
          });
          await publicClientRef.current.waitForTransactionReceipt({ hash });
          await refreshData(userData.address, publicClientRef.current);
      } catch (e) { console.error(e); alert("Claim Failed"); }
      finally { setIsLoading(false); }
  };

  const toggleAutoCompound = async () => {
      if (!walletClientRef.current || !userData.address) return;
      setIsLoading(true);
      try {
          const newState = !userData.autoCompound;
          const hash = await walletClientRef.current.writeContract({
              address: CONTRACT_ADDRESS, abi: DUCKS_ABI, functionName: 'setAutoCompound', args: [newState], account: userData.address
          });
          await publicClientRef.current.waitForTransactionReceipt({ hash });
          await refreshData(userData.address, publicClientRef.current);
      } catch (e) { console.error(e); alert("Toggle Failed"); }
      finally { setIsLoading(false); }
  };

  const registerReferrer = (code: string) => { 
      // In this contract, referrer is registered on first buy. 
      // This function effectively just saves it locally or prompts a 0-value tx if architected that way.
      // For now, we'll update local state assuming the user enters it before buying.
      if(code.startsWith("0x")) {
         // It's an address
         setUserData(prev => ({ ...prev, referrer: code }));
      }
  };

  const withdrawAdminFees = async () => { /* Admin Only logic via writeContract */ };
  const withdrawReserve = async () => { /* Admin Only logic via writeContract */ };
  const transferLiquidity = async (from: 'main' | 'reserve', amount: number) => { /* Admin Only logic */ };

  return (
    <GameContext.Provider value={{
      isConnected, userData, poolData, leaderboard, signInWithWorldID, disconnectWallet,
      buyDucks, hatchEggs, claimWLD, toggleAutoCompound, registerReferrer,
      withdrawAdminFees, withdrawReserve, transferLiquidity, isLoading, loginStep
    }}>
      {children}
    </GameContext.Provider>
  );
};

export const useGame = () => {
  const context = useContext(GameContext);
  if (context === undefined) throw new Error('useGame must be used within a GameProvider');
  return context;
};
