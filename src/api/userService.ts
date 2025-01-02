import { AxiosResponse } from "axios"

import { ApiEndpoints } from "@enums/apiEndpoints.enum"

import { apiService, privateApiService } from "./api"
import { ChangeUserInfoData, ChangeUserPasswordData, User } from "./types/userService.types"

export const getCurrentUserInfo = async (signal: AbortSignal): Promise<AxiosResponse<User>> => {
  return await privateApiService.get(ApiEndpoints.USERS, { signal })
}

export const changeUserInfo = async (data: ChangeUserInfoData): Promise<AxiosResponse<User>> => {
  return await privateApiService.patch(ApiEndpoints.USERS, data)
}

export const verifyUserPassword = async (password: string): Promise<AxiosResponse<boolean>> => {
  return await privateApiService.get(ApiEndpoints.VERIFY_PASSWORD, {
    params: {
      password,
    },
  })
}

export const changeUserPassword = async ({
  password,
  token,
}: ChangeUserPasswordData): Promise<AxiosResponse<string>> => {
  return await apiService.post(
    ApiEndpoints.CHANGE_PASSWORD,
    { password },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  )
}
