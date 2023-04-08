import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { useEffect, useState } from "react";
import { recoilUserId } from "../../states";
import addMoney from "../../stocker-core/sdk/Transaction/addMoney";
import { db } from "../../utils/firebase";
import { Account } from "../../stocker-core/sdk/Types/Account";
import { useRecoilValue } from "recoil";
import { Typography, useMediaQuery, useTheme } from "@mui/material";

type Props = {
  children?: React.ReactNode;
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  account: Account | null;
};

export default function AddMoneyModal({ open, setOpen, account }: Props) {
  const [addAmount, setAddAmount] = useState("");
  const [addError, setAddError] = useState(false);
  const userId = useRecoilValue(recoilUserId);
  const handleClose = () => {
    setOpen(false);
  };
  const theme = useTheme();
  const lessThanSmall = useMediaQuery(theme.breakpoints.down("sm"));

  useEffect(() => {
    setAddError(false);
  }, [addAmount]);

  const handleAddMoney = (amount: number, account: Account) => {
    const accountCopy = { ...account };
    accountCopy.wallets[0].amount += amount;
    db.collection("accounts").doc(userId).set(accountCopy);
    addMoney(db, userId, "USD", 0, Number(addAmount));
  };

  return (
    <Dialog open={open} onClose={handleClose} fullScreen={lessThanSmall}>
      <DialogTitle>Add Money</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Write the amount of USD money you would like to add.
        </DialogContentText>
        <TextField
          autoFocus
          margin="dense"
          id="name"
          label="Amount of money"
          type="number"
          variant="standard"
          value={addAmount}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
            setAddAmount(event.target.value);
          }}
        />
        {addError && (
          <Typography color="red" fontSize={12}>
            Invalid Add Money Amount!
          </Typography>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button
          onClick={async () => {
            if (Number(addAmount) <= 0 || Number.isNaN(Number(addAmount))) {
              setAddError(true);
            } else {
              await handleAddMoney(Number(addAmount), account as Account);
              handleClose();
            }
          }}
        >
          Add
        </Button>
      </DialogActions>
    </Dialog>
  );
}
