import axios from "axios";

export const API_URL = axios.create({
    baseURL: "https://localhost:5481",
    headers: {},
});