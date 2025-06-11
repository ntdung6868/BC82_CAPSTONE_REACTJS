import React from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { Film, Popcorn, Ticket, Camera, Star } from "lucide-react";
import logo from "/img/logo.png";
import { PATH } from "@/routes/path";
import { useRoleNavigation } from "@/hooks/useRoleNavigation";

const AuthLayout = () => {
  const navigate = useNavigate();
  const { user } = useRoleNavigation(); // Sử dụng custom hook

  const handleLogoClick = () => {
    navigate(PATH.HOME);
  };

  if (user) {
    navigate(PATH.HOME);
  }

  return (
    <div className="flex flex-col items-center min-h-screen  bg-gradient-to-br from-gray-900 via-red-900 to-black relative ">
      <div className="flex flex-col items-center justify-center gap-3 p-6">
        <img
          src={logo}
          alt="DalaxyCinema"
          className="w-[77px] lg:w-[115px] cursor-pointer grayscale brightness-500"
          onClick={handleLogoClick}
        />
        <p className="text-slate-400 text-sm font-medium tracking-wide">Trải nghiệm điện ảnh đỉnh cao</p>
      </div>
      <div className="w-full max-w-md mb-10">
        <Outlet />
      </div>
      <div className="flex flex-col items-center justify-center mt-auto mb-6">
        <div className="flex items-center justify-center gap-4 text-slate-500 text-sm">
          <span className="flex items-center gap-1">
            <Ticket className="w-4 h-4" />
            Đặt vé online
          </span>
          <span className="w-1 h-1 bg-slate-500 rounded-full"></span>
          <span className="flex items-center gap-1">
            <Popcorn className="w-4 h-4" />
            Combo ưu đãi
          </span>
          <span className="w-1 h-1 bg-slate-500 rounded-full"></span>
          <span className="flex items-center gap-1">
            <Star className="w-4 h-4" />
            Phim hay nhất
          </span>
        </div>
        <p className="text-slate-600 text-xs mt-2">© 2025 DalaxyCinema. Bản quyền thuộc về chúng tôi.</p>
      </div>
    </div>
  );
};

export default AuthLayout;
