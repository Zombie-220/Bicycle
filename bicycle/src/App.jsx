import { RouterProvider } from "react-router-dom";
import { getRoutes } from "./navigation/routes";
import { createContext, useEffect, useState } from "react";
import { getAuth } from "./requests/request";

export const AuthContext = createContext(null);

export const App = () => {
  const [isAuth, setIsAuth] = useState(true);
  const routes = getRoutes(isAuth);

  // useEffect(() => {
  //   if (localStorage.getItem("token")) {
  //     getAuth(localStorage.getItem("token")).then((resp) => {
  //       if (resp.data[0].token === localStorage.getItem("token")) { setIsAuth(true) } 
  //     }).catch((error) => { console.log(error) })
  //   }
  // }, [])

  return (
    <AuthContext.Provider value={{ isAuth, setIsAuth }}>
      <RouterProvider router={routes} />
    </AuthContext.Provider>
  );
};
