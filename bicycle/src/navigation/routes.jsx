import React from "react";
import { createBrowserRouter } from "react-router-dom";
import { ErrorPage } from "./errorPage";
import { Layout } from "./layout";

import { MainPage } from "../pages/main";
import { CatalogPage } from "../pages/catalog";

import { AuthPage } from "../pages/Authorization/auth";
import { RegisterPage } from "../pages/Authorization/register";
import { RecoverPasswordPage } from "../pages/Authorization/recoverPassword";

const authPages = [];

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

const adminPages = [];
const notAdminPages = [];

export const getRoutes = (isAuth, isAdmin) => {
  return createBrowserRouter([
    {
      Component: Layout,
      errorElement: <ErrorPage />,
      children: [
        {
          path: "/",
          Component: MainPage
        },
        {
          path: "/catalog/:category",
          Component: CatalogPage
        },

        ...(isAuth === '' ? notAuthPages : authPages),
        ...(isAdmin? adminPages: notAdminPages)
      ],
    },
  ]);
};
