import axios from "axios";
import Cookies from "js-cookie";

const BASE_URL = "http://localhost:8080";

const axiosConfig = axios.create({
  baseURL: BASE_URL,
});

axiosConfig.interceptors.request.use((config) => {
  const token = Cookies.get("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default axiosConfig;
