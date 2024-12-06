import { RouterProvider } from "react-router-dom";
import { getRoutes } from "./navigation/routes";
import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext(null);
export const ProductContext = createContext(null);
export const AddedProductsToCart = createContext(null);
export const AdminContext = createContext(null);

export const App = () => {
  const [isAuth, setIsAuth] = useState(true);
  const [currentProduct, setCurrentProduct] = useState();
  const [addedProductToCart, setAddedProductToCart] = useState([]);
  const [isAdmin, setIsAdmin] = useState(true);
  const routes = getRoutes(isAuth, isAdmin);

  useEffect(() => {
    if (localStorage.getItem("token")) { setIsAuth(true); }
  }, [])

  return (
    <AuthContext.Provider value={{ isAuth, setIsAuth }}>
      <ProductContext.Provider value={{ currentProduct, setCurrentProduct }}>
        <AddedProductsToCart.Provider value={{ addedProductToCart, setAddedProductToCart }}>
          <AdminContext.Provider value={{ isAdmin, setIsAdmin }}>
            <RouterProvider router={routes} />
          </AdminContext.Provider>
        </AddedProductsToCart.Provider>
      </ProductContext.Provider>
    </AuthContext.Provider>
  );
};
