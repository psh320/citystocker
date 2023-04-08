import axios from "axios";
import { Price, Quote } from "../types";
import { BinancePriceListResponse, BinanceQuoteResponse } from "./binanceTypes";

export function createBinanceQuoteURL(symbol: string): string {
  return `https://api.binance.com/api/v3/ticker/price?symbol=${symbol}`;
}

export async function fetchBinanceQuote(
  symbol: string
): Promise<BinanceQuoteResponse | undefined> {
  try {
    const res = await axios.get(createBinanceQuoteURL(symbol));
    return res.data as BinanceQuoteResponse;
  } catch (err) {
    console.error(`Error has occured while fetching. ${err}`);
    return undefined;
  }
}

export function parseBinancePrice(
  quote: BinanceQuoteResponse,
  symbol: string
): Price {
  return {
    price: quote.price,
    symbol: symbol,
    timestamp: new Date().getTime(),
    currency: symbol,
  };
}

export async function getBinancePrice(
  symbol: string
): Promise<Price | undefined> {
  const quote = await fetchBinanceQuote(symbol);
  if (quote) {
    const price = parseBinancePrice(quote, symbol);
    return price;
  }
  return undefined;
}

export function createBinancePriceListURL(
  symbol: string,
  interval: string,
  startTime?: string,
  endTime?: string,
  limit?: string
): string {
  const checkLimit = limit ? limit : "1000";

  if (startTime && endTime) {
    return `https://api.binance.com/api/v3/klines?symbol=${symbol}&interval=${interval}&limit=${checkLimit}&startTime=${startTime}&endTime=${endTime}`;
  } else {
    return `https://api.binance.com/api/v3/klines?symbol=${symbol}&interval=${interval}&limit=${checkLimit}`;
  }
}

export async function fetchBinancePriceList(
  symbol: string,
  interval: string,
  startTime?: string,
  endTime?: string,
  limit?: string
): Promise<BinancePriceListResponse | undefined> {
  try {
    const res = await axios.get(
      createBinancePriceListURL(symbol, interval, startTime, endTime, limit)
    );
    return res.data as BinancePriceListResponse;
  } catch (err) {
    console.error(`Error has occured while fetching. ${err}`);
    return undefined;
  }
}

export function parseBinancePriceList(
  priceList: BinancePriceListResponse
): Quote[] {
  const resultData: Quote[] = [];
  priceList.forEach((price) => {
    resultData.push({
      timestamp: price[0],
      openPrice: parseFloat(price[1]),
      highPrice: parseFloat(price[2]),
      lowPrice: parseFloat(price[3]),
      closePrice: parseFloat(price[4]),
    });
  });

  return resultData;
}

export async function getBinancePriceList(
  symbol: string,
  interval: string,
  startTime?: string,
  endTime?: string,
  limit?: string
): Promise<Quote[] | undefined> {
  const priceList = await fetchBinancePriceList(
    symbol,
    interval,
    startTime,
    endTime,
    limit
  );
  if (priceList) {
    const price = parseBinancePriceList(priceList);
    return price;
  }
  return undefined;
}
