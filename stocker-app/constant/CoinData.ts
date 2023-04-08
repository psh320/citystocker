export const coinList = [
  { symbol: "BTCUSDT", code: "btc", name: "Bitcoin" },
  { symbol: "ETHUSDT", code: "eth", name: "Etherium" },
  { symbol: "XRPUSDT", code: "xrp", name: "Ripple" },
  { symbol: "SOLUSDT", code: "sol", name: "Solana" },
  { symbol: "BNBUSDT", code: "bnb", name: "Binancecoin" },
  { symbol: "LTCUSDT", code: "ltc", name: "Litecoin" },
  { symbol: "ADAUSDT", code: "ada", name: "Ada" },
  { symbol: "DOTUSDT", code: "dot", name: "Polkadot" },
  { symbol: "ENJUSDT", code: "enj", name: "Enjin" },
  { symbol: "MATICUSDT", code: "matic", name: "Polygon" },
];

type CoinInfo = {
  code: string;
  name: string;
};

export function getCoinInfo(symbol: string): CoinInfo | undefined {
  switch (symbol) {
    case "USD":
      return { code: "usd", name: "US Dollar" };
    case "BTCUSDT":
      return { code: "btc", name: "Bitcoin" };
    case "ETHUSDT":
      return { code: "eth", name: "Ethereum" };
    case "XRPUSDT":
      return { code: "xrp", name: "Ripple" };
    case "SOLUSDT":
      return { code: "sol", name: "Solana" };
    case "BNBUSDT":
      return { code: "bnb", name: "BinanceCoin" };
    case "LTCUSDT":
      return { code: "ltc", name: "Litecoin" };
    case "ADAUSDT":
      return { code: "ada", name: "Ada" };
    case "DOTUSDT":
      return { code: "dot", name: "Polkadot" };
    case "ENJUSDT":
      return { code: "enj", name: "Enjin" };
    case "MATICUSDT":
      return { code: "matic", name: "Polygon" };
    default:
      return undefined; // Symbol not found
  }
}
