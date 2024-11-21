import axios from "axios";
import { NewBicycles } from "./const";

export const baseURL = axios.create({
    baseURL: "http://localhost:5000",
    headers: {},
});

export const getNewItems = () => {
    return baseURL(NewBicycles);
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
    return baseURL.post("/newBicycles", data);
};

export const removeOneNewItems = (id) => {
    return baseURL.delete(`/newBicycles/${id}`);
};

export const editNewItems = (data) => {
    return baseURL.patch(`/newBicycles/${data.id}`, data);
};