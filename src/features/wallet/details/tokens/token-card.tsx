import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Skeleton } from "@/components/ui/skeleton";

type Props = {
  isLoading?: boolean;
} & (
  | {
      name: string;
      symbol: string;
      icon: string | undefined | null;
      amount: number;
    }
  | { isLoading: true }
);

function TokenCard(props: Props) {
  if (props?.isLoading) {
    return <Skeleton className="bg-secondary h-16 rounded-lg border" />;
  }

  const { name, symbol, icon, amount } = props;

  return (
    <div className="bg-secondary hover:border-primary flex items-center justify-between gap-8 rounded-lg border p-2 transition-colors">
      <div className="flex items-center gap-3">
        <Avatar className="bg-background border-2">
          <AvatarFallback>{symbol[0]}</AvatarFallback>
          <AvatarImage src={icon!} />
        </Avatar>
        <h4 className="text-lg font-semibold">{name}</h4>
      </div>
      <p className="truncate">
        {amount} {symbol}
      </p>
    </div>
  );
}

export default TokenCard;
