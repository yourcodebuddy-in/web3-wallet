import { ScrollArea } from "@/components/ui/scroll-area";
import EmptyState from "./empty-state";
import useWalletNFTs from "./hooks/use-wallet-nfts";
import NFTCard from "./nft-card";

function WalletNfts() {
  const { data, isLoading } = useWalletNFTs();
  return (
    <div className="pt-3">
      <ScrollArea className="h-screen max-h-[35vh]">
        <div className="grid grid-cols-2 gap-3 md:grid-cols-3">
          {isLoading
            ? [...Array(6).keys()].map((value) => <NFTCard key={value} isLoading />)
            : data?.nfts?.map((nft) => <NFTCard key={nft.image} name={nft.name} image={nft.image} />)}
        </div>
        {!isLoading && !data?.nfts?.[0] && <EmptyState />}
      </ScrollArea>
    </div>
  );
}

export default WalletNfts;
