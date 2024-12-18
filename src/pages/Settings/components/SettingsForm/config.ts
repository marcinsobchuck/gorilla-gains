import debounce from "lodash.debounce"
import * as yup from "yup"

import { verifyUserPassword } from "@api/userService"

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const handleIsNaN = (value: any) => (isNaN(value) ? undefined : value)

const debouncedVerifyPassword = debounce(
  async (
    value: string,
    resolve: (value: boolean) => void,
    setIsCurrentPasswordValid: React.Dispatch<React.SetStateAction<boolean>>
  ) => {
    try {
      const response = await verifyUserPassword(value)
      setIsCurrentPasswordValid(response.data)
      return resolve(response.data)
    } catch (err) {
      return false
    }
  },
  400
)

export const settingsFormSchema = yup.object().shape(
  {
    email: yup.string().email("Invalid email address"),
    currentPassword: yup.string().test("verifyPassword", "Invalid password", (value, context) => {
      if (!value) return true

      if (document.activeElement?.id === "currentPassword") {
        return new Promise((resolve) =>
          debouncedVerifyPassword(
            value,
            resolve,
            context.options.context?.setIsCurrentPasswordValid
          )
        )
      } else if (context.options.context?.isCurrentPasswordValid) {
        return true
      }
    }),
    password: yup
      .string()
      .notRequired()
      .trim()
      .when("password", {
        is: (value: string) => value?.length,
        then: (rule) => rule.min(6, "Min. 6 characters"),
      })
      .when("currentPassword", {
        is: (value: string) => value !== "",
        then: (rule) =>
          rule.notOneOf([yup.ref("currentPassword")], "Must be different than old password"),
      }),
    passwordConfirmation: yup.string().oneOf([yup.ref("password")], "Password must match"),
    name: yup.string().required("Required").min(5, "Min. 5 characters"),
    surname: yup.string(),
    dob: yup.date().required("Required").nullable(),
    gender: yup.string().required("Required"),

    height: yup
      .number()
      .required("Required")
      .integer("Integer expected")
      .min(70, "Minimum value is 70")
      .max(250, "Maximum value is 250")
      .nullable()
      .transform(handleIsNaN),
    weight: yup
      .number()
      .required("Required")
      .integer("Integer expected")
      .min(20, "Minimum value is 20")
      .max(500, "Maximum value is 500")
      .positive("Weight must be positive")
      .nullable()
      .transform(handleIsNaN),
    activityLevel: yup.string().required("Required"),

    desiredWeight: yup
      .number()
      .integer("Integer expected")
      .min(1, "Minimum value is 1")
      .max(500, "Maximum value is 500")
      .positive("Desired weight must be positive")
      .nullable()
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
  },
  [["password", "password"]]
)

export const defaultValues = {
  email: "",
  currentPassword: "",
  password: "",
  passwordConfirmation: "",

  name: "",
  surname: "",
  dob: null,
  gender: "",

  height: null,
  weight: null,
  activityLevel: "",

  desiredWeight: null,
  dueDateWeight: null,
  goals: [],
}
