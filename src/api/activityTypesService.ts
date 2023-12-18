import { AxiosResponse } from "axios"

import { ApiEndpoints } from "@enums/apiEndpoints.enum"

import { privateApiService } from "./api"
import { ActivityType, GetActivityTypesQueryParams } from "./types/activityTypesService.types"

export const getActivityTypes = async (
  params: GetActivityTypesQueryParams
): Promise<AxiosResponse<ActivityType[]>> =>
  await privateApiService.get(ApiEndpoints.ACTIVITIY_TYPES, { params })
