import { ResponseExercise } from "@api/types/activitiesService.types"
import { Exercise } from "@layouts/RootLayout/components/AddActivityForm/AddActivityForm.types"

export const transformResponseExercises = (exercises: ResponseExercise[]): Exercise[] => {
  return exercises.map((rExercise) => {
    return {
      ...rExercise,
      exercise: {
        additionalInfo: rExercise.exercise.additionalInfo,
        isStatic: rExercise.exercise.isStatic,
        label: rExercise.exercise.name,
        value: rExercise.exercise._id,
      },
    }
  })
}
