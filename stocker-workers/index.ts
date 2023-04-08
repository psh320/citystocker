import express from "express";
import morgan from "morgan";
import { getBinancePrice, getBinancePriceList } from "./src/binance/binance";
import env from "dotenv";
import cors from "cors";
import { runnerHandler } from "./src/script-runner/handlers/runnerHandler";

if (process.env.NODE_ENV == "PROD") {
  env.config({ path: "./prod.env" });
} else if (process.env.NODE_ENV == "DEV") {
  env.config({ path: "./.env" });
}

const app = express();
app.use(
  cors({
    origin: "*",
  })
);
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const PORT = process.env.HTTP_PORT;

app.get("/quote/crypto/:symbol", async (req, res) => {
  const symbol = req.params.symbol;
  const price = await getBinancePrice(symbol);
  if (price) {
    res.send(price);
    return;
  }
  res.send({ message: "No price found" });
});

app.get(
  "/pricelist/crypto/:symbol/:interval/:limit?/:startTime?/:endTime?",
  async (req, res) => {
    const symbol = req.params.symbol;
    const interval = req.params.interval;
    const limit = req.params.limit;
    const startTime = req.params.startTime;
    const endTime = req.params.endTime;
    const priceList = await getBinancePriceList(
      symbol,
      interval,
      startTime,
      endTime,
      limit
    );
    if (priceList) {
      res.send(priceList);
      return;
    }
    res.send({ message: "No price found" });
  }
);

app.post("/runner", runnerHandler);

app.listen(PORT, () => {
  console.log(`Server is listening: http://localhost:${PORT}`);
});
