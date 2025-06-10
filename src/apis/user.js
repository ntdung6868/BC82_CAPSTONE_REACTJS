import React from "react";
import fetcher from "./fetcher";

export const listUserPaginationApi = async (data) => {
  try {
    const response = await fetcher.get("/QuanLyNguoiDung/LayDanhSachNguoiDungPhanTrang", { params: data });
    return response.data.content;
  } catch (error) {
    console.error("Error fetching user list:", error);
    throw error;
  }
};

export const addUserApi = async (formData) => {
  try {
    const response = await fetcher.post("/QuanLyNguoiDung/ThemNguoiDung", formData);
    return response.data.content;
  } catch (error) {
    console.error("Error adding user:", error);
    throw error;
  }
};

export const deleteUserApi = async (taiKhoan) => {
  try {
    const response = await fetcher.delete(`/QuanLyNguoiDung/XoaNguoiDung?TaiKhoan=${taiKhoan}`);
    return response.data.content;
  } catch (error) {
    console.error("Error deleting user:", error);
    throw error;
  }
};
