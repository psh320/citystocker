// import buy from "./buy";
// import {
//   initializeTestEnvironment,
//   RulesTestEnvironment,
// } from "@firebase/rules-unit-testing";
// import firebase from "firebase/compat/app";
// import { getFirestoreRules } from "../Utils/getFirestoreRules";

// const FIRESTORE_RULES = getFirestoreRules();

// describe("buy", () => {
//   let testEnv: RulesTestEnvironment;

//   beforeAll(async () => {
//     testEnv = await initializeTestEnvironment({
//       projectId: "stocker-test",
//       firestore: { rules: FIRESTORE_RULES },
//     });
//     await testEnv.clearFirestore();
//   });

//   afterEach(async () => {
//     await testEnv.clearFirestore();
//   });

//   afterAll(async () => {
//     await testEnv.cleanup();
//   });

//   it("creates buy transaction", async () => {
//     const context = testEnv.unauthenticatedContext();
//     const db = context.firestore();

//     await buy(db, "userid_123", "BTC", 10);
//   });
// });
