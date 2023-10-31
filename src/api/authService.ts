import { AxiosResponse } from "axios"

import { ApiEndpoints } from "@enums/apiEndpoints.enum"

import { apiService } from "./api"
import { AccessToken, LoginData, RegisterData } from "./types/authService.types"

export const registerUser = async (data: RegisterData): Promise<AxiosResponse<AccessToken>> => {
  return await apiService.post(ApiEndpoints.REGISTER, data)
}

export const loginUser = async (data: LoginData): Promise<AxiosResponse<AccessToken>> => {
  return await apiService.post(ApiEndpoints.LOGIN, data)
}
