import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import { COLLECTION_NAMES } from "../Constants";
import { History, Transaction } from "../Types/History";

function newHistory(userID: string): History {
  return {
    userID: userID,
    transactions: [],
  };
}

async function addMoney(
  db: firebase.firestore.Firestore,
  userID: string,
  symbol: string,
  amount: number,
  price: number
) {
  const historiesRef = db.collection(
    COLLECTION_NAMES.HISTORIES
  ) as firebase.firestore.CollectionReference<History>;
  const snapshot = await historiesRef.where("userID", "==", userID).get();

  if (snapshot.empty) {
    const docRef = await historiesRef.add(newHistory(userID));
  }

  const docRef = snapshot.docs[0];

  const history = docRef.data();
  const newTransaction: Transaction = {
    symbol: symbol,
    type: "ADD",
    amount: amount,
    price: price,
    timestamp: new Date().getTime(),
  };

  docRef.ref.update({
    transactions: [...history.transactions, newTransaction],
  });
}

export default addMoney;
