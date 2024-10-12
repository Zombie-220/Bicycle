import axios from "axios";
import { getMainPageData } from "./const";

export const baseURL = axios.create({
    baseURL: "https://my-json-server.typicode.com/Zombie-220/fakeJson/",
    headers: {},
});

export const getNewItems = () => {
    return baseURL(getMainPageData);
};

export const getAuth = () => {
    return baseURL("/auth");
};

export const getProfile = () => {
    return baseURL(`/profile`);
};

export const checkToken = ({token}) => {
    return baseURL(`/check-token?token=${token}`);
};

export const addedNewItems = (data) => {
    return baseURL.post("/newItems", data);
};

export const removeOneNewItems = (id) => {
    return baseURL.delete(`/newItems/${id}`);
};

export const editNewItems = (data) => {
    return baseURL.patch(`/newItems/${data.id}`, data);
};