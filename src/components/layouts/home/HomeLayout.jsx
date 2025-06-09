import { Button } from "@/components/ui/button";
import { PATH } from "@/routes/path";
import { Facebook, Instagram, Mail, Phone, Youtube } from "lucide-react";
import React from "react";
import { Outlet, useNavigate, Link } from "react-router-dom";
import logo from "/img/logo.png";

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
          <img src={logo} alt="DalaxyCinema" className="w-[115px] h-[60px] cursor-pointer" onClick={handleLogoClick} />
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
      <footer id="footer" className="bg-[#333333] text-gray-400">
        <div className="mx-auto px-4 sm:px-[45px] md:px-4 max-w-screen-xl lg:max-w-4xl xl:max-w-screen-xl">
          <div className="py-8">
            <div className="grid grid-cols-2 gap-y-4 md:gap-y-0 sm:grid-cols-2 md:grid-cols-4 xl:grid-cols-4">
              {/* Giới thiệu Section */}
              <div>
                <h3 className="text-white mb-3 md:mb-6 text-sm font-semibold">GIỚI THIỆU</h3>
                <ul>
                  <li className="hover:text-[#FD841F] transition-all duration-300">
                    <Link
                      to="/ve-chung-toi"
                      className="leading-10 text-gray-300 text-sm hover:text-[#FD841F] transition-all duration-300 block"
                    >
                      Về chúng tôi
                    </Link>
                  </li>
                  <li className="hover:text-[#FD841F] transition-all duration-300">
                    <Link
                      to="/thoa-thuan-su-dung"
                      className="leading-10 text-gray-300 text-sm hover:text-[#FD841F] transition-all duration-300 block"
                    >
                      Thoả thuận sử dụng
                    </Link>
                  </li>
                  <li className="hover:text-[#FD841F] transition-all duration-300">
                    <Link
                      to="/quy-che-hoat-dong"
                      className="leading-10 text-gray-300 text-sm hover:text-[#FD841F] transition-all duration-300 block"
                    >
                      Quy chế hoạt động
                    </Link>
                  </li>
                  <li className="hover:text-[#FD841F] transition-all duration-300">
                    <Link
                      to="/chinh-sach-bao-mat"
                      className="leading-10 text-gray-300 text-sm hover:text-[#FD841F] transition-all duration-300 block"
                    >
                      Chính sách bảo mật
                    </Link>
                  </li>
                </ul>
              </div>

              {/* Góc điện ảnh Section */}
              <div>
                <h3 className="text-white mb-3 md:mb-6 text-sm font-semibold">GÓC ĐIỆN ẢNH</h3>
                <ul>
                  <li className="hover:text-[#FD841F] transition-all duration-300">
                    <Link
                      to="/dien-anh"
                      className="leading-10 text-gray-300 text-sm hover:text-[#FD841F] transition-all duration-300 block"
                    >
                      Thể loại phim
                    </Link>
                  </li>
                  <li className="hover:text-[#FD841F] transition-all duration-300">
                    <Link
                      to="/binh-luan-phim"
                      className="leading-10 text-gray-300 text-sm hover:text-[#FD841F] transition-all duration-300 block"
                    >
                      Bình luận phim
                    </Link>
                  </li>
                  <li className="hover:text-[#FD841F] transition-all duration-300">
                    <Link
                      to="/movie-blog"
                      className="leading-10 text-gray-300 text-sm hover:text-[#FD841F] transition-all duration-300 block"
                    >
                      Blog điện ảnh
                    </Link>
                  </li>
                  <li className="hover:text-[#FD841F] transition-all duration-300">
                    <Link
                      to="/phim-hay"
                      className="leading-10 text-gray-300 text-sm hover:text-[#FD841F] transition-all duration-300 block"
                    >
                      Phim hay tháng
                    </Link>
                  </li>
                  <li className="hover:text-[#FD841F] transition-all duration-300">
                    <Link
                      to="/phim-imax"
                      className="leading-10 text-gray-300 text-sm hover:text-[#FD841F] transition-all duration-300 block"
                    >
                      Phim IMAX
                    </Link>
                  </li>
                </ul>
              </div>

              {/* Hỗ trợ Section */}
              <div>
                <h3 className="text-white mb-3 md:mb-6 text-sm font-semibold">HỖ TRỢ</h3>
                <ul>
                  <li className="hover:text-[#FD841F] transition-all duration-300">
                    <Link
                      to="/gop-y"
                      className="leading-10 text-gray-300 text-sm hover:text-[#FD841F] transition-all duration-300 block"
                    >
                      Góp ý
                    </Link>
                  </li>
                  <li className="hover:text-[#FD841F] transition-all duration-300">
                    <Link
                      to="/sale-and-service"
                      className="leading-10 text-gray-300 text-sm hover:text-[#FD841F] transition-all duration-300 block"
                    >
                      Sale & Services
                    </Link>
                  </li>
                  <li className="hover:text-[#FD841F] transition-all duration-300">
                    <Link
                      to="/rap-gia-ve"
                      className="leading-10 text-gray-300 text-sm hover:text-[#FD841F] transition-all duration-300 block"
                    >
                      Rạp / Giá vé
                    </Link>
                  </li>
                  <li className="hover:text-[#FD841F] transition-all duration-300">
                    <a
                      href="https://tuyendung-daotao.galaxystudio.vn/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="leading-10 text-gray-300 text-sm hover:text-[#FD841F] transition-all duration-300 block"
                    >
                      Tuyển dụng
                    </a>
                  </li>
                  <li className="hover:text-[#FD841F] transition-all duration-300">
                    <Link
                      to="/hoi-dap"
                      className="leading-10 text-gray-300 text-sm hover:text-[#FD841F] transition-all duration-300 block"
                    >
                      FAQ
                    </Link>
                  </li>
                </ul>
              </div>

              {/* Connect Section */}
              <div id="register" className="grid grid-cols-1 md:grid-cols-[300px_minmax(900px,1fr)_100px] xl:block">
                <div id="connect" className="footer__connect">
                  <div className="mb-5">
                    <img
                      alt="Galaxy - Cinema"
                      loading="lazy"
                      width="94"
                      height="42"
                      src={logo}
                      className="text-transparent grayscale brightness-500"
                    />
                  </div>
                  <ul className="flex gap-4">
                    <li>
                      <a href="https://www.facebook.com/galaxycinevn" target="_blank">
                        <Facebook className="w-8 h-8 text-gray-400 hover:text-[#FD841F] transition-all duration-300" />
                      </a>
                    </li>
                    <li>
                      <a href="https://www.youtube.com/user/galaxymovies" target="_blank">
                        <Youtube className="w-8 h-8 text-gray-400 hover:text-[#FD841F] transition-all duration-300" />
                      </a>
                    </li>
                    <li>
                      <a href="https://www.instagram.com/galaxycinema" target="_blank">
                        <Instagram className="w-8 h-8 text-gray-400 hover:text-[#FD841F] transition-all duration-300" />
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Footer Bottom */}
          <div className="border-t border-gray-700 py-4">
            <div className="flex flex-col md:flex-row justify-start items-center gap-5">
              <div className="footer__logo">
                <img
                  alt="Galaxy - Cinema"
                  loading="lazy"
                  width="94"
                  height="42"
                  src={logo}
                  className="text-transparent grayscale brightness-500"
                />
              </div>
              <div className="text-left text-xs space-y-1">
                <h3 className="text-white text-lg font-semibold">CÔNG TY CỔ PHẦN PHIM TRÍ DŨNG</h3>
                <p>12/8 Nguyễn Trí Dũng, Phường 10, Quận 3, Tp. Hồ Chí Minh, Việt Nam</p>
                <p className="flex items-center gap-2 flex-wrap">
                  <Phone className="w-5 h-5 text-gray-400" />
                  <a href="tel:0999999999" className="hover:text-[#FD841F] transition-all duration-300">
                    0.999.999.999
                  </a>
                  <span>-</span>
                  <Phone className="w-5 h-5 text-gray-400" />
                  <a href="tel:19009999" className="hover:text-[#FD841F] transition-all duration-300">
                    19009999 (9:00 - 22:00)
                  </a>
                  <span>-</span>
                  <Mail className="w-5 h-5 text-gray-400" />
                  <a
                    href="mailto:hotro@dalaxystudio.vn"
                    target="_blank"
                    className="hover:text-[#FD841F] transition-all duration-300"
                  >
                    hotro@dalaxystudio.vn
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default HomeLayout;
