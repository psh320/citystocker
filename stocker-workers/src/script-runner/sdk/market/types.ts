export type MarketConfig = {
  budget: number;
  startTime: number;
  endTime: number;
  symbol: string;
};
export type IntervalType =
  | "1m"
  | "3m"
  | "5m"
  | "15m"
  | "30m"
  | "1h"
  | "1d"
  | "1M";

export type Quote = {
  timestamp: number;
  openPrice: number;
  highPrice: number;
  lowPrice: number;
  closePrice: number;
};

export type Account = {
  wallet: number; // USD
  coin: number; // BTC, ETH, etc...
  total: number; // Total USD
};

export type TransactionResponse = {
  transaction: Transaction | null;
  error: Error | null;
};

export type Transaction = {
  action: TransactionAction;
  price: number;
  unit: number;
  timestamp: number;
};

export type TransactionAction = "BUY" | "SELL";
export type TransactionResult = "SUCCESS" | "FAIL";

export type TradeResult = {
  account: Account;
  transactions: Transaction[];
  logs: string[];
  errors: string[];
};
