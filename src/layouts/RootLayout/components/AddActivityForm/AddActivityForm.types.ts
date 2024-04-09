import { InferType } from "yup"

import { Set } from "@api/types/activitiesService.types"

import { activityTypeSchema, addActivityFormSchema, exerciseFieldsSchema } from "./config"

export type ActivityType = InferType<typeof activityTypeSchema>
export type ExerciseFields = InferType<typeof exerciseFieldsSchema>

export type AddActivityFormTypes = InferType<typeof addActivityFormSchema>

export interface AddActivityFormProps {
  isPresetsVisible: boolean
  setIsPresetsVisible: React.Dispatch<React.SetStateAction<boolean>>
}

export interface Exercise {
  sets: Set[]
  exercise: ExerciseFields
  withBreaks: boolean
}
