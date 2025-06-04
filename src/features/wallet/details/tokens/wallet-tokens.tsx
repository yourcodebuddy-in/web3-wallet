"use client";
import { ScrollArea } from "@/components/ui/scroll-area";
import useWalletTokens from "@/features/wallet/details/tokens/hooks/use-wallet-tokens";
import EmptyState from "./empty-state";
import TokenCard from "./token-card";

function WalletTokens() {
  const { isLoading, data } = useWalletTokens();

  return (
    <div className="pt-3">
      <ScrollArea className="h-screen max-h-[35vh]">
        <div className="flex flex-col gap-3">
          {isLoading
            ? [...Array(6).keys()].map((value) => <TokenCard key={value} isLoading />)
            : data?.tokens?.map((token) => (
                <TokenCard
                  key={token.owner + token.symbol}
                  name={token.name}
                  symbol={token.symbol}
                  icon={token.icon}
                  amount={token.amount}
                />
              ))}
          {!isLoading && !data?.tokens?.[0] && <EmptyState />}
        </div>
      </ScrollArea>
    </div>
  );
}

export default WalletTokens;
