import { cn } from "@/lib/utils";

interface Props {
  children: React.ReactNode;
}

function WalletCard({ children }: Props) {
  return (
    <div
      className={cn(
        "mx-auto w-full max-w-3xl flex-col items-center space-y-2 rounded-xl border border-muted bg-background text-center sm:my-4",
        "shadow-[0px_4px_40px_rgba(0,0,0,0.06),inset_0px_0px_40px_rgba(255,255,255,0.8)]",
        "dark:shadow-none"
      )}
    >
      {children}
    </div>
  );
}

export default WalletCard;
