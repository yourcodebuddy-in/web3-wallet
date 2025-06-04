import { NFT } from "@/types/wallet";
import { Metaplex } from "@metaplex-foundation/js";
import { PublicKey } from "@solana/web3.js";
import { solanaConnection } from "../rpc";

export async function getSolanaWalletNFTs(address: string): Promise<NFT[]> {
  const publicKey = new PublicKey(address);
  const metaplex = Metaplex.make(solanaConnection);

  const response = await metaplex.nfts().findAllByOwner({ owner: publicKey });

  const nfts = await Promise.all(
    response.map(async (nft) => {
      const data = {
        name: nft.name,
        image: null,
        acquiredAt: undefined,
        description: undefined,
      };
      try {
        const response = await fetch(nft.uri);
        const jsonData = await response.json();
        data.image = jsonData?.image;

        return data;
      } catch (_error) {
        return data;
      }
    })
  );

  return nfts;
}
