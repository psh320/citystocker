import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import { useEffect, useState } from "react";
import { COLLECTION_NAMES } from "../Constants";
import { History } from "../Types/History";

function newHistory(userID: string): History {
  return {
    userID: userID,
    transactions: [],
  };
}

function useTransaction(db: firebase.firestore.Firestore, userID: string) {
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);
  const [transaction, setTransaction] = useState<History | null>(null);

  useEffect(() => {
    const unsubscribe = db
      .collection(COLLECTION_NAMES.HISTORIES)
      .doc(userID)
      .onSnapshot(
        (snapshot) => {
          const fsDocData = snapshot.data();
          if (fsDocData) {
            setTransaction(fsDocData ? (fsDocData as History) : null);
            setError(null);
            setLoading(false);
          } else {
            // Create new account when there is no account.
            snapshot.ref.set(newHistory(userID));
          }
        },
        (error) => {
          setError(error);
          setTransaction(null);
          setLoading(false);
        }
      );
    return unsubscribe;
  }, []);

  return { transaction, loading, error };
}

export default useTransaction;

// const {account, loading, error} = useAccount(db, userId)

// if(error) {
//   return <Error>
// }

// if(loading) {
//   return <Loading>

// }

// return <Account account={account} />
