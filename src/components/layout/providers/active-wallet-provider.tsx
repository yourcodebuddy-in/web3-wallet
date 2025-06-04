"use client";
import { useWalletApp } from "@/hooks/use-wallet-app";
import { createContext, useContext, useEffect, useState } from "react";

const Context = createContext<Partial<State & Actions>>({});
export const useActiveWallet = () => useContext(Context);

interface State {
  name?: string;
  address?: string;
  network?: string;
}

interface Actions {
  changeWallet: (wallet: State) => void;
}

function ActiveWalletProvider({ children }: { children: React.ReactNode }) {
  const [activeWallet, setActiveWallet] = useState<State | undefined>(undefined);
  const { wallets } = useWalletApp();

  useEffect(() => {
    if (wallets.length !== 0) {
      setActiveWallet(wallets[wallets.length - 1]);
    }
  }, [wallets]);

  return (
    <Context.Provider
      value={{
        ...activeWallet,
        changeWallet: (wallet: State) => {
          setActiveWallet(wallet);
        },
      }}
    >
      {children}
    </Context.Provider>
  );
}

export default ActiveWalletProvider;
