"use server";

import { Networks } from "@/data/supported-networks";
import { handleError } from "@/lib/actions";
import { getEthWalletActivity } from "@/utils/server/ethereum/get-eth-wallet-activity";
import { getSolanaWalletActivity } from "@/utils/server/solana/get-solana-wallet-activity";
import { z } from "zod";

const getWalletActivitySchema = z.object({
  network: z.nativeEnum(Networks),
  address: z.string(),
  limit: z.number().optional(),
});

export async function getWalletActivity(data: z.infer<typeof getWalletActivitySchema>) {
  try {
    const { network, address, limit } = getWalletActivitySchema.parse(data);

    switch (network) {
      case Networks.solana: {
        const activity = await getSolanaWalletActivity(address, limit ?? 10);
        return { activity };
      }
      case Networks.ethereum: {
        const activity = await getEthWalletActivity(address, limit ?? 10);
        return { activity };
      }
    }
  } catch (error) {
    return await handleError(error);
  }
}
