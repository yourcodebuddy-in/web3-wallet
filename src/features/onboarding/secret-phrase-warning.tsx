import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { FileWarning, Lock, TriangleAlert } from "lucide-react";
import { useState } from "react";
import OnboardingCard from "./onboarding-card";

interface Props {
  onContinue: () => void;
}

function SecretPhraseWarning({ onContinue }: Props) {
  const [warningAccepted, setWarningAccepted] = useState(false);

  return (
    <OnboardingCard
      title="Secret Recovery Phrase"
      dsecription="On the next page, you will receive your secret recovery phrase."
      icon={<FileWarning />}
    >
      <div className="flex items-center gap-4 rounded-lg border bg-accent p-3 text-left">
        <TriangleAlert className="text-yellow-700" />
        <p>
          This is the <b>ONLY</b> way to recover your account if you lose access to your device or
          password.
        </p>
      </div>
      <div className="flex items-center gap-4 rounded-lg border bg-accent p-3 text-left">
        <Lock className="text-green-700" />
        <p>
          Write it down, store it in a safe place, and <b>NEVER</b> share it with anyone.
        </p>
      </div>
      <div className="flex items-center gap-3 text-left">
        <Checkbox
          className="size-5"
          id="phrase-warning"
          checked={warningAccepted}
          onCheckedChange={setWarningAccepted as () => void}
        />
        <Label htmlFor="phrase-warning" className="leading-5">
          I understand that I am responsible for saving my secret recovery phrase, and that it is
          the only way to recover my wallet.
        </Label>
      </div>
      <Button type="button" size="lg" onClick={onContinue} disabled={!warningAccepted}>
        Continue
      </Button>
    </OnboardingCard>
  );
}

export default SecretPhraseWarning;
