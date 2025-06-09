import { Button } from "@/components/ui/button";
import { PATH } from "@/routes/path";
import {
  Facebook,
  Instagram,
  Mail,
  Phone,
  Youtube,
  CircleCheckIcon,
  CircleHelpIcon,
  CircleIcon,
  MenuIcon,
  ChevronDown,
} from "lucide-react";
import React, { useState } from "react";
import { Outlet, useNavigate, Link } from "react-router-dom";
import logo from "/img/logo.png";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuIndicator,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  NavigationMenuViewport,
} from "@/components/ui/navigation-menu";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

const HomeLayout = () => {
  const navigate = useNavigate();
  const [openSection, setOpenSection] = useState(null);

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
          <div className="hidden lg:block">
            <NavigationMenu viewport={false}>
              <NavigationMenuList>
                <NavigationMenuItem>
                  <NavigationMenuTrigger>Phim</NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <ul className="grid w-[200px] gap-4">
                      <li>
                        <NavigationMenuLink asChild>
                          <Link href={PATH.MOVIES}>PHIM ĐANG CHIẾU</Link>
                        </NavigationMenuLink>
                        <NavigationMenuLink asChild>
                          <Link href={PATH.COMING_SOON}>PHIM SẮP CHIẾU</Link>
                        </NavigationMenuLink>
                      </li>
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <NavigationMenuTrigger>Sản Phẩm</NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <ul className="grid w-[200px] gap-4">
                      <li>
                        <NavigationMenuLink asChild>
                          <Link href="#">Anh Trai Vượt Ngàn Chông Gai</Link>
                        </NavigationMenuLink>
                        <NavigationMenuLink asChild>
                          <Link href="#">Galaxy Merch</Link>
                        </NavigationMenuLink>
                      </li>
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <NavigationMenuTrigger>Góc Điên Ảnh</NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <ul className="grid w-[200px] gap-4">
                      <li>
                        <NavigationMenuLink asChild>
                          <Link href="#">Thể Loại Phim</Link>
                        </NavigationMenuLink>
                        <NavigationMenuLink asChild>
                          <Link href="#">Diễn Viên</Link>
                        </NavigationMenuLink>
                        <NavigationMenuLink asChild>
                          <Link href="#">Đạo Diễn</Link>
                        </NavigationMenuLink>
                        <NavigationMenuLink asChild>
                          <Link href="#">Bình Luận Phim</Link>
                        </NavigationMenuLink>
                        <NavigationMenuLink asChild>
                          <Link href="#">Blog Điện Ảnh</Link>
                        </NavigationMenuLink>
                      </li>
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <NavigationMenuTrigger>Sự Kiện</NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <ul className="grid w-[200px] gap-4">
                      <li>
                        <NavigationMenuLink asChild>
                          <Link href="#">Ưu Đãi</Link>
                        </NavigationMenuLink>
                        <NavigationMenuLink asChild>
                          <Link href="#">Phim Hay Tháng</Link>
                        </NavigationMenuLink>
                        <NavigationMenuLink asChild>
                          <Link href="#">Anh Trai Vượt Ngàn Chông Gai</Link>
                        </NavigationMenuLink>
                        <NavigationMenuLink asChild>
                          <Link href="#">Galaxy Merch</Link>
                        </NavigationMenuLink>
                      </li>
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <NavigationMenuTrigger>Rạp/Giá Vé</NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <ul className="grid w-[300px] gap-2 p-2 max-h-[325px] overflow-y-auto -mr-2">
                      <li>
                        <NavigationMenuLink asChild>
                          <Link href="#">Dalaxy Nguyễn Du</Link>
                        </NavigationMenuLink>
                      </li>
                      <li>
                        <NavigationMenuLink asChild>
                          <Link href="#">Dalaxy Sala</Link>
                        </NavigationMenuLink>
                      </li>
                      <li>
                        <NavigationMenuLink asChild>
                          <Link href="#">Dalaxy Tân Bình</Link>
                        </NavigationMenuLink>
                      </li>
                      <li>
                        <NavigationMenuLink asChild>
                          <Link href="#">Dalaxy Kinh Dương Vương</Link>
                        </NavigationMenuLink>
                      </li>
                      <li>
                        <NavigationMenuLink asChild>
                          <Link href="#">Dalaxy Quang Trung</Link>
                        </NavigationMenuLink>
                      </li>
                      <li>
                        <NavigationMenuLink asChild>
                          <Link href="#">Dalaxy Bến Tre</Link>
                        </NavigationMenuLink>
                      </li>
                      <li>
                        <NavigationMenuLink asChild>
                          <Link href="#">Dalaxy Mipec Long Biên</Link>
                        </NavigationMenuLink>
                      </li>
                      <li>
                        <NavigationMenuLink asChild>
                          <Link href="#">Dalaxy Đà Nẵng</Link>
                        </NavigationMenuLink>
                      </li>
                      <li>
                        <NavigationMenuLink asChild>
                          <Link href="#">Dalaxy Cà Mau</Link>
                        </NavigationMenuLink>
                      </li>
                      <li>
                        <NavigationMenuLink asChild>
                          <Link href="#">Dalaxy Trung Chánh</Link>
                        </NavigationMenuLink>
                      </li>
                      <li>
                        <NavigationMenuLink asChild>
                          <Link href="#">Dalaxy Huỳnh Tấn Phát</Link>
                        </NavigationMenuLink>
                      </li>
                      <li>
                        <NavigationMenuLink asChild>
                          <Link href="#">Dalaxy Vinh</Link>
                        </NavigationMenuLink>
                      </li>
                      <li>
                        <NavigationMenuLink asChild>
                          <Link href="#">Dalaxy Hải Phòng</Link>
                        </NavigationMenuLink>
                      </li>
                      <li>
                        <NavigationMenuLink asChild>
                          <Link href="#">Dalaxy Nguyễn Văn Quá</Link>
                        </NavigationMenuLink>
                      </li>
                      <li>
                        <NavigationMenuLink asChild>
                          <Link href="#">Dalaxy Buôn Ma Thuột</Link>
                        </NavigationMenuLink>
                      </li>
                      <li>
                        <NavigationMenuLink asChild>
                          <Link href="#">Dalaxy Long Xuyên</Link>
                        </NavigationMenuLink>
                      </li>
                      <li>
                        <NavigationMenuLink asChild>
                          <Link href="#">Dalaxy Co.opXtra Linh Trung</Link>
                        </NavigationMenuLink>
                      </li>
                      <li>
                        <NavigationMenuLink asChild>
                          <Link href="#">Dalaxy Nha Trang Center</Link>
                        </NavigationMenuLink>
                      </li>
                      <li>
                        <NavigationMenuLink asChild>
                          <Link href="#">Dalaxy Trường Chinh</Link>
                        </NavigationMenuLink>
                      </li>
                      <li>
                        <NavigationMenuLink asChild>
                          <Link href="#">Dalaxy GO! Mall Bà Rịa</Link>
                        </NavigationMenuLink>
                      </li>
                      <li>
                        <NavigationMenuLink asChild>
                          <Link href="#">Dalaxy Cine+ Gold Coast Nha Trang</Link>
                        </NavigationMenuLink>
                      </li>
                      <li>
                        <NavigationMenuLink asChild>
                          <Link href="#">Dalaxy Cine+ Thiso Phan Huy Ích</Link>
                        </NavigationMenuLink>
                      </li>
                      <li>
                        <NavigationMenuLink asChild>
                          <Link href="#">Dalaxy Aeon Mall Huế</Link>
                        </NavigationMenuLink>
                      </li>
                      <li>
                        <NavigationMenuLink asChild>
                          <Link href="#">Dalaxy Parc Mall Q8</Link>
                        </NavigationMenuLink>
                      </li>
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
          </div>

          <div className="flex gap-4">
            <div className="flex items-center gap-4">
              <Button variant="outline" className="text-sm cursor-pointer" onClick={handleLogin}>
                Đăng nhập
              </Button>
              <Button className="text-sm cursor-pointer" onClick={handleRegister}>
                Đăng ký
              </Button>
            </div>
            {/* Mobile Navigation */}
            <div className="flex items-center gap-4 lg:hidden ">
              <Sheet>
                <SheetTrigger>
                  <MenuIcon className="w-6 h-6" />
                </SheetTrigger>
                <SheetContent side="right" className="w-[250px] p-5">
                  <div className="flex flex-col space-y-4 mt-10">
                    {/* Phim Section */}
                    <div className="border-b pb-2">
                      <div
                        className="flex items-center justify-between cursor-pointer"
                        onClick={() => setOpenSection("phim")}
                      >
                        <p className="font-semibold">Phim</p>
                        <ChevronDown
                          className={`w-4 h-4 transition-transform ${openSection === "phim" ? "rotate-180" : ""}`}
                        />
                      </div>
                      {openSection === "phim" && (
                        <div className="ml-2 flex flex-col space-y-1 text-sm mt-2">
                          <Link to={PATH.MOVIES} className="hover:text-[#FD841F]">
                            PHIM ĐANG CHIẾU
                          </Link>
                          <Link to={PATH.COMING_SOON} className="hover:text-[#FD841F]">
                            PHIM SẮP CHIẾU
                          </Link>
                        </div>
                      )}
                    </div>

                    {/* Sản Phẩm Section */}
                    <div className="border-b pb-2">
                      <div
                        className="flex items-center justify-between cursor-pointer"
                        onClick={() => setOpenSection("sanpham")}
                      >
                        <p className="font-semibold">Sản Phẩm</p>
                        <ChevronDown
                          className={`w-4 h-4 transition-transform ${openSection === "sanpham" ? "rotate-180" : ""}`}
                        />
                      </div>
                      {openSection === "sanpham" && (
                        <div className="ml-2 flex flex-col space-y-1 text-sm mt-2">
                          <Link to="#" className="hover:text-[#FD841F]">
                            Anh Trai Vượt Ngàn Chông Gai
                          </Link>
                          <Link to="#" className="hover:text-[#FD841F]">
                            Galaxy Merch
                          </Link>
                        </div>
                      )}
                    </div>

                    {/* Góc Điện Ảnh Section */}
                    <div className="border-b pb-2">
                      <div
                        className="flex items-center justify-between cursor-pointer"
                        onClick={() => setOpenSection("gocdienanh")}
                      >
                        <p className="font-semibold">Góc Điện Ảnh</p>
                        <ChevronDown
                          className={`w-4 h-4 transition-transform ${openSection === "gocdienanh" ? "rotate-180" : ""}`}
                        />
                      </div>
                      {openSection === "gocdienanh" && (
                        <div className="ml-2 flex flex-col space-y-1 text-sm mt-2">
                          <Link to="#" className="hover:text-[#FD841F]">
                            Thể Loại Phim
                          </Link>
                          <Link to="#" className="hover:text-[#FD841F]">
                            Diễn Viên
                          </Link>
                          <Link to="#" className="hover:text-[#FD841F]">
                            Đạo Diễn
                          </Link>
                          <Link to="#" className="hover:text-[#FD841F]">
                            Bình Luận Phim
                          </Link>
                          <Link to="#" className="hover:text-[#FD841F]">
                            Blog Điện Ảnh
                          </Link>
                        </div>
                      )}
                    </div>

                    {/* Sự Kiện Section */}
                    <div className="border-b pb-2">
                      <div
                        className="flex items-center justify-between cursor-pointer"
                        onClick={() => setOpenSection("sukien")}
                      >
                        <p className="font-semibold">Sự Kiện</p>
                        <ChevronDown
                          className={`w-4 h-4 transition-transform ${openSection === "sukien" ? "rotate-180" : ""}`}
                        />
                      </div>
                      {openSection === "sukien" && (
                        <div className="ml-2 flex flex-col space-y-1 text-sm mt-2">
                          <Link to="#" className="hover:text-[#FD841F]">
                            Ưu Đãi
                          </Link>
                          <Link to="#" className="hover:text-[#FD841F]">
                            Phim Hay Tháng
                          </Link>
                        </div>
                      )}
                    </div>

                    {/* Rạp/Giá Vé Section */}
                    <div className="border-b pb-2">
                      <div
                        className="flex items-center justify-between cursor-pointer"
                        onClick={() => setOpenSection("rapgiave")}
                      >
                        <p className="font-semibold">Rạp/Giá Vé</p>
                        <ChevronDown
                          className={`w-4 h-4 transition-transform ${openSection === "rapgiave" ? "rotate-180" : ""}`}
                        />
                      </div>
                      {openSection === "rapgiave" && (
                        <div className="ml-2 flex flex-col space-y-1 text-sm mt-2 max-h-[200px] overflow-y-auto">
                          <Link to="#" className="hover:text-[#FD841F]">
                            Dalaxy Nguyễn Du
                          </Link>
                          <Link to="#" className="hover:text-[#FD841F]">
                            Dalaxy Sala
                          </Link>
                          <Link to="#" className="hover:text-[#FD841F]">
                            Dalaxy Tân Bình
                          </Link>
                          <Link to="#" className="hover:text-[#FD841F]">
                            Dalaxy Kinh Dương Vương
                          </Link>
                          <Link to="#" className="hover:text-[#FD841F]">
                            Dalaxy Nha Trang Center
                          </Link>
                          <Link to="#" className="hover:text-[#FD841F]">
                            Dalaxy Trường Chinh
                          </Link>
                          <Link to="#" className="hover:text-[#FD841F]">
                            Dalaxy GO! Mall Bà Rịa
                          </Link>
                          <Link to="#" className="hover:text-[#FD841F]">
                            Dalaxy Cine+ Gold Coast Nha Trang
                          </Link>
                          <Link to="#" className="hover:text-[#FD841F]">
                            Dalaxy Cine+ Thiso Phan Huy Ích
                          </Link>
                          <Link to="#" className="hover:text-[#FD841F]">
                            Dalaxy Aeon Mall Huế
                          </Link>
                          <Link to="#" className="hover:text-[#FD841F]">
                            Dalaxy Parc Mall Q8
                          </Link>
                        </div>
                      )}
                    </div>
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </div>
      </header>
      <Outlet />
      <footer id="footer" className="bg-[#333333] text-gray-400">
        <div className="container mx-auto px-4 sm:px-[45px] md:px-4 lg:max-w-4xl xl:max-w-screen-xl">
          <div className="py-8">
            <div className="grid grid-cols-2 gap-y-4 md:gap-y-0 sm:grid-cols-2 lg:grid-cols-4 ">
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

              <div className="flex flex-col gap-8">
                <img
                  alt="Galaxy - Cinema"
                  loading="lazy"
                  width="94"
                  height="42"
                  src={logo}
                  className="text-transparent grayscale brightness-500"
                />

                <ul className="flex gap-4">
                  <li>
                    <a href="https://www.facebook.com/999999" target="_blank">
                      <Facebook className="w-8 h-8 text-gray-400 hover:text-[#FD841F] transition-all duration-300" />
                    </a>
                  </li>
                  <li>
                    <a href="https://www.youtube.com/999999" target="_blank">
                      <Youtube className="w-8 h-8 text-gray-400 hover:text-[#FD841F] transition-all duration-300" />
                    </a>
                  </li>
                  <li>
                    <a href="https://www.instagram.com/999999" target="_blank">
                      <Instagram className="w-8 h-8 text-gray-400 hover:text-[#FD841F] transition-all duration-300" />
                    </a>
                  </li>
                </ul>
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
