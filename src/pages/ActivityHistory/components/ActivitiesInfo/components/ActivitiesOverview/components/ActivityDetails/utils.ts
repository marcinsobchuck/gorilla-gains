import { Duration, ExerciseSet, ResponseExercise } from "@api/types/activitiesService.types"

const removeDuplicates = (arr: Array<keyof ExerciseSet>) => [...new Set(arr)]

export const getExerciseMetrics = (exercise: ResponseExercise): Array<keyof ExerciseSet> => {
  const metricsArray = exercise.sets.flatMap((set) => {
    return Object.keys(set) as Array<keyof ExerciseSet>
  })
  const removedDuplicates = removeDuplicates(metricsArray)
  const breakIndex = removedDuplicates.indexOf("break")

  removedDuplicates.push(removedDuplicates.splice(breakIndex, 1)[0]) // break always last

  return removedDuplicates
}

export const getDurationString = (duration: Duration) => {
  const hours = duration.hours ? `${duration.hours}h` : ""
  const minutes = duration.minutes ? `${duration.minutes}min` : ""
  const seconds = duration.seconds ? `${duration.seconds}sec` : ""

  return `${hours} ${minutes} ${seconds}`
}
