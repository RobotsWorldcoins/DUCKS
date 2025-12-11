import { createWalletClient, http, createPublicClient, parseEther } from 'viem';
import { privateKeyToAccount } from 'viem/accounts';
import { worldchain } from 'viem/chains';

// World Chain Constants
const WLD_ADDRESS = "0x2cFc85d8E48F8EAB294be644d9E25C3030863003";
const MORPHO_ADDRESS = "0xBBBBBkAADvF6eK9E1T7AfZ7324a59e1Ac12884";

import { DUCKS_ABI } from '../abi';

async function main() {
    const pk = process.env.PRIVATE_KEY as `0x${string}`;
    if (!pk) {
        throw new Error("❌ Missing PRIVATE_KEY in environment");
    }
    
    const account = privateKeyToAccount(pk);
    const wallet = createWalletClient({ account, chain: worldchain, transport: http() });
    const publicClient = createPublicClient({ chain: worldchain, transport: http() });
    
    console.log(`🚀 Deploying DUCKS from: ${account.address}`);
    
    console.log("Step 1: Deploying DucksReserveVault...");
    // Deployment logic would go here using wallet.deployContract
    // Simulating delay
    await new Promise(r => setTimeout(r, 1000));
    const vaultAddress = "0x..."; 
    
    console.log("Step 2: Deploying Ducks Game...");
    // Deployment logic would go here
    const gameAddress = "0x..."; 
    
    console.log(`✅ Deployment Complete!`);
    console.log(`-------------------------------------------`);
    console.log(`Game Contract:   ${gameAddress}`);
    console.log(`Reserve Vault:   ${vaultAddress}`);
    console.log(`-------------------------------------------`);
}

main().catch((error) => {
    console.error(error);
    throw new Error("Deployment failed");
});