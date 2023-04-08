import firebase from "firebase/compat/app";

export type History = {
  userID: string;
  transactions: Transaction[];
};

export type Transaction = {
  symbol: string;
  type: TransactionType;
  amount: number;
  price: number;
  timestamp: number;
};

export type TransactionType = "BUY" | "SELL" | "ADD";
