import React, { createContext, useEffect, useState } from "react";
import { RouterProvider } from "react-router-dom";
import Cookies from 'js-cookie';
import { jwtDecode } from 'jwt-decode';
import { Encrypt } from "./helpers/AES";

import { getRoutes } from "./navigation/routes";
import { API_URL } from "./requests/request";

import './assets/fonts/fonts.css';

export const AuthContext = createContext(null);
export const ProductContext = createContext(null);
export const AddedProductsToCart = createContext(null);
export const AdminContext = createContext(null);
export const ChangeProductContext = createContext(null);

export const App = () => {
  const [isAuth, setIsAuth] = useState('');
  const [currentProduct, setCurrentProduct] = useState();
  const [addedProductToCart, setAddedProductToCart] = useState([]);
  const [isAdmin, setIsAdmin] = useState(false);
  const [changedProduct, setChangedProduct] = useState('');
  const routes = getRoutes(isAuth, isAdmin);

  useEffect(() => {
    if (Cookies.get('token')) {
      const tokenInfo = jwtDecode(Cookies.get('token'))
      setIsAuth(tokenInfo.id);
      API_URL(`/users/check?isAdmin=${Encrypt(tokenInfo.id)}`).then(({ data }) => {
        if (data.response) { setIsAdmin(true); }
      }).catch((err) => { console.log(err); })
    }
  }, [])

  return (
    <AuthContext.Provider value={{ isAuth, setIsAuth }}>
      <ProductContext.Provider value={{ currentProduct, setCurrentProduct }}>
        <AddedProductsToCart.Provider value={{ addedProductToCart, setAddedProductToCart }}>
          <AdminContext.Provider value={{ isAdmin, setIsAdmin }}>
            <ChangeProductContext.Provider value={{ changedProduct, setChangedProduct }}>
              <RouterProvider router={routes} />
            </ChangeProductContext.Provider>
          </AdminContext.Provider>
        </AddedProductsToCart.Provider>
      </ProductContext.Provider>
    </AuthContext.Provider>
  );
};