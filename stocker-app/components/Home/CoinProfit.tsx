import { Box, Typography } from "@mui/material";
import React, { FC, ReactNode } from "react";
import { useRouter } from "next/router";
import { Wallet } from "../../stocker-core/sdk/Types/Account";
import { useQuery } from "react-query";
import { getPrice } from "../../api/binanceAPI";
import Image from "next/image";
import { getCoinInfo } from "../../constant/CoinData";

type WalletInfoProps = {
  children?: ReactNode;
  walletInfo: Wallet;
};

/**
 */
const CoinProfit = ({ walletInfo }: WalletInfoProps) => {
  const priceData = useQuery(["price", walletInfo.symbol], () =>
    getPrice(walletInfo.symbol)
  );

  const calculateProfit = (currentPrice: number | undefined) => {
    if (!currentPrice) {
      return 0;
    }
    const totalBoughtPrice = walletInfo.amount * walletInfo.avgPrice;
    const evaluatedPrice = walletInfo.amount * currentPrice;
    return evaluatedPrice - totalBoughtPrice;
  };

  const calculateProfitPercentage = (currentPrice: number | undefined) => {
    if (!currentPrice) {
      return 0;
    }
    const totalBoughtPrice = walletInfo.amount * walletInfo.avgPrice;
    const evaluatedPrice = walletInfo.amount * currentPrice;
    return ((evaluatedPrice - totalBoughtPrice) / evaluatedPrice) * 100;
  };
  //   const result = getCoinIcon(code);
  const router = useRouter();
  if (priceData.isLoading || priceData.isError) {
    return <Typography>Loading Profit...</Typography>;
  }

  if (priceData.isError) {
    return <Typography>Profit Error</Typography>;
  }
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 1,
      }}
    >
      <Box sx={{ flexDirection: "row", display: "flex", alignItems: "center" }}>
        <Image
          alt="coinlogo"
          src={`../../coinIcons/${getCoinInfo(walletInfo.symbol)?.code}.svg`}
          width={40}
          height={40}
          style={{ marginRight: 16 }}
        />
        <Box>
          <Typography fontSize={18} fontWeight="400" color={"#000000"}>
            {getCoinInfo(walletInfo.symbol)?.name}
          </Typography>
          <Typography
            fontSize={16}
            lineHeight={1}
            color={"gray"}
            fontWeight="400"
          >
            {walletInfo.amount} coin(s)
          </Typography>
        </Box>
      </Box>

      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-end",
          justifyContent: "center",
        }}
      >
        <Typography fontSize={18} fontWeight={600} color={"#111111"}>
          ${(walletInfo.amount * walletInfo.avgPrice).toFixed(2)}
        </Typography>
        <Typography
          fontSize={16}
          fontWeight={400}
          color={
            calculateProfit(priceData.data?.price) < 0 ? "#CF3049" : "#04A56D"
          }
        >
          {calculateProfit(priceData.data?.price) > 0 ? "+" : "-"}$
          {calculateProfit(priceData.data?.price).toFixed(2)} (
          {calculateProfitPercentage(priceData.data?.price).toFixed(2)}%)
        </Typography>
      </Box>
    </Box>
  );
};

export default CoinProfit;
