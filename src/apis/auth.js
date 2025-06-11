import fetcher from "./fetcher";

export const loginAuthApi = async (data) => {
  try {
    const response = await fetcher.post("/QuanLyNguoiDung/DangNhap", data);
    // console.log("Login response:", response.data);
    return response.data.content;
  } catch (error) {
    // console.error("Error during login:", error);
    throw error;
  }
};

export const registerAuthApi = async (data) => {
  try {
    const response = await fetcher.post("/QuanLyNguoiDung/DangKy", data);
    // console.log("Login response:", response.data);
    return response.data.content;
  } catch (error) {
    // console.error("Error during login:", error);
    throw error;
  }
};
