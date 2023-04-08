const trader = Market.createTestTrader();

trader.onTimeChange((quote, timestamp) => {
  trader.buy(1);
}, 100);
