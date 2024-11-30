export const accountInformationInputsData: {
  id: "email" | "password" | "passwordConfirmation"
  label: string
  type: "text" | "email" | "password"
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
  {
    id: "passwordConfirmation",
    label: "Confirm password",
    type: "password",
  },
]
