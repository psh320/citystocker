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

async function buy(
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
    type: "BUY",
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
        accountCopy.wallets[0].amount -= price * amount;
        const checkWalletIndex = accountCopy.wallets.findIndex(
          (item) => item.symbol === symbol
        );
        if (checkWalletIndex < 0) {
          accountCopy.wallets.push({
            symbol: symbol,
            amount: amount,
            avgPrice: price,
          });
        } else {
          const previousAmount = accountCopy.wallets[checkWalletIndex].amount;
          const previousAvgPrice =
            accountCopy.wallets[checkWalletIndex].avgPrice;
          accountCopy.wallets[checkWalletIndex].amount += amount;
          accountCopy.wallets[checkWalletIndex].avgPrice =
            (previousAmount * previousAvgPrice + price * amount) /
            accountCopy.wallets[checkWalletIndex].amount;
        }
        accountRef.doc(userID).set(accountCopy);
      }
    });
}

export default buy;
