import { MarketConfig } from "../sdk/market/types";

export function stringifyArguments(marketConfig: MarketConfig): string {
  const { budget, startTime, endTime, symbol } = marketConfig;
  return symbol + " " + budget + " " + startTime + " " + endTime;
}

export function parseArguments(args: string[]): MarketConfig {
  return {
    symbol: args[2],
    budget: parseInt(args[3]),
    startTime: parseInt(args[4]),
    endTime: parseInt(args[5]),
  };
}
