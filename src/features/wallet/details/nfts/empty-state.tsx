import NFTEmptyImg from "@/public/images/nft-empty.webp";
import Image from "next/image";

function EmptyState() {
  return (
    <div className="relative mt-5 flex w-full items-center justify-center">
      <h3 className="margin-auto absolute bottom-0 left-0 right-0 top-0 z-10 flex h-full w-full items-center justify-center text-muted-foreground">
        You don&apos;t have any NFTs.
      </h3>
      <div className="relative aspect-square h-auto w-full max-w-32">
        <Image
          className="absolute inset-0 size-full dark:opacity-10"
          src={NFTEmptyImg}
          alt="Empty nft wallet"
        />
      </div>
    </div>
  );
}

export default EmptyState;
