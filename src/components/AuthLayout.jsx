/* eslint-disable no-unused-vars */

import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";

const AuthLayout = () => {
  return (
    <div className="w-full flex overflow-hidden">
      <Sidebar />
      <div className="w-full ">
        <Outlet />
      </div>
    </div>
  );
};

export default AuthLayout;
