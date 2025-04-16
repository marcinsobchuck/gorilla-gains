import axios from "axios"
import { NavigateFunction } from "react-router-dom"

import { Routes } from "@enums/routes.enum"

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

export const setUpResponseInterceptor = (navigate: NavigateFunction) => {
  privateApiService.interceptors.response.use(
    (response) => {
      return response
    },
    (error) => {
      if (error.response.status === 401) {
        navigate(Routes.LOGIN)
        return Promise.reject(error)
      }
      return Promise.reject(error)
    }
  )
}
