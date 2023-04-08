import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import Typography from "@mui/material/Typography";
import {
  Box,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import buy from "../../stocker-core/sdk/Transaction/buy";
import { db } from "../../utils/firebase";
import { useRecoilValue } from "recoil";
import { recoilUserId } from "../../states";
import { useEffect, useState } from "react";

type BuyCoinProps = {
  children?: React.ReactNode;
  title: string;
  price: number;
  open: boolean;
  pricePercentage: string;
  priceDifference: number;
  availableSaving: number;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const BuyCoin = ({
  title,
  price,
  open,
  setOpen,
  pricePercentage,
  priceDifference,
  availableSaving,
}: BuyCoinProps) => {
  const userId = useRecoilValue(recoilUserId);
  const [buyAmount, setBuyAmount] = useState("");
  const [buyError, setBuyError] = useState(false);
  const handleClose = () => {
    setOpen(false);
  };
  const theme = useTheme();
  const lessThanSmall = useMediaQuery(theme.breakpoints.down("sm"));

  useEffect(() => {
    setBuyError(false);
  }, [buyAmount]);
  return (
    <div>
      <Dialog
        fullWidth
        fullScreen={lessThanSmall}
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
              variant="body1"
              fontWeight={500}
              color={priceDifference < 0 ? "#CF3049" : "#04A56D"}
            >
              {priceDifference < 0 ? "" : "+"}
              {priceDifference.toFixed(2)}
              {"  "}({pricePercentage}
              %)
            </Typography>
          </Box>

          <Box sx={{ display: "flex", flexDirection: "row", marginTop: 1 }}>
            <Typography sx={{ marginRight: 4 }}>Available Saving</Typography>
            <Typography>${availableSaving.toFixed(2)}</Typography>
          </Box>

          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Amount of coin to buy"
            type="number"
            InputProps={{
              inputProps: { min: 0 },
            }}
            variant="standard"
            value={buyAmount}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
              setBuyAmount(event.target.value);
            }}
          />
          <Box sx={{ display: "flex", flexDirection: "row", marginTop: 1 }}>
            <Typography sx={{ marginRight: 1 }}>Total:</Typography>
            <Typography>
              ${buyAmount ? (Number(buyAmount) * price).toFixed(2) : 0}
            </Typography>
          </Box>
          {buyError && (
            <Typography color="red" fontSize={12}>
              Invalid Buy Amount!
            </Typography>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button
            onClick={() => {
              if (
                availableSaving < Number(buyAmount) * price ||
                Number(buyAmount) <= 0 ||
                Number.isNaN(Number(buyAmount))
              ) {
                setBuyError(true);
              } else {
                buy(db, userId, title, Number(buyAmount), price);
                handleClose();
              }
            }}
          >
            Buy
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default BuyCoin;
