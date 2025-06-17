import { listCinemaApi, listCinemaSystemApi, listShowtimeCinemaSystemApi } from "@/apis/cinema-system";
import { useQuery } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const CinemaInfo = () => {
  const [selectedCinemaSystem, setSelectedCinemaSystem] = useState(null);
  const [selectedCinema, setSelectedCinema] = useState(null);
  const [maHeThongRap, setMaHeThongRap] = useState(null);
  const [maCumRap, setMaCumRap] = useState(null);
  const [showtimes, setShowtimes] = useState(null);
  const navigate = useNavigate();

  const getShowtimesByCumRap = (listShowtime, maCumRap) => {
    if (!listShowtime || !listShowtime[0] || !listShowtime[0].lstCumRap || !maCumRap) {
      return null;
    }
    const cumRap = listShowtime[0].lstCumRap.find((item) => item.maCumRap === maCumRap);
    return cumRap ? cumRap.danhSachPhim : null;
  };

  const { data: cinemaSystem } = useQuery({
    queryKey: ["cinemaInfo"],
    queryFn: () => listCinemaSystemApi(),
  });
  //   console.log("🚀 ~ CinemaInfo ~ data:", data);

  const { data: listCinema } = useQuery({
    queryKey: ["listCinema", maHeThongRap],
    queryFn: () => listCinemaApi(maHeThongRap),
    enabled: !!maHeThongRap,
  });
  //   console.log("🚀 ~ listCinema ~ listCinema:", listCinema);

  // lấy data của GP01
  const { data: listShowtime } = useQuery({
    queryKey: ["listShowtime", { maHeThongRap: maHeThongRap, maNhom: "GP01" }],
    queryFn: () => listShowtimeCinemaSystemApi({ maHeThongRap: maHeThongRap, maNhom: "GP01" }),
    enabled: !!maHeThongRap,
  });
  //   console.log("🚀 ~ listShowtime ~ listShowtime:", listShowtime);
  useEffect(() => {
    if (listShowtime && maCumRap) {
      const showtimes = getShowtimesByCumRap(listShowtime, maCumRap);
      setShowtimes(showtimes);
    }
  }, [listShowtime, maCumRap]);

  useEffect(() => {
    if (cinemaSystem && cinemaSystem.length > 0) {
      setSelectedCinemaSystem(cinemaSystem[0].maHeThongRap);
      setMaHeThongRap(cinemaSystem[0].maHeThongRap);
    }
  }, [cinemaSystem]);

  useEffect(() => {
    if (listCinema && listCinema.length > 0) {
      setSelectedCinema(listCinema[0].maCumRap);
      setMaCumRap(listCinema[0].maCumRap);
    }
  }, [listCinema]);
  // console.log("🚀 ~ CinemaInfo ~ listCinema:", listCinema)

  const handleSelectCinemaSystem = (maHeThongRap) => {
    // console.log("🚀 ~ handleClick ~ maHeThongRap:", maHeThongRap);
    setMaHeThongRap(maHeThongRap);
    setSelectedCinemaSystem(maHeThongRap);
  };

  const handleSelectCinema = (maCumRap) => {
    // console.log("🚀 ~ handleSelectCinema ~ maCumRap:", maCumRap);
    setMaCumRap(maCumRap);
    setSelectedCinema(maCumRap);
  };

  return (
    <div className="w-full px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="flex items-center mb-4 sm:mb-6 lg:mb-8">
        <span className="w-1 h-5 bg-[#034ea2] mr-2"></span>
        <h1 className="text-lg sm:text-xl font-bold uppercase">Thông tin lịch chiếu</h1>
      </div>

      {/* Mobile Layout - Stacked vertically */}
      <div className="block lg:hidden space-y-4">
        {/* Cinema System Selection - Mobile */}
        <div className="bg-white rounded-lg border p-4">
          <h3 className="text-sm font-semibold mb-3 text-gray-700">Chọn hệ thống rạp</h3>
          <div className="flex flex-wrap gap-2">
            {cinemaSystem &&
              cinemaSystem.map((item) => (
                <div
                  key={item.maHeThongRap}
                  className={`cursor-pointer flex items-center justify-center rounded-lg w-12 h-12 sm:w-14 sm:h-14 p-2 hover:bg-gray-100 border ${
                    selectedCinemaSystem === item.maHeThongRap ? "bg-gray-100 border-[#034ea2]" : "border-gray-200"
                  }`}
                  onClick={() => handleSelectCinemaSystem(item.maHeThongRap)}
                >
                  <img src={item.logo} alt="logo" className="w-full h-full object-contain" />
                </div>
              ))}
          </div>
        </div>

        {/* Cinema Selection - Mobile */}
        {listCinema && (
          <div className="bg-white rounded-lg border p-4">
            <h3 className="text-sm font-semibold mb-3 text-gray-700">Chọn rạp</h3>
            <div className="space-y-2 max-h-48 overflow-y-auto">
              {listCinema.map((item) => (
                <div
                  key={item.maCumRap}
                  className={`flex flex-col gap-1 hover:bg-gray-100 p-3 rounded-lg cursor-pointer border ${
                    selectedCinema === item.maCumRap ? "bg-gray-100 border-[#034ea2]" : "border-transparent"
                  }`}
                  onClick={() => handleSelectCinema(item.maCumRap)}
                >
                  <h4 className="text-sm font-semibold line-clamp-1">{item.tenCumRap}</h4>
                  <span className="text-xs text-gray-500 line-clamp-2">{item.diaChi}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Showtimes - Mobile */}
        {showtimes && (
          <div className="bg-white rounded-lg border p-4">
            <h3 className="text-sm font-semibold mb-3 text-gray-700">Lịch chiếu</h3>
            <div className="space-y-3 max-h-96 overflow-y-auto">
              {showtimes.map((item) => (
                <div
                  key={item.maPhim}
                  className="flex gap-3 border-b border-gray-200 pb-3 last:border-b-0 hover:bg-gray-50 p-2 rounded-lg cursor-pointer"
                  onClick={() => navigate(`/movie-details/${item.maPhim}`)}
                >
                  <img
                    src={item.hinhAnh}
                    alt="poster"
                    className="w-12 h-16 sm:w-14 sm:h-20 rounded object-cover flex-shrink-0"
                  />
                  <div className="flex flex-col gap-1 min-w-0 flex-1">
                    <h4 className="text-sm font-semibold line-clamp-2">{item.tenPhim}</h4>
                    <div className="text-xs text-gray-500 space-y-1">
                      {item.lstLichChieuTheoPhim &&
                        item.lstLichChieuTheoPhim.slice(0, 2).map((scheduleItem) => (
                          <div key={scheduleItem.maLichChieu} className="line-clamp-1">
                            {`${scheduleItem.ngayChieuGioChieu.split("T")[0]} - ${
                              scheduleItem.ngayChieuGioChieu.split("T")[1]
                            }`}
                          </div>
                        ))}
                      {item.lstLichChieuTheoPhim && item.lstLichChieuTheoPhim.length > 2 && (
                        <span className="text-gray-400">...</span>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Desktop & Tablet Layout - Grid */}
      <div className="hidden lg:grid grid-cols-12 border rounded-lg overflow-hidden bg-white">
        {/* Cinema System Logos */}
        <div className="col-span-2 xl:col-span-1 h-full flex flex-col gap-2 border-r justify-start items-center p-3">
          <h3 className="text-xs font-semibold text-gray-700 mb-2 xl:hidden">Hệ thống rạp</h3>
          {cinemaSystem &&
            cinemaSystem.map((item) => (
              <div
                key={item.maHeThongRap}
                className={`cursor-pointer flex items-center justify-center rounded-lg w-14 h-14 xl:w-16 xl:h-16 p-3 hover:bg-gray-100 ${
                  selectedCinemaSystem === item.maHeThongRap ? "bg-gray-100" : ""
                }`}
                onClick={() => handleSelectCinemaSystem(item.maHeThongRap)}
              >
                <img src={item.logo} alt="logo" className="w-full h-full object-contain" />
              </div>
            ))}
        </div>

        {/* Cinema List */}
        <div className="col-span-4 xl:col-span-4 border-r flex flex-col max-h-[530px]">
          <div className="p-4 border-b bg-gray-50 sticky top-0 z-10">
            <h3 className="text-sm font-semibold text-gray-700">Danh sách rạp</h3>
          </div>
          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            {listCinema &&
              listCinema.map((item) => (
                <div
                  key={item.maCumRap}
                  className={`flex flex-col gap-1 hover:bg-gray-100 p-3 rounded-lg cursor-pointer ${
                    selectedCinema === item.maCumRap ? "bg-gray-100" : ""
                  }`}
                  onClick={() => handleSelectCinema(item.maCumRap)}
                >
                  <h4 className="text-sm font-semibold line-clamp-1">{item.tenCumRap}</h4>
                  <span className="text-xs text-gray-500 line-clamp-2">{item.diaChi}</span>
                </div>
              ))}
          </div>
        </div>

        {/* Showtimes */}
        <div className="col-span-6 xl:col-span-7 flex flex-col max-h-[530px]">
          <div className="p-4 border-b bg-gray-50 sticky top-0 z-10">
            <h3 className="text-sm font-semibold text-gray-700">Lịch chiếu phim</h3>
          </div>
          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            {showtimes &&
              showtimes.map((item) => (
                <div
                  key={item.maPhim}
                  className="flex gap-4 border-b border-gray-200 pb-3 last:border-b-0 hover:bg-gray-100 p-3 rounded-lg cursor-pointer"
                  onClick={() => navigate(`/movie-details/${item.maPhim}`)}
                >
                  <img
                    src={item.hinhAnh}
                    alt="poster"
                    className="w-16 h-20 xl:w-20 xl:h-28 rounded-lg object-cover flex-shrink-0"
                  />
                  <div className="flex flex-col gap-2 min-w-0 flex-1">
                    <h4 className="text-sm font-semibold line-clamp-2">{item.tenPhim}</h4>
                    <div className="text-xs text-gray-500 space-y-1">
                      {item.lstLichChieuTheoPhim &&
                        item.lstLichChieuTheoPhim.slice(0, 3).map((scheduleItem) => (
                          <div key={scheduleItem.maLichChieu} className="line-clamp-1">
                            {`${scheduleItem.ngayChieuGioChieu.split("T")[0]} - ${
                              scheduleItem.ngayChieuGioChieu.split("T")[1]
                            }`}
                          </div>
                        ))}
                      {item.lstLichChieuTheoPhim && item.lstLichChieuTheoPhim.length > 3 && (
                        <span className="text-gray-400">+{item.lstLichChieuTheoPhim.length - 3} suất chiếu khác</span>
                      )}
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CinemaInfo;
