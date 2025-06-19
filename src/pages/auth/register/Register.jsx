import { registerAuthApi } from "@/apis/auth";
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
import ToastNotification from "@/components/ui/toast-noti/ToastNotification";
import { PATH } from "@/routes/path";
import { useMutation } from "@tanstack/react-query";
import { EyeIcon, EyeOffIcon } from "lucide-react";
import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const emailRegex =
  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

const schema = yup
  .object({
    hoTen: yup.string().required("Họ và tên không được để trống"),
    taiKhoan: yup
      .string()
      .required("Tài khoản không được để trống")
      .min(3, "Tài khoản phải có ít nhất 3 ký tự")
      .matches(/^[a-zA-Z0-9]+$/, "Tài khoản chỉ được chứa chữ cái và số"),
    email: yup.string().required("Email không được để trống").matches(emailRegex, "Email không đúng định dạng"),
    soDt: yup
      .string()
      .required("Số điện thoại không được để trống")
      .matches(/^[0-9]{10,11}$/, "Số điện thoại phải có 10-11 chữ số"),
    matKhau: yup.string().required("Mật khẩu không được để trống").min(6, "Mật khẩu phải có ít nhất 6 ký tự"),
    confirmPassword: yup
      .string()
      .required("Confirm Password is required")
      .oneOf([yup.ref("matKhau")], "Mật khẩu không khớp"),
  })
  .required();

const Register = () => {
  const navigate = useNavigate();
  const [passwordVisibility, setPasswordVisibility] = useState(false);
  const [confirmPasswordVisibility, setConfirmPasswordVisibility] = useState(false);
  const [toast, setToast] = useState(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      hoTen: "",
      taiKhoan: "",
      email: "",
      soDt: "",
      matKhau: "",
      maNhom: "GP02",
    },
    resolver: yupResolver(schema),
  });

  // Reset toast sau khi hiển thị
  useEffect(() => {
    if (toast) {
      const timer = setTimeout(() => {
        setToast(null);
      }, toast.autoClose || 6000);
      return () => clearTimeout(timer);
    }
  }, [toast]);

  const {
    mutate: dangKy,
    isPending,
    error,
  } = useMutation({
    mutationFn: registerAuthApi,
    onSuccess: (data) => {
      console.log("Đăng ký thành công:", data);
      setToast({
        type: "success",
        message: "Đăng ký thành công! Bạn sẽ được chuyển hướng đến trang đăng nhập.",
        id: `register-success-${Date.now()}`,
      });
      // Delay chuyển hướng để user có thể thấy toast
      setTimeout(() => {
        navigate(PATH.LOGIN);
      }, 2000);
    },
    onError: (error) => {
      console.log("Lỗi đăng ký:", error);
      setToast({
        type: "error",
        message: "Đăng ký thất bại. Vui lòng kiểm tra lại thông tin hoặc thử lại sau.",
        id: `register-error-${Date.now()}`,
      });
    },
  });

  const onSubmit = (data) => {
    console.log("Form data:", data);
    dangKy(data);
  };

  return (
    <>
      <Card className="w-full max-w-md mx-auto">
        <CardHeader className="px-4 sm:px-6">
          <CardTitle className="text-lg sm:text-xl">Đăng ký</CardTitle>
          <CardDescription className={error ? "text-red-500" : ""}>
            {error ? error.response.data.content : "Đăng ký tham gia hệ thống và trải nghiệm điện ảnh đỉnh cao"}
          </CardDescription>
        </CardHeader>
        <CardContent className="px-4 sm:px-6">
          <form>
            <div className="flex flex-col gap-4">
              {/* Họ và tên */}
              <div className="grid gap-2">
                <Label htmlFor="hoTen" className="text-xs sm:text-sm">
                  Họ và tên
                  <span className="text-red-500 text-xs sm:text-sm">*</span>
                </Label>
                <Input
                  id="hoTen"
                  type="text"
                  placeholder="Nhập họ và tên"
                  className="h-10 text-sm sm:text-base placeholder:text-sm sm:placeholder:text-base"
                  {...register("hoTen")}
                />
                {errors.hoTen && <span className="text-red-500 text-xs sm:text-sm pl-0.5">{errors.hoTen.message}</span>}
              </div>

              {/* Tài khoản */}
              <div className="grid gap-2">
                <Label htmlFor="taiKhoan" className="text-xs sm:text-sm">
                  Tài khoản
                  <span className="text-red-500 text-xs sm:text-sm">*</span>
                </Label>
                <Input
                  id="taiKhoan"
                  type="text"
                  placeholder="Nhập tài khoản"
                  className="h-10 text-sm sm:text-base placeholder:text-sm sm:placeholder:text-base"
                  {...register("taiKhoan")}
                />
                {errors.taiKhoan && (
                  <span className="text-red-500 text-xs sm:text-sm pl-0.5">{errors.taiKhoan.message}</span>
                )}
              </div>

              {/* Email */}
              <div className="grid gap-2">
                <Label htmlFor="email" className="text-xs sm:text-sm">
                  Email
                  <span className="text-red-500 text-xs sm:text-sm">*</span>
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Nhập email"
                  className="h-10 text-sm sm:text-base placeholder:text-sm sm:placeholder:text-base"
                  {...register("email")}
                />
                {errors.email && <span className="text-red-500 text-xs sm:text-sm pl-0.5">{errors.email.message}</span>}
              </div>

              {/* Số điện thoại */}
              <div className="grid gap-2">
                <Label htmlFor="soDt" className="text-xs sm:text-sm">
                  Số điện thoại
                  <span className="text-red-500 text-xs sm:text-sm">*</span>
                </Label>
                <Input
                  id="soDt"
                  type="tel"
                  placeholder="Nhập số điện thoại"
                  className="h-10 text-sm sm:text-base placeholder:text-sm sm:placeholder:text-base"
                  {...register("soDt")}
                />
                {errors.soDt && <span className="text-red-500 text-xs sm:text-sm pl-0.5">{errors.soDt.message}</span>}
              </div>

              {/* Mật khẩu */}
              <div className="grid gap-2">
                <Label htmlFor="matKhau" className="text-xs sm:text-sm">
                  Mật khẩu
                  <span className="text-red-500 text-xs sm:text-sm">*</span>
                </Label>
                <div className="relative">
                  <Input
                    id="matKhau"
                    type={passwordVisibility ? "text" : "password"}
                    placeholder="Nhập mật khẩu"
                    className="h-10 text-sm sm:text-base placeholder:text-sm sm:placeholder:text-base pr-10"
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
                  <span className="text-red-500 text-xs sm:text-sm pl-0.5">{errors.matKhau.message}</span>
                )}
              </div>

              <div className="grid gap-2">
                <Label htmlFor="matKhau" className="text-xs sm:text-sm">
                  Xác nhận mật khẩu
                  <span className="text-red-500 text-xs sm:text-sm">*</span>
                </Label>
                <div className="relative">
                  <Input
                    id="confirmPassword"
                    type={confirmPasswordVisibility ? "text" : "password"}
                    placeholder="Nhập mật khẩu"
                    className="h-10 text-sm sm:text-base placeholder:text-sm sm:placeholder:text-base pr-10"
                    {...register("confirmPassword")}
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="absolute right-2 top-1/2 -translate-y-1/2"
                    onClick={() => setConfirmPasswordVisibility(!confirmPasswordVisibility)}
                  >
                    {confirmPasswordVisibility ? <EyeOffIcon className="h-4 w-4" /> : <EyeIcon className="h-4 w-4" />}
                  </Button>
                </div>
                {errors.confirmPassword && (
                  <span className="text-red-500 text-xs sm:text-sm pl-0.5">{errors.confirmPassword.message}</span>
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
            {isPending ? "Đang đăng ký..." : "Đăng ký"}
          </Button>
          <Button variant="outline" className="w-full h-10 text-sm sm:text-base cursor-pointer">
            Đăng nhập với Google
          </Button>
          <Separator className="my-4" />
          <div className="flex items-center justify-center w-full gap-2">
            <CardDescription className="text-xs sm:text-sm">Bạn đã có tài khoản?</CardDescription>
            <Button
              variant="link"
              className="text-xs sm:text-sm cursor-pointer p-0"
              onClick={() => navigate(PATH.LOGIN)}
            >
              Đăng nhập
            </Button>
          </div>
        </CardFooter>
      </Card>
      {toast && <ToastNotification message={toast.message} type={toast.type} id={toast.id} />}
    </>
  );
};

export default Register;
