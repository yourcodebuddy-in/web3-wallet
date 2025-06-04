import { PublicKey } from "@solana/web3.js";
import { solanaConnection } from "../rpc";

export async function getSolanaBalance(address: string) {
  const balance = await solanaConnection.getBalance(new PublicKey(address), {
    commitment: "finalized",
  });
  return balance;
}
