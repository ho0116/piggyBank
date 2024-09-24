import axios from "axios";

const piggyApi = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
});

export const getAllChallenges = async() => {
    const response = await piggyApi.get("/challenge");
    return response.data
}