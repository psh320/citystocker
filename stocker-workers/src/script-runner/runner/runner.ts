import { exec } from "child_process";
import fs from "fs";
import process from "process";
import { TradeResult, Transaction } from "../sdk/market/types";
import {
  ACCOUNT_JSON_PATH,
  RUNNER_SCRIPT_PATH,
  TRANSACTION_JSON_PATH,
  USER_SCRIPT_PATH,
} from "../filepath";
import { Account, MarketConfig } from "../sdk/market/types";
import { stringifyArguments } from "./util";

export async function simulate(
  code: string,
  marketConfig: MarketConfig
): Promise<TradeResult> {
  // Write user script into file
  const newCode = `
  import { Trader } from "../market/Trader" 
  import { Quote } from "../market/types"
  
  ${code}
  `;
  fs.writeFileSync(USER_SCRIPT_PATH, Buffer.from(newCode));

  // Run user Script
  const programResult = await runScript(RUNNER_SCRIPT_PATH, marketConfig);

  // Read transactions file
  const transactionJSON = String(fs.readFileSync(TRANSACTION_JSON_PATH));
  const transactions: Transaction[] = JSON.parse(transactionJSON);

  // Read account file
  const accountJSON = String(fs.readFileSync(ACCOUNT_JSON_PATH));
  const account: Account = JSON.parse(accountJSON);

  const result: TradeResult = {
    account,
    transactions,
    logs: programResult.logs,
    errors: programResult.errors,
  };

  return result;
}

function runScript(
  path: string,
  marketConfig: MarketConfig
): Promise<{ logs: string[]; errors: string[] }> {
  const command =
    "npx ts-node " + path + " " + stringifyArguments(marketConfig);
  const logs: string[] = [];
  const errors: string[] = [];

  const child = exec(
    command,
    {
      cwd: process.cwd(),
    },
    (error, stdout, stderr) => {
      if (error) errors.push(error.message);
      if (stdout) logs.push(...stdout.split(`\n`));
      if (stderr) errors.push(stderr);
    }
  );

  return new Promise((resolve, reject) => {
    child.on("exit", () => {
      resolve({
        logs,
        errors,
      });
    });
  });
}
