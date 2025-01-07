export const accountInformationInputsData: {
  id: "email" | "currentPassword" | "password" | "passwordConfirmation"
  label: string
  type: "text" | "email" | "password"
}[] = [
  {
    id: "currentPassword",
    label: "Current password",
    type: "password",
  },
  {
    id: "email",
    label: "Email",
    type: "email",
  },

  {
    id: "password",
    label: "New password",
    type: "password",
  },
  {
    id: "passwordConfirmation",
    label: "Confirm password",
    type: "password",
  },
]
