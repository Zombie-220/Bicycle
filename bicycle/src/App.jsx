import { RouterProvider } from "react-router-dom";
import { getRoutes } from "./navigation/routes";
import { createContext, useEffect, useState } from "react";
import { getAuth } from "./requests/request";

export const AuthContext = createContext(null);
export const ProductContext = createContext(null);
export const AddedProductsToCart = createContext(null);

export const App = () => {
  const [isAuth, setIsAuth] = useState(true);
  const [currentProduct, setCurrentProduct] = useState();
  const [addedProductToCart, setAddedProductToCart] = useState([]);
  const routes = getRoutes(isAuth);

  // useEffect(() => {
  //   if (localStorage.getItem("token")) {
  //     getAuth(localStorage.getItem("token")).then((resp) => {
  //       if (resp.data[0].token === localStorage.getItem("token")) { setIsAuth(true) } 
  //     }).catch((error) => { console.log(error) })
  //   }
  // }, [])

  useEffect(() => {
    console.log(addedProductToCart);
  }, [addedProductToCart, setAddedProductToCart]);

  return (
    <AuthContext.Provider value={{ isAuth, setIsAuth }}>
      <ProductContext.Provider value={{ currentProduct, setCurrentProduct }}>
        <AddedProductsToCart.Provider value={{ addedProductToCart, setAddedProductToCart }}>
          <RouterProvider router={routes} />
        </AddedProductsToCart.Provider>
      </ProductContext.Provider>
    </AuthContext.Provider>
  );
};
