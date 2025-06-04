import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center py-10 leading-6">
      <p className="text-foreground/80 xs:pb-1 xs:text-[20px] font-bold">
        You don&apos;t have any assets yet!
      </p>
      <p className="text-muted-foreground xs:text-base mb-3 text-sm">
        Start by buying or depositing funds:
      </p>
      <Button size="lg" className="px-4 text-base">
        <Plus size={20} /> Add Funds
      </Button>
    </div>
  );
}

export default EmptyState;
