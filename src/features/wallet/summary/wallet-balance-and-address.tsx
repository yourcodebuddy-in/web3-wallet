"use client";
import { ManageWalletModal } from "@/components/manage-wallet-modal";
import { SwitchNetworkModal } from "@/components/switch-network-modal";
import { cn } from "@/lib/utils";
import { ArrowLeftRight, Network, Wallet } from "lucide-react";
import WalletAddressModal from "../address/wallet-address-modal";

function WalletBalanceAndAddress() {
  const total = 0;

  return (
    <div className="flex w-full items-center justify-between">
      <div>
        <h1 className="text-4xl font-bold text-foreground xs:text-6xl">
          ${total ?? 0}
          {/* <span className="ml-2 text-2xl text-foreground/70 xs:text-4xl">USD</span> */}
        </h1>
      </div>
      <div className="flex items-center gap-2">
        <SwitchNetworkModal>
          <Badge label="Network" icon={<Network size={14} />} />
        </SwitchNetworkModal>
        <ManageWalletModal>
          <Badge label="Wallets" icon={<ArrowLeftRight size={14} />} />
        </ManageWalletModal>
        <WalletAddressModal>
          <Badge label="Address" icon={<Wallet size={14} />} />
        </WalletAddressModal>
      </div>
    </div>
  );
}

export default WalletBalanceAndAddress;

function Badge({ label, icon }: { label: string; icon: React.ReactNode }) {
  return (
    <div
      className={cn(
        "flex cursor-pointer items-start justify-center gap-1 rounded-full px-2.5 py-2.5 xs:px-3",
        "bg-muted/60 text-foreground/70 hover:bg-muted",
        "transition-colors duration-300"
      )}
    >
      <div className="flex aspect-square h-4 w-4 items-center justify-center">{icon}</div>
      <span className="hidden text-xs font-semibold text-foreground/70 sm:block">{label}</span>
    </div>
  );
}
