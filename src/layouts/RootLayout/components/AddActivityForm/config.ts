import * as yup from "yup"

import { handleIsNaN } from "@pages/Entry/components/UserDetails/components/UserDetailsForm/config"

import { ActivityType, ExerciseFields } from "./AddActivityForm.types"

const getIsExerciseObjectInvalid = (value: ExerciseFields) => {
  return Object.keys(value).length === 0 || !value.value || !value.label
}

const atLeastOneFieldTest = (message: string = "Fill at least one"): yup.TestConfig<Duration> => {
  return {
    name: "AtLeastOne",
    test: (value, { createError, path }) => {
      if (!value.hours && !value.minutes && !value.seconds) {
        return createError({
          message,
          path,
        })
      }
      return true
    },
  }
}

export const durationSchema = yup.object().shape({
  hours: yup.number().transform(handleIsNaN).max(100, "Max is 100").min(0, "Min is 0"),
  minutes: yup.number().transform(handleIsNaN).max(59, "Max is 59").min(0, "Min is 0"),
  seconds: yup.number().transform(handleIsNaN).max(59, "Max is 59").min(0, "Min is 0"),
})

export const exerciseFieldsSchema = yup
  .object()
  .shape({
    label: yup.string(),
    value: yup.string(),
    isStatic: yup.boolean(),
    additionalInfo: yup.string(),
  })
  .test({
    name: "Exercise is required",
    test: (value, { createError, path }) => {
      if (getIsExerciseObjectInvalid(value)) {
        return createError({
          message: "Exercise is required",
          path,
        })
      } else {
        return true
      }
    },
  })

export const activityTypeSchema = yup.object().shape({
  category: yup.string(),
  label: yup.string(),
  value: yup.string(),
})

const strengthExerciseSchema = yup.object().shape({
  exercise: exerciseFieldsSchema,
  sets: yup.array().when("exercise", {
    is: (exercise: ExerciseFields) => exercise.isStatic,
    then: (schema) => {
      return schema
        .of(
          yup.object().shape({
            load: yup.number().transform(handleIsNaN),
            duration: durationSchema.test(atLeastOneFieldTest()),
            break: yup.number().transform(handleIsNaN),
          })
        )
        .min(1, "Add at least one set")
    },
    otherwise: () =>
      yup
        .array()
        .of(
          yup.object().shape({
            load: yup
              .number()
              .transform(handleIsNaN)
              .required("Required")
              .positive("Must be positive"),
            reps: yup
              .number()
              .transform(handleIsNaN)
              .required("Required")
              .positive("Must be positive"),
            break: yup.number().transform(handleIsNaN),
          })
        )
        .min(1, "Add at least one set"),
  }),
  withBreaks: yup.boolean(),
})

const enduranceExerciseSchema = yup.object().shape({
  exercise: exerciseFieldsSchema,
  sets: yup
    .array()
    .of(
      yup.object().shape({
        duration: durationSchema.test(atLeastOneFieldTest()),
        distance: yup.number().transform(handleIsNaN).required("Required"),
        break: yup.number().transform(handleIsNaN),
      })
    )
    .min(1, "Add at least one set"),
  withBreaks: yup.boolean(),
})

export const addActivityFormSchema = yup.object().shape({
  activityType: activityTypeSchema.test({
    name: "Activity type is required",
    test: (value, { createError, path }) => {
      if (Object.keys(value).length === 0 || Object.values(value).every((x) => x === "")) {
        return createError({
          message: "Required",
          path,
        })
      } else {
        return true
      }
    },
  }),
  date: yup.date().required("Required"),
  duration: durationSchema.when("activityType", {
    is: (value: ActivityType) => {
      return value.category === "other"
    },
    then: (schema) => schema.test(atLeastOneFieldTest()),
  }),
  distance: yup
    .number()
    .transform(handleIsNaN)
    .when("activityType", {
      is: (value: ActivityType) => value.category === "other",
      then: (schema) => {
        return schema.required("Required")
      },
    }),
  exercises: yup
    .array()
    .when("activityType", {
      is: (value: ActivityType) => value.category === "strength",
      then: (schema) => schema.of(strengthExerciseSchema),
      otherwise: (schema) => schema.of(enduranceExerciseSchema),
    })
    .when("activityType", {
      is: (value: ActivityType) => value.category === "strength" || value.category === "endurance",
      then: (schema) => schema.min(1, "Add an exercise or change the activity type"),
    }),
  notes: yup.string(),
  warmup: yup.boolean(),
  repeatExercisesCount: yup.number().transform(handleIsNaN),
})
