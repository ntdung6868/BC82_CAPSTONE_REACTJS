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
