import WalletCard from "@/components/wallet-card";
import WalletTabs from "./details/wallet-tabs";
import WalletSummary from "./summary/wallet-summary";

function Wallet() {
  return (
    <WalletCard>
      <WalletSummary />
      <WalletTabs />
    </WalletCard>
  );
}

export default Wallet;
