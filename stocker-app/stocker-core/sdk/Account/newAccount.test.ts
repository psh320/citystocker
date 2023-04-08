import { Account } from "../Types/Account";
import { newAccount } from "./newAccount";

describe("newAccount", () => {
  test("must return account object", () => {
    const account: Account = {
      userID: "user123",
      wallets: [
        {
          symbol: "USD",
          amount: 0,
          avgPrice: 0,
        },
      ],
    };
    expect(newAccount("user123")).toStrictEqual(account);
  });
});
