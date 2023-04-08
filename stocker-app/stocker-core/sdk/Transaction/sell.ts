import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import { COLLECTION_NAMES } from "../Constants";
import { Account } from "../Types/Account";
import { History, Transaction } from "../Types/History";

function newHistory(userID: string): History {
  return {
    userID: userID,
    transactions: [],
  };
}

async function sell(
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
    type: "SELL",
    amount: amount,
    price: price,
    timestamp: new Date().getTime(),
  };

  docRef.ref.update({
    transactions: [...history.transactions, newTransaction],
  });

  const accountRef = db.collection(
    COLLECTION_NAMES.ACCOUNTS
  ) as firebase.firestore.CollectionReference<Account>;
  accountRef
    .doc(userID)
    .get()
    .then((doc) => {
      const account = doc.data();
      if (account && account.userID && account.wallets) {
        let accountCopy = { ...account };
        accountCopy.wallets[0].amount += price * amount;
        const checkWalletIndex = accountCopy.wallets.findIndex(
          (item) => item.symbol === symbol
        );

        const previousAmount = accountCopy.wallets[checkWalletIndex].amount;
        const previousAvgPrice = accountCopy.wallets[checkWalletIndex].avgPrice;
        if (checkWalletIndex < 0) {
          accountCopy.wallets.push({
            symbol: symbol,
            amount: 0,
            avgPrice: 0,
          });
        } else {
          accountCopy.wallets[checkWalletIndex].amount -= amount;
          if (accountCopy.wallets[checkWalletIndex].amount > 0) {
            accountCopy.wallets[checkWalletIndex].avgPrice =
              (previousAmount * previousAvgPrice - price * amount) /
              accountCopy.wallets[checkWalletIndex].amount;
          } else {
            accountCopy.wallets[checkWalletIndex].avgPrice = 0;
          }
        }
        accountRef.doc(userID).set(accountCopy);
      }
    });
}

export default sell;
