import { TokenMetadata } from "@/types/wallet";
import { alchemy } from "../rpc";

export async function getEthTokenMetadata(address: string): Promise<TokenMetadata> {
  const metadata = await alchemy.core.getTokenMetadata(address);
  return {
    name: metadata.name ?? "Unknown",
    symbol: metadata.symbol ?? "?",
    icon: metadata.logo ?? null,
    decimals: metadata.decimals ?? 0,
  };
}
