import { AxiosResponse } from "axios"

import { ApiEndpoints } from "@enums/apiEndpoints.enum"

import { privateApiService } from "./api"
import { ChangeUserInfoData } from "./types/userService.types"

export const changeUserInfo = async (data: ChangeUserInfoData): Promise<AxiosResponse<void>> => {
  return await privateApiService.patch(ApiEndpoints.USERS, data)
}
