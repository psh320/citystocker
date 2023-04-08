export const algorithmList = [
  `const trader = new Trader();

// Define the parameters
let k_scale = 0.25; // The scale to decide the target price

// Initialize the variables
let yesterdayPrice = { 
  timestamp: 0, 
  openPrice: 0, 
  closePrice: 0, 
  lowPrice: 0, 
  highPrice: 0 
}; // The price quote for yesterday.
let targetBuyPrice: number; // The target price to buy.

trader.onTimeChange((market, timestamp) => {
  // check if yesterday's price is available
  if (yesterdayPrice.timestamp !== 0) {
    const todayPrice = market.getQuote(timestamp);
    // calculate the target price to buy
    targetBuyPrice =
      todayPrice.openPrice +
      (yesterdayPrice.highPrice - yesterdayPrice.lowPrice) * k_scale;
    // buy if the target price is lower than today's high price  
    if (targetBuyPrice <= todayPrice.highPrice && market.getCoin() === 0) {
      // buy all the coins with USD in the wallet
      market.buy(
        Math.trunc(market.getWallet() / targetBuyPrice),
        targetBuyPrice
      );
    }
  }
  // sell all the coins if there is any
  if (market.getCoin() > 0) {
    market.sell(market.getCoin());
  }
  // update the yesterday's price
  yesterdayPrice = market.getQuote(timestamp);
}, "1d"); // set the interval to 1 day

export default trader;`,
  `const trader = new Trader();

// Define the parameters
const period = 5; // The number of bars to calculate the moving average
const threshold = 0.05; // The percentage above or below the moving average to trigger a trade

// Initialize the variables
let ma = 0; // The moving average value
let sum = 0; // The sum of the prices for the moving average calculation
let position = 0; // The current position: 1 for long, -1 for short, 0 for none
let data: number[] = []
let i = 0;

// Loop through the price data
trader.onTimeChange((market, timestamp) => {
  // Get the current price
  const price = market.getQuote(timestamp);
  data.push(price.closePrice)
  // Update the sum and the moving average
  if (i >= period) {
    // Remove the oldest price from the sum
    sum -= data[i - period];
  }

  // Add the current price to the sum
  sum += price.closePrice;

  // Calculate the moving average
  ma = sum / Math.min(i + 1, period);

  // Check if there is a trading signal
  if (price.closePrice > ma * (1 + threshold)) {
    // Buy signal: go long or close short position
    if (position != 1) {
      market.buy(Math.trunc(market.getWallet() / price.closePrice))
      position = 1;
    }
  } else if (price.closePrice < ma * (1 - threshold)) {
    // Sell signal: go short or close long position 
    if (position != -1) {
      market.sell(market.getCoin())
      position = -1;
    }  
  } else {
    // No signal: do nothing  
  }
i += 1;
}, "1d"); // Change the time interval of your own depending on the Duration!
//Interval Types: ["1m", "3m", "5m", "15m", "30m", "1h", "1d", "1M"] 
//(m = minute, h = hour, d = day, M = month)


export default trader;`,
  `const trader = new Trader();

trader.onTimeChange((market, timestamp) => {
  //write your own trading algorithm here!

}, "1d"); // Change the time interval of your own depending on the Duration!
//Interval Types: ["1m", "3m", "5m", "15m", "30m", "1h", "1d", "1M"] 
//(m = minute, h = hour, d = day, M = month)

export default trader;`,
];
