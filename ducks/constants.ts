
import { DuckTier } from './types';

// Addresses for World Chain (ID 480)
export const CONTRACT_ADDRESS = "0x163f8C2467924be0ae7b5347228CABf260318753"; // DUCKS Game
export const ADMIN_ADDRESS = "0xd81ca2d5e0138d73e3a953a0fc7eee2e0e186969";
export const WLD_TOKEN_ADDRESS = "0x2cFc85d8E48F8EAB294be644d9E25C3030863003"; // Canonical WLD
export const USDC_ADDRESS = "0x7971110000000000000000000000000000000000"; // Bridged USDC (Verify)
export const MORPHO_ADDRESS = "0xBBBBBkAADvF6eK9E1T7AfZ7324a59e1Ac12884"; // Morpho Blue

// Fees
export const FEE_ADMIN_PERCENT = 0.03;
export const FEE_RESERVE_PERCENT = 0.05;
export const FEE_REFERRAL_PERCENT = 0.01;

// Math: 0.1 WLD / 15 Ducks = 0.006666 WLD per Duck
const BASE_COST_PER_DUCK = 0.1 / 15; 

export const DUCK_TIERS: DuckTier[] = [
  { id: 1, name: "Starter Flock", duckAmount: 15, basePriceWLD: 0.1, image: "", roi: 45 },
  { id: 2, name: "Small Farm", duckAmount: 50, basePriceWLD: parseFloat((50 * BASE_COST_PER_DUCK).toFixed(4)), image: "", roi: 45 },
  { id: 3, name: "Duck Village", duckAmount: 100, basePriceWLD: parseFloat((100 * BASE_COST_PER_DUCK).toFixed(4)), image: "", roi: 45 },
  { id: 4, name: "Duck City", duckAmount: 200, basePriceWLD: parseFloat((200 * BASE_COST_PER_DUCK).toFixed(4)), image: "", roi: 45 },
  { id: 5, name: "Duck Kingdom", duckAmount: 500, basePriceWLD: parseFloat((500 * BASE_COST_PER_DUCK).toFixed(4)), image: "", roi: 45 },
  { id: 6, name: "Duck Empire", duckAmount: 1000, basePriceWLD: parseFloat((1000 * BASE_COST_PER_DUCK).toFixed(4)), image: "", roi: 45 },
  { id: 7, name: "World Domination", duckAmount: 2500, basePriceWLD: parseFloat((2500 * BASE_COST_PER_DUCK).toFixed(4)), image: "", roi: 45 },
];

export const GENIUS_MINDS_INFO = `Genius Minds AI...`; // (Keep text)
export const TERMS_TEXT = `...`; // (Keep text)
