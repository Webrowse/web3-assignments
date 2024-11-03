import nacl from "tweetnacl";
import { generateMnemonic, mnemonicToSeedSync } from "bip39";
import { derivePath } from "ed25519-hd-key";
import { Keypair } from "@solana/web3.js";

// Generate or use a fixed mnemonic
const mnemonic = generateMnemonic();
console.log("Mnemonic:", mnemonic);

// Convert mnemonic to seed
const seed = mnemonicToSeedSync(mnemonic);

function generateKeyPairFromPath(seed, index) {
    // Define a unique path for each index
    const path = `m/44'/501'/${index}'/0'`;

    // Derive a seed for this specific path
    const derivedSeed = derivePath(path, seed.toString("hex")).key;

    // Create a keypair using the derived seed
    const keyPair = nacl.sign.keyPair.fromSeed(derivedSeed);

    // Solana expects the secret key in a specific format
    const solanaKeypair = Keypair.fromSecretKey(keyPair.secretKey);

    // Return the public and private keys
    return {
        publicKey: solanaKeypair.publicKey.toBase58(),
        privateKey: Buffer.from(solanaKeypair.secretKey).toString("hex")
    };
}

// Generate multiple key pairs from the same seed
const keyPairs = [];
const numKeys = 3; // Number of key pairs to generate

for (let i = 0; i < numKeys; i++) {
    const keyPair = generateKeyPairFromPath(seed, i);
    keyPairs.push(keyPair);

    console.log(`Key Pair ${i + 1}:`);
    console.log("Public Key:", keyPair.publicKey);
    console.log("Private Key:", keyPair.privateKey);
    console.log("------------");
}
