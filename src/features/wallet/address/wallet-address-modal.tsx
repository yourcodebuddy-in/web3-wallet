"use client";
import { useActiveWallet } from "@/components/layout/providers/active-wallet-provider";
import { Button } from "@/components/ui/button";
import {
  DialogOrDrawer,
  DialogOrDrawerClose,
  DialogOrDrawerContent,
  DialogOrDrawerDescription,
  DialogOrDrawerHeader,
  DialogOrDrawerTitle,
  DialogOrDrawerTrigger,
} from "@/components/ui/dialog-or-drawer";
import { getNetworkExplorer } from "@/utils/get-network-explorer";
import { Info } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { QRCodeCanvas } from "qrcode.react";
import CopyWalletAddressInput from "./copy-wallet-address-input";

interface Props {
  children: React.ReactNode;
}

function WalletAddressModal({ children }: Props) {
  const wallet = useActiveWallet();
  const explorer = getNetworkExplorer(wallet.network, wallet.address);

  return (
    <DialogOrDrawer>
      <DialogOrDrawerTrigger>{children}</DialogOrDrawerTrigger>
      <DialogOrDrawerContent className="px-5 py-10 xs:px-10">
        <DialogOrDrawerHeader className="px-6 py-4 *:text-center">
          <DialogOrDrawerTitle className="text-xl xs:text-2xl">Your Wallet Address</DialogOrDrawerTitle>
          <DialogOrDrawerDescription className="mt-2">
            You can deposit crypto or NFTs into your account via this {explorer?.network} wallet address:
          </DialogOrDrawerDescription>
        </DialogOrDrawerHeader>
        <div className="mx-auto flex w-full max-w-[500px] flex-col items-center justify-center rounded-lg bg-muted px-9 py-8">
          <div className="relative mx-auto mb-5 rounded-lg bg-white p-5">
            <QRCodeCanvas value={wallet?.address ?? ""} />
          </div>
          <CopyWalletAddressInput />
          <div className="flex w-full items-start justify-center pt-4 text-muted-foreground">
            <Info size={14} />
            <span className="ml-1 text-xs font-normal">
              Only send crypto to this address via the <span className="font-bold uppercase">{explorer?.network}</span>{" "}
              network.
            </span>
          </div>
        </div>
        <div className="mt-6 grid w-full gap-2 xs:grid-cols-2">
          {!!explorer && (
            <Button size="lg" variant="outline" type="button" asChild>
              <Link href={explorer.url} target="_blank" rel="noreferrer">
                <Image width={20} height={20} src={explorer.icon} alt={explorer.name} />
                View on {explorer.name}
              </Link>
            </Button>
          )}
          <DialogOrDrawerClose asChild>
            <Button size="lg" variant="outline" type="button">
              Done
            </Button>
          </DialogOrDrawerClose>
        </div>
      </DialogOrDrawerContent>
    </DialogOrDrawer>
  );
}

export default WalletAddressModal;
