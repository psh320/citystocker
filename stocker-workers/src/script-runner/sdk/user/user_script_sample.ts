import { Trader } from "../market/Trader";

const trader = new Trader();

trader.onTimeChange((market, timestamp) => {
  if (Math.random() > 0.5) {
    const { transaction, error } = market.buy(10);
    if (error) console.log(error.message);
  }
}, "1d");

export default trader;
