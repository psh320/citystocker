export type Price = {
  price: number;
  symbol: string;
  timestamp: number;
  currency: string;
};

export type Quote = {
  timestamp: number;
  openPrice: number;
  highPrice: number;
  lowPrice: number;
  closePrice: number;
};
