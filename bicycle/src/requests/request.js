import axios from "axios";

export const baseURL = axios.create({
    baseURL: "https://my-json-server.typicode.com/Zombie-220/fakeJson/",
    headers: {},
})

export const getNewItems = () => {
    return baseURL("/newItems");
}

export const getProfile = () => {
    return baseURL(`/profile`)
}