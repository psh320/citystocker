import { Account } from "../Types/Account";
import { newAccount } from "./newAccount";

describe("getAccountTotal", () => {
  test("must return number", () => {
    const result = 0;
    expect(newAccount("1")).toStrictEqual(result);
  });
});
