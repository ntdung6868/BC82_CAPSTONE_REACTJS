import { BASE_URL, TOKEN_CYBERSOFT } from "@/constants/config";
import axios from "axios";

const fetcher = axios.create({
  baseURL: BASE_URL,
  headers: {
    TokenCybersoft: TOKEN_CYBERSOFT,
  },
});

// interceptors:
fetcher.interceptors.request.use((config) => {
  // console.log("🚀 ~ config:", config);
  const user = localStorage.getItem("user");
  const token = user ? JSON.parse(user).accessToken : null;
  return {
    ...config,
    headers: {
      ...config.headers,
      Authorization: token ? `Bearer ${token}` : "",
    },
  };
});

export default fetcher;
