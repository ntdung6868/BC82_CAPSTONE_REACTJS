import React, { useEffect, useState } from "react";
import BlurLeft from "/img/blur-left.png";
import BlurRight from "/img/blur-right.png";
import { CalendarIcon, ClockIcon, Play, StarIcon } from "lucide-react";
import { infoMovieApi } from "@/apis/movie";
import { useNavigate, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import MovieTrailer from "@/components/movie/movie-trailer/MovieTrailer";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { listCinemaApi, listCinemaSystemApi, listShowtimeCinemaSystemApi } from "@/apis/cinema-system";
import { useShowtimes } from "@/hooks/useShowtimes";
import { Button } from "@/components/ui/button";
import { PATH } from "@/routes/path";

const MovieDetails = () => {
  const [showTrailer, setShowTrailer] = useState(false);
  const { id } = useParams();
  // console.log("🚀 ~ MovieDetails ~ idFilm:", id);
  const getTodayDate = () => {
    const today = new Date();
    return `${today.getDate().toString().padStart(2, "0")}/${(today.getMonth() + 1).toString().padStart(2, "0")}`;
  };
  const [selectedDate, setSelectedDate] = useState(getTodayDate());
  const [maHeThongRap, setMaHeThongRap] = useState("");
  // console.log("🚀 ~ MovieDetails ~ maHeThongRap:", maHeThongRap);
  const [maCumRap, setMaCumRap] = useState("");
  // console.log("🚀 ~ MovieDetails ~ maCumRap:", maCumRap);
  const navigate = useNavigate();

  const generateDates = () => {
    const dates = [];
    const today = new Date();
    const dayNames = ["Chủ nhật", "Thứ hai", "Thứ ba", "Thứ tư", "Thứ năm", "Thứ sáu", "Thứ bảy"];

    for (let i = 0; i < 6; i++) {
      const currentDate = new Date(today);
      currentDate.setDate(today.getDate() + i);

      const dayName = i === 0 ? "Hôm nay" : dayNames[currentDate.getDay()];
      const dateString = `${currentDate.getDate().toString().padStart(2, "0")}/${(currentDate.getMonth() + 1)
        .toString()
        .padStart(2, "0")}`;

      dates.push({
        day: dayName,
        date: dateString,
        active: dateString === selectedDate,
      });
    }

    return dates;
  };
  const dates = generateDates();

  const handleDateClick = (clickedDate) => {
    setSelectedDate(clickedDate);
  };

  const { data: filmDataById } = useQuery({
    queryFn: () => infoMovieApi(id),
    queryKey: ["infoMovie", id],
    enabled: !!id,
  });
  // console.log("🚀 ~ MovieDetails ~ filmDataById:", filmDataById);

  const { data: cinemaSystem } = useQuery({
    queryFn: () => listCinemaSystemApi(),
    queryKey: ["cinemaSystem"],
  });
  // console.log("🚀 ~ MovieDetails ~ cinemaSystem:", cinemaSystem);

  const { data: cinema } = useQuery({
    queryFn: () => listCinemaApi(maHeThongRap),
    queryKey: ["cinema", maHeThongRap],
    enabled: !!maHeThongRap,
  });

  useEffect(() => {
    if (cinemaSystem && cinemaSystem.length > 0 && !maHeThongRap) {
      setMaHeThongRap(cinemaSystem[0].maHeThongRap);
      setMaCumRap("all");
    }
  }, [cinemaSystem, maHeThongRap]);

  // Reset cụm rạp về "all" khi hệ thống rạp thay đổi
  useEffect(() => {
    if (maHeThongRap) {
      setMaCumRap("all");
    }
  }, [maHeThongRap]);

  // lấy data của GP01
  const { data: listShowtime } = useQuery({
    queryKey: ["listShowtime", { maHeThongRap: maHeThongRap, maNhom: "GP01" }],
    queryFn: () => listShowtimeCinemaSystemApi({ maHeThongRap: maHeThongRap, maNhom: "GP01" }),
    enabled: !!maHeThongRap,
  });
  // console.log("🚀 ~ listShowtime ~ listShowtime:", listShowtime);

  // Sử dụng custom hook để lấy showtimes
  const movieId = parseInt(id);
  const { showtimes, hasData, isEmpty } = useShowtimes(listShowtime, maCumRap, movieId);
  // console.log("🚀 ~ MovieDetails ~ showtimes:", showtimes);

  return (
    <>
      {/* Hero Banner Section */}
      <div className="relative bg-black flex justify-center w-full min-h-[250px] sm:min-h-[350px] lg:min-h-[500px]">
        <div className="absolute w-full h-full z-10 bg-black/30"></div>
        <div className="relative h-full">
          {/* Left Blur - Desktop only */}
          <div className="absolute top-0 left-0 z-20 hidden lg:block">
            <img alt="Blur Left" className="w-auto h-[250px] sm:h-[350px] lg:h-[500px] object-cover" src={BlurLeft} />
          </div>

          {/* Main Banner Image */}
          <div className="relative flex justify-center">
            <img
              alt="Movie Banner"
              className="w-full h-[250px] sm:h-[350px] lg:h-[500px] lg:w-[860px] object-cover"
              src={filmDataById?.hinhAnh}
            />
            <button
              className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-30 w-12 h-12 sm:w-16 sm:h-16 flex items-center justify-center bg-white rounded-full cursor-pointer hover:scale-110 transition-all duration-300 shadow-lg"
              onClick={() => setShowTrailer(true)}
            >
              <Play className="w-6 h-6 sm:w-8 sm:h-8 pl-0.5 text-gray-800" />
            </button>
          </div>

          {/* Right Blur - Desktop only */}
          <div className="absolute top-0 right-0 z-20 hidden lg:block">
            <img alt="Blur Right" className="w-auto h-[250px] sm:h-[350px] lg:h-[500px] object-cover" src={BlurRight} />
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-6 lg:py-8 lg:max-w-4xl xl:max-w-5xl 2xl:max-w-6xl">
        {/* Movie Info Section */}
        <div className="flex flex-col lg:flex-row gap-6 lg:gap-8">
          {/* Movie Poster */}
          <div className="flex-shrink-0 mx-auto lg:mx-0 lg:-mt-20 z-50">
            <img
              alt={filmDataById?.tenPhim}
              className="w-48 h-64 sm:w-56 sm:h-72 lg:w-70 lg:h-100 object-cover rounded-lg border-2 border-white shadow-2xl"
              src={filmDataById?.hinhAnh}
            />
          </div>

          {/* Movie Details */}
          <div className="flex-1">
            {/* Title */}
            <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900 mb-4 text-center lg:text-left">
              {filmDataById?.tenPhim}
            </h1>

            {/* Duration & Release Date */}
            <div className="flex flex-wrap justify-center lg:justify-start gap-4 mb-4">
              <div className="flex items-center gap-2 text-sm font-medium">
                <ClockIcon className="w-4 h-4 text-orange-500" />
                <span>{filmDataById?.thoiLuong || "120"} phút</span>
              </div>
              <div className="flex items-center gap-2 text-sm font-medium">
                <CalendarIcon className="w-4 h-4 text-orange-500" />
                <span>{new Date(filmDataById?.ngayKhoiChieu).toLocaleDateString("vi-VN")}</span>
              </div>
            </div>

            {/* Rating */}
            <div className="flex items-center justify-center lg:justify-start gap-2 mb-6">
              <StarIcon className="w-5 h-5 text-orange-500 fill-orange-500" />
              <span className="text-lg font-semibold">{filmDataById?.danhGia || "0"}</span>
              <span className="text-sm text-gray-500">({filmDataById?.soLuotDanhGia || "128"} lượt đánh giá)</span>
            </div>

            {/* Movie Information Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
              <div className="flex flex-col sm:flex-row">
                <span className="font-medium text-gray-600 w-full sm:w-24 mb-1 sm:mb-0">Quốc gia:</span>
                <span className="text-gray-800">{filmDataById?.quocGia || "Đang cập nhật"}</span>
              </div>

              <div className="flex flex-col sm:flex-row">
                <span className="font-medium text-gray-600 w-full sm:w-28 mb-1 sm:mb-0">Nhà sản xuất:</span>
                <span className="text-gray-800">{filmDataById?.nhaSanXuat || "Đang cập nhật"}</span>
              </div>

              <div className="flex flex-col sm:flex-row">
                <span className="font-medium text-gray-600 w-full sm:w-24 mb-1 sm:mb-0">Thể loại:</span>
                <span className="text-gray-800">{filmDataById?.theLoai || "Đang cập nhật"}</span>
              </div>

              <div className="flex flex-col sm:flex-row">
                <span className="font-medium text-gray-600 w-full sm:w-28 mb-1 sm:mb-0">Đạo diễn:</span>
                <span className="text-gray-800">{filmDataById?.daoDien || "Đang cập nhật"}</span>
              </div>

              <div className="flex flex-col sm:flex-row sm:col-span-2">
                <span className="font-medium text-gray-600 w-full sm:w-24 mb-1 sm:mb-0">Diễn viên:</span>
                <span className="text-gray-800">{filmDataById?.dienVien || "Đang cập nhật"}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Movie Content Section */}
        <div className="mt-8 lg:mt-12">
          <div className="flex items-center mb-4">
            <div className="w-1 h-6 bg-blue-600 mr-3"></div>
            <h2 className="text-lg font-bold text-gray-900">Nội dung phim</h2>
          </div>
          <div className="text-gray-700 text-sm leading-relaxed">
            <p className="mb-4">{filmDataById?.moTa || "Thông tin nội dung phim đang được cập nhật..."}</p>
          </div>
        </div>

        {/* Showtime Section */}
        <div className="mt-8 lg:mt-12">
          <div className="flex items-center mb-6">
            <div className="w-1 h-6 bg-blue-600 mr-3"></div>
            <h2 className="text-lg font-bold text-gray-900">Lịch chiếu</h2>
          </div>

          <div className="grid grid-cols-1 xl:grid-cols-2 gap-0 xl:gap-10">
            {/* Date Filter */}
            <div className="overflow-x-auto pb-2 mb-6">
              <div className="flex gap-2 min-w-max">
                {dates.map((date, index) => (
                  <button
                    key={index}
                    className={`flex flex-col items-center text-center text-xs sm:text-sm min-w-[70px] sm:min-w-[80px] h-16 rounded-lg py-2 cursor-pointer transition-all duration-200 ${
                      date.active ? "bg-blue-600 text-white shadow-md" : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    }`}
                    onClick={() => handleDateClick(date.date)}
                  >
                    <span className="font-medium">{date.day}</span>
                    <span className="text-xs opacity-80">{date.date}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Location Filters */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
              {/* Hệ thống rạp */}
              <div className="space-y-1">
                <Label className="text-sm font-medium">Hệ thống rạp</Label>
                <Select onValueChange={(value) => setMaHeThongRap(value)} value={maHeThongRap}>
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
                  value={maCumRap}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Chọn cụm rạp" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all" active>
                      Tất cả
                    </SelectItem>
                    {cinema?.map((item) => (
                      <SelectItem key={item.maCumRap} value={item.maCumRap}>
                        {item.tenCumRap}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
          <div className="w-full h-0.5 bg-[#034EA2] mb-4 lg:mb-8"></div>

          {/* Cinema Showtimes */}

          {hasData && showtimes && (
            <div className="flex-1 overflow-y-auto p-4 space-y-3">
              {showtimes.map((item) => (
                <div key={item.maPhim} className=" border-b border-gray-200 pb-3">
                  <div className="flex flex-col gap-2 ">
                    <h4 className="text-sm font-semibold">{item.tenCumRap}</h4>
                    <div className="grid 2xl:grid-cols-6 xl:grid-cols-5 lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-5 items-center">
                      {item.lstLichChieuTheoPhim &&
                        item.lstLichChieuTheoPhim.map((scheduleItem) => (
                          <Button
                            key={scheduleItem.maLichChieu}
                            className="text-xs text-gray-500 cursor-pointer"
                            variant="outline"
                            onClick={() => navigate(`${PATH.BOOKING_TICKETS_MOVIE}/${scheduleItem.maLichChieu}`)}
                          >
                            {`${scheduleItem.ngayChieuGioChieu.split("T")[0]} - ${
                              scheduleItem.ngayChieuGioChieu.split("T")[1]
                            }`}
                          </Button>
                        ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* No Data Message */}
          {isEmpty && (
            <div className="text-center py-8">
              <div className="text-gray-500">
                <svg
                  className="w-16 h-16 mx-auto mb-4 text-gray-300"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1}
                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <p className="text-gray-600 font-medium">Không có lịch chiếu</p>
                <p className="text-sm text-gray-400 mt-1">Vui lòng chọn hệ thống rạp và cụm rạp khác</p>
              </div>
            </div>
          )}
        </div>
      </div>
      {/* Trailer Modal */}
      {showTrailer && (
        <div
          className="fixed inset-0 bg-[rgba(0,0,0,0.8)] flex items-center justify-center z-50"
          onClick={() => setShowTrailer(false)}
        >
          <div className="relative w-3/4 aspect-video">
            <MovieTrailer trailer={filmDataById?.trailer} />
          </div>
        </div>
      )}
    </>
  );
};

export default MovieDetails;
