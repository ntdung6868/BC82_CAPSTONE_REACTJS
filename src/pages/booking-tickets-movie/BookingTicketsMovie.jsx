import { seatListAndStatusApi } from "@/apis/cinema-system";
import { Button } from "@/components/ui/button";
import ToastNotification from "@/components/ui/toast-noti/ToastNotification";
import { cn } from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const BookingTicketsMovie = () => {
  const { maLichChieu } = useParams();
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [seatsNormal, setSeatsNormal] = useState([]);
  const [seatsVip, setSeatsVip] = useState([]);
  const [toast, setToast] = useState(null);

  const { data: dataPhongVe } = useQuery({
    queryKey: ["seatListAndStatus", maLichChieu],
    queryFn: () => seatListAndStatusApi(maLichChieu),
    enabled: !!maLichChieu,
  });
  // console.log("🚀 ~ BookingTicketsMovie ~ dataPhongVe:", dataPhongVe);

  // Reset toast sau khi hiển thị
  useEffect(() => {
    if (toast) {
      const timer = setTimeout(() => {
        setToast(null);
      }, toast.autoClose || 6000);
      return () => clearTimeout(timer);
    }
  }, [toast]);

  const getSeatStyle = (seat) => {
    const isSelected = selectedSeats.find((s) => s.maGhe === seat.maGhe);

    if (seat.daDat) {
      return "bg-gray-200 text-white ";
    } else if (isSelected) {
      return "bg-orange-400 text-white hover:bg-orange-400";
    }
  };

  const getSeatViTri = (seat) => {
    if (seat.stt >= 1 && seat.stt <= 16) {
      return `A${Number(seat.stt)}`;
    } else if (seat.stt >= 17 && seat.stt <= 32) {
      return `B${Number(seat.stt - 16)}`;
    } else if (seat.stt >= 33 && seat.stt <= 48) {
      return `C${Number(seat.stt - 32)}`;
    } else if (seat.stt >= 49 && seat.stt <= 64) {
      return `D${Number(seat.stt - 48)}`;
    } else if (seat.stt >= 65 && seat.stt <= 80) {
      return `E${Number(seat.stt - 64)}`;
    } else if (seat.stt >= 81 && seat.stt <= 96) {
      return `F${Number(seat.stt - 80)}`;
    } else if (seat.stt >= 97 && seat.stt <= 112) {
      return `G${Number(seat.stt - 96)}`;
    } else if (seat.stt >= 113 && seat.stt <= 128) {
      return `H${Number(seat.stt - 112)}`;
    } else if (seat.stt >= 129 && seat.stt <= 144) {
      return `I${Number(seat.stt - 128)}`;
    } else if (seat.stt >= 145 && seat.stt <= 160) {
      return `J${Number(seat.stt - 144)}`;
    }
    return null;
  };

  const getSeatStt = (seat) => {
    if (seat.stt >= 1 && seat.stt <= 16) {
      return Number(seat.stt);
    } else if (seat.stt >= 17 && seat.stt <= 32) {
      return Number(seat.stt - 16);
    } else if (seat.stt >= 33 && seat.stt <= 48) {
      return Number(seat.stt - 32);
    } else if (seat.stt >= 49 && seat.stt <= 64) {
      return Number(seat.stt - 48);
    } else if (seat.stt >= 65 && seat.stt <= 80) {
      return Number(seat.stt - 64);
    } else if (seat.stt >= 81 && seat.stt <= 96) {
      return Number(seat.stt - 80);
    } else if (seat.stt >= 97 && seat.stt <= 112) {
      return Number(seat.stt - 96);
    } else if (seat.stt >= 113 && seat.stt <= 128) {
      return Number(seat.stt - 112);
    } else if (seat.stt >= 129 && seat.stt <= 144) {
      return Number(seat.stt - 128);
    } else if (seat.stt >= 145 && seat.stt <= 160) {
      return Number(seat.stt - 144);
    }
    return null;
  };

  const handleSeatClick = (seat) => {
    if (seat.daDat) return; // Không cho phép chọn ghế đã đặt

    const isSelected = selectedSeats.find((s) => s.maGhe === seat.maGhe);
    if (isSelected) {
      setSelectedSeats(selectedSeats.filter((s) => s.maGhe !== seat.maGhe));
    } else {
      if (selectedSeats.length >= 8) {
        setToast({
          type: "error",
          message: "Bạn chỉ được chọn tối đa 8 ghế",
          id: `add-seat-${Date.now()}`,
        });
      } else {
        setSelectedSeats([...selectedSeats, { ...seat, viTriGhe: getSeatViTri(seat) }]);
      }
    }
  };

  const totalPrice = selectedSeats.reduce((sum, seat) => sum + seat.giaVe, 0);

  useEffect(() => {
    setSeatsNormal(selectedSeats.filter((s) => s.loaiGhe === "Thuong"));
    setSeatsVip(selectedSeats.filter((s) => s.loaiGhe === "Vip"));
  }, [selectedSeats]);

  return (
    <>
      <div className="container mx-auto px-2 sm:px-4">
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-4 lg:gap-10 my-4 lg:my-10">
          <div className="xl:col-span-2 order-2 xl:order-1">
            <div className="w-full h-full p-2 sm:p-4">
              <h2 className="text-lg sm:text-xl font-bold mb-4">Chọn ghế</h2>
              {/* Chú thích ghế */}
              <div className="flex flex-col sm:flex-row justify-between gap-3 sm:gap-6 mb-6 p-2">
                <div className="flex flex-wrap gap-3 sm:gap-6">
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 sm:w-5 sm:h-5 bg-gray-200 rounded border"></div>
                    <span className="text-xs sm:text-sm">Ghế đã đặt</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 sm:w-5 sm:h-5 bg-orange-400 rounded"></div>
                    <span className="text-xs sm:text-sm">Ghế đang chọn</span>
                  </div>
                </div>
                <div className="flex flex-wrap gap-3 sm:gap-6">
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 sm:w-5 sm:h-5 rounded border"></div>
                    <span className="text-xs sm:text-sm">Ghế thường</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 sm:w-5 sm:h-5 rounded border-orange-400 border-2"></div>
                    <span className="text-xs sm:text-sm">Ghế vip</span>
                  </div>
                </div>
              </div>

              <div className="flex flex-col items-center gap-2 mb-4">
                <div className="w-full h-1 bg-[#ff8455]"></div>
                <p className="text-xs sm:text-sm text-gray-500">Màn hình</p>
              </div>

              {/* Seat Selection Area */}
              <div className="overflow-x-auto">
                <div className="flex justify-center gap-2 sm:gap-4 lg:gap-12 min-w-max px-2">
                  {/* Cột chữ cái bên trái */}
                  <div className="flex flex-col gap-1 sm:gap-2">
                    {["A", "B", "C", "D", "E", "F", "G", "H", "I", "J"].map((letter) => (
                      <div key={letter} className="h-6 sm:h-8 lg:h-10 flex items-center justify-center">
                        <span className="text-xs sm:text-sm font-medium text-gray-600 w-4 sm:w-6 text-center">
                          {letter}
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* Seat Grid */}
                  <div className="grid grid-cols-16 gap-1 sm:gap-2 max-w-none">
                    {dataPhongVe &&
                      dataPhongVe.danhSachGhe.map((seat) => (
                        <Button
                          key={seat.maGhe}
                          variant="outline"
                          className={cn(
                            "w-6 h-6 sm:w-8 sm:h-8 lg:w-10 lg:h-10 rounded-md border transition-all duration-200 flex items-center justify-center text-xs font-medium cursor-pointer p-0",
                            seat.daDat ? "bg-gray-200" : seat.loaiGhe === "Vip" ? "border-orange-400 border-2" : "",
                            getSeatStyle(seat)
                          )}
                          disabled={seat.daDat}
                          title={`Ghế ${seat.tenGhe} - ${seat.daDat ? "Đã đặt" : `${seat.giaVe.toLocaleString()}đ`}`}
                          onClick={() => handleSeatClick(seat)}
                        >
                          <span className="text-[8px] sm:text-[10px] lg:text-xs leading-none">{getSeatStt(seat)}</span>
                        </Button>
                      ))}
                  </div>

                  {/* Cột chữ cái bên phải */}
                  <div className="flex flex-col gap-1 sm:gap-2">
                    {["A", "B", "C", "D", "E", "F", "G", "H", "I", "J"].map((letter) => (
                      <div key={letter} className="h-6 sm:h-8 lg:h-10 flex items-center justify-center">
                        <span className="text-xs sm:text-sm font-medium text-gray-600 w-4 sm:w-6 text-center">
                          {letter}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar thông tin đặt vé */}
          <div className="xl:col-span-1 border-t-4 sm:border-t-6 border-orange-400 rounded-sm order-1 xl:order-2">
            {dataPhongVe && (
              <div className="bg-white shadow-lg p-3 sm:p-6">
                {/* Thông tin phim */}
                <div className="mb-4 sm:mb-6">
                  <div className="grid grid-cols-3 gap-2 sm:gap-4">
                    <div className="col-span-1">
                      <img
                        src={dataPhongVe.thongTinPhim.hinhAnh}
                        alt={dataPhongVe.thongTinPhim.tenPhim}
                        className="w-full h-full rounded-md object-cover"
                      />
                    </div>
                    <div className="col-span-2 flex flex-col gap-1 sm:gap-2">
                      <h4 className="font-bold text-sm sm:text-lg lg:text-xl mb-1 sm:mb-2 line-clamp-2">
                        {dataPhongVe.thongTinPhim.tenPhim}
                      </h4>
                      <div className="space-y-1 text-xs sm:text-sm">
                        <p className="line-clamp-2">
                          <span className="font-bold">{dataPhongVe.thongTinPhim.tenCumRap} - </span>
                          {dataPhongVe.thongTinPhim.tenRap}
                        </p>
                        <p>
                          Suất chiếu: <span className="font-bold">{dataPhongVe.thongTinPhim.gioChieu}</span>
                        </p>
                        <p>
                          Ngày: <span className="font-bold">{dataPhongVe.thongTinPhim.ngayChieu}</span>
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Ghế đã chọn */}
                {selectedSeats.length > 0 && (
                  <div className="border-t border-dashed border-gray-600 pt-3 sm:pt-4 mb-4 sm:mb-6 text-xs sm:text-sm space-y-2">
                    {seatsNormal.length > 0 && (
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <p className="flex items-center gap-2">
                            <span className="font-bold">{seatsNormal.length}x</span>
                            Ghế thường
                          </p>
                          <div className="flex items-center gap-1 flex-wrap">
                            <span>Ghế:</span>
                            <span className="font-bold">{seatsNormal.map((seat) => seat.viTriGhe).join(", ")}</span>
                          </div>
                        </div>
                        <div className="ml-2">
                          <span className="font-bold text-xs sm:text-sm">
                            {seatsNormal.reduce((sum, seat) => sum + seat.giaVe, 0).toLocaleString()}đ
                          </span>
                        </div>
                      </div>
                    )}
                    {seatsVip.length > 0 && (
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <p className="flex items-center gap-2">
                            <span className="font-bold">{seatsVip.length}x</span>
                            Ghế vip
                          </p>
                          <div className="flex items-center gap-1 flex-wrap">
                            <span>Ghế:</span>
                            <span className="font-bold">{seatsVip.map((seat) => seat.viTriGhe).join(", ")}</span>
                          </div>
                        </div>
                        <div className="ml-2">
                          <span className="font-bold text-xs sm:text-sm">
                            {seatsVip.reduce((sum, seat) => sum + seat.giaVe, 0).toLocaleString()}đ
                          </span>
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {/* Tổng tiền */}
                <div className="border-t border-dashed border-gray-600 pt-3 sm:pt-4 mb-4 sm:mb-6">
                  <div className="flex justify-between items-center text-sm sm:text-md mb-4">
                    <span className="font-semibold">Tổng cộng:</span>
                    <span className="font-bold text-orange-500 text-base sm:text-lg">
                      {totalPrice.toLocaleString()}đ
                    </span>
                  </div>
                </div>

                {/* Nút đặt vé */}
                <Button
                  className="w-full bg-orange-400 hover:bg-orange-500 text-white py-2 sm:py-3 text-sm sm:text-md font-semibold cursor-pointer"
                  disabled={selectedSeats.length === 0}
                >
                  Thanh toán
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="max-h-10 overflow-hidden">
        {toast && <ToastNotification message={toast.message} type={toast.type} id={toast.id} />}
      </div>
    </>
  );
};

export default BookingTicketsMovie;
