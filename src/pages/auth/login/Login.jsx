import loginAuthApi from "@/apis/auth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ROLE } from "@/constants/role";
import { setUser } from "@/store/slices/user";
import { useMutation } from "@tanstack/react-query";
import React from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

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
    <div>
      <form
        className="max-w-md space-y-3 mx-auto mt-10 p-6 bg-white shadow-md rounded-lg"
        onSubmit={handleSubmit(onSubmit)}
      >
        <h1 className="text-2xl font-bold mb-4 text-center">Đăng nhập</h1>
        <Input name="taiKhoan" placeholder="Vui lòng nhập tài khoản" className="mt-4" {...register("taiKhoan")} />
        <Input name="matKhau" type="password" placeholder="Vui lòng nhập mật khẩu" {...register("matKhau")} />
        <Button className="w-full mt-4" type="submit">
          Đăng nhập
        </Button>
        <div className="text-center mt-4 flex justify-center">
          <p className="pr-1">Chưa có tài khoản?</p>
          <a href="/auth/register" className="text-blue-500 hover:underline">
            Đăng ký ngay
          </a>
        </div>
        <div className="text-center mt-2">
          <a href="/auth/forgot-password" className="text-blue-500 hover:underline">
            Quên mật khẩu?
          </a>
        </div>
        <div className="text-center mt-2">
          <a href="/auth/login-with-google" className="text-blue-500 hover:underline">
            Đăng nhập với Google
          </a>
        </div>
        <div className="text-center mt-2">
          <a href="/auth/login-with-facebook" className="text-blue-500 hover:underline">
            Đăng nhập với Facebook
          </a>
        </div>
      </form>
    </div>
  );
};

export default Login;
