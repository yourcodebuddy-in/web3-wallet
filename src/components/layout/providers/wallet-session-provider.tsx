"use client";
import { createContext, useContext, useState } from "react";

interface State {
  isUnlocked: boolean;
  decryptedMnemonic: string | undefined;
}

interface Actions {
  setWalletSession: (state: State) => void;
}

const WalletSessionContext = createContext<State & Actions>({
  isUnlocked: false,
  decryptedMnemonic: undefined,
  setWalletSession: () => {},
});

export const useWalletSession = () => useContext(WalletSessionContext);

export function WalletSessionProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<State>({
    isUnlocked: false,
    decryptedMnemonic: undefined,
  });

  return (
    <WalletSessionContext.Provider
      value={{
        ...state,
        setWalletSession: setState,
      }}
    >
      {children}
    </WalletSessionContext.Provider>
  );
}
