import axios from "axios";

const BASE_URL = import.meta.env.VITE_BACKEND_URL;

const api = axios.create({
  baseURL: BASE_URL
});
console.log("API base URL:", BASE_URL);

api.interceptors.request.use((config) => {

  const token = localStorage.getItem("access");

  if (token) {
    config.headers.Authorization =
      `Bearer ${token}`;
  }

  return config;
});

api.interceptors.response.use(
  (response) => response,

  async (error) => {
    const originalRequest = error.config;

    console.log("API Error Status:", error.response?.status);

    if (
      (
        error.response?.status === 401 ||
        error.response?.status === 403
      ) &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;

      try {
        console.log("Trying refresh token...");

        const refresh = localStorage.getItem("refresh");

        if (!refresh) {
          throw new Error("No refresh token");
        }

        const res = await axios.post(
          `${BASE_URL}refresh/`,
          { refresh }
        );

        console.log("Refresh success");

        localStorage.setItem(
          "access",
          res.data.access
        );

        originalRequest.headers.Authorization =
          `Bearer ${res.data.access}`;

        return api(originalRequest);

      } catch (refreshError) {
        console.log("Refresh failed", refreshError);

        localStorage.clear();

        window.location.href = "/login";
      }
    }

    return Promise.reject(error);
  }
);
export default api;