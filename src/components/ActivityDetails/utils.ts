import { Duration, ExerciseSet, ResponseExercise } from "@api/types/activitiesService.types"
import { omitKeysFromObject } from "@utils/omitKeysFromObject"

const removeDuplicates = (arr: Array<keyof ExerciseSet>) => [...new Set(arr)]

export const getExerciseMetrics = (exercise: ResponseExercise) => {
  const metricsArray = exercise.sets.flatMap((set) => {
    if (set.repeatCount === 1) {
      return Object.keys(omitKeysFromObject(set, ["repeatCount"])) as Array<keyof ExerciseSet>
    }

    return Object.keys(set) as Array<keyof ExerciseSet>
  })
  const removedDuplicates = removeDuplicates(metricsArray)

  const otherKeysOrder: Array<keyof ExerciseSet> = ["break", "repeatCount"]

  const orderedMetrics = removedDuplicates.filter((key) => !otherKeysOrder.includes(key))

  otherKeysOrder.forEach((key) => {
    if (removedDuplicates.includes(key)) {
      orderedMetrics.push(key)
    }
  })

  return orderedMetrics
}

export const getDurationString = (duration: Duration) => {
  const hours = duration.hours ? `${duration.hours}h` : ""
  const minutes = duration.minutes ? `${duration.minutes}min` : ""
  const seconds = duration.seconds ? `${duration.seconds}sec` : ""

  return `${hours} ${minutes} ${seconds}`
}
