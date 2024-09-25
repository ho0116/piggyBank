import axios from "axios";
import Challenge from "../types/challengeType";

const piggyApi = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
});

export const getAllChallenges = async(id:number) => {
    const response = await piggyApi.get(`/challenge/all/${id}`);
    return response.data
}


export const createChallenge = async (challenge: Challenge) : Promise<Challenge> => {
    const response = await piggyApi.post("/challenge", challenge);
    return response.data;
}

export const deleteChallenge = async (id: number) =>{
    await piggyApi.delete(`/challenge/${id}`);
}


