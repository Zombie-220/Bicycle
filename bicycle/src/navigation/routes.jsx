import { createBrowserRouter } from "react-router-dom";
import { Layout } from "./layout";
import ErrorElement from "./errorElements";
import { Auth } from "../pages/auth/auth";
import { Main } from "../pages/main";
import { Register } from "../pages/register/register";

export const routes = createBrowserRouter([{
    Component: Layout,
    errorElement: <ErrorElement />,
    children: [{
        path: "/auth",
        Component: Auth,
    },
    {
        path: "/",
        Component: Main,
    },
    {
        path: "/register",
        Component: Register
    }]
}])