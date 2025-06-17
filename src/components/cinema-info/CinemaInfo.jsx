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
    <>
      <div className="hidden md:flex items-center">
        <span className="w-1 h-5 bg-[#034ea2] mr-2"></span>
        <h1 className="mr-6 text-xl font-bold uppercase">Thông tin lịch chiếu</h1>
      </div>
      <div className="grid grid-cols-12 border-1 rounded-lg mt-8 overflow-hidden">
        <div className="col-span-1 h-full flex flex-col gap-2 border-r-1 justify-around items-center p-2">
          {cinemaSystem &&
            cinemaSystem.map((item) => (
              <div
                key={item.maHeThongRap}
                className={`cursor-pointer flex items-center justify-center rounded-lg w-[65px] h-[65px] p-3 hover:bg-gray-100 ${
                  selectedCinemaSystem === item.maHeThongRap ? "bg-gray-100" : ""
                }`}
                onClick={() => handleSelectCinemaSystem(item.maHeThongRap)}
              >
                <img src={item.logo} alt="logo" className="w-full h-full" />
              </div>
            ))}
        </div>
        <div className="col-span-4 p-3 border-r-1 flex flex-col gap-3 max-h-[446px] overflow-y-auto">
          {listCinema &&
            listCinema.map((item) => (
              <div
                key={item.maCumRap}
                className={`flex flex-col gap-1 hover:bg-gray-100 p-2 rounded-lg cursor-pointer ${
                  selectedCinema === item.maCumRap ? "bg-gray-100" : ""
                }`}
                onClick={() => handleSelectCinema(item.maCumRap)}
              >
                <h4 className="text-md font-bold">{item.tenCumRap}</h4>
                <span className="text-xs text-gray-500">{item.diaChi}</span>
              </div>
            ))}
        </div>
        <div className="col-span-7 p-3 flex flex-col gap-3 max-h-[446px] overflow-y-auto">
          {showtimes &&
            showtimes.map((item) => (
              <div
                key={item.maPhim}
                className="flex gap-4 border-b-1 border-gray-200 pb-2 hover:bg-gray-100 p-2 cursor-pointer"
              >
                <img src={item.hinhAnh} alt="logo" className="w-[60px] h-[80px] rounded-lg object-cover" />
                <div className="flex flex-col gap-1" onClick={() => navigate(`/movie-details/${item.maPhim}`)}>
                  <h4>{item.tenPhim}</h4>
                  <div className="text-xs text-gray-500 flex flex-col">
                    {item.lstLichChieuTheoPhim &&
                      item.lstLichChieuTheoPhim.slice(0, 2).map((scheduleItem) => {
                        return (
                          <span key={scheduleItem.maLichChieu} className="line-clamp-1">
                            {`${scheduleItem.ngayChieuGioChieu.split("T")[0]} - ${
                              scheduleItem.ngayChieuGioChieu.split("T")[1]
                            }`}
                          </span>
                        );
                      })}
                    {item.lstLichChieuTheoPhim && item.lstLichChieuTheoPhim.length > 2 && (
                      <span className="text-gray-400">...</span>
                    )}
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>
    </>
  );
};

export default CinemaInfo;
