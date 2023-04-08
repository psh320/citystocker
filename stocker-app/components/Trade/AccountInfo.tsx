import { Box, Typography } from "@mui/material";
import React, { ReactNode } from "react";
import { useRouter } from "next/router";
import { Account } from "../../stocker-core/sdk/Types/Account";

type AccountInfoProps = {
  children?: ReactNode;
  accountInfo: Account | null;
};

const AccountInfo = ({ accountInfo }: AccountInfoProps) => {
  //   const result = getCoinIcon(code);
  const router = useRouter();
  return (
    <Box
      sx={{
        width: "100%",
        marginY: 1,
      }}
    >
      <Typography variant="h5" fontWeight={600} marginBottom={1}>
        Account
      </Typography>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Typography color="gray" fontWeight={400}>
          USD Savings
        </Typography>
        <Typography fontWeight={500}>
          ${accountInfo?.wallets[0].amount.toFixed(2)}
        </Typography>
      </Box>
    </Box>
  );
};

export default AccountInfo;
