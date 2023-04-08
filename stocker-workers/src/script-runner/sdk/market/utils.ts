import { IntervalType } from "./types";

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
