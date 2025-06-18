import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { useCopyToClipboard } from "@uidotdev/usehooks";
import { WalletCardsIcon } from "lucide-react";
import { useState } from "react";
import OnboardingCard from "./onboarding-card";

interface Props {
  mnemonic: string;
  onContinue: () => void;
}

function SecretRecoveryPhase({ mnemonic, onContinue }: Props) {
  const words = mnemonic.split(" ");
  const [secretPhraseSaved, setSecretPhraseSaved] = useState(false);
  const [copiedText, copyToClipboard] = useCopyToClipboard();

  async function handleCopy() {
    await copyToClipboard(mnemonic);
  }

  return (
    <OnboardingCard
      title="Secret Recovery Phrase"
      description="Save these words in a safe place."
      icon={<WalletCardsIcon />}
    >
      <div className="cursor-pointer rounded-lg border" onClick={handleCopy}>
        <div className="grid grid-cols-2 gap-4 p-3 xs:grid-cols-3 md:grid-cols-4">
          {words.map((word, index) => (
            // eslint-disable-next-line react/no-array-index-key
            <p className="rounded-lg border bg-secondary px-5 py-2 font-medium" key={word + index}>
              {word}
            </p>
          ))}
        </div>
        <p className="border-t px-3 py-1 text-xs">{copiedText ? "Copied" : "Click anywhere on this card to copy"}</p>
      </div>
      <div className="flex items-center gap-3 text-left">
        <Checkbox
          id="phrase-saved"
          className="size-5"
          checked={secretPhraseSaved}
          onCheckedChange={setSecretPhraseSaved as () => void}
        />
        <Label htmlFor="phrase-saved">I saved my secret recovery phrase</Label>
      </div>
      <Button type="button" size="lg" disabled={!secretPhraseSaved} onClick={onContinue}>
        Continue
      </Button>
    </OnboardingCard>
  );
}

export default SecretRecoveryPhase;
