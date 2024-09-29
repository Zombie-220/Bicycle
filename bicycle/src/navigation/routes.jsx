import { createBrowserRouter } from "react-router-dom";

import { Layout } from "./layout";
import { Main } from "../pages/main";
import { Register } from "../pages/register";
import { ErrorPage } from "./errorPage";

export const routes = createBrowserRouter([{
    Component: Layout,
    errorElement: <ErrorPage />,
    children: [
    {
        path: "/",
        Component: Main,
    },
    {
        path: "/register",
        Component: Register
    }]
}])