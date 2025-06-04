"use server";

import { Networks } from "@/data/supported-networks";
import { handleError } from "@/lib/actions";
import { getEthWalletNFTs } from "@/utils/server/ethereum/get-eth-wallet-nfts";
import { getSolanaWalletNFTs } from "@/utils/server/solana/get-solana-wallet-nfts";
import { z } from "zod";

const getWalletNFTsSchema = z.object({
  network: z.nativeEnum(Networks),
  address: z.string(),
});

export async function getWalletNFTs(data: z.infer<typeof getWalletNFTsSchema>) {
  try {
    const { network, address } = getWalletNFTsSchema.parse(data);

    switch (network) {
      case Networks.solana: {
        const nfts = await getSolanaWalletNFTs(address);
        return { nfts };
      }
      case Networks.ethereum: {
        const nfts = await getEthWalletNFTs(address);
        return { nfts };
      }
    }
  } catch (error) {
    return await handleError(error);
  }
}
