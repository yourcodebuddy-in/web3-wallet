import { useWalletApp } from "@/hooks/use-wallet-app";
import getWalletAddressFromMnemonic from "@/utils/get-wallet-address-from-mnemonic";
import { useState } from "react";
import toast from "react-hot-toast";
import { useWalletSession } from "./layout/providers/wallet-session-provider";
import { Button } from "./ui/button";
import {
  DialogOrDrawer,
  DialogOrDrawerContent,
  DialogOrDrawerDescription,
  DialogOrDrawerHeader,
  DialogOrDrawerTitle,
  DialogOrDrawerTrigger,
} from "./ui/dialog-or-drawer";
import { Input } from "./ui/input";

interface Props {
  children: React.ReactNode;
}

export function CreateWalletModal({ children }: Props) {
  const [open, setOpen] = useState(false);
  const { wallets, network, addWallet } = useWalletApp();
  const { decryptedMnemonic } = useWalletSession();

  function createWallet(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const name = formData.get("name") as string;
    if (!decryptedMnemonic) {
      return toast.error("No mnemonic found");
    }

    const address = getWalletAddressFromMnemonic(network, decryptedMnemonic, wallets.length + 1);
    if (!address) return;
    addWallet({
      name,
      address,
      network,
    });
    setOpen(false);
  }

  return (
    <DialogOrDrawer open={open} onOpenChange={setOpen}>
      <DialogOrDrawerTrigger asChild>{children}</DialogOrDrawerTrigger>
      <DialogOrDrawerContent>
        <DialogOrDrawerHeader>
          <DialogOrDrawerTitle>Create Wallet</DialogOrDrawerTitle>
          <DialogOrDrawerDescription>Enter a name for your new wallet</DialogOrDrawerDescription>
        </DialogOrDrawerHeader>
        <form className="flex flex-col gap-4" onSubmit={createWallet}>
          <Input name="name" required placeholder="Name" />
          <Button>Create</Button>
        </form>
      </DialogOrDrawerContent>
    </DialogOrDrawer>
  );
}
