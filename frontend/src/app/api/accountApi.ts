import axios from "axios";
import MyAccount from "../types/accountType";

const piggyApi = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
});

export const createAccount = async(account:MyAccount) => {
    const response = await piggyApi.post("/account",account)
    return response.data
}

export const getMyAccount = async(id:number) => {
  const response = await piggyApi.get(`/account/all/${id}`)
  return response.data
}
