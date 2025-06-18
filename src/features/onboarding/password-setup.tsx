import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input, PasswordInput } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { KeyRound } from "lucide-react";
import { useState } from "react";
import OnboardingCard from "./onboarding-card";

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
    <OnboardingCard
      icon={<KeyRound />}
      title="Create a password"
      description="It should be at least 8 characters. You'll need this to unlock your wallet."
    >
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
        <Button size="lg" disabled={password !== confirmPassword || !password || !termsAccepted}>
          Continue
        </Button>
      </form>
    </OnboardingCard>
  );
}

export default PasswordSetup;
