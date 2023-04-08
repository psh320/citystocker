import moment from "moment";
import { IntervalType, Quote } from "../components/Auto/type";
import { Wallet } from "../stocker-core/sdk/Types/Account";

export const parsePriceList = (data: Quote[]): number[] => {
  const parsedPriceArray: number[] = [];
  data.forEach((item) => {
    parsedPriceArray.push(item.closePrice);
  });

  return parsedPriceArray;
};

export const parseTimeList = (data: Quote[]): string[] => {
  const parsedTimeArray: string[] = [];
  data.forEach((item) => {
    parsedTimeArray.push(convertTime(item.timestamp));
  });

  return parsedTimeArray;
};

export function convertTime(timestamp: number) {
  const date = new Date(timestamp);
  return moment(date).format("DD/MM/YYYY hh:mm:ss");
}

export const parseCoinList = (wallets: Wallet[]): Wallet[] => {
  const resultList = wallets.filter((wallet) => wallet.amount > 0);
  return resultList;
};

export const compare = (a: any, b: any) => {
  if (a.timestamp > b.timestamp) {
    return -1;
  }
  if (a.timestamp < b.timestamp) {
    return 1;
  }
  return 0;
};

export const INTERVAL: IntervalType[] = [
  "1m",
  "3m",
  "5m",
  "15m",
  "30m",
  "1h",
  "1d",
  "1M",
];

export function convertIntervalToMili(interval: IntervalType): number {
  switch (interval) {
    case "1m": {
      return 1000 * 60;
    }
    case "3m": {
      return 1000 * 60 * 3;
    }
    case "5m": {
      return 1000 * 60 * 5;
    }
    case "15m": {
      return 1000 * 60 * 15;
    }
    case "30m": {
      return 1000 * 60 * 30;
    }
    case "1h": {
      return 1000 * 60 * 60;
    }
    case "1d": {
      return 1000 * 60 * 60 * 24;
    }
    case "1M": {
      return 1000 * 60 * 60 * 24 * 30;
    }
    default: {
      return 0;
    }
  }
}
