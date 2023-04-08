import { Box, Typography } from "@mui/material";
import React, { FC, ReactNode } from "react";
import { useRouter } from "next/router";
import { Account } from "../../stocker-core/sdk/Types/Account";
import CoinProfit from "./CoinProfit";
import { parseCoinList } from "../../utils";

type AccountInfoProps = {
  children?: ReactNode;
  accountInfo: Account | null;
};

const ProfitInfo = ({ accountInfo }: AccountInfoProps) => {
  return (
    <Box
      sx={{
        paddingX: 2,
        paddingY: 2,
        width: "100%",
        marginY: 1,
        borderTop: "solid 1px #DFDFDF",
      }}
    >
      <Typography variant="h6" fontWeight={600}>
        Profit
      </Typography>
      {accountInfo &&
        (accountInfo.wallets.length === 1 ||
        parseCoinList(accountInfo.wallets).length === 0 ? (
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              minHeight: 100,
            }}
          >
            <Typography color={"#AAAAAA"}>
              You have no Coin in the wallet, Start the Trade in Trade Page!
            </Typography>
          </Box>
        ) : (
          accountInfo.wallets.map((item, index) => {
            if (index !== 0 && item.amount > 0) {
              return <CoinProfit walletInfo={item} key={index} />;
            }
          })
        ))}
    </Box>
  );
};

export default ProfitInfo;
