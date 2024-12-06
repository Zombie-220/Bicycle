import React, { Component } from "react";
import { createBrowserRouter } from "react-router-dom";
import { ErrorPage } from "./errorPage";
import { Layout } from "./layout";
import { Main } from "../pages/main";
import { Bicycle } from "../pages/bicycle";
import { Order } from "../pages/order";
import { CartPage } from "../pages/cart";
import { AdminPage } from "../pages/admin";
import { AddPage } from "../pages/addPage";

const authPages = [
  {
    path: '/order',
    Component: Order
  },
  {
    path: '/cart',
    Component: CartPage
  }
];

const adminPages = [
  {
    path: 'admin',
    Component: AdminPage
  },
  {
    path: 'addPage',
    Component: AddPage
  }
];

const notAuthPages = [];
const notAdminPages = [];

export const getRoutes = (isAuth, isAdmin) => {
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
        ...(isAdmin? adminPages: notAdminPages)
      ],
    },
  ]);
};
