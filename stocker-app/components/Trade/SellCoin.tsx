import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import Typography from "@mui/material/Typography";

import sell from "../../stocker-core/sdk/Transaction/sell";
import {
  Box,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { db } from "../../utils/firebase";
import { useRecoilValue } from "recoil";
import { recoilUserId } from "../../states";
import { useEffect, useState } from "react";

type SellCoinProps = {
  children?: React.ReactNode;
  title: string;
  price: number;
  open: boolean;
  pricePercentage: string;
  priceDifference: number;
  availableCoin: number;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const SellCoin = ({
  title,
  price,
  open,
  setOpen,
  pricePercentage,
  priceDifference,
  availableCoin,
}: SellCoinProps) => {
  const userId = useRecoilValue(recoilUserId);
  const [sellAmount, setSellAmount] = useState("");
  const [sellError, setSellError] = useState(false);
  const handleClose = () => {
    setOpen(false);
  };
  const theme = useTheme();
  const lessThanSmall = useMediaQuery(theme.breakpoints.down("sm"));

  useEffect(() => {
    setSellError(false);
  }, [sellAmount]);

  return (
    <div>
      <Dialog
        fullScreen={lessThanSmall}
        fullWidth
        open={open}
        onClose={handleClose}
      >
        <DialogTitle variant="h4" fontWeight={600}>
          {title}
        </DialogTitle>
        <DialogContent>
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
              color={priceDifference < 0 ? "#CF3049" : "#04A56D"}
            >
              {priceDifference < 0 ? "" : "+"}
              {priceDifference.toFixed(2)}
              {"  "}({pricePercentage}
              %)
            </Typography>
          </Box>

          <Box sx={{ display: "flex", flexDirection: "row", marginTop: 1 }}>
            <Typography sx={{ marginRight: 4 }}>Available Coin</Typography>
            <Typography>{availableCoin ? availableCoin : 0}</Typography>
          </Box>

          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Amount of coin to SELL"
            type="number"
            variant="standard"
            InputProps={{
              inputProps: { min: 0 },
            }}
            value={sellAmount}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
              setSellAmount(event.target.value);
            }}
          />
          <Box sx={{ display: "flex", flexDirection: "row", marginTop: 1 }}>
            <Typography sx={{ marginRight: 1 }}>Total:</Typography>
            <Typography>
              ${sellAmount ? (Number(sellAmount) * price).toFixed(2) : 0}
            </Typography>
          </Box>
          {sellError && (
            <Typography color="red" fontSize={12}>
              Invalid Sell Amount!
            </Typography>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button
            onClick={() => {
              if (
                availableCoin < Number(sellAmount) ||
                Number(sellAmount) <= 0 ||
                Number.isNaN(Number(sellAmount))
              ) {
                setSellError(true);
              } else {
                sell(db, userId, title, Number(sellAmount), price);
                handleClose();
              }
            }}
          >
            Sell
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default SellCoin;
