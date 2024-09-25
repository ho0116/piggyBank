import axios from "axios";
import MyAccount from "../types/accountType";
import Transaction from "../types/transaction";

const piggyApi = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
});

export const saveMoney = async(transaction: Transaction) => {
    const response = await piggyApi.post("/transaction", transaction)
    return response.data
}