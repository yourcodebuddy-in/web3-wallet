import { Token } from "@/types/wallet";
import { alchemy } from "../rpc";
import { getEthTokenMetadata } from "./get-eth-token-metadata";

export async function getEthWalletTokens(address: string): Promise<Token[]> {
  const balances = await alchemy.core.getTokenBalances(address);

  const data = await Promise.all(
    balances.tokenBalances.map(async (token) => {
      const metadata = await getEthTokenMetadata(token.contractAddress);
      const rawBalance = Number(token.tokenBalance ?? 0);
      const balance = rawBalance / Number(Math.pow(10, metadata.decimals));

      return {
        name: metadata.name ?? "Unknown",
        amount: balance,
        amountRaw: rawBalance,
        owner: address,
        mint: token.contractAddress,
        decimals: metadata.decimals,
        symbol: metadata.symbol,
        icon: metadata.icon,
      };
    })
  );

  return data;
}
