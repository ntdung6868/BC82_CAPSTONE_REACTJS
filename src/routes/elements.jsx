import HomeLayout from "@/components/layouts/home/HomeLayout";
import React from "react";
import { PATH } from "./path";
import HomePage from "@/pages/home/HomePage";
import MovieDetails from "@/pages/movie-details/MovieDetails";
import AuthLayout from "@/components/layouts/auth/AuthLayout";
import Login from "@/pages/auth/login/Login";
import Register from "@/pages/auth/register/Register";
import DashboardLayout from "@/components/layouts/dashboard/DashboardLayout";
import MovieManagement from "@/pages/admin/movie-management/MovieManagement";
import UserManagement from "@/pages/admin/user-management/UserManagement";
import Dashboard from "@/pages/admin/dashboard/Dashboard";
import { useRoutes } from "react-router-dom";
import NotFound from "@/pages/not-found/NotFound";
import ShowtimeManagement from "@/pages/admin/showtime-management/ShowtimeManagement";

const useRouterElements = () => {
  const elements = useRoutes([
    {
      path: PATH.HOME,
      element: <HomeLayout />,
      children: [
        {
          index: true,
          element: <HomePage />,
        },
        {
          path: `${PATH.MOVIE_DETAILS}/:id`,
          element: <MovieDetails />,
        },
      ],
    },
    {
      path: "",
      element: <AuthLayout />,
      children: [
        {
          path: PATH.LOGIN,
          element: <Login />,
        },
        {
          path: PATH.REGISTER,
          element: <Register />,
        },
      ],
    },
    {
      path: PATH.ADMIN,
      element: <DashboardLayout />,
      children: [
        {
          index: true,
          element: <Dashboard />,
        },
        {
          path: PATH.DASHBOARD,
          element: <Dashboard />,
        },
        {
          path: PATH.MOVIE_MANAGEMENT,
          element: <MovieManagement />,
        },
        {
          path: `${PATH.MOVIE_MANAGEMENT}/page/:page`, // Thêm route cho phân trang
          element: <MovieManagement />,
        },
        {
          path: PATH.USER_MANAGEMENT,
          element: <UserManagement />,
        },
        {
          path: `${PATH.USER_MANAGEMENT}/page/:page`, // Thêm route cho phân trang
          element: <UserManagement />,
        },
        {
          path: `${PATH.SHOWTIME_MANAGEMENT}/:idFilm`,
          element: <ShowtimeManagement />,
        },
      ],
    },
    {
      path: "*",
      element: <NotFound />,
    },
  ]);

  return elements;
};

export default useRouterElements;
