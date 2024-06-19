/* eslint-disable no-unused-vars */
import React,{lazy} from 'react';

const LoginPage = lazy(() => import("../pages/auth/Login/LoginPage"));
const RegisterPage = lazy(() => import("../pages/auth/Register/RegisterPage"));
const VerifyEmailPage = lazy(() => import("../pages/auth/VerifyEmail/VerifyEmailPage"));
const HomePage = lazy(() => import("../pages/HomePage/HomePage"));
const MyideasPage = lazy(() => import("../pages/MyideasPage/MyideasPage"));
const WorkspacePage = lazy(() => import("../pages/WorkspacePage/WorkspacePage"));

import AuthLayout from '../components/AuthLayout';
import UnauthLayout from '../components/UnauthLayout';



const routes = [
    {
        path:'/',
        element: <AuthLayout/>,
        children: [
            { path:'home', element: <HomePage/> },
            { path: '/workspace/:workspaceId', element: <WorkspacePage/> },
            { path: '/myideas', element: <MyideasPage/> }
        ],
    },
    {
        path: '/',
        element:<UnauthLayout />,
        children: [
            { path: '/login', element: <LoginPage/> },
            { path: '/register', element: <RegisterPage/> },
            { path: '/verify-email', element: <VerifyEmailPage/>}
        ],
    },
];

export default routes;
