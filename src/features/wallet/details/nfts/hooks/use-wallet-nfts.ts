import { useActiveWallet } from "@/components/layout/providers/active-wallet-provider";
import { Networks } from "@/data/supported-networks";
import { useQuery } from "@tanstack/react-query";
import { getWalletNFTs } from "../actions/nfts";

function useWalletNFTs() {
  const activeWallet = useActiveWallet();
  const walletNFTs = useQuery({
    queryKey: ["wallet-nfts", activeWallet],
    queryFn: async () => {
      if (!activeWallet?.address || !activeWallet?.network) {
        throw new Error("No active wallet");
      }
      const response = await getWalletNFTs({
        address: activeWallet.address,
        network: activeWallet.network as Networks,
      });
      return response;
    },
    enabled: !!activeWallet?.address,
  });

  return walletNFTs;
}

export default useWalletNFTs;
