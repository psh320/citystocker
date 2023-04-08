import { Account } from "../Types/Account";

export function getAccountTotal(account: Account): number {
  let total = 0;
  account.wallets.forEach((wallet, index) => {
    index === 0
      ? (total += wallet.amount)
      : (total += wallet.amount * wallet.avgPrice);
  });

  return total;
}
