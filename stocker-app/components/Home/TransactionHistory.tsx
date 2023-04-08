import { Box, Typography } from "@mui/material";
import React, { ReactNode } from "react";
import { useRouter } from "next/router";
import { Account } from "../../stocker-core/sdk/Types/Account";
import Image from "next/image";
import useTransaction from "../../stocker-core/sdk/Transaction/useTransaction";
import { useRecoilValue } from "recoil";
import { recoilUserId } from "../../states";
import { db } from "../../utils/firebase";
import { compare, convertTime } from "../../utils";
import { LoadingIndicator } from "../Common/LoadingIndicator";
import { getCoinInfo } from "../../constant/CoinData";

export const TransactionHistory = () => {
  const userId = useRecoilValue(recoilUserId);
  const transactionInfo = useTransaction(db, userId);

  const router = useRouter();

  if (transactionInfo.loading) {
    return <LoadingIndicator />;
  }
  if (transactionInfo.error) {
    return <div>error...</div>;
  }

  return (
    <Box sx={{ width: "100%" }}>
      <Typography variant="h4" fontWeight={600} marginY={4}>
        Transaction History
      </Typography>
      <Box
        sx={{
          padding: 2,
          width: "100%",
          border: "solid 1px #DFDFDF",
          borderRadius: 2,
          minHeight: 200,
          maxHeight: 500,
          overflow: "auto",
        }}
      >
        {transactionInfo &&
          transactionInfo.transaction?.transactions
            .sort(compare)
            .map((item, index) => {
              if (item.type === "ADD") {
                return (
                  <Box
                    key={index}
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      paddingY: 1,
                      borderBottom: "1px solid #DFDFDF",
                    }}
                  >
                    <Box
                      sx={{
                        flexDirection: "row",
                        display: "flex",
                        alignItems: "center",
                      }}
                    >
                      <Typography fontSize={16} marginRight={1}>
                        {convertTime(item.timestamp).slice(0, 5)}
                      </Typography>
                      <Typography
                        fontSize={32}
                        width={40}
                        height={40}
                        fontWeight="700"
                        alignItems={"center"}
                        justifyContent={"center"}
                        display={"flex"}
                        style={{ marginRight: 16 }}
                        color={"#04A56D"}
                      >
                        $
                      </Typography>
                      <Box>
                        <Typography
                          fontSize={18}
                          fontWeight="400"
                          color={"#000000"}
                        >
                          {getCoinInfo(item.symbol)?.name}
                        </Typography>

                        <Typography
                          fontSize={16}
                          color={"#04A56D"}
                          fontWeight="500"
                        >
                          {item.type}
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
                      <Typography
                        fontSize={18}
                        fontWeight={600}
                        color={"#111111"}
                      >
                        ${Number(item.price).toFixed(2)}
                      </Typography>
                    </Box>
                  </Box>
                );
              } else {
                return (
                  <Box
                    key={index}
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      paddingY: 1,
                      borderBottom: "1px solid #DFDFDF",
                    }}
                  >
                    <Box
                      sx={{
                        flexDirection: "row",
                        display: "flex",
                        alignItems: "center",
                      }}
                    >
                      <Typography fontSize={16} marginRight={1}>
                        {convertTime(item.timestamp).slice(0, 5)}
                      </Typography>
                      <Image
                        alt="coinlogo"
                        src={`../../coinIcons/${
                          getCoinInfo(item.symbol)?.code
                        }.svg`}
                        width={40}
                        height={40}
                        style={{ marginRight: 16 }}
                      />
                      <Box>
                        <Typography
                          fontSize={18}
                          fontWeight="400"
                          color={"#000000"}
                        >
                          {getCoinInfo(item.symbol)?.name}
                        </Typography>

                        <Typography
                          fontSize={16}
                          color={item.type === "BUY" ? "#1B76D2" : "#CF3049"}
                          fontWeight="500"
                        >
                          {item.type}
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
                      <Typography
                        fontSize={18}
                        fontWeight={600}
                        color={"#111111"}
                      >
                        ${(item.amount * item.price).toFixed(2)}
                      </Typography>
                      <Typography
                        fontSize={16}
                        fontWeight={400}
                        color={"#AAAAAA"}
                      >
                        {item.amount} coin(s)
                      </Typography>
                    </Box>
                  </Box>
                );
              }
            })}

        {transactionInfo.transaction?.transactions.length === 0 && (
          <Typography color={"#AAAAAA"} sx={{ marginTop: 8 }}>
            You have no transaction, Start Add money and Trade in Trade Page!
          </Typography>
        )}
      </Box>
    </Box>
  );
};
