import axios from "axios";
import { BASE_URL } from "../const/url/url";

export const baseURL = axios.create({
    baseURL: BASE_URL,
    headers: {},
})

export const getPost = () => {
    return baseURL("/promo");
}