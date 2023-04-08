import { renderHook } from "@testing-library/react-hooks";
import {
  assertFails,
  assertSucceeds,
  initializeTestEnvironment,
  RulesTestEnvironment,
} from "@firebase/rules-unit-testing";
import { COLLECTION_NAMES } from "../Constants";
import { Account } from "../Types/Account";
import useAccount from "./useAccount";
import { newAccount } from "./newAccount";
import { getFirestoreRules } from "../Utils/getFirestoreRules";

const FIRESTORE_RULES = getFirestoreRules();

describe("useAccount", () => {
  let testEnv: RulesTestEnvironment;

  beforeAll(async () => {
    testEnv = await initializeTestEnvironment({
      projectId: "stocker-test",
      firestore: { rules: FIRESTORE_RULES },
    });
    await testEnv.clearFirestore();
  });

  afterEach(async () => {
    await testEnv.clearFirestore();
  });

  afterAll(async () => {
    await testEnv.cleanup();
  });

  test("with unathenticated user", async () => {
    const app = testEnv.unauthenticatedContext();
    const db = app.firestore();

    // initial firestore setup. add account document.
    await testEnv.withSecurityRulesDisabled(async (context) => {
      const db = context.firestore();
      await db
        .collection(COLLECTION_NAMES.ACCOUNTS)
        .doc("userid_123")
        .set(newAccount("userid_123"));
    });

    // must fail when trying to fetch account data(because it is unathenticated)
    assertFails(
      db.collection(COLLECTION_NAMES.ACCOUNTS).doc("userid_123").get()
    );

    const { result, waitForNextUpdate } = renderHook(() =>
      useAccount(db, "userid_123")
    );

    // Initial state check
    expect(result.current.loading).toBe(true);
    expect(result.current.account).toBe(null);
    expect(result.current.error).toBe(null);

    // state check after first update
    await waitForNextUpdate();
    expect(result.current.loading).toBe(false);
    expect(result.current.account).toBe(null);
    expect(result.current.error).not.toBe(null); // Auth Error must exists
  });

  test("with athenticated user. When account exists, fetch account", async () => {
    // userid_123 is userid of authenticated user
    const app = testEnv.authenticatedContext("userid_123");
    const db = app.firestore();

    // initial firestore setup. add account document.
    await testEnv.withSecurityRulesDisabled(async (context) => {
      const db = context.firestore();
      const account = newAccount("userid_123");

      // set existing account to have 10 USD
      account.wallets[0].avgPrice = 1000;
      await db
        .collection(COLLECTION_NAMES.ACCOUNTS)
        .doc("userid_123")
        .set(account);
    });

    // must succeed when trying to fetch account data(because it is authenticated)
    assertSucceeds(
      db.collection(COLLECTION_NAMES.ACCOUNTS).doc("userid_123").get()
    );

    const { result, waitForNextUpdate } = renderHook(() =>
      useAccount(db, "userid_123")
    );

    // Initial state check
    expect(result.current.loading).toBe(true);
    expect(result.current.account).toBe(null);
    expect(result.current.error).toBe(null);

    await waitForNextUpdate();

    // state check after first update
    expect(result.current.loading).toBe(false);
    const expectedAccount: Account = {
      userID: "userid_123",
      wallets: [
        {
          symbol: "USD",
          amount: 1,
          avgPrice: 1000,
        },
      ],
    };
    expect(result.current.account).toStrictEqual(expectedAccount);
    expect(result.current.error).toBe(null);
  });

  test("with athenticated user. When account does not exist, create one and fetch", async () => {
    // userid_123 is userid of authenticated user
    const app = testEnv.authenticatedContext("userid_123");
    const db = app.firestore();

    // must succeed when trying to fetch account data(because it is authenticated)
    assertSucceeds(
      db.collection(COLLECTION_NAMES.ACCOUNTS).doc("userid_123").get()
    );

    const { result, waitForNextUpdate } = renderHook(() =>
      useAccount(db, "userid_123")
    );

    // Initial state check
    expect(result.current.loading).toBe(true);
    expect(result.current.account).toBe(null);
    expect(result.current.error).toBe(null);

    await waitForNextUpdate();

    // state check after first update
    expect(result.current.loading).toBe(false);
    const expectedAccount: Account = {
      userID: "userid_123",
      wallets: [
        {
          symbol: "USD",
          amount: 1,
          avgPrice: 0,
        },
      ],
    };
    expect(result.current.account).toStrictEqual(expectedAccount);
    expect(result.current.error).toBe(null);
  });
});
