import axios from "axios";

/** запросы на API */
export const API_URL = axios.create({
    baseURL: `${process.env.REACT_APP_BACKEND_URL}`,
    headers: {}
});