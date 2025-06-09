import React from "react";
import { Outlet } from "react-router-dom";

const AuthLayout = () => {
  return (
    <div className="flex flex-col h-screen">
      <Outlet />
    </div>
  );
};

export default AuthLayout;
