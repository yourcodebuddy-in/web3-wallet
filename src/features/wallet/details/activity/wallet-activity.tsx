"use client";

import { ScrollArea } from "@/components/ui/scroll-area";
import ActivityCard from "./activity-card";
import EmptyState from "./empty-state";
import useWalletActivity from "./hooks/use-wallet-activity";

function WalletActivity() {
  const { data, isLoading } = useWalletActivity();

  return (
    <div className="pt-3">
      <ScrollArea className="h-screen max-h-[35vh]">
        <div className="flex flex-col gap-3">
          {isLoading
            ? [...Array(6).keys()].map((value) => <ActivityCard key={value} isLoading />)
            : data?.activity?.map((activity) => (
                <ActivityCard
                  key={activity.signature}
                  date={activity.date}
                  fee={activity.fee}
                  feeRaw={activity.feeRaw}
                  preBalance={activity.preBalance}
                  postBalance={activity.postBalance}
                  signature={activity.signature}
                />
              ))}
          {!isLoading && !data?.activity?.[0] && <EmptyState />}
        </div>
      </ScrollArea>
    </div>
  );
}

export default WalletActivity;
