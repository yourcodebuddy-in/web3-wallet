"use client";
import { useWalletApp } from "@/hooks/use-wallet-app";
import { default as getWalletAddressFromMnemonic } from "@/utils/get-wallet-address-from-mnemonic";
import { setOnboardingCookies } from "@/utils/onboarding";
import { createEncryptedVault } from "@/utils/security";
import { generateMnemonic } from "bip39";
import { useState } from "react";
import PasswordSetup from "./password-setup";
import SecretPhraseWarning from "./secret-phrase-warning";
import SecretRecoveryPhase from "./secret-recovery-phase";
import SelectNetwork from "./select-network";
import WelcomeCard from "./welcome-card";

function Onboarding() {
  const [password, setPassword] = useState("");
  const [mnemonic, setMnemonic] = useState("");
  const [onboardingStep, setOnboardingStep] = useState(0);
  const { network, wallets, updateWalletApp } = useWalletApp();

  async function createWallet() {
    const mnemonic = generateMnemonic();
    const address = getWalletAddressFromMnemonic(network, mnemonic);
    if (!address || !password) {
      setOnboardingStep(1);
      return;
    }
    setMnemonic(mnemonic);
    const vault = await createEncryptedVault(mnemonic, password);
    updateWalletApp({ mnemonicVault: vault, wallets: [{ name: "Wallet 1", address, network }] });
    setOnboardingStep(4);
  }

  function completeOnboarding() {
    if (!wallets[0]?.address) {
      setOnboardingStep(1);
      return;
    }
    updateWalletApp({
      hasOnboarded: true,
    });
    setPassword(password);
    setOnboardingCookies();
  }

  return (
    <div className="w-full">
      {onboardingStep === 0 && <WelcomeCard onContinue={() => setOnboardingStep(1)} />}
      {onboardingStep === 1 && (
        <SelectNetwork
          onSelect={(network) => {
            updateWalletApp({ network });
            setOnboardingStep(2);
          }}
        />
      )}
      {onboardingStep === 2 && (
        <PasswordSetup
          onContinue={(password) => {
            setPassword(password);
            setOnboardingStep(3);
          }}
        />
      )}
      {onboardingStep === 3 && <SecretPhraseWarning onContinue={createWallet} />}
      {!!(onboardingStep === 4 && mnemonic) && (
        <SecretRecoveryPhase mnemonic={mnemonic} onContinue={completeOnboarding} />
      )}
    </div>
  );
}

export default Onboarding;
