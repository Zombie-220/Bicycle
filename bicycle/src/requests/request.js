import axios from "axios";

export const baseURL = axios.create({
    baseURL: "https://my-json-server.typicode.com/Zombie-220/fakeJson/",
    headers: {},
})

export const getNewItems = () => {
    return baseURL("/newItems");
}

export const getAuth = () => {
    return baseURL("/auth");
}

export const getProfile = () => {
    return baseURL(`/profile`);
}

export const checkToken = ({token}) => {
    console.log(token)
    return baseURL(`/check-token?token=${token}`);
}