import { Button } from "@/components/ui/button";
import { Wallet } from "lucide-react";
import { features } from "./data/features";
import FeatureCard from "./feature-card";
import OnboardingCard from "./onboarding-card";

interface Props {
  onContinue: () => void;
}

function WelcomeCard({ onContinue }: Props) {
  return (
    <OnboardingCard
      title="Welcome to Your Web3 Wallet"
      dsecription="Your gateway to the world of digital assets and decentralized finance."
      icon={<Wallet />}
    >
      <div className="grid gap-3">
        {features.map((feature) => (
          <FeatureCard key={feature.id} title={feature.title} description={feature.description} />
        ))}
      </div>
      <Button type="button" size="lg" onClick={onContinue}>
        Continue
      </Button>
    </OnboardingCard>
  );
}

export default WelcomeCard;
