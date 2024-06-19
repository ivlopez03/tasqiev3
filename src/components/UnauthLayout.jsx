/* eslint-disable no-unused-vars */
import React from "react";
import { Outlet } from "react-router-dom";

const UnauthLayout = () => {
    return(
        <div className="w-full h-screen flex self-center place-content-center place-items-center">
            <Outlet />
        </div>
    );
};

export default UnauthLayout;