import { isAxiosError } from "axios"
import { subWeeks } from "date-fns"

import { getActivitiesForCurrentUser } from "@api/activitiesService"
import { getActivitiesSummary } from "@api/activitiesSummaryService"
import { createAppAsyncThunk } from "@app/hooks"

export const getActivitiesSummaryAction = createAppAsyncThunk(
  "getActivitiesSummary",
  async (_, { rejectWithValue }) => {
    try {
      const response = await getActivitiesSummary()
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

export const getWeeklyActivitiesDataAction = createAppAsyncThunk(
  "getWeeklyActivitiesData",
  async (_, { rejectWithValue }) => {
    try {
      const response = await getActivitiesForCurrentUser({
        startDate: subWeeks(new Date(), 1),
        endDate: new Date(),
        isDone: true,
      })
      const musclesHit = () => {
        const muscles = response.data.reduce<{ primary: string[]; secondary: string[] }>(
          (acc, workout) => {
            workout.exercises.forEach((exercise) => {
              if (exercise.exercise.musclesHit) {
                acc.primary.push(...exercise.exercise.musclesHit.primary)
                acc.secondary.push(...exercise.exercise.musclesHit.secondary)
              }
            })
            return acc
          },
          { primary: [], secondary: [] }
        )

        return {
          primary: [...new Set(muscles.primary)],
          secondary: [...new Set(muscles.secondary)],
        }
      }

      return {
        lastActivity: response.data[0],
        musclesHit: musclesHit(),
      }
    } catch (error) {
      console.log(error)
      if (isAxiosError(error)) {
        return rejectWithValue(error.response?.data)
      } else {
        return rejectWithValue("Something went wrong")
      }
    }
  }
)
