export interface Wallet {
  name: string;
  address: string;
  network: string;
}

export interface Token {
  name: string;
  amount: number;
  amountRaw: number;
  owner: string;
  mint: string;
  decimals: number;
  symbol: string;
  icon: string | null | undefined;
}

export interface WalletTokenBalance {
  tokens: Token[];
}

export interface NFT {
  name: string;
  image: string | null | undefined;
  acquiredAt: string | undefined;
  description: string | undefined;
}

export interface WalletNFTs {
  nfts: NFT[];
}

export interface TokenMetadata {
  name: string;
  symbol: string;
  icon: string | null | undefined;
  decimals: number;
}

export interface WalletActivity {
  date: Date;
  signature: string;
  fee: number;
  feeRaw: number;
  preBalance: number;
  postBalance: number;
}
