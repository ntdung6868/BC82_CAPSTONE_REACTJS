import { listCinemaApi, listCinemaSystemApi, createShowtimeApi } from "@/apis/cinema-system";
import { infoMovieApi } from "@/apis/movie";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import ToastNotification from "@/components/ui/toast-noti/ToastNotification";
import { useMutation, useQuery } from "@tanstack/react-query";
import { CalendarIcon } from "lucide-react";
import React, { useState, useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { useParams } from "react-router-dom";

// Hàm định dạng ngày giờ
const formatDateTime = (date, time) => {
  if (!date || !time) return "";
  const [hours, minutes] = time.split(":");
  const formattedDate = new Date(date);
  formattedDate.setHours(hours, minutes, 0); // Đặt giờ, phút, giây
  const day = String(formattedDate.getDate()).padStart(2, "0");
  const month = String(formattedDate.getMonth() + 1).padStart(2, "0");
  const year = formattedDate.getFullYear();
  const hoursFormatted = String(formattedDate.getHours()).padStart(2, "0");
  const minutesFormatted = String(formattedDate.getMinutes()).padStart(2, "0");
  const secondsFormatted = "00"; // Giây mặc định
  return `${day}/${month}/${year} ${hoursFormatted}:${minutesFormatted}:${secondsFormatted}`;
};

const ShowtimeManagement = () => {
  const { idFilm } = useParams();
  // console.log(idFilm);
  const [maHeThongRap, setMaHeThongRap] = useState("");
  // console.log("🚀 ~ ShowtimeManagement ~ maHeThongRap:", maHeThongRap);
  const [maCumRap, setMaCumRap] = useState("");
  // console.log("🚀 ~ ShowtimeManagement ~ maCumRap:", maCumRap);
  const [toast, setToast] = useState(null);
  const [selectedTime, setSelectedTime] = useState(""); // State cho giờ

  // Đặt lại toast sau khi hiển thị
  useEffect(() => {
    if (toast) {
      const timer = setTimeout(() => {
        setToast(null);
      }, toast.autoClose || 5000);
      return () => clearTimeout(timer);
    }
  }, [toast]);

  const { data: idFilmData, error } = useQuery({
    queryFn: () => infoMovieApi(idFilm),
    queryKey: ["infoMovie", idFilm],
  });

  const {
    handleSubmit,
    control,
    getValues,
    setValue,
    watch,
    register,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: {
      maPhim: idFilm,
      ngayChieuGioChieu: "",
      maRap: "",
      giaVe: "50000",
    },
    mode: "onChange",
  });
  const watchFieldDate = watch("ngayChieuGioChieu");

  const { data: cinemaSystem } = useQuery({
    queryFn: () => listCinemaSystemApi(),
    queryKey: ["cinemaSystem"],
  });

  const { data: cinema } = useQuery({
    queryFn: () => listCinemaApi(maHeThongRap),
    queryKey: ["cinema", maHeThongRap],
    enabled: !!maHeThongRap,
  });

  const rapData = cinema?.find((item) => item.maCumRap === maCumRap)?.danhSachRap;

  // // Log để kiểm tra dữ liệu
  // useEffect(() => {
  //   console.log("maHeThongRap:", maHeThongRap);
  //   console.log("maCumRap:", maCumRap);
  //   console.log("rapData:", rapData);
  //   console.log("idFilmData:", idFilmData);
  // }, [maHeThongRap, maCumRap, rapData, idFilmData]);

  const { mutate: handleCreateShowtime, isPending } = useMutation({
    mutationFn: (data) => createShowtimeApi(data),
    onSuccess: () => {
      setToast({
        type: "success",
        message: "Tạo lịch chiếu thành công!",
        id: `create-showtime-${Date.now()}`,
      });
      // Đặt lại form sau khi tạo thành công
      reset();
      setSelectedTime(""); // Đặt lại giờ
    },
    onError: (error) => {
      console.error("Error creating showtime:", error);
      setToast({
        type: "error",
        message: "Tạo lịch chiếu thất bại!",
        id: `create-showtime-error-${Date.now()}`,
      });
    },
  });

  const onSubmit = (data) => {
    // Định dạng dữ liệu trước khi gửi
    const formattedData = {
      ...data,
      maPhim: parseInt(data.maPhim), // Chuyển maPhim thành số nguyên
      ngayChieuGioChieu: formatDateTime(data.ngayChieuGioChieu, selectedTime), // Định dạng ngày giờ dd/mm/yyyy hh:mm:ss
      giaVe: parseInt(data.giaVe), // Chuyển giaVe thành số nguyên
    };
    console.log("Payload gửi đi:", formattedData);
    handleCreateShowtime(formattedData);
  };

  return (
    <>
      <h1 className="font-bold">Tạo lịch chiếu phim</h1>
      <div className="flex lg:flex-row flex-col gap-8">
        <div className="flex gap-2 bg-gray-50 pr-4 rounded-md lg:w-1/2 w-full ">
          <img
            src={idFilmData?.hinhAnh}
            alt={idFilmData?.tenPhim}
            className="w-1/2 object-cover rounded-tl-md rounded-bl-md"
          />
          <div className="flex flex-col gap-5 w-full py-10 px-2">
            <h2 className="text-2xl font-bold">{idFilmData?.tenPhim}</h2>
            <p className="text-sm max-h-[500px] overflow-y-auto">{idFilmData?.moTa}</p>
          </div>
        </div>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className=" lg:w-1/2 w-full space-y-3 flex flex-col items-center bg-gray-50 p-4 rounded-md"
        >
          <div className="flex flex-col gap-2 w-full bg-white p-4 rounded-md">
            {/* Hệ thống rạp */}
            <div className="space-y-1">
              <Label className="text-sm font-medium">
                Hệ thống rạp <span className="text-red-500">*</span>
              </Label>
              <Select onValueChange={(value) => setMaHeThongRap(value)}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Chọn hệ thống rạp" />
                </SelectTrigger>
                <SelectContent>
                  {cinemaSystem?.map((item) => (
                    <SelectItem key={item.maHeThongRap} value={item.maHeThongRap}>
                      {item.tenHeThongRap}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Cụm rạp */}
            <div className="space-y-1">
              <Label className="text-sm font-medium">
                Cụm rạp <span className="text-red-500">*</span>
              </Label>
              <Select
                onValueChange={(value) => {
                  setMaCumRap(value);
                }}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Chọn cụm rạp" />
                </SelectTrigger>
                <SelectContent>
                  {cinema?.map((item) => (
                    <SelectItem key={item.maCumRap} value={item.maCumRap}>
                      {item.tenCumRap}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Danh sách rạp */}
            <div className="space-y-1">
              <Label htmlFor="maRap" className="text-sm font-medium">
                Rạp <span className="text-red-500">*</span>
              </Label>
              <Controller
                name="maRap"
                control={control}
                render={({ field }) => (
                  <Select
                    onValueChange={(value) => {
                      field.onChange(value);
                    }}
                    value={field.value}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Chọn rạp" />
                    </SelectTrigger>
                    <SelectContent>
                      {rapData?.map((item) => (
                        <SelectItem key={item.maRap} value={item.maRap.toString()}>
                          {item.tenRap}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}
              />
            </div>

            {/* Ngày khởi chiếu */}
            <div className="space-y-1">
              <Label className="text-sm font-medium">Ngày khởi chiếu</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline" className="w-full justify-start text-left font-normal">
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {watchFieldDate ? (
                      new Date(getValues("ngayChieuGioChieu")).toLocaleDateString("vi-VN")
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
                      setValue("ngayChieuGioChieu", data);
                      // console.log("🚀 ~ ShowtimeManagement ~ ngayChieuGioChieu:", data);
                    }}
                  />
                </PopoverContent>
              </Popover>
            </div>

            {/* Giờ chiếu */}
            <div className="space-y-1">
              <Label className="text-sm font-medium">
                Giờ chiếu <span className="text-red-500">*</span>
              </Label>
              <Input type="time" value={selectedTime} onChange={(e) => setSelectedTime(e.target.value)} required />
            </div>

            {/* Giá vé */}
            <div className="space-y-1">
              <Label htmlFor="giaVe" className="text-sm font-medium">
                Giá vé
              </Label>
              <Input id="giaVe" placeholder="Nhập giá vé" {...register("giaVe")} />
            </div>

            {/* Submit Button */}
            <div className="flex justify-center mt-4">
              <Button type="submit">Tạo lịch chiếu</Button>
            </div>
          </div>
        </form>
      </div>
      {toast && <ToastNotification message={toast.message} type={toast.type} id={toast.id} />}
    </>
  );
};

export default ShowtimeManagement;
