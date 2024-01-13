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
    category: item.category,
  }))
}

export const transformExerciseIntoOption = (
  currentExercises: string[],
  data?: Exercise[]
): AsyncOption[] => {
  if (!data) {
    return []
  }

  const filteredExercises = data.filter((item) => !currentExercises?.includes(item.name))

  return filteredExercises.map((item) => ({
    value: item.name,
    label: item.name,
  }))
}
