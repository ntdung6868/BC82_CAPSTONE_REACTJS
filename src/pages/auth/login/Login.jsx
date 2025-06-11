import loginAuthApi from "@/apis/auth";
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
import { ROLE } from "@/constants/role";
import { setUser } from "@/store/slices/user";
import { useMutation } from "@tanstack/react-query";
import { EyeIcon, EyeOffIcon } from "lucide-react";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [passwordVisibility, setPasswordVisibility] = useState(false);

  const { register, handleSubmit } = useForm({
    defaultValues: {
      taiKhoan: "",
      matKhau: "",
    },
  });
  const { mutate: login } = useMutation({
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
    <Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle>Đăng nhập</CardTitle>
        <CardDescription>Nhập tài khoản và mật khẩu bên dưới để đăng nhập vào tài khoản của bạn</CardDescription>
        <CardAction>
          <Button variant="link">Đăng ký</Button>
        </CardAction>
      </CardHeader>
      <CardContent>
        <form>
          <div className="flex flex-col gap-6">
            <div className="grid gap-2">
              <Label htmlFor="email">Tài khoản</Label>
              <Input id="taiKhoan" type="text" placeholder="Nhập tài khoản" required {...register("taiKhoan")} />
            </div>
            <div className="grid gap-2">
              <div className="flex items-center">
                <Label htmlFor="password">Mật khẩu</Label>
                <a href="#" className="ml-auto inline-block text-sm underline-offset-4 hover:underline">
                  Quên mật khẩu?
                </a>
              </div>
              <div className="relative">
                <Input
                  id="matKhau"
                  type={passwordVisibility ? "text" : "password"}
                  placeholder="Vui lòng nhập mật khẩu"
                  required
                  {...register("matKhau")}
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="absolute right-0 top-0"
                  onClick={() => setPasswordVisibility(!passwordVisibility)}
                >
                  {passwordVisibility ? <EyeOffIcon className="h-4 w-4" /> : <EyeIcon className="h-4 w-4" />}
                </Button>
              </div>
            </div>
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex-col gap-2">
        <Button type="submit" className="w-full" onClick={handleSubmit(onSubmit)}>
          Đăng nhập
        </Button>
        <Button variant="outline" className="w-full">
          Đăng nhập với Google
        </Button>
      </CardFooter>
    </Card>
  );
};

export default Login;
