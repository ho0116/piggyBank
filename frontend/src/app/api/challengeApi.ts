import axios from "axios";

const piggyApi = axios.create({
  baseURL: "http://localhost:8081",
});

export const getAllChallenges = async() => {
    const response = await piggyApi.get("/challenge");
    return response.data
}