import React from "react";
import { createBrowserRouter } from "react-router-dom";
import { ErrorPage } from "./errorPage";
import { Layout } from "./layout";
import { Main } from "../pages/main";
import { Bicycle } from "../pages/bicycle";
import { Order } from "../pages/order";

const authPages = [
  {
    path: '/order',
    Components: Order
  },
];

const notAuthPages = [
  {

  }
];

export const getRoutes = (isAuth) => {
  return createBrowserRouter([
    {
      Component: Layout,
      errorElement: <ErrorPage />,
      children: [
        {
          path: "/",
          Component: Main,
        },
        {
          path: '/bicycle',
          Component: Bicycle
        },

        ...(isAuth ? authPages : notAuthPages),
      ],
    },
  ]);
};
