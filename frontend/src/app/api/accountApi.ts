import axios from "axios";
import MyAccount from "../types/accountType";

const piggyApi = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
});

export const createAccount = async(account:MyAccount) => {
    const response = await piggyApi.post("/account",account)
}
