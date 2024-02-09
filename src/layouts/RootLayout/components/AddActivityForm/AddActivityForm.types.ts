interface EnduranceFields {
  duration?: Duration
  distance?: number | string
}

interface StrengthFields {
  load?: number | string
  reps?: number | string
  duration?: Duration
}

export type SetsFormFields = StrengthFields | EnduranceFields

export interface ActivityType {
  category: string
  label: string
  value: string
  [x: string]: string
}

interface Set {
  load?: number | string
  reps?: number | string
  duration?: Duration | string
  distance?: number | string
  break?: number | string
}

export interface ExerciseFields {
  label: string
  value: string
  isStatic?: boolean
}

export interface Exercise {
  exercise: ExerciseFields
  sets?: Set[]
  withBreaks: boolean
}

interface Duration {
  hours: number
  minutes: number
  seconds: number
}

export interface AddActivityFormValues {
  activityType: ActivityType
  date: Date | string
  duration?: Duration
  distance?: number
  exercises?: Exercise[]
  notes: string
  warmup: boolean
}
