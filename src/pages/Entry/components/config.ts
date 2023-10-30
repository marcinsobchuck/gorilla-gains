import { z } from "zod"

export const registerSchema = z
  .object({
    name: z.string().trim().min(5, {
      message: "Required. Min. 5 characters",
    }),
    email: z.string().email("Invalid email address"),
    password: z.string().trim().min(6, { message: "Required. Min. 6 characters" }),
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
  email: z.string().email("Required. Invalid email address"),
  password: z.string().trim().min(6, { message: "Required. Min. 6 characters" }),
})

export const registerInputsData: {
  id: "name" | "email" | "password" | "passwordConfirmation"
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
  id: "email" | "password"
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
