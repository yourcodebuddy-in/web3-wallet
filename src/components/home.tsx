"use client";
import { UnlockWallet } from "@/components/unlock-wallet";
import Onboarding from "@/features/onboarding/onboarding";
import Wallet from "@/features/wallet/wallet";
import { useWalletApp } from "@/hooks/use-wallet-app";
import { useState } from "react";

interface Props {
  hasOnboarded: boolean;
}

export function Home({ hasOnboarded }: Props) {
  const { hasOnboarded: hasOnboardedFromWalletApp } = useWalletApp();
  const [isUnlocked, setIsUnlocked] = useState(false);
  const resolvedHasOnboarded = hasOnboarded || hasOnboardedFromWalletApp;

  return (
    <div className="flex min-h-screen w-full flex-col items-center justify-center">
      {isUnlocked && resolvedHasOnboarded ? <Wallet /> : null}
      {!resolvedHasOnboarded && <Onboarding />}
      {!isUnlocked && resolvedHasOnboarded ? <UnlockWallet setIsUnlocked={setIsUnlocked} /> : null}
    </div>
  );
}
