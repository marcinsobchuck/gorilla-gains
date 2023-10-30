import { z } from "zod"

export const userDetailsSchema = z.object({
  name: z.string().trim().min(5, {
    message: "Required. Min. 5 characters",
  }),
  surname: z.string(),
  age: z.coerce
    .number()
    .int({ message: "Integer expected" })
    .min(1, {
      message: "Minimum value is 1",
    })
    .max(100, {
      message: "Maximum value is 120",
    })
    .positive({
      message: "Age must be positive",
    }),
  gender: z.enum(["male", "female"], {
    errorMap: () => ({
      message: "Female or male, please",
    }),
  }),
  height: z.coerce
    .number()
    .int({ message: "Integer expected" })
    .min(70, {
      message: "Minimum value is 70",
    })
    .max(250, {
      message: "Maximum value is 250",
    })
    .positive({
      message: "Height must be positive",
    }),
  weight: z.coerce
    .number()
    .int({ message: "Integer expected" })
    .min(20, {
      message: "Minimum value is 20",
    })
    .max(500, {
      message: "Maximum value is 500",
    })
    .positive({
      message: "Weight must be positive",
    }),
  desiredWeight: z.coerce
    .number()
    .int({ message: "Integer expected" })
    .min(1, {
      message: "Minimum value is 1",
    })
    .max(500, {
      message: "Maximum value is 500",
    })
    .positive({
      message: "Weight must be positive",
    }),
  activityLevel: z.string(),
})

export const activityLevelOptions = [
  { value: "extremely inactive", label: "Extremely inactive" },
  { value: "sedentary", label: "Sedentary" },
  { value: "moderately active", label: "Moderately active" },
  { value: "vigorously active", label: "Vigorously active" },
  { value: "extremely active", label: "Extremely active" },
]
