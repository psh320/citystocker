export type Account = {
  wallets: Wallet[];
  userID: string;
};

export type Wallet = {
  symbol: string;
  amount: number;
  avgPrice: number;
};
