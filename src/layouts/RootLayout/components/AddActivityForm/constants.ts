const durationField = {
  hours: "",
  minutes: "",
  seconds: "",
}

export const exerciseField = {
  label: "",
  value: "",
}

export const defaultExercise = {
  exercise: exerciseField,
  withBreaks: false,
}

export const strengthNonStaticExerciseFields = {
  reps: "",
  load: "",
  break: null,
  repeatCount: 1,
}

export const strengthStaticExerciseFields = {
  duration: durationField,
  load: "",
  break: null,
  repeatCount: 1,
}

export const enduranceExerciseFields = {
  duration: durationField,
  distance: "",
  break: null,
  repeatCount: 1,
}

export const flexibilityExerciseFields = {
  duration: durationField,
  break: null,
  repeatCount: 1,
}

export const balanceExerciseFields = {
  duration: durationField,
  break: null,
  repeatCount: 1,
}
