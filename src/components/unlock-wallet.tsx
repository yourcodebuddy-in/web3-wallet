import { useWalletApp } from "@/hooks/use-wallet-app";
import { hashPassword } from "@/utils/password";
import { Lock } from "lucide-react";
import { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";

interface Props {
  setIsUnlocked: (isUnlocked: boolean) => void;
}

export function UnlockWallet({ setIsUnlocked }: Props) {
  const [error, setError] = useState("");
  const { password } = useWalletApp();

  function handleUnlock(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const inputPassword = formData.get("password") as string;
    const hashedInputPassword = hashPassword(inputPassword);
    if (hashedInputPassword === password) {
      setIsUnlocked(true);
    } else {
      setError("Please enter the correct password");
    }
  }

  return (
    <div className="card">
      <section className="w-full p-5 sm:p-8 sm:px-10">
        <div className="flex flex-col gap-5">
          <div className="mx-auto w-fit rounded-lg bg-secondary p-4">
            <Lock />
          </div>
          <div>
            <h1 className="text-center font-bold text-foreground xs:text-2xl">Unlock Wallet</h1>
            <p>Enter your password to unlock your wallet</p>
          </div>
          <form className="flex flex-col gap-4" onSubmit={handleUnlock}>
            <Input type="password" name="password" placeholder="Password" required />
            {error && <p className="text-destructive text-sm text-left">{error}</p>}
            <Button>Unlock</Button>
          </form>
        </div>
      </section>
    </div>
  );
}
