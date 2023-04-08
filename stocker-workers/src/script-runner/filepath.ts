import path from "path";

export const TRANSACTION_JSON_PATH = path.resolve(
  process.cwd(),
  "src",
  "script-runner",
  "sdk",
  "user",
  "user_output.json"
);

export const ACCOUNT_JSON_PATH = path.resolve(
  process.cwd(),
  "src",
  "script-runner",
  "sdk",
  "user",
  "user_account.json"
);

export const USER_SCRIPT_PATH = path.resolve(
  process.cwd(),
  "src",
  "script-runner",
  "sdk",
  "user",
  "user_script.ts"
);
export const RUNNER_SCRIPT_PATH = path.resolve(
  process.cwd(),
  "src",
  "script-runner",
  "sdk",
  "index.ts"
);
