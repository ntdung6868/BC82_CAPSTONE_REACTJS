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
