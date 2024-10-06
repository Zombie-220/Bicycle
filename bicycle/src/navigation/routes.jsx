import { createBrowserRouter } from "react-router-dom";

import { Layout } from "./layout";
import Main from "../pages/main";
import { ErrorPage } from "./errorPage";
import { Auth } from "../pages/auth";

export const routes = createBrowserRouter([{
    Component: Layout,
    errorElement: <ErrorPage />,
    children: [
    {
        path: "/",
        Component: Main,
    },
    {
        path: "/auth",
        Component: Auth
    }]
}])