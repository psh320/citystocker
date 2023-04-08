import { Box, Typography } from "@mui/material";
import { Transaction } from "./type";
import { convertTime } from "../../utils";

type Props = {
  transactionList?: Transaction[];
};

export const TransactionResult = ({ transactionList }: Props) => {
  if (transactionList?.length === 0) {
    return (
      <Box
        sx={{
          width: "100%",
          height: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Typography color="#AAAAAA">There are no Transactions</Typography>
      </Box>
    );
  }
  return (
    <Box>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
        }}
      >
        <Typography fontWeight={600} sx={{ flex: 0.2 }}>
          Type
        </Typography>
        <Typography fontWeight={600} sx={{ flex: 0.2 }}>
          Amount
        </Typography>
        <Typography fontWeight={600} sx={{ flex: 0.2 }}>
          Price
        </Typography>
        <Typography fontWeight={600} sx={{ flex: 0.2 }}>
          Time
        </Typography>
      </Box>
      {transactionList?.map((item, index) => {
        return (
          <Box
            key={index}
            sx={{
              display: "flex",
              alignItems: "center",
              paddingY: 1,
              borderBottom: "1px solid #DFDFDF",
            }}
          >
            <Typography
              color={item.action === "BUY" ? "#CF3049" : "#04A56D"}
              sx={{ flex: 0.2 }}
            >
              [{item.action}]
            </Typography>
            <Typography sx={{ flex: 0.2 }}>{item.unit} </Typography>
            <Typography sx={{ flex: 0.2 }}>
              {Number(item.price).toFixed(2)}
            </Typography>
            <Typography sx={{ flex: 0.2 }}>
              {convertTime(item.timestamp)}
            </Typography>
          </Box>
        );
      })}
    </Box>
  );
};
