"use client";
import { useWalletApp } from "@/hooks/use-wallet-app";
import { default as getWalletAddressFromMnemonic } from "@/utils/get-wallet-address-from-mnemonic";
import { setOnboardingCookie } from "@/utils/onboarding";
import { generateMnemonic } from "bip39";
import { useState } from "react";
import PasswordSetup from "./password-setup";
import SecretPhraseWarning from "./secret-phrase-warning";
import SecretRecoveryPhase from "./secret-recovery-phase";
import SelectNetwork from "./select-network";
import WelcomeCard from "./welcome-card";

function Onboarding() {
  const [onboardingStep, setOnboardingStep] = useState(0);
  const [network, setNetwork] = useState("");
  const [mnemonic, setMnemonic] = useState("");
  const [walletAddress, setWalletAddress] = useState("");
  const { addWallet, updateWalletApp } = useWalletApp();

  function createWallet() {
    if (!network) {
      setOnboardingStep(1);
      return;
    }
    const mnemonic = generateMnemonic();
    setMnemonic(mnemonic);
    const address = getWalletAddressFromMnemonic(network, mnemonic);
    if (!address) {
      setOnboardingStep(1);
      return;
    }
    setWalletAddress(address);
    setOnboardingStep(3);
  }

  function saveWallet(password: string) {
    if (!network || !mnemonic || !walletAddress) {
      setOnboardingStep(1);
      return;
    }
    addWallet({
      name: "Wallet 1",
      address: walletAddress,
      network,
    });
    updateWalletApp({
      mnemonic,
      password,
      hasOnboarded: true,
    });
    setOnboardingCookie();
  }

  return (
    <div className="w-full">
      {onboardingStep === 0 && <WelcomeCard onContinue={() => setOnboardingStep(1)} />}
      {onboardingStep === 1 && (
        <SelectNetwork
          onSelect={(network) => {
            setNetwork(network);
            setOnboardingStep(2);
          }}
        />
      )}
      {onboardingStep === 2 && <SecretPhraseWarning onContinue={createWallet} />}
      {onboardingStep === 3 && <SecretRecoveryPhase mnemonic={mnemonic} onContinue={() => setOnboardingStep(4)} />}
      {onboardingStep === 4 && <PasswordSetup onContinue={saveWallet} />}
    </div>
  );
}

export default Onboarding;
