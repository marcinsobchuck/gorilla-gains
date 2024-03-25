import { ActivityType } from "@api/types/activityTypesService.types"
import { Exercise } from "@api/types/exercisesService.types"
import { AsyncOption } from "@components/SelectAsync/SelectAsync.types"

export const transformActivityTypesIntoOption = (data?: ActivityType[]): AsyncOption[] => {
  if (!data) {
    return []
  }
  return data.map((item) => ({
    value: item._id,
    label: item.type,
  }))
}

export const transformExerciseIntoOption = (data?: Exercise[]): AsyncOption[] => {
  if (!data) {
    return []
  }

  return data.map((item) => ({
    value: item._id,
    label: item.name,
    isStatic: item.isStatic,
    additionalInfo: item.additionalInfo,
  }))
}
