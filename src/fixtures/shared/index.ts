import { Activity, ExerciseSet, ResponseExercise } from "@api/types/activitiesService.types"
import { ActivityTypes } from "@enums/activityTypes.enum"

export const getMockSet = (overrides?: ExerciseSet): ExerciseSet => ({
  load: 50,
  reps: 12,
  distance: 42,
  duration: {
    seconds: 30,
    minutes: 30,
    hours: 1,
  },
  break: 30,
  ...overrides,
})

export const getMockExercise = (sets = [getMockSet()]): ResponseExercise => ({
  exercise: {
    _id: "1",
    name: "test exercise",
  },
  sets,
  withBreaks: true,
})

export const getMockActivity = (overrides: Partial<Activity> = {}): Activity => {
  return {
    _id: "123",
    title: "test activity",
    type: {
      _id: "123",
      type: ActivityTypes.STRENGTH,
    },
    date: "2025-09-29",
    exercises: [getMockExercise()],
    notes: "test note",
    warmup: true,
    repeatExercisesCount: 1,
    isDone: true,
    exertionRating: 3,
    createdAt: "test date",
    ...overrides,
  }
}
