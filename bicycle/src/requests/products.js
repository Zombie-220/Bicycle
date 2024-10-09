import { baseURL } from "./request";

export const addedProducts = (data) => {
    return baseURL.post("/products", data);
};
  
export const getProducts = () => {
    return baseURL("/products");
};
  
export const removeOneProduct = (id) => {
    return baseURL.delete(`/products/${id}`);
};
  
export const editProduct = (data) => {
    return baseURL.patch(`/products/${data.id}`, data);
};