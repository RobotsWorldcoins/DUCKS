
export const DUCKS_ABI = [
  // Read Functions
  {
    "inputs": [{"internalType": "address", "name": "account", "type": "address"}],
    "name": "users",
    "outputs": [
        {"internalType": "uint256", "name": "ducks", "type": "uint256"},
        {"internalType": "uint256", "name": "eggs", "type": "uint256"},
        {"internalType": "uint256", "name": "lastHatchTime", "type": "uint256"},
        {"internalType": "address", "name": "referrer", "type": "address"},
        {"internalType": "uint256", "name": "referralEarnings", "type": "uint256"},
        {"internalType": "uint256", "name": "referralCount", "type": "uint256"},
        {"internalType": "uint256", "name": "monthlyDucksBought", "type": "uint256"},
        {"internalType": "bool", "name": "isHuman", "type": "bool"},
        {"internalType": "bool", "name": "autoCompound", "type": "bool"}
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "bondingCurveMultiplier",
    "outputs": [{"internalType": "uint256", "name": "", "type": "uint256"}],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "totalDucks",
    "outputs": [{"internalType": "uint256", "name": "", "type": "uint256"}],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [{"internalType": "uint256", "name": "amountDucks", "type": "uint256"}],
    "name": "getBuyPrice",
    "outputs": [{"internalType": "uint256", "name": "", "type": "uint256"}],
    "stateMutability": "view",
    "type": "function"
  },
  // Write Functions
  {
    "inputs": [{"internalType": "uint256", "name": "tierId", "type": "uint256"}, {"internalType": "uint256", "name": "amountDucks", "type": "uint256"}, {"internalType": "address", "name": "referrer", "type": "address"}],
    "name": "buyDucks",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "hatch",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "claim",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [{"internalType": "bool", "name": "_enabled", "type": "bool"}],
    "name": "setAutoCompound",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  // Events
  {
    "anonymous": false,
    "inputs": [
      {"indexed": true, "internalType": "address", "name": "user", "type": "address"},
      {"indexed": false, "internalType": "uint256", "name": "amount", "type": "uint256"},
      {"indexed": false, "internalType": "uint256", "name": "cost", "type": "uint256"}
    ],
    "name": "DucksBought",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {"indexed": true, "internalType": "address", "name": "user", "type": "address"},
      {"indexed": false, "internalType": "uint256", "name": "eggsUsed", "type": "uint256"},
      {"indexed": false, "internalType": "uint256", "name": "ducksMinted", "type": "uint256"}
    ],
    "name": "EggsHatched",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {"indexed": true, "internalType": "address", "name": "user", "type": "address"},
      {"indexed": false, "internalType": "uint256", "name": "amount", "type": "uint256"},
      {"indexed": false, "internalType": "uint256", "name": "tax", "type": "uint256"}
    ],
    "name": "WLDClaimed",
    "type": "event"
  }
] as const;

export const ERC20_ABI = [
  {
    "inputs": [{"internalType": "address", "name": "spender", "type": "address"}, {"internalType": "uint256", "name": "value", "type": "uint256"}],
    "name": "approve",
    "outputs": [{"internalType": "bool", "name": "", "type": "bool"}],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [{"internalType": "address", "name": "account", "type": "address"}],
    "name": "balanceOf",
    "outputs": [{"internalType": "uint256", "name": "", "type": "uint256"}],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [{"internalType": "address", "name": "owner", "type": "address"}, {"internalType": "address", "name": "spender", "type": "address"}],
    "name": "allowance",
    "outputs": [{"internalType": "uint256", "name": "", "type": "uint256"}],
    "stateMutability": "view",
    "type": "function"
  }
] as const;
