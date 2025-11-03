// exploit.ts
import { ethers, Wallet, Contract } from "ethers";
import * as dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

// --- Configuration ---
const RPC_URL: string = process.env.RPC_URL || "";
const PRIVATE_KEY: string = process.env.PRIVATE_KEY || "";
const CONTRACT_ADDRESS: string = process.env.CONTRACT_ADDRESS || "";

// 🔑 THE CTF CHALLENGE: The correct secret key must be placed here.
// HINT 1: The key is a concatenation of two parts.
// HINT 2: Part 1 is 'Blockchainlautech' encoded in a Figures.
// HINT 3: Part 2 is the current date (7th November, 2025) encoded in a figure.
// The  resulting string is 27 digits long.
const SECRET_KEY_PLACEHOLDER: string = ""; // <-- SOLVE THE CIPHER AND PASTE KEY HERE

// The Application Binary Interface (ABI) is required to call the function.
const ABI = [
    "function withdraw(string memory _key)"
];

// --- Main Attack Logic ---
async function runExploit() {
    // ... (rest of the configuration checks remain the same) ...
    if (!RPC_URL || !PRIVATE_KEY || !CONTRACT_ADDRESS) {
        console.error("Please configure RPC_URL, PRIVATE_KEY, and CONTRACT_ADDRESS in your .env file.");
        return;
    }
    
    // Check if the solver actually put the key in the script
    if (SECRET_KEY_PLACEHOLDER === "") {
        console.error("❌ ERROR: The SECRET_KEY_PLACEHOLDER must be filled with the correct 27-digit key.");
        return;
    }

    console.log(`Attacker Address: ${new Wallet(PRIVATE_KEY).address}`);
    console.log(`Target Contract: ${CONTRACT_ADDRESS}`);

    // 1. Setup Provider and Signer
    const provider = new ethers.JsonRpcProvider(RPC_URL);
    const wallet = new Wallet(PRIVATE_KEY, provider);

    // 2. Create Contract Instance
    const vaultContract = new Contract(CONTRACT_ADDRESS, ABI, wallet);

    // 3. Check current vault balance before attack
    const initialBalance = await provider.getBalance(CONTRACT_ADDRESS);
    console.log(`\nInitial Vault Balance: ${ethers.formatEther(initialBalance)} ETH`);

    if (initialBalance === BigInt(0)) {
        console.log("Vault is already empty. Attack aborted.");
        return;
    }

    // 4. Execute the Attack Transaction using the extracted key
    console.log(`\n*** Sending transaction with key... ***`);
    
    try {
        // Send the transaction and wait for it to be mined
        // NOTE: Using the placeholder variable here.
        const tx = await vaultContract.withdraw(SECRET_KEY_PLACEHOLDER); 
        console.log(`Transaction sent! Hash: ${tx.hash}`);

        const receipt = await tx.wait();
        console.log(`Transaction confirmed in block: ${receipt?.blockNumber}`);
        
    } catch (error) {
        // This usually catches transaction failures (e.g., "Incorrect withdrawal key!")
        console.error("Exploit failed or reverted (Incorrect Key?). Check transaction details:", error);
        return;
    }

    // 5. Verify funds removal
    const finalBalance = await provider.getBalance(CONTRACT_ADDRESS);
    console.log(`\nFinal Vault Balance: ${ethers.formatEther(finalBalance)} ETH`);

    if (finalBalance === BigInt(0)) {
        console.log("✅ **SUCCESS! The ConfluenceHack was drained.**");
    } else {
        console.log("❌ FAILURE! Funds were not completely removed.");
    }
}

runExploit().catch(console.error);