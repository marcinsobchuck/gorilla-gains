import { AxiosResponse } from "axios"

import { ApiEndpoints } from "@enums/apiEndpoints.enum"

import { privateApiService } from "./api"
import { ActivitiesSummaryData } from "./types/activitiesSummaryService.types"

export const getActivitiesSummary = async (): Promise<AxiosResponse<ActivitiesSummaryData>> =>
  await privateApiService.get(ApiEndpoints.ACTIVITIES_SUMMARY)
