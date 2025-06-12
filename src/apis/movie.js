import React from "react";
import fetcher from "./fetcher";

export const listMovieApi = async (data) => {
  try {
    const response = await fetcher.get("/QuanLyPhim/LayDanhSachPhim", { params: data });
    return response.data.content;
  } catch (error) {
    console.error("Error fetching movie list:", error);
    throw error;
  }
};

export const listMoviePaginationApi = async (data) => {
  // data : 4 soTrang: 2, soPhanTuTrenTrang: 10 ,maNhom=GP01} =

  // /QuanLyPhim/LayDanhSachPhimPhanTrang?soTrang=2&soPhanTuTrenTrang=106maNhom=GP01
  try {
    const response = await fetcher.get("/QuanLyPhim/LayDanhSachPhimPhanTrang", { params: data });
    return response.data.content;
  } catch (error) {
    console.error("Error fetching movie list:", error);
    throw error;
  }
};

export const addMovieApi = async (formData) => {
  try {
    const response = await fetcher.post("/QuanLyPhim/ThemPhimUploadHinh", formData);
    return response.data.content;
  } catch (error) {
    console.error("Error adding movie:", error);
    throw error;
  }
};

export const deleteMovieApi = async (maPhim) => {
  try {
    const response = await fetcher.delete(`/QuanLyPhim/XoaPhim?MaPhim=${maPhim}`);
    return response.data.content;
  } catch (error) {
    console.error("Error deleting movie:", error);
    throw error;
  }
};

export const infoMovieApi = async (maPhim) => {
  try {
    const response = await fetcher.get(`/QuanLyPhim/LayThongTinPhim?MaPhim=${maPhim}`);
    return response.data.content;
  } catch (error) {
    console.error("Error fetching movie info:", error);
    throw error;
  }
};
