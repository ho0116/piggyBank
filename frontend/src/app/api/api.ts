import axios from "axios";
import { User } from "../types";

const piggyApi = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
});

export const join = async (user: User) => {
  await piggyApi.post("/user", user);
};

export const login = async (user: User) => {
  const response = await piggyApi.post("/login", user);
  return response.data;
};