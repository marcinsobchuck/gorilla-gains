import { isAxiosError } from "axios"

import { getExercises } from "@api/exercisesService"
import { GetExercisesQueryParams } from "@api/types/exercisesService.types"
import { createAppAsyncThunk } from "@app/hooks"

export const getExercisesAction = createAppAsyncThunk(
  "getExercises",
  async (params: GetExercisesQueryParams, { rejectWithValue }) => {
    try {
      const response = await getExercises(params)
      return response.data
    } catch (error) {
      if (isAxiosError(error)) {
        return rejectWithValue(error.response?.data)
      } else {
        return rejectWithValue("Something went wrong")
      }
    }
  }
)
