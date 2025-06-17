import { BASE_URL, TOKEN_CYBERSOFT } from "@/constants/config";
import axios from "axios";
import { store } from "@/store/configStore";
import { showLoading, hideLoading } from "@/store/slices/loading";

const fetcher = axios.create({
  baseURL: BASE_URL,
  headers: {
    TokenCybersoft: TOKEN_CYBERSOFT,
  },
});

// Request interceptor
fetcher.interceptors.request.use((config) => {
  // console.log("🚀 ~ config:", config);
  const user = localStorage.getItem("user");
  const token = user ? JSON.parse(user).accessToken : null;
  // console.log("🚀 ~ token:", token);

  // Tạo flag để track request completion
  config.metadata = {
    startTime: new Date().getTime(),
    completed: false,
    loadingShown: false,
  };

  // Đặt timeout để hiển thị loading sau 300ms nếu request chưa hoàn thành
  config.metadata.timeoutId = setTimeout(() => {
    if (!config.metadata.completed) {
      store.dispatch(showLoading());
      config.metadata.loadingShown = true;
    }
  }, 300);

  return {
    ...config,
    headers: {
      ...config.headers,
      Authorization: token ? `Bearer ${token}` : "",
    },
  };
});

// Response interceptor
fetcher.interceptors.response.use(
  (response) => {
    // Đánh dấu request đã hoàn thành
    if (response.config.metadata) {
      response.config.metadata.completed = true;
      clearTimeout(response.config.metadata.timeoutId);

      // Chỉ hide loading nếu đã show loading
      if (response.config.metadata.loadingShown) {
        store.dispatch(hideLoading());
      }
    }
    return response;
  },
  (error) => {
    // Đánh dấu request đã hoàn thành (với lỗi)
    if (error.config?.metadata) {
      error.config.metadata.completed = true;
      clearTimeout(error.config.metadata.timeoutId);

      // Chỉ hide loading nếu đã show loading
      if (error.config.metadata.loadingShown) {
        store.dispatch(hideLoading());
      }
    }
    return Promise.reject(error);
  }
);

export default fetcher;
