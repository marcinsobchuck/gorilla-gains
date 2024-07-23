import axios from "axios"

const baseURL = import.meta.env.VITE_BASE_URL

export const apiService = axios.create({
  baseURL,
})

export const privateApiService = axios.create({
  baseURL,
  headers: { "Content-Type": "application/json" },
})

privateApiService.interceptors.request.use(
  (config) => {
    if (!config.headers["Authorization"]) {
      config.headers["Authorization"] = `Bearer ${window.localStorage.getItem("accessToken")}`
    }
    return config
  },
  (error) => Promise.reject(error)
)
