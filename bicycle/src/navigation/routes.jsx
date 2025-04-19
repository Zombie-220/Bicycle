import React from "react";
import { createBrowserRouter } from "react-router-dom";
import { ErrorPage } from "./errorPage";
import { Layout } from "./layout";

import { MainPage } from "../pages/main";
import { CatalogPage } from "../pages/Catalog/catalog";
import { CatalogById } from "../pages/Catalog/catalogById";
import { CartPage } from "../pages/cart";
import { AuthPage } from "../pages/Authorization/auth";
import { RegisterPage } from "../pages/Authorization/register";
import { RecoverPasswordPage } from "../pages/Authorization/recoverPassword";
import { AccountPage } from "../pages/Account";
import { RecoverPass } from "../pages/Account/recoverPass";
import { AdminPage } from "../pages/Admin";
import { UsersInfoPage } from "../pages/Admin/users";
import { BicyclesInfoPage } from "../pages/Admin/bicycles";

const authPages = [
  {
    path: '/catalog/:category/:id',
    Component: CatalogById
  },
  {
    path: '/cart',
    Component: CartPage
  },
  {
    path: '/account/:id',
    Component: AccountPage,
    children: [
      {
        path: 'password',
        Component: RecoverPass
      }
    ]
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
    path: '/admin',
    Component: AdminPage,
    children: [
      {
        path: 'users',
        Component: UsersInfoPage
      },
      {
        path: 'bicycles',
        Component: BicyclesInfoPage
      }
    ]
  }
];

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
        ...(isAdmin? adminPages: [])
      ],
    },
  ]);
};
