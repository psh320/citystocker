import { Box, Grid, Typography } from "@mui/material";
import React, { FC, ReactNode } from "react";
import TradeCoinCard from "../../components/Trade/TradeCoinCard";
import { coinList } from "../../constant/CoinData";
type TradeProps = {
  children?: ReactNode;
};

const Trade: FC<TradeProps> = () => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Grid
        container
        rowSpacing={1}
        columns={{ xs: 1, sm: 2 }}
        sx={{ display: "flex", justifyContent: "center" }}
      >
        {coinList.map((item, index) => {
          return (
            <Grid item xs={1} key={index}>
              <TradeCoinCard
                symbol={item.symbol}
                code={item.code}
                name={item.name}
              />
            </Grid>
          );
        })}
      </Grid>
    </Box>
  );
};

export default Trade;
