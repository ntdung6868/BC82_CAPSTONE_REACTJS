import fetcher from "./fetcher";

const loginAuthApi = async (data) => {
  try {
    const response = await fetcher.post("/QuanLyNguoiDung/DangNhap", data);
    // console.log("Login response:", response.data);
    return response.data.content;
  } catch (error) {
    // console.error("Error during login:", error);
    throw error;
  }
};

export default loginAuthApi;
