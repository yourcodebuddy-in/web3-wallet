import { useWalletApp } from "@/hooks/use-wallet-app";
import { cn } from "@/lib/utils";
import getWalletAddressFromMnemonic from "@/utils/get-wallet-address-from-mnemonic";
import { useMemo, useState } from "react";
import toast from "react-hot-toast";
import { useActiveWallet } from "./layout/providers/active-wallet-provider";
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
import { ScrollArea } from "./ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";

interface Props {
  children: React.ReactNode;
}

export function ManageWalletModal({ children }: Props) {
  const [open, setOpen] = useState(false);
  const { wallets, network, addWallet } = useWalletApp();
  const { address: activeWalletAddress, changeWallet } = useActiveWallet();
  const { decryptedMnemonic } = useWalletSession();
  const networkWallets = useMemo(() => wallets.filter((wallet) => wallet.network === network), [wallets, network]);

  function handleCreateWallet(name: string) {
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

  function handleSelectWallet(address: string) {
    const wallet = networkWallets.find((wallet) => wallet.address === address);
    if (!wallet) return;
    changeWallet?.(wallet);
    setOpen(false);
  }

  return (
    <DialogOrDrawer open={open} onOpenChange={setOpen}>
      <DialogOrDrawerTrigger>{children}</DialogOrDrawerTrigger>
      <DialogOrDrawerContent>
        <DialogOrDrawerHeader>
          <DialogOrDrawerTitle>Manage Wallets</DialogOrDrawerTitle>
          <DialogOrDrawerDescription>Create and manage your wallets on {network} network</DialogOrDrawerDescription>
        </DialogOrDrawerHeader>
        <Tabs defaultValue="wallets">
          <TabsList>
            <TabsTrigger value="wallets">Wallets</TabsTrigger>
            <TabsTrigger value="create">Create</TabsTrigger>
          </TabsList>
          <TabsContent value="wallets" className="pt-2">
            <WalletsList
              networkWallets={networkWallets}
              activeWalletAddress={activeWalletAddress}
              onWalletSelect={handleSelectWallet}
            />
          </TabsContent>
          <TabsContent value="create" className="pt-2">
            <CreateWalletForm onSubmit={handleCreateWallet} />
          </TabsContent>
        </Tabs>
      </DialogOrDrawerContent>
    </DialogOrDrawer>
  );
}

function WalletsList({
  networkWallets,
  activeWalletAddress,
  onWalletSelect,
}: {
  networkWallets: { name: string; address: string; network: string }[];
  activeWalletAddress?: string;
  onWalletSelect: (address: string) => void;
}) {
  return (
    <ScrollArea className="h-52">
      <div className="flex flex-col gap-4">
        {networkWallets.map((wallet) => (
          <div
            key={wallet.address}
            data-wallet-address={wallet.address}
            onClick={() => onWalletSelect(wallet.address)}
            className={cn(
              "rounded-lg border bg-secondary px-4 py-2 hover:border-primary transition-colors",
              activeWalletAddress === wallet.address && "border-primary"
            )}
          >
            {wallet.name} ({wallet.address.slice(0, 4)}...{wallet.address.slice(-4)})
          </div>
        ))}
      </div>
    </ScrollArea>
  );
}

function CreateWalletForm({ onSubmit }: { onSubmit: (name: string) => void }) {
  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const name = formData.get("name") as string;
    onSubmit(name);
  }

  return (
    <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
      <Input name="name" required placeholder="Name" />
      <Button>Create</Button>
    </form>
  );
}
