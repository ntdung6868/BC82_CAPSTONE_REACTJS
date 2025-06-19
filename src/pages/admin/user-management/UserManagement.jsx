import { addUserApi, deleteUserApi, listUserPaginationApi } from "@/apis/user";
import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/ui/data-table";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import ToastNotification from "@/components/ui/toast-noti/ToastNotification";
import { cn } from "@/lib/utils";
import { IconEdit, IconTrash } from "@tabler/icons-react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Plus } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";

const UserManagement = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { page } = useParams(); // Lấy tham số page từ URL
  const navigate = useNavigate(); // Sử dụng useNavigate để điều hướng
  const [toast, setToast] = useState(null);

  // Xác định currentPage từ URL, mặc định là 1 nếu không có page
  const [currentPage, setCurrentPage] = useState(page ? parseInt(page, 10) : 1);
  const itemsPerPage = 8;

  const {
    handleSubmit,
    register,
    setValue,
    watch,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      taiKhoan: "",
      matKhau: "",
      email: "",
      soDt: "",
      hoTen: "",
      maLoaiNguoiDung: "KhachHang",
    },
  });

  // Truy vấn danh sách người dùng
  const { data, isLoading, error, refetch } = useQuery({
    queryFn: () => listUserPaginationApi({ soTrang: currentPage, soPhanTuTrenTrang: itemsPerPage, maNhom: "GP02" }),
    queryKey: ["userList", { soTrang: currentPage, soPhanTuTrenTrang: itemsPerPage, maNhom: "GP02" }],
    keepPreviousData: true, // Giữ dữ liệu cũ trong khi tải trang mới
  });

  // Lấy totalPages từ API
  const totalPages = data?.totalPages || 1;
  const totalCount = data?.totalCount || 0;

  // Đồng bộ currentPage với URL
  useEffect(() => {
    const pageNum = page ? parseInt(page, 10) : 1;
    if (pageNum !== currentPage) {
      setCurrentPage(pageNum);
    }
  }, [page]);

  // Cập nhật URL khi currentPage thay đổi
  useEffect(() => {
    const newUrl = currentPage === 1 ? "/admin/user-management" : `/admin/user-management/page/${currentPage}`;
    navigate(newUrl, { replace: true });
  }, [currentPage, navigate]);

  // Reset toast sau khi hiển thị
  useEffect(() => {
    if (toast) {
      const timer = setTimeout(() => {
        setToast(null);
      }, toast.autoClose || 6000); // Reset sau autoClose
      return () => clearTimeout(timer);
    }
  }, [toast]);

  const { mutate: handleAddUser, isPending } = useMutation({
    mutationFn: (formData) => {
      return addUserApi(formData);
    },
    onSuccess: (response) => {
      console.log("User added successfully:", response);
      setToast({
        type: "success",
        message: "Thêm người dùng thành công!",
        id: `add-user-${Date.now()}`, // Thêm ID duy nhất cho toast thêm người dùng
      });
      refetch();
    },
    onError: (error) => {
      console.error("Error adding user:", error);
      setToast({
        type: "error",
        message: "Lỗi khi thêm người dùng!",
        id: `add-user-error-${Date.now()}`,
      });
    },
  });

  const { mutate: handleDeleteUser, isPending: isDeleting } = useMutation({
    mutationFn: (taiKhoan) => deleteUserApi(taiKhoan),
    onSuccess: () => {
      setToast({
        type: "success",
        message: "Xóa người dùng thành công!",
        id: `delete-user-${Date.now()}`, // Tạo ID duy nhất cho mỗi lần xóa
      });
      refetch();
    },
    onError: (error) => {
      console.error("Error deleting user:", error);
      setToast({
        type: "error",
        message: "Lỗi khi xóa người dùng!",
        id: `delete-user-error-${Date.now()}`,
      });
    },
  });

  const onDeleteUser = (taiKhoan) => {
    if (window.confirm("Bạn có chắc chắn muốn xóa người dùng này?")) {
      handleDeleteUser(taiKhoan);
    }
  };

  const onSubmit = (data) => {
    const userData = {
      taiKhoan: data.taiKhoan,
      matKhau: data.matKhau,
      email: data.email,
      soDt: data.soDt,
      maNhom: "GP02",
      hoTen: data.hoTen,
      maLoaiNguoiDung: data.maLoaiNguoiDung,
    };
    handleAddUser(userData);
    reset();
    setIsOpen(false);
  };

  // Logic hiển thị các nút trang
  const getPaginationItems = () => {
    const items = [];

    for (let i = 1; i <= totalPages; i++) {
      items.push(
        <PaginationItem key={i}>
          <PaginationLink
            href="#"
            isActive={currentPage === i}
            onClick={(e) => {
              e.preventDefault();
              setCurrentPage(i);
            }}
          >
            {i}
          </PaginationLink>
        </PaginationItem>
      );
    }
    return items;
  };

  return (
    <>
      <div className="flex items-center justify-between">
        <h1 className="font-bold">Danh sách người dùng</h1>
        <Button
          size="lg"
          onClick={() => {
            setIsOpen(true);
          }}
        >
          <Plus />
          Thêm người dùng
        </Button>
      </div>
      <div className="mt-4">
        <DataTable
          columns={[
            {
              accessorKey: "taiKhoan",
              header: () => <div className="text-left">Tài khoản</div>,
              cell: ({ row }) => <div className="font-semibold text-left">{row.original.taiKhoan}</div>,
            },
            {
              accessorKey: "hoTen",
              header: () => <div className="text-left">Họ tên</div>,
              cell: ({ row }) => (
                <div className="max-w-[200px] overflow-hidden text-ellipsis text-left">{row.original.hoTen}</div>
              ),
            },
            {
              accessorKey: "email",
              header: () => <div className="text-left">Email</div>,
              cell: ({ row }) => (
                <div className="max-w-[250px] overflow-hidden text-ellipsis text-left">{row.original.email}</div>
              ),
            },
            {
              accessorKey: "soDt",
              header: () => <div className="text-left">Số điện thoại</div>,
              cell: ({ row }) => <div className="text-left">{row.original.soDt}</div>,
            },
            {
              accessorKey: "maLoaiNguoiDung",
              header: () => <div className="text-center">Loại người dùng</div>,
              cell: ({ row }) => (
                <div className="flex justify-center">
                  <div
                    className={`inline-block px-2 py-1 rounded text-sm ${
                      row.original.maLoaiNguoiDung === "QuanTri"
                        ? "bg-purple-100 text-purple-800"
                        : "bg-blue-100 text-blue-800"
                    }`}
                  >
                    {row.original.maLoaiNguoiDung === "QuanTri" ? "Quản trị" : "Khách hàng"}
                  </div>
                </div>
              ),
            },
            {
              accessorKey: "actions",
              header: () => <div className="text-center">Hành động</div>,
              cell: ({ row }) => (
                <div className="flex gap-2 justify-center">
                  <Button size="sm" onClick={() => console.log("Edit", row.original)}>
                    <IconEdit className="size-4" />
                  </Button>
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => onDeleteUser(row.original.taiKhoan)}
                    disabled={isDeleting}
                  >
                    <IconTrash className="size-4" />
                  </Button>
                </div>
              ),
            },
          ]}
          data={data?.items || []}
        />
        <div className="flex items-center justify-between mt-4">
          <div>
            <p className="text-sm text-muted-foreground">
              Trang {currentPage} / {totalPages} (Tổng {totalCount} người dùng)
            </p>
          </div>
          <div className="flex items-center space-x-2">
            <Pagination className="mt-4">
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      if (currentPage > 1) setCurrentPage(currentPage - 1);
                    }}
                    className={cn(currentPage === 1 && "pointer-events-none opacity-50")}
                  />
                </PaginationItem>
                {getPaginationItems()}
                <PaginationItem>
                  <PaginationNext
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      if (currentPage < totalPages) setCurrentPage(currentPage + 1);
                    }}
                    className={cn(currentPage === totalPages && "pointer-events-none opacity-50")}
                  />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </div>
        </div>
      </div>
      <Dialog
        open={isOpen}
        onOpenChange={(open) => {
          setIsOpen(open);
          if (!open) reset(); // Reset form when dialog closes
        }}
      >
        <DialogContent className="sm:max-w-[500px] max-h-[90vh] p-6 overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold">Thêm người dùng mới</DialogTitle>
            <DialogDescription className="text-muted-foreground">
              Vui lòng điền đầy đủ thông tin để thêm người dùng mới vào hệ thống.
            </DialogDescription>
          </DialogHeader>
          <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
            {/* Tài khoản */}
            <div className="space-y-2">
              <Label htmlFor="taiKhoan" className="text-sm font-medium">
                Tài khoản <span className="text-red-500">*</span>
              </Label>
              <Input
                id="taiKhoan"
                placeholder="Nhập tài khoản"
                {...register("taiKhoan", { required: "Tài khoản là bắt buộc" })}
                className={cn(errors.taiKhoan && "border-red-500")}
              />
              {errors.taiKhoan && <p className="text-sm text-red-500">{errors.taiKhoan.message}</p>}
            </div>

            {/* Mật khẩu */}
            <div className="space-y-2">
              <Label htmlFor="matKhau" className="text-sm font-medium">
                Mật khẩu <span className="text-red-500">*</span>
              </Label>
              <Input
                id="matKhau"
                type="password"
                placeholder="Nhập mật khẩu"
                {...register("matKhau", { required: "Mật khẩu là bắt buộc" })}
                className={cn(errors.matKhau && "border-red-500")}
              />
              {errors.matKhau && <p className="text-sm text-red-500">{errors.matKhau.message}</p>}
            </div>

            {/* Họ tên */}
            <div className="space-y-2">
              <Label htmlFor="hoTen" className="text-sm font-medium">
                Họ tên <span className="text-red-500">*</span>
              </Label>
              <Input
                id="hoTen"
                placeholder="Nhập họ tên"
                {...register("hoTen", { required: "Họ tên là bắt buộc" })}
                className={cn(errors.hoTen && "border-red-500")}
              />
              {errors.hoTen && <p className="text-sm text-red-500">{errors.hoTen.message}</p>}
            </div>

            {/* Email */}
            <div className="space-y-2">
              <Label htmlFor="email" className="text-sm font-medium">
                Email <span className="text-red-500">*</span>
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="Nhập email"
                {...register("email", {
                  required: "Email là bắt buộc",
                  pattern: {
                    value: /^\S+@\S+$/i,
                    message: "Email không hợp lệ",
                  },
                })}
                className={cn(errors.email && "border-red-500")}
              />
              {errors.email && <p className="text-sm text-red-500">{errors.email.message}</p>}
            </div>

            {/* Số điện thoại */}
            <div className="space-y-2">
              <Label htmlFor="soDt" className="text-sm font-medium">
                Số điện thoại <span className="text-red-500">*</span>
              </Label>
              <Input
                id="soDt"
                placeholder="Nhập số điện thoại"
                {...register("soDt", { required: "Số điện thoại là bắt buộc" })}
                className={cn(errors.soDt && "border-red-500")}
              />
              {errors.soDt && <p className="text-sm text-red-500">{errors.soDt.message}</p>}
            </div>

            {/* Loại người dùng */}
            <div className="space-y-2">
              <Label htmlFor="maLoaiNguoiDung" className="text-sm font-medium">
                Loại người dùng
              </Label>
              <Select value={watch("maLoaiNguoiDung")} onValueChange={(value) => setValue("maLoaiNguoiDung", value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Chọn loại người dùng" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="KhachHang">Khách hàng</SelectItem>
                  <SelectItem value="QuanTri">Quản trị</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Submit Button */}
            <div className="flex justify-end space-x-2 pt-4">
              <Button type="button" variant="outline" onClick={() => setIsOpen(false)}>
                Hủy
              </Button>
              <Button type="submit" loading={isPending} disabled={isPending}>
                Thêm người dùng
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
      {toast && <ToastNotification message={toast.message} type={toast.type} id={toast.id} />}
    </>
  );
};

export default UserManagement;
