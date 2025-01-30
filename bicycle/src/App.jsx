import React, { createContext, useEffect, useState } from "react";
import { RouterProvider } from "react-router-dom";
import Cookies from 'js-cookie';
import { jwtDecode } from 'jwt-decode';

import { getRoutes } from "./navigation/routes";

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
      if (tokenInfo.roles.includes('admin')) { setIsAdmin(true); }
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