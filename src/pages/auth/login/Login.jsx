import { loginAuthApi } from "@/apis/auth";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { ROLE } from "@/constants/role";
import { PATH } from "@/routes/path";
import { setUser } from "@/store/slices/user";
import { useMutation } from "@tanstack/react-query";
import { EyeIcon, EyeOffIcon } from "lucide-react";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [passwordVisibility, setPasswordVisibility] = useState(false);

  const schema = yup
    .object({
      taiKhoan: yup.string().required("Tài khoản không được để trống"),
      matKhau: yup.string().required("Mật khẩu không được để trống"),
    })
    .required();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      taiKhoan: "",
      matKhau: "",
    },
    resolver: yupResolver(schema),
  });

  const {
    mutate: login,
    isPending,
    error,
  } = useMutation({
    mutationFn: loginAuthApi,
    onSuccess: (data) => {
      // console.log(data);
      localStorage.setItem("user", JSON.stringify(data));
      dispatch(setUser(data));
      if (data.maLoaiNguoiDung === ROLE.ADMIN) {
        navigate("/admin");
      }
      if (data.maLoaiNguoiDung === ROLE.USER) {
        navigate("/");
      }
    },
    onError: (error) => {
      console.log(error);
    },
  });

  const onSubmit = (data) => {
    // console.log(data);
    login(data);
  };

  return (
    <Card className="w-full max-w-md">
      <CardHeader className="px-4 sm:px-6">
        <CardTitle className="text-lg sm:text-xl">Đăng nhập</CardTitle>
        <CardDescription className={` ${error ? "text-red-500" : ""}`}>
          {error
            ? "Thông tin đăng nhập không chính xác. Vui lòng kiểm tra lại tài khoản và mật khẩu."
            : "Nhập tài khoản và mật khẩu bên dưới để đăng nhập vào tài khoản của bạn"}
        </CardDescription>
      </CardHeader>
      <CardContent className="px-4 sm:px-6">
        <form>
          <div className="flex flex-col gap-4">
            <div className="grid gap-2">
              <Label htmlFor="taiKhoan" className="text-sm sm:text-base">
                Tài khoản
              </Label>
              <Input
                id="taiKhoan"
                type="text"
                placeholder="Nhập tài khoản"
                className="h-10 text-sm sm:text-base"
                required
                {...register("taiKhoan")}
              />
              {errors.taiKhoan && (
                <span className="text-red-500 text-xs sm:text-sm pl-0.5">{errors.taiKhoan?.message}</span>
              )}
            </div>
            <div className="grid gap-2">
              <div className="flex items-center">
                <Label htmlFor="matKhau" className="text-sm sm:text-base">
                  Mật khẩu
                </Label>
                <a href="#" className="ml-auto text-xs sm:text-sm underline-offset-4 hover:underline">
                  Quên mật khẩu?
                </a>
              </div>
              <div className="relative">
                <Input
                  id="matKhau"
                  type={passwordVisibility ? "text" : "password"}
                  placeholder="Nhập mật khẩu"
                  className="h-10 text-sm sm:text-base pr-10"
                  required
                  {...register("matKhau")}
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="absolute right-2 top-1/2 -translate-y-1/2"
                  onClick={() => setPasswordVisibility(!passwordVisibility)}
                >
                  {passwordVisibility ? <EyeOffIcon className="h-4 w-4" /> : <EyeIcon className="h-4 w-4" />}
                </Button>
              </div>
              {errors.matKhau && (
                <span className="text-red-500 text-xs sm:text-sm pl-0.5">{errors.matKhau?.message}</span>
              )}
            </div>
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex flex-col gap-3 px-4 sm:px-6">
        <Button
          type="submit"
          className="w-full h-10 text-sm sm:text-base cursor-pointer"
          onClick={handleSubmit(onSubmit)}
          disabled={isPending}
        >
          Đăng nhập
        </Button>
        <Button variant="outline" className="w-full h-10 text-sm sm:text-base cursor-pointer">
          Đăng nhập với Google
        </Button>
        <Separator className="my-4" />
        <div className="flex items-center justify-center w-full gap-2">
          <CardDescription className="text-xs sm:text-sm">Bạn chưa có tài khoản?</CardDescription>
          <Button
            variant="link"
            className="text-xs sm:text-sm cursor-pointer p-0"
            onClick={() => navigate(PATH.REGISTER)}
          >
            Đăng ký
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
};

export default Login;
