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
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-red-900 to-black relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-transparent via-white to-transparent transform -skew-y-12"></div>
        <div className="absolute bottom-0 right-0 w-full h-full bg-gradient-to-l from-transparent via-white to-transparent transform skew-y-12"></div>
      </div>

      {/* Floating Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Film Icons */}
        <Film className="absolute top-20 left-20 w-8 h-8 text-purple-400/30 animate-pulse" />
        <Film className="absolute top-40 right-32 w-6 h-6 text-blue-400/30 animate-pulse delay-1000" />
        <Film className="absolute bottom-32 left-16 w-10 h-10 text-pink-400/30 animate-pulse delay-2000" />

        {/* Popcorn Icons */}
        <Popcorn className="absolute top-32 right-20 w-7 h-7 text-yellow-400/30 animate-bounce" />
        <Popcorn className="absolute bottom-40 right-40 w-9 h-9 text-orange-400/30 animate-bounce delay-500" />

        {/* Ticket Icons */}
        <Ticket className="absolute top-60 left-40 w-8 h-8 text-green-400/30 animate-pulse delay-1500" />
        <Ticket className="absolute bottom-20 right-20 w-6 h-6 text-cyan-400/30 animate-pulse delay-3000" />

        {/* Camera Icons */}
        <Camera className="absolute top-80 right-60 w-7 h-7 text-red-400/30 animate-bounce delay-700" />
        <Camera className="absolute bottom-60 left-60 w-9 h-9 text-indigo-400/30 animate-bounce delay-1200" />

        {/* Star Icons */}
        <Star className="absolute top-24 left-60 w-5 h-5 text-yellow-300/40 animate-pulse" />
        <Star className="absolute top-72 right-24 w-4 h-4 text-yellow-300/40 animate-pulse delay-500" />
        <Star className="absolute bottom-24 left-32 w-6 h-6 text-yellow-300/40 animate-pulse delay-1000" />
        <Star className="absolute bottom-80 right-80 w-5 h-5 text-yellow-300/40 animate-pulse delay-1500" />
      </div>

      {/* Spotlight Effect */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-96 h-96 bg-gradient-to-bl from-white/5 to-transparent rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-gradient-to-bl from-purple-500/10 to-transparent rounded-full blur-2xl"></div>
        <div className="absolute top-1/2 left-0 w-48 h-48 bg-gradient-to-bl from-blue-500/10 to-transparent rounded-full blur-2xl"></div>
      </div>

      {/* Main Content Container */}
      <div className="relative z-10 min-h-screen flex flex-col">
        {/* Main Content Area */}
        <main className="flex-1 flex flex-col items-center justify-center pb-20">
          <div className="flex flex-col items-center justify-center gap-3 p-6">
            <img
              src={logo}
              alt="DalaxyCinema"
              className="w-[77px] lg:w-[115px] cursor-pointer grayscale brightness-500"
              onClick={handleLogoClick}
            />
            <p className="text-slate-400 text-sm font-medium tracking-wide">Trải nghiệm điện ảnh đỉnh cao</p>
          </div>
          <div className="w-full max-w-md">
            {/* Glass Effect Container */}
            <div className="backdrop-blur-xl bg-white/10 border border-white/20 rounded-2xl p-8 shadow-2xl">
              <div className="z-10 flex flex-col items-center justify-center">
                <Outlet />
              </div>
            </div>
          </div>
        </main>

        {/* Footer */}
        <footer className="p-6 text-center">
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
        </footer>
      </div>
    </div>
  );
};

export default AuthLayout;
