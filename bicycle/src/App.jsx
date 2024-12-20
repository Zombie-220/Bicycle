import { RouterProvider } from "react-router-dom";
import { getRoutes } from "./navigation/routes";
import { createContext, useEffect, useState } from "react";
import { baseURL } from "./requests/request";

export const AuthContext = createContext(null);
export const ProductContext = createContext(null);
export const AddedProductsToCart = createContext(null);
export const AdminContext = createContext(null);
export const ChangeProductContext = createContext(null);

export const App = () => {
  // 673f4871586c8caff684c4ab
  const [isAuth, setIsAuth] = useState('');
  const [currentProduct, setCurrentProduct] = useState();
  const [addedProductToCart, setAddedProductToCart] = useState([]);
  const [isAdmin, setIsAdmin] = useState(false);
  const [changedProduct, setChangedProduct] = useState('');
  const routes = getRoutes(isAuth, isAdmin);

  useEffect(() => {
    if (localStorage.getItem("token")) {
      setIsAuth(JSON.parse(localStorage.getItem("token")));
      baseURL(`users/isAdmin/${JSON.parse(localStorage.getItem("token"))}`)
      .then(({ data }) => {if (data.response) { setIsAdmin(true) }})
      .catch((err) => { console.log(err) })
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