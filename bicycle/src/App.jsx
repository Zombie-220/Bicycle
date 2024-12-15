import { RouterProvider } from "react-router-dom";
import { getRoutes } from "./navigation/routes";
import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext(null);
export const ProductContext = createContext(null);
export const AddedProductsToCart = createContext(null);
export const AdminContext = createContext(null);
export const ChangeProductContext = createContext(null);

export const App = () => {
  // 673f4871586c8caff684c4ab
  const [isAuth, setIsAuth] = useState('');
  const [currentProduct, setCurrentProduct] = useState();
  const [addedProductToCart, setAddedProductToCart] = useState([
    { amount: 2, price: 649110, productId: "67460407aaf21301a79efd6d", size: "X" },
    { amount: 1, price: 649110, productId: "67461979aaf21301a79efd74", size: "XL" },
    { amount: 4, price: 649110, productId: "67461a21aaf21301a79efd76", size: undefined },
  ]);
  const [isAdmin, setIsAdmin] = useState(false);
  const [changedProduct, setChangedProduct] = useState('');
  const routes = getRoutes(isAuth, isAdmin);

  useEffect(() => {
    if (localStorage.getItem("token")) { setIsAuth(JSON.parse(localStorage.getItem("token"))); }
  }, [])

  useEffect(() => {
    console.log(isAuth)
  }, [isAuth])

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