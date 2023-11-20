import { AxiosResponse } from "axios"

import { ApiEndpoints } from "@enums/apiEndpoints.enum"

import { privateApiService } from "./api"
import { ChangeUserInfoData, User } from "./types/userService.types"

export const getCurrentUserInfo = async (): Promise<AxiosResponse<User>> => {
  return await privateApiService.get(ApiEndpoints.USERS)
}

export const changeUserInfo = async (data: ChangeUserInfoData): Promise<AxiosResponse<User>> => {
  return await privateApiService.patch(ApiEndpoints.USERS, data)
}
