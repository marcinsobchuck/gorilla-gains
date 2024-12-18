import { DefaultValues } from "react-hook-form"
import * as yup from "yup"

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const handleIsNaN = (value: any) => (isNaN(value) ? undefined : value)

export const userDetailsSchema = yup.object().shape({
  name: yup.string().required("Required").min(5, "Min. 5 characters"),
  surname: yup.string(),
  dob: yup.date().required("Required"),
  gender: yup.string().required("Required"),
  height: yup
    .number()
    .required("Required")
    .integer("Integer expected")
    .min(70, "Minimum value is 70")
    .max(250, "Maximum value is 250")
    .transform(handleIsNaN),
  weight: yup
    .number()
    .required("Required")
    .integer("Integer expected")
    .min(20, "Minimum value is 20")
    .max(500, "Maximum value is 500")
    .positive("Weight must be positive")
    .transform(handleIsNaN),
  activityLevel: yup.string().required("Required"),
  desiredWeight: yup
    .number()
    .integer("Integer expected")
    .min(1, "Minimum value is 1")
    .max(500, "Maximum value is 500")
    .positive("Desired weight must be positive")
    .transform(handleIsNaN),
  dueDateWeight: yup.date().nullable(),
  goals: yup
    .array()
    .required("Required")
    .of(
      yup
        .string()
        .required()
        .oneOf([
          "muscle gain",
          "weight loss",
          "improve endurance",
          "mental well-being",
          "overall health",
          "consistency",
        ])
    )
    .test(
      "At least one",
      "At least one goal must be selected",
      (value) => value && value.length > 0
    ),
})

type UserDetailsSchema = yup.InferType<typeof userDetailsSchema>

export const activityLevelOptions = [
  { value: "1.2", label: "Little/no exercise (sedentary lifestyle)" },
  { value: "1.35", label: "Light exercise 1-2 times/week" },
  { value: "1.55", label: "Moderate exercise 2-3 times/week" },
  { value: "1.725", label: "Hard exercise 4-5 times/week" },
  { value: "1.9", label: "Physical job or hard exercise 6-7 times/week" },
  { value: "2.4", label: "Professional athelete" },
]

export const genderRadioItems = [
  {
    labelText: "Male",
    value: "male",
  },
  { labelText: "Female", value: "female" },
]

export const goals = [
  {
    label: "Muscle gain",
    value: "muscle gain",
  },
  {
    label: "Weight loss",
    value: "weight loss",
  },
  {
    label: "Improve endurance",
    value: "improve endurance",
  },
  {
    label: "Mental well-being",
    value: "mental well-being",
  },
  {
    label: "Overall health",
    value: "overall health",
  },
  {
    label: "Consistency",
    value: "consistency",
  },
]

export const defaultValues: DefaultValues<UserDetailsSchema> = {
  goals: [],
}
