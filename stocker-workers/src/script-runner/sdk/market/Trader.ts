import { Market } from "./Market";
import { IntervalType } from "./types";

type TimeChangeHandler = (market: Market, timestamp: number) => void;

export class Trader {
  // Default
  timeChangeConfig: {
    handler: TimeChangeHandler;
    interval: IntervalType;
  } | null;

  constructor() {
    // Default(Must change)
    this.timeChangeConfig = null;
  }

  onTimeChange(handler: TimeChangeHandler, interval: IntervalType) {
    if (this.timeChangeConfig != null) {
      throw new Error("cannot call onTimeChange with null config.");
    }
    this.timeChangeConfig = {
      handler,
      interval,
    };
  }
}
