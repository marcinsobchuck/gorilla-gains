import { ErrorMessage } from "@hookform/error-message"
import { zodResolver } from "@hookform/resolvers/zod"
import { SubmitHandler, useForm } from "react-hook-form"
import { Link } from "react-router-dom"
import { z } from "zod"

type FormValues = {
  name: string
  email: string
  password: string
  passwordConfirmation: string
}

const registerSchema = z
  .object({
    name: z
      .string()
      .nonempty("Name is required")
      .trim()
      .min(5, { message: "At least 5 characters please" }),
    email: z.string().nonempty("Email is required").email("Invalid email address"),
    password: z
      .string()
      .nonempty("Password is required")
      .trim()
      .min(6, { message: "At least 6 characters please" }),
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

export const Register = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues: {
      name: "",
      email: "",
      password: "",
      passwordConfirmation: "",
    },
    mode: "all",
    resolver: zodResolver(registerSchema),
  })

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    console.log({ data })
  }

  return (
    <div>
      <h1>Create an account.</h1>
      <p>Become Gorilla.</p>
      <p>
        Already a member? <Link to='/auth'>Go to Login view</Link>
      </p>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <label htmlFor='name'>Name</label>
          <input id='name' type='text' {...register("name")} />
          <ErrorMessage errors={errors} name='name' />
        </div>
        <div>
          <label htmlFor='email'>Email</label>
          <input id='email' type='text' {...register("email")} />
          <ErrorMessage errors={errors} name='email' />
        </div>
        <div>
          <label htmlFor='password'>Password</label>
          <input id='password' type='password' {...register("password")} />
          <ErrorMessage errors={errors} name='password' />
        </div>
        <div>
          <label htmlFor='passwordConfirmation'>Confirm password</label>
          <input id='passwordConfirmation' type='password' {...register("passwordConfirmation")} />
          <ErrorMessage errors={errors} name='passwordConfirmation' />
        </div>

        <button type='submit'>Submit</button>
      </form>
    </div>
  )
}
