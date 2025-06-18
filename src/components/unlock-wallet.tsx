import OnboardingCard from "@/features/onboarding/onboarding-card";
import { useWalletApp } from "@/hooks/use-wallet-app";
import { tryCatch } from "@/lib/try-catch";
import { decryptVault } from "@/utils/security";
import { Lock } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";
import { useWalletSession } from "./layout/providers/wallet-session-provider";
import { Button } from "./ui/button";
import { Input } from "./ui/input";

export function UnlockWallet() {
  const [error, setError] = useState("");
  const { mnemonicVault } = useWalletApp();
  const { setWalletSession } = useWalletSession();

  async function handleUnlock(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const inputPassword = formData.get("password") as string;
    if (!mnemonicVault) {
      return toast.error("No mnemonic vault found");
    }

    const decryptedMnemonic = await tryCatch(decryptVault(mnemonicVault, inputPassword));
    if (decryptedMnemonic.error) {
      setError("Please enter the correct password");
      return;
    }
    setWalletSession({ isUnlocked: true, decryptedMnemonic: decryptedMnemonic.data });
  }

  return (
    <OnboardingCard icon={<Lock />} title="Unlock Wallet" description="Enter your password to unlock your wallet">
      <form className="flex flex-col gap-4" onSubmit={handleUnlock}>
        <Input type="password" name="password" placeholder="Password" required />
        {!!error && <p className="text-destructive text-sm text-left">{error}</p>}
        <Button>Unlock</Button>
      </form>
    </OnboardingCard>
  );
}
