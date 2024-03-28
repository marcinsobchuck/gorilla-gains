import * as yup from "yup"

import { handleIsNaN } from "@pages/Entry/components/UserDetails/components/UserDetailsForm/config"

import { ActivityType, ExerciseFields } from "./AddActivityForm.types"

const getIsExerciseObjectInvalid = (value: ExerciseFields) => {
  return Object.keys(value).length === 0 || !value.value || !value.label
}

export const durationSchema = yup
  .object()
  .shape({
    hours: yup.number().transform(handleIsNaN).max(100, "Max is 100").min(0, "Min is 0"),
    minutes: yup.number().transform(handleIsNaN).max(59, "Max is 59").min(0, "Min is 0"),
    seconds: yup.number().transform(handleIsNaN).max(59, "Max is 59").min(0, "Min is 0"),
  })
  .test({
    name: "AtLeastOne",
    test: (value, { createError, path }) => {
      if (!value.hours && !value.minutes && !value.seconds) {
        return createError({
          message: "Fill at least one",
          path,
        })
      }
      return true
    },
  })

export const activityTypeSchema = yup
  .object()
  .shape({
    label: yup.string().required(),
    value: yup.string().required(),
  })
  .required()

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

const baseExerciseSchema = yup.object().shape({
  exercise: exerciseFieldsSchema,
  withBreaks: yup.boolean(),
})

const baseSetSchema = yup.object().shape({
  break: yup.number().transform(handleIsNaN).nullable(),
})

const strengthExerciseSchema = baseExerciseSchema.shape({
  sets: yup
    .array()
    .min(1, "Add at least one set")
    .when("exercise", {
      is: (exercise: ExerciseFields) => exercise.isStatic,
      then: (schema) => {
        return schema.of(
          baseSetSchema.shape({
            duration: durationSchema,
            load: yup.number().transform(handleIsNaN).nullable(),
          })
        )
      },
      otherwise: (schema) =>
        schema.of(
          baseSetSchema.shape({
            load: yup.number().transform(handleIsNaN).positive("Must be positive").nullable(),
            reps: yup
              .number()
              .transform(handleIsNaN)
              .required("Required")
              .positive("Must be positive"),
          })
        ),
    }),
})

const enduranceExerciseSchema = baseExerciseSchema.shape({
  sets: yup
    .array()
    .min(1, "Add at least one set")
    .of(
      baseSetSchema.shape({
        duration: durationSchema,
        distance: yup.number().transform(handleIsNaN),
      })
    ),
})

const flexibilityExerciseSchema = baseExerciseSchema.shape({
  sets: yup
    .array()
    .min(1, "Add at least one set")
    .of(
      baseSetSchema.shape({
        duration: durationSchema,
      })
    ),
})

const balanceExerciseSchema = baseExerciseSchema.shape({
  sets: yup
    .array()
    .min(1, "Add at least one set")
    .of(
      baseSetSchema.shape({
        duration: durationSchema,
      })
    ),
})

// balance, flexibility set fields will potentially change thus two seperate objects

export const addActivityFormSchema = yup.object().shape({
  title: yup.string().required("Required"),
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
  exercises: yup
    .array()
    .min(1, "Add at least one exercise")
    .when("activityType", {
      is: (activityType: ActivityType) => activityType.label === "strength",
      then: (schema) => schema.of(strengthExerciseSchema),
    })
    .when("activityType", {
      is: (activityType: ActivityType) => activityType.label === "endurance",
      then: (schema) => schema.of(enduranceExerciseSchema),
    })
    .when("activityType", {
      is: (activityType: ActivityType) => activityType.label === "flexibility",
      then: (schema) => schema.of(flexibilityExerciseSchema),
    })
    .when("activityType", {
      is: (activityType: ActivityType) => activityType.label === "balance",
      then: (schema) => schema.of(balanceExerciseSchema),
    }),
  notes: yup.string(),
  warmup: yup.boolean().required(),
  repeatExercisesCount: yup.number().transform(handleIsNaN),
  exertionRating: yup.number(),
})
