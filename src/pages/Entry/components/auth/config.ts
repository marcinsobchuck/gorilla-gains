import * as yup from "yup"

export const registerSchema = yup.object().shape({
  name: yup.string().required("Required").min(5, "Min. 5 characters"),
  email: yup.string().email("Invalid email address").required("Required"),
  password: yup.string().required("Required").trim().min(6, "Min. 6 characters"),
  passwordConfirmation: yup.string().oneOf([yup.ref("password")], "Password must match"),
})

export const loginSchema = yup.object().shape({
  email: yup.string().required("Required").email("Invalid email address"),
  password: yup.string().required("Required").trim().min(6, "Min. 6 characters"),
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
