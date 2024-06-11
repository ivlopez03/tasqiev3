import App from "../App";
import ErrorPage from "../error-page";
import HomePage from "../pages/HomePage/HomePage";
import MyideasPage from "../pages/MyideasPage/MyideasPage";
import WorkspacePage from "../pages/WorkspacePage/WorkspacePage";
import LoginPage from "../pages/auth/Login/LoginPage";
import RegisterPage from "../pages/auth/Register/RegisterPage";
import VerifyEmailPage from "../pages/auth/VerifyEmail/VerifyEmailPage"

import { createBrowserRouter } from "react-router-dom";


export const router = createBrowserRouter([
    {
        path:"/",
        element: <App/>,
        errorElement: <ErrorPage/>,
        children: [
            { path: "/login", element: <LoginPage/>},
            { path: "/register", element: <RegisterPage/>},
            { path: "/home", element: <HomePage/> },
            { path: "/myideas", element: <MyideasPage/> },
            { path: "/workspaces", element: <WorkspacePage/> },
            { path: "/verify-email", element: <VerifyEmailPage/>}
        ]
    }
])