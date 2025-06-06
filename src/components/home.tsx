"use client";
import { useWalletSession } from "@/components/layout/providers/wallet-session-provider";
import { UnlockWallet } from "@/components/unlock-wallet";
import Onboarding from "@/features/onboarding/onboarding";
import Wallet from "@/features/wallet/wallet";
import { useWalletApp } from "@/hooks/use-wallet-app";

interface Props {
  hasOnboarded: boolean;
}

export function Home({ hasOnboarded }: Props) {
  const { hasOnboarded: hasOnboardedFromWalletApp } = useWalletApp();
  const resolvedHasOnboarded = hasOnboarded || hasOnboardedFromWalletApp;
  const { isUnlocked } = useWalletSession();

  return (
    <div className="flex min-h-screen w-full flex-col items-center justify-center">
      {isUnlocked && resolvedHasOnboarded ? <Wallet /> : null}
      {!resolvedHasOnboarded && <Onboarding />}
      {!isUnlocked && resolvedHasOnboarded ? <UnlockWallet /> : null}
    </div>
  );
}
