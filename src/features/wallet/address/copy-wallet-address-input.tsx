"use client";
import { useActiveWallet } from "@/components/layout/providers/active-wallet-provider";
import { Button } from "@/components/ui/button";
import { useCopyToClipboard } from "@uidotdev/usehooks";
import { Check, Copy } from "lucide-react";

function CopyWalletAddressInput() {
  const wallet = useActiveWallet();
  const [isCopied, copy] = useCopyToClipboard();

  async function handleCopy() {
    await copy(wallet?.address ?? "");
  }

  return (
    <div className="relative flex h-12 w-full cursor-pointer items-center justify-between rounded-full border border-muted bg-background px-4">
      <div className="inline-flex w-full px-4 text-center text-foreground">
        <p className="w-full text-center text-foreground">
          {wallet?.address?.slice(0, 4)}....{wallet?.address?.slice(-4)}
        </p>
      </div>
      <span tabIndex={0}>
        <Button
          type="button"
          className="absolute right-0.5 top-1/2 aspect-square h-[42px] w-[42px] -translate-y-1/2 rounded-full px-0"
          onClick={handleCopy}
        >
          {isCopied ? <Check size={16} /> : <Copy size={16} />}
        </Button>
      </span>
    </div>
  );
}

export default CopyWalletAddressInput;
