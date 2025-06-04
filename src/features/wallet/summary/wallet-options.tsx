import { ArrowDownToLine, PlusCircle, Repeat, Send } from "lucide-react";
import SpecialButton from "../special-button";

function WalletOptions() {
  return (
    <div className="visible mt-5 grid w-full grid-cols-4 items-start justify-between overflow-hidden xs:mt-6 xs:items-center xs:gap-2">
      <SpecialButton title="Send" mobileTitle="Send/Pay" icon={<Send />} onClick={() => {}} />
      <SpecialButton
        variant="secondary"
        title="Add Funds"
        icon={<PlusCircle />}
        onClick={() => {}}
      />
      <SpecialButton
        variant="secondary"
        title="Withdraw"
        icon={<ArrowDownToLine />}
        onClick={() => {}}
      />
      <SpecialButton variant="secondary" title="Swap" icon={<Repeat />} onClick={() => {}} />
    </div>
  );
}

export default WalletOptions;
