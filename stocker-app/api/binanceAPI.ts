import axios from "axios";
import { TradeResult } from "../components/Auto/type";
import { Price } from "../components/Trade/type";
const baseUrl = "http://localhost:8080";
//http://localhost:8080
//https://citystocker.shop
export const getPrice = async (symbol: string): Promise<Price> => {
  const { data } = await axios.get(`${baseUrl}/quote/crypto/${symbol}`, {
    params: { symbol: symbol },
  });

  return data;
};

export const getPriceList = async (symbol: string, interval: string) => {
  const { data } = await axios.get(
    `${baseUrl}/pricelist/crypto/${symbol}/${interval}/120`
  );

  return data;
};

export const submitCode = async (
  symbol: string,
  code: string,
  startDate: string,
  endDate: string,
  budget: string
): Promise<TradeResult> => {
  const { data } = await axios.post(`${baseUrl}/runner`, {
    code: code,
    symbol: symbol,
    startTime: startDate,
    endTime: endDate,
    budget: budget,
  });
  return data;
};
