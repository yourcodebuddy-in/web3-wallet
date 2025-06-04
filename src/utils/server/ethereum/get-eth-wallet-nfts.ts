import { NFT } from "@/types/wallet";
import { alchemy } from "../rpc";

export async function getEthWalletNFTs(address: string): Promise<NFT[]> {
  const nfts = await alchemy.nft.getNftsForOwner(address);

  const data = nfts.ownedNfts.map((nft) => {
    return {
      name: nft.name ?? "Unknown",
      acquiredAt: nft.acquiredAt?.blockTimestamp,
      description: nft.description,
      image: nft.image.cachedUrl,
    };
  });

  return data;
}
