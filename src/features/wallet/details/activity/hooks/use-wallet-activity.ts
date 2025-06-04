import { useActiveWallet } from "@/components/layout/providers/active-wallet-provider";
import { Networks } from "@/data/supported-networks";
import { useQuery } from "@tanstack/react-query";
import { getWalletActivity } from "../actions/activity";

function useWalletActivity() {
  const activeWallet = useActiveWallet();
  const walletActivity = useQuery({
    queryKey: ["wallet-activity", activeWallet],
    queryFn: async () => {
      if (!activeWallet?.address || !activeWallet?.network) {
        throw new Error("No active wallet");
      }
      const response = await getWalletActivity({
        address: activeWallet.address,
        network: activeWallet.network as Networks,
        limit: 10,
      });
      return response;
    },
    enabled: !!activeWallet?.address,
  });

  return walletActivity;
}

export default useWalletActivity;
