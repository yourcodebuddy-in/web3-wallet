import { Connection } from "@solana/web3.js";
import { Alchemy, Network } from "alchemy-sdk";
import { ethers } from "ethers";

export const solanaConnection = new Connection(process.env.SOLANA_RPC_URL);
export const ethereumConnection = new ethers.JsonRpcProvider(process.env.ETHEREUM_RPC_URL);

export const alchemy = new Alchemy({
  apiKey: process.env.ALCHEMY_API_KEY,
  network: Network.ETH_SEPOLIA,
  connectionInfoOverrides: {
    skipFetchSetup: true, // Disables default fetch headers
  },
});
