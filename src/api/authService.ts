import { AxiosResponse } from "axios"

import { apiService } from "./api"
import { AccessToken, LoginData, RegisterData } from "./types/authService.types"

export const registerUser = async (data: RegisterData): Promise<AxiosResponse<AccessToken>> => {
  return await apiService.post("/auth/register", data)
}

export const loginUser = async (data: LoginData): Promise<AxiosResponse<AccessToken>> => {
  return await apiService.post("/auth/login", data)
}
