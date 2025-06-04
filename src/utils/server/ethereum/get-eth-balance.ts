import { ethereumConnection } from "../rpc";

export async function getEthBalance(address: string) {
  const balance = await ethereumConnection.getBalance(address);
  return balance;
}
