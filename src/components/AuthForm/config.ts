import { z } from "zod"

import { FormValues } from "./AuthForm.types"

export const registerSchema = z
  .object({
    name: z.string().nonempty("Name is required").trim().min(5, {
      message: "Min. 5 characters",
    }),
    email: z.string().nonempty("Email is required").email("Invalid email address"),
    password: z
      .string()
      .nonempty("Password is required")
      .trim()
      .min(6, { message: "Min. 6 characters" }),
    passwordConfirmation: z.string(),
  })
  .refine(
    (data) => {
      return data.password === data.passwordConfirmation
    },
    {
      message: "Password must match",
      path: ["passwordConfirmation"],
    }
  )

export const loginSchema = z.object({
  email: z.string().nonempty("Email is required").email("Invalid email address"),
  password: z
    .string()
    .nonempty("Password is required")
    .trim()
    .min(6, { message: "Min. 6 characters" }),
})

export const registerInputsData: {
  id: keyof FormValues
  label: string
  type: "text" | "email" | "password"
}[] = [
  {
    id: "name",
    label: "Name",
    type: "text",
  },
  {
    id: "email",
    label: "Email",
    type: "email",
  },
  {
    id: "password",
    label: "Password",
    type: "password",
  },
  {
    id: "passwordConfirmation",
    label: "Confirm password",
    type: "password",
  },
]

export const loginInputsData: {
  id: keyof Omit<FormValues, "passwordConfirmation" | "name">
  label: string
  type: "email" | "password"
}[] = [
  {
    id: "email",
    label: "Email",
    type: "email",
  },
  {
    id: "password",
    label: "Password",
    type: "password",
  },
]

export const registerValues = {
  name: "",
  email: "",
  password: "",
  passwordConfirmation: "",
}

export const loginValues = {
  email: "",
  password: "",
}
