"use client";

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useWalletApp } from "@/hooks/use-wallet-app";
import { CreateWalletModal } from "./create-wallet-modal";
import { useActiveWallet } from "./layout/providers/active-wallet-provider";
import { Button } from "./ui/button";
import { Label } from "./ui/label";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Separator } from "./ui/separator";

interface Props {
  children: React.ReactNode;
}

function SwitchWallet({ children }: Props) {
  const { wallets, network } = useWalletApp();
  const activeWallet = useActiveWallet();

  function handleWalletChange(address: string) {
    const wallet = wallets.find((wallet) => wallet.address === address);
    if (wallet && activeWallet.changeWallet) {
      activeWallet.changeWallet(wallet);
    }
  }

  return (
    <Popover>
      <PopoverTrigger>{children}</PopoverTrigger>
      <PopoverContent className="flex flex-col gap-2 w-64">
        <Label>Select a wallet</Label>
        <Select value={activeWallet?.address} onValueChange={handleWalletChange}>
          <SelectTrigger>
            <SelectValue placeholder="Select a wallet" />
          </SelectTrigger>
          <SelectContent>
            {wallets
              .filter((wallet) => wallet.network === network)
              .map((wallet) => (
                <SelectItem key={wallet.address} value={wallet.address}>
                  {wallet.name}
                </SelectItem>
              ))}
          </SelectContent>
        </Select>
        <div className="relative py-3">
          <Separator />
          <p className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-background px-2 text-sm text-muted-foreground">
            OR
          </p>
        </div>
        <CreateWalletModal>
          <Button type="button">New</Button>
        </CreateWalletModal>
      </PopoverContent>
    </Popover>
  );
}

export default SwitchWallet;
