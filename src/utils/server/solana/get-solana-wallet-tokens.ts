import { Token } from "@/types/wallet";
import { TOKEN_PROGRAM_ID } from "@solana/spl-token";
import { LAMPORTS_PER_SOL, PublicKey } from "@solana/web3.js";
import { solanaConnection } from "../rpc";
import { getSolanaBalance } from "./get-solana-balance";
import { getSolanaTokenMetadata } from "./get-solana-token-metadata";

export async function getSolanaWalletTokensWithPrice(address: string): Promise<Token[]> {
  const publicKey = new PublicKey(address);
  const response = await solanaConnection.getParsedTokenAccountsByOwner(publicKey, {
    programId: new PublicKey(TOKEN_PROGRAM_ID),
  });

  const tokens = await Promise.all(
    response.value.map(async (token) => {
      const metadata = await getSolanaTokenMetadata(token.account.data.parsed.info.mint);
      return {
        name: metadata.name,
        amount: token.account.data.parsed.info.tokenAmount.uiAmount,
        amountRaw: parseFloat(token.account.data.parsed.info.tokenAmount.amount),
        owner: token.account.owner.toBase58(),
        mint: token.account.data.parsed.info.mint,
        decimals: token.account.data.parsed.info.tokenAmount.decimals,
        symbol: metadata.symbol,
        icon: metadata.icon,
      };
    })
  );

  const solanaBalance = await getSolanaBalance(address);
  if (solanaBalance) {
    tokens.push({
      name: "Solana",
      amount: solanaBalance / LAMPORTS_PER_SOL,
      amountRaw: solanaBalance,
      owner: address,
      mint: address,
      decimals: 9,
      symbol: "SOL",
      icon: "https://cryptologos.cc/logos/solana-sol-logo.png",
    });
  }

  return tokens;
}
