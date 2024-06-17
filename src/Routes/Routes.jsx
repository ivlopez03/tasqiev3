import React from "react";
//import App from "../App";
//import ErrorPage from "../error-page";
//import HomePage from "../pages/HomePage/HomePage";
//import MyideasPage from "../pages/MyideasPage/MyideasPage";
//import WorkspacePage from "../pages/WorkspacePage/WorkspacePage";
//import LoginPage from "../pages/auth/Login/LoginPage";
//import RegisterPage from "../pages/auth/Register/RegisterPage";
//import VerifyEmailPage from "../pages/auth/VerifyEmail/VerifyEmailPage"
//import { createBrowserRouter } from "react-router-dom";

const LoginPage = React.lazy(() => import("../pages/auth/Login/LoginPage"));
const RegisterPage = React.lazy(() => import("../pages/auth/Register/RegisterPage"));
const VerifyEmailPage = React.lazy(() => import("../pages/auth/VerifyEmail/VerifyEmailPage"));
const HomePage = React.lazy(() => import("../pages/HomePage/HomePage"));
const MyideasPage = React.lazy(() => import("../pages/MyideasPage/MyideasPage"));
const WorkspacePage = React.lazy(() => import("../pages/WorkspacePage/WorkspacePage"));



export const routesArray = [
    {
        path:"*",
        element: <React.Suspense fallback={<>Loading ...</>}> <HomePage></HomePage></React.Suspense>,
    },
    {
        path:"/login",
        element: <React.Suspense fallback={<>Loading ...</>}> <LoginPage></LoginPage></React.Suspense>,
    },
    {
        path:"/register",
        element: <React.Suspense fallback={<>Loading ...</>}> <RegisterPage></RegisterPage></React.Suspense>,
    },
    {
        path:"/verify-email",
        element: <React.Suspense fallback={<>Loading ...</>}> <VerifyEmailPage></VerifyEmailPage></React.Suspense>,
    },
    {
        path:"/home",
        element: <React.Suspense fallback={<>Loading ...</>}> <HomePage></HomePage></React.Suspense>,
    },
    {
        path:"/myideas",
        element: <React.Suspense fallback={<>Loading ...</>}> <MyideasPage></MyideasPage></React.Suspense>,
    },
    {
        path:"/workspace/:workspaceId",
        element: <React.Suspense fallback={<>Loading ...</>}> <WorkspacePage></WorkspacePage></React.Suspense>,
    }
]


/** 
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

*/