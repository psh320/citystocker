import { Account } from "../Types/Account";

export function newAccount(userID: string): Account {
  return {
    userID: userID,
    wallets: [
      {
        symbol: "USD",
        amount: 1000,
        avgPrice: 0,
      },
    ],
  };
}
