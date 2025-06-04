import { Networks, supportedNetworks } from "@/data/supported-networks";
import { Keypair } from "@solana/web3.js";
import { mnemonicToSeedSync } from "bip39";
import { derivePath } from "ed25519-hd-key";
import { HDNodeWallet, Wallet } from "ethers";
import nacl from "tweetnacl";

function getWalletAddressFromMnemonic(network: string, mnemonic: string, index: number = 1) {
  const networkData = supportedNetworks.find((n) => n.code === network);
  if (!networkData) return null;
  const seed = mnemonicToSeedSync(mnemonic);
  const derivationPath = `m/44'/${networkData.coinType}'/${index}'/0'`;
  const derivedSeed = derivePath(derivationPath, seed.toString("hex")).key;
  const secret = nacl.sign.keyPair.fromSeed(derivedSeed).secretKey;

  switch (network) {
    case Networks.solana: {
      return Keypair.fromSecretKey(secret).publicKey.toBase58();
    }
    case Networks.ethereum: {
      const hdNode = HDNodeWallet.fromSeed(seed);
      const child = hdNode.derivePath(derivationPath);
      const privateKey = child.privateKey;
      const wallet = new Wallet(privateKey);
      return wallet.address;
    }
  }
  return null;
}

export default getWalletAddressFromMnemonic;
