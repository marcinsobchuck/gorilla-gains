import { Control, UseFormSetValue, UseFormWatch } from "react-hook-form"

interface EnduranceFields {
  duration?: number
  distance?: number
}

interface StrengthFields {
  load?: number
  reps?: number
}

export type SetsFormFields = StrengthFields | EnduranceFields

export interface NestedSetsFieldArrayProps {
  exerciseIndex: number
  lastExerciseIndex: number
  setsFormFields: SetsFormFields
  control: Control<AddActivityFormValues>
  withBreaks: boolean
  setValue: UseFormSetValue<AddActivityFormValues>
  watch: UseFormWatch<AddActivityFormValues>
}

export type Category = "strength" | "endurance" | "other"

export interface ActivityType {
  category: Category
  label: string
  value: string
  [x: string]: string
}

interface Set {
  load?: number | string
  reps?: number | string
  duration?: number | string
  distance?: number | string
  break?: number | string
}

interface Exercise {
  exercise: {
    label: string
    value: string
  }
  sets: Set[]
  withBreaks: boolean
}

export interface AddActivityFormValues {
  activityType: ActivityType
  date: Date | string
  duration?: number
  distance?: number
  exercises?: Exercise[]
  notes: string
  warmup: boolean
}
