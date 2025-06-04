"use server";

import { Networks } from "@/data/supported-networks";
import { handleError } from "@/lib/actions";
import { getEthWalletTokens } from "@/utils/server/ethereum/get-eth-wallet-tokens";
import { getSolanaWalletTokensWithPrice } from "@/utils/server/solana/get-solana-wallet-tokens";
import { z } from "zod";

const getWalletTokensSchema = z.object({
  network: z.nativeEnum(Networks),
  address: z.string(),
});

export async function getWalletTokens(data: z.infer<typeof getWalletTokensSchema>) {
  try {
    const { network, address } = getWalletTokensSchema.parse(data);
    switch (network) {
      case Networks.solana: {
        const tokens = await getSolanaWalletTokensWithPrice(address);
        return { tokens };
      }
      case Networks.ethereum: {
        const tokens = await getEthWalletTokens(address);
        return { tokens };
      }
    }
  } catch (error) {
    return await handleError(error);
  }
}
