import { Button } from "@/components/ui/button";
import Image from "next/image";

interface Props {
  name: string;
  icon: string;
  code: string;
  onSelect: (coinType: string) => void;
}

function NetworkCard({ name, icon, code, onSelect }: Props) {
  function handleClick() {
    onSelect(code);
  }

  return (
    <Button
      type="button"
      variant="secondary"
      size="lg"
      className="h-14 w-full justify-start rounded-lg border px-4 hover:border-primary xs:h-16"
      onClick={handleClick}
    >
      <Image className="size-7 xs:size-10" width={100} height={100} src={icon} alt={name} />
      <h3 className="mb-1 text-base font-semibold text-secondary-foreground xs:text-lg">{name}</h3>
    </Button>
  );
}

export default NetworkCard;
