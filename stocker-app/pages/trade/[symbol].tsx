import { Box, Button, Typography, withStyles } from "@mui/material";
import React, { FC, ReactNode, use, useEffect, useRef, useState } from "react";
import { useRouter } from "next/router";
import { getCoinInfo } from "../../constant/CoinData";
import Chart from "chart.js/auto";
import { Line } from "react-chartjs-2";
import { CategoryScale } from "chart.js";
import AccountInfo from "../../components/Trade/AccountInfo";
import CoinInfo from "../../components/Trade/CoinInfo";
import useAccount from "../../stocker-core/sdk/Account/useAccount";
import { db } from "../../utils/firebase";
import { recoilUserId } from "../../states";
import { useRecoilValue } from "recoil";
import { useQueries, useQuery } from "react-query";
import { getPriceList } from "../../api/binanceAPI";
import BuyCoin from "../../components/Trade/BuyCoin";
import SellCoin from "../../components/Trade/SellCoin";
import { Wallet } from "../../stocker-core/sdk/Types/Account";
import { parsePriceList, parseTimeList } from "../../utils";
import { LoadingIndicator } from "../../components/Common/LoadingIndicator";
Chart.register(CategoryScale);

type TradeSymbolProps = {
  children?: ReactNode;
};

const TradeSymbol: FC<TradeSymbolProps> = () => {
  const router = useRouter();
  const symbol = router.query.symbol;
  const listOfIntervals = ["15m", "1h", "8h", "1d", "3d"];
  const [price, setPrice] = useState(-1);
  const [interval, setInterval] = useState("15m");
  const userId = useRecoilValue(recoilUserId);
  const accountInfo = useAccount(db, userId);
  const [openBuy, setOpenBuy] = useState(false);
  const [openSell, setOpenSell] = useState(false);
  const [indexOfWallet, setIndexOfWallet] = useState(-1);
  const ws = useRef<WebSocket | null>(null);

  useQueries(
    listOfIntervals.map((item) => {
      return {
        queryKey: ["priceList", symbol, item],
        queryFn: () => getPriceList(symbol as string, item),
      };
    })
  );

  const priceListData = useQuery(["priceList", symbol, interval], () =>
    getPriceList(symbol as string, interval)
  );

  let options = {
    elements: {
      point: {
        radius: 1.5,
      },
    },
    plugins: {
      legend: {
        display: false,
      },
    },
    scales: {
      x: { grid: { display: false, drawTicks: false }, display: false },
      y: { grid: { display: false }, display: false },
    },
  };

  useEffect(() => {
    if (typeof symbol !== "string") return;

    if (ws.current) {
      ws.current.close();
    }

    ws.current = new WebSocket(
      `wss://stream.binance.com:9443/ws/${symbol.toLowerCase()}@trade`
    );

    ws.current.onmessage = (event) => {
      const stockObject = JSON.parse(event.data);
      setPrice(stockObject.p);
    };

    return () => {
      if (ws.current?.readyState === 1) {
        ws.current.close();
      }
    };
  }, [symbol]);

  useEffect(() => {
    if (accountInfo.account) {
      const checkWalletIndex = accountInfo.account.wallets.findIndex(
        (item) => item.symbol === symbol
      );
      setIndexOfWallet(checkWalletIndex);
    }
  }, [accountInfo.account]);

  if (priceListData.isLoading || accountInfo.loading || price < 0) {
    return <LoadingIndicator />;
  }

  const data = {
    labels: parseTimeList(priceListData.data).concat("now"),
    datasets: [
      {
        data: parsePriceList(priceListData.data).concat(price),
      },
    ],
  };

  let priceDifference = price - priceListData.data[0].closePrice;
  let pricePercentage = Math.round(
    ((price - priceListData.data[0].closePrice) / price) * 100
  ).toFixed(2);

  return (
    <Box>
      <Box sx={{ marginTop: 3 }}>
        <Typography variant="h4" fontWeight={800}>
          {getCoinInfo(symbol as string)?.name}
        </Typography>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
          }}
        >
          <Typography variant="h6" fontWeight={600} sx={{ marginRight: 1 }}>
            {Number(price).toFixed(2)}
          </Typography>
          <Typography
            variant="h6"
            fontWeight={400}
            color={
              price - priceListData.data[0].closePrice < 0
                ? "#CF3049"
                : "#04A56D"
            }
          >
            {price - priceListData.data[0].closePrice < 0 ? "" : "+"}
            {priceDifference.toFixed(2)}
            {"  "}({pricePercentage}
            %)
          </Typography>
        </Box>
      </Box>

      <Box
        sx={{
          maxHeight: {
            xs: 500 * 0.6,
            sm: 600,
          },
        }}
      >
        <Line data={data} options={options} />
        <Box sx={{ display: "flex", justifyContent: "center", marginY: 2 }}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-around",
              alignItems: "center",
              width: 300,
            }}
          >
            <Button
              variant={interval === "15m" ? "contained" : "outlined"}
              size="small"
              sx={{ padding: 0, minWidth: 40 }}
              onClick={() => {
                setInterval("15m");
              }}
            >
              1d
            </Button>
            <Button
              variant={interval === "1h" ? "contained" : "outlined"}
              size="small"
              sx={{ padding: 0, minWidth: 40 }}
              onClick={() => {
                setInterval("1h");
              }}
            >
              5d
            </Button>
            <Button
              variant={interval === "8h" ? "contained" : "outlined"}
              size="small"
              sx={{ padding: 0, minWidth: 40 }}
              onClick={() => {
                setInterval("8h");
              }}
            >
              1m
            </Button>
            <Button
              variant={interval === "1d" ? "contained" : "outlined"}
              size="small"
              sx={{ padding: 0, minWidth: 40 }}
              onClick={() => {
                setInterval("1d");
              }}
            >
              6m
            </Button>
            <Button
              variant={interval === "3d" ? "contained" : "outlined"}
              size="small"
              sx={{ padding: 0, minWidth: 40 }}
              onClick={() => {
                setInterval("3d");
              }}
            >
              1y
            </Button>
          </Box>
        </Box>
      </Box>

      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          width: "100%",
          justifyContent: "center",
          alignItems: "center",
          border: "solid 1px #DFDFDF",
          padding: 2,
          borderRadius: 2,
        }}
      >
        <AccountInfo accountInfo={accountInfo.account} />
        <CoinInfo
          symbol={symbol}
          wallet={accountInfo.account?.wallets[indexOfWallet] as Wallet}
          currentPrice={price}
        />
        <Box maxWidth={300} sx={{ marginY: 2 }}>
          <Button
            variant="outlined"
            size="large"
            sx={{
              width: 130,
              marginRight: 1,
            }}
            onClick={() => {
              setOpenBuy(true);
            }}
          >
            buy
          </Button>
          <Button
            onClick={() => {
              setOpenSell(true);
            }}
            variant="outlined"
            size="large"
            sx={{ width: 130 }}
            color="error"
          >
            sell
          </Button>
        </Box>
      </Box>
      <BuyCoin
        price={price}
        open={openBuy}
        setOpen={setOpenBuy}
        title={symbol as string}
        pricePercentage={pricePercentage}
        priceDifference={priceDifference}
        availableSaving={accountInfo.account?.wallets[0].amount as number}
      />
      <SellCoin
        price={price}
        open={openSell}
        setOpen={setOpenSell}
        title={symbol as string}
        pricePercentage={pricePercentage}
        priceDifference={priceDifference}
        availableCoin={
          accountInfo.account?.wallets[indexOfWallet]?.amount as number
        }
      />
    </Box>
  );
};

export default TradeSymbol;
