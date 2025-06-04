"use client";
import { Wallet } from "lucide-react";
import WalletBalanceAndAddress from "./wallet-balance-and-address";
import WalletOptions from "./wallet-options";
import WelcomeMessage from "./welcome-message";

function WalletSummary() {
  return (
    <section className="w-full rounded-xl bg-card p-5 shadow-[0px_0px_40px_rgba(0,0,0,0.06)] sm:p-8 sm:px-10 space-y-4 xs:space-y-6">
      <div className="space-y-3">
        <WelcomeMessage />
        <div className="flex w-full items-start justify-between">
          <div className="mb-1.5 inline-flex items-center gap-1 text-muted-foreground xs:mb-3">
            <Wallet size={16} />
            <p className="text-left text-xs font-semibold xs:text-sm">Wallet Account Assets</p>
          </div>
        </div>
        <WalletBalanceAndAddress />
      </div>
      <WalletOptions />
    </section>
  );
}

export default WalletSummary;
