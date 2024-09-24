import axios from "axios";

const piggyApi = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
});

export const getAllChallenges = async(id:number) => {
    console.log(id)
    const response = await piggyApi.get(`/challenge/all/{id}`);
    return response.data
}