import { Request, Response } from "express";
import { simulate } from "../runner/runner";

type RunnerRequest = {
  code?: string;
  symbol?: string;
  startTime?: string;
  endTime?: string;
  budget?: string;
};

export async function runnerHandler(req: Request, res: Response) {
  // Input validation
  const { code, symbol, startTime, endTime, budget } =
    req.body as RunnerRequest;

  if (!code) {
    return res.status(400).send("No script");
  }
  if (!symbol) {
    return res.status(400).send("No symbol");
  }
  if (!startTime) {
    return res.status(400).send("No start time");
  }
  if (!endTime) {
    return res.status(400).send("No end time");
  }
  if (!budget) {
    return res.status(400).send("No budget");
  }

  const result = await simulate(code, {
    symbol,
    startTime: new Date(startTime).getTime(),
    endTime: new Date(endTime).getTime(),
    budget: parseInt(budget),
  });

  res.send(result);
}
