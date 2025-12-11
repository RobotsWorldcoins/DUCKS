
export interface DuckTier {
  id: number;
  name: string;
  duckAmount: number;
  basePriceWLD: number;
  image: string;
  roi: number;
}

export interface ReferralLog {
  address: string;
  amount: number;
  timestamp: string;
}

export interface LeaderboardEntry {
  address: string;
  ducksBought: number;
  totalWins: number; // Max 3 allowed
}

export interface UserData {
  address: string | null;
  ducks: number;
  eggs: number;
  wldBalance: number;
  claimedWLD: number;
  referralCode: string;
  referrer: string | null; // The address of the person who referred this user
  referralEarnings: number;
  referralCount: number; // Max 10 limit logic
  referralLogs: ReferralLog[]; // List of connected addresses and earnings
  monthlyDucksBought: number; // For competition
  competitionWins: number; // For eligibility check
  autoCompound: boolean;
  isHuman: boolean; // World ID Verification Status
}

export interface PoolData {
  totalDucks: number;
  totalEggs: number;
  contractBalance: number; // Main Liquidity
  adminFeeBalance: number; // The 3% collected for Admin
  reserveBalance: number; // The 5% Secure Backup Pool
  apy: number;
  bondingCurveMultiplier: number; // 1.0 is base
}

export enum AppRoute {
  HOME = 'home',
  ABOUT = 'about',
  TERMS = 'terms',
  ADMIN = 'admin',
  VERIFICATION = 'verification'
}
