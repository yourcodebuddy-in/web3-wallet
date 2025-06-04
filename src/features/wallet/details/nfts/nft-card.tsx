import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Skeleton } from "@/components/ui/skeleton";

type Props = {
  isLoading?: boolean;
} & (
  | {
      name: string;
      image: string | undefined | null;
    }
  | { isLoading: true }
);

function NFTCard(props: Props) {
  if (props?.isLoading) {
    return <Skeleton className="aspect-square h-auto w-full rounded-lg border bg-secondary" />;
  }

  const { name, image } = props;

  return (
    <div className="rounded-lg border bg-secondary p-2 transition-colors hover:border-primary">
      <div className="flex flex-col gap-3">
        <Avatar className="aspect-square h-auto w-full rounded-lg border bg-white">
          <AvatarFallback className="rounded-none">?</AvatarFallback>
          <AvatarImage src={image!} />
        </Avatar>
        <h4 className="truncate text-sm font-semibold">{name}</h4>
      </div>
    </div>
  );
}

export default NFTCard;
