import { Quote } from "./trade";

export type TimeInterval = "1s" | "5s" | "10s" | "30s" | "1m";

export function getIntervalMs(interval: TimeInterval) {
  switch (interval) {
    case "1s":
      return 1000;
    case "5s":
      return 5 * 1000;
    case "10s":
      return 10 * 1000;
    case "30s":
      return 30 * 1000;
    case "1m":
      return 60 * 1000;
  }
}

export function getQuotes(
  symbol: string,
  startTime: number,
  endTime: number,
  interval: TimeInterval
): Quote[] {
  const quotes: Quote[] = [];
  const startingPrice = Math.random() * 100;
  const timeInterval = getIntervalMs(interval);

  for (let current = startTime; current <= endTime; current += timeInterval) {
    if (quotes.length == 0) {
      quotes.push({
        price: startingPrice,
        timestamp: current,
      });
    } else {
      const change = Math.random() * 3;
      quotes.push({
        price: quotes[quotes.length - 1].price + change,
        timestamp: current,
      });
    }
  }
  return quotes;
}
