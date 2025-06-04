import { ScrollArea } from "@/components/ui/scroll-area";
import { supportedNetworks } from "@/data/supported-networks";
import { Network } from "lucide-react";
import NetworkCard from "./network-card";
import OnboardingCard from "./onboarding-card";

interface Props {
  onSelect: (network: string) => void;
}

function SelectNetwork({ onSelect }: Props) {
  return (
    <OnboardingCard
      title="Select a network"
      dsecription={
        <>
          Web3 Wallet supports multiple blockchains.
          <br /> Which do you want to use? You can add more later.
        </>
      }
      icon={<Network />}
    >
      <ScrollArea className="h-80">
        <div className="grid gap-3">
          {supportedNetworks.map((network) => (
            <NetworkCard
              key={network.id}
              name={network.name}
              icon={network.icon}
              code={network.code}
              onSelect={onSelect}
            />
          ))}
        </div>
      </ScrollArea>
    </OnboardingCard>
  );
}

export default SelectNetwork;
