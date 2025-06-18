import { ArrowDownToLine, PlusCircle, Repeat, Send } from "lucide-react";
import SpecialButton from "../special-button";

function WalletOptions() {
  return (
    <div className="visible grid w-full grid-cols-4 items-start justify-between overflow-hidden xs:items-center xs:gap-2">
      <SpecialButton className="cursor-not-allowed" title="Send" mobileTitle="Send/Pay" icon={<Send />} />
      <SpecialButton className="cursor-not-allowed" variant="secondary" title="Add Funds" icon={<PlusCircle />} />
      <SpecialButton className="cursor-not-allowed" variant="secondary" title="Withdraw" icon={<ArrowDownToLine />} />
      <SpecialButton className="cursor-not-allowed" variant="secondary" title="Swap" icon={<Repeat />} />
    </div>
  );
}

export default WalletOptions;
