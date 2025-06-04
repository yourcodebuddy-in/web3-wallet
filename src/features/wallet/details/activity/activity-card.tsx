import { Skeleton } from "@/components/ui/skeleton";
import { useCopyToClipboard } from "@uidotdev/usehooks";
import { Check, Copy } from "lucide-react";

type Props = {
  isLoading?: boolean;
} & (
  | {
      date: Date;
      signature: string;
      feeRaw: number;
      fee: number;
      preBalance: number;
      postBalance: number;
    }
  | { isLoading: true }
);

function ActivityCard(props: Props) {
  const [isCopied, copy] = useCopyToClipboard();
  if (props?.isLoading) {
    return <Skeleton className="h-16 rounded-lg border bg-secondary" />;
  }
  const { date, fee, signature, postBalance } = props;

  return (
    <div className="flex items-center justify-between gap-8 rounded-lg border bg-secondary p-2 transition-colors hover:border-primary">
      <div className="text-left">
        <p className="font-medium">Balance: {postBalance}</p>
        <button
          type="button"
          className="flex cursor-pointer items-center gap-2 text-sm text-muted-foreground"
          onClick={() => copy(signature)}
        >
          {signature.slice(0, 4)}...{signature.slice(-4)}{" "}
          {isCopied ? <Check size={16} /> : <Copy size={16} />}
        </button>
      </div>
      <div className="text-right">
        <p className="text-sm text-muted-foreground">{date.toLocaleString()}</p>
        <p className="font-medium">Fee: {fee}</p>
      </div>
    </div>
  );
}

export default ActivityCard;
