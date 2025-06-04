import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input, PasswordInput } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import WalletCard from "@/components/wallet-card";
import { KeyRound } from "lucide-react";
import { useState } from "react";

interface Props {
  onContinue: (password: string) => void;
}

function PasswordSetup({ onContinue }: Props) {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [termsAccepted, setTermsAccepted] = useState(false);

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!password || password !== confirmPassword) return;
    onContinue(password);
  }

  return (
    <WalletCard>
      <section className="w-full rounded-xl bg-card p-5 shadow-[0px_0px_40px_rgba(0,0,0,0.06)] sm:p-8 sm:px-10">
        <div className="flex flex-col gap-5">
          <div className="mx-auto w-fit rounded-lg bg-secondary p-4">
            <KeyRound className="size-7 xs:size-10" />
          </div>
          <div>
            <h1 className="text-center font-bold text-foreground xs:text-2xl">Create a password</h1>
            <p>It should be at least 8 characters.</p>
            <p>You&apos;ll need this to unlock your wallet.</p>
          </div>
          <form className="grid gap-4" onSubmit={handleSubmit}>
            <PasswordInput
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              minLength={8}
            />
            <Input
              placeholder="Confirm password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            <div className="flex items-center gap-3 text-left">
              <Checkbox
                id="terms-accepted"
                className="size-5"
                checked={termsAccepted}
                onCheckedChange={setTermsAccepted as () => void}
              />
              <Label htmlFor="terms-accepted">I agree to use this wallet at my own risk</Label>
            </div>
            <Button
              size="lg"
              disabled={password !== confirmPassword || !password || !termsAccepted}
            >
              Continue
            </Button>
          </form>
        </div>
      </section>
    </WalletCard>
  );
}

export default PasswordSetup;
