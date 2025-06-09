import { Button } from "@/components/ui/button";
import { PATH } from "@/routes/path";
import { Facebook, Instagram, Mail, Phone, Youtube } from "lucide-react";
import React from "react";
import { Outlet, useNavigate, Link } from "react-router-dom";

const HomeLayout = () => {
  const navigate = useNavigate();

  const handleLogoClick = () => {
    navigate(PATH.HOME);
  };

  const handleLogin = () => {
    navigate(PATH.LOGIN);
  };

  const handleRegister = () => {
    navigate(PATH.REGISTER);
  };

  return (
    <div className=" flex flex-col h-screen">
      <header className="h-[115px] border-2 border-b-gray-200 flex items-center">
        <div className="container h-full mx-auto flex items-center justify-between">
          <img
            src="/public/img/logo.png"
            alt="DalaxyCinema"
            className="w-[115px] h-[60px] cursor-pointer"
            onClick={handleLogoClick}
          />
          <div className="flex items-center gap-4">
            <Button variant="outline" className="text-sm cursor-pointer" onClick={handleLogin}>
              Login
            </Button>
            <Button className="text-sm cursor-pointer" onClick={handleRegister}>
              Sign Up
            </Button>
          </div>
        </div>
      </header>
      <Outlet />
      <footer className="h-[115px] bg-gray-200">Footer</footer>
    </div>
  );
};

export default HomeLayout;
