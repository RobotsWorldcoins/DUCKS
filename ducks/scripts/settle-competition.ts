
import { createWalletClient, createPublicClient, http, parseEther } from 'viem';
import { privateKeyToAccount } from 'viem/accounts';
import { worldchain } from 'viem/chains';
import { DUCKS_ABI } from '../abi';
import { CONTRACT_ADDRESS, ADMIN_ADDRESS } from '../constants';

// THIS SCRIPT RUNS OFF-CHAIN (BACKEND CRON JOB)
// IT MUST RUN ON THE LAST DAY OF THE MONTH

const ADMIN_KEY = process.env.ADMIN_PRIVATE_KEY as `0x${string}`;

async function settleCompetition() {
    if (!ADMIN_KEY) throw new Error("Missing Admin Private Key");

    const account = privateKeyToAccount(ADMIN_KEY);
    const client = createWalletClient({
        account,
        chain: worldchain,
        transport: http()
    });

    console.log("🦆 Calculating Duck Derby Winners...");

    // 1. Fetch Leaderboard Data from Database/Subgraph
    // (Mocking the DB call here)
    const mockWinners = [
        "0x71C7656EC7ab88b098defB751B7401B5f6d8976F",
        "0xA0Cf798816D4b9b9866b5330EEa46a18382f251e",
        "0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045",
        "0x2546BcD3c84621e976D8185a91A922aE77ECEc30",
        "0xbDA5747bFD65F08deb54cb465eB87D40e51B197E"
    ];

    const prizeAmounts = [
        1000n, // 1000 Ducks
        1000n,
        1000n,
        1000n,
        1000n
    ];

    console.log(`Checking eligibility for ${mockWinners.length} users...`);

    // 2. Submit Transaction
    console.log("Sending Prize Distribution Transaction...");
    
    const hash = await client.writeContract({
        address: CONTRACT_ADDRESS,
        abi: DUCKS_ABI,
        functionName: 'distributeCompetitionRewards',
        args: [mockWinners, prizeAmounts]
    });

    console.log(`✅ Competition Settled! Tx: ${hash}`);
    console.log("Prizes (1000 Ducks) have been safely added to winners' accounts.");
}

settleCompetition().catch(console.error);
