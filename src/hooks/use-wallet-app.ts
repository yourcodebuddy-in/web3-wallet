import { Wallet } from "@/types/wallet";
import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface WalletAppState {
  hasOnboarded: boolean;
  mnemonicVault:
    | {
        encryptedHex: string;
        saltHex: string;
        ivHex: string;
      }
    | undefined;
  wallets: Wallet[];
  network: string;
}

export const defaultState: WalletAppState = {
  hasOnboarded: false,
  wallets: [],
  mnemonicVault: undefined,
  network: "sol",
};

interface WalletAppActions {
  addWallet: (wallet: Wallet) => void;
  updateWalletApp: (state: Partial<WalletAppState>) => void;
}

export const useWalletApp = create(
  persist<WalletAppState & WalletAppActions>(
    (set, get) => ({
      ...defaultState,
      addWallet: (wallet) => set({ wallets: [...get().wallets, wallet] }),
      updateWalletApp: (state) => set(state),
    }),
    {
      name: "web3-wallet",
    }
  )
);
