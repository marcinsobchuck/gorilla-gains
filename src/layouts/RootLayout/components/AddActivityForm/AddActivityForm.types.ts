import { InferType } from "yup"

import { activityTypeSchema, exerciseFieldsSchema } from "./config"

export type ActivityType = InferType<typeof activityTypeSchema>
export type ExerciseFields = InferType<typeof exerciseFieldsSchema>
