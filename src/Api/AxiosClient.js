import axios from "axios";
import { navigateToLogin } from "../navigationService";

const axiosClient = axios.create({
  baseURL: "https://upskilling-egypt.com:3000",
});

// Add Authorization header
axiosClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("access_token");
    if (token) {
      config.headers.Authorization = token;
    }
    return config;
  },
  (error) => Promise.reject(error),
);

// Response interceptor for 401
axiosClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem("access_token");

      navigateToLogin(window.location.pathname);
    }
    return Promise.reject(error);
  },
);

export default axiosClient;
