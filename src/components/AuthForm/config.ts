import { z } from "zod"

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
