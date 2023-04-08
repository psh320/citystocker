import fs from "fs";

export function getFirestoreRules() {
  const rules = fs.readFileSync("./firestore.rules", "utf8");
  return rules;
}
