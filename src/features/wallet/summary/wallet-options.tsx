import { useActiveWallet } from "@/components/layout/providers/active-wallet-provider";
import { SwitchNetwork } from "@/components/switch-network";
import SwitchWallet from "@/components/switch-wallet";
import { cn } from "@/lib/utils";
import { Network, PlusCircle, Send, Wallet } from "lucide-react";
import SpecialButton from "../special-button";

function WalletOptions() {
  const activeWallet = useActiveWallet();

  return (
    <div
      className={cn(
        "visible grid w-full grid-cols-4 items-start justify-between overflow-hidden xs:items-center xs:gap-2",
        !activeWallet?.name && "grid-cols-2"
      )}
    >
      {!!activeWallet?.name && (
        <>
          <SpecialButton className="cursor-not-allowed" title="Send" mobileTitle="Send/Pay" icon={<Send />} />
          <SpecialButton className="cursor-not-allowed" variant="secondary" title="Add Funds" icon={<PlusCircle />} />
        </>
      )}
      <SwitchWallet>
        <SpecialButton variant="secondary" title="Wallets" icon={<Wallet />} />
      </SwitchWallet>
      <SwitchNetwork>
        <SpecialButton variant="secondary" title="Network" icon={<Network />} />
      </SwitchNetwork>
    </div>
  );
}

export default WalletOptions;
