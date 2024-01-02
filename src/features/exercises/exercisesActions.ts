import { isAxiosError } from "axios"

import { getExercisesByActivityType } from "@api/exercisesService"
import { GetExercisesByActivityTypeQueryParams } from "@api/types/exercisesService.types"
import { createAppAsyncThunk } from "@app/hooks"

export const getExercisesByActivityTypeAction = createAppAsyncThunk(
  "getExercises",
  async (params: GetExercisesByActivityTypeQueryParams, { rejectWithValue }) => {
    try {
      const response = await getExercisesByActivityType(params)
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
