import { WalletActivity } from "@/types/wallet";
import { LAMPORTS_PER_SOL, PublicKey } from "@solana/web3.js";
import { solanaConnection } from "../rpc";

export async function getSolanaWalletActivity(
  address: string,
  limit: number
): Promise<WalletActivity[]> {
  const publicKey = new PublicKey(address);
  const transactions = await solanaConnection.getSignaturesForAddress(publicKey, {
    limit,
  });
  const signatures = transactions.map((transaction) => transaction.signature);
  const transactionDetails = await solanaConnection.getParsedTransactions(signatures, {
    maxSupportedTransactionVersion: 0,
  });
  const filteredTransactionDetails = transactionDetails.filter((transaction) => !!transaction);

  const data = filteredTransactionDetails.map((transaction) => {
    const date = new Date((transaction.blockTime ?? 0) * 1000);
    const preBalances = transaction.meta?.preBalances;
    const postBalances = transaction.meta?.postBalances;

    const accountKeyIndex = transaction.transaction.message.accountKeys.findIndex(
      (account) => String(account.pubkey) === address
    );

    return {
      date,
      signature: transaction.transaction.signatures[0],
      feeRaw: transaction.meta?.fee ?? 0,
      fee: (transaction.meta?.fee ?? 0) / LAMPORTS_PER_SOL,
      preBalance: (preBalances?.[accountKeyIndex] ?? 0) / LAMPORTS_PER_SOL,
      postBalance: (postBalances?.[accountKeyIndex] ?? 0) / LAMPORTS_PER_SOL,
    };
  });
  return data;
}
