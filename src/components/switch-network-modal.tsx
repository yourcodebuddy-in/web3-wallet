import { supportedNetworks } from "@/data/supported-networks";
import { useWalletApp } from "@/hooks/use-wallet-app";
import { cn } from "@/lib/utils";
import getWalletAddressFromMnemonic from "@/utils/get-wallet-address-from-mnemonic";
import Image from "next/image";
import { useState } from "react";
import { useWalletSession } from "./layout/providers/wallet-session-provider";
import {
  DialogOrDrawer,
  DialogOrDrawerContent,
  DialogOrDrawerHeader,
  DialogOrDrawerTitle,
  DialogOrDrawerTrigger,
} from "./ui/dialog-or-drawer";

interface Props {
  children: React.ReactNode;
}

export function SwitchNetworkModal({ children }: Props) {
  const [open, setOpen] = useState(false);
  const { network: activeNetwork, wallets, addWallet, updateWalletApp } = useWalletApp();
  const { decryptedMnemonic } = useWalletSession();

  function handleNetworkChange(e: React.MouseEvent<HTMLDivElement>) {
    const network = e.currentTarget.dataset.network;
    if (!network) return;
    const networkWallets = wallets.filter((wallet) => wallet.network === network);
    if (networkWallets.length === 0 && decryptedMnemonic) {
      const address = getWalletAddressFromMnemonic(network, decryptedMnemonic, 0);
      if (!address) return;
      addWallet({ address, network, name: "Wallet 1" });
    }
    updateWalletApp({ network });
    setOpen(false);
  }

  return (
    <DialogOrDrawer open={open} onOpenChange={setOpen}>
      <DialogOrDrawerTrigger>{children}</DialogOrDrawerTrigger>
      <DialogOrDrawerContent>
        <DialogOrDrawerHeader>
          <DialogOrDrawerTitle>Select a network</DialogOrDrawerTitle>
        </DialogOrDrawerHeader>
        <div className="flex gap-2 flex-wrap justify-center py-8">
          {supportedNetworks.map((network) => (
            <div
              key={network.code}
              data-network={network.code}
              className={cn(
                "border rounded-lg p-4 text-center hover:border-primary transition-colors cursor-pointer",
                "flex flex-col items-center justify-center gap-2 w-28 h-28 aspect-square",
                network.code === activeNetwork && "border-primary"
              )}
              onClick={handleNetworkChange}
            >
              <Image src={network.icon} alt={network.name} width={50} height={50} className="aspect-square" />
              <h1>{network.name}</h1>
            </div>
          ))}
        </div>
      </DialogOrDrawerContent>
    </DialogOrDrawer>
  );
}
