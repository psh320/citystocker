export type BinanceQuoteResponse = {
  symbol: string;
  price: number;
};

export type BinancePriceListResponse = [
  number,
  string,
  string,
  string,
  string,
  string,
  number,
  string,
  number,
  string,
  string,
  string
][];
