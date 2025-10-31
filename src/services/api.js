import axios from "axios";
import { useUserStore } from "@/stores/user";

export const baseURL = "https://school-barakah.vercel.app";

const localeLanguage = localStorage.getItem("lan");

const currentLanguage = localeLanguage ?? "ar";

const api = axios.create({
  baseURL: baseURL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
    "Accept-Language": currentLanguage,
  },
});

// attach auth token if present
api.interceptors.request.use(
  (config) => {
    try {
      const userStore = useUserStore();
      if (userStore.token) {
        config.headers.Authorization = `Bearer ${userStore.token}`;
      }
    } catch (error) {
      // in case called outside setup during bootstrapping -- fail silently
    }
    return config;
  },
  (error) => {
    if (error.response) {
      const data = error.response?.data;
      if (error.response?.status === 401) {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        window.location.reload();
      } else {
        // error show using store
      }
    }

    throw error;
  }
);

export default api;
