import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import WalletActivity from "./activity/wallet-activity";
import WalletNfts from "./nfts/wallet-nfts";
import WalletTokens from "./tokens/wallet-tokens";

function WalletTabs() {
  return (
    <section className="rounded-b-lg px-5 pb-5 sm:px-10 sm:pb-8">
      <div className="border-muted mt-5 w-full">
        <Tabs defaultValue="tokens">
          <TabsList>
            <TabsTrigger className="xs:text-base text-sm" value="tokens">
              Tokens
            </TabsTrigger>
            <TabsTrigger className="xs:text-base text-sm" value="nfts">
              NFTs
            </TabsTrigger>
            <TabsTrigger className="xs:text-base text-sm" value="activity">
              Activity
            </TabsTrigger>
          </TabsList>
          <TabsContent value="tokens">
            <WalletTokens />
          </TabsContent>
          <TabsContent value="nfts">
            <WalletNfts />
          </TabsContent>
          <TabsContent value="activity">
            <WalletActivity />
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
}

export default WalletTabs;
