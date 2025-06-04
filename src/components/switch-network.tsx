import { supportedNetworks } from "@/data/supported-networks";
import { useWalletApp } from "@/hooks/use-wallet-app";
import { Label } from "./ui/label";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";

interface Props {
  children: React.ReactNode;
}

export function SwitchNetwork({ children }: Props) {
  const { network, updateWalletApp } = useWalletApp();

  function handleNetworkChange(network: string) {
    updateWalletApp({ network });
  }

  return (
    <Popover>
      <PopoverTrigger>{children}</PopoverTrigger>
      <PopoverContent className="flex flex-col gap-2 w-64">
        <Label>Select a network</Label>
        <Select value={network} onValueChange={handleNetworkChange}>
          <SelectTrigger>
            <SelectValue placeholder="Select a network" />
          </SelectTrigger>
          <SelectContent>
            {supportedNetworks.map((network) => (
              <SelectItem key={network.code} value={network.code}>
                {network.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </PopoverContent>
    </Popover>
  );
}
