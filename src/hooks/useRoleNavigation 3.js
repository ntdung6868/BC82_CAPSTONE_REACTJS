import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { setUser } from "@/store/slices/user";
import { ROLE } from "@/constants/role";
import { PATH } from "@/routes/path";

export const useRoleNavigation = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const [isUserLoaded, setIsUserLoaded] = useState(false);

  // Khôi phục user từ localStorage
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        dispatch(setUser(parsedUser));
      } catch (error) {
        console.error("Error parsing user from localStorage:", error);
        localStorage.removeItem("user");
      }
    }
    // Đánh dấu đã kiểm tra localStorage
    setIsUserLoaded(true);
  }, [dispatch]);

  // Điều hướng dựa trên vai trò - chỉ chạy sau khi đã load user
  useEffect(() => {
    if (!isUserLoaded) return; // Chờ cho đến khi đã kiểm tra localStorage

    if (user) {
      // Nếu user là admin và đang ở trang non-admin, chuyển đến admin
      if (user.maLoaiNguoiDung === ROLE.ADMIN && !location.pathname.startsWith("/admin")) {
        console.log("Redirecting admin to /admin");
        navigate(PATH.ADMIN);
      }
      // Nếu user là user thường và đang ở trang admin, chuyển về home
      else if (user.maLoaiNguoiDung === ROLE.USER && location.pathname.startsWith("/admin")) {
        console.log("Redirecting user to home");
        navigate(PATH.HOME);
      }
    } else {
      // Nếu chưa đăng nhập và đang ở trang admin, chuyển về login
      if (location.pathname.startsWith("/admin")) {
        console.log("Redirecting to login");
        navigate(PATH.LOGIN);
      }
    }
  }, [user, navigate, location.pathname, isUserLoaded]);

  return { user };
};
