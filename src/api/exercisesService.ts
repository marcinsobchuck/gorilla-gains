import { AxiosResponse } from "axios"

import { ApiEndpoints } from "@enums/apiEndpoints.enum"

import { privateApiService } from "./api"
import { Exercise, GetExercisesByActivityTypeQueryParams } from "./types/exercisesService.types"

export const getExercisesByActivityType = (
  params: GetExercisesByActivityTypeQueryParams
): Promise<AxiosResponse<Exercise[]>> => {
  return privateApiService.get(ApiEndpoints.EXERCISES, { params })
}
