import { ActivityType } from "@api/types/activityTypesService.types"
import { Exercise } from "@api/types/exercisesService.types"

export const transformActivityTypesIntoOption = (data?: ActivityType[]) => {
  if (!data) {
    return []
  }
  return data.map((item) => ({
    value: item._id,
    label: item.type,
    category: item.category,
  }))
}

export const transformExerciseIntoOption = (data?: Exercise[]) => {
  if (!data) {
    return []
  }
  return data?.map((item) => ({
    value: item.name,
    label: item.name,
  }))
}
