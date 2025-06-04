import { Networks } from "@/data/supported-networks";
import EtherscanImg from "@/public/images/etherscan.png";
import SolscanImg from "@/public/images/solscan.webp";

export function getNetworkExplorer(network: string | undefined, address: string | undefined) {
  switch (network) {
    case Networks.solana:
      return {
        name: "SolScan",
        icon: SolscanImg,
        url: `https://solscan.io/account/${address}`,
        network: "Solana",
      };
    case Networks.ethereum:
      return {
        name: "Etherscan",
        icon: EtherscanImg,
        url: `https://etherscan.io/address/${address}`,
        network: "Ethereum",
      };
  }
}
