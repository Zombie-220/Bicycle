import axios from "axios";

/** стандартный url для API: https://localhost:5481 */
export const API_URL = axios.create({
    baseURL: "https://localhost:5481",
    headers: {},
});