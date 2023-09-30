import axios from "axios"

const baseURL = "http://localhost:3000/api"

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
