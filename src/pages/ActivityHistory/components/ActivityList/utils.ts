import { Activity } from "@api/types/activitiesService.types"
import { CreateActivityPresetData } from "@api/types/activityPresets.types"

export const getCreateActivityPresetData = (activity: Activity): CreateActivityPresetData => {
  const {
    exercises: responseExercises,
    repeatExercisesCount,
    title,
    type: activityType,
    warmup,
    exertionRating,
    notes,
  } = activity

  const exercises = responseExercises.map((exercise) => {
    return { ...exercise, exercise: exercise.exercise._id }
  })

  const type = activityType._id

  return {
    title,
    exercises,
    exertionRating,
    type,
    warmup,
    notes,
    repeatExercisesCount,
  }
}
