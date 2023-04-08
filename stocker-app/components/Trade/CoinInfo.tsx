import { Box, Typography } from "@mui/material";
import React, { FC, ReactNode } from "react";
import Image from "next/image";
import { Wallet } from "../../stocker-core/sdk/Types/Account";
import { getCoinInfo } from "../../constant/CoinData";

type CoinInfoProps = {
  children?: ReactNode;
  symbol: any;
  wallet: Wallet;
  currentPrice: number;
};

/**
 * 함수 설명
 */
const CoinInfo = ({ symbol, wallet, currentPrice }: CoinInfoProps) => {
  //   const result = getCoinIcon(code);
  const calculatedProfit = wallet
    ? ((currentPrice - wallet.avgPrice) * wallet.amount).toFixed(2)
    : 0;

  const calculatedPercent = wallet
    ? wallet.avgPrice > 0
      ? (((currentPrice - wallet.avgPrice) / wallet.avgPrice) * 100).toFixed(2)
      : 0
    : 0;

  if (!wallet || wallet.amount === 0) {
    return (
      <Box
        sx={{
          width: "100%",
          borderRadius: 4,
          marginY: 1,
        }}
      >
        <Typography variant="h5" fontWeight={600} marginBottom={2}>
          {getCoinInfo(symbol)?.name}
        </Typography>
        <Typography color={"#AAAAAA"}>
          You have no Coin in the wallet, Buy the coin!
        </Typography>
      </Box>
    );
  }

  return (
    <Box
      sx={{
        width: "100%",
        borderRadius: 4,
        marginY: 1,
      }}
    >
      <Typography variant="h5" fontWeight={600} marginBottom={2}>
        {getCoinInfo(symbol)?.name}
      </Typography>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 2,
        }}
      >
        <Typography color="gray" fontWeight={400}>
          Avg Price per coin
        </Typography>
        <Typography fontWeight={500}>
          ${wallet ? Number(wallet.avgPrice).toFixed(2) : 0}
        </Typography>
      </Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 2,
        }}
      >
        <Typography color="gray" fontWeight={400}>
          Owned Coin
        </Typography>
        <Typography fontWeight={500}>
          {wallet ? wallet.amount : 0} coins
        </Typography>
      </Box>

      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 1,
        }}
      >
        <Typography color="gray" fontWeight={400}>
          Stock Profit
        </Typography>
        <Typography
          color={Number(calculatedProfit) < 0 ? "#CF3049" : "#04A56D"}
          fontWeight={500}
        >
          {Number(calculatedProfit) > 0 && "+"}
          {calculatedProfit} ({calculatedPercent}
          %)
        </Typography>
      </Box>
    </Box>
  );
};

export default CoinInfo;
