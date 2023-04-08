import fs from "fs";
import { Transaction } from "./market/types";
import trader from "./user/user_script";
import { ACCOUNT_JSON_PATH, TRANSACTION_JSON_PATH } from "../filepath";
import { trade } from "./market/Market";
import { Account, MarketConfig } from "./market/types";
import { parseArguments } from "../runner/util";

async function runner() {
  const config: MarketConfig = parseArguments(process.argv);
  const [transactions, account]: [Transaction[], Account] = await trade(
    trader,
    config
  );
  writeTransactionsToJSON(transactions);
  writeAccountToJSON(account);
}

function writeTransactionsToJSON(transactions: Transaction[]): void {
  fs.writeFileSync(TRANSACTION_JSON_PATH, JSON.stringify(transactions));
}

function writeAccountToJSON(account: Account): void {
  fs.writeFileSync(ACCOUNT_JSON_PATH, JSON.stringify(account));
}

runner();
