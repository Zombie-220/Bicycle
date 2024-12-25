import React from "react";
import { createBrowserRouter } from "react-router-dom";
import { ErrorPage } from "./errorPage";
import { Layout } from "./layout";
import { Main } from "../pages/main";
import { Bicycle } from "../pages/bicycle";
import { Order } from "../pages/order";
import { CartPage } from "../pages/cart";
import { AdminPage } from "../pages/admin";
import { ChangePage } from "../pages/changePage";
import { AddProduct } from "../pages/addProduct";

import { AuthPage } from "../pages/authorization/auth";
import { RegisterPage } from "../pages/authorization/register";
import { RecoverPasswordPage } from "../pages/authorization/recoverPassword";

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

const notAuthPages = [
  {
    path: '/auth',
    Component: AuthPage
  },
  {
    path: '/register',
    Component: RegisterPage
  },
  {
    path: '/auth/recover',
    Component: RecoverPasswordPage
  }
];

const adminPages = [
  {
    path: '/admin/:section',
    Component: AdminPage
  },
  {
    path: '/changePage',
    Component: ChangePage
  },
  {
    path: '/addPage',
    Component: AddProduct
  }
];

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

        ...(isAuth === '' ? notAuthPages : authPages),
        ...(isAdmin? adminPages: notAdminPages)
      ],
    },
  ]);
};
