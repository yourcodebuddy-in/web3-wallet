import { WalletActivity } from "@/types/wallet";
import { AssetTransfersCategory } from "alchemy-sdk";
import { ethers } from "ethers";
import { alchemy } from "../rpc";

export async function getEthWalletActivity(
  address: string,
  limit: number
): Promise<WalletActivity[]> {
  const transactions = await alchemy.core.getAssetTransfers({
    fromBlock: "0x0",
    fromAddress: address,
    category: [
      AssetTransfersCategory.EXTERNAL,
      AssetTransfersCategory.INTERNAL,
      AssetTransfersCategory.ERC20,
      AssetTransfersCategory.ERC721,
      AssetTransfersCategory.ERC1155,
      AssetTransfersCategory.SPECIALNFT,
    ],
    withMetadata: true,
    maxCount: limit,
  });

  const data = await Promise.all(
    transactions.transfers.map(async (transaction) => {
      const blockNumber = Number(transaction.blockNum);
      const receipt = await alchemy.core.getTransactionReceipt(transaction.hash);
      const preBalance = await alchemy.core.getBalance(address, blockNumber - 1);
      const postBalance = await alchemy.core.getBalance(address, blockNumber);

      return {
        date: new Date(transaction.metadata?.blockTimestamp),
        signature: transaction.uniqueId,
        fee: Number(receipt?.gasUsed ?? 0),
        feeRaw: Number(receipt?.gasUsed ?? 0),
        preBalance: Number(ethers.formatEther(String(preBalance))),
        postBalance: Number(ethers.formatEther(String(postBalance))),
      };
    })
  );

  return data;
}
