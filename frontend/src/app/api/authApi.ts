import axios from "axios";
import { Users } from "../types/userTypes";

const piggyApi = axios.create({
  baseURL: process.env.API_URL,
});

export const join = async (user: Users) => {
  await piggyApi.post("/user", user);
};

export const login = async (user: Users) => {
  const response = await piggyApi.post("/login", user);
  return response.data;
};