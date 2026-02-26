import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_API_URL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

api.interceptors.request.use((config) => {
  if (config.data instanceof FormData) {
    delete config.headers?.["Content-Type"];
  } else {
    config.headers = config.headers ?? {};
    config.headers["Content-Type"] = "application/json";
  }
  return config;
});


export default api;
