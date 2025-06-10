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
  store.dispatch(showLoading());
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
    store.dispatch(hideLoading());
    return response;
  },
  (error) => {
    store.dispatch(hideLoading());
    return Promise.reject(error);
  }
);

export default fetcher;
