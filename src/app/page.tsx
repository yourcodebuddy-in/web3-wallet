"use client";

import Onboarding from "@/features/onboarding/onboarding";
import Wallet from "@/features/wallet/wallet";
import { useWalletApp } from "@/hooks/use-wallet-app";

export default function Home() {
  const { hasOnboarded } = useWalletApp();

  return (
    <main className="bg-secondary">
      <div className="container">
        <div className="flex min-h-screen w-full flex-col items-center justify-center">
          {hasOnboarded ? <Wallet /> : <Onboarding />}
        </div>
      </div>
    </main>
  );
}
