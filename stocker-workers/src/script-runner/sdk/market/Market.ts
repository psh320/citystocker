import axios from "axios";
import {
  Account,
  Quote,
  Transaction,
  TransactionResponse,
} from "../market/types";
import { Trader } from "./Trader";
import { IntervalType, MarketConfig } from "./types";
import { convertIntervalToMili } from "./utils";

export async function getQuotesFromAPI(
  config: MarketConfig,
  interval: IntervalType
): Promise<Quote[]> {
  const response = await axios.get(
    `http://localhost:8080/pricelist/crypto/${
      config.symbol
    }/${interval}/${1000}/${String(config.startTime)}/${String(config.endTime)}`
  );
  let quotes: Quote[] = [];
  try {
    quotes = response.data.map((price: Quote, i: number) => ({
      timestamp: config.startTime + i * convertIntervalToMili(interval),
      openPrice: price.openPrice,
      closePrice: price.closePrice,
      highPrice: price.highPrice,
      lowPrice: price.lowPrice,
    }));
  } catch (err) {
    console.log(err);
  }
  return quotes;
}

export class Market {
  timestamp: number;
  history: Transaction[];
  private config: MarketConfig;
  private wallet: number;
  private coin: number;
  private prices: Quote[];

  // constructor(config: MarketConfig, prices: Price[]) {
  constructor(config: MarketConfig, prices: Quote[]) {
    this.config = config;
    this.wallet = this.config.budget;
    this.coin = 0;
    this.timestamp = this.config.startTime;
    this.history = [];
    this.prices = prices;
  }

  getQuote(timestamp: number): Quote {
    const quoteByTimestamp = this.prices.find(
      (item) => item.timestamp === timestamp
    );
    if (quoteByTimestamp) {
      return quoteByTimestamp;
    } else {
      throw Error("Timestamp or Interval is invalid!");
    }
  }
  getWallet(): number {
    return this.wallet;
  }
  getCoin(): number {
    return this.coin;
  }
  getConfig(): MarketConfig {
    return this.config;
  }

  private addTransaction(transaction: Transaction) {
    this.history.push(transaction);
  }

  buy(unit: number, price?: number): TransactionResponse {
    if (unit === 0) {
      return {
        transaction: null,
        error: new Error(`cannot buy 0 unit`),
      };
    }
    if (
      price &&
      price < this.getQuote(this.timestamp).lowPrice &&
      price > this.getQuote(this.timestamp).highPrice
    ) {
      return {
        transaction: null,
        error: new Error(`invalid buy price`),
      };
    }
    const buyPrice = price ? price : this.getQuote(this.timestamp).closePrice;
    const total = unit * buyPrice;
    if (this.wallet < total) {
      return {
        transaction: null,
        error: new Error(`cannot buy more that the budget.`),
      };
    }

    const tx: Transaction = {
      action: "BUY",
      unit,
      price: buyPrice,
      timestamp: this.timestamp,
    };
    this.coin += unit;
    this.wallet -= total;
    this.addTransaction(tx);
    return {
      transaction: tx,
      error: null,
    };
  }

  sell(unit: number, price?: number): TransactionResponse {
    if (unit === 0) {
      return {
        transaction: null,
        error: new Error(`cannot sell 0 unit`),
      };
    }
    if (
      price &&
      price < this.getQuote(this.timestamp).lowPrice &&
      price > this.getQuote(this.timestamp).highPrice
    ) {
      return {
        transaction: null,
        error: new Error(`invalid buy price`),
      };
    }
    const sellPrice = price ? price : this.getQuote(this.timestamp).closePrice;
    if (this.coin < unit) {
      return {
        transaction: null,
        error: new Error(`cannot sell more than the number of coin we have.`),
      };
    }

    const tx: Transaction = {
      action: "SELL",
      unit,
      price: sellPrice,
      timestamp: this.timestamp,
    };
    this.coin -= unit;
    this.wallet += unit * sellPrice;
    this.addTransaction(tx);
    return {
      transaction: tx,
      error: null,
    };
  }
}

export async function trade(
  trader: Trader,
  config: MarketConfig
): Promise<[Transaction[], Account]> {
  if (trader.timeChangeConfig == null) {
    throw new Error(`onTimeChange has never been called by the trader.`);
  }

  const prices = await getQuotesFromAPI(
    config,
    trader.timeChangeConfig.interval
  );

  const market = new Market(config, prices);

  for (let i = 0; i < prices.length; i++) {
    market.timestamp = prices[i].timestamp;
    trader.timeChangeConfig.handler(market, prices[i].timestamp);
  }

  const status: Account = {
    wallet: market.getWallet(),
    coin: market.getCoin(),
    total:
      market.getWallet() +
      market.getCoin() * prices[prices.length - 1].closePrice,
  };

  return [market.history, status];
}
