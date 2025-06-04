import { TokenMetadata } from "@/types/wallet";
import { Metaplex } from "@metaplex-foundation/js";
import { PublicKey } from "@solana/web3.js";
import { solanaConnection } from "../rpc";

export async function getSolanaTokenMetadata(mint: string): Promise<TokenMetadata> {
  const metaplex = Metaplex.make(solanaConnection);
  const mintAddress = new PublicKey(mint);

  let tokenName = "Unknown";
  let tokenSymbol = "?";
  let tokenIcon: string | undefined | null = null;
  let tokenDecimals = 0;

  const metadataAccount = metaplex.nfts().pdas().metadata({ mint: mintAddress });

  const metadataAccountInfo = await solanaConnection.getAccountInfo(metadataAccount);
  if (metadataAccountInfo) {
    const token = await metaplex.nfts().findByMint({ mintAddress: mintAddress });
    tokenName = token.name;
    tokenSymbol = token.symbol;
    tokenIcon = token.json?.image;
    tokenDecimals = token.mint.decimals;
  }

  return {
    name: tokenName,
    symbol: tokenSymbol,
    icon: tokenIcon,
    decimals: tokenDecimals,
  };
}
