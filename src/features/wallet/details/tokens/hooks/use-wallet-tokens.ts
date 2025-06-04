import { useActiveWallet } from "@/components/layout/providers/active-wallet-provider";
import { Networks } from "@/data/supported-networks";
import { useQuery } from "@tanstack/react-query";
import { getWalletTokens } from "../actions/tokens";

function useWalletTokens() {
  const activeWallet = useActiveWallet();
  const walletTokens = useQuery({
    queryKey: ["wallet-tokens", activeWallet],
    queryFn: async () => {
      if (!activeWallet?.address) {
        throw new Error("No active wallet");
      }
      const response = await getWalletTokens({
        address: activeWallet.address,
        network: activeWallet.network as Networks,
      });
      return response;
    },
    enabled: !!activeWallet?.address,
  });

  return walletTokens;
}

export default useWalletTokens;
