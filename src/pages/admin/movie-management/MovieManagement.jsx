import { addMovieApi, deleteMovieApi, listMoviePaginationApi } from "@/apis/movie";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Checkbox } from "@/components/ui/checkbox";
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
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import ToastNotification from "@/components/ui/toast-noti/ToastNotification";
import { cn } from "@/lib/utils";
import { IconCalendar, IconEdit, IconEye, IconTrash } from "@tabler/icons-react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { format } from "date-fns";
import { CalendarIcon, ChevronLeft, ChevronRight, Plus, Trash2 } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";

const MovieManagement = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { page } = useParams(); // Lấy tham số page từ URL (ví dụ: /page/2 -> page = "2")
  const navigate = useNavigate(); // Sử dụng useNavigate để điều hướng
  const [toast, setToast] = useState(null);

  // Xác định currentPage từ URL, mặc định là 1 nếu không có page
  const [currentPage, setCurrentPage] = useState(page ? parseInt(page, 10) : 1);
  const itemsPerPage = 8;
  const imageRef = useRef(null);

  const {
    handleSubmit,
    register,
    setValue,
    getValues,
    watch,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      tenPhim: "",
      trailer: "",
      moTa: "",
      ngayKhoiChieu: null,
      hot: false,
      hinhAnh: null,
      status: false,
      danhGia: 0,
    },
  });
  const watchFieldDate = watch("ngayKhoiChieu");
  const imageFile = watch("hinhAnh");
  // console.log("🚀 ~ MovieManagement ~ imageFile:", imageFile);

  const previewImage = () => {
    const url = imageFile ? URL.createObjectURL(imageFile) : "";
    return url;
  };

  // console.log("🚀 ~ previewImage ~ previewImage:", previewImage());

  // Truy vấn danh sách phim
  const { data, isLoading, error, refetch } = useQuery({
    queryFn: () => listMoviePaginationApi({ soTrang: currentPage, soPhanTuTrenTrang: itemsPerPage, maNhom: "GP02" }),
    queryKey: ["movieList", { soTrang: currentPage, soPhanTuTrenTrang: itemsPerPage, maNhom: "GP02" }],
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
    const newUrl = currentPage === 1 ? "/admin/movie-management" : `/admin/movie-management/page/${currentPage}`;
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

  const { mutate: handleAddMovie, isPending } = useMutation({
    mutationFn: (formData) => {
      return addMovieApi(formData);
    },
    onSuccess: (response) => {
      // console.log("Movie added successfully:", response);
      setToast({
        type: "success",
        message: "Thêm phim thành công!",
        id: `add-movie-${Date.now()}`, // Thêm ID duy nhất cho toast thêm phim
      });
      refetch();
    },
    onError: (error) => {
      console.error("Error adding movie:", error);
    },
  });

  const { mutate: handleDeleteMovie, isPending: isDeleting } = useMutation({
    mutationFn: (maPhim) => deleteMovieApi(maPhim),
    onSuccess: () => {
      setToast({
        type: "success",
        message: "Xóa phim thành công!",
        id: `delete-movie-${Date.now()}`, // Tạo ID duy nhất cho mỗi lần xóa
      });
      refetch();
    },
    onError: (error) => {
      console.error("Error deleting movie:", error);
    },
  });

  const onDeleteMovie = (maPhim) => {
    if (window.confirm("Bạn có chắc chắn muốn xóa phim này?")) {
      handleDeleteMovie(maPhim);
    }
  };

  const onSubmit = (data) => {
    const formattedData = format(data.ngayKhoiChieu, "dd/MM/yyyy");

    const formData = new FormData();
    formData.append("tenPhim", data.tenPhim);
    formData.append("trailer", data.trailer);
    formData.append("moTa", data.moTa);
    formData.append("ngayKhoiChieu", formattedData);
    formData.append("danhGia", data.danhGia);
    formData.append("hot", data.hot);
    formData.append("hinhAnh", data.hinhAnh);
    formData.append("dangChieu", data.status);
    formData.append("sapChieu", !data.status);
    formData.append("maNhom", "GP02");
    handleAddMovie(formData);
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

  // Hàm chuyển trang
  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  return (
    <>
      <div className="flex items-center justify-between">
        <h1 className="font-bold">Danh sách phim</h1>
        <Button
          size="lg"
          onClick={() => {
            setIsOpen(true);
            console.log("🚀 ~ MovieManagement ~ toast:", toast);
          }}
        >
          <Plus />
          Thêm phim
        </Button>
      </div>
      <div className="mt-4">
        <DataTable
          columns={[
            {
              accessorKey: "maPhim",
              header: () => <div className="text-center">Mã</div>, // Căn giữa header
              cell: ({ row }) => <div className="font-semibold text-center">{row.original.maPhim}</div>, // Căn giữa cell
            },
            {
              accessorKey: "tenPhim",
              header: () => <div className="text-center">Tên phim</div>,
              cell: ({ row }) => (
                <div className="max-w-[240px] overflow-hidden text-ellipsis">{row.original.tenPhim} lorem</div>
              ),
            },
            {
              accessorKey: "hinhAnh",
              header: () => <div className="text-center">Hình ảnh</div>,
              cell: ({ row }) => (
                <div className="flex justify-center">
                  {" "}
                  {/* Căn giữa ảnh */}
                  <img
                    src={row.original.hinhAnh}
                    alt={row.original.tenPhim}
                    className="h-16 w-14 object-cover rounded"
                  />
                </div>
              ),
            },
            {
              accessorKey: "moTa",
              header: () => <div className="text-center">Mô tả</div>,
              cell: ({ row }) => <div className="max-w-[240px] overflow-hidden text-ellipsis">{row.original.moTa}</div>,
            },
            {
              accessorKey: "ngayKhoiChieu",
              header: () => <div className="text-center">Ngày khởi chiếu</div>,
              cell: ({ row }) => (
                <div className="text-center">{new Date(row.original.ngayKhoiChieu).toLocaleDateString("vi-VN")}</div>
              ),
            },
            {
              accessorKey: "trangThai",
              header: () => <div className="text-center">Trạng thái</div>,
              cell: ({ row }) => (
                <div className="flex justify-center">
                  <div
                    className={`inline-block px-2 py-1 rounded ${
                      row.original.dangChieu ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800 opacity-60"
                    }`}
                  >
                    {row.original.dangChieu ? "Đang chiếu" : "Sắp chiếu"}
                  </div>
                </div>
              ),
            },
            {
              accessorKey: "hot",
              header: () => <div className="text-center">Đang hot</div>,
              cell: ({ row }) => (
                <div className="flex justify-center">
                  <div
                    className={`inline-block px-2 py-1 rounded ${
                      row.original.hot ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
                    }`}
                  >
                    {row.original.hot ? "🔥" : ""}
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
                    onClick={() => onDeleteMovie(row.original.maPhim)}
                    disabled={isDeleting}
                  >
                    <IconTrash className="size-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => navigate(`/admin/films/showtime/${row.original.maPhim}`)}
                  >
                    <IconCalendar className="size-4" />
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
              Trang {currentPage} / {totalPages} (Tổng {totalCount} phim)
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
        <DialogContent className="sm:max-w-[600px] max-h-[90vh] p-6 overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold">Thêm phim mới</DialogTitle>
            <DialogDescription className="text-muted-foreground">
              Vui lòng điền đầy đủ thông tin để thêm phim mới vào hệ thống.
            </DialogDescription>
          </DialogHeader>
          <form className="space-y-3" onSubmit={handleSubmit(onSubmit)}>
            {/* Movie Name */}
            <div className="space-y-1">
              <Label htmlFor="tenPhim" className="text-sm font-medium">
                Tên phim <span className="text-red-500">*</span>
              </Label>
              <Input
                id="tenPhim"
                placeholder="Nhập tên phim"
                {...register("tenPhim", { required: "Tên phim là bắt buộc" })}
                className={cn(errors.tenPhim && "border-red-500")}
              />
              {errors.tenPhim && <p className="text-sm text-red-500">{errors.tenPhim.message}</p>}
            </div>

            {/* Trailer */}
            <div className="space-y-1">
              <Label htmlFor="trailer" className="text-sm font-medium">
                Trailer
              </Label>
              <Input id="trailer" placeholder="Nhập URL trailer" {...register("trailer")} />
            </div>

            {/* Description */}
            <div className="space-y-1">
              <Label htmlFor="moTa" className="text-sm font-medium">
                Mô tả
              </Label>
              <Textarea id="moTa" placeholder="Nhập mô tả phim" {...register("moTa")} className="min-h-[100px]" />
            </div>

            {/* Release Date */}
            <div className="flex items-center space-x-6">
              <div className="space-y-1 w-1/2">
                <Label className="text-sm font-medium">Ngày khởi chiếu</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="outline" className="w-full justify-start text-left font-normal">
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {watchFieldDate ? (
                        new Date(getValues("ngayKhoiChieu")).toLocaleDateString("vi-VN")
                      ) : (
                        <span>Chọn ngày</span>
                      )}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      initialFocus
                      selected={watchFieldDate}
                      onSelect={(data) => {
                        setValue("ngayKhoiChieu", data);
                      }}
                    />
                  </PopoverContent>
                </Popover>
              </div>

              {/* Rating */}
              <div className="space-y-1 w-1/2">
                <Label htmlFor="danhGia" className="text-sm font-medium">
                  Đánh giá (0-10)
                </Label>
                <Input id="danhGia" type="number" placeholder="Nhập đánh giá" {...register("danhGia")} />
              </div>
            </div>

            <div className="flex items-center space-x-6">
              {/* Hot Checkbox */}
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="hot"
                  checked={watch("hot")}
                  onCheckedChange={(checked) => {
                    setValue("hot", checked);
                  }}
                />
                <Label htmlFor="hot" className="text-sm font-medium">
                  Phim đang hot
                </Label>
              </div>

              {/* Status Switch */}
              <div className="flex items-center space-x-2">
                <Switch
                  id="status"
                  checked={watch("status")}
                  onCheckedChange={(checked) => {
                    setValue("status", checked);
                  }}
                />
                <Label htmlFor="status" className="text-sm font-medium">
                  Đang chiếu
                </Label>
              </div>
            </div>

            {/* Image Upload */}
            <div className="space-y-1">
              <Label className="text-sm font-medium">Hình ảnh</Label>
              <div className="flex items-center space-x-4">
                <Input
                  type="file"
                  hidden
                  ref={imageRef}
                  accept="image/*"
                  onChange={(event) => {
                    setValue("hinhAnh", event.target.files[0]);
                  }}
                />
                {imageFile ? (
                  <div className="relative">
                    <img src={previewImage()} alt="Preview" className="h-full object-cover rounded-md mx-auto" />
                    <Button
                      type="button"
                      className={"absolute top-2 right-2 bg-red-500 cursor-pointer"}
                      onClick={() => {
                        setValue("hinhAnh", null);
                        imageRef.current.value = null; // Reset file input
                      }}
                    >
                      <Trash2 className="size-4" />
                    </Button>
                  </div>
                ) : (
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => {
                      imageRef.current.click();
                    }}
                  >
                    Chọn hình ảnh
                  </Button>
                )}
              </div>
            </div>

            {/* Submit Button */}
            <div className="flex justify-end space-x-2">
              <Button type="button" variant="outline" onClick={() => setIsOpen(false)}>
                Hủy
              </Button>
              <Button type="submit" loading={isPending} disabled={isPending}>
                Thêm phim
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
      {toast && <ToastNotification message={toast.message} type={toast.type} id={toast.id} />}
    </>
  );
};

export default MovieManagement;
