export const lib = `declare class Market {
  private timestamp: number;
  private history: Transaction[];
  private config: MarketConfig;
  private wallet: number;
  private coin: number;
  private prices: Quote[];

  getQuote(timestamp: number): Quote;
  getWallet(): number;
  getCoin(): number;
  getConfig(): MarketConfig;
  private addTransaction(transaction: Transaction): void;
  buy(unit: number, price?: number): TransactionResponse;
  sell(unit: number, price?: number): TransactionResponse;
}

declare class Trader {
  timeChangeConfig: {
    handler: TimeChangeHandler;
    interval: IntervalType;
  } | null;
  onTimeChange(handler: TimeChangeHandler, interval: IntervalType): void;
}

type TimeChangeHandler = (market: Market, timestamp: number) => void;

type MarketConfig = {
  budget: number;
  startTime: number;
  endTime: number;
  symbol: string;
};
type IntervalType = "1m" | "3m" | "5m" | "15m" | "30m" | "1h" | "1d" | "1M";

type Quote = {
  timestamp: number;
  openPrice: number;
  highPrice: number;
  lowPrice: number;
  closePrice: number;
};

type Account = {
  wallet: number;
  coin: number;
  total: number;
};

type TransactionResponse = {
  transaction: Transaction | null;
  error: Error | null;
};

type Transaction = {
  action: TransactionAction;
  price: number;
  unit: number;
  timestamp: number;
};

type TransactionAction = "BUY" | "SELL";`;

export declare class Market {
  private timestamp: number;
  private history: Transaction[];
  private config: MarketConfig;
  private wallet: number;
  private coin: number;
  private prices: Quote[];

  getQuote(timestamp: number): Quote;
  getWallet(): number;
  getCoin(): number;
  getConfig(): MarketConfig;
  private addTransaction(transaction: Transaction): void;
  buy(unit: number, price?: number): TransactionResponse;
  sell(unit: number, price?: number): TransactionResponse;
}

export declare class Trader {
  timeChangeConfig: {
    handler: TimeChangeHandler;
    interval: IntervalType;
  } | null;
  onTimeChange(handler: TimeChangeHandler, interval: IntervalType): void;
}

export type TimeChangeHandler = (market: Market, timestamp: number) => void;

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
  wallet: number;
  coin: number;
  total: number;
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

export type TradeResult = {
  account: Account;
  transactions: Transaction[];
  logs: string[];
  errors: string[];
};

export type TransactionAction = "BUY" | "SELL";
