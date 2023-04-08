import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import { useEffect, useState } from "react";
import { COLLECTION_NAMES } from "../Constants";
import { Account } from "../Types/Account";
import { newAccount } from "./newAccount";

function useAccount(db: firebase.firestore.Firestore, userID: string) {
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);
  const [account, setAccount] = useState<Account | null>(null);

  useEffect(() => {
    const unsubscribe = db
      .collection(COLLECTION_NAMES.ACCOUNTS)
      .doc(userID)
      .onSnapshot(
        (snapshot) => {
          const fsDocData = snapshot.data();
          if (fsDocData) {
            setAccount(fsDocData ? (fsDocData as Account) : null);
            setError(null);
            setLoading(false);
          } else {
            // Create new account when there is no account.
            snapshot.ref.set(newAccount(userID));
          }
        },
        (error) => {
          setError(error);
          setAccount(null);
          setLoading(false);
        }
      );
    return unsubscribe;
  }, []);

  return { account, loading, error };
}

export default useAccount;
