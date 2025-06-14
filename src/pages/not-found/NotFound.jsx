import React from "react";
import { Link } from "react-router-dom";
import { Home, Film, Clapperboard, Ticket } from "lucide-react";
import { PATH } from "@/routes/path";

const NotFound = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-red-900 to-black flex items-center justify-center relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Floating film strips */}
        <div className="absolute top-10 left-10 w-20 h-40 bg-yellow-400 opacity-20 transform rotate-12 animate-pulse"></div>
        <div className="absolute top-32 right-20 w-16 h-32 bg-yellow-400 opacity-20 transform -rotate-12 animate-pulse delay-1000"></div>
        <div className="absolute bottom-20 left-1/4 w-24 h-48 bg-yellow-400 opacity-20 transform rotate-45 animate-pulse delay-2000"></div>

        {/* Spotlight effects */}
        <div className="absolute top-0 left-1/4 w-32 h-32 bg-yellow-300 rounded-full blur-3xl opacity-30 animate-ping"></div>
        <div className="absolute bottom-1/4 right-1/4 w-40 h-40 bg-red-400 rounded-full blur-3xl opacity-20 animate-ping delay-1000"></div>
      </div>

      <div className="text-center z-10 px-4 max-w-4xl mx-auto">
        {/* Main 404 Display */}
        <div className="relative mb-8">
          {/* Large 404 Text */}
          <h1 className="text-[9rem] md:text-[12rem] font-bold text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-yellow-400 to-red-600 animate-pulse mb-4 flex items-center justify-center gap-4">
            404
          </h1>

          {/* Film reel icon */}
          <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 -translate-y-4">
            <Film className="w-16 h-16 text-yellow-400 animate-bounce" />
          </div>
        </div>

        {/* Error Message */}
        <div className="mb-8">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Trang Không Tìm Thấy</h2>
          <p className="text-lg text-gray-300 delay-700">
            Thật tiếc, trang bạn đang tìm kiếm không tồn tại trong rạp của chúng tôi.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center delay-1000">
          <Link
            to={PATH.HOME}
            className="relative inline-flex items-center gap-2 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white font-semibold py-4 px-8 rounded-lg transform transition-all duration-300 hover:scale-105 hover:shadow-2xl shadow-red-500/50"
          >
            <Home className="w-5 h-5" />
            Quay Lại Trang Chủ
          </Link>

          <Link
            to={PATH.TICKET}
            className="relative inline-flex items-center gap-2 bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700 text-black font-semibold py-4 px-8 rounded-lg transform transition-all duration-300 hover:scale-105 hover:shadow-2xl shadow-yellow-500/50"
          >
            <Ticket className="w-5 h-5" />
            Tìm Vé Phim Ngay
          </Link>
        </div>

        {/* Decorative Cinema Elements */}
        <div className="mt-12 flex justify-center items-center gap-8 opacity-60">
          <Clapperboard className="w-8 h-8 text-yellow-400 animate-pulse" />
          <div className="w-2 h-2 bg-red-500 rounded-full animate-ping"></div>
          <Film className="w-8 h-8 text-red-400 animate-pulse delay-300" />
          <div className="w-2 h-2 bg-yellow-500 rounded-full animate-ping delay-500"></div>
          <Ticket className="w-8 h-8 text-yellow-400 animate-pulse delay-700" />
        </div>

        {/* Bottom Cinema Strip */}
        <div className="mt-16 relative">
          <div className="h-1 bg-gradient-to-r from-transparent via-yellow-400 to-transparent animate-pulse"></div>
          <div className="flex justify-center mt-4 gap-2">
            {[...Array(20)].map((_, i) => (
              <div
                key={i}
                className="w-2 h-6 bg-yellow-400 opacity-60 animate-pulse"
                style={{ animationDelay: `${i * 100}ms` }}
              ></div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
