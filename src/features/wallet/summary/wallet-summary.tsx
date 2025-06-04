"use client";
import { Wallet } from "lucide-react";
import WalletBalanceAndAddress from "./wallet-balance-and-address";
import WalletOptions from "./wallet-options";
import WelcomeMessage from "./welcome-message";

function WalletSummary() {
  return (
    <section className="w-full rounded-xl bg-card p-5 shadow-[0px_0px_40px_rgba(0,0,0,0.06)] sm:p-8 sm:px-10">
      <div className="mb-6 grid gap-3">
        <WelcomeMessage />
      </div>
      <div className="flex w-full items-start justify-between">
        <div className="mb-1.5 inline-flex items-center gap-1 text-muted-foreground xs:mb-3">
          <Wallet size={16} />
          <p className="text-left text-xs font-semibold xs:text-sm">Wallet Account Assets</p>
        </div>
      </div>
      <WalletBalanceAndAddress />
      <WalletOptions />
    </section>
  );
}

export default WalletSummary;
