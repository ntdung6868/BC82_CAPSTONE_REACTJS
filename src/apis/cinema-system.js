import fetcher from "./fetcher";

export const listCinemaSystemApi = async () => {
  try {
    const response = await fetcher.get("/QuanLyRap/LayThongTinHeThongRap");
    return response.data.content;
  } catch (error) {
    console.error("Error fetching cinema system:", error);
    throw error;
  }
};

export const listCinemaApi = async (maHeThongRap) => {
  try {
    const response = await fetcher.get(`/QuanLyRap/LayThongTinCumRapTheoHeThong?maHeThongRap=${maHeThongRap}`);
    return response.data.content;
  } catch (error) {
    console.error("Error fetching cinema:", error);
    throw error;
  }
};

export const createShowtimeApi = async (data) => {
  try {
    const response = await fetcher.post("/QuanLyDatVe/TaoLichChieu", data);
    return response.data.content;
  } catch (error) {
    console.error("Error creating showtime:", error);
    throw error;
  }
};

export const seatListAndStatusApi = async (maLichChieu) => {
  try {
    const response = await fetcher.get(`/QuanLyDatVe/LayDanhSachPhongVe?MaLichChieu=${maLichChieu}`);
    return response.data.content;
  } catch (error) {
    throw error;
  }
};

export const listShowtimeCinemaSystemApi = async (data) => {
  try {
    const response = await fetcher.get("/QuanLyRap/LayThongTinLichChieuHeThongRap", { params: data });
    return response.data.content;
  } catch (error) {
    console.error("Error fetching showtime:", error);
    throw error;
  }
};
