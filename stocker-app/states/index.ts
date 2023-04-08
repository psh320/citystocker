import { atom } from "recoil";
import Cookies from "js-cookie";

const userId = Cookies.get("userId");

export const recoilUserId = atom<string>({
  key: "userId",
  default: userId ? userId : "0",
});
