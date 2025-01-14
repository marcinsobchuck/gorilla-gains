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

export const forgotPassword = async (email: string): Promise<AxiosResponse<string>> => {
  return await apiService.post(ApiEndpoints.FORGOT_PASSWORD, {
    email,
  })
}
export const verifyPasswordResetToken = async (token: string): Promise<AxiosResponse<boolean>> => {
  return await apiService.get(ApiEndpoints.VERIFY_PASSWORD_RESET_TOKEN, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
}
